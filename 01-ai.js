// API key management -- works standalone (no Cowork needed)
// safeStore: localStorage guarded for environments where it's unavailable
// (some file:// / sandboxed contexts throw SecurityError on access).
window.safeStore = {
  get: function(k){ try { return localStorage.getItem(k); } catch(e){ return null; } },
  set: function(k,v){ try { localStorage.setItem(k,v); } catch(e){} },
  remove: function(k){ try { localStorage.removeItem(k); } catch(e){} }
};
(function(){
  var stored = safeStore.get('cv_anthropic_key');
  if(stored) window._cvApiKey = stored;
})();

async function callClaude(prompt, maxTokens, model) {
  maxTokens = maxTokens || 2000;
  model = model || 'claude-sonnet-4-6';
  var key = window._cvApiKey || safeStore.get('cv_anthropic_key');
  if(!key) {
    key = window.prompt('Enter your Anthropic API key to enable AI analysis:');
    if(!key) return null;
    window._cvApiKey = key;
    safeStore.set('cv_anthropic_key', key);
    updateKeyUI();
  }
  var r = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': key,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true'
    },
    body: JSON.stringify({ model: model, max_tokens: maxTokens, messages: [{ role: 'user', content: prompt }] })
  });
  if(!r.ok) {
    var err = await r.json().catch(function(){return {};});
    if(r.status===401) { window._cvApiKey=null; safeStore.remove('cv_anthropic_key'); updateKeyUI(); }
    throw new Error((err.error&&err.error.message)||('API error '+r.status));
  }
  var d = await r.json();
  return (d.content&&d.content[0]&&d.content[0].text)||null;
}

function updateKeyUI() {
  var el = document.getElementById('apiKeyStatus');
  if(!el) return;
  var key = window._cvApiKey || safeStore.get('cv_anthropic_key');
  var dot = el.querySelector('.dot');
  if(key) {
    if(dot) dot.style.background='#4ade80';
    el.title = 'AI key set (sk-...'+key.slice(-4)+') -- click to change';
  } else {
    if(dot) dot.style.background='#f87171';
    el.title = 'No API key -- click to enter';
  }
}

function promptApiKey() {
  var key = window.prompt('Paste your Anthropic API key (sk-ant-...):');
  if(key&&key.trim()) {
    window._cvApiKey = key.trim();
    safeStore.set('cv_anthropic_key', key.trim());
    updateKeyUI();
  }
}
window.addEventListener('DOMContentLoaded', updateKeyUI);
