function buildStage2() {
  const body = document.getElementById('stage2body');
  const cards = document.querySelectorAll('.component-card');
  let html = `<p class="stage2-intro">Expand each selected story component below to choose which slides to include. The blueprint on the right updates as you select.</p>`;

  // Add expanders for topic data-point selections
  selectedTopics.forEach(topic => {
    const tid = 'topic-' + topic.replace(/[^a-z0-9]/gi,'-').toLowerCase();
    const chosen = slideChoices[tid] || [];
    const tLib = topicSlideLib[topic] || { intro: 'Add slides for the '+topic+' data point, or use the custom chart builder below.', opts: [] };
    const tOpts = tLib.opts || [];
    const tIntro = tLib.intro || 'Add slides for the '+topic+' data point, or use the custom chart builder below.';
    html += `<div class="component-expander">
      <div class="expander-header" id="exph-${tid}" onclick="toggleExp('${tid}')">
        <div class="exp-dot" style="background:#4E7496"></div>
        <div class="exp-title">${topic}</div>
        <div class="exp-count ${chosen.length ? 'has' : 'zero'}" id="expc-${tid}">${chosen.length ? chosen.length+' slide'+(chosen.length>1?'s':'') : '0 slides'}</div>
        <div class="exp-chev" id="expch-${tid}">▾</div>
      </div>
      <div class="slide-options" id="expopts-${tid}">
        <div class="opts-intro">${tIntro}</div>
        <div class="opt-grid">
          ${tOpts.map(o => `
            <div class="slide-opt ${chosen.find(c=>c.id===o.id)?'chosen':''}" id="sopt-${tid}-${o.id}" onclick="toggleSlide('${tid}','${o.id}','${esc(o.name)}','${esc(o.type)}')">
              <div class="opt-preview">
                ${o.mock}
                <div class="opt-preview-type">${o.type}</div>
                <div class="opt-check">✓</div>
              </div>
              <div class="opt-info"><div class="opt-name">${o.name}</div><div class="opt-desc">${o.desc}</div></div>
            </div>`).join('')}
          <div class="slide-opt custom-build" id="custCard-${tid}" onclick="toggleCustomBuild('${tid}')">
            <div class="opt-preview" style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;gap:4px;">
              <div class="custom-build-icon">+</div>
              <div style="font-size:9px;font-weight:700;color:#8A949E;text-transform:uppercase;letter-spacing:.07em">Build your own</div>
            </div>
            <div class="opt-info">
              <div class="opt-name">Custom Chart</div>
              <div class="opt-desc">Choose type + data</div>
            </div>
          </div>
        </div>
        <div class="custbuild-wrap" id="custBuild-${tid}">
          <div class="custbuild-label">Custom Chart Builder</div>
          <div class="custbuild-row">
            <div class="custbuild-field">
              <div class="custbuild-field-lbl">Chart Type</div>
              <select class="custbuild-select" id="custType-${tid}" onchange="updateChartPreview('${tid}')">
                <option value="bar-v">Bar (vertical)</option>
                <option value="bar-h">Bar (horizontal)</option>
                <option value="donut">Donut</option>
                <option value="line">Line</option>
                <option value="table">Table / Matrix</option>
              </select>
            </div>
            <div class="custbuild-field">
              <div class="custbuild-field-lbl">Chart Title</div>
              <input class="custbuild-input" type="text" id="custTitle-${tid}" placeholder="${topic} chart..." oninput="updateChartPreview('${tid}')" />
            </div>
          </div>
          <div class="custbuild-field-lbl">Data to Include</div>
          <div class="custbuild-chips" id="custChips-${tid}">
            <div class="custbuild-chip active" data-scope="both" onclick="selectChip(this,'${tid}')">Both Accounts</div>
            <div class="custbuild-chip" data-scope="ms5931" onclick="selectChip(this,'${tid}')">MS-5931</div>
            <div class="custbuild-chip" data-scope="ms2627" onclick="selectChip(this,'${tid}')">MS-2627</div>
            <div class="custbuild-chip" data-scope="balances" onclick="selectChip(this,'${tid}')">Account Balances</div>
            <div class="custbuild-chip" data-scope="fees" onclick="selectChip(this,'${tid}')">Fee Analysis</div>
            <div class="custbuild-chip" data-scope="alloc" onclick="selectChip(this,'${tid}')">Asset Allocation</div>
            <div class="custbuild-chip" data-scope="comparison" onclick="selectChip(this,'${tid}')">Strategy Comparison</div>
          </div>
          <div class="custbuild-field-lbl">Preview</div>
          <div class="custbuild-preview"><canvas id="custCanvas-${tid}" style="width:100%;display:block;"></canvas></div>
          <button class="custbuild-add-btn" onclick="addCustomChart('${tid}')">Add Custom Chart to Blueprint &#8594;</button>
        </div>
      </div>
    </div>`;
  });

  cards.forEach(card => {
    const id = card.dataset.id;
    if (!selectedCards.has(id)) return;
    const lib = slideLib[id] || {};
    const opts = lib.opts || [];
    const color = lib.color || '#003767';
    const intro = lib.intro || 'Choose slides for this component.';
    const title = card.querySelector('.comp-title').textContent.trim();
    const chosen = slideChoices[id] || [];
    html += `<div class="component-expander">
      <div class="expander-header" id="exph-${id}" onclick="toggleExp('${id}')">
        <div class="exp-dot" style="background:${color}"></div>
        <div class="exp-title">${title}</div>
        <div class="exp-count ${chosen.length ? 'has' : 'zero'}" id="expc-${id}">${chosen.length ? chosen.length+' slide'+(chosen.length>1?'s':'') : '0 slides'}</div>
        <div class="exp-chev" id="expch-${id}">▾</div>
      </div>
      <div class="slide-options" id="expopts-${id}">
        <div class="opts-intro">${intro}</div>
        <div class="opt-grid">
          ${opts.map(o => `
            <div class="slide-opt ${chosen.find(c=>c.id===o.id)?'chosen':''}" id="sopt-${id}-${o.id}" onclick="toggleSlide('${id}','${o.id}','${esc(o.name)}','${esc(o.type)}')">
              <div class="opt-preview">
                ${o.mock}
                <div class="opt-preview-type">${o.type}</div>
                <div class="opt-check">✓</div>
              </div>
              <div class="opt-info"><div class="opt-name">${o.name}</div><div class="opt-desc">${o.desc}</div></div>
            </div>`).join('')}
        </div>
        <div class="slide-opt custom-build" id="custCard-${id}" onclick="toggleCustomBuild('${id}')">
              <div class="opt-preview" style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;gap:4px;">
                <div class="custom-build-icon">+</div>
                <div style="font-size:9px;font-weight:700;color:#8A949E;text-transform:uppercase;letter-spacing:.07em">Build your own</div>
              </div>
              <div class="opt-info">
                <div class="opt-name">Custom Chart</div>
                <div class="opt-desc">Choose type + data</div>
              </div>
            </div>
        <div class="custbuild-wrap" id="custBuild-${id}">
          <div class="custbuild-label">Custom Chart Builder</div>
          <div class="custbuild-row">
            <div class="custbuild-field">
              <div class="custbuild-field-lbl">Chart Type</div>
              <select class="custbuild-select" id="custType-${id}" onchange="updateChartPreview('${id}')">
                <option value="bar-v">Bar (vertical)</option>
                <option value="bar-h">Bar (horizontal)</option>
                <option value="donut">Donut</option>
                <option value="line">Line</option>
                <option value="table">Table / Matrix</option>
              </select>
            </div>
            <div class="custbuild-field">
              <div class="custbuild-field-lbl">Chart Title</div>
              <input class="custbuild-input" type="text" id="custTitle-${id}" placeholder="e.g. Account Structure overview..." oninput="updateChartPreview('${id}')" />
            </div>
          </div>
          <div class="custbuild-field-lbl">Data to Include</div>
          <div class="custbuild-chips" id="custChips-${id}">
            <div class="custbuild-chip active" data-scope="both" onclick="selectChip(this,'${id}')">Both Accounts</div>
            <div class="custbuild-chip" data-scope="ms5931" onclick="selectChip(this,'${id}')">MS-5931</div>
            <div class="custbuild-chip" data-scope="ms2627" onclick="selectChip(this,'${id}')">MS-2627</div>
            <div class="custbuild-chip" data-scope="balances" onclick="selectChip(this,'${id}')">Account Balances</div>
            <div class="custbuild-chip" data-scope="fees" onclick="selectChip(this,'${id}')">Fee Analysis</div>
            <div class="custbuild-chip" data-scope="alloc" onclick="selectChip(this,'${id}')">Asset Allocation</div>
            <div class="custbuild-chip" data-scope="comparison" onclick="selectChip(this,'${id}')">Strategy Comparison</div>
          </div>
          <div class="custbuild-field-lbl">Preview</div>
          <div class="custbuild-preview">
            <canvas id="custCanvas-${id}" style="width:100%;display:block;"></canvas>
          </div>
          <button class="custbuild-add-btn" onclick="addCustomChart('${id}')">Add Custom Chart to Blueprint &#8594;</button>
        </div>
      </div>
    </div>`;
  });
  // Custom components — give each a simple text-only expander
  customComponents.forEach(cc => {
    const chosen = slideChoices[cc.id] || [];
    html += `<div class="component-expander">
      <div class="expander-header" id="exph-${cc.id}" onclick="toggleExp('${cc.id}')">
        <div class="exp-dot" style="background:var(--slate)"></div>
        <div class="exp-title">${cc.name}${cc.desc ? ' — <span style=\"font-weight:400;color:var(--text-muted)\">' + cc.desc + '</span>' : ''}</div>
        <div class="exp-count ${chosen.length ? 'has' : 'zero'}" id="expc-${cc.id}">${chosen.length ? chosen.length+' slide'+(chosen.length>1?'s':'') : '0 slides'}</div>
        <div class="exp-chev" id="expch-${cc.id}">▾</div>
      </div>
      <div class="slide-options" id="expopts-${cc.id}">
        <div class="opts-intro">Describe the slides you want for this component below.</div>
        <div class="custom-slide-form" style="margin-top:8px;padding:10px 12px;background:#f8f9fb;border-radius:4px;border:1px dashed var(--border)">
          <div style="font-family:Arial,sans-serif;font-size:10px;color:var(--text-muted);margin-bottom:6px;font-weight:600;letter-spacing:.04em;text-transform:uppercase">Describe a custom slide</div>
          <div style="display:flex;gap:8px;align-items:center">
            <input type="text" id="customSlide-${cc.id}" placeholder="e.g. ESG metrics dashboard with CO2 data" style="flex:1;padding:5px 8px;font-family:Arial,sans-serif;font-size:11px;border:1px solid var(--border);border-radius:3px;background:white;color:var(--navy)" />
            <button class="btn btn-secondary" style="white-space:nowrap;font-size:10px;padding:4px 10px" onclick="addCustomSlide('${cc.id}')">+ Add Slide</button>
          </div>
          ${chosen.length ? '<div style=\"margin-top:8px\">'+chosen.map(c=>'<div style=\"font-family:Arial,sans-serif;font-size:10px;color:var(--slate);padding:2px 0\">✓ '+c.name+'</div>').join('')+'</div>' : ''}
        </div>
      </div>
    </div>`;
  });
  body.innerHTML = html;
}

function esc(s) { return s.replace(/'/g,"\\'").replace(/"/g,'\\"'); }

function toggleExp(id) {
  const opts = document.getElementById('expopts-'+id);
  const hdr = document.getElementById('exph-'+id);
  const chev = document.getElementById('expch-'+id);
  const open = opts.classList.contains('open');
  opts.classList.toggle('open', !open);
  hdr.classList.toggle('open', !open);
  chev.classList.toggle('open', !open);
}

function toggleSlide(cid, oid, name, type) {
  if (!slideChoices[cid]) slideChoices[cid] = [];
  const arr = slideChoices[cid];
  const idx = arr.findIndex(c => c.id === oid);
  const el = document.getElementById('sopt-'+cid+'-'+oid);
  if (idx >= 0) { arr.splice(idx, 1); el.classList.remove('chosen'); }
  else { arr.push({id:oid, name, type}); el.classList.add('chosen'); }
  const badge = document.getElementById('expc-'+cid);
  const n = arr.length;
  badge.textContent = n ? n+' slide'+(n>1?'s':'') : '0 slides';
  badge.className = 'exp-count ' + (n ? 'has' : 'zero');
  renderBlueprint();
}

// ============================
// BLUEPRINT
// ============================
function renderBlueprint() {
  const container = document.getElementById('bpComponents');
  const badge = document.getElementById('slideCount');
  const cards = document.querySelectorAll('.component-card');
  let num = 21, total = 0, html = '';

  // Topic pills selected by PM
  selectedTopics.forEach(topic => {
    html += `<div class="bp-comp">
      <div class="bp-comp-hdr">
        <div class="bp-comp-dot" style="background:#4E7496"></div>
        <div class="bp-comp-name">${topic}</div>
        <div class="bp-comp-ct" style="color:#4E7496;font-size:8px;background:#E8EFF6;padding:1px 6px;border-radius:3px;">DATA POINT</div>
      </div>
    </div>`;
  });

  // Narrative cards selected by PM
  cards.forEach(card => {
    const id = card.dataset.id;
    if (!selectedCards.has(id)) return;
    const title = card.querySelector('.comp-title').textContent.trim();
    const st = card.dataset.st || 'analysis';
    const color = typeColors[st] || '#003767';
    const chosen = slideChoices[id] || [];

    if (!chosen.length) {
      html += `<div class="bp-comp">
        <div class="bp-comp-hdr">
          <div class="bp-comp-dot" style="background:${color}"></div>
          <div class="bp-comp-name">${title}</div>
          <div class="bp-comp-ct" style="color:#4E7496">No slides yet</div>
        </div>
      </div>`;
    } else {
      html += `<div class="bp-comp"><div class="bp-comp-hdr"><div class="bp-comp-dot" style="background:${color}"></div><div class="bp-comp-name">${title}</div><div class="bp-comp-ct">${chosen.length} slide${chosen.length>1?'s':''}</div></div>`;
      chosen.forEach(s => {
        html += `<div class="bp-slide-row">
          <div class="bp-slide-num">${num++}</div>
          <div class="bp-slide-name" title="${s.name}">${s.name}</div>
          <div class="bp-slide-tag" style="background:${color}18;color:${color}">${s.type}</div>
        </div>`;
        total++;
      });
      html += `</div>`;
    }
  });

  container.innerHTML = html || `<div class="empty-state"><div class="empty-icon">☐</div>Select components in Step 1 to build the blueprint.</div>`;
  badge.textContent = (20 + total) + ' slides';
}

// ============================
// AI
// ============================
