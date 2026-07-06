const previewDataSets = {
  'both':       { labels:['MS-5931','MS-2627'], values:[3567079,2485095], fmt:'$', scale:1e6, unit:'M' },
  'ms5931':     { labels:['Equity','Cash','Alts','Fixed Inc.'], values:[1605698,881120,558927,521254], fmt:'$', scale:1e6, unit:'M' },
  'ms2627':     { labels:['Equity ETF','Fixed Inc.','Commodity','Cash'], values:[1579576,842137,59198,4181], fmt:'$', scale:1e6, unit:'M' },
  'balances':   { labels:['MS-5931','MS-2627'], values:[3567079,2485095], fmt:'$', scale:1e6, unit:'M' },
  'fees':       { labels:['Advisory','Alt Funds','Sales Loads','Distribution','ETF Exp.'], values:[30261,16343,10893,9071,2420], fmt:'$', scale:1, unit:'' },
  'alloc':      { labels:['Equity Ind.','Equity ETF','Fixed Inc.','Cash','Alts','Commodity'], values:[26.5,26.1,22.6,14.6,9.2,1.0], fmt:'', scale:1, unit:'%' },
  'comparison': { labels:['CV 60/40 5yr','BLK MAPS 5yr','CV FI ITD','Frio FI ITD'], values:[7.71,4.72,118,106], fmt:'', scale:1, unit:'%' }
};

function selectChip(el, id) {
  var chips = el.parentNode.querySelectorAll('.custbuild-chip');
  chips.forEach(function(c){ c.classList.remove('active'); });
  el.classList.add('active');
  updateChartPreview(id);
}

function updateChartPreview(id) {
  var canvas = document.getElementById('custCanvas-' + id);
  if (!canvas) return;
  var typeEl = document.getElementById('custType-' + id);
  var chips = document.querySelectorAll('#custChips-' + id + ' .custbuild-chip.active');
  var scope = chips.length ? chips[0].dataset.scope : 'both';
  var type = typeEl ? typeEl.value : 'bar-v';
  var d = previewDataSets[scope] || previewDataSets['both'];
  var W = canvas.parentNode.offsetWidth - 20 || 360;
  var H = 140;
  canvas.width = W; canvas.height = H;
  var ctx = canvas.getContext('2d');
  ctx.clearRect(0,0,W,H);
  var navy='#00294D', slate='#4E7496', light='#B8C8D8';
  var colors = [navy, slate, '#6B91AE', '#96B1C8', light, '#E8EFF6'];
  if (type === 'donut') {
    var total = d.values.reduce(function(a,b){return a+b;},0);
    var cx=W/2, cy=H/2, r=Math.min(cx,cy)-14, start=-Math.PI/2;
    d.values.forEach(function(v,i){
      var slice = (v/total)*Math.PI*2;
      ctx.beginPath(); ctx.moveTo(cx,cy);
      ctx.arc(cx,cy,r,start,start+slice);
      ctx.closePath(); ctx.fillStyle=colors[i%colors.length]; ctx.fill();
      start+=slice;
    });
    ctx.beginPath(); ctx.arc(cx,cy,r*0.52,0,Math.PI*2);
    ctx.fillStyle='#FFF'; ctx.fill();
  } else {
    var pad=28, barW=Math.min(44, (W-pad*2)/d.values.length*0.6);
    var gap=(W-pad*2-barW*d.values.length)/(d.values.length+1);
    var max=Math.max.apply(null,d.values)*1.15;
    var chartH=H-36;
    // baseline
    ctx.strokeStyle='#E8EFF6'; ctx.lineWidth=1;
    ctx.beginPath(); ctx.moveTo(pad,chartH); ctx.lineTo(W-pad,chartH); ctx.stroke();
    d.values.forEach(function(v,i){
      var x=pad+gap*(i+1)+barW*i;
      var bH=Math.round((v/max)*chartH*0.85);
      var y=chartH-bH;
      if (type === 'bar-h') {
        var hBarH=Math.min(20,(H-10)/d.values.length*0.65);
        var hBarW=Math.round((v/max)*(W-80)*0.9);
        var hy=8+i*(hBarH+4);
        ctx.fillStyle=colors[i%colors.length];
        ctx.fillRect(50,hy,hBarW,hBarH);
        ctx.fillStyle='#4E7496'; ctx.font='9px Arial'; ctx.textAlign='right';
        ctx.fillText(d.labels[i],46,hy+hBarH-2);
        ctx.fillStyle=navy; ctx.textAlign='left';
        var lbl=d.fmt+(d.scale>1?(v/d.scale).toFixed(2)+d.unit:v+d.unit);
        ctx.fillText(lbl,54+hBarW,hy+hBarH-2);
      } else {
        ctx.fillStyle=colors[i%colors.length];
        ctx.fillRect(x,y,barW,bH);
        // value label
        ctx.fillStyle=navy; ctx.font='bold 9px Arial'; ctx.textAlign='center';
        var lbl=d.fmt+(d.scale>1?'$'+(v/d.scale).toFixed(2)+'M':v+d.unit);
        ctx.fillText(lbl,x+barW/2,y-3);
        // x label
        ctx.fillStyle='#6B91AE'; ctx.font='9px Arial';
        ctx.fillText(d.labels[i],x+barW/2,chartH+12);
      }
    });
  }
}

function toggleCustomBuild(id) {
  var form = document.getElementById('custBuild-' + id);
  var card = document.getElementById('custCard-' + id);
  if (!form) return;
  var open = form.classList.contains('open');
  form.classList.toggle('open', !open);
  if (card) card.classList.toggle('chosen', !open);
  if (!open) { setTimeout(function(){ updateChartPreview(id); }, 50); }
}

function addCustomChart(id) {
  var typeEl  = document.getElementById('custType-'  + id);
  var titleEl = document.getElementById('custTitle-' + id);
  var chips   = document.querySelectorAll('#custChips-' + id + ' .custbuild-chip.active');
  var scope   = chips.length ? chips[0].textContent : '';
  var typeName = typeEl ? typeEl.options[typeEl.selectedIndex].text : 'Chart';
  var name = (titleEl && titleEl.value.trim()) ? titleEl.value.trim() : typeName + (scope ? ' — ' + scope : '');
  toggleSlide(id, 'custom-' + Date.now(), name, typeName);
  if (titleEl) titleEl.value = '';
  var form = document.getElementById('custBuild-' + id);
  if (form) form.classList.remove('open');
  var card = document.getElementById('custCard-' + id);
  if (card) card.classList.remove('chosen');
}

