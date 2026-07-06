function getFullSlideContent(cid, oid) {
  const key = cid + '|' + oid;
  switch(key) {

    case 'no-strategy|ns-tbl':
      return `<table class="s4-tbl" style="height:100%">
        <thead><tr><th style="width:28%">Element</th><th>MS-5931 — Self-Directed ($3.57M)</th><th>MS-2627 — Managed Account ($2.49M)</th></tr></thead>
        <tbody>
          <tr><td>Strategy Type</td><td class="s4-td-navy">Self-directed</td><td class="s4-td-navy">BlackRock Target Allocation MAPS 60/40</td></tr>
          <tr><td>Primary Mandate</td><td>Concentrated individual equities + alternative fund holdings</td><td>Standardized model portfolio — applied to thousands of clients</td></tr>
          <tr><td>Investment Policy Statement</td><td class="s4-td-slate">None</td><td class="s4-td-slate">None</td></tr>
          <tr><td>Risk Framework</td><td class="s4-td-slate">Not defined</td><td class="s4-td-slate">BlackRock model default</td></tr>
          <tr><td>Household Coordination</td><td colspan="2" class="s4-td-navy" style="text-align:center">No coordination between accounts — strategies have never been aligned</td></tr>
          <tr><td>Return Objective</td><td class="s4-td-slate">Not stated</td><td class="s4-td-slate">Model benchmark</td></tr>
        </tbody>
      </table>`;

    case 'no-strategy|ns-metric':
      return `<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:3%;height:100%">
        <div class="s4-callout">
          <div class="s4-callout-num">0</div>
          <div class="s4-callout-lbl">Unified Investment Policy Statements across both accounts</div>
          <div class="s4-callout-sub">MS-5931 and MS-2627 have operated independently since inception with no shared mandate.</div>
        </div>
        <div class="s4-callout slate">
          <div class="s4-callout-num">0</div>
          <div class="s4-callout-lbl">Shared risk framework or return target at the household level</div>
          <div class="s4-callout-sub">No agreed asset allocation target applies to the combined $6.05M.</div>
        </div>
        <div class="s4-callout" style="background:#003767">
          <div class="s4-callout-num">59/41</div>
          <div class="s4-callout-lbl">AUM split between two uncoordinated strategies</div>
          <div class="s4-callout-sub">$3.57M self-directed + $2.49M model — running in parallel without coordination.</div>
        </div>
      </div>`;

    case 'no-strategy|ns-ips':
      return `<div class="s4-cols">
        <div class="s4-col">
          <div class="s4-col-hdr">Current State — No Unified IPS</div>
          <div class="s4-col-body">
            <div class="s4-col-row"><span class="s4-col-row-k">Return Objective</span><span class="s4-col-row-v bad">Not defined</span></div>
            <div class="s4-col-row"><span class="s4-col-row-k">Risk Tolerance</span><span class="s4-col-row-v bad">Not stated</span></div>
            <div class="s4-col-row"><span class="s4-col-row-k">Liquidity Requirements</span><span class="s4-col-row-v bad">Not documented</span></div>
            <div class="s4-col-row"><span class="s4-col-row-k">Time Horizon</span><span class="s4-col-row-v bad">Not agreed</span></div>
            <div class="s4-col-row"><span class="s4-col-row-k">Asset Allocation Target</span><span class="s4-col-row-v bad">None</span></div>
            <div class="s4-col-row"><span class="s4-col-row-k">Rebalancing Policy</span><span class="s4-col-row-v bad">None applied</span></div>
            <div class="s4-col-row"><span class="s4-col-row-k">Tax Sensitivity</span><span class="s4-col-row-v bad">Not considered</span></div>
          </div>
        </div>
        <div class="s4-col">
          <div class="s4-col-hdr slate">CV Advisors IPS Framework</div>
          <div class="s4-col-body">
            <div class="s4-col-row"><span class="s4-col-row-k">Return Objective</span><span class="s4-col-row-v good">Defined collaboratively</span></div>
            <div class="s4-col-row"><span class="s4-col-row-k">Risk Tolerance</span><span class="s4-col-row-v good">Documented and stress-tested</span></div>
            <div class="s4-col-row"><span class="s4-col-row-k">Liquidity Requirements</span><span class="s4-col-row-v good">Identified and planned</span></div>
            <div class="s4-col-row"><span class="s4-col-row-k">Time Horizon</span><span class="s4-col-row-v good">Formally set</span></div>
            <div class="s4-col-row"><span class="s4-col-row-k">Asset Allocation Target</span><span class="s4-col-row-v good">Household-level target</span></div>
            <div class="s4-col-row"><span class="s4-col-row-k">Rebalancing Policy</span><span class="s4-col-row-v good">Rules-based, consistent</span></div>
            <div class="s4-col-row"><span class="s4-col-row-k">Tax Sensitivity</span><span class="s4-col-row-v good">Integrated into construction</span></div>
          </div>
        </div>
      </div>`;

    case 'overall-alloc|oa-donut':
      return `<div style="display:flex;gap:4%;height:100%;align-items:center">
        <div style="flex:1;height:90%">
          <svg viewBox="0 0 220 220" style="width:100%;height:100%">
            <circle cx="110" cy="110" r="80" fill="none" stroke="#00294D" stroke-width="38" stroke-dasharray="166 335" stroke-dashoffset="0"/>
            <circle cx="110" cy="110" r="80" fill="none" stroke="#003767" stroke-width="38" stroke-dasharray="164 335" stroke-dashoffset="-166"/>
            <circle cx="110" cy="110" r="80" fill="none" stroke="#4E7496" stroke-width="38" stroke-dasharray="142 335" stroke-dashoffset="-330"/>
            <circle cx="110" cy="110" r="80" fill="none" stroke="#7A9CB8" stroke-width="38" stroke-dasharray="92 335" stroke-dashoffset="-472"/>
            <circle cx="110" cy="110" r="80" fill="none" stroke="#A8BFD0" stroke-width="38" stroke-dasharray="58 335" stroke-dashoffset="-564"/>
            <circle cx="110" cy="110" r="80" fill="none" stroke="#D0D8E4" stroke-width="38" stroke-dasharray="6 335" stroke-dashoffset="-622"/>
            <text x="110" y="104" text-anchor="middle" font-family="Calibri,Arial" font-weight="700" font-size="22" fill="#00294D">$6.05M</text>
            <text x="110" y="120" text-anchor="middle" font-family="Calibri,Arial" font-size="10" fill="#8A949E">Total AUM</text>
          </svg>
        </div>
        <div style="flex:1.2;display:flex;flex-direction:column;gap:4%;justify-content:center">
          ${[['Equity Individual','26.5%','#00294D'],['Equity Market ETFs','26.1%','#003767'],['Fixed Income','22.6%','#4E7496'],['Cash','14.6%','#7A9CB8'],['Alternatives','9.2%','#A8BFD0'],['Commodity','1.0%','#D0D8E4']].map(([l,v,c])=>`
          <div style="display:flex;align-items:center;gap:8px;font-family:Calibri,Arial,sans-serif">
            <div style="width:12px;height:12px;border-radius:2px;background:${c};flex-shrink:0"></div>
            <span style="flex:1;font-size:11px;color:#1D1F20">${l}</span>
            <span style="font-weight:700;font-size:12px;color:#00294D">${v}</span>
          </div>`).join('')}
        </div>
      </div>`;

    case 'overall-alloc|oa-stack':
      return `<div class="s4-bar-chart">
        ${[['Equity Individual','26.5%',26.5,'#00294D'],['Equity Market ETFs','26.1%',26.1,'#003767'],['Fixed Income','22.6%',22.6,'#4E7496'],['Cash','14.6%',14.6,'#7A9CB8'],['Alternatives','9.2%',9.2,'#A8BFD0'],['Commodity','1.0%',1.0,'#D0D8E4']].map(([l,pct,w,c])=>`
        <div class="s4-bar-row">
          <span class="s4-bar-lbl" style="width:140px">${l}</span>
          <div class="s4-bar-outer"><div class="s4-bar-fill" style="width:${w*3.4}%;background:${c}"></div></div>
          <span class="s4-bar-val">${pct}</span>
        </div>`).join('')}
      </div>`;

    case 'overall-alloc|oa-tbl':
      return `<table class="s4-tbl">
        <thead><tr><th>Asset Class</th><th>Holdings</th><th>Market Value</th><th>% of Portfolio</th></tr></thead>
        <tbody>
          <tr><td class="s4-td-navy">Equity Individual</td><td>10 positions</td><td>$1,604K</td><td class="s4-td-navy">26.5%</td></tr>
          <tr><td class="s4-td-navy">Equity Market ETFs</td><td>12 ETFs (BlackRock MAPS)</td><td>$1,580K</td><td class="s4-td-navy">26.1%</td></tr>
          <tr><td class="s4-td-navy">Fixed Income</td><td>MS-2627 FI sleeve</td><td>$1,369K</td><td class="s4-td-navy">22.6%</td></tr>
          <tr><td class="s4-td-navy">Cash</td><td>Uninvested + savings vehicle</td><td>$884K</td><td class="s4-td-navy">14.6%</td></tr>
          <tr><td class="s4-td-navy">Alternatives</td><td>K-Infra, BXPE, K-PEC</td><td>$557K</td><td class="s4-td-navy">9.2%</td></tr>
          <tr><td class="s4-td-navy">Commodity</td><td>1 position</td><td>$61K</td><td class="s4-td-navy">1.0%</td></tr>
          <tr><td colspan="2" style="font-weight:700;color:#00294D">Total</td><td style="font-weight:700;color:#00294D">$6,055K</td><td style="font-weight:700;color:#00294D">100%</td></tr>
        </tbody>
      </table>`;

    case 'acct-breakdown|ab-cards':
      return `<div class="s4-cols">
        <div class="s4-col">
          <div class="s4-col-hdr">MS-5931 — Self-Directed</div>
          <div class="s4-col-body">
            <div class="s4-col-row"><span class="s4-col-row-k">AUM</span><span class="s4-col-row-v">$3,570K (59%)</span></div>
            <div class="s4-col-row"><span class="s4-col-row-k">Strategy</span><span class="s4-col-row-v">Self-directed</span></div>
            <div class="s4-col-row"><span class="s4-col-row-k">Equity Individual</span><span class="s4-col-row-v">45.0%</span></div>
            <div class="s4-col-row"><span class="s4-col-row-k">Alternatives</span><span class="s4-col-row-v">15.7%</span></div>
            <div class="s4-col-row"><span class="s4-col-row-k">Fixed Income</span><span class="s4-col-row-v">14.7%</span></div>
            <div class="s4-col-row"><span class="s4-col-row-k">Cash</span><span class="s4-col-row-v">24.6%</span></div>
            <div class="s4-col-row"><span class="s4-col-row-k">Top Position</span><span class="s4-col-row-v">RIG (24.7% of equity)</span></div>
            <div class="s4-col-row"><span class="s4-col-row-k">IPS / Risk framework</span><span class="s4-col-row-v bad">None</span></div>
          </div>
        </div>
        <div class="s4-col">
          <div class="s4-col-hdr slate">MS-2627 — Managed Account</div>
          <div class="s4-col-body">
            <div class="s4-col-row"><span class="s4-col-row-k">AUM</span><span class="s4-col-row-v">$2,490K (41%)</span></div>
            <div class="s4-col-row"><span class="s4-col-row-k">Strategy</span><span class="s4-col-row-v">BlackRock MAPS 60/40</span></div>
            <div class="s4-col-row"><span class="s4-col-row-k">Equity Market ETFs</span><span class="s4-col-row-v">63.6%</span></div>
            <div class="s4-col-row"><span class="s4-col-row-k">Fixed Income</span><span class="s4-col-row-v">33.9%</span></div>
            <div class="s4-col-row"><span class="s4-col-row-k">Cash</span><span class="s4-col-row-v">2.4%</span></div>
            <div class="s4-col-row"><span class="s4-col-row-k">ETFs held</span><span class="s4-col-row-v">12 (iShares)</span></div>
            <div class="s4-col-row"><span class="s4-col-row-k">Model type</span><span class="s4-col-row-v">Standardized (off-the-shelf)</span></div>
            <div class="s4-col-row"><span class="s4-col-row-k">Customization</span><span class="s4-col-row-v bad">None</span></div>
          </div>
        </div>
      </div>`;

    case 'equity-conc|ec-bar':
      return `<div class="s4-bar-chart">
        ${[['Transocean (RIG)','24.7%',24.7,'#00294D'],['Brookfield Corp (BN)','21.2%',21.2,'#00294D'],['Warrior Met Coal (HCC)','16.6%',16.6,'#003767'],['Berkshire Hathaway (BRK/B)','12.6%',12.6,'#4E7496'],['Pulte Group (PHM)','10.3%',10.3,'#4E7496'],['AutoNation (AN)','3.6%',3.6,'#7A9CB8'],['Alpha Metallurgical (AMR)','3.6%',3.6,'#7A9CB8'],['Toll Brothers (TOL)','3.4%',3.4,'#A8BFD0'],['Core Natural Resources','2.4%',2.4,'#A8BFD0'],['Automotive Inc','1.5%',1.5,'#D0D8E4']].map(([l,pct,w,c])=>`
        <div class="s4-bar-row">
          <span class="s4-bar-lbl" style="width:170px;font-size:10px">${l}</span>
          <div class="s4-bar-outer"><div class="s4-bar-fill" style="width:${Math.min(w*4,100)}%;background:${c}"></div></div>
          <span class="s4-bar-val">${pct}</span>
        </div>`).join('')}
      </div>`;

    case 'equity-conc|ec-pnl':
      return `<div style="display:flex;gap:3%;height:100%;align-items:stretch">
        <div style="flex:1;display:flex;flex-direction:column;gap:3%">
          <div class="s4-callout" style="flex:2">
            <div class="s4-callout-num">93%</div>
            <div class="s4-callout-lbl">of total individual equity P&L comes from just three positions</div>
            <div class="s4-callout-sub">RIG 24.7% · HCC 16.6% · BN 21.2% = 62.5% combined equity weight</div>
          </div>
          <div class="s4-callout slate" style="flex:1">
            <div class="s4-callout-num">7%</div>
            <div class="s4-callout-lbl">of P&L from the remaining seven equity positions</div>
          </div>
        </div>
        <div style="flex:1.5">
          <table class="s4-tbl" style="height:100%">
            <thead><tr><th>Position</th><th>Equity Weight</th><th>P&L Contribution</th></tr></thead>
            <tbody>
              <tr><td class="s4-td-navy">Transocean (RIG)</td><td>24.7%</td><td class="s4-td-navy">~36%</td></tr>
              <tr><td class="s4-td-navy">Brookfield (BN)</td><td>21.2%</td><td class="s4-td-navy">~31%</td></tr>
              <tr><td class="s4-td-navy">Warrior Met Coal (HCC)</td><td>16.6%</td><td class="s4-td-navy">~26%</td></tr>
              <tr><td class="s4-td-muted" colspan="3">7 remaining positions — combined</td></tr>
              <tr><td class="s4-td-muted">Other 7</td><td>37.5%</td><td class="s4-td-slate">~7%</td></tr>
            </tbody>
          </table>
        </div>
      </div>`;

    case 'equity-conc|ec-metric':
      return `<div style="display:flex;gap:3%;height:100%">
        <div class="s4-callout" style="flex:1.3">
          <div class="s4-callout-num">93%</div>
          <div class="s4-callout-lbl">of all individual equity P&L comes from three positions — RIG, BN, and HCC</div>
          <div class="s4-callout-sub">The remaining seven equity positions contribute approximately 7% of equity P&L, making them economically immaterial to household outcomes.</div>
        </div>
        <div style="flex:1;display:flex;flex-direction:column;gap:3%">
          <div class="s4-stat-card navy"><div class="s4-stat-num">$395K</div><div class="s4-stat-lbl">Transocean (RIG)</div><div class="s4-stat-sub">Largest single position — 6.5% of total portfolio</div></div>
          <div class="s4-stat-card deep"><div class="s4-stat-num">$341K</div><div class="s4-stat-lbl">Brookfield (BN)</div><div class="s4-stat-sub">~100% gain since Dec 2023 — now concentrated single-stock risk</div></div>
          <div class="s4-stat-card slate"><div class="s4-stat-num">$266K</div><div class="s4-stat-lbl">Warrior Met Coal (HCC)</div><div class="s4-stat-sub">Stock reached ATH in Jan 2026 while earnings fell 77%</div></div>
        </div>
      </div>`;

    case 'rig|rig-card':
      return `<div class="s4-cols">
        <div class="s4-col" style="flex:1">
          <div class="s4-col-hdr">RIG — Position Profile</div>
          <div class="s4-col-body">
            <div class="s4-col-row"><span class="s4-col-row-k">Position size</span><span class="s4-col-row-v">$395K (6.5%)</span></div>
            <div class="s4-col-row"><span class="s4-col-row-k">Current price</span><span class="s4-col-row-v">~$6.46</span></div>
            <div class="s4-col-row"><span class="s4-col-row-k">2008 peak price</span><span class="s4-col-row-v">$121</span></div>
            <div class="s4-col-row"><span class="s4-col-row-k">Decline from peak</span><span class="s4-col-row-v bad">–96%</span></div>
            <div class="s4-col-row"><span class="s4-col-row-k">Market cap</span><span class="s4-col-row-v">$7.6B</span></div>
            <div class="s4-col-row"><span class="s4-col-row-k">Oil break-even</span><span class="s4-col-row-v">~$60–70/bbl</span></div>
            <div class="s4-col-row"><span class="s4-col-row-k">Sector</span><span class="s4-col-row-v">Energy / Offshore drilling</span></div>
          </div>
        </div>
        <div class="s4-col" style="flex:1.4">
          <div class="s4-col-hdr slate">Key Risk Factors</div>
          <div class="s4-col-body" style="display:flex;flex-direction:column;gap:4%">
            <div style="border-left:3px solid #00294D;padding-left:8px">
              <div style="font-size:10px;font-weight:700;color:#00294D;margin-bottom:2px">Oil Price Dependency</div>
              <div style="font-size:9px;color:#6b7a87">Deepwater drilling only becomes viable above ~$60–70/bbl. Every material move in the stock has been driven by oil price changes, not company performance.</div>
            </div>
            <div style="border-left:3px solid #4E7496;padding-left:8px">
              <div style="font-size:10px;font-weight:700;color:#003767;margin-bottom:2px">Structural Leverage Risk</div>
              <div style="font-size:9px;color:#6b7a87">High fixed-cost structure means small revenue declines translate to large earnings swings. Balance sheet has been rebuilt post-restructuring but remains leveraged.</div>
            </div>
            <div style="border-left:3px solid #4E7496;padding-left:8px">
              <div style="font-size:10px;font-weight:700;color:#003767;margin-bottom:2px">Recent Recovery Is Macro-Driven</div>
              <div style="font-size:9px;color:#6b7a87">Gains since the 2020 trough reflect elevated oil prices and rig scarcity — not company-specific improvement. Those tailwinds are not guaranteed to persist.</div>
            </div>
          </div>
        </div>
      </div>`;

    case 'rig|rig-fact':
      return `<div style="display:grid;grid-template-columns:1fr 1fr 1fr;grid-template-rows:1fr 1fr;gap:3%;height:100%">
        <div class="s4-stat-card navy"><div class="s4-stat-num">$395K</div><div class="s4-stat-lbl">Position Size</div><div class="s4-stat-sub">6.5% of total $6.05M portfolio</div></div>
        <div class="s4-stat-card"><div class="s4-stat-num" style="color:#00294D">–96%</div><div class="s4-stat-lbl">Below 2008 Peak</div><div class="s4-stat-sub">$121 peak (Jun 2008) → ~$6.46 today</div></div>
        <div class="s4-stat-card"><div class="s4-stat-num" style="color:#4E7496">$7.6B</div><div class="s4-stat-lbl">Market Cap</div><div class="s4-stat-sub">Offshore drilling — pure oil price proxy</div></div>
        <div class="s4-stat-card deep"><div class="s4-stat-num">$60–70</div><div class="s4-stat-lbl">Oil Break-Even ($/bbl)</div><div class="s4-stat-sub">Deepwater only viable above this threshold</div></div>
        <div class="s4-stat-card slate"><div class="s4-stat-num">#1</div><div class="s4-stat-lbl">Largest Single Equity</div><div class="s4-stat-sub">Largest individual equity position in MS-5931</div></div>
        <div class="s4-stat-card"><div class="s4-stat-num" style="color:#00294D">99.4%</div><div class="s4-stat-lbl">Peak-to-Trough Drawdown</div><div class="s4-stat-sub">$121 → $0.67 (Oct 2020) — 99.4% loss</div></div>
      </div>`;

    case 'bn|bn-perf':
      return `<div style="display:flex;gap:3%;height:100%">
        <div style="flex:1;display:flex;flex-direction:column;gap:3%">
          <div class="s4-stat-card navy"><div class="s4-stat-num">~+100%</div><div class="s4-stat-lbl">BN Return Since Purchase</div><div class="s4-stat-sub">Purchased December 2023</div></div>
          <div class="s4-stat-card slate"><div class="s4-stat-num">+13pp</div><div class="s4-stat-lbl">Outperformance vs. S&P 500</div><div class="s4-stat-sub">S&P 500 over the same Dec 2023–present period</div></div>
          <div class="s4-stat-card"><div class="s4-stat-num" style="color:#00294D">$341K</div><div class="s4-stat-lbl">Current Position Size</div><div class="s4-stat-sub">5.6% of total portfolio — #2 individual equity</div></div>
        </div>
        <div style="flex:2;display:flex;flex-direction:column">
          <div style="background:#F4F5F5;border-radius:4px;padding:3%;flex:1;display:flex;flex-direction:column;justify-content:space-between">
            <div style="font-family:Calibri,Arial;font-size:10px;color:#8A949E;margin-bottom:6px">BN vs. S&P 500 — Dec 2023 to Present (Illustrative)</div>
            <svg viewBox="0 0 300 150" style="width:100%;flex:1">
              <line x1="20" y1="130" x2="290" y2="130" stroke="#D4D6D9" stroke-width="1"/>
              <line x1="20" y1="130" x2="20" y2="10" stroke="#D4D6D9" stroke-width="1"/>
              <polyline points="20,130 80,110 140,90 200,60 260,30 290,20" fill="none" stroke="#00294D" stroke-width="2.5"/>
              <polyline points="20,130 80,115 140,100 200,80 260,65 290,60" fill="none" stroke="#4E7496" stroke-width="2"/>
              <text x="295" y="22" font-family="Calibri,Arial" font-size="9" fill="#00294D" text-anchor="start">BN +100%</text>
              <text x="295" y="62" font-family="Calibri,Arial" font-size="9" fill="#4E7496" text-anchor="start">S&P +87%</text>
              <text x="20" y="145" font-family="Calibri,Arial" font-size="8" fill="#8A949E">Dec 2023</text>
              <text x="260" y="145" font-family="Calibri,Arial" font-size="8" fill="#8A949E">Present</text>
            </svg>
            <div style="font-family:Calibri,Arial;font-size:8.5px;color:#8A949E;margin-top:4px">Illustrative — for discussion purposes only. See disclosures.</div>
          </div>
        </div>
      </div>`;

    case 'bn|bn-val':
      return `<div style="display:flex;gap:3%;height:100%">
        <div style="flex:1;display:flex;flex-direction:column;gap:3%">
          <div class="s4-callout">
            <div class="s4-callout-num">13.1x</div>
            <div class="s4-callout-lbl">Brookfield's current forward P/E</div>
            <div class="s4-callout-sub">Above its 3-year historical average of ~11x — suggesting the easy valuation expansion may be behind us.</div>
          </div>
          <div class="s4-stat-card">
            <div class="s4-stat-num" style="color:#4E7496">~11x</div>
            <div class="s4-stat-lbl">3-Year Average Forward P/E</div>
            <div class="s4-stat-sub">Current 13.1x sits ~19% above 3yr average</div>
          </div>
        </div>
        <div style="flex:1.5">
          <table class="s4-tbl" style="height:100%">
            <thead><tr><th>Metric</th><th>Value</th><th>Context</th></tr></thead>
            <tbody>
              <tr><td>Position Size</td><td class="s4-td-navy">$341K</td><td>5.6% of total portfolio</td></tr>
              <tr><td>Return Since Purchase</td><td class="s4-td-navy">~+100%</td><td>Dec 2023 to present</td></tr>
              <tr><td>Current Fwd P/E</td><td class="s4-td-navy">13.1x</td><td>Above 3yr avg (~11x)</td></tr>
              <tr><td>3-Yr Avg Fwd P/E</td><td class="s4-td-slate">~11x</td><td>Historical valuation baseline</td></tr>
              <tr><td>Valuation Premium</td><td class="s4-td-slate">~19% above avg</td><td>Priced for continued growth</td></tr>
              <tr><td>Implication</td><td colspan="2">Future returns more dependent on earnings growth than further multiple expansion</td></tr>
            </tbody>
          </table>
        </div>
      </div>`;

    case 'etf-overlap|eo-corr':
    case 'etf-overlap|eo-bar':
    case 'etf-overlap|eo-metric':
      return `<div style="display:flex;gap:3%;height:100%">
        <div class="s4-callout" style="flex:1">
          <div class="s4-callout-num">0.97</div>
          <div class="s4-callout-lbl">Average correlation of the 12 ETFs in MS-2627 to the MSCI World Index</div>
          <div class="s4-callout-sub">At 0.97 correlation, the 12 separate ETFs effectively replicate a single broad equity market bet. The diversification is superficial.</div>
        </div>
        <div style="flex:2">
          <div class="s4-bar-chart" style="height:100%">
            ${[['iShares Core MSCI World',0.99],['iShares MSCI USA',0.98],['iShares S&P 500',0.98],['iShares MSCI Europe',0.97],['iShares MSCI Intl',0.97],['iShares MSCI EM',0.96],['iShares Global Clean Energy',0.95],['iShares MSCI Japan',0.95],['Remaining ETFs (avg)','0.95']].slice(0,8).map(([l,v])=>`
            <div class="s4-bar-row">
              <span class="s4-bar-lbl" style="width:170px;font-size:9px">${l}</span>
              <div class="s4-bar-outer"><div class="s4-bar-fill" style="width:${typeof v === 'number' ? v*98 : 93}%"></div></div>
              <span class="s4-bar-val">${v}</span>
            </div>`).join('')}
          </div>
        </div>
      </div>`;

    case 'fi-drag|fi-ytw':
      return `<div style="display:flex;gap:3%;height:100%">
        <div style="flex:2">
          <table class="s4-tbl" style="height:100%">
            <thead><tr><th>Metric</th><th>MS-2627 Current (MAPS)</th><th>CV Fixed Income Approach</th></tr></thead>
            <tbody>
              <tr><td>Yield to Worst</td><td class="s4-td-slate">4.50%</td><td class="s4-td-navy">5.13%</td></tr>
              <tr><td>Average Credit Quality</td><td class="s4-td-slate">A</td><td class="s4-td-navy">BBB+</td></tr>
              <tr><td>Duration Profile</td><td>Comparable</td><td>Comparable</td></tr>
              <tr><td>Yield Gap</td><td colspan="2" class="s4-td-navy" style="text-align:center;font-size:1.1em">+63 basis points in favor of CV</td></tr>
              <tr><td>Applied to FI Allocation ($1.37M)</td><td class="s4-td-slate">Current income</td><td class="s4-td-navy">+$8,631 additional per year</td></tr>
              <tr><td>Over 5 Years (compound)</td><td class="s4-td-muted">—</td><td class="s4-td-navy">+$46,500+ incremental</td></tr>
            </tbody>
          </table>
        </div>
        <div style="flex:1;display:flex;flex-direction:column;gap:3%">
          <div class="s4-callout">
            <div class="s4-callout-num">+63 bps</div>
            <div class="s4-callout-lbl">Additional yield-to-worst vs. current MAPS fixed income</div>
          </div>
          <div class="s4-stat-card">
            <div class="s4-stat-num" style="color:#00294D">+$8.6K</div>
            <div class="s4-stat-lbl">Additional Annual Income</div>
            <div class="s4-stat-sub">On $1.37M fixed income allocation at 63bps gap</div>
          </div>
        </div>
      </div>`;

    case 'cv-fi|cvfi-line':
    case 'cv-fi|cvfi-tbl':
      return `<div style="display:flex;gap:3%;height:100%">
        <div style="flex:1;display:flex;flex-direction:column;gap:3%">
          <div class="s4-callout">
            <div class="s4-callout-num">+118%</div>
            <div class="s4-callout-lbl">CV Fixed Income Composite ITD return (net)</div>
            <div class="s4-callout-sub">Since August 2019</div>
          </div>
          <div class="s4-stat-card slate">
            <div class="s4-stat-num">+106%</div>
            <div class="s4-stat-lbl">Frio Fixed Income Approach ITD</div>
            <div class="s4-stat-sub">12 percentage point gap over the same period</div>
          </div>
        </div>
        <div style="flex:2">
          <table class="s4-tbl">
            <thead><tr><th>Period</th><th>CV Fixed Income (Net)</th><th>Frio FI Approach</th><th>Gap</th></tr></thead>
            <tbody>
              <tr><td>1 Year</td><td class="s4-td-navy">7.15%</td><td>—</td><td class="s4-td-navy">—</td></tr>
              <tr><td>3 Year (ann.)</td><td class="s4-td-navy">3.43%+</td><td>—</td><td class="s4-td-navy">—</td></tr>
              <tr><td>5 Year (ann.)</td><td class="s4-td-navy">2.13%</td><td>—</td><td class="s4-td-navy">—</td></tr>
              <tr><td>ITD (since Aug 2019)</td><td class="s4-td-navy">+118%</td><td class="s4-td-slate">+106%</td><td class="s4-td-navy">+12pp</td></tr>
            </tbody>
          </table>
          <div style="margin-top:6px;font-family:Calibri,Arial;font-size:8.5px;color:#8A949E;line-height:1.4">
            Net of maximum CV Advisory Fee (0.70% per annum). Returns represent composite performance of CV Advisors client fixed income accounts. Past performance is not indicative of future results. Please see disclosures.
          </div>
        </div>
      </div>`;

    case 'alts-fees|af-vs':
      return `<div style="display:flex;gap:3%;height:100%">
        <div style="flex:1.5">
          <table class="s4-tbl" style="height:90%">
            <thead><tr><th>Fund</th><th>AUM in Portfolio</th><th>ITD Return (Net)</th><th>S&P 500 Same Period</th><th>Gap</th></tr></thead>
            <tbody>
              <tr><td class="s4-td-navy">Blackstone BXPE</td><td>~$161K</td><td class="s4-td-slate">11.6%</td><td class="s4-td-navy">23.2%</td><td class="s4-td-navy">–11.6pp</td></tr>
              <tr><td class="s4-td-navy">KKR PEC (K-PEC)</td><td>~$130K</td><td class="s4-td-slate">15.16%</td><td class="s4-td-navy">21.6%</td><td class="s4-td-navy">–6.4pp</td></tr>
              <tr><td class="s4-td-navy">KKR Infrastructure</td><td>~$267K</td><td class="s4-td-slate">Dist. 4.23%</td><td class="s4-td-navy">N/A</td><td class="s4-td-navy">Low vs. public</td></tr>
            </tbody>
          </table>
        </div>
        <div style="flex:1;display:flex;flex-direction:column;gap:3%">
          <div class="s4-callout">
            <div class="s4-callout-num">–11.6pp</div>
            <div class="s4-callout-lbl">BXPE underperformance vs. S&P 500 on an ITD basis</div>
          </div>
          <div class="s4-stat-card slate">
            <div class="s4-stat-num">~$558K</div>
            <div class="s4-stat-lbl">Total Alternatives AUM</div>
            <div class="s4-stat-sub">9.2% of total portfolio — 3 retail fund structures</div>
          </div>
        </div>
      </div>`;

    case 'total-fees|tf-fall':
      return `<div style="display:flex;gap:3%;height:100%">
        <div style="flex:2">
          <div class="s4-bar-chart" style="height:100%">
            ${[['MS Advisory Fee','~0.50%',50,'#00294D'],['Alt Fund Mgmt Fees','~0.27%',27,'#003767'],['Retail Sales Loads (amort.)','~0.18%',18,'#4E7496'],['Distribution Fees','~0.15%',15,'#4E7496'],['Performance Allocations','~0.05%',5,'#7A9CB8'],['ETF Expense Ratios','~0.04%',4,'#A8BFD0']].map(([l,v,w,c])=>`
            <div class="s4-bar-row">
              <span class="s4-bar-lbl" style="width:185px;font-size:10px">${l}</span>
              <div class="s4-bar-outer"><div class="s4-bar-fill" style="width:${w}%;background:${c}"></div></div>
              <span class="s4-bar-val">${v}</span>
            </div>`).join('')}
            <div class="s4-bar-row" style="border-top:2px solid #00294D;padding-top:4px;margin-top:2px">
              <span class="s4-bar-lbl" style="width:185px;font-weight:700;font-size:11px;color:#00294D">TOTAL ALL-IN</span>
              <div class="s4-bar-outer"><div class="s4-bar-fill" style="width:100%;background:#00294D"></div></div>
              <span class="s4-bar-val" style="color:#00294D">~1.19%</span>
            </div>
          </div>
        </div>
        <div style="flex:1;display:flex;flex-direction:column;gap:3%">
          <div class="s4-callout">
            <div class="s4-callout-num">1.19%</div>
            <div class="s4-callout-lbl">Estimated all-in fee load across both accounts</div>
          </div>
          <div class="s4-stat-card slate">
            <div class="s4-stat-num">$71,964</div>
            <div class="s4-stat-lbl">Estimated Annual Cost</div>
            <div class="s4-stat-sub">1.19% × $6.05M AUM — across all fee layers</div>
          </div>
        </div>
      </div>`;

    case 'total-fees|tf-tbl':
      return `<table class="s4-tbl">
        <thead><tr><th>Fee Component</th><th>Account</th><th>Rate</th><th>Annual $ (est.)</th></tr></thead>
        <tbody>
          <tr><td class="s4-td-navy">Morgan Stanley Advisory Fee</td><td>Both accounts</td><td>~0.50%</td><td class="s4-td-navy">~$30,276</td></tr>
          <tr><td class="s4-td-navy">Alt Fund Management Fees</td><td>MS-5931</td><td>1.25–1.50%</td><td class="s4-td-navy">~$16,350</td></tr>
          <tr><td class="s4-td-navy">Retail Sales Loads (amortized)</td><td>MS-5931 (alts)</td><td>~0.18%</td><td class="s4-td-navy">~$10,899</td></tr>
          <tr><td class="s4-td-navy">Distribution / 12b-1 Fees</td><td>MS-5931 (alts)</td><td>~0.15%</td><td class="s4-td-navy">~$9,083</td></tr>
          <tr><td class="s4-td-navy">Performance Allocations</td><td>MS-5931 (alts)</td><td>varies</td><td class="s4-td-navy">~$3,026</td></tr>
          <tr><td class="s4-td-navy">ETF Expense Ratios</td><td>MS-2627</td><td>~0.04%</td><td class="s4-td-navy">~$2,330</td></tr>
          <tr style="background:#00294D"><td colspan="3" style="color:white;font-weight:700">Estimated Total All-In</td><td style="color:white;font-weight:700">~$71,964 / year</td></tr>
        </tbody>
      </table>`;

    case 'north-haven|nh-conf':
      return `<div class="s4-cols">
        <div class="s4-col">
          <div class="s4-col-hdr">North Haven PIF — Fund Profile</div>
          <div class="s4-col-body">
            <div class="s4-col-row"><span class="s4-col-row-k">Fund Owner</span><span class="s4-col-row-v bad">Morgan Stanley (100%)</span></div>
            <div class="s4-col-row"><span class="s4-col-row-k">Gross Yield</span><span class="s4-col-row-v">9.0%</span></div>
            <div class="s4-col-row"><span class="s4-col-row-k">Share Class</span><span class="s4-col-row-v bad">Retail Class S</span></div>
            <div class="s4-col-row"><span class="s4-col-row-k">Management Fee</span><span class="s4-col-row-v bad">1.25%+</span></div>
            <div class="s4-col-row"><span class="s4-col-row-k">Distribution Fee</span><span class="s4-col-row-v bad">Yes</span></div>
            <div class="s4-col-row"><span class="s4-col-row-k">Liquidity</span><span class="s4-col-row-v bad">Quarterly (limited)</span></div>
          </div>
        </div>
        <div class="s4-col">
          <div class="s4-col-hdr slate">The Conflict of Interest</div>
          <div class="s4-col-body" style="display:flex;flex-direction:column;gap:5%">
            <div style="border-left:3px solid #00294D;padding-left:8px">
              <div style="font-size:10px;font-weight:700;color:#00294D;margin-bottom:2px">Dual Fee Structure</div>
              <div style="font-size:9px;color:#6b7a87">The same Morgan Stanley banker earns fees at two levels: (1) the MS advisory fee on assets held, and (2) indirectly through North Haven's management and distribution fees paid into MS.</div>
            </div>
            <div style="border-left:3px solid #4E7496;padding-left:8px">
              <div style="font-size:10px;font-weight:700;color:#003767;margin-bottom:2px">Bank-Owned Product Placement</div>
              <div style="font-size:9px;color:#6b7a87">North Haven PIF is a proprietary MS product. Its inclusion in client portfolios benefits the bank as much as — and potentially more than — the investor.</div>
            </div>
            <div style="border-left:3px solid #4E7496;padding-left:8px">
              <div style="font-size:10px;font-weight:700;color:#003767;margin-bottom:2px">Independent Alternatives Available</div>
              <div style="font-size:9px;color:#6b7a87">Comparable yield profiles are available through independent managers without the inherent conflict that comes from a bank distributing its own products.</div>
            </div>
          </div>
        </div>
      </div>`;

    case 'aci|aci-vs':
      return `<div style="display:flex;gap:3%;height:100%">
        <div style="flex:2">
          <table class="s4-tbl" style="height:90%">
            <thead><tr><th>Factor</th><th>KKR Infrastructure (Current)</th><th>Ares Core Infrastructure (CV)</th></tr></thead>
            <tbody>
              <tr><td>Distribution Rate</td><td class="s4-td-slate">4.23%</td><td class="s4-td-navy">10.10%</td></tr>
              <tr><td>Yield Gap</td><td colspan="2" class="s4-td-navy" style="text-align:center">587 basis points in favor of ACI</td></tr>
              <tr><td>Credit Quality</td><td class="s4-td-slate">Not rated</td><td class="s4-td-navy">AA–</td></tr>
              <tr><td>Sector Exposure</td><td>Overlaps with public infrastructure ETFs</td><td>Energy transition, digital, transportation</td></tr>
              <tr><td>Asset Diversification</td><td class="s4-td-slate">Limited</td><td class="s4-td-navy">Broad, diversified underlying portfolio</td></tr>
              <tr><td>CV Recommendation</td><td class="s4-td-slate">Redeploy</td><td class="s4-td-navy">Replace with ACI</td></tr>
            </tbody>
          </table>
        </div>
        <div style="flex:1;display:flex;flex-direction:column;gap:3%">
          <div class="s4-callout">
            <div class="s4-callout-num">+587 bps</div>
            <div class="s4-callout-lbl">Additional distribution yield — ACI vs. current KKR Infrastructure</div>
          </div>
          <div class="s4-stat-card slate">
            <div class="s4-stat-num">AA–</div>
            <div class="s4-stat-lbl">ACI Credit Quality</div>
            <div class="s4-stat-sub">Higher credit quality at a dramatically higher yield</div>
          </div>
        </div>
      </div>`;

    case 'cash-drag|cd-scen':
      return `<div style="display:flex;gap:3%;height:100%">
        <div style="flex:1;display:flex;flex-direction:column;gap:3%">
          <div class="s4-callout">
            <div class="s4-callout-num">$881K</div>
            <div class="s4-callout-lbl">Uninvested cash in MS-5931 ($656K cash + $221K savings vehicle)</div>
            <div class="s4-callout-sub">14.6% of total portfolio sitting at sub-optimal yields</div>
          </div>
          <div class="s4-stat-card slate">
            <div class="s4-stat-num">~$45,200</div>
            <div class="s4-stat-lbl">Additional Annual Income</div>
            <div class="s4-stat-sub">If $881K deployed at CV FI yield-to-worst of 5.13%</div>
          </div>
        </div>
        <div style="flex:2">
          <table class="s4-tbl" style="height:90%">
            <thead><tr><th>Scenario</th><th>Capital</th><th>Yield</th><th>Annual Income</th></tr></thead>
            <tbody>
              <tr><td class="s4-td-slate">Current — Cash / Savings Vehicle</td><td>$881K</td><td class="s4-td-slate">~0.5%</td><td class="s4-td-slate">~$4,400</td></tr>
              <tr><td class="s4-td-navy">Deploy to CV Fixed Income (5.13% YTW)</td><td>$881K</td><td class="s4-td-navy">5.13%</td><td class="s4-td-navy">~$45,195</td></tr>
              <tr><td colspan="3" style="font-weight:700;color:#00294D">Incremental Annual Income</td><td style="font-weight:700;color:#00294D;font-size:1.1em">~+$40,795</td></tr>
              <tr><td colspan="4" class="s4-td-muted" style="font-size:0.85em">Assumes immediate deployment and current CV FI yield-to-worst of 5.13%. Yield may change over time. For illustrative purposes.</td></tr>
            </tbody>
          </table>
        </div>
      </div>`;

    case 'cv-6040|cv60-tbl':
      return `<div style="display:flex;gap:3%;height:100%">
        <div style="flex:2">
          <table class="s4-tbl" style="height:90%">
            <thead><tr><th>Period</th><th>CV 60/40 (Net)</th><th>BlackRock MAPS 60/40 (Net)</th><th>Gap (ann.)</th></tr></thead>
            <tbody>
              <tr><td>1 Year</td><td class="s4-td-navy">13.81%</td><td class="s4-td-slate">13.43%</td><td class="s4-td-navy">+38 bps</td></tr>
              <tr><td>3 Year (ann.)</td><td class="s4-td-navy">—</td><td class="s4-td-slate">—</td><td class="s4-td-navy">—</td></tr>
              <tr><td>5 Year (ann.)</td><td class="s4-td-navy">7.71%</td><td class="s4-td-slate">4.72%</td><td class="s4-td-navy">+299 bps</td></tr>
              <tr><td>$2.49M — 5yr terminal value</td><td class="s4-td-navy">~$3.65M</td><td class="s4-td-slate">~$3.14M</td><td class="s4-td-navy">+~$510K</td></tr>
            </tbody>
          </table>
          <div style="margin-top:6px;font-family:Calibri,Arial;font-size:8.5px;color:#8A949E;line-height:1.4">
            Net of maximum CV Advisory Fee (0.70%). Past performance is not indicative of future results. Terminal value illustrative only.
          </div>
        </div>
        <div style="flex:1;display:flex;flex-direction:column;gap:3%">
          <div class="s4-callout">
            <div class="s4-callout-num">+299 bps</div>
            <div class="s4-callout-lbl">CV 5-year annualized outperformance vs. BlackRock MAPS 60/40</div>
          </div>
          <div class="s4-stat-card slate">
            <div class="s4-stat-num">~+$510K</div>
            <div class="s4-stat-lbl">Terminal Value Delta (5yr)</div>
            <div class="s4-stat-sub">On $2.49M (MS-2627 AUM) — illustrative</div>
          </div>
        </div>
      </div>`;

    case 'blackrock-ma|bm-net':
      return `<div style="display:flex;gap:3%;height:100%">
        <div class="s4-callout" style="flex:1">
          <div class="s4-callout-num">~3%</div>
          <div class="s4-callout-lbl">Estimated annual gross-to-net return gap in the MS-2627 managed account</div>
          <div class="s4-callout-sub">Gross returns are reduced by the MS advisory fee, BlackRock model fees, and underlying ETF expense ratios — before a single dollar reaches the client.</div>
        </div>
        <div style="flex:1.5">
          <table class="s4-tbl" style="height:90%">
            <thead><tr><th>Component</th><th>Rate</th><th>Notes</th></tr></thead>
            <tbody>
              <tr><td class="s4-td-navy">BlackRock model gross return</td><td>Market dependent</td><td>MAPS 60/40 benchmark</td></tr>
              <tr><td class="s4-td-slate">MS Advisory Fee</td><td>~0.50%</td><td>Charged on account AUM</td></tr>
              <tr><td class="s4-td-slate">BlackRock Model Fee</td><td>~0.10%</td><td>Overlay management cost</td></tr>
              <tr><td class="s4-td-slate">Underlying ETF Expense Ratios</td><td>~0.04%</td><td>12 iShares ETFs</td></tr>
              <tr><td class="s4-td-slate">Tax Drag (est.)</td><td>~2.30%</td><td>Rebalancing in taxable account</td></tr>
              <tr style="background:#003767"><td colspan="2" style="color:white;font-weight:700">Total Gross-to-Net Gap</td><td style="color:white;font-weight:700">~3% per year</td></tr>
            </tbody>
          </table>
        </div>
      </div>`;

    case 'ips|ips-fw':
      return `<div style="height:100%;display:flex;flex-direction:column;gap:3%">
        <div style="font-family:Calibri,Arial;font-size:12px;color:#4E7496;font-style:italic">The IPS is not a document we hand you — it's one we build together. The framework below is a starting point for this conversation.</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:3%;flex:1">
          ${[['Return Objective','What do you need this portfolio to generate? Growth? Income? Both?','___ % / year or $ ___ annual income'],['Risk Tolerance','How much volatility or drawdown is acceptable?','Max acceptable drawdown: ___%'],['Liquidity Requirements','What cash needs do you anticipate in the next 1–3 years?','$ ___ in liquid assets at all times'],['Time Horizon','How long should this portfolio be managed before reassessment?','___ year investment horizon'],['Constraints / Preferences','Any sector exclusions, ESG considerations, or tax sensitivities?','To be discussed'],['Rebalancing Policy','How often should the portfolio be reviewed and rebalanced?','___ frequency, ___ drift tolerance']].map(([title,q,ph])=>`
          <div style="border:1px solid #D4D6D9;border-radius:4px;padding:3% 3%;background:white">
            <div style="font-family:Calibri,Arial;font-size:10px;font-weight:700;color:#00294D;margin-bottom:3px">${title}</div>
            <div style="font-family:Calibri,Arial;font-size:9px;color:#6b7a87;margin-bottom:4px">${q}</div>
            <div style="font-family:Calibri,Arial;font-size:9px;color:#A8BFD0;border-bottom:1px solid #D4D6D9;padding-bottom:2px">${ph}</div>
          </div>`).join('')}
        </div>
      </div>`;

    case 'next-steps|ns-sum':
      return `<table class="s4-tbl">
        <thead><tr><th>Issue Identified</th><th>Impact</th><th>CV Recommendation</th></tr></thead>
        <tbody>
          <tr><td class="s4-td-navy">No unified IPS or household strategy</td><td>$6.05M without coordinated mandate</td><td>Define IPS together; consolidate under one framework</td></tr>
          <tr><td class="s4-td-navy">Top-3 equity concentration (93% of P&L)</td><td>Portfolio outcomes tied to 3 names</td><td>Phased diversification into core equity composite</td></tr>
          <tr><td class="s4-td-navy">Retail alt funds — high fees, lagging returns</td><td>~$558K in underperforming structures</td><td>Transition to institutional alts (e.g. ACI)</td></tr>
          <tr><td class="s4-td-navy">All-in fees: 1.19% (~$72K/yr)</td><td>$71,964 estimated annual cost</td><td>CV all-in fee estimated at lower total cost</td></tr>
          <tr><td class="s4-td-navy">$881K uninvested cash</td><td>~$40K+ in foregone annual income</td><td>Deploy to CV Fixed Income (5.13% YTW)</td></tr>
          <tr><td class="s4-td-navy">BlackRock MAPS — generic, 3% gross/net gap</td><td>$2.49M in non-customized model</td><td>Transition MS-2627 to CV 60/40 approach</td></tr>
        </tbody>
      </table>`;

    case 'geo-conc|geo-bar':
    case 'geo-conc|geo-tbl':
    case 'geo-conc|geo-map':
    case 'geo-conc|geo-donut':
      return `<div style="display:flex;gap:3%;height:100%">
        <div style="flex:1">
          <div class="s4-bar-chart" style="height:100%">
            ${[['United States','62.9%',62.9,'#00294D'],['Global','25.2%',25.2,'#003767'],['Canada','6.5%',6.5,'#4E7496'],['United Kingdom','1.4%',1.4,'#7A9CB8'],['Japan','1.4%',1.4,'#7A9CB8'],['Emerging Markets','1.8%',1.8,'#A8BFD0'],['Other','0.8%',0.8,'#D0D8E4']].map(([l,pct,w,c])=>`
            <div class="s4-bar-row">
              <span class="s4-bar-lbl" style="width:130px">${l}</span>
              <div class="s4-bar-outer"><div class="s4-bar-fill" style="width:${w*1.5}%;background:${c}"></div></div>
              <span class="s4-bar-val">${pct}</span>
            </div>`).join('')}
          </div>
        </div>
        <div style="flex:1;display:flex;flex-direction:column;gap:3%">
          <div class="s4-callout">
            <div class="s4-callout-num">62.9%</div>
            <div class="s4-callout-lbl">Portfolio economically tied to the United States</div>
            <div class="s4-callout-sub">Despite holding internationally-branded ETFs, true diversification is limited. EM exposure is only 1.8%.</div>
          </div>
          <div class="s4-stat-card slate">
            <div class="s4-stat-num">1.8%</div>
            <div class="s4-stat-lbl">Emerging Market Exposure</div>
            <div class="s4-stat-sub">Accessed through broad multi-sector ETFs, not dedicated EM allocation</div>
          </div>
        </div>
      </div>`;


    // ── Account Split Donut ──────────────────────────────────────────────────
    case 'no-strategy|ns-pie':
      return `<div style="display:flex;gap:4%;height:100%;align-items:center">
        <div style="flex:1;height:90%">
          <svg viewBox="0 0 220 220" style="width:100%;height:100%">
            <circle cx="110" cy="110" r="78" fill="none" stroke="#00294D" stroke-width="42"
              stroke-dasharray="${78*2*Math.PI*0.59} ${78*2*Math.PI*0.41}" stroke-dashoffset="${78*2*Math.PI*0.25}"/>
            <circle cx="110" cy="110" r="78" fill="none" stroke="#4E7496" stroke-width="42"
              stroke-dasharray="${78*2*Math.PI*0.41} ${78*2*Math.PI*0.59}" stroke-dashoffset="${-78*2*Math.PI*0.34}"/>
            <text x="110" y="103" text-anchor="middle" font-family="Calibri,Arial" font-weight="700" font-size="20" fill="#00294D">$6.05M</text>
            <text x="110" y="119" text-anchor="middle" font-family="Calibri,Arial" font-size="10" fill="#8A949E">2 Accounts</text>
          </svg>
        </div>
        <div style="flex:1.3;display:flex;flex-direction:column;gap:5%;justify-content:center">
          <div style="border-left:4px solid #00294D;padding-left:4%;background:#F4F5F5;border-radius:0 4px 4px 0;padding:3% 4%;margin-bottom:3%">
            <div style="font-family:Calibri,Arial;font-weight:700;font-size:28px;color:#00294D">59%</div>
            <div style="font-family:Calibri,Arial;font-size:11px;color:#4E7496;font-weight:700;text-transform:uppercase;letter-spacing:.06em">MS-5931</div>
            <div style="font-family:Calibri,Arial;font-size:10px;color:#8A949E">$3.57M — Self-directed equity &amp; alternatives</div>
          </div>
          <div style="border-left:4px solid #4E7496;padding-left:4%;background:#F4F5F5;border-radius:0 4px 4px 0;padding:3% 4%">
            <div style="font-family:Calibri,Arial;font-weight:700;font-size:28px;color:#4E7496">41%</div>
            <div style="font-family:Calibri,Arial;font-size:11px;color:#003767;font-weight:700;text-transform:uppercase;letter-spacing:.06em">MS-2627</div>
            <div style="font-family:Calibri,Arial;font-size:10px;color:#8A949E">$2.49M — BlackRock MAPS 60/40 managed account</div>
          </div>
          <div style="background:#00294D;border-radius:4px;padding:3% 4%;margin-top:2%">
            <div style="font-family:Calibri,Arial;font-size:10px;color:rgba(255,255,255,.65);text-transform:uppercase;letter-spacing:.06em;margin-bottom:2px">Key Finding</div>
            <div style="font-family:Calibri,Arial;font-size:11px;color:white;line-height:1.4">Two accounts, two strategies, no shared mandate. The household has no unified allocation target.</div>
          </div>
        </div>
      </div>`;

    // ── Account Top Holdings ─────────────────────────────────────────────────
    case 'acct-breakdown|ab-top5':
      return `<div class="s4-cols">
        <div class="s4-col">
          <div class="s4-col-hdr">MS-5931 — Top 5 Positions</div>
          <div class="s4-col-body">
            <div class="s4-col-row"><span class="s4-col-row-k">Transocean (RIG)</span><span class="s4-col-row-v">$395K — 6.5%</span></div>
            <div class="s4-col-row"><span class="s4-col-row-k">Brookfield Corp (BN)</span><span class="s4-col-row-v">$341K — 5.6%</span></div>
            <div class="s4-col-row"><span class="s4-col-row-k">Warrior Met Coal (HCC)</span><span class="s4-col-row-v">$266K — 4.4%</span></div>
            <div class="s4-col-row"><span class="s4-col-row-k">Berkshire Hathaway (BRK/B)</span><span class="s4-col-row-v">$202K — 3.3%</span></div>
            <div class="s4-col-row"><span class="s4-col-row-k">Pulte Group (PHM)</span><span class="s4-col-row-v">$165K — 2.7%</span></div>
            <div style="margin-top:6%;padding-top:4%;border-top:1px solid #D4D6D9;font-family:Calibri,Arial;font-size:9px;color:#8A949E">Top 3 account for 93% of all individual equity P&amp;L</div>
          </div>
        </div>
        <div class="s4-col">
          <div class="s4-col-hdr slate">MS-2627 — Top ETF Holdings</div>
          <div class="s4-col-body">
            <div class="s4-col-row"><span class="s4-col-row-k">iShares Core MSCI World</span><span class="s4-col-row-v">~18%</span></div>
            <div class="s4-col-row"><span class="s4-col-row-k">iShares S&amp;P 500</span><span class="s4-col-row-v">~15%</span></div>
            <div class="s4-col-row"><span class="s4-col-row-k">iShares Core US Agg Bond</span><span class="s4-col-row-v">~14%</span></div>
            <div class="s4-col-row"><span class="s4-col-row-k">iShares MSCI Europe</span><span class="s4-col-row-v">~8%</span></div>
            <div class="s4-col-row"><span class="s4-col-row-k">iShares Corporate Bond</span><span class="s4-col-row-v">~7%</span></div>
            <div style="margin-top:6%;padding-top:4%;border-top:1px solid #D4D6D9;font-family:Calibri,Arial;font-size:9px;color:#8A949E">12 iShares ETFs, avg. correlation to MSCI World: 0.97</div>
          </div>
        </div>
      </div>`;

    case 'acct-breakdown|ab-split':
      return `<div style="display:flex;gap:4%;height:100%;align-items:center">
        <div style="flex:2">
          <div class="s4-bar-chart" style="height:auto;gap:8%">
            <div style="font-family:Calibri,Arial;font-size:10px;color:#8A949E;text-transform:uppercase;letter-spacing:.06em;margin-bottom:2%">AUM by Account</div>
            <div class="s4-bar-row">
              <span class="s4-bar-lbl" style="width:120px">MS-5931</span>
              <div class="s4-bar-outer" style="height:36px"><div class="s4-bar-fill" style="width:59%"></div></div>
              <span class="s4-bar-val" style="font-size:20px;margin-left:8px">$3.57M</span>
            </div>
            <div class="s4-bar-row">
              <span class="s4-bar-lbl" style="width:120px">MS-2627 (MA)</span>
              <div class="s4-bar-outer" style="height:36px"><div class="s4-bar-fill slate" style="width:41%"></div></div>
              <span class="s4-bar-val" style="font-size:20px;margin-left:8px;color:#4E7496">$2.49M</span>
            </div>
          </div>
        </div>
        <div style="flex:1;display:flex;flex-direction:column;gap:4%">
          <div class="s4-stat-card navy"><div class="s4-stat-num">59%</div><div class="s4-stat-lbl">MS-5931 Share</div><div class="s4-stat-sub">Self-directed</div></div>
          <div class="s4-stat-card slate"><div class="s4-stat-num">41%</div><div class="s4-stat-lbl">MS-2627 Share</div><div class="s4-stat-sub">BlackRock MAPS managed</div></div>
        </div>
      </div>`;

    // ── Equity sector breakdown ───────────────────────────────────────────────
    case 'equity-conc|ec-sect':
      return `<div style="display:flex;gap:4%;height:100%;align-items:center">
        <div style="flex:1;height:90%">
          <svg viewBox="0 0 220 220" style="width:100%;height:100%">
            <circle cx="110" cy="110" r="78" fill="none" stroke="#00294D" stroke-width="42"
              stroke-dasharray="${78*2*3.14159*0.338} ${78*2*3.14159*(1-0.338)}" stroke-dashoffset="${78*2*3.14159*0.25}"/>
            <circle cx="110" cy="110" r="78" fill="none" stroke="#003767" stroke-width="42"
              stroke-dasharray="${78*2*3.14159*0.262} ${78*2*3.14159*(1-0.262)}" stroke-dashoffset="${-78*2*3.14159*0.088}"/>
            <circle cx="110" cy="110" r="78" fill="none" stroke="#4E7496" stroke-width="42"
              stroke-dasharray="${78*2*3.14159*0.202} ${78*2*3.14159*(1-0.202)}" stroke-dashoffset="${-78*2*3.14159*0.35}"/>
            <circle cx="110" cy="110" r="78" fill="none" stroke="#A8BFD0" stroke-width="42"
              stroke-dasharray="${78*2*3.14159*0.198} ${78*2*3.14159*(1-0.198)}" stroke-dashoffset="${-78*2*3.14159*0.552}"/>
            <text x="110" y="106" text-anchor="middle" font-family="Calibri,Arial" font-weight="700" font-size="14" fill="#00294D">4 sectors</text>
            <text x="110" y="120" text-anchor="middle" font-family="Calibri,Arial" font-size="9" fill="#8A949E">10 positions</text>
          </svg>
        </div>
        <div style="flex:1.3;display:flex;flex-direction:column;gap:4%;justify-content:center">
          ${[['Financials','33.8%','#00294D'],['Energy','26.2%','#003767'],['Materials','20.2%','#4E7496'],['Consumer Disc.','19.8%','#A8BFD0']].map(([l,v,c])=>`
          <div style="display:flex;align-items:center;gap:8px">
            <div style="width:12px;height:12px;border-radius:2px;background:${c};flex-shrink:0"></div>
            <span style="flex:1;font-family:Calibri,Arial;font-size:12px;color:#1D1F20">${l}</span>
            <span style="font-family:Calibri,Arial;font-weight:700;font-size:14px;color:${c}">${v}</span>
          </div>`).join('')}
          <div style="margin-top:4%;background:#F4F5F5;border-radius:4px;padding:3% 4%;font-family:Calibri,Arial;font-size:10px;color:#00294D;line-height:1.5">
            Three positions — Transocean, Warrior Met Coal, and Brookfield — account for ~93% of all equity gains across these four sectors.
          </div>
        </div>
      </div>`;

    case 'equity-conc|ec-risk':
      return `<div style="display:flex;gap:3%;height:100%">
        <div class="s4-callout" style="flex:1">
          <div class="s4-callout-num">93%</div>
          <div class="s4-callout-lbl">of individual equity P&amp;L from 3 positions vs. ~18% for the S&amp;P 500's top 3</div>
          <div class="s4-callout-sub">Excess concentration vs. benchmark: approximately 75 percentage points.</div>
        </div>
        <div style="flex:1.5">
          <table class="s4-tbl" style="height:100%">
            <thead><tr><th>Metric</th><th>Frio Portfolio</th><th>S&amp;P 500 Benchmark</th></tr></thead>
            <tbody>
              <tr><td>Top-3 P&amp;L contribution</td><td class="s4-td-navy">93%</td><td class="s4-td-slate">~18%</td></tr>
              <tr><td>Top-3 names</td><td>RIG, BN, HCC</td><td>MSFT, AAPL, NVDA</td></tr>
              <tr><td>Largest single position</td><td class="s4-td-navy">24.7% (RIG)</td><td class="s4-td-slate">~7% (MSFT)</td></tr>
              <tr><td>Concentration risk</td><td class="s4-td-navy">Very High</td><td class="s4-td-slate">Index-level (diversified)</td></tr>
              <tr><td>Rebalancing policy</td><td class="s4-td-navy">None applied</td><td class="s4-td-slate">Rules-based, regular</td></tr>
            </tbody>
          </table>
        </div>
      </div>`;

    // ── BN Fact Card ─────────────────────────────────────────────────────────
    case 'bn|bn-fact':
      return `<div style="display:grid;grid-template-columns:1fr 1fr 1fr;grid-template-rows:1fr 1fr;gap:3%;height:100%">
        <div class="s4-stat-card navy"><div class="s4-stat-num">$341K</div><div class="s4-stat-lbl">Position Size</div><div class="s4-stat-sub">5.6% of total $6.05M portfolio</div></div>
        <div class="s4-stat-card deep"><div class="s4-stat-num">~+100%</div><div class="s4-stat-lbl">Return Since Purchase</div><div class="s4-stat-sub">Purchased December 29, 2023</div></div>
        <div class="s4-stat-card slate"><div class="s4-stat-num">+13pp</div><div class="s4-stat-lbl">vs. S&amp;P 500</div><div class="s4-stat-sub">Outperformed S&amp;P over same period</div></div>
        <div class="s4-stat-card"><div class="s4-stat-num" style="color:#00294D">13.1x</div><div class="s4-stat-lbl">Current Fwd P/E</div><div class="s4-stat-sub">Above 3-year average of ~11x</div></div>
        <div class="s4-stat-card"><div class="s4-stat-num" style="color:#4E7496">BN</div><div class="s4-stat-lbl">Brookfield Corporation</div><div class="s4-stat-sub">Alternative asset manager — financial sector</div></div>
        <div class="s4-stat-card"><div class="s4-stat-num" style="color:#003767">#2</div><div class="s4-stat-lbl">Individual Equity Rank</div><div class="s4-stat-sub">Second-largest single equity in MS-5931</div></div>
      </div>`;

    // ── Alt fund fee table ───────────────────────────────────────────────────
    case 'alts-fees|af-fees':
      return `<table class="s4-tbl">
        <thead><tr><th>Fund</th><th>AUM in Frio</th><th>Mgmt Fee</th><th>Front Load</th><th>Distribution Fee</th><th>Perf. Allocation</th><th>Total Drag (est.)</th></tr></thead>
        <tbody>
          <tr><td class="s4-td-navy">KKR Infrastructure (K-Infra)</td><td>~$267K</td><td class="s4-td-navy">1.50%</td><td>None</td><td>0.85%</td><td>12.5% over hurdle</td><td class="s4-td-navy">~2.35%+</td></tr>
          <tr><td class="s4-td-navy">Blackstone BXPE</td><td>~$161K</td><td class="s4-td-navy">1.25%</td><td>~3.5%</td><td>0.85%</td><td>12.5% over hurdle</td><td class="s4-td-navy">~2.10%+</td></tr>
          <tr><td class="s4-td-navy">KKR PEC (K-PEC)</td><td>~$130K</td><td class="s4-td-navy">1.25%</td><td>~3.5%</td><td>0.85%</td><td>10% over hurdle</td><td class="s4-td-navy">~2.10%+</td></tr>
          <tr style="background:#003767"><td colspan="6" style="color:white;font-weight:700">Total Alternatives AUM</td><td style="color:white;font-weight:700">~$558K (9.2%)</td></tr>
        </tbody>
      </table>`;

    case 'alts-fees|af-net':
    case 'alts-fees|af-table2':
      return `<div style="display:flex;gap:3%;height:100%">
        <div style="flex:2">
          <div class="s4-bar-chart" style="height:90%">
            <div style="font-family:Calibri,Arial;font-size:10px;color:#8A949E;margin-bottom:3%">ITD Returns: Net vs. S&amp;P 500 over same period</div>
            <div class="s4-bar-row"><span class="s4-bar-lbl" style="width:100px">S&amp;P 500 (BXPE period)</span><div class="s4-bar-outer"><div class="s4-bar-fill" style="width:92%"></div></div><span class="s4-bar-val">23.2%</span></div>
            <div class="s4-bar-row"><span class="s4-bar-lbl" style="width:100px">BXPE (net)</span><div class="s4-bar-outer"><div class="s4-bar-fill slate" style="width:46%"></div></div><span class="s4-bar-val">11.6%</span></div>
            <div style="height:4%"></div>
            <div class="s4-bar-row"><span class="s4-bar-lbl" style="width:100px">S&amp;P 500 (K-PEC period)</span><div class="s4-bar-outer"><div class="s4-bar-fill" style="width:86%"></div></div><span class="s4-bar-val">21.6%</span></div>
            <div class="s4-bar-row"><span class="s4-bar-lbl" style="width:100px">K-PEC (net)</span><div class="s4-bar-outer"><div class="s4-bar-fill slate" style="width:61%"></div></div><span class="s4-bar-val">15.16%</span></div>
            <div style="height:4%"></div>
            <div class="s4-bar-row"><span class="s4-bar-lbl" style="width:100px">K-Infra distribution</span><div class="s4-bar-outer"><div class="s4-bar-fill" style="width:17%"></div></div><span class="s4-bar-val">4.23%</span></div>
          </div>
        </div>
        <div style="flex:1;display:flex;flex-direction:column;gap:3%">
          <div class="s4-callout"><div class="s4-callout-num">–11.6pp</div><div class="s4-callout-lbl">BXPE underperformance vs. S&amp;P 500 on an ITD basis</div></div>
          <div class="s4-stat-card slate"><div class="s4-stat-num">~$558K</div><div class="s4-stat-lbl">Total Alt Exposure</div><div class="s4-stat-sub">9.2% of portfolio in retail fund structures</div></div>
        </div>
      </div>`;

    // ── Fee comparison ───────────────────────────────────────────────────────
    case 'total-fees|tf-vs':
      return `<div style="display:flex;gap:3%;height:100%">
        <div style="flex:2">
          <div class="s4-bar-chart" style="height:auto;gap:10%">
            <div style="font-family:Calibri,Arial;font-size:10px;color:#8A949E;margin-bottom:2%">All-In Fee Rate Comparison</div>
            <div class="s4-bar-row"><span class="s4-bar-lbl" style="width:160px">Current (Morgan Stanley)</span><div class="s4-bar-outer" style="height:32px"><div class="s4-bar-fill" style="width:100%"></div></div><span class="s4-bar-val" style="font-size:20px">~1.19%</span></div>
            <div class="s4-bar-row"><span class="s4-bar-lbl" style="width:160px">CV Advisors (estimated)</span><div class="s4-bar-outer" style="height:32px"><div class="s4-bar-fill slate" style="width:58%"></div></div><span class="s4-bar-val" style="font-size:20px;color:#4E7496">~0.70%</span></div>
          </div>
          <div style="margin-top:6%;font-family:Calibri,Arial;font-size:9px;color:#8A949E;line-height:1.5">
            CV advisory fee is 0.70% per annum (maximum). Current total is an estimate and includes all fee layers. Comparison is illustrative; actual fees depend on final portfolio construction and product selection.
          </div>
        </div>
        <div style="flex:1;display:flex;flex-direction:column;gap:3%">
          <div class="s4-callout"><div class="s4-callout-num">$71,964</div><div class="s4-callout-lbl">Estimated annual all-in cost at current structure</div></div>
          <div class="s4-stat-card slate"><div class="s4-stat-num">~$29K+</div><div class="s4-stat-lbl">Potential Annual Savings</div><div class="s4-stat-sub">~0.49pp reduction × $6.05M AUM (illustrative)</div></div>
        </div>
      </div>`;

    case 'total-fees|tf-stack':
      return `<div style="display:flex;gap:3%;height:100%;align-items:center">
        <div style="flex:1.5;height:85%">
          <svg viewBox="0 0 80 200" style="width:100%;height:100%">
            <rect x="10" y="0" width="60" height="84.0" fill="#00294D"/>
            <rect x="10" y="84" width="60" height="33.6" fill="#003767"/>
            <rect x="10" y="117.6" width="60" height="22.7" fill="#4E7496"/>
            <rect x="10" y="140.3" width="60" height="12.6" fill="#7A9CB8"/>
            <rect x="10" y="152.9" width="60" height="4.2" fill="#A8BFD0"/>
            <rect x="10" y="157.1" width="60" height="3.4" fill="#D0D8E4"/>
            <text x="40" y="45" text-anchor="middle" font-family="Calibri,Arial" font-size="8" fill="white" font-weight="700">0.50%</text>
            <text x="40" y="103" text-anchor="middle" font-family="Calibri,Arial" font-size="7" fill="white">0.27%</text>
            <text x="40" y="131" text-anchor="middle" font-family="Calibri,Arial" font-size="6" fill="white">0.18%</text>
          </svg>
        </div>
        <div style="flex:2;display:flex;flex-direction:column;gap:3%;justify-content:center">
          ${[['MS Advisory Fee','0.50%','42%','#00294D'],['Alt Mgmt Fees','0.27%','23%','#003767'],['Sales Loads (amort.)','0.18%','15%','#4E7496'],['Distribution Fees','0.15%','13%','#7A9CB8'],['Perf. Allocations','0.05%','4%','#A8BFD0'],['ETF Expense Ratios','0.04%','3%','#D0D8E4']].map(([l,r,pct,c])=>`
          <div style="display:flex;align-items:center;gap:8px;font-family:Calibri,Arial;font-size:10px">
            <div style="width:10px;height:10px;border-radius:2px;background:${c};flex-shrink:0"></div>
            <span style="flex:1;color:#1D1F20">${l}</span>
            <span style="color:#00294D;font-weight:700">${r}</span>
            <span style="color:#8A949E;width:28px;text-align:right">${pct}</span>
          </div>`).join('')}
          <div style="border-top:2px solid #00294D;padding-top:3%;display:flex;justify-content:space-between;font-family:Calibri,Arial;font-weight:700;color:#00294D;font-size:14px"><span>Total All-In</span><span>1.19%</span></div>
        </div>
      </div>`;

    // ── North Haven vs Independent ───────────────────────────────────────────
    case 'north-haven|nh-vs':
      return `<table class="s4-tbl">
        <thead><tr><th>Factor</th><th>North Haven PIF (Current)</th><th>Independent Alternative</th></tr></thead>
        <tbody>
          <tr><td>Fund Ownership</td><td class="s4-td-navy">Morgan Stanley (100%)</td><td class="s4-td-slate">Independent manager</td></tr>
          <tr><td>Gross Yield</td><td>9.0%</td><td>Comparable or higher</td></tr>
          <tr><td>Share Class</td><td class="s4-td-navy">Retail Class S</td><td class="s4-td-slate">Institutional or direct</td></tr>
          <tr><td>Conflict of Interest</td><td class="s4-td-navy">Dual-fee (advisor + fund owner)</td><td class="s4-td-slate">None</td></tr>
          <tr><td>Placement Incentive</td><td class="s4-td-navy">Bank earns on both sides</td><td class="s4-td-slate">Advisor-fee only (fiduciary)</td></tr>
          <tr><td>Liquidity</td><td>Quarterly, limited</td><td>Varies by structure</td></tr>
          <tr><td>CV Recommendation</td><td colspan="2" class="s4-td-navy" style="text-align:center">Replace with conflict-free alternative — comparable yield, no proprietary structure</td></tr>
        </tbody>
      </table>`;

    case 'north-haven|nh-fact':
      return `<div style="display:grid;grid-template-columns:1fr 1fr 1fr;grid-template-rows:1fr 1fr;gap:3%;height:100%">
        <div class="s4-stat-card navy"><div class="s4-stat-num">9.0%</div><div class="s4-stat-lbl">Gross Yield</div><div class="s4-stat-sub">Retail Class S share structure</div></div>
        <div class="s4-stat-card"><div class="s4-stat-num" style="color:#4E7496">100%</div><div class="s4-stat-lbl">Morgan Stanley Owned</div><div class="s4-stat-sub">North Haven PIF is a proprietary MS product</div></div>
        <div class="s4-stat-card deep"><div class="s4-stat-num">2×</div><div class="s4-stat-lbl">Fee Levels</div><div class="s4-stat-sub">Bank earns advisory fee + fund fees on same AUM</div></div>
        <div class="s4-stat-card"><div class="s4-stat-num" style="color:#00294D">Quarterly</div><div class="s4-stat-lbl">Redemption Frequency</div><div class="s4-stat-sub">Limited liquidity — redemption gates possible</div></div>
        <div class="s4-stat-card slate"><div class="s4-stat-num">Class S</div><div class="s4-stat-lbl">Share Class</div><div class="s4-stat-sub">Retail structure — higher fees than institutional</div></div>
        <div class="s4-stat-card"><div class="s4-stat-num" style="color:#003767">Private Credit</div><div class="s4-stat-lbl">Asset Class</div><div class="s4-stat-sub">Conflict-free alternatives available at similar yield</div></div>
      </div>`;

    // ── ACI Card & Bar ───────────────────────────────────────────────────────
    case 'aci|aci-card':
      return `<div style="display:flex;gap:3%;height:100%">
        <div style="flex:1;display:flex;flex-direction:column;gap:3%">
          <div class="s4-callout"><div class="s4-callout-num">10.10%</div><div class="s4-callout-lbl">ACI distribution rate — AA– credit quality</div><div class="s4-callout-sub">vs. K-Infra's 4.23% distribution — a 587bps advantage</div></div>
          <div class="s4-stat-card slate"><div class="s4-stat-num">AA–</div><div class="s4-stat-lbl">Credit Quality</div><div class="s4-stat-sub">Higher quality than K-Infra at dramatically better yield</div></div>
        </div>
        <div style="flex:1.5">
          <table class="s4-tbl" style="height:100%">
            <thead><tr><th>ACI — Fund Profile</th><th>Detail</th></tr></thead>
            <tbody>
              <tr><td>Fund</td><td class="s4-td-navy">Ares Core Infrastructure</td></tr>
              <tr><td>Distribution Rate</td><td class="s4-td-navy">10.10%</td></tr>
              <tr><td>Credit Quality</td><td class="s4-td-navy">AA–</td></tr>
              <tr><td>Sectors</td><td>Energy transition, digital infrastructure, transportation</td></tr>
              <tr><td>Manager</td><td>Ares Management — independent, institutional</td></tr>
              <tr><td>Conflict</td><td class="s4-td-slate">None — no proprietary relationship</td></tr>
              <tr><td>CV Recommendation</td><td class="s4-td-navy">Replace K-Infra with ACI</td></tr>
            </tbody>
          </table>
        </div>
      </div>`;

    case 'aci|aci-bar':
      return `<div style="display:flex;gap:3%;height:100%;align-items:center">
        <div style="flex:2">
          <div style="font-family:Calibri,Arial;font-size:10px;color:#8A949E;margin-bottom:4%">Distribution Rate Comparison</div>
          <div class="s4-bar-row" style="margin-bottom:5%"><span class="s4-bar-lbl" style="width:160px;font-size:14px">Ares Core Infra (ACI)</span><div class="s4-bar-outer" style="height:40px"><div class="s4-bar-fill" style="width:100%"></div></div><span class="s4-bar-val" style="font-size:24px;margin-left:8px">10.10%</span></div>
          <div class="s4-bar-row"><span class="s4-bar-lbl" style="width:160px;font-size:14px">KKR Infrastructure</span><div class="s4-bar-outer" style="height:40px"><div class="s4-bar-fill slate" style="width:42%"></div></div><span class="s4-bar-val" style="font-size:24px;margin-left:8px;color:#4E7496">4.23%</span></div>
          <div style="margin-top:6%;padding:3% 4%;background:#F4F5F5;border-radius:4px;font-family:Calibri,Arial;font-size:11px;color:#00294D;font-weight:700">Gap: 587 basis points in favor of ACI</div>
        </div>
        <div style="flex:1;display:flex;flex-direction:column;gap:4%">
          <div class="s4-callout"><div class="s4-callout-num">+587 bps</div><div class="s4-callout-lbl">Additional annual distribution — same asset class, better credit</div></div>
        </div>
      </div>`;

    // ── Cash deployment bar & metric ─────────────────────────────────────────
    case 'cash-drag|cd-bar':
      return `<div style="display:flex;gap:3%;height:100%;align-items:center">
        <div style="flex:2">
          <div style="font-family:Calibri,Arial;font-size:10px;color:#8A949E;margin-bottom:4%">Annual Income on $881K — Current vs. Deployed</div>
          <div class="s4-bar-row" style="margin-bottom:5%"><span class="s4-bar-lbl" style="width:180px">If deployed at CV FI 5.13%</span><div class="s4-bar-outer" style="height:36px"><div class="s4-bar-fill" style="width:100%"></div></div><span class="s4-bar-val" style="margin-left:8px;font-size:18px">~$45,195</span></div>
          <div class="s4-bar-row"><span class="s4-bar-lbl" style="width:180px">Current (cash/savings yield)</span><div class="s4-bar-outer" style="height:36px"><div class="s4-bar-fill slate" style="width:10%"></div></div><span class="s4-bar-val" style="margin-left:8px;font-size:18px;color:#4E7496">~$4,400</span></div>
          <div style="margin-top:6%;padding:3% 4%;background:#00294D;border-radius:4px;font-family:Calibri,Arial;font-size:13px;color:white;font-weight:700">Incremental income opportunity: ~+$40,795 per year</div>
        </div>
        <div style="flex:1;display:flex;flex-direction:column;gap:4%">
          <div class="s4-callout"><div class="s4-callout-num">$881K</div><div class="s4-callout-lbl">Uninvested cash — 14.6% of portfolio</div></div>
          <div class="s4-stat-card slate"><div class="s4-stat-num">5.13%</div><div class="s4-stat-lbl">CV FI Yield-to-Worst</div><div class="s4-stat-sub">BBB+ average credit quality</div></div>
        </div>
      </div>`;

    case 'cash-drag|cd-metric':
      return `<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:3%;height:100%">
        <div class="s4-callout">
          <div class="s4-callout-num">$881K</div>
          <div class="s4-callout-lbl">Uninvested cash in MS-5931</div>
          <div class="s4-callout-sub">$656K uninvested + $221K in low-yield savings vehicle — 14.6% of total portfolio</div>
        </div>
        <div class="s4-callout slate">
          <div class="s4-callout-num">5.13%</div>
          <div class="s4-callout-lbl">CV Fixed Income yield-to-worst at BBB+</div>
          <div class="s4-callout-sub">Deploying $881K at this rate generates ~$45,195 per year in income</div>
        </div>
        <div class="s4-callout" style="background:#003767">
          <div class="s4-callout-num">~$41K</div>
          <div class="s4-callout-lbl">Incremental annual income vs. current cash yield</div>
          <div class="s4-callout-sub">The most immediately actionable opportunity in the Frio portfolio — no transition risk, purely additive</div>
        </div>
      </div>`;

    // ── BlackRock off-the-shelf explainer ────────────────────────────────────
    case 'blackrock-ma|bm-model':
      return `<div class="s4-cols">
        <div class="s4-col">
          <div class="s4-col-hdr">What a MAPS Model Is</div>
          <div class="s4-col-body">
            <div class="s4-col-row"><span class="s4-col-row-k">Full Name</span><span class="s4-col-row-v">BlackRock Target Allocation MAPS 60/40</span></div>
            <div class="s4-col-row"><span class="s4-col-row-k">Type</span><span class="s4-col-row-v">Standardized model portfolio</span></div>
            <div class="s4-col-row"><span class="s4-col-row-k">Clients Using Same Model</span><span class="s4-col-row-v bad">Thousands</span></div>
            <div class="s4-col-row"><span class="s4-col-row-k">Customized for Frio</span><span class="s4-col-row-v bad">No</span></div>
            <div class="s4-col-row"><span class="s4-col-row-k">Tax-Sensitive Construction</span><span class="s4-col-row-v bad">No</span></div>
            <div class="s4-col-row"><span class="s4-col-row-k">Considers MS-5931 Positions</span><span class="s4-col-row-v bad">No</span></div>
            <div class="s4-col-row"><span class="s4-col-row-k">Gross vs. Net Gap</span><span class="s4-col-row-v bad">~3% per year</span></div>
          </div>
        </div>
        <div class="s4-col">
          <div class="s4-col-hdr slate">CV Advisors Approach</div>
          <div class="s4-col-body">
            <div class="s4-col-row"><span class="s4-col-row-k">Portfolio Construction</span><span class="s4-col-row-v good">Security by security</span></div>
            <div class="s4-col-row"><span class="s4-col-row-k">Household-Level View</span><span class="s4-col-row-v good">Both accounts coordinated</span></div>
            <div class="s4-col-row"><span class="s4-col-row-k">Customization</span><span class="s4-col-row-v good">Full — IPS-driven</span></div>
            <div class="s4-col-row"><span class="s4-col-row-k">Tax Sensitivity</span><span class="s4-col-row-v good">Integrated</span></div>
            <div class="s4-col-row"><span class="s4-col-row-k">Advisory Fee</span><span class="s4-col-row-v good">0.70% (all-in advisory)</span></div>
            <div class="s4-col-row"><span class="s4-col-row-k">5-Year Net Return</span><span class="s4-col-row-v good">7.71% vs. 4.72% (BlackRock)</span></div>
            <div class="s4-col-row"><span class="s4-col-row-k">5yr Terminal Value Delta ($2.49M)</span><span class="s4-col-row-v good">~+$510K</span></div>
          </div>
        </div>
      </div>`;

    // ── CV 60/40 growth line ─────────────────────────────────────────────────
    case 'cv-6040|cv60-line':
      return `<div style="display:flex;gap:3%;height:100%">
        <div style="flex:2;display:flex;flex-direction:column">
          <div style="background:#F4F5F5;border-radius:4px;padding:3%;flex:1;display:flex;flex-direction:column;justify-content:space-between">
            <div style="font-family:Calibri,Arial;font-size:10px;color:#8A949E;margin-bottom:4px">Growth of $1M — CV 60/40 vs. BlackRock MAPS 60/40 (Net) — 2019 to Present (Illustrative)</div>
            <svg viewBox="0 0 400 180" style="width:100%;flex:1">
              <line x1="30" y1="160" x2="390" y2="160" stroke="#D4D6D9" stroke-width="1"/>
              <line x1="30" y1="160" x2="30" y2="10" stroke="#D4D6D9" stroke-width="1"/>
              <text x="26" y="163" font-family="Calibri,Arial" font-size="8" fill="#8A949E" text-anchor="end">$1M</text>
              <text x="26" y="100" font-family="Calibri,Arial" font-size="8" fill="#8A949E" text-anchor="end">$1.3M</text>
              <text x="26" y="40" font-family="Calibri,Arial" font-size="8" fill="#8A949E" text-anchor="end">$1.6M</text>
              <!-- CV 60/40 line (higher) -->
              <polyline points="30,160 100,145 160,130 230,112 300,88 360,68 390,55" fill="none" stroke="#00294D" stroke-width="2.5"/>
              <!-- BlackRock line (lower) -->
              <polyline points="30,160 100,150 160,140 230,128 300,115 360,102 390,97" fill="none" stroke="#4E7496" stroke-width="2" stroke-dasharray="5,3"/>
              <text x="394" y="57" font-family="Calibri,Arial" font-size="8" fill="#00294D">CV: ~$1.65M</text>
              <text x="394" y="99" font-family="Calibri,Arial" font-size="8" fill="#4E7496">BLK: ~$1.26M</text>
              <text x="30" y="175" font-family="Calibri,Arial" font-size="7" fill="#8A949E">2019</text>
              <text x="360" y="175" font-family="Calibri,Arial" font-size="7" fill="#8A949E">2025</text>
            </svg>
            <div style="font-family:Calibri,Arial;font-size:8px;color:#8A949E;margin-top:4px">Illustrative only. Net of max CV advisory fee (0.70%). Past performance not indicative of future results. See disclosures.</div>
          </div>
        </div>
        <div style="flex:1;display:flex;flex-direction:column;gap:3%">
          <div class="s4-callout"><div class="s4-callout-num">+299 bps</div><div class="s4-callout-lbl">CV annualized outperformance over 5 years vs. BlackRock MAPS 60/40</div></div>
          <div class="s4-stat-card slate"><div class="s4-stat-num">~+$510K</div><div class="s4-stat-lbl">Terminal Value Delta</div><div class="s4-stat-sub">5yr, on $2.49M (MS-2627) — illustrative</div></div>
        </div>
      </div>`;

    default:
      // Generic fallback for unimplemented slides
      const lib2 = (typeof slideLib !== 'undefined' && slideLib[cid]) || {};
      const opts2 = lib2.opts || [];
      const opt2 = opts2.find(o => o.id === oid) || {};
      return `<div style="height:100%;display:flex;flex-direction:column;justify-content:center;align-items:center;gap:4%">
        <div style="font-family:Calibri,Arial,sans-serif;font-size:16px;font-weight:700;color:#00294D;text-align:center">${opt2.name || oid}</div>
        <div style="background:#F4F5F5;border-radius:6px;padding:3% 4%;max-width:70%;font-family:Calibri,Arial,sans-serif;font-size:11px;color:#6b7a87;text-align:center;line-height:1.6">${opt2.desc || 'Slide content will be rendered here.'}</div>
        <div style="background:#003767;border-radius:4px;padding:2% 4%;font-family:Calibri,Arial,sans-serif;font-size:13px;font-weight:700;color:white">${(opt2.name||'').split(':')[0] || 'Chart / Table'}</div>
      </div>`;
  }
}


// ─── CUSTOM COMPONENTS (Stage 1) ─────────────────────────────────────────────
