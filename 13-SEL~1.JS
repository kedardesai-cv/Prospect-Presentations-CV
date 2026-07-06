var selfDirectedAccounts = [
  { id:'sda1', name:'Robinhood — Personal Account', confidence:'high', signalCount:4, signals:[
    { label:'Retail custodian (Robinhood)', strong:true },
    { label:'Zero advisory fee detected', strong:false },
    { label:'100% equity, no fixed income', strong:false },
    { label:'No institutional manager name', strong:false }
  ]},
  { id:'sda2', name:'Coinbase — Digital Assets', confidence:'high', signalCount:3, signals:[
    { label:'Crypto / digital assets', strong:true },
    { label:'Retail custodian (Coinbase)', strong:true },
    { label:'No diversification (2 assets, 95%+)', strong:false }
  ]},
  { id:'sda3', name:'TD Ameritrade — Joint', confidence:'med', signalCount:2, signals:[
    { label:'No advisory fee detected', strong:false },
    { label:'Single stock = 82% of account', strong:false }
  ]}
];

var sdaConfirmed = new Set();
var sdaDismissed = new Set();

function buildSelfDirectedPanel() {
  var container = document.getElementById('sdpAccounts');
  if (!container) return;
  var accounts = selfDirectedAccounts.filter(function(a) { return !sdaConfirmed.has(a.id) && !sdaDismissed.has(a.id); });
  if (!accounts.length) {
    var sdp = document.getElementById('s0SelfDirectedPanel');
    if (sdp) { sdp.dataset.resolved = '1'; sdp.style.display = 'none'; }
    return;
  }
  var confColors = { high:{bg:'#FDECEA',color:'#7A1E1E'}, med:{bg:'#FEF3CD',color:'#7A5E0A'}, low:{bg:'#EEF2F7',color:'#4E7496'} };
  var confLabels = { high:'High', med:'Medium', low:'Low' };
  container.innerHTML = accounts.map(function(acct) {
    var cc = confColors[acct.confidence];
    var pipCol = acct.confidence==='high' ? '#C0392B' : acct.confidence==='med' ? '#D4A017' : '#4E7496';
    var filled = acct.confidence==='high' ? 3 : acct.confidence==='med' ? 2 : 1;
    var pips = [0,1,2].map(function(i) {
      return '<div style="width:11px;height:3px;border-radius:2px;background:'+(i<filled?pipCol:'#E0E5EC')+'"></div>';
    }).join('');
    var sigHtml = acct.signals.map(function(s) {
      return '<div style="font-size:10px;color:'+(s.strong?'#C0392B':'#6B7A87')+';font-family:Arial,sans-serif;line-height:1.5">'+(s.strong?'●':'○')+' '+s.label+'</div>';
    }).join('');
    return '<div id="sda-block-'+acct.id+'" style="border-bottom:1px solid #F0F2F5">'+
      '<div style="padding:8px 12px 4px;display:flex;align-items:center;justify-content:space-between;gap:6px">'+
        '<div style="font-size:11px;font-weight:700;color:#00294D;font-family:Arial,sans-serif;line-height:1.3">'+acct.name+'</div>'+
        '<div style="padding:2px 7px;border-radius:10px;font-size:9px;font-weight:700;font-family:Arial,sans-serif;background:'+cc.bg+';color:'+cc.color+';white-space:nowrap;">'+confLabels[acct.confidence]+' · '+acct.signalCount+'</div>'+
      '</div>'+
      '<div style="padding:0 12px 6px">'+sigHtml+'<div style="display:flex;gap:2px;margin-top:5px">'+pips+'</div></div>'+
      '<div style="padding:0 12px 10px;display:flex;gap:6px">'+
        '<button onclick="confirmSelfDirected(\''+acct.id+'\')" style="flex:1;background:#00294D;color:white;border:none;border-radius:4px;padding:5px 8px;font-size:10px;font-weight:700;font-family:Arial,sans-serif;cursor:pointer;">Confirm</button>'+
        '<button onclick="dismissSelfDirected(\''+acct.id+'\')" style="flex:1;background:#fff;color:#8A949E;border:1px solid #D4D6D9;border-radius:4px;padding:5px 8px;font-size:10px;font-weight:700;font-family:Arial,sans-serif;cursor:pointer;">Dismiss</button>'+
      '</div>'+
    '</div>';
  }).join('');
}

function confirmSelfDirected(id) {
  sdaConfirmed.add(id);
  var block = document.getElementById('sda-block-' + id);
  if (block) {
    block.style.transition = 'opacity .25s';
    block.style.opacity = '0';
    setTimeout(function() { block.remove(); buildSelfDirectedPanel(); }, 260);
  }
}

function dismissSelfDirected(id) {
  sdaDismissed.add(id);
  var block = document.getElementById('sda-block-' + id);
  if (block) {
    block.style.transition = 'opacity .25s';
    block.style.opacity = '0';
    setTimeout(function() { block.remove(); buildSelfDirectedPanel(); }, 260);
  }
}

// ============================
// CLASSIFY PANEL
// ============================
function updateClassifySubtype() {
  var ac = document.getElementById('classifyAssetClass');
  var st = document.getElementById('classifySubtype');
  var opts = {
    fi:    ['Direct Lending','Corporate Bonds','Municipal Bonds','Treasury / Govt','MBS / Structured','Other Fixed Income'],
    alts:  ['Private Equity','Private Credit','Real Estate','Infrastructure','Hedge Fund','Other Alternatives'],
    equity:['US Large Cap','US Mid/Small Cap','International Developed','Emerging Markets','Sector ETF','Other Equity'],
    cash:  ['Money Market','Cash Equivalent','Short-Term Treasury','Other Cash']
  };
  var choices = opts[ac.value] || [];
  st.innerHTML = choices.length
    ? choices.map(function(o) { return '<option value="'+o+'">'+o+'</option>'; }).join('')
    : '<option value="">— Select asset class first —</option>';
}

function confirmClassify() {
  var ac = document.getElementById('classifyAssetClass');
  var st = document.getElementById('classifySubtype');
  var byResearch = document.getElementById('classifyResearchCheck') && document.getElementById('classifyResearchCheck').checked;
  if (!ac.value || !st.value) { alert('Please select both asset class and sub-type.'); return; }
  var cp = document.getElementById('s0ClassifyPanel');
  if (cp) {
    var body = cp.children[1];
    if (body) {
      body.innerHTML = '<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;gap:12px;padding:24px 16px;">'+
        '<div style="width:42px;height:42px;border-radius:50%;background:#FFF0D6;border:2px solid #C8902E;display:flex;align-items:center;justify-content:center;flex-shrink:0;">'+
          '<span style="color:#C8902E;font-size:20px;font-weight:700;">✓</span>'+
        '</div>'+
        '<div style="color:#7A5500;font-weight:700;font-size:13px;font-family:Arial,sans-serif;text-align:center;">Asset reviewed</div>'+
        (byResearch ? '<div style="background:#FFF0D6;border:1px solid #C8902E;border-radius:12px;padding:3px 10px;font-size:10px;font-weight:700;color:#7A5500;font-family:Arial,sans-serif;">✓ Research reviewed</div>' : '')+
      '</div>';
    }
    setTimeout(function() {
      cp.dataset.resolved = '1';
      cp.style.transition = 'opacity .4s';
      cp.style.opacity = '0';
      setTimeout(function() { cp.style.display = 'none'; cp.style.opacity = ''; }, 420);
    }, 2000);
  }
}

