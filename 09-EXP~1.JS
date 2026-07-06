// ─── EXPORT (Stage 4) ─────────────────────────────────────────────────────────
function buildExportOutline() {
  const container = document.getElementById('exportOutline');
  if (!container) return;
  if (!s4Slides || s4Slides.length === 0) {
    container.innerHTML = '<p style="font-family:Arial,sans-serif;font-size:12px;color:var(--text-muted)">No slides selected. Go back to Stage 2 to build your deck.</p>';
    return;
  }
  const rows = s4Slides.map((sl, i) => `
    <tr style="border-bottom:1px solid var(--border)">
      <td style="padding:8px 12px;font-family:Arial,sans-serif;font-size:11px;color:var(--text-muted);width:40px">${sl.pageNum}</td>
      <td style="padding:8px 12px;font-family:Arial,sans-serif;font-size:11px;color:var(--navy);font-weight:600">${sl.name}</td>
      <td style="padding:8px 12px;font-family:Arial,sans-serif;font-size:10px;color:var(--slate)">${sl.type || ''}</td>
    </tr>`).join('');
  container.innerHTML = `
    <div style="font-family:Arial,sans-serif;font-size:10px;color:var(--text-muted);font-weight:600;letter-spacing:.04em;text-transform:uppercase;margin-bottom:8px">Deck Outline — ${s4Slides.length} slides</div>
    <table style="width:100%;border-collapse:collapse;background:white;border:1px solid var(--border);border-radius:4px;overflow:hidden">
      <thead>
        <tr style="background:#f4f5f5">
          <th style="padding:8px 12px;text-align:left;font-family:Arial,sans-serif;font-size:10px;color:var(--text-muted);font-weight:600">#</th>
          <th style="padding:8px 12px;text-align:left;font-family:Arial,sans-serif;font-size:10px;color:var(--text-muted);font-weight:600">Slide</th>
          <th style="padding:8px 12px;text-align:left;font-family:Arial,sans-serif;font-size:10px;color:var(--text-muted);font-weight:600">Type</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>`;
}

function exportHTML() {
  const msg = document.getElementById('exportMsg');
  // Serialize current slide content as standalone printable HTML
  const slideHTML = s4Slides.map(sl => {
    const content = buildFullSlide(sl.cid, sl.oid, sl.name, sl.pageNum);
    return `<div class="slide-page">${content}</div>`;
  }).join('');
  const fullHTML = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>CV Advisors Deck</title>
<style>
  @page { size: 13.33in 7.5in; margin: 0; }
  body { margin: 0; background: #eee; font-family: Calibri, Arial, sans-serif; }
  .slide-page { width: 1280px; height: 720px; background: white; overflow: hidden; display: flex; flex-direction: column; page-break-after: always; margin: 20px auto; box-shadow: 0 2px 8px rgba(0,0,0,.15); }
  .s4-hdr { background:#00294D;display:flex;align-items:center;justify-content:space-between;padding:0 24px;height:54px;flex-shrink:0 }
  .s4-logo { height:18px;width:auto }
  .s4-section-lbl { color:rgba(255,255,255,.65);font-size:11px;letter-spacing:.08em;text-transform:uppercase }
  .s4-title-band { padding:18px 40px 10px;flex-shrink:0 }
  .s4-slide-title { color:#00294D;font-size:28px;font-weight:700;line-height:1.1 }
  .s4-slide-sub { color:#8A949E;font-size:13px;margin-top:4px }
  .s4-divider { height:1px;background:#D0D3D6;margin:0 40px;flex-shrink:0 }
  .s4-content { flex:1;padding:20px 40px;overflow:hidden;display:flex;flex-direction:column }
  .s4-footer { display:flex;justify-content:space-between;align-items:center;padding:6px 24px;background:#D0D8E4;font-size:9px;color:#A9B8C7;border-top:2px solid #00294D;flex-shrink:0;height:30px }
  .s4-foot-c { font-weight:600;color:#4E7496 }
  @media print { body { background: white; } .slide-page { margin: 0; box-shadow: none; } }
</style></head><body>${slideHTML}</body></html>`;
  const blob = new Blob([fullHTML], {type: 'text/html'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'cv-deck-' + new Date().toISOString().slice(0,10) + '.html';
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  if (msg) { msg.textContent = 'Download started. Open the file in a browser and use Print → Save as PDF to get a PDF.'; msg.style.display = 'block'; }
}

function copyOutline() {
  if (!s4Slides || !s4Slides.length) return;
  const text = s4Slides.map(sl => `${sl.pageNum}. ${sl.name} (${sl.type || 'Slide'})`).join('\n');
  navigator.clipboard.writeText(text).then(() => {
    const msg = document.getElementById('exportMsg');
    if (msg) { msg.textContent = 'Deck outline copied to clipboard.'; msg.style.display = 'block'; setTimeout(() => { msg.style.display='none'; }, 2500); }
  });
}

function printDeck() {
  window.print();
}


// ============================
// STAGE 0 — PM INTAKE
// ============================
