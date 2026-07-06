const INSTITUTIONAL_HEADERS = [
  'cusip','isin','ticker','symbol','market value','mkt value','quantity','shares',
  'price','account number','account no','account name','asset class','security name',
  'security description','cost basis','unrealized gain','unrealized p&l','settlement date',
  'trade date','maturity date','coupon rate','par value','accrued interest','sector',
  'sub-asset class','currency','position','lot date'
];

function detectStatementSource(headers) {
  const normed = headers.map(h => (h || '').toString().toLowerCase().trim());
  let score = 0;
  INSTITUTIONAL_HEADERS.forEach(ih => {
    if (normed.some(h => h.includes(ih))) score++;
  });
  // 3+ institutional column matches → institutional
  return score >= 3 ? 'institutional' : 'client-built';
}

function detectMissingPositions(rows) {
  if (!rows || rows.length < 3) return null;
  const headers = rows[0].map(h => (h || '').toString().toLowerCase().trim());
  // Find a market value column
  const mvIdx = headers.findIndex(h =>
    h.includes('market value') || h.includes('mkt value') || h === 'value' || h.includes('mv')
  );
  if (mvIdx < 0) return null;
  let sumPositions = 0;
  let statedTotal = null;
  for (let i = 1; i < rows.length; i++) {
    const firstCell = (rows[i][0] || '').toString().toLowerCase();
    const cell = rows[i][mvIdx];
    const val = parseFloat((cell || '').toString().replace(/[$,()]/g, ''));
    if (isNaN(val)) continue;
    // Detect total row
    if (firstCell.includes('total') || firstCell.includes('grand total') || firstCell.includes('portfolio total')) {
      if (val > sumPositions * 0.5) { statedTotal = val; continue; }
    }
    if (val > 0) sumPositions += val;
  }
  if (!statedTotal || statedTotal <= 0) return null;
  const gap = Math.abs(statedTotal - sumPositions) / statedTotal;
  if (gap >= 0.01) {
    return { gapPct: (gap * 100).toFixed(1), gapAmt: Math.abs(statedTotal - sumPositions).toFixed(0) };
  }
  return null;
}

var _statementSource = null;
var _missingFlag = null;

async function askAIOpinion(){
  var input=document.getElementById('followupInput');
  var out=document.getElementById('followupOut');
  var q=input?input.value.trim():'';
  if(!q){ alert('Enter a question first.'); return; }
  out.style.display='block'; out.textContent='Thinking...';
  try {
    if(window.cowork&&window.cowork.askClaude){
      var ctx=buildLiveContext();
      var resp=await window.cowork.askClaude('CV Advisors prospect context:\n'+ctx+'\n\nPM question: '+q+'\n\nAnswer concisely in 2-4 sentences, analyst voice.',[]);
      out.textContent=(typeof resp==='string')?resp:(resp&&resp.content)?(Array.isArray(resp.content)?resp.content[0].text:resp.content):'No response.';
    } else { out.textContent='AI connection not available.'; }
  } catch(e){ out.textContent='Error: '+(e.message||e); }
}



// ============================
// SELF-DIRECTED PANEL
// ============================
