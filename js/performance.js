const months = [
  {y:'2022',m:'Feb',pnl:34349},{y:'2022',m:'Mar',pnl:23963},{y:'2022',m:'Apr',pnl:14427},
  {y:'2022',m:'May',pnl:43864},{y:'2022',m:'Jun',pnl:17966},{y:'2022',m:'Jul',pnl:18261},
  {y:'2022',m:'Aug',pnl:-5093},{y:'2022',m:'Sep',pnl:5956},{y:'2022',m:'Oct',pnl:-7997},
  {y:'2022',m:'Nov',pnl:4636},{y:'2022',m:'Dec',pnl:19538},
  {y:'2023',m:'Jan',pnl:36186},{y:'2023',m:'Feb',pnl:14950},{y:'2023',m:'Mar',pnl:5547},
  {y:'2023',m:'Apr',pnl:12780},{y:'2023',m:'May',pnl:41599},{y:'2023',m:'Jun',pnl:21796},
  {y:'2023',m:'Jul',pnl:15508},{y:'2023',m:'Aug',pnl:26867},{y:'2023',m:'Sep',pnl:33223},
  {y:'2023',m:'Oct',pnl:1417},{y:'2023',m:'Nov',pnl:37088},{y:'2023',m:'Dec',pnl:26663},
  {y:'2024',m:'Jan',pnl:885},{y:'2024',m:'Feb',pnl:30980},{y:'2024',m:'Mar',pnl:56939},
  {y:'2024',m:'Apr',pnl:17363},{y:'2024',m:'May',pnl:21267},{y:'2024',m:'Jun',pnl:63785},
  {y:'2024',m:'Jul',pnl:55209},{y:'2024',m:'Aug',pnl:26700},{y:'2024',m:'Sep',pnl:97037},
  {y:'2024',m:'Oct',pnl:117000},{y:'2024',m:'Nov',pnl:8860},{y:'2024',m:'Dec',pnl:37962},
  {y:'2025',m:'Jan',pnl:95558},{y:'2025',m:'Feb',pnl:114646},{y:'2025',m:'Mar',pnl:90071},
  {y:'2025',m:'Apr',pnl:63960},{y:'2025',m:'May',pnl:59407},{y:'2025',m:'Jun',pnl:25073},
  {y:'2025',m:'Jul',pnl:27325},{y:'2025',m:'Aug',pnl:34689},{y:'2025',m:'Sep',pnl:47160},
  {y:'2025',m:'Oct',pnl:61507},{y:'2025',m:'Nov',pnl:40104},{y:'2025',m:'Dec',pnl:62798},
  {y:'2026',m:'Jan',pnl:33467},{y:'2026',m:'Feb',pnl:55442},{y:'2026',m:'Mar',pnl:72393},
  {y:'2026',m:'Apr',pnl:26865},{y:'2026',m:'May',pnl:41935}
];

let cumulative = 100000;
const equityPoints = [{x:0, val:100000}];
months.forEach(function (m, i) {
  cumulative += m.pnl;
  equityPoints.push({x: i+1, val: cumulative, label: m.m + ' ' + m.y, pnl: m.pnl});
});

function drawCurve() {
  var svg = document.getElementById('equity-svg');
  if (!svg) return;

  var W = 1100, H = 320;
  var PAD_L = 60, PAD_R = 20, PAD_T = 20, PAD_B = 30;
  var plotW = W - PAD_L - PAD_R;
  var plotH = H - PAD_T - PAD_B;
  var minVal = 80000;
  var maxVal = 2100000;

  function xScale(i) { return PAD_L + (i / (equityPoints.length - 1)) * plotW; }
  function yScale(v) { return PAD_T + plotH - ((v - minVal) / (maxVal - minVal)) * plotH; }

  var pathD = '';
  var areaD = '';
  equityPoints.forEach(function (pt, i) {
    var x = xScale(i), y = yScale(pt.val);
    if (i === 0) {
      pathD += 'M' + x + ',' + y;
      areaD += 'M' + x + ',' + (H - PAD_B) + ' L' + x + ',' + y;
    } else {
      pathD += ' L' + x + ',' + y;
      areaD += ' L' + x + ',' + y;
    }
  });
  var lastX = xScale(equityPoints.length - 1);
  areaD += ' L' + lastX + ',' + (H - PAD_B) + ' Z';

  document.getElementById('curve-line').setAttribute('d', pathD);
  document.getElementById('curve-area').setAttribute('d', areaD);

  var pathEl = document.getElementById('curve-line');
  var len = pathEl.getTotalLength();
  pathEl.style.strokeDasharray = len;
  pathEl.style.strokeDashoffset = len;
  pathEl.style.transition = 'stroke-dashoffset 3s cubic-bezier(0.4,0,0.2,1)';

  var obs = new IntersectionObserver(function (entries) {
    if (entries[0].isIntersecting) {
      pathEl.style.strokeDashoffset = 0;
      obs.disconnect();
    }
  }, { threshold: 0.3 });
  obs.observe(document.getElementById('curve-container'));
}

function buildHeatmap() {
  var grid = document.getElementById('heatmap-grid');
  if (!grid) return;

  var monthsOrder = ['Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec','Jan'];
  var monthLabels = ['Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec','Jan'];
  var years = ['2022','2023','2024','2025','2026'];

  var dataMap = {};
  months.forEach(function (m) { dataMap[m.y + '-' + m.m] = m.pnl; });

  grid.innerHTML = '';
  grid.appendChild(document.createElement('div'));
  monthLabels.forEach(function (ml) {
    var h = document.createElement('div');
    h.className = 'hm-header';
    h.textContent = ml;
    grid.appendChild(h);
  });

  var allPos = months.filter(function (m) { return m.pnl > 0; }).map(function (m) { return m.pnl; });
  var maxPnl = Math.max.apply(null, allPos);

  years.forEach(function (yr) {
    var yl = document.createElement('div');
    yl.className = 'hm-year-label';
    yl.textContent = yr;
    grid.appendChild(yl);

    monthsOrder.forEach(function (mn) {
      var cell = document.createElement('div');
      cell.className = 'hm-cell';
      var key = yr + '-' + mn;
      var val = dataMap[key];

      if (val === undefined) {
        cell.classList.add('empty');
      } else if (val < 0) {
        cell.classList.add('neg');
        cell.textContent = (val / 1000).toFixed(0) + 'k';
      } else {
        cell.classList.add('pos');
        var intensity = Math.ceil((val / maxPnl) * 5);
        cell.dataset.intensity = Math.min(intensity, 5);
        cell.textContent = (val / 1000).toFixed(0) + 'k';
      }

      cell.title = val !== undefined ? mn + ' ' + yr + ': ₹' + val.toLocaleString('en-IN') : 'No data';
      grid.appendChild(cell);
    });
  });
}

document.addEventListener('DOMContentLoaded', function () {
  drawCurve();
  buildHeatmap();
});
