window.addEventListener('DOMContentLoaded', function() {
  // ── Demo pre-fill ──────────────────────────────────────────────────────────
  var cc = document.getElementById('clientCode');
  if (cc) cc.value = 'FRIO-RIVER';
  var pm = document.getElementById('pmSelect');
  if (pm) pm.value = 'cecilia';
  var ci = document.getElementById('clientIntake');
  if (ci) ci.value = 'Young founder — sole owner of a mid-size operating company. Parents are co-signers on legacy accounts and have historically pushed to control investment decisions and direction. Client wants full autonomy over his portfolio and is actively building an estate structure to protect assets and limit parental influence going forward. Primary need: high income from the portfolio to fund lifestyle and legal/estate costs. $6.05M across two MS accounts — MS-5931 ($3.57M) self-directed equities + alts + $881K idle cash. MS-2627 ($2.49M) BlackRock MAPS 60/40 managed. No IPS, accounts uncoordinated. All-in fees ~1.19% ($72K/yr). Looking to consolidate under CV and restructure toward income-generating, estate-friendly allocation.';

  // ── Show preloaded intake results & badge ─────────────────────────────────
  var results = document.getElementById('intakeResults');
  if (results) results.style.display = 'block';
  var badge = document.getElementById('intakeClientCodeBadge');
  if (badge) { badge.style.display = 'inline-block'; badge.textContent = 'FRIO-RIVER'; }
  var btnA = document.getElementById('btnAnalyze');
  if (btnA) { btnA.disabled = false; btnA.style.opacity = ''; btnA.style.cursor = ''; }

  // ── Demo source badge ──────────────────────────────────────────────────────
  _statementSource = 'institutional';

  // ── Pre-load Frio analysis output ──────────────────────────────────────────
  renderIntakeResults(FRIO_DEMO_ANALYSIS, 'FRIO-RIVER');

  // ── Reset stage-0 side panels ─────────────────────────────────────────────
  var cp2 = document.getElementById('s0ClassifyPanel');
  if (cp2) { delete cp2.dataset.resolved; cp2.style.opacity = ''; cp2.style.display = 'flex'; }
  var sdp2 = document.getElementById('s0SelfDirectedPanel');
  if (sdp2) { delete sdp2.dataset.resolved; sdp2.style.display = 'flex'; }
  if (typeof sdaConfirmed !== 'undefined') { sdaConfirmed.clear(); sdaDismissed.clear(); }
  setTimeout(function() { buildSelfDirectedPanel(); }, 100);
});

