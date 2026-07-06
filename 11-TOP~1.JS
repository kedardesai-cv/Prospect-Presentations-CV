const selectedDataTiles = new Set();
const selectedTopics = new Set();
let activeTopic = null;
let narrativesVisible = true;  // shown by default

const tileDetails = {
  'dt-aum':       { title:'Total AUM', rows:[['MS-5931 (Self-directed)','$3,567,079','59.0%'],['MS-2627 (BlackRock MAPS)','$2,485,095','41.0%'],['Total','$6,052,174','']] },
  'dt-acct':      { title:'Account Split', rows:[['MS-5931','$3,567,079','Self-directed equity + alts + cash'],['MS-2627','$2,485,095','BlackRock MAPS 60/40 model']] },
  'dt-equity-tot':{ title:'Total Equity Exposure', rows:[['Individual Equities (MS-5931)','$1,605,698','26.5%'],['Market ETFs (MS-2627)','$1,579,576','26.1%'],['Combined','$3,185,274','52.6%']] },
  'dt-fi-pct':    { title:'Fixed Income', rows:[['Private/Direct (MS-5931)','$525,515','8.7% — Blue Owl, NH PIF, NH NET REIT'],['ETF FI (MS-2627)','$842,137','13.9% — iShares bond ETFs'],['Combined','$1,367,652','22.6%']] },
  'dt-cash-pct':  { title:'Cash', rows:[['Cash (MS-5931)','$656,281','Uninvested'],['Preferred Savings (MS-5931)','$220,658','MSBNA low-yield'],['Cash (MS-2627)','$4,181','Nominal'],['Total','$881,120','14.6% — CV FI opportunity: ~$45K/yr']] },
  'dt-alts-pct':  { title:'Alternatives', rows:[['K-Infra-O Cl A','$269,231','4.4%'],['Blackstone BXPE','$148,599','2.5%'],['K-Pec Offshore','$141,097','2.3%'],['Total','$558,927','9.2% — all illiquid private funds']] },
  'dt-pos':       { title:'Positions', rows:[['Individual Equities','10','MS-5931 only'],['ETFs (Equity)','12+','MS-2627 MAPS model'],['Private/Alt Funds','5','BXPE, K-Pec, K-Infra, Blue Owl, NH PIF'],['Fixed Income ETFs','10+','MS-2627'],['Total','~38','']] },
  'dt-top3':      { title:'Top-3 Equity P&L Attribution', rows:[['Transocean (RIG)','$395,986','6.5% of portfolio'],['Brookfield Corp (BN)','$340,875','5.6%'],['Warrior Met Coal (HCC)','$266,368','4.4%'],['Top-3 Share of Equity P&L','93%','Remaining 7 stocks = 7%']] },
  'dt-rig':       { title:'Transocean (RIG)', rows:[['Market Value','$395,986','6.5% of portfolio'],['Sector','Energy Services','Offshore drilling contractor'],['Risk','High','96% below 2008 peak; oil-price dependent']] },
  'dt-bn':        { title:'Brookfield Corp (BN)', rows:[['Market Value','$340,875','5.6%'],['Purchase','Dec 2023','~2x since purchase (+~13% vs S&P'],['Fwd P/E','13.1x','Above 3yr avg ~11x']] },
  'dt-hcc':       { title:'Warrior Met Coal (HCC)', rows:[['Market Value','$266,368','4.4%'],['Sector','Materials','Met coal for steel production'],['Risk','Medium','Energy transition + regulatory headwinds']] },
  'dt-etf-corr':  { title:'ETF Correlation to MSCI World', rows:[['MS-2627 ETF avg correlation','0.97','Near-perfect co-movement'],['Implication','Nominal diversification','12 ETFs ≈ 1 broad market bet'],['Cost','Model + ETF fees','~3% gross-to-net gap/yr']] },
  'dt-us-geo':    { title:'US Geographic Exposure', rows:[['United States','$3,810K','62.9%'],['Global / Multi','$1,530K','25.2%'],['United Kingdom','$248K','4.1%'],['Japan','$194K','3.2%'],['Canada','$52K','0.9%'],['Emerging Markets','$109K','1.8%']] },
  'dt-fee-pct':   { title:'All-In Fee Rate', rows:[['MS Advisory Fee','~0.50%','Estimated'],['Alt Fund Mgmt Fees','~0.27%','BXPE, K-Pec, K-Infra'],['Sales Loads (amortized)','~0.18%',''],['Distribution Fees','~0.15%',''],['ETF Expense Ratios','~0.04%',''],['Performance Allocations','~0.05%',''],['Total','~1.19%','$72K/yr on $6.05M']] },
  'dt-fee-dollar':{ title:'Annual Fee Total', rows:[['Estimated Annual Cost','$71,964/yr','1.19% all-in'],['MS Advisory Fee','~$30,261','0.50% on AUM'],['Alt Fund Fees','~$16,343','1.25–1.50% on $558K alts'],['Other','~$25,360','Loads, distribution, ETF exp.']] },
  'dt-ms-fee':    { title:'MS Advisory Fee', rows:[['Estimated Rate','~0.50%','Applied across both accounts'],['Annual Estimated Cost','~$30,261','On $6.05M total AUM'],['Note','Estimate only','Actual rate per account agreement']] },
  'dt-alt-fees':  { title:'Alt Fund Management Fees', rows:[['BXPE (Blackstone)','1.25%/yr','+ performance allocation'],['K-Pec Offshore (KKR)','1.50%/yr','+ sales load'],['K-Infra-O (KKR)','1.25%/yr','+ sales load + distribution'],['NH NET REIT (MS)','1.25%/yr','+ conflict: MS-owned fund']] },
  'dt-bm-gap':    { title:'BlackRock MAPS Gross-to-Net Gap', rows:[['MS-2627 Gross Return (est.)','~11.4%/yr','Model gross'],['Net After All Fees','~8.4%/yr','~3% fee drag'],['5yr Net Annualized','4.72%','vs CV 60/40 net 7.71%'],['5yr Terminal Value Gap','~$510K','On $2.49M over 5 years']] },
  'dt-fi-ytw':    { title:'Current FI Yield (MS-2627)', rows:[['MS-2627 FI YTW','~4.50%','iShares bond ETF portfolio'],['Average Credit Quality','A','Investment grade'],['Duration','~5–7yr est.','Mixed ETF profile']] },
  'dt-cv-ytw':    { title:'CV Fixed Income Yield', rows:[['CV FI YTW','5.13%','Active bond management'],['Average Credit Quality','BBB+','Marginally lower than MS-2627'],['ITD Total Return (Aug 2019)','118%','vs ~106% Frio FI approach']] },
  'dt-fi-gap':    { title:'FI Yield Gap', rows:[['+63 bps advantage','CV vs MS-2627 FI','5.13% vs 4.50%'],['On $1.37M FI allocation','~$8,600/yr','Annual income differential']] },
  'dt-cash-amt':  { title:'Uninvested Cash', rows:[['Cash (MS-5931)','$656,281','Earning near 0%'],['Preferred Savings (MS-5931)','$220,658','Low-yield MSBNA product'],['Total','$877K','14.5% of portfolio sitting idle']] },
  'dt-cash-opp':  { title:'Cash Deployment Opportunity', rows:[['Current Yield on Cash','~0.5% est.','Near-zero on idle cash'],['CV FI YTW','5.13%','Active deployment target'],['Annual Opportunity Gap','~$40,795/yr','On $877K deployed at 5.13% vs 0.5%']] },
  'dt-alts-amt':  { title:'Total Alternative Exposure', rows:[['K-Infra-O Cl A','$269,231','4.4% — KKR Infrastructure'],['Blackstone BXPE','$148,599','2.5% — PE retail fund'],['K-Pec Offshore','$141,097','2.3% — KKR PE Credit'],['Total','$558,927','9.2% — all illiquid']] },
  'dt-bxpe':      { title:'Blackstone BXPE', rows:[['Market Value','$148,599','2.5%'],['ITD Net Return','11.6%','vs S&P 500 23.2% same period'],['Fee','1.25%+','Management + performance']] },
  'dt-kpec':      { title:'K-Pec Offshore (KKR)', rows:[['Market Value','$141,097','2.3%'],['ITD Net Return','15.16%','vs S&P 500 21.6% same period'],['Fee','1.50%+','Management + sales load']] },
  'dt-kinfra':    { title:'K-Infra-O (KKR)', rows:[['Market Value','$269,231','4.4%'],['Distribution Rate','4.23%','Annual distribution'],['Fee','1.25%+','Management + distribution fees']] },
  'dt-nh':        { title:'North Haven PIF (MS-Owned)', rows:[['NH NET REIT Value','$262,268','4.3%'],['Structure','Private REIT','Morgan Stanley proprietary'],['Conflict','High','MS earns advisory + fund fees'],['NH PIF (iCapital)','$131,699','2.2% — separate direct lending fund']] },
};

function toggleDataTile(el) {
  const id = el.dataset.id;
  if (selectedDataTiles.has(id)) {
    selectedDataTiles.delete(id);
    el.classList.remove('selected');
  } else {
    selectedDataTiles.add(id);
    el.classList.add('selected');
  }
  const n = selectedDataTiles.size;
  const info = document.getElementById('dataTileInfo');
  const cnt = document.getElementById('dataTileCount');
  if (info) info.style.display = n > 0 ? 'block' : 'none';
  if (cnt) cnt.textContent = n;

  // Show detail panel for most-recently-clicked tile
  const detail = document.getElementById('dataTileDetail');
  if (!detail) return;
  if (!selectedDataTiles.has(id)) {
    // If deselected and nothing selected, hide panel
    if (n === 0) { detail.classList.remove('open'); detail.innerHTML = ''; }
    else {
      // Show last selected tile detail
      const lastId = [...selectedDataTiles].pop();
      showTileDetail(lastId);
    }
    return;
  }
  showTileDetail(id);
}

function showTileDetail(id) {
  const detail = document.getElementById('dataTileDetail');
  if (!detail) return;
  const d = tileDetails[id];
  if (!d) { detail.classList.remove('open'); return; }
  let html = '<div class="tdp-header">' + d.title + '</div>';
  d.rows.forEach(function(r) {
    html += '<div class="tdp-row"><span>' + r[0] + '</span><span><span class="tdp-val">' + r[1] + '</span>';
    if (r[2]) html += ' <span class="tdp-sub">— ' + r[2] + '</span>';
    html += '</span></div>';
  });
  detail.innerHTML = html;
  detail.classList.add('open');
}
const topicDetails = {
  'Account Structure': {
    hdr: 'ACCOUNT STRUCTURE — $6.05M · 2 UNCOORDINATED ACCOUNTS',
    tiles: [
      { lbl:'MS-5931 (Self-directed)',       val:'$3,567,079 · 59.0%' },
      { lbl:'MS-2627 (BlackRock MAPS)',      val:'$2,485,095 · 41.0%' },
      { lbl:'Unified IPS',                   val:'None' },
      { lbl:'Account Coordination',          val:'None — managed in silos' },
      { lbl:'MS-5931 Mandate',               val:'Equity, alts, private credit, $877K cash' },
      { lbl:'MS-2627 Mandate',               val:'BlackRock Target Alloc. 60/40 MAPS' },
      { note:'The two accounts share no return target, risk framework, or investment policy. Household-level exposure is unmanaged.' }
    ]
  },
  'Geographic Exposure': {
    hdr: 'GEOGRAPHIC EXPOSURE — $6.05M HOUSEHOLD',
    tiles: [
      { lbl:'United States',                 val:'$3,810K · 62.9%' },
      { lbl:'Global / Multi-region',         val:'$1,530K · 25.2%' },
      { lbl:'United Kingdom',                val:'$248K · 4.1%' },
      { lbl:'Japan',                         val:'$194K · 3.2%' },
      { lbl:'Canada',                        val:'$52K · 0.9%' },
      { lbl:'Emerging Markets',              val:'$109K · 1.8%' },
      { note:'International exposure accessed primarily through broad ETFs in MS-2627, not dedicated geographic allocations.' }
    ]
  },
  'Equity-Individual': {
    hdr: 'INDIVIDUAL EQUITY — $1,605,698 · 26.5% · 10 POSITIONS',
    tiles: [
      { lbl:'Transocean (RIG)',               val:'$395,986 · 6.5% — energy services, offshore drilling' },
      { lbl:'Brookfield Corp (BN)',           val:'$340,875 · 5.6% — +~100% since Dec 2023' },
      { lbl:'Warrior Met Coal (HCC)',         val:'$266,368 · 4.4% — met coal for steel production' },
      { lbl:'Berkshire Hathaway (BRK/B)',    val:'$201,980 · 3.3%' },
      { lbl:'Pulte Group (PHM)',              val:'$164,640 · 2.7% — homebuilder' },
      { lbl:'Alpha Metallurgical (AMR)',      val:'$58,554 · 1.0% — coal' },
      { lbl:'AutoNation (AN)',                val:'$58,548 · 1.0%' },
      { lbl:'Toll Brothers (TOL)',            val:'$55,034 · 0.9% — luxury homebuilder' },
      { lbl:'Group 1 Automotive (GPI)',       val:'$39,089 · 0.6%' },
      { lbl:'Core Natural Resources (CNR)',   val:'$24,624 · 0.4%' },
      { note:'Top 3 positions (RIG, BN, HCC) account for 93% of individual equity P&L attribution. Energy/coal = 12.3% of total portfolio.' }
    ]
  },
  'ETF Overlap': {
    hdr: 'ETF OVERLAP — MS-2627 · 12 ETFS · AVG CORR 0.97 TO MSCI WORLD',
    tiles: [
      { lbl:'iShares Core S&P 500',           val:'Largest ETF position in MS-2627' },
      { lbl:'iShares MSCI ACWI',              val:'Global multi-region exposure' },
      { lbl:'iShares EM ex-China',            val:'Emerging market sleeve' },
      { lbl:'iShares MSCI Japan',             val:'Japan single-country allocation' },
      { lbl:'iShares Core MSCI Europe',       val:'European developed market' },
      { lbl:'ETF Count',                      val:'12 equity ETFs in MAPS model' },
      { lbl:'Avg Correlation to MSCI World',  val:'0.97 — near-perfect co-movement' },
      { lbl:'Diversification Value',          val:'Nominal — 12 ETFs ≈ 1 broad market bet' },
      { lbl:'Gross-to-Net Fee Gap',           val:'~3%/yr advisory + model + ETF layers' },
      { note:'Holdings span US large cap, international developed, EM, and sector mandates — but all move together. No real diversification benefit.' }
    ]
  },
  'Fixed Income': {
    hdr: 'FIXED INCOME — 22.6% ($1.37M)',
    tiles: [
      { lbl:'Bond ETFs (MAPS sleeve)',        val:'$651K · 10.8% · Sub-type: ETF' },
      { lbl:'Direct Lending',                 val:'$263K · 4.3% · Blue Owl + NH PIF' },
      { lbl:'Private REIT',                   val:'$262K · 4.3% · NH NET REIT' },
      { lbl:'Corporate HY ETF',               val:'$105K · 1.7% · iShares IHYA' },
      { lbl:'Sovereign IG ETF',               val:'$86K · 1.4% · iShares DTLA (20+yr)' },
      { lbl:'Current YTW (MS-2627 sleeve)',   val:'4.50% · avg rating A' },
      { lbl:'CV FI YTW',                      val:'5.13% · avg rating BBB+' },
      { lbl:'Yield Gap',                      val:'+63 bps · ~$8,600/yr on $1.37M' },
      { lbl:'Illiquid FI (DL + REIT)',        val:'$525K · 8.7% of total AUM' },
      { note:'Direct Lending & Private REIT are Fixed Income per CV accounting — not Alternatives.' }
    ]
  },
  'Fee Analysis': {
    hdr: 'FEE ANALYSIS — EST. ALL-IN 1.19% · $71,964/YR',
    tiles: [
      { lbl:'MS Advisory Fee',                val:'~0.50% · ~$30,261/yr' },
      { lbl:'Alt Fund Mgmt Fees',             val:'~0.27% · 1.25–1.50% on $559K' },
      { lbl:'Sales Loads (amortized)',        val:'~0.18%' },
      { lbl:'Distribution Fees',              val:'~0.15%' },
      { lbl:'Performance Allocations',        val:'~0.05%' },
      { lbl:'ETF Expense Ratios',             val:'~0.04%' },
      { lbl:'BlackRock MAPS Gross-to-Net',    val:'~3%/yr gross vs net drag' },
      { lbl:'5yr Terminal Value Gap (BLK)',   val:'~$510K on $2.49M vs CV net' },
      { note:'Fee layers appear across multiple statements and fund documents. Client has no consolidated view of total cost.' }
    ]
  },
  'Alternatives': {
    hdr: 'ALTERNATIVES — 9.2% ($559K) · SUB-TYPE: FUND',
    tiles: [
      { lbl:'Total Alternatives (CV)',        val:'$559K · 9.2% · 3 positions' },
      { lbl:'BXPE (Blackstone)',              val:'$149K · 2.5% · ITD Net 11.6% vs S&P 23.2%' },
      { lbl:'K-PEC Offshore',                 val:'$141K · 2.3% · ITD Net 15.16% vs S&P 21.6%' },
      { lbl:'K-Infra-O CI A',                 val:'$269K · 4.4% · 4.23% annual distribution' },
      { lbl:'K-PEC Invested Since',           val:'March 1, 2025' },
      { lbl:'Alt Fund Fees',                  val:'1.25–1.50% mgmt (retail share class)' },
      { note:'Blue Owl and North Haven PIF = Direct Lending (Fixed Income). NH NET REIT = Private REIT (Fixed Income). Not counted in the 9.2% alternatives figure.' }
    ]
  },
  'Cash Deployment': {
    hdr: 'CASH — $881K UNINVESTED · 14.6% OF PORTFOLIO',
    tiles: [
      { lbl:'Uninvested Cash (MS-5931)',      val:'$656,281 — earning near zero' },
      { lbl:'MSBNA Preferred Savings',        val:'$220,658 — low-yield cash equivalent' },
      { lbl:'Cash (MS-2627)',                 val:'$4,181 — nominal' },
      { lbl:'Total Idle',                     val:'$881,120 · 14.6% of portfolio' },
      { lbl:'CV FI YTW',                      val:'5.13% — potential deployment target' },
      { lbl:'Annual Uplift Opportunity',      val:'~$40,795/yr at 5.13% vs ~0.5% current' },
      { note:'$877K idle in MS-5931 alone. At CV FI yield of 5.13% vs current ~0.5%, annual income differential is approximately $40K.' }
    ]
  },
  'Tax & Cost Basis': {
    hdr: 'TAX & COST BASIS — NOTES FROM PORTFOLIO',
    tiles: [
      { lbl:'Cost Basis Data',               val:'Not available in source statements' },
      { lbl:'Largest Unrealized Gain (est.)', val:'BN — ~+100% since Dec 2023' },
      { lbl:'Energy/Coal Positions',          val:'RIG, HCC, AMR, CNR — elevated transition risk' },
      { lbl:'Private Funds',                  val:'Redemption timing controls tax event' },
      { lbl:'MS-2627 MAPS',                   val:'Managed account — tax-loss harvesting possible' },
      { note:'Full tax analysis requires cost basis data from Morgan Stanley. Estimated gains are significant on BN and energy positions.' }
    ]
  },
  'Leverage & Structured Products': {
    hdr: 'LEVERAGE & STRUCTURED PRODUCTS — NONE IDENTIFIED',
    tiles: [
      { lbl:'Margin / Leverage',              val:'None identified in source data' },
      { lbl:'Structured Notes',               val:'None identified' },
      { lbl:'Options / Derivatives',          val:'None identified' },
      { lbl:'Private Fund Leverage',          val:'KKR / Blackstone funds may use internal leverage' },
      { note:'No direct leverage or structured products in the Frio portfolio. Note: retail alternative funds (BXPE, K-PEC, K-Infra) may employ leverage at the fund level.' }
    ]
  },
  'CV Track Record': {
    hdr: 'CV ADVISORS TRACK RECORD — NET COMPOSITE RETURNS',
    tiles: [
      { lbl:'CV 60/40 1yr Net',               val:'13.81%' },
      { lbl:'BlackRock MAPS 60/40 1yr Net',   val:'13.43%' },
      { lbl:'CV 60/40 5yr Annualized Net',    val:'7.71%' },
      { lbl:'BlackRock MAPS 5yr Ann. Net',    val:'4.72%' },
      { lbl:'CV FI 1yr Net',                  val:'7.15%' },
      { lbl:'CV FI ITD Net (since Aug 2019)', val:'+118% vs Frio FI +106%' },
      { lbl:'5yr Terminal Value Gap',         val:'~$510K on $2.49M over 5 years' },
      { lbl:'CV Max Advisory Fee',            val:'0.70%' },
      { note:'Past performance is not indicative of future results. Returns shown net of maximum CV advisory fee of 0.70%.' }
    ]
  }
};

function toggleTopic(el) {
  var topic = el.dataset.topic;
  var panel = document.getElementById('topicDataPanel');

  if (selectedTopics.has(topic)) {
    // deselect
    selectedTopics.delete(topic);
    el.classList.remove('checked');
    activeTopic = selectedTopics.size ? [...selectedTopics].slice(-1)[0] : null;
  } else {
    // select and show its data
    selectedTopics.add(topic);
    el.classList.add('checked');
    activeTopic = topic;
  }

  // Render data panels for ALL selected topics
  if (panel) {
    if (selectedTopics.size === 0) {
      panel.innerHTML = '';
    } else {
      var allHtml = '';
      selectedTopics.forEach(function(t) {
        var d = topicDetails[t];
        if (!d) return;
        var html = '<div class="card-exp-hdr">' + d.hdr + '</div><div class="card-exp-list">';
        var note = '';
        d.tiles.forEach(function(tile) {
          if (tile.note) { note = tile.note; } else {
            html += '<div class="card-exp-row"><div class="card-exp-key">' + tile.lbl +
                    '</div><div class="card-exp-val">' + tile.val + '</div></div>';
          }
        });
        html += '</div>';
        if (note) html += '<span class="card-exp-note">' + note + '</span>';
        allHtml += '<div class="card-expansion open" style="margin-bottom:10px;">' + html + '</div>';
      });
      panel.innerHTML = allHtml;
    }
  }

  var cnt = document.getElementById('topicSelCount');
  if (cnt) {
    var n = selectedTopics.size;
    cnt.textContent = n === 0 ? 'No topics selected' : n + ' topic' + (n > 1 ? 's' : '') + ' selected';
  }
  renderBlueprint();
}



function toggleNarratives() {
  narrativesVisible = !narrativesVisible;
  var w = document.getElementById('narrativesWrap');
  var b = document.getElementById('narrativeToggleBtn');
  if (w) w.style.display = narrativesVisible ? 'block' : 'none';
  if (b) b.textContent = narrativesVisible ? 'Hide Recommended Narratives' : 'Show Recommended Narratives';
}

// ============================
// STATEMENT SOURCE DETECTION (Item 6)
// ============================
