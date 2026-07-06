const portfolioCtx = `Client: Frio River. AUM $6,052,184 as of Feb 2026. MS-5931 ($3.57M, 59%) and MS-2627 managed account ($2.49M, 41%). Asset mix: Equity Individual 26.5% (10 stocks), Equity Market ETFs 26.1% (12 iShares in BlackRock 60/40 MAPS), Fixed Income 22.6%, Cash 14.6% ($881K), Alternatives 9.2% (K-Infra, BXPE, K-PEC), Commodity 1.0%. Key equities: RIG $396K 6.5%, BN $341K 5.6%, HCC $266K 4.4%, BRK/B $202K 3.3%, PHM $165K 2.7%. Top 3 = 93% of equity P&L. BlackRock MAPS gross vs net gap ~3%/yr. Alternatives: BXPE ITD 11.6% vs S&P 23.2%; K-PEC ITD 15.16% vs S&P 21.6%; K-Infra 4.23% distribution. North Haven PIF is MS-owned. Blue Owl had reported redemption gates and class action 2025-2026. All-in fees 1.19% ($72K/yr). CV Equity Market composite +257% ITD vs Frio basket +233%; CV FI +118% vs Frio FI +106% since Aug 2019; CV 60/40 1yr 13.81% vs BlackRock net 13.43%; 5yr 7.71% vs 4.72%. $881K cash could generate ~$45K more/yr at CV FI yield 5.13%.`;

async function runAnalysis() {
  const btn = document.getElementById('analyzeBtn');
  const thinking = document.getElementById('aiThinking');
  const out = document.getElementById('aiOutRight');
  const notes = document.getElementById('pmNotes').value;
  btn.disabled = true;
  thinking.style.display = 'flex';
  document.getElementById('thinkText').textContent = 'Analyzing portfolio...';
  out.classList.remove('vis'); out.textContent = '';
  try {
    const prompt = `You are a senior portfolio analyst at CV Advisors.\n\nPortfolio:\n${portfolioCtx}\n\n${notes?'PM Notes: '+notes+'\n\n':''}Provide:\n1. The single most important issue to lead with (1-2 sentences, cite specific data)\n2. Three compelling story angles with specific numbers\n3. Most likely client objection and how to address it\n\nProfessional tone. Under 280 words.`;
    let text = '';
    if (window.cowork && window.cowork.askClaude) {
      const r = await window.cowork.askClaude(prompt, []);
      text = (typeof r === 'string') ? r : (r && r.content) ? (Array.isArray(r.content) ? r.content[0].text : r.content) : JSON.stringify(r);
    } else { text = 'AI not available in this environment.'; }
    thinking.style.display = 'none';
    out.textContent = text; out.classList.add('vis');
  } catch(e) { thinking.style.display='none'; out.textContent='Error: '+(e.message||e); out.classList.add('vis'); }
  btn.disabled = false;
}

async function generateNarrative() {
  const out = document.getElementById('narrativeOutput');
  const thinking = document.getElementById('aiThinking');
  const cards = document.querySelectorAll('.component-card');
  const selected = [];
  cards.forEach(c => { if (selectedCards.has(c.dataset.id)) selected.push(c.querySelector('.comp-title').textContent.trim()); });
  if (!selected.length) { out.textContent = 'Please select at least one story component in Step 1 before generating a narrative.'; return; }
  thinking.style.display = 'flex';
  document.getElementById('thinkText').textContent = 'Drafting narrative...';
  out.textContent = 'Generating...';
  const notes = document.getElementById('pmNotes').value;
  try {
    const r = await fetch('https://api.anthropic.com/v1/messages', { method:'POST', headers:{'Content-Type':'application/json','x-api-key':window._cvApiKey||safeStore.get('cv_anthropic_key')||'','anthropic-version':'2023-06-01','anthropic-dangerous-direct-browser-access':'true'},
      body: JSON.stringify({ model:'claude-sonnet-4-6', max_tokens:1000, messages:[{role:'user',content:`You are a senior portfolio manager at CV Advisors preparing a prospect presentation for Frio River.\n\nPortfolio:\n${portfolioCtx}\n\n${notes?'PM notes: '+notes+'\n\n':''}Selected story components:\n${selected.map((s,i)=>(i+1)+'. '+s).join('\n')}\n\nWrite a professional opening narrative (3-4 paragraphs) for the portfolio analysis section. Acknowledge what the client has built without flattery, preview the key issues from the client's perspective, advisory not sales tone, reference actual data. Under 250 words.`}]})
    });
    const d = await r.json();
    thinking.style.display = 'none';
    if (d.content?.[0]) out.textContent = d.content[0].text;
  } catch(e) { thinking.style.display='none'; out.textContent='Connection error. Please try again.'; }
}


// ============================
// STAGE 4 — FULL SLIDE PREVIEW
// ============================
