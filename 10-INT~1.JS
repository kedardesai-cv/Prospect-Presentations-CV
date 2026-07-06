var intakeData = { transcript: null, excel: null };

var PM_PROFILES = {
  cecilia:  { focus:'Mixed client base',         style:'Relationship-first',     priority:'Holistic planning',        clientBase:'Domestic & international' },
  jasmyn:   { focus:'Operations & data quality', style:'Detail-oriented',        priority:'Data accuracy & process',  clientBase:'Internal support' },
  alan:     { focus:'Established domestic HNW',  style:'Conservative & formal',  priority:'Capital preservation',     clientBase:'Domestic' },
  alex:     { focus:'International & Panama',    style:'Structured, IPS-driven', priority:'Cross-border planning',    clientBase:'Latin America, Panama' },
  matthew:  { focus:'Domestic growth clients',   style:'Direct & analytical',    priority:'Portfolio optimization',   clientBase:'Domestic' },
  ricardo:  { focus:'Latin American families',   style:'Consultative & warm',    priority:'Multi-generational wealth',clientBase:'LATAM families' }
};

function loadPMProfile() {
  var key = (document.getElementById('pmSelect')||{}).value||'';
  var p = PM_PROFILES[key];
  var traits = document.getElementById('pmTraits');
  if (!traits) return;
  if (!p) { traits.style.display='none'; return; }
  traits.style.display='block';
  document.getElementById('pmFocus').textContent=p.focus;
  document.getElementById('pmStyle').textContent=p.style;
  document.getElementById('pmPriority').textContent=p.priority;
  document.getElementById('pmClients').textContent=p.clientBase;
}

function handleDrag(e,el){ e.preventDefault(); el.classList.add('dragover'); }

function handleDrop(e,type){
  e.preventDefault();
  var zone=document.getElementById(type==='transcript'?'zoneTranscript':'zoneExcel');
  zone.classList.remove('dragover');
  var file=e.dataTransfer.files[0];
  if(file) processUpload(file,type);
}

function handleFile(e,type){ var f=e.target.files[0]; if(f) processUpload(f,type); }

function processUpload(file,type){
  var fname=document.getElementById('fname-'+type);
  var zone=document.getElementById(type==='transcript'?'zoneTranscript':'zoneExcel');
  zone.classList.add('has-file');
  fname.style.display='block';
  if(type==='transcript'){
    fname.textContent=file.name;
    var r=new FileReader(); r.onload=function(e){ intakeData.transcript=e.target.result; }; r.readAsText(file);
  } else {
    var ext=(file.name.split('.').pop()||'').toLowerCase();
    intakeData.excel=file.name; intakeData.excelText=null; intakeData.excelRows=null;
    var btn=document.getElementById('btnAnalyze'); var hint=document.getElementById('analyzeHint');
    if(ext==='csv'||ext==='txt'){
      // CSV: enable immediately
      if(btn){ btn.disabled=false; btn.style.opacity='1'; btn.style.cursor='pointer'; }
      if(hint) hint.style.display='none';
      fname.textContent=file.name;
      var r=new FileReader(); r.onload=function(e){
        intakeData.excelText=e.target.result;
        fname.textContent=file.name;
        // Detect statement source from CSV headers
        var lines = e.target.result.split('\n');
        if (lines.length > 0) {
          var headers = lines[0].split(',');
          _statementSource = detectStatementSource(headers);
          _missingFlag = null; // CSV: missing detection needs parsed rows
        }
      }; r.readAsText(file);
    } else if(ext==='xlsx'||ext==='xls'||ext==='xlsm'){
      fname.textContent=file.name+' (reading...)';
      fname.style.color='var(--slate)';
      // Keep analyze button disabled while parsing
      if(btn){ btn.disabled=true; btn.style.opacity='0.6'; btn.textContent='Reading file...'; }
      readXlsxAsRows(file).then(function(rows){
        if(rows&&rows.length>0){
          intakeData.excelRows=rows;
          intakeData.excelText=null;
          fname.textContent=file.name+' ('+rows.length+' rows read)';
          fname.style.color='var(--navy)';
          // Detect statement source and missing positions from XLSX headers/rows
          if (rows[0]) { _statementSource = detectStatementSource(rows[0]); }
          _missingFlag = detectMissingPositions(rows);
        } else {
          intakeData.excelNote='File: '+file.name+'. Save as CSV for best results.';
          fname.textContent=file.name+' (save as CSV for best results)';
          fname.style.color='var(--slate)';
        }
        // Re-enable analyze now that file is ready
        if(btn){ btn.disabled=false; btn.style.opacity='1'; btn.style.cursor='pointer'; btn.textContent='Analyze Everything'; }
        if(hint) hint.style.display='none';
      });
    } else { fname.textContent=file.name; }
  }
}


async function readXlsxAsRows(file){
  try {
    var ab = await file.arrayBuffer();
    var bytes = new Uint8Array(ab);
    var results = {};
    // Parse ZIP local file headers (PK)
    var i = 0;
    while(i < bytes.length - 30){
      if(bytes[i]===0x50&&bytes[i+1]===0x4b&&bytes[i+2]===0x03&&bytes[i+3]===0x04){
        var method = bytes[i+8]|(bytes[i+9]<<8);
        var compSize = bytes[i+18]|(bytes[i+19]<<8)|(bytes[i+20]<<16)|(bytes[i+21]<<24);
        var fnLen = bytes[i+26]|(bytes[i+27]<<8);
        var extraLen = bytes[i+28]|(bytes[i+29]<<8);
        var fnStart = i+30;
        var dataStart = fnStart+fnLen+extraLen;
        var fname = new TextDecoder().decode(bytes.slice(fnStart,fnStart+fnLen));
        if(fname.match(/sharedStrings|sheet1\.xml/)){
          var compData = bytes.slice(dataStart,dataStart+compSize);
          var text = '';
          if(method===0){ text=new TextDecoder().decode(compData); }
          else if(method===8){
            try {
              var ds = new DecompressionStream('deflate-raw');
              var w = ds.writable.getWriter(); w.write(compData); w.close();
              var r = ds.readable.getReader(); var chunks=[];
              while(true){ var ch=await r.read(); if(ch.done) break; chunks.push(ch.value); }
              var sz=chunks.reduce(function(a,c){return a+c.length;},0);
              var merged=new Uint8Array(sz); var off=0;
              chunks.forEach(function(c){merged.set(c,off);off+=c.length;});
              text=new TextDecoder().decode(merged);
            } catch(de){ console.log('deflate fail:',fname,de.message); }
          }
          if(text) results[fname]=text;
        }
        i=dataStart+Math.max(0,compSize);
      } else { i++; }
    }
    // Extract shared strings
    var sharedStrings=[];
    var ssKey=Object.keys(results).find(function(k){return k.indexOf('sharedStrings')>=0;});
    if(ssKey){
      var matches=[...results[ssKey].matchAll(/<t[^>]*>([^<]*)<\/t>/g)];
      sharedStrings=matches.map(function(m){return m[1].replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>');});
    }
    // Extract sheet1 rows
    var sheetKey=Object.keys(results).find(function(k){return k.indexOf('sheet1.xml')>=0;});
    if(!sheetKey) return null;
    var sheetXml=results[sheetKey];
    var rows=[];
    var rowMatches=[...sheetXml.matchAll(/<row[^>]*>([\s\S]*?)<\/row>/g)];
    rowMatches.forEach(function(rowM){
      var cells=[];
      var cellMatches=[...rowM[1].matchAll(/<c\s([^>]*)>([\s\S]*?)<\/c>/g)];
      cellMatches.forEach(function(cm){
        var attr=cm[1]; var inner=cm[2];
        var vMatch=inner.match(/<v>([^<]*)<\/v>/);
        if(!vMatch){cells.push('');return;}
        var val=vMatch[1];
        if(attr.indexOf('t="s"')>=0){
          var idx=parseInt(val,10);
          cells.push(isNaN(idx)?val:(sharedStrings[idx]||val));
        } else { cells.push(val); }
      });
      if(cells.some(function(c){return c!=='';})) rows.push(cells);
    });
    return rows.length>0?rows:null;
  } catch(e){ console.log('xlsx read error:',e.message); return null; }
}

var FRIO_DEMO_ANALYSIS = {
  narrative: "Client manages $6.05M across two uncoordinated Morgan Stanley accounts with no IPS, no income plan, and no cross-account coordination between a self-directed account and a generic 60/40 model. Immediate priorities are household risk consolidation, redirecting $877K idle cash to income-generating instruments, and restructuring the estate to limit legacy parental involvement.",
  background: [
    "Young founder — sole owner of a mid-size operating company; parents are co-signers on legacy accounts and historically directed investment decisions.",
    "Client asserting full portfolio autonomy, actively building an estate structure to limit parental co-signer exposure going forward.",
    "$6.05M household AUM across two uncoordinated Morgan Stanley accounts: MS-5931 self-directed ($3.57M) and MS-2627 BlackRock MAPS 60/40 model ($2.49M)."
  ],
  lifeEvents: [
    "Active estate planning — constructing asset protection structures and generational transfer plan to reduce parental co-signer exposure on all accounts.",
    "High immediate income requirement — ongoing lifestyle costs plus legal and estate planning fees require reliable monthly distributions from the portfolio."
  ],
  goals: [
    "Full autonomy and control over investment decisions — eliminate legacy parental co-signer influence from all account structures.",
    "Build a reliable income stream from portfolio assets to fund lifestyle and ongoing estate and legal costs.",
    "Consolidate both accounts under a single coordinated, estate-friendly mandate with a clear unified IPS."
  ],
  painPoints: [
    "$877K idle cash in MS-5931 earning near zero — at CV current FI yield of 5.13%, this is ~$45K/yr in foregone income.",
    "MS-2627 ($2.49M) runs a generic BlackRock 60/40 MAPS model with no reference to MS-5931 holdings — uncoordinated household risk with contradicting mandates.",
    "All-in fee load ~1.19% ($72K/yr) across advisory, fund management, sales loads, and distribution tiers — client has no consolidated view of total cost."
  ],
  riskSignals: [
    "Energy/coal concentration: RIG $396K (6.5%), HCC $266K (4.4%), AMR $59K (1.0%), CEIX $25K (0.4%) = 12.3% combined in volatile, cyclical sectors with regulatory headwinds.",
    "Blue Owl Credit ($132K) — reported redemption gates and active class action 2025–2026; liquidity risk in a holding requiring accessible income.",
    "NH NET REIT ($262K) is Morgan Stanley-owned — structural conflict of interest where current advisor earns fees at both advisory and fund level.",
    "Illiquid alternatives total $884K (14.6%): NH NET REIT, Blue Owl, BXPE, K-Pec, K-Infra — concentration mismatched with stated income and estate liquidity requirements."
  ],
  portfolioObservations: [
    "MS-5931 ($3.57M, 38 positions): top 3 individual equities (RIG, BN, HCC) drive ~93% of individual equity P&L attribution; remaining 7 positions contribute ~7% combined.",
    "MS-2627 ($2.49M): 12+ equity ETFs with average 0.97 correlation to MSCI World — portfolio diversification is nominal, not structural.",
    "No unified IPS documented; self-directed MS-5931 and model-managed MS-2627 operate with contradicting risk mandates and zero household-level coordination.",
    "Private structures: NH NET REIT $262K, Blue Owl Credit $132K, BXPE $262K, K-Pec $118K, K-Infra $110K — $884K total at varying and uncertain liquidity terms."
  ]
};
async function runIntakeAnalysis(){
  var dump=(document.getElementById('clientIntake')||{}).value||'';
  var clientCode=(document.getElementById('clientCode')||{}).value||'';
  var meetingDate=(document.getElementById('meetingDate')||{}).value||'';
  var pm=(document.getElementById('pmSelect')||{}).value||'';
  var pmProfile=pm&&PM_PROFILES[pm]?PM_PROFILES[pm]:null;
  var btn=document.getElementById('btnAnalyze');
  var results=document.getElementById('intakeResults');
  var narrative=document.getElementById('intakeNarrative');

  btn.disabled=true; btn.textContent='Analyzing...';
  results.style.display='none';

  // DEMO MODE: use pre-built Frio analysis (no live AI call needed)
  await new Promise(function(r){ setTimeout(r, 1400); });
  renderIntakeResults(FRIO_DEMO_ANALYSIS, clientCode||'FRIO-RIVER');

  btn.disabled=false; btn.textContent='Re-Analyze';
}

function renderIntakeResults(data,clientCode){
  var narrative=document.getElementById('intakeNarrative');
  var cards=document.getElementById('intakeCards');
  var results=document.getElementById('intakeResults');

  var badge=document.getElementById('intakeClientCodeBadge');
  if(clientCode&&badge){ badge.style.display='inline-block'; badge.textContent=clientCode.toUpperCase(); }
  else if(badge) badge.style.display='none';

  // Show statement source badge
  var existingBadges = document.getElementById('statementSourceBadges');
  if (!existingBadges) {
    existingBadges = document.createElement('div');
    existingBadges.id = 'statementSourceBadges';
    existingBadges.style.cssText = 'margin-bottom:8px;display:flex;flex-wrap:wrap;gap:4px;align-items:center;';
    var badgeSibling = document.getElementById('intakeClientCodeBadge');
    if (badgeSibling && badgeSibling.parentNode) {
      badgeSibling.parentNode.insertBefore(existingBadges, badgeSibling.nextSibling);
    }
  }
  var badgeHTML = '';
  if (_statementSource === 'institutional') {
    badgeHTML += '<span class="source-badge institutional">&#10003; Institutional Statement</span>';
  } else if (_statementSource === 'client-built') {
    badgeHTML += '<span class="source-badge client-built">&#9888; Client-Built Statement</span>';
  }
  if (_missingFlag) {
    badgeHTML += '<span class="source-badge missing-flag">&#9888; ~' + _missingFlag.gapPct + '% of portfolio unaccounted for</span>';
  }
  existingBadges.innerHTML = badgeHTML;

  narrative.textContent=data.narrative||'';
  narrative.className='narrative-box'+(data.narrative?' vis':'');

  var CARD_DEFS=[
    {key:'background',            label:'Client Background',       tagClass:'obs',   tagText:'Background'},
    {key:'lifeEvents',            label:'Life Events & Triggers',  tagClass:'event', tagText:'Life Event'},
    {key:'goals',                 label:'Goals & Objectives',      tagClass:'goal',  tagText:'Goal'},
    {key:'painPoints',            label:'Pain Points',             tagClass:'risk',  tagText:'Pain Point'},
    {key:'riskSignals',           label:'Risk Signals',            tagClass:'risk',  tagText:'Risk'},
    {key:'portfolioObservations', label:'Portfolio Observations',  tagClass:'obs',   tagText:'Portfolio'}
  ];

  var html='';
  CARD_DEFS.forEach(function(def){
    var items=data[def.key];
    if(!items||!items.length) return;
    html+='<div class="intake-card">';
    html+='<div class="intake-card-hdr"><span class="intake-card-title">'+def.label+'</span></div>';
    html+='<div class="intake-card-body">';
    items.forEach(function(item){
      html+='<div style="display:flex;gap:8px;align-items:flex-start;margin-bottom:8px;">';
      html+='<span class="intake-tag '+def.tagClass+'">'+def.tagText+'</span>';
      html+='<span style="flex:1;line-height:1.55;">'+item+'</span>';
      html+='</div>';
    });
    html+='</div></div>';
  });

  cards.innerHTML=html||'<div style="color:var(--text-muted);font-size:12px;font-style:italic;">No structured data found — check input and try again.</div>';
  results.style.display='block';
}

function parseIntakeKeywords(dump,transcript){
  var allText=[dump||'',transcript||''].join(' ');
  function extractPhrases(text){
    if(!text) return [];
    var sentences=text.replace(/([.!?])\s+/g,'$1|||').split('|||');
    var phrases=[];
    sentences.forEach(function(s){
      s=s.trim(); if(s.length<8) return;
      if(s.length>80){ s.split(/,|;/).forEach(function(p){ p=p.trim(); if(p.length>8) phrases.push(p); }); }
      else { phrases.push(s); }
    });
    return phrases;
  }
  var phrases=extractPhrases(allText); var used={};
  var CATS=[
    {key:'lifeEvents', kws:['retire','divorce','inheritance','sell','sold','liquidity','moving','baby','estate','health','widow']},
    {key:'goals', kws:['income','yield','growth','preserve','legacy','trust','withdraw','generate','target','goal','objective']},
    {key:'riskSignals', kws:['risk','worried','concentrated','volatile','conservative','aggressive','uncomfortable','loss']},
    {key:'portfolioObservations', kws:['portfolio','account','etf','fund','bond','equity','stock','cash','fee','custodian','%','million']},
    {key:'background', kws:['client','family','husband','wife','children','age','business','professional','company','nationality']}
  ];
  var res={background:[],lifeEvents:[],goals:[],painPoints:[],riskSignals:[],portfolioObservations:[]};
  phrases.forEach(function(phrase){
    var pl=phrase.toLowerCase(); var assigned=false;
    CATS.forEach(function(cat){
      if(assigned||res[cat.key].length>=4) return;
      if(cat.kws.some(function(kw){ return pl.indexOf(kw)!==-1; })){
        var k=phrase.substring(0,60);
        if(!used[k]){ used[k]=true; var c=phrase.charAt(0).toUpperCase()+phrase.slice(1); res[cat.key].push(c); assigned=true; }
      }
    });
  });
  if(intakeData.excel&&!res.portfolioObservations.length) res.portfolioObservations.push('Portfolio file uploaded: '+intakeData.excel);
  return { narrative:'Keyword analysis complete — AI connection unavailable. Review sections below and re-analyze when connected.',
    background:res.background, lifeEvents:res.lifeEvents, goals:res.goals,
    painPoints:res.painPoints, riskSignals:res.riskSignals, portfolioObservations:res.portfolioObservations };
}

function buildLiveContext(){
  var parts=[];
  var cc=(document.getElementById('clientCode')||{}).value||'';
  if(cc) parts.push('Client Code: '+cc);
  var n=document.getElementById('intakeNarrative');
  if(n&&n.textContent.trim()) parts.push('Summary: '+n.textContent.trim());
  if(intakeData.excelRows&&intakeData.excelRows.length>1)
    parts.push('Portfolio: '+intakeData.excelRows.slice(0,20).map(function(r){return r.join(' | ');}).join('; '));
  else if(intakeData.excelText) parts.push('Portfolio text: '+intakeData.excelText.substring(0,1000));
  return parts.join('\n\n')||'No context loaded yet.';
}

async function addMissedInfo(){
  var input=document.getElementById('followupInput');
  var extra=input?input.value.trim():'';
  if(!extra) return;
  // Append to PM notes and re-run
  var dump=document.getElementById('clientIntake');
  if(dump) dump.value=(dump.value?dump.value+'\n':'')+extra;
  if(input) input.value='';
  await runIntakeAnalysis();
}

// ============================
// DATA DASHBOARD JS
// ============================
