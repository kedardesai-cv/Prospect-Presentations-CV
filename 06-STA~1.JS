let s4Slides = [];
let s4CurrentIdx = -1;
const s4Edits = {}; // idx -> {instructions, aiContent}

function proceedToStage3() {
  if (!Object.values(slideChoices).some(a => a.length > 0)) {
    alert('Please select at least one slide option in Step 2 before previewing.'); return;
  }
  buildS4Slides();
  setStage(3);
}

function buildS4Slides() {
  s4Slides = [];
  let num = 21;
  document.querySelectorAll('.component-card').forEach(card => {
    const id = card.dataset.id;
    if (!selectedCards.has(id)) return;
    const chosen = slideChoices[id] || [];
    chosen.forEach(s => {
      s4Slides.push({ cid: id, oid: s.id, name: s.name, type: s.type, pageNum: num++ });
    });
  });
  renderS4Filmstrip();
  if (s4Slides.length > 0) selectS4Slide(0);
  else {
    const s4outer = document.getElementById('s4SlideOuter'); if(s4outer) s4outer.innerHTML = '<div class="s4-empty-state"><div class="s4-empty-icon">☐</div>No slides selected in Step 2.</div>';
    const s4name = document.getElementById('s4EditSlideName'); if(s4name) s4name.textContent = 'No slides selected';
    const s4body = document.getElementById('s4EditBody'); if(s4body) s4body.innerHTML = '';
  }
}

function renderS4Filmstrip() {
  const strip = document.getElementById('s4Filmstrip');
  if (!s4Slides.length) {
    strip.innerHTML = '<div class="s4-empty-state"><div class="s4-empty-icon">☐</div>No slides selected.</div>';
    return;
  }
  strip.innerHTML = s4Slides.map((sl, idx) => {
    const innerHTML = buildFullSlide(sl.cid, sl.oid, sl.name, sl.pageNum);
    return `
    <div class="s4-thumb-wrap">
      <div class="s4-thumb ${idx === s4CurrentIdx ? 'active' : ''}" id="s4th-${idx}" onclick="selectS4Slide(${idx})">
        <div class="s4-thumb-num" style="position:absolute;top:3px;left:3px;background:rgba(0,0,0,0.5);color:white;font-size:6px;font-weight:700;padding:1px 4px;border-radius:2px;z-index:10;font-family:Arial,sans-serif">${sl.pageNum}</div>
        <div class="s4-thumb-scale-outer">
          <div class="s4-thumb-scale-inner">${innerHTML}</div>
        </div>
      </div>
      <div class="s4-thumb-actions">
        <button class="s4-thumb-btn" onclick="s4MoveUp(${idx})" ${idx===0?'disabled':''} title="Move up">▲</button>
        <button class="s4-thumb-btn" onclick="s4MoveDown(${idx})" ${idx===s4Slides.length-1?'disabled':''} title="Move down">▼</button>
      </div>
      <div class="s4-thumb-name">${sl.name}</div>
    </div>`;
  }).join('');
}

function selectS4Slide(idx) {
  s4CurrentIdx = idx;
  renderS4Filmstrip();
  const sl = s4Slides[idx];
  if (!sl) return;
  document.getElementById('s4SlideOuter').innerHTML = buildFullSlide(sl.cid, sl.oid, sl.name, sl.pageNum);
  document.getElementById('s4EditSlideName').textContent = sl.name;
  renderS4EditPanel(idx);
}

function s4MoveUp(idx) {
  if (idx <= 0) return;
  [s4Slides[idx-1], s4Slides[idx]] = [s4Slides[idx], s4Slides[idx-1]];
  // Renumber
  s4Slides.forEach((sl, i) => sl.pageNum = 21 + i);
  renderS4Filmstrip();
  selectS4Slide(idx-1);
}

function s4MoveDown(idx) {
  if (idx >= s4Slides.length - 1) return;
  [s4Slides[idx], s4Slides[idx+1]] = [s4Slides[idx+1], s4Slides[idx]];
  s4Slides.forEach((sl, i) => sl.pageNum = 21 + i);
  renderS4Filmstrip();
  selectS4Slide(idx+1);
}

function renderS4EditPanel(idx) {
  const sl = s4Slides[idx];
  const lib = slideLib[sl.cid] || {};
  const opts = lib.opts || [];
  const opt = opts.find(o => o.id === sl.oid) || {};
  const dataPoint = opt.desc || '';
  const edit = s4Edits[idx] || {};
  document.getElementById('s4EditBody').innerHTML = `
    <div class="s4-edit-section-lbl">Slide Type</div>
    <div class="s4-notes-box">${sl.type}</div>
    <div class="s4-edit-section-lbl">Description</div>
    <div style="font-family:Arial,sans-serif;font-size:10px;color:var(--text-muted);line-height:1.5">${dataPoint}</div>
    <div class="s4-edit-section-lbl" style="margin-top:14px">AI Edit Instruction</div>
    <textarea class="s4-instruction-box" id="s4Instr-${idx}" placeholder="e.g. Make the tone more conservative. Emphasize the fee impact. Add a footnote about liquidity.">${edit.instructions||''}</textarea>
    <button class="s4-regen-btn" id="s4RegenBtn-${idx}" onclick="s4Regen(${idx})">Regenerate Slide</button>
    <div class="s4-ai-out ${edit.aiContent?'vis':''}" id="s4AiOut-${idx}">${edit.aiContent||''}</div>
    <div class="s4-edit-section-lbl" style="margin-top:14px">Key Data</div>
    ${getSlideDataPoints(sl.cid, sl.oid)}
  `;
}

function getSlideDataPoints(cid, oid) {
  const dataMap = {
    'ns-tbl': [['MS-5931','$3.57M (59%)'],['MS-2627','$2.49M (41%)'],['Unified IPS','None'],['Coordination','None']],
    'ns-pie': [['Account split','59% / 41%'],['Total AUM','$6.05M'],['Accounts','2 (MS)']],
    'ns-ips': [['Return target','TBD'],['Risk framework','None defined'],['Horizon','Long-term']],
    'ns-metric': [['Shared IPS','0'],['Coordinated accounts','0 of 2'],['AUM at risk','$6.05M']],
    'ec-bar': [['Top position (RIG)','24.7% of equity'],['Top 3 of equity P&L','93%'],['Total equity positions','10']],
    'ec-pnl': [['RIG contrib.','24.7%'],['HCC contrib.','16.6%'],['BN contrib.','21.2%'],['Rest combined','7%']],
    'ec-risk': [['Top-3 concentration','93% of P&L'],['S&P 500 top-3 equiv.','~18%'],['Excess concentration','~75pp']],
    'rig-px': [['Price','~$6.46'],['2008 peak','$121'],['Decline from peak','96%'],['Market cap','$7.6B']],
    'rig-card': [['Position size','$395K (6.5%)'],['Oil break-even','~$60–70/bbl'],['Drawdown from peak','96%']],
    'rig-fact': [['Ticker','RIG'],['Size','$395K'],['% of portfolio','6.5%'],['Sector','Energy / Offshore']],
    'bn-perf': [['Purchase date','Dec 2023'],['Return since purchase','~+100%'],['vs. S&P 500','+13pp outperformance']],
    'bn-val': [['Fwd P/E','13.1x'],['3-yr avg P/E','~11x'],['Position','$341K (5.6%)']],
    'bn-fact': [['Ticker','BN'],['Size','$341K'],['% of portfolio','5.6%']],
    'eo-corr': [['ETFs in MS-2627','12'],['Avg. correlation to MSCI World','0.97'],['Effective diversification','Minimal']],
    'eo-bar': [['Avg. corr.','0.97'],['Lowest corr.','~0.94'],['Highest corr.','~0.99']],
    'eo-metric': [['ETF count','12'],['Avg. corr. to MSCI World','0.97'],['Fee layers','2 (advisory + ETF ER)']],
    'fi-ytw': [['Current YTW (MS-2627)','4.50%'],['CV YTW','5.13%'],['Gap','63 bps'],['Dollar impact','+$8,600/yr']],
    'fi-dur': [['Avg credit quality (current)','A'],['CV avg credit quality','BBB+'],['Duration','Comparable']],
    'fi-gap': [['YTW gap','63 bps'],['FI allocation','$1.37M'],['Annual foregone income','~$8,600']],
    'cvfi-line': [['CV FI ITD','~+118%'],['Frio FI ITD','~+106%'],['Since','Aug 2019'],['Gap','12pp']],
    'cvfi-tbl': [['1yr CV FI','7.15%'],['5yr CV FI','2.13%'],['ITD CV FI','4.71%'],['vs. AGG','outperformed']],
    'af-vs': [['BXPE ITD','11.6%'],['S&P 500 same period','23.2%'],['K-PEC ITD','15.16%'],['S&P 500 same period','21.6%']],
    'af-fees': [['K-Infra mgmt fee','1.50%'],['BXPE load + fee','~1.25%+'],['K-PEC mgmt fee','1.25%+'],['Total alt AUM','~$558K']],
    'af-net': [['BXPE net vs. gross','significant drag'],['K-PEC net return','15.16% ITD'],['K-Infra distribution','4.23%']],
    'tf-fall': [['MS advisory fee','~0.50%'],['Alt fund fees','~0.40%'],['ETF expense ratios','~0.05%'],['Total','1.19% ($72K/yr)']],
    'tf-tbl': [['All-in fee estimate','1.19%'],['Dollar amount','+$71,964/yr'],['Accounts','2 (MS)']],
    'tf-vs': [['Current all-in','~1.19%'],['CV estimated all-in','lower'],['Annual saving est.','meaningful']],
    'nh-conf': [['Fund','North Haven PIF'],['Owner','Morgan Stanley'],['Gross yield','9.0%'],['Share class','Retail Class S']],
    'nh-vs': [['NH yield','9.0% gross'],['Independent alt yield','comparable or higher'],['Conflict','dual-fee structure']],
    'aci-vs': [['ACI dist. rate','10.10%'],['K-Infra dist. rate','4.23%'],['Gap','587 bps'],['ACI credit','AA-']],
    'aci-card': [['Fund','Ares Core Infrastructure'],['Distribution','10.10%'],['Credit quality','AA-'],['Sectors','Energy, Digital, Transport']],
    'aci-bar': [['ACI','10.10%'],['K-Infra','4.23%'],['Spread','587 bps']],
    'cd-scen': [['Uninvested cash','$881K'],['At current yield','~$0 incremental'],['At CV FI 5.13%','~$45,200/yr']],
    'cd-bar': [['Cash position','$881K (14.6%)'],['CV FI yield','5.13%'],['Annual income uplift','~$45,200']],
    'cd-metric': [['Cash','$881K'],['% of portfolio','14.6%'],['Opportunity cost','+$45K/yr']],
    'bm-net': [['BlackRock MAPS gross/net gap','~3%/yr'],['MS-2627 AUM','$2.49M'],['Impact','+$75K/yr in gross-to-net drag']],
    'bm-model': [['Model type','BlackRock MAPS 60/40'],['Customization','None'],['Applied to','Thousands of clients']],
    'cv60-tbl': [['CV 60/40 1yr','13.81%'],['BlackRock 1yr (net)','13.43%'],['CV 60/40 5yr','7.71%'],['BlackRock 5yr (net)','4.72%']],
    'cv60-line': [['CV 5yr','7.71% ann.'],['BlackRock 5yr (net)','4.72% ann.'],['Gap','~299 bps/yr'],['Terminal value delta (5yr, $2.49M)','~$380K']],
    'ips-fw': [['Return objective','TBD'],['Risk tolerance','TBD'],['Liquidity','TBD'],['Time horizon','TBD']],
    'ns-sum': [['Issues flagged','6'],['Est. fee savings','significant'],['Cash to deploy','$881K'],['AUM','$6.05M']],
    'geo-map': [['US','62.9%'],['Global','25.2%'],['EM','1.8%'],['Canada','6.5%']],
    'geo-bar': [['US','62.9%'],['Global','25.2%'],['Canada','6.5%'],['EM','1.8%']],
    'geo-tbl': [['US','62.9%'],['Global','25.2%'],['Canada','6.5%'],['Japan','1.4%'],['EM','1.8%']],
    'geo-donut': [['US','62.9%'],['Global','25.2%'],['Canada','6.5%'],['UK','1.4%'],['EM','1.8%']],
    'ab-cards': [['MS-5931','$3.57M (59%)'],['MS-2627 (MA)','$2.49M (41%)'],['Strategy split','Self-directed / Model']],
    'ab-top5': [['RIG','$395K (6.5%)'],['BN','$341K (5.6%)'],['HCC','$266K (4.4%)'],['BRK/B','$202K (3.3%)'],['PHM','$165K (2.7%)']],
    'ab-split': [['MS-5931','59%'],['MS-2627','41%'],['Total','$6.05M']],
    'oa-donut': [['Equity Indiv.','26.5%'],['Equity Market','26.1%'],['Fixed Income','22.6%'],['Cash','14.6%'],['Alternatives','9.2%'],['Commodity','1.0%']],
    'oa-tree': [['Positions','38'],['Largest (RIG)','6.5%'],['Cash','14.6%'],['Asset classes','6']],
    'oa-tbl': [['Total positions','38'],['Accounts','2'],['Asset classes','6'],['AUM','$6.05M']],
    'oa-stack': [['Equity (total)','52.6%'],['Fixed Income','22.6%'],['Cash','14.6%'],['Alternatives','9.2%'],['Commodity','1.0%']],
    'ec-sect': [['Energy','26.2%'],['Materials','20.2%'],['Financials','33.8%'],['Consumer Disc.','19.8%']],
    'ec-metric': [['Top-3 equity P&L share','93%'],['Top-3 combined','62.5% of equity']],
    'af-table2': [['K-Infra','~$267K'],['BXPE','~$161K'],['K-PEC','~$130K'],['Total alts','~$558K']],
    'tf-stack': [['MS advisory','~42%'],['Alt fees','~34%'],['ETF ER','~4%'],['Other','~20%']],
    'nh-fact': [['North Haven PIF','MS-owned'],['Gross yield','9.0%'],['Class','Retail S'],['Conflict','Dual-fee']],
    'cvfi-line': [['CV FI ITD','+118%'],['Frio FI ITD','+106%'],['Gap','12pp since Aug 2019']]
  };
  const pts = dataMap[oid] || [];
  if (!pts.length) return '<div style="font-family:Arial,sans-serif;font-size:10px;color:var(--text-muted)">No data points available.</div>';
  return pts.map(([k,v]) => `<div class="s4-data-point"><span class="s4-data-k">${k}</span><span class="s4-data-v">${v}</span></div>`).join('');
}

async function s4Regen(idx) {
  const sl = s4Slides[idx];
  const instrEl = document.getElementById('s4Instr-'+idx);
  const btn = document.getElementById('s4RegenBtn-'+idx);
  const out = document.getElementById('s4AiOut-'+idx);
  const instr = instrEl ? instrEl.value.trim() : '';
  if (!instr) { alert('Please enter an instruction for AI to regenerate this slide.'); return; }
  btn.disabled = true; btn.textContent = 'Regenerating...';
  out.classList.remove('vis'); out.textContent = '';
  const lib = slideLib[sl.cid] || {};
  const opts = lib.opts || [];
  const opt = opts.find(o => o.id === sl.oid) || {};
  try {
    const prompt = `You are a CV Advisors portfolio manager. Slide: "${sl.name}" (type: ${sl.type}).\n` +
      `Slide description: ${opt.desc || ''}\n` +
      `Portfolio context: ${portfolioCtx}\n\n` +
      `PM instruction: "${instr}"\n\n` +
      `Provide revised talking points for this slide. Professional, data-driven, under 150 words.`;
    let text = 'No response.';
    if (window.cowork && window.cowork.askClaude) {
      const r = await window.cowork.askClaude(prompt, []);
      text = (typeof r === 'string') ? r : (r && r.content) ? (Array.isArray(r.content) ? r.content[0].text : r.content) : 'No response.';
    } else { text = 'AI not available.'; }
    if (!s4Edits[idx]) s4Edits[idx] = {};
    s4Edits[idx].instructions = instr;
    s4Edits[idx].aiContent = text;
    out.textContent = text;
    out.classList.add('vis');
  } catch(e) {
    out.textContent = 'Error: '+(e.message||e);
    out.classList.add('vis');
  }
  btn.disabled = false; btn.textContent = 'Regenerate Slide';
}

// ============================
// FULL SLIDE BUILDER
// ============================
function buildFullSlide(cid, oid, name, pageNum) {
  const lib = slideLib[cid] || {};
  const sectionMap = {
    'no-strategy':'Portfolio Structure','geo-conc':'Portfolio Structure','acct-breakdown':'Portfolio Overview',
    'overall-alloc':'Portfolio Overview','equity-conc':'Equity Analysis','rig':'Equity Analysis',
    'etf-overlap':'Equity Analysis','bn':'Equity Analysis','fi-drag':'Fixed Income','cv-fi':'Fixed Income',
    'alts-fees':'Alternatives','total-fees':'Fee Analysis','north-haven':'Alternatives',
    'aci':'Alternatives','cash-drag':'Cash Deployment','blackrock-ma':'MS-2627 Analysis',
    'cv-6040':'CV Strategy','ips':'Engagement','next-steps':'Summary'
  };
  const section = sectionMap[cid] || 'Portfolio Analysis';
  const content = getFullSlideContent(cid, oid);
  const aumTag = getSlideAUM(cid);
  return `
  <div class="s4-hdr">
    <span class="s4-section-lbl">${section}</span>
    <img src="https://cdn.prod.website-files.com/64ad12a8fd63ac59d8665252/64ad357a567a71fb9edcbcbe_logo_white.svg" class="s4-logo" onerror="this.style.display='none'">
  </div>
  <div class="s4-title-band">
    ${aumTag ? `<span class="s4-aum-tag">${aumTag}</span>` : ''}
    <div class="s4-slide-title">${name}</div>
    <div class="s4-slide-sub">${getSlideSubtitle(cid, oid)}</div>
  </div>
  <div class="s4-divider"></div>
  <div class="s4-content">${content}</div>
  <div class="s4-footer">
    <span>Confidential</span>
    <span class="s4-foot-c">${pageNum}</span>
    <span>June 2026</span>
  </div>`;
}

function getSlideAUM(cid) {
  const aumMap = {
    'equity-conc':'$1.6M', 'rig':'$0.4M', 'bn':'$0.3M',
    'cash-drag':'$0.9M', 'alts-fees':'$0.6M', 'total-fees':'$6.1M',
    'fi-drag':'$1.4M', 'cv-fi':'$6.1M', 'overall-alloc':'$6.1M',
    'acct-breakdown':'$6.1M', 'no-strategy':'$6.1M', 'cv-6040':'$2.5M',
    'blackrock-ma':'$2.5M', 'north-haven':'$6.1M', 'aci':'$6.1M',
    'geo-conc':'$6.1M', 'etf-overlap':'$2.5M'
  };
  return aumMap[cid] || '';
}

function getSlideSubtitle(cid, oid) {
  const stMap = {
    'no-strategy': 'Two accounts, two strategies, no coordination at the household level',
    'geo-conc': 'Exposure data as of Feb 2026 — unaudited, based on provided brokerage statements',
    'acct-breakdown': 'MS-5931 ($3.57M) and MS-2627 managed account ($2.49M)',
    'overall-alloc': '38 positions across six asset classes — as of February 28, 2026',
    'equity-conc': '10 individual equity positions in MS-5931 | Exposure as of Feb 2026',
    'rig': 'Transocean Ltd (RIG) — deepwater offshore driller | 6.5% of total portfolio',
    'etf-overlap': '12 equity ETFs in MS-2627 managed account — BlackRock MAPS 60/40',
    'bn': 'Brookfield Corporation (BN) — purchased December 2023',
    'fi-drag': 'Fixed income comparison: MS-2627 MAPS sleeve vs. CV Fixed Income approach',
    'cv-fi': 'CV Fixed Income Composite (Net) vs. current approach — since August 2019',
    'alts-fees': 'K-Infra, BXPE, K-PEC — total alternative exposure ~$558K (9.2%)',
    'total-fees': 'Estimated all-in fee calculation — all layers across both accounts',
    'north-haven': 'North Haven Private Income Fund — Morgan Stanley proprietary product',
    'aci': 'Ares Core Infrastructure vs. current KKR Infrastructure holding',
    'cash-drag': 'MS-5931: $656K uninvested cash + $221K cash equivalent savings vehicle',
    'blackrock-ma': 'MS-2627: BlackRock Target Allocation MAPS 60/40 model portfolio',
    'cv-6040': 'CV Blended (60% Equity Market / 40% Fixed Income) vs. BlackRock MAPS 60/40 net',
    'ips': 'Investment Policy Statement framework — defining objectives together',
    'next-steps': 'Issues identified · CV recommendations · Proposed transition outline'
  };
  return stMap[cid] || 'Frio Portfolio Analysis — March 2026';
}

