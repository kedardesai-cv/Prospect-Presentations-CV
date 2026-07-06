const customComponents = []; // {id, name, desc}

function addCustomComponent() {
  const nameEl = document.getElementById('customCompName');
  const descEl = document.getElementById('customCompDesc');
  const errEl  = document.getElementById('customCompError');
  const name = nameEl.value.trim();
  const desc = descEl.value.trim();
  if (!name) { errEl.textContent = 'Please enter a component name.'; errEl.style.display='block'; return; }
  errEl.style.display = 'none';
  const id = 'custom-' + Date.now();
  customComponents.push({ id, name, desc });
  selectedCards.add(id);
  if (!slideChoices[id]) slideChoices[id] = [];
  nameEl.value = ''; descEl.value = '';
  renderCustomCompCards();
  renderBlueprint();
}

function removeCustomComponent(id) {
  const idx = customComponents.findIndex(c => c.id === id);
  if (idx !== -1) customComponents.splice(idx, 1);
  selectedCards.delete(id);
  delete slideChoices[id];
  renderCustomCompCards();
  renderBlueprint();
}

function renderCustomCompCards() {
  const container = document.getElementById('customCompCards');
  if (!container) return;
  container.innerHTML = customComponents.map(c => `
    <div class="custom-comp-card selected">
      <span class="cc-name">${c.name}</span>
      ${c.desc ? `<span style="color:var(--text-muted);font-size:10px;flex:2">${c.desc}</span>` : ''}
      <span class="cc-rm" onclick="removeCustomComponent('${c.id}')" title="Remove">✕</span>
    </div>`).join('');
}

// ─── CUSTOM SLIDES (Stage 2) ──────────────────────────────────────────────────
function addCustomSlide(cid) {
  const input = document.getElementById('customSlide-' + cid);
  if (!input) return;
  const desc = input.value.trim();
  if (!desc) return;
  const sid = 'cs-' + Date.now();
  if (!slideChoices[cid]) slideChoices[cid] = [];
  slideChoices[cid].push({ id: sid, name: desc, type: 'Custom' });
  input.value = '';
  // Show confirmation
  const form = input.closest('.custom-slide-form');
  if (form) {
    const confirm = document.createElement('div');
    confirm.style.cssText = 'font-family:Arial,sans-serif;font-size:10px;color:var(--slate);margin-top:4px';
    confirm.textContent = '✓ Added: ' + desc;
    form.appendChild(confirm);
    setTimeout(() => confirm.remove(), 2500);
  }
  // Update expander count
  const countEl = document.getElementById('expc-' + cid);
  if (countEl) {
    const n = slideChoices[cid].length;
    countEl.textContent = n + ' slide' + (n > 1 ? 's' : '');
    countEl.className = 'exp-count has';
  }
  renderBlueprint();
}

