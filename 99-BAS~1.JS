// ============================================================================
// BASELINE GATE -- applies FEATURES flags from 00-config.js.
// Loads LAST. Disabled modules are hidden + no-op'd here (code stays in its
// module file so re-enabling is just a flag flip; hard code-removal happens
// in a later excision pass once the baseline is validated -- see PRD.md).
// ============================================================================
(function () {
  var F = window.FEATURES || {};

  function noop(name) {
    if (typeof window[name] === 'function') window[name] = function () {};
  }
  function hide(sel) {
    document.querySelectorAll(sel).forEach(function (el) { el.style.display = 'none'; });
  }

  // -- Mock AI (default) ------------------------------------------------------
  // The demo's AI paths call window.cowork.askClaude(prompt). When liveAI is
  // off and no bridge exists, we install a canned-response shim so every AI
  // feature "works" instantly and the demo can never break in a meeting.
  // Entering an Anthropic API key (key dot, top right) restores live calls
  // through callClaude for anything that uses it.
  if (!F.liveAI && !(window.cowork && window.cowork.askClaude)) {
    window.cowork = window.cowork || {};
    window.cowork.askClaude = function (prompt) {
      return new Promise(function (resolve) {
        setTimeout(function () { resolve(mockResponse(prompt || '')); }, 900);
      });
    };
  }

  function mockResponse(prompt) {
    var p = prompt.toLowerCase();
    var tag = '\n\n[Demo mode -- canned response. Enter an API key to enable live AI.]';
    if (p.indexOf('story angles') !== -1 || p.indexOf('most important issue') !== -1) {
      return 'LEAD ISSUE - Idle cash drag: $881K (14.6% of the $6.05M portfolio) is sitting in cash at MS-5931. At CV Fixed Income yield of 5.13% that is roughly $45K/yr of income the client is not collecting -- material for a client whose stated priority is portfolio income.\n\nSTORY ANGLES\n1. Income gap -- $72K/yr all-in fees (1.19%) vs. ~$45K/yr of uncaptured cash yield: fees and idle cash together cost more than 1.9% of AUM annually.\n2. Two uncoordinated accounts -- MS-5931 ($3.57M self-directed) and MS-2627 ($2.49M BlackRock MAPS) run without an IPS; equity P&L is driven 93% by three positions (RIG, BN, HCC).\n3. Off-the-shelf vs. custom -- BlackRock 60/40 MAPS shows a ~3%/yr gross-vs-net gap; CV 60/40 beat it net-of-fees over 1yr (13.81% vs 13.43%) and 5yr (7.71% vs 4.72%).\n\nLIKELY OBJECTION -- "My stock picks have done well." Acknowledge it: the Frio basket is +233% ITD. Then show concentration risk (top 3 = 93% of equity P&L) and CV Equity Market at +257% ITD with diversified exposure.' + tag;
    }
    if (p.indexOf('talking points') !== -1) {
      return 'Revised talking points: anchor the slide on the client income objective, cite the specific dollar figures from the statement data, and close with the CV composite comparison. Keep one message per slide.' + tag;
    }
    if (p.indexOf('pm question') !== -1) {
      return 'Based on the loaded portfolio context: the strongest data-backed answer ties back to the $881K idle cash and the 1.19% all-in fee load -- both are quantified on the analysis tiles.' + tag;
    }
    return 'Analysis complete based on the loaded portfolio data.' + tag;
  }

  // -- Function no-ops for excised modules ------------------------------------
  if (!F.selfDirectedPanel)    { noop('buildSelfDirectedPanel'); noop('confirmSelfDirected'); noop('dismissSelfDirected'); }
  if (!F.manualClassification) { noop('confirmClassify'); noop('updateClassifySubtype'); }
  if (!F.narrativeGeneration)  { noop('generateNarrative'); noop('toggleNarratives'); }
  if (!F.askAI)                { noop('askAIOpinion'); noop('addMissedInfo'); }
  if (!F.slideReorder)         { noop('s4MoveUp'); noop('s4MoveDown'); }
  if (!F.slideRegen)           { noop('s4Regen'); }
  if (!F.customComponents)     { noop('addCustomComponent'); noop('removeCustomComponent'); }
  if (!F.customCharts)         { noop('toggleCustomBuild'); noop('addCustomChart'); noop('updateChartPreview'); noop('selectChip'); }
  if (!F.customSlides)         { noop('addCustomSlide'); }
  if (!F.printDeck)            { noop('printDeck'); }

  // -- Injected CSS: ordering-proof hiding for excised module UI --------------
  var css = [];
  if (!F.transcriptUpload)     css.push('#zoneTranscript{display:none!important}');
  if (!F.selfDirectedPanel)    css.push('#s0SelfDirectedPanel{display:none!important}');
  if (!F.manualClassification) css.push('#s0ClassifyPanel{display:none!important}');
  if (!F.thinkingAnimation)    css.push('#aiThinking{display:none!important}');
  if (!F.slideReorder)         css.push('[onclick^="s4MoveUp"],[onclick^="s4MoveDown"]{display:none!important}');
  if (!F.slideRegen)           css.push('[id^="s4RegenBtn"],[id^="s4Instr"],[onclick^="s4Regen"]{display:none!important}');
  if (!F.customCharts)         css.push('[onclick^="toggleCustomBuild"],[onclick^="addCustomChart"],[id^="custBuild-"],[id^="custCanvas-"]{display:none!important}');
  if (!F.customSlides)         css.push('[onclick^="addCustomSlide"]{display:none!important}');
  if (!F.customComponents)     css.push('#customCompCards,[onclick*="addCustomComponent"],[onclick*="removeCustomComponent"]{display:none!important}');
  if (!F.narrativeGeneration)  css.push('#narrativeToggleBtn,#narrativesWrap,[onclick*="generateNarrative"]{display:none!important}');
  if (!F.askAI)                css.push('#followupInput,#followupOut,[onclick*="askAIOpinion"],[onclick*="addMissedInfo"]{display:none!important}');
  if (!F.printDeck)            css.push('[onclick*="printDeck"]{display:none!important}');
  if (css.length) {
    var st = document.createElement('style');
    st.id = 'baselineGateCSS';
    st.textContent = css.join('\n');
    document.head.appendChild(st);
  }

  // -- Static DOM hiding once the page is ready --------------------------------
  // (window listener so it fires after the demo pre-fill listener in 14-init)
  window.addEventListener('DOMContentLoaded', function () {
    if (!F.transcriptUpload)     hide('#zoneTranscript');
    if (!F.selfDirectedPanel)    hide('#s0SelfDirectedPanel');
    if (!F.manualClassification) hide('#s0ClassifyPanel');
    if (!F.customComponents)     hide('#customCompName,#customCompDesc,#customCompError');
    if (!F.clientSpecificTopics) {
      ['blackrock-ma', 'north-haven', 'aci', 'bn'].forEach(function (id) {
        var el = document.getElementById(id);
        if (el) el.style.display = 'none';
        hide('[data-topic="' + id + '"]');
      });
    }
  });
})();
