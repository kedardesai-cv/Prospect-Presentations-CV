// ============================
// RESIZABLE PANELS — collapse to zero
// ============================
(function() {
  function makeDraggable(handleId, panelId, side) {
    const handle = document.getElementById(handleId);
    const panel = document.getElementById(panelId);
    let dragging = false, startX, startW;

    handle.addEventListener('mousedown', e => {
      dragging = true;
      startX = e.clientX;
      startW = panel.offsetWidth;
      handle.classList.add('dragging');
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
      e.preventDefault();
    });

    document.addEventListener('mousemove', e => {
      if (!dragging) return;
      const delta = e.clientX - startX;
      const newW = side === 'left' ? startW + delta : startW - delta;
      const clamped = Math.max(0, Math.min(480, newW));
      panel.style.width = clamped + 'px';
      // Add collapsed class when below 24px so content hides cleanly
      panel.classList.toggle('collapsed', clamped < 24);
    });

    document.addEventListener('mouseup', () => {
      if (!dragging) return;
      dragging = false;
      handle.classList.remove('dragging');
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      // Snap to 0 if very small
      const w = panel.offsetWidth;
      if (w < 24) { panel.style.width = '0px'; panel.classList.add('collapsed'); }
    });

    // Double-click handle to restore default width
    handle.addEventListener('dblclick', () => {
      const defaultW = side === 'left' ? 260 : 340;
      panel.style.width = defaultW + 'px';
      panel.classList.remove('collapsed');
    });
  }

  makeDraggable('dragLeft', 'leftPanel', 'left');
  makeDraggable('dragRight', 'rightPanel', 'right');
})();

// ============================
// STATE
// ============================
const selectedCards = new Set();
const slideChoices = {};

const typeColors = { issue: '#00294D', opportunity: '#4E7496', analysis: '#003767', context: '#4E7496' };

// ============================
// STAGE 1
// ============================
const cardDetails = {
  'no-strategy': {
    hdr: 'ACCOUNT STRUCTURE — $6.05M · 2 ACCOUNTS · NO UNIFIED IPS',
    tiles: [
      { lbl:'MS-5931 (Self-directed)',    val:'$3,567,079 · 59.0%',   },
      { lbl:'MS-2627 (BlackRock MAPS)',   val:'$2,485,095 · 41.0%',   },
      { lbl:'Unified IPS',               val:'None',                   },
      { lbl:'Account Coordination',      val:'None',                   },
      { lbl:'MS-5931 Asset Classes',     val:'Equity, Alts, Priv. Credit, $877K Cash' },
      { lbl:'MS-2627 Model',             val:'BlackRock Target Alloc. 60/40 MAPS' },
      { note: 'The two accounts share no return target, risk framework, or investment policy. Managing them in silos creates overlapping and conflicting exposures at the household level.' }
    ]
  },
  'geo-conc': {
    hdr: 'GEOGRAPHIC EXPOSURE — $6.05M HOUSEHOLD',
    tiles: [
      { lbl:'United States',             val:'$3,810K · 62.9%' },
      { lbl:'Global / Multi-region',     val:'$1,530K · 25.2%' },
      { lbl:'United Kingdom',            val:'$248K · 4.1%' },
      { lbl:'Japan',                     val:'$194K · 3.2%' },
      { lbl:'Canada',                    val:'$52K · 0.9%' },
      { lbl:'Emerging Markets',          val:'$109K · 1.8%' },
      { note: 'International exposure is accessed primarily through broad multi-sector ETFs in MS-2627, not dedicated geographic allocations.' }
    ]
  },
  'acct-breakdown': {
    hdr: 'ACCOUNT-BY-ACCOUNT — $6,052,174 TOTAL',
    tiles: [
      { lbl:'MS-5931 Balance',           val:'$3,567,079' },
      { lbl:'MS-5931 Mandate',           val:'Self-directed equity, alts, priv. credit' },
      { lbl:'MS-5931 Cash',              val:'$877K · 14.5% — uninvested' },
      { lbl:'MS-2627 Balance',           val:'$2,485,095' },
      { lbl:'MS-2627 Mandate',           val:'BlackRock MAPS 60/40 model' },
      { lbl:'MS-2627 ETF Count',         val:'12+ equity + bond ETFs' }
    ]
  },
  'overall-alloc': {
    hdr: 'PORTFOLIO ALLOCATION — 6 ASSET CLASSES · 38 POSITIONS',
    tiles: [
      { lbl:'Individual Equity',         val:'$1,605,698 · 26.5%' },
      { lbl:'Equity ETFs (MS-2627)',     val:'$1,579,576 · 26.1%' },
      { lbl:'Fixed Income',              val:'$1,367,652 · 22.6%' },
      { lbl:'Cash',                      val:'$881,120 · 14.6%' },
      { lbl:'Alternatives',              val:'$558,927 · 9.2%' },
      { lbl:'Commodity (Gold ETF)',       val:'$59,198 · 1.0%' }
    ]
  },
  'equity-conc': {
    hdr: 'EQUITY CONCENTRATION — TOP-3 DRIVE 93% OF P&L ATTRIBUTION',
    tiles: [
      { lbl:'Transocean (RIG)',           val:'$395,986 · 6.5% portfolio · 24.7% of equity P&L' },
      { lbl:'Brookfield Corp (BN)',       val:'$340,875 · 5.6% · 21.2% of equity P&L' },
      { lbl:'Warrior Met Coal (HCC)',     val:'$266,368 · 4.4% · 16.6% of equity P&L' },
      { lbl:'Berkshire Hathaway (BRK/B)', val:'$201,980 · 3.3%' },
      { lbl:'Pulte Group (PHM)',          val:'$164,640 · 2.7%' },
      { lbl:'Remaining 5 positions',      val:'~$125K combined · ~7% equity attribution' },
      { note: 'No documented rebalancing framework or concentration limits exist at the household level across either account.' }
    ]
  },
  'rig': {
    hdr: 'TRANSOCEAN (RIG) — POSITION PROFILE',
    tiles: [
      { lbl:'Market Value',              val:'$395,986 · 6.5% of portfolio' },
      { lbl:'Sector',                    val:'Energy Services — offshore drilling' },
      { lbl:'vs 2008 Peak',              val:'~96% below all-time high' },
      { lbl:'Oil Breakeven',             val:'~$60–70/bbl for deepwater viability' },
      { lbl:'Position Status',           val:'No stop-loss or trim target documented' },
      { lbl:'Correlation',               val:'High to oil price and offshore rig availability' }
    ]
  },
  'etf-overlap': {
    hdr: 'ETF OVERLAP — MS-2627 · 12 ETFS · 0.97 AVG CORRELATION',
    tiles: [
      { lbl:'ETF Count (MS-2627)',       val:'12 ETFs in BlackRock MAPS model' },
      { lbl:'Avg Corr to MSCI World',    val:'0.97 — near-perfect co-movement' },
      { lbl:'Diversification Value',     val:'Nominal — 12 ETFs ≈ 1 broad market bet' },
      { lbl:'Advisory Fee on MS-2627',   val:'~0.50%' },
      { lbl:'BlackRock Model Fee',       val:'Embedded in MAPS structure' },
      { lbl:'Gross-to-Net Gap',          val:'~3%/yr advisory + model + ETF layers' }
    ]
  },
  'bn': {
    hdr: 'BROOKFIELD CORP (BN) — WELL-TIMED WIN, CONCENTRATED RISK',
    tiles: [
      { lbl:'Market Value',              val:'$340,875 · 5.6% of portfolio' },
      { lbl:'Purchase Date',             val:'December 2023' },
      { lbl:'Approx. Return Since Buy',  val:'~+100%' },
      { lbl:'vs S&P 500 Same Period',    val:'Outperformed by ~13pts' },
      { lbl:'Forward P/E',               val:'13.1x — above 3yr hist. avg ~11x' },
      { lbl:'Risk',                      val:'2nd-largest position — single-stock concentration' }
    ]
  },
  'fi-drag': {
    hdr: 'FIXED INCOME — 22.6% ($1.37M)',
    tiles: [
      { lbl:'Bond ETFs (MAPS sleeve)',   val:'$651K · 10.8% · Sub-type: ETF' },
      { lbl:'Direct Lending',            val:'$263K · 4.3% · Blue Owl + NH PIF' },
      { lbl:'Private REIT',              val:'$262K · 4.3% · NH NET REIT' },
      { lbl:'Corporate HY ETF',          val:'$105K · 1.7% · iShares IHYA' },
      { lbl:'Sovereign IG ETF',          val:'$86K · 1.4% · iShares DTLA (20+yr)' },
      { lbl:'Current YTW (MS-2627 FI)',  val:'4.50% · avg rating A' },
      { lbl:'CV FI YTW',                 val:'5.13% · avg rating BBB+' },
      { lbl:'Yield Gap',                 val:'+63 bps · ~$8,600/yr on $1.37M' },
      { lbl:'Illiquid FI (DL + REIT)',   val:'$525K · 8.7% of total AUM' },
      { note: 'Direct Lending & Private REIT are classified as Fixed Income per CV accounting — not Alternatives.' }
    ]
  },
  'cv-fi': {
    hdr: 'CV FIXED INCOME — PERFORMANCE vs FRIO FI APPROACH',
    tiles: [
      { lbl:'CV FI ITD Net Return',      val:'+118% since Aug 2019' },
      { lbl:'Frio FI ITD Return',        val:'+106% same period' },
      { lbl:'Outperformance Gap',        val:'12 percentage points ITD' },
      { lbl:'CV FI 1yr Net',             val:'7.15%' },
      { lbl:'CV FI Yield to Worst',      val:'5.13% · active management' },
      { lbl:'MS-2627 FI YTW',            val:'4.50% · passive ETF stack' }
    ]
  },
  'alts-fees': {
    hdr: 'ALTERNATIVES — 9.2% ($559K) · SUB-TYPE: FUND',
    tiles: [
      { lbl:'Total Alternatives (CV)',   val:'$559K · 9.2% · 3 positions' },
      { lbl:'BXPE (Blackstone)',         val:'$149K · 2.5% · ITD Net 11.6% vs S&P 23.2%' },
      { lbl:'K-PEC Offshore',            val:'$141K · 2.3% · ITD Net 15.16% vs S&P 21.6%' },
      { lbl:'K-Infra-O CI A',            val:'$269K · 4.4% · 4.23% annual distribution' },
      { lbl:'K-PEC Invested Since',      val:'March 1, 2025' },
      { lbl:'Alt Fund Fees',             val:'1.25–1.50% mgmt (retail share class)' },
      { note: 'Note: Blue Owl and North Haven PIF are Direct Lending — classified as Fixed Income. NH NET REIT is a Private REIT — also Fixed Income per CV accounting.' }
    ]
  },
  'total-fees': {
    hdr: 'ALL-IN FEE ANALYSIS — EST. 1.19% · $71,964/YR',
    tiles: [
      { lbl:'MS Advisory Fee',           val:'~0.50% · ~$30,261/yr' },
      { lbl:'Alt Fund Mgmt Fees',        val:'~0.27% · 1.25–1.50% on $559K' },
      { lbl:'Sales Loads (amortized)',   val:'~0.18%' },
      { lbl:'Distribution Fees',         val:'~0.15%' },
      { lbl:'Performance Allocations',   val:'~0.05%' },
      { lbl:'ETF Expense Ratios',        val:'~0.04%' },
      { note: 'Fee layers appear across multiple statements and fund documents. Client has no consolidated view of total cost.' }
    ]
  },
  'north-haven': {
    hdr: 'NORTH HAVEN — MORGAN STANLEY PROPRIETARY PRODUCTS',
    tiles: [
      { lbl:'NH NET REIT',               val:'$262,268 · 4.3% · MS-owned private REIT' },
      { lbl:'NH PIF (iCapital)',         val:'$131,699 · 2.2% · direct lending fund' },
      { lbl:'Conflict Level',            val:'High — MS earns advisory + fund fees' },
      { lbl:'NH NET REIT Gross Yield',   val:'9.0% gross · Retail Class S structure' },
      { lbl:'Fee Load',                  val:'1.25%+ mgmt + distribution fees' },
      { lbl:'Independent Alternatives',  val:'Available at comparable yield profiles' }
    ]
  },
  'aci': {
    hdr: 'INFRASTRUCTURE COMPARISON — K-INFRA vs ARES CORE (ACI)',
    tiles: [
      { lbl:'K-Infra-O Distribution',    val:'4.23%/yr · current holding ($269K)' },
      { lbl:'ACI Distribution Rate',     val:'10.10%/yr · AA- rated' },
      { lbl:'Distribution Gap',          val:'587 bps — annual income difference' },
      { lbl:'ACI Focus',                 val:'Energy transition, digital infra, transport' },
      { lbl:'K-Infra Focus',             val:'Energy and transportation infrastructure' },
      { lbl:'Liquidity Profile',         val:'Both non-traded — comparable illiquidity' }
    ]
  },
  'cash-drag': {
    hdr: 'CASH — $881K UNINVESTED · 14.6% OF PORTFOLIO',
    tiles: [
      { lbl:'Uninvested Cash (MS-5931)',  val:'$656,281 — earning near zero' },
      { lbl:'MSBNA Preferred Savings',   val:'$220,658 — low-yield cash equivalent' },
      { lbl:'Cash (MS-2627)',            val:'$4,181 — nominal' },
      { lbl:'Total Idle',                val:'$881,120 · 14.6% of portfolio' },
      { lbl:'CV FI YTW',                 val:'5.13% — potential deployment target' },
      { lbl:'Annual Uplift Opportunity', val:'~$40,795/yr at 5.13% vs ~0.5% current' }
    ]
  },
  'blackrock-ma': {
    hdr: 'MS-2627 — BLACKROCK MAPS 60/40 · $2,485,095 · 41% OF AUM',
    tiles: [
      { lbl:'Model',                     val:'BlackRock Target Allocation 60/40 MAPS' },
      { lbl:'Mandate',                   val:'Standardized — not customized to Frio' },
      { lbl:'Gross-to-Net Gap',          val:'~3%/yr advisory + model + ETF fees' },
      { lbl:'IPS Alignment',             val:'None — does not reference MS-5931' },
      { lbl:'5yr Net Annualized',        val:'4.72% vs CV 60/40 net 7.71%' },
      { lbl:'5yr Terminal Value Gap',    val:'~$510K on $2.49M over 5 years' }
    ]
  },
  'cv-6040': {
    hdr: 'CV 60/40 vs BLACKROCK MAPS — NET RETURN COMPARISON',
    tiles: [
      { lbl:'CV 60/40 1yr Net',          val:'13.81%' },
      { lbl:'BlackRock MAPS 1yr Net',    val:'13.43%' },
      { lbl:'CV 60/40 5yr Annualized',   val:'7.71%' },
      { lbl:'BlackRock MAPS 5yr Ann.',   val:'4.72%' },
      { lbl:'5yr Terminal Value Gap',    val:'~$510K on $2.49M net of max CV fee' },
      { lbl:'CV Max Advisory Fee',       val:'0.70%' },
      { note: 'Past performance is not indicative of future results. Returns shown are net of maximum CV advisory fee of 0.70%.' }
    ]
  },
  'ips': {
    hdr: 'INVESTMENT POLICY STATEMENT — CURRENTLY NONE',
    tiles: [
      { lbl:'Current IPS',               val:'None — no documented investment policy' },
      { lbl:'Accounts Covered',          val:'0 of 2 — neither MS-5931 nor MS-2627' },
      { lbl:'Return Objective',          val:'Not defined' },
      { lbl:'Risk Parameters',           val:'Not defined' },
      { lbl:'Liquidity Requirements',    val:'Not defined' },
      { lbl:'CV IPS Process',            val:'Collaborative — built live with client' }
    ]
  },
  'next-steps': {
    hdr: 'SUMMARY — KEY ISSUES & TRANSITION OVERVIEW',
    tiles: [
      { lbl:'Issues Identified',         val:'5 major themes' },
      { lbl:'Themes',                    val:'Concentration · Fees · Cash · Conflicts · No IPS' },
      { lbl:'Accounts to Transition',    val:'2 (both MS accounts)' },
      { lbl:'Custodian Transfer',        val:'ACAT from Morgan Stanley to CV custodian' },
      { lbl:'Estimated Timeline',        val:'30–60 days — transfer + onboarding' },
      { lbl:'Action Item',               val:'Schedule follow-up to define IPS together' }
    ]
  }
};

function renderCardExpansion(id) {
  const d = cardDetails[id];
  if (!d) return '';
  let html = '<div class="card-exp-hdr">' + d.hdr + '</div>';
  html += '<div class="card-exp-list">';
  let note = '';
  d.rows.forEach(function(r) {
    if (r[2] && r[2].startsWith('NOTE:')) {
      note = r[2].slice(5).trim();
    } else {
      html += '<div class="card-exp-row"><div class="card-exp-key">' + r[0] +
              '</div><div class="card-exp-val">' + r[1] +
              (r[2] ? ' <span style="font-size:9.5px;font-weight:400;color:#4E7496"> — ' + r[2] + '</span>' : '') +
              '</div></div>';
    }
  });
  html += '</div>';
  if (note) html += '<span class="card-exp-note">' + note + '</span>';
  return html;
}

function toggleCard(el) {
  const id = el.dataset.id;
  if (selectedCards.has(id)) {
    selectedCards.delete(id);
    el.classList.remove('selected');
  } else {
    selectedCards.add(id);
    el.classList.add('selected');
  }
  renderBlueprint();
}

function setStage(n) {
  [0,1,2,3,4].forEach(i => {
    const el = document.getElementById('stage'+i);
    if (el) el.style.display = i === n ? 'flex' : 'none';
    const tab = document.getElementById('tab'+i);
    if (tab) {
      tab.classList.remove('active','done');
      if (i < n) tab.classList.add('done');
      if (i === n) tab.classList.add('active');
    }
  });
  // Panels + drag handles: hidden in stage 0, visible in stages 1+
  const lp = document.getElementById('leftPanel');
  const dl = document.getElementById('dragLeft');
  const rp = document.getElementById('rightPanel');
  const dr = document.getElementById('dragRight');
  const hidden = n === 0 ? 'none' : '';
  if (lp) lp.style.display = hidden;
  if (dl) dl.style.display = hidden;
  if (rp) rp.style.display = hidden;
  if (dr) dr.style.display = hidden;
  if (n === 4) setTimeout(buildExportOutline, 50);

  // Stage-0 side panels
  var cp0 = document.getElementById('s0ClassifyPanel');
  if (cp0) cp0.style.display = (n === 0 && !cp0.dataset.resolved) ? 'flex' : 'none';
  var sdp0 = document.getElementById('s0SelfDirectedPanel');
  if (sdp0) {
    if (n === 0 && !sdp0.dataset.resolved) { buildSelfDirectedPanel(); sdp0.style.display = 'flex'; }
    else sdp0.style.display = 'none';
  }
}

function proceedToStage2() {
  if (!selectedCards.size && !selectedTopics.size) {
    alert('Please select at least one topic or story component before proceeding.');
    return;
  }
  buildStage2();
  setStage(2);
}

// ============================
// SLIDE LIBRARY
// ============================
