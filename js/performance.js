(function () {

  // ── DATASETS ──────────────────────────────────────────────────────────────

  var DATA = {
    slip: {
      pnl: '₹14.7L', cagr: '89.5%', dd: '11.95%', ddSub: '82d peak→trough',
      sharpe: '5.21', sortino: '13.62', calmar: '7.49', mar: '123.26×',
      pain: '1.92×', rpud: '36.78×', winrate: '49.42%', trades: '2,481',
      finalEquity: 1573239,
      curveTitle: 'How ₹1L became ₹15.7L',
      hmTitle: '44 of 53 months positive',
      hmDesc: '83.0% monthly win rate — with realistic execution slippage applied.',
      ddWorst: '−11.95%', ddWorstNote: '₹40,051 · Aug–Nov 2022',
      ddConsec: '12', ddConsecNote: 'Total loss: ₹26,967 (Jun 2025)',
      ddEpisodes: [
        { rank:'#1', dates:'25 Aug – 15 Nov 2022', pct:'−11.95%', rec:'73d recovery' },
        { rank:'#2', dates:'25 Feb – 25 Mar 2022',  pct:'−10.55%', rec:'17d recovery' },
        { rank:'#3', dates:'14 Feb – 21 Feb 2023',  pct:'−5.45%',  rec:'6d recovery'  }
      ],
      periods: [
        { g:'Years',  t:'5',    n:'0',    pct:'0.0%',   cls:'pos-big', note:'No year ended in loss' },
        { g:'Months', t:'53',   n:'9',    pct:'17.0%',  cls:'',        note:'9 negative months' },
        { g:'Weeks',  t:'231',  n:'67',   pct:'29.0%',  cls:'',        note:'Normal for intraday' },
        { g:'Days',   t:'1086', n:'~430', pct:'~39.6%', cls:'',        note:'Edge compounds at month/year' }
      ],
      years: [
        { yr:'2022', trades:'491',  ret:'223.7%', pnl:'₹2,23,697', winr:'46.4%', bar:31 },
        { yr:'2023', trades:'562',  ret:'335.6%', pnl:'₹3,35,606', winr:'48.0%', bar:46 },
        { yr:'2024', trades:'578',  ret:'382.4%', pnl:'₹3,82,404', winr:'50.0%', bar:53 },
        { yr:'2025', trades:'561',  ret:'311.7%', pnl:'₹3,11,745', winr:'49.9%', bar:43 },
        { yr:'2026', trades:'289',  ret:'219.8%', pnl:'₹2,19,787', winr:'55.0%', bar:30, note:'Jan–Jun' }
      ],
      months: {
        '2022-02':72258,'2022-03':-6209,'2022-04':7160,'2022-05':85544,
        '2022-06':30725,'2022-07':19982,'2022-08':16651,'2022-09':-19966,
        '2022-10':-3376,'2022-11':5040,'2022-12':15888,
        '2023-01':14595,'2023-02':5112,'2023-03':38285,'2023-04':15724,
        '2023-05':9823,'2023-06':32933,'2023-07':22100,'2023-08':54230,
        '2023-09':39067,'2023-10':10788,'2023-11':37757,'2023-12':55191,
        '2024-01':9789,'2024-02':13965,'2024-03':41202,'2024-04':48486,
        '2024-05':22999,'2024-06':53650,'2024-07':31704,'2024-08':34153,
        '2024-09':33648,'2024-10':53407,'2024-11':11487,'2024-12':27913,
        '2025-01':50687,'2025-02':59681,'2025-03':56930,'2025-04':22951,
        '2025-05':19168,'2025-06':-17482,'2025-07':818,'2025-08':2824,
        '2025-09':-6227,'2025-10':36154,'2025-11':29359,'2025-12':56883,
        '2026-01':51402,'2026-02':73149,'2026-03':35598,'2026-04':23503,
        '2026-05':18740,'2026-06':17394
      },
      ratios: [
        { name:'Sharpe Ratio',      val:'5.21',   bench:'>3.0 = world-class',              verdict:'▲ WORLD-CLASS',      bar:100 },
        { name:'Sortino Ratio',     val:'13.62',  bench:'>5.0 = world-class',              verdict:'▲ WORLD-CLASS',      bar:100 },
        { name:'Calmar Ratio',      val:'7.49',   bench:'>5.0 = world-class',              verdict:'▲ WORLD-CLASS',      bar:75  },
        { name:'Max Drawdown',      val:'11.95%', bench:'Peak to trough: 82 days',         verdict:'▲ RECOVERED IN 73D', bar:12  },
        { name:'₹ per ₹1 Max DD',  val:'36.78×', bench:'Return earned per ₹1 of drawdown',verdict:'▲ STRONG',           bar:37  },
        { name:'Win Rate',          val:'49.42%', bench:'Across 2,481 trades',             verdict:'▲ PROFITABLE EDGE',  bar:50  }
      ]
    },

    noslip: {
      pnl: '₹21.2L', cagr: '105.3%', dd: '4.54%', ddSub: '28d peak→trough',
      sharpe: '7.51', sortino: '24.73', calmar: '23.21', mar: '467.21×',
      pain: '2.30×', rpud: '252.81×', winrate: '54.21%', trades: '2,481',
      finalEquity: 2220466,
      curveTitle: 'How ₹1L became ₹22.2L',
      hmTitle: '51 of 53 months positive',
      hmDesc: '96.2% monthly win rate — baseline without slippage. Toggle on to see realistic execution view.',
      ddWorst: '−4.54%', ddWorstNote: '₹8,387 · Feb–Mar 2022',
      ddConsec: '7', ddConsecNote: 'Total loss: ₹15,479 (Jun 2025)',
      ddEpisodes: [
        { rank:'#1', dates:'25 Feb – 25 Mar 2022', pct:'−4.54%', rec:'3d recovery'  },
        { rank:'#2', dates:'14 Feb – 21 Feb 2023', pct:'−3.17%', rec:'2d recovery'  },
        { rank:'#3', dates:'25 Aug – 20 Oct 2022', pct:'−3.11%', rec:'28d recovery' }
      ],
      periods: [
        { g:'Years',  t:'5',    n:'0',    pct:'0.0%',   cls:'pos-big', note:'No year ended in loss' },
        { g:'Months', t:'53',   n:'2',    pct:'3.8%',   cls:'pos-big', note:'Both in 2022' },
        { g:'Weeks',  t:'231',  n:'56',   pct:'24.2%',  cls:'',        note:'Normal for intraday' },
        { g:'Days',   t:'1086', n:'~370', pct:'~34.1%', cls:'',        note:'Edge compounds at month/year' }
      ],
      years: [
        { yr:'2022', trades:'491', ret:'359.8%', pnl:'₹3,59,829', winr:'54.2%', bar:50 },
        { yr:'2023', trades:'562', ret:'484.7%', pnl:'₹4,84,679', winr:'51.8%', bar:67 },
        { yr:'2024', trades:'578', ret:'529.9%', pnl:'₹5,29,899', winr:'54.0%', bar:73 },
        { yr:'2025', trades:'561', ret:'453.2%', pnl:'₹4,53,163', winr:'53.7%', bar:63 },
        { yr:'2026', trades:'289', ret:'292.9%', pnl:'₹2,92,896', winr:'60.6%', bar:41, note:'Jan–Jun' }
      ],
      months: {
        '2022-02':83826,'2022-03':6071,'2022-04':18957,'2022-05':98450,
        '2022-06':43599,'2022-07':33023,'2022-08':30514,'2022-09':-5645,
        '2022-10':6697,'2022-11':15857,'2022-12':28480,
        '2023-01':26220,'2023-02':16849,'2023-03':51315,'2023-04':25842,
        '2023-05':23043,'2023-06':46573,'2023-07':35289,'2023-08':68115,
        '2023-09':52071,'2023-10':22769,'2023-11':48532,'2023-12':68060,
        '2024-01':24044,'2024-02':27798,'2024-03':52427,'2024-04':60648,
        '2024-05':37354,'2024-06':65286,'2024-07':44434,'2024-08':47131,
        '2024-09':45797,'2024-10':64196,'2024-11':20827,'2024-12':39957,
        '2025-01':61895,'2025-02':71443,'2025-03':67804,'2025-04':33901,
        '2025-05':29139,'2025-06':-4452,'2025-07':14752,'2025-08':13907,
        '2025-09':5541,'2025-10':47776,'2025-11':41969,'2025-12':69487,
        '2026-01':64546,'2026-02':85000,'2026-03':47602,'2026-04':34891,
        '2026-05':30639,'2026-06':30217
      },
      ratios: [
        { name:'Sharpe Ratio',      val:'7.51',    bench:'>3.0 = world-class',              verdict:'▲ WORLD-CLASS',      bar:100 },
        { name:'Sortino Ratio',     val:'24.73',   bench:'>5.0 = world-class',              verdict:'▲ WORLD-CLASS',      bar:100 },
        { name:'Calmar Ratio',      val:'23.21',   bench:'>5.0 = world-class',              verdict:'▲ WORLD-CLASS',      bar:100 },
        { name:'Max Drawdown',      val:'4.54%',   bench:'Peak to trough: 28 days',         verdict:'▲ RECOVERED IN 3D',  bar:5   },
        { name:'₹ per ₹1 Max DD',  val:'252.81×', bench:'Return earned per ₹1 of drawdown',verdict:'▲ EXCEPTIONAL',      bar:100 },
        { name:'Win Rate',          val:'54.21%',  bench:'Across 2,481 trades',             verdict:'▲ CONSISTENT EDGE',  bar:54  }
      ]
    }
  };

  // ── STATE ──────────────────────────────────────────────────────────────────
  var withSlip = true;

  function current() { return withSlip ? DATA.slip : DATA.noslip; }

  // ── RENDER HELPERS ─────────────────────────────────────────────────────────

  function setText(id, val) {
    var el = document.getElementById(id);
    if (el) el.textContent = val;
  }

  function renderHeroStats(d) {
    setText('s-pnl',    d.pnl);
    setText('s-cagr',   d.cagr);
    setText('s-dd',     d.dd);
    setText('s-dd-sub', d.ddSub);
    setText('s-sharpe', d.sharpe);
  }

  function renderYears(d) {
    var grid = document.getElementById('year-grid');
    if (!grid) return;
    grid.innerHTML = '';
    d.years.forEach(function (y) {
      var card = document.createElement('div');
      card.className = 'year-card';
      var label = y.yr + ' · ' + y.trades + ' trades' + (y.note ? ' (' + y.note + ')' : '');
      card.innerHTML =
        '<div class="year-label">' + label + '</div>' +
        '<div class="year-return">' + y.ret + '</div>' +
        '<div class="year-pnl">' + y.pnl + '</div>' +
        '<div class="year-bar-track"><div class="year-bar-fill" style="width:0%" data-w="' + y.bar + '"></div></div>' +
        '<div class="year-meta"><span>Win rate ' + y.winr + '</span></div>';
      grid.appendChild(card);
    });
    // animate bars
    setTimeout(function () {
      grid.querySelectorAll('.year-bar-fill[data-w]').forEach(function (bar) {
        bar.style.transition = 'width 1.2s cubic-bezier(0.4,0,0.2,1)';
        bar.style.width = bar.dataset.w + '%';
      });
    }, 100);
  }

  function renderHeatmap(d) {
    var grid = document.getElementById('heatmap-grid');
    if (!grid) return;
    grid.innerHTML = '';
    var monthOrder = ['Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec','Jan'];
    var years = ['2022','2023','2024','2025','2026'];

    // headers
    var corner = document.createElement('div');
    grid.appendChild(corner);
    monthOrder.forEach(function (ml) {
      var h = document.createElement('div');
      h.className = 'hm-header';
      h.textContent = ml;
      grid.appendChild(h);
    });

    var allPos = Object.values(d.months).filter(function (v) { return v > 0; });
    var maxPnl = Math.max.apply(null, allPos);

    years.forEach(function (yr) {
      var yl = document.createElement('div');
      yl.className = 'hm-year-label';
      yl.textContent = yr;
      grid.appendChild(yl);

      monthOrder.forEach(function (mn) {
        var monthNum = { Feb:'02',Mar:'03',Apr:'04',May:'05',Jun:'06',Jul:'07',
          Aug:'08',Sep:'09',Oct:'10',Nov:'11',Dec:'12',Jan:'01' }[mn];
        var dataYr = mn === 'Jan' ? String(parseInt(yr)+1) : yr;
        var key = dataYr + '-' + monthNum;
        var val = d.months[key];
        var cell = document.createElement('div');
        cell.className = 'hm-cell';

        if (val === undefined) {
          cell.classList.add('empty');
        } else if (val < 0) {
          cell.classList.add('neg');
          cell.textContent = Math.round(val/1000) + 'k';
        } else {
          cell.classList.add('pos');
          var intensity = Math.min(Math.ceil((val/maxPnl)*5), 5);
          cell.dataset.intensity = intensity;
          cell.textContent = Math.round(val/1000) + 'k';
        }
        cell.title = val !== undefined
          ? key + ': ₹' + Math.round(val).toLocaleString('en-IN')
          : 'No data';
        grid.appendChild(cell);
      });
    });

    setText('hm-title', d.hmTitle);
    setText('hm-desc', d.hmDesc);
  }

  function renderRatios(d) {
    var grid = document.getElementById('ratios-grid');
    if (!grid) return;
    grid.innerHTML = '';
    d.ratios.forEach(function (r) {
      var cell = document.createElement('div');
      cell.className = 'ratio-cell';
      cell.innerHTML =
        '<div class="ratio-name">' + r.name + '</div>' +
        '<div class="ratio-value">' + r.val + '</div>' +
        '<div class="ratio-benchmark">' + r.bench + '</div>' +
        '<div class="ratio-verdict">' + r.verdict + '</div>' +
        '<div class="ratio-bar-track"><div class="ratio-bar-fill" style="width:0%" data-w="' + r.bar + '"></div></div>';
      grid.appendChild(cell);
    });
    setTimeout(function () {
      grid.querySelectorAll('.ratio-bar-fill[data-w]').forEach(function (bar) {
        bar.style.transition = 'width 1.5s cubic-bezier(0.4,0,0.2,1)';
        bar.style.width = bar.dataset.w + '%';
      });
    }, 100);
  }

  function renderDrawdown(d) {
    var ddGrid = document.getElementById('dd-grid');
    if (ddGrid) {
      ddGrid.innerHTML =
        '<div class="dd-big">' +
          '<div>' +
            '<div class="dd-big-label">Worst single drawdown</div>' +
            '<div class="dd-big-value">' + d.ddWorst + '</div>' +
            '<div class="dd-big-note">' + d.ddWorstNote + '</div>' +
          '</div>' +
          '<div style="margin-top:24px">' +
            '<div class="dd-big-label">Max consecutive losing days</div>' +
            '<div class="dd-big-value" style="font-size:40px">' + d.ddConsec + '</div>' +
            '<div class="dd-big-note">' + d.ddConsecNote + '</div>' +
          '</div>' +
        '</div>' +
        '<div class="dd-episodes">' +
          '<div class="dd-ep-title">Top 3 Drawdown Episodes</div>' +
          d.ddEpisodes.map(function (ep) {
            return '<div class="dd-ep-row">' +
              '<div class="dd-ep-rank">' + ep.rank + '</div>' +
              '<div class="dd-ep-dates">' + ep.dates + '</div>' +
              '<div class="dd-ep-pct">' + ep.pct + '</div>' +
              '<div class="dd-ep-recovery">' + ep.rec + '</div>' +
            '</div>';
          }).join('') +
        '</div>';
    }

    var tbody = document.getElementById('period-tbody');
    if (tbody) {
      tbody.innerHTML = d.periods.map(function (p) {
        return '<tr>' +
          '<td>' + p.g + '</td>' +
          '<td>' + p.t + '</td>' +
          '<td>' + p.n + '</td>' +
          '<td class="' + p.cls + '">' + p.pct + '</td>' +
          '<td style="color:var(--text2);font-size:12px">' + p.note + '</td>' +
        '</tr>';
      }).join('');
    }
  }

  // ── EQUITY CURVE ───────────────────────────────────────────────────────────

  var curveDrawn = false;

  function buildEquityPoints(d) {
    var monthKeys = Object.keys(d.months).sort();
    var cum = 100000;
    var pts = [{ val: cum }];
    monthKeys.forEach(function (k) {
      cum += d.months[k];
      pts.push({ val: cum, label: k });
    });
    return pts;
  }

  function drawCurve(d, animate) {
    var pts = buildEquityPoints(d);
    var W = 1100, H = 310;
    var PAD_L = 60, PAD_R = 20, PAD_T = 20, PAD_B = 30;
    var plotW = W - PAD_L - PAD_R;
    var plotH = H - PAD_T - PAD_B;

    var maxVal = d.finalEquity * 1.05;
    var minVal = 50000;

    var xScale = function (i) { return PAD_L + (i / (pts.length - 1)) * plotW; };
    var yScale = function (v) { return PAD_T + plotH - ((v - minVal) / (maxVal - minVal)) * plotH; };

    var pathD = '', areaD = '';
    pts.forEach(function (pt, i) {
      var x = xScale(i), y = yScale(pt.val);
      if (i === 0) { pathD += 'M' + x + ',' + y; areaD += 'M' + x + ',' + (H - PAD_B) + ' L' + x + ',' + y; }
      else { pathD += ' L' + x + ',' + y; areaD += ' L' + x + ',' + y; }
    });
    areaD += ' L' + xScale(pts.length - 1) + ',' + (H - PAD_B) + ' Z';

    var linePath = document.getElementById('curve-line');
    var areaPath = document.getElementById('curve-area');
    if (!linePath || !areaPath) return;

    linePath.setAttribute('d', pathD);
    areaPath.setAttribute('d', areaD);

    // Y axis labels
    var step = (maxVal - minVal) / 5;
    for (var i = 1; i <= 5; i++) {
      var labelEl = document.getElementById('ya' + i);
      if (labelEl) {
        var rupees = Math.round((minVal + step * (5 - i + 1)) / 100000);
        labelEl.textContent = '₹' + rupees + 'L';
      }
    }

    setText('curve-title', d.curveTitle);

    if (animate) {
      var len = linePath.getTotalLength();
      linePath.style.strokeDasharray = len;
      linePath.style.strokeDashoffset = len;
      linePath.style.transition = 'none';
      setTimeout(function () {
        linePath.style.transition = 'stroke-dashoffset 2.5s cubic-bezier(0.4,0,0.2,1)';
        linePath.style.strokeDashoffset = 0;
      }, 50);
    } else {
      linePath.style.strokeDasharray = '';
      linePath.style.strokeDashoffset = '';
      linePath.style.transition = 'none';
    }
  }

  // ── TOGGLE LOGIC ───────────────────────────────────────────────────────────

  function updateToggleUI() {
    var lblOn  = document.getElementById('lbl-on');
    var lblOff = document.getElementById('lbl-off');
    var desc   = document.getElementById('toggle-desc');
    var costBar = document.getElementById('slip-cost-bar');

    if (lblOn)  lblOn.classList.toggle('active', withSlip);
    if (lblOff) lblOff.classList.toggle('active', !withSlip);

    if (desc) {
      desc.textContent = withSlip
        ? 'Showing: with slippage (5.81 bps per order · realistic execution)'
        : 'Showing: without slippage (theoretical baseline · reference prices)';
    }
    if (costBar) {
      costBar.style.display = withSlip ? '' : 'none';
    }
  }

  function renderAll(animate) {
    var d = current();
    renderHeroStats(d);
    renderYears(d);
    renderHeatmap(d);
    renderRatios(d);
    renderDrawdown(d);
    drawCurve(d, animate);
    updateToggleUI();
  }

  // ── SCROLL ANIMATION FOR CURVE ─────────────────────────────────────────────

  function initCurveObserver() {
    var container = document.getElementById('curve-container');
    if (!container) return;
    var obs = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting && !curveDrawn) {
        curveDrawn = true;
        drawCurve(current(), true);
        obs.disconnect();
      }
    }, { threshold: 0.3 });
    obs.observe(container);
  }

  // ── INIT ───────────────────────────────────────────────────────────────────

  document.addEventListener('DOMContentLoaded', function () {
    renderAll(false);
    initCurveObserver();

    var toggle = document.getElementById('slip-toggle');
    if (toggle) {
      toggle.addEventListener('change', function () {
        withSlip = !this.checked;
        renderAll(false);
        drawCurve(current(), true);
      });
    }
  });

})();
