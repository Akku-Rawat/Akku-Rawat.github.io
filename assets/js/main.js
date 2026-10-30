(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = id => document.getElementById(id);
  const rng = s => () => (s = (s * 16807) % 2147483647) / 2147483647;
  const watch = (el, cb) => { if (!('IntersectionObserver' in window)) return cb(true); new IntersectionObserver(es => es.forEach(e => cb(e.isIntersecting)), { rootMargin: '60px' }).observe(el); };
  const BY = [[0, 8, 2, 10], [12, 4, 14, 6], [3, 11, 1, 9], [15, 7, 13, 5]];
  const hex = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));
  const mk = (w, h) => { const c = document.createElement('canvas'); c.width = w; c.height = h; return c; };
  const PX = ctx => {
    const R = Math.round;
    return {
      r: (x, y, w, h, c) => { ctx.fillStyle = c; ctx.fillRect(R(x), R(y), w, h); },
      p: (x, y, c) => { ctx.fillStyle = c; ctx.fillRect(R(x), R(y), 1, 1); },
      circ: (cx, cy, rad, c) => { ctx.fillStyle = c; const X = R(cx), Y = R(cy); for (let y = -rad; y <= rad; y++) { const h = Math.floor(Math.sqrt((rad + .5) ** 2 - y * y)); ctx.fillRect(X - h, Y + y, h * 2 + 1, 1); } },
      line: (x0, y0, x1, y1, c, dash = 0) => { const n = Math.max(Math.abs(x1 - x0), Math.abs(y1 - y0)) || 1; ctx.fillStyle = c; for (let i = 0; i <= n; i++) { if (dash && i % dash >= dash - 1) continue; ctx.fillRect(R(x0 + (x1 - x0) * i / n), R(y0 + (y1 - y0) * i / n), 1, 1); } },
    };
  };

  // pixels drawn k times bigger than the scene's, anchored at scene point (ax, ay); B is the canvas upscale
  const PXA = (ctx, B, k, ax, ay) => {
    const R = Math.round, s = B * k, X = x => ax * B + (R(x) - ax) * s, Y = y => ay * B + (R(y) - ay) * s;
    return {
      r: (x, y, w, h, c) => { ctx.fillStyle = c; ctx.fillRect(X(x), Y(y), w * s, h * s); },
      p: (x, y, c) => { ctx.fillStyle = c; ctx.fillRect(X(x), Y(y), s, s); },
    };
  };

  const now = new Date();

  const dlgText = $('dlgText');
  const typing = !reduce && matchMedia('(min-width: 721px)').matches;
  let typer, dlgFull = dlgText.textContent;
  const dialogSay = txt => {
    dlgFull = txt; clearInterval(typer);
    if (!typing) { dlgText.textContent = txt; return; }
    // the untyped rest stays in the layout, hidden, so the card keeps its final height while typing
    const shown = document.createTextNode(''), rest = document.createElement('span'); rest.style.visibility = 'hidden';
    let i = 0; dlgText.replaceChildren(shown, rest); rest.textContent = txt;
    typer = setInterval(() => { i += 2; shown.data = txt.slice(0, i); rest.textContent = txt.slice(i); if (i >= txt.length) { clearInterval(typer); dlgText.textContent = txt; } }, 22);
  };
  if (matchMedia('(max-width: 720px)').matches) document.querySelectorAll('details.did').forEach(d => { d.open = false; });
  dlgText.addEventListener('click', () => { clearInterval(typer); dlgText.textContent = dlgFull; });

  const bank = (bg, acc) => [bg, P => { for (let y = 0; y < 4; y++) P.r(10 - y * 2, 3 + y, y * 4 + 1, 1, '#C9C2E6'); P.p(10, 5, acc); P.r(3, 7, 15, 1, '#8D86B0'); [5, 8, 11, 14].forEach(x => P.r(x, 9, 2, 6, '#EFE6D8')); P.r(3, 15, 15, 2, '#8D86B0'); P.r(3, 15, 15, 1, '#C9C2E6'); }];
  const ICONS = {
    lending: ['#22304A', P => { P.r(5, 2, 10, 15, '#EFE6D8'); [[12, 2], [13, 2], [14, 2], [13, 3], [14, 3], [14, 4]].forEach(([x, y]) => P.p(x, y, '#22304A')); P.r(12, 3, 1, 2, '#C9BFA0'); P.r(13, 4, 1, 1, '#C9BFA0'); P.r(7, 5, 4, 1, '#8D86B0'); P.r(7, 7, 6, 1, '#8D86B0'); P.r(7, 9, 5, 1, '#8D86B0'); [[7, 13], [8, 12], [9, 13], [10, 12], [11, 13]].forEach(([x, y]) => P.p(x, y, '#3E5A8A')); P.circ(14, 15, 3, '#5FA36A'); [[13, 15], [14, 16], [15, 15], [16, 14]].forEach(([x, y]) => P.p(x, y, '#EFE6D8')); }],
    zra: ['#3A2E22', P => { P.r(5, 2, 10, 15, '#EFE6D8'); for (let i = 0; i < 5; i++) P.p(5 + i * 2, 17, '#EFE6D8'); P.r(7, 5, 6, 1, '#8D86B0'); P.r(7, 7, 4, 1, '#8D86B0'); P.r(7, 9, 6, 1, '#8D86B0'); P.r(7, 12, 5, 1, '#5B4F5E'); P.circ(14, 14, 3, '#EDBE6C'); [[14, 13], [13, 14], [14, 14], [15, 14], [14, 15]].forEach(([x, y]) => P.p(x, y, '#B8862E')); P.p(13, 18, '#E0566E'); P.p(15, 18, '#E0566E'); }],
    recon: ['#1F3A3A', P => { P.r(2, 4, 7, 12, '#7FB2C9'); P.r(11, 4, 7, 12, '#7FB2C9'); P.r(2, 4, 1, 12, '#4E7F9A'); P.r(17, 4, 1, 12, '#4E7F9A'); [7, 10, 13].forEach(y => { P.r(4, y, 4, 1, '#EFE6D8'); P.r(12, y, 4, 1, '#EFE6D8'); }); P.r(9, 8, 2, 1, '#EDBE6C'); P.r(9, 10, 2, 1, '#EDBE6C'); [[7, 17], [8, 18], [9, 17], [10, 16], [11, 15]].forEach(([x, y]) => P.p(x, y, '#5FA36A')); }],
    tazama: ['#2E2443', P => { for (let y = 3; y <= 16; y++) { const w = y < 10 ? 6 : Math.max(0, 6 - (y - 9)); if (w > 0) P.r(10 - w, y, w * 2, 1, y === 3 ? '#B9A0F0' : '#9C7BE0'); } P.r(9, 6, 2, 6, '#EFE6D8'); P.r(9, 13, 2, 2, '#EFE6D8'); }],
    signboard: ['#1F2E2A', P => { P.r(3, 3, 14, 1, '#8A6A4A'); [[6, 4], [6, 5], [14, 4], [14, 5]].forEach(([x, y]) => P.p(x, y, '#C9C2E6')); P.r(4, 6, 12, 8, '#EDBE6C'); P.r(4, 6, 12, 1, '#FFE09A'); P.r(6, 9, 8, 1, '#5A4A2E'); P.r(6, 11, 5, 1, '#5A4A2E'); P.circ(15, 16, 2, '#5FA36A'); P.p(15, 16, '#EFE6D8'); }],
    creddex: ['#353020', P => { P.circ(6, 10, 4, '#EDBE6C'); P.circ(6, 10, 2, '#353020'); P.r(9, 9, 9, 3, '#EDBE6C'); P.r(9, 9, 9, 1, '#FFE09A'); P.r(14, 12, 2, 3, '#EDBE6C'); P.r(17, 12, 1, 2, '#EDBE6C'); }],
    'sk-lang': ['#1F2E3A', P => { [[6, 6], [5, 7], [4, 8], [3, 9], [4, 10], [5, 11], [6, 12]].forEach(([x, y]) => P.p(x, y, '#7FD1B9')); P.line(11, 5, 8, 14, '#EDBE6C'); [[13, 6], [14, 7], [15, 8], [16, 9], [15, 10], [14, 11], [13, 12]].forEach(([x, y]) => P.p(x, y, '#7FD1B9')); }],
    'sk-front': ['#2A2238', P => { P.r(3, 4, 14, 12, '#C9C2E6'); P.r(3, 4, 14, 2, '#8D86B0'); P.p(4, 5, '#E0566E'); P.p(6, 5, '#EDBE6C'); P.p(8, 5, '#7FD1B9'); P.r(5, 8, 6, 1, '#5D5396'); P.r(5, 10, 9, 1, '#5D5396'); P.r(5, 12, 4, 2, '#7FB2C9'); P.r(11, 12, 4, 2, '#EBA3AE'); }],
    'sk-back': ['#1D2433', P => { for (let i = 0; i < 3; i++) { P.r(4, 3 + i * 5, 12, 4, '#5D5396'); P.r(4, 3 + i * 5, 12, 1, '#7C74B8'); P.p(6, 5 + i * 5, '#7FD1B9'); P.p(8, 5 + i * 5, '#EDBE6C'); P.r(11, 5 + i * 5, 4, 1, '#3E3770'); } }],
    'sk-db': ['#1D2433', P => { P.r(4, 5, 12, 11, '#5D5396'); P.r(5, 3, 10, 1, '#9C94D8'); P.r(4, 4, 12, 2, '#7C74B8'); P.r(5, 16, 10, 1, '#3E3770'); P.r(4, 9, 12, 1, '#3E3770'); P.r(4, 13, 12, 1, '#3E3770'); P.p(13, 7, '#7FD1B9'); P.p(13, 11, '#EDBE6C'); P.p(13, 15, '#7FD1B9'); }],
    lms: ['#1F2A3A', P => { P.r(3, 5, 14, 12, '#EFE6D8'); P.r(3, 5, 14, 3, '#7FB2C9'); P.r(6, 3, 1, 3, '#8D86B0'); P.r(13, 3, 1, 3, '#8D86B0'); for (let r = 0; r < 3; r++) for (let c = 0; c < 4; c++) P.r(5 + c * 3, 10 + r * 2, 2, 1, r * 4 + c < 6 ? '#5FA36A' : '#8D86B0'); P.circ(15, 15, 3, '#EDBE6C'); P.r(15, 14, 1, 3, '#B8862E'); }],
    hrms: ['#2A2238', P => { P.r(4, 4, 12, 14, '#C9C2E6'); P.r(4, 4, 12, 3, '#8D86B0'); P.r(8, 2, 4, 3, '#5D5396'); P.r(9, 3, 2, 1, '#2A2238'); P.circ(10, 9, 2, '#E0B07A'); P.r(7, 12, 7, 3, '#7FD1B9'); P.r(6, 16, 9, 1, '#8D86B0'); }],
    mojaloop: ['#1D2A33', P => { P.line(5, 6, 15, 6, '#4E7F9A'); P.line(5, 6, 10, 15, '#4E7F9A'); P.line(15, 6, 10, 15, '#4E7F9A'); P.circ(5, 6, 2, '#7FD1B9'); P.circ(15, 6, 2, '#EDBE6C'); P.circ(10, 15, 2, '#29ADFF'); P.r(9, 5, 2, 2, '#EFE6D8'); P.p(7, 10, '#EFE6D8'); P.p(13, 10, '#EFE6D8'); }],
    'bank-sa': bank('#2A2418', '#EDBE6C'),
    'bank-gh': bank('#1A2A20', '#5FA36A'),
    'job-now': ['#2A2418', P => { const ring = []; for (let a = 0; a < 360; a += 6) { const t = a * Math.PI / 180; ring.push([Math.round(10 + Math.cos(t) * 8.5), Math.round(10 + Math.sin(t) * 2.4 - Math.cos(t) * 1.6), Math.sin(t) > 0]); } ring.filter(q => !q[2]).forEach(([x, y]) => P.p(x, y, '#9A7430')); P.circ(10, 10, 5, '#EDBE6C'); P.r(7, 7, 2, 2, '#FFE09A'); P.r(11, 13, 3, 1, '#C98A3B'); ring.filter(q => q[2]).forEach(([x, y]) => P.p(x, y, '#F1E9D2')); P.p(3, 3, '#F1E9D2'); P.p(17, 17, '#C9C2E6'); }],
    edu: ['#1F2A3A', P => { [[9, 2], [7, 6], [5, 10], [3, 14], [5, 10], [7, 6]].forEach(([x, w], i) => P.r(x, 5 + i, w, 1, i < 4 ? '#C9C2E6' : '#8D86B0')); P.r(6, 11, 9, 3, '#5D5396'); P.r(6, 11, 9, 1, '#7C74B8'); P.r(16, 8, 1, 6, '#EDBE6C'); P.r(15, 14, 3, 2, '#EDBE6C'); }],
    'job-past': ['#16242A', P => { P.circ(9, 11, 6, '#5FB8A8'); P.r(6, 8, 2, 2, '#9FE3D2'); P.r(9, 15, 4, 1, '#3E8C80'); P.r(4, 12, 2, 1, '#3E8C80'); P.r(11, 9, 3, 1, '#4FA595'); P.circ(16, 4, 1, '#C9C2E6'); P.p(3, 3, '#F1E9D2'); }]
  };
  document.querySelectorAll('canvas[data-ico]').forEach(c => { const [bg, fn] = ICONS[c.dataset.ico]; c.width = 20; c.height = 20; const P = PX(c.getContext('2d')); P.r(0, 0, 20, 20, bg); fn(P); });

  const drawMailbox = theme => {
    const c = $('mailbox'); c.width = 48; c.height = 36; const P = PX(c.getContext('2d')), night = theme !== 'light';
    if (night) {
      P.r(0, 0, 48, 36, '#16142A');
      for (let t = 0; t < Math.PI * 3; t += .16) P.p(28 + Math.cos(t) * (1 + t * 1.3), 8 + Math.sin(t) * (1 + t * 1.3) * .6, '#26306A');
      [[5, 4], [14, 9], [30, 3], [41, 7], [24, 12], [44, 17], [3, 15]].forEach(([x, y], i) => P.p(x, y, i % 3 ? '#C9C4DA' : '#EDBE6C'));
      for (let y = -3; y <= 3; y++) for (let x = -3; x <= 3; x++) if (x * x + y * y <= 10 && (x - 1) ** 2 + (y + 1) ** 2 > 6) P.p(43 + x, 14 + y, '#F1E9D2');
      P.r(0, 30, 48, 6, '#15122A'); P.r(0, 30, 48, 1, '#252240'); [[4, 29], [9, 29], [30, 29], [43, 29]].forEach(([x, y]) => P.p(x, y, '#252240'));
    } else {
      ['#9DBCE2', '#B5CBE7', '#D4DAE4', '#EFE3D4', '#F6D6B4', '#F3C197'].forEach((col, i) => P.r(0, i * 5, 48, 5, col));
      for (let y = -4; y <= 4; y++) for (let x = -4; x <= 4; x++) { const dd = Math.hypot(x, y); if (dd <= 4.4) P.p(41 + x, 12 + y, dd > 3.2 ? '#FFDF8F' : '#FFF4D1'); }
      for (let x = 0; x < 48; x++) { const y = Math.round(26 - 4 * bump(x, 8, 9) - 3 * bump(x, 38, 7)); P.r(x, y, 1, 30 - y, '#C7B4CC'); if (y < 24) P.p(x, y, '#FFF8F0'); }
      [[5, 6], [9, 4]].forEach(([x, y]) => { P.p(x, y, '#4A4560'); P.p(x - 1, y - 1, '#4A4560'); P.p(x + 1, y - 1, '#4A4560'); });
      P.r(0, 30, 48, 6, '#7F6E8D'); P.r(0, 30, 48, 1, '#8F7E9C'); [[4, 29], [9, 29], [30, 29], [43, 29]].forEach(([x, y]) => P.p(x, y, '#5F7469'));
    }
    P.r(21, 19, 3, 11, '#5E3F2E');
    P.r(12, 9, 22, 11, '#5D5396'); P.r(13, 8, 20, 1, '#7C74B8'); P.r(12, 9, 22, 1, '#7C74B8'); P.r(12, 19, 22, 1, '#3E3770');
    P.r(9, 11, 3, 8, '#4A4380');
    P.r(14, 11, 9, 6, '#F1E9D2'); P.r(14, 11, 9, 1, '#D8CFB8'); P.p(18, 14, '#E0566E');
    P.r(34, 4, 1, 9, '#8D86B0'); P.r(35, 4, 5, 3, '#E0566E');
    if (night) { P.p(41, 24, '#E8FF7A'); P.p(6, 22, '#E8FF7A'); }
  };

  const bump = (x, c, w) => Math.exp(-(((x - c) / w) ** 2));
  const hash = n => { const x = Math.sin(n * 12.9898) * 43758.5453; return x - Math.floor(x); };
  const SPAL = {
    night: { sky: ['#0A0916', '#0C0D20', '#111129', '#171632', '#1F1C3D', '#2A2550'],
      r0: '#2C2854', r0Hi: '#3A3566', r1: '#24204A', r1Hi: '#2F2A5A', r2: '#1C1939', r2Hi: '#28234D', r3: '#17152F', r3Hi: '#221E40', ground: '#13112A', groundHi: '#1C1936', near: '#0F0D20', nearHi: '#1C1934',
      snow: '#9C97C6', snowHi: '#C3BEE6', snowSh: '#6F6AA0', forest: '#0F1622', forestHi: '#18212F',
      water: '#1A2152', water2: '#212A62', waterDeep: '#11152F', waterHi: '#3D4A94', shore: '#2A2F66', refl: '#F1E9D2', refl2: '#C9C2E6', page: '#14131E',
      tree: '#0A1216', treeHi: '#14222A', house: '#2A2648', roof: '#3E3966', win: '#FFCF6B', glow1: '#4A2E2C', glow2: '#2B1D27' },
    morning: { sky: ['#9DBCE2', '#B5CBE7', '#D4DAE4', '#EFE3D4', '#F6D6B4', '#F3C197'],
      r0: '#DCCDDA', r0Hi: '#E8DAE4', r1: '#C7B4CC', r1Hi: '#D4C2D8', r2: '#AE9BBA', r2Hi: '#BEABC8', r3: '#93819F', r3Hi: '#A592AF', ground: '#7F6E8D', groundHi: '#8F7E9C', near: '#5A4A69', nearHi: '#706083',
      snow: '#FFF8F0', snowHi: '#FFFFFF', snowSh: '#EADBE3', forest: '#5F7469', forestHi: '#728679',
      water: '#93BBD6', water2: '#A7CBE1', waterDeep: '#7FA2BF', waterHi: '#D9EBF4', shore: '#B9D3E2', refl: '#FFFFFF', refl2: '#FFF1CF', page: '#F6F1E6', mist: '#F8F0E6',
      tree: '#3D4D47', treeHi: '#53655C', house: '#EFE6DA', roof: '#7A6A88', win: '#8E7FA0' }
  };
  const CH = {
    night: { hair: '#2A1E24', skin: '#C98E62', skinLit: '#E7AE7C', screenLit: '#A9CDEB', hood: '#5D5396', hoodLit: '#8A7BC4', hoodDark: '#433B78', pants: '#2E2A44', shoe: '#17151F', band: '#3A3550', cup: '#EDBE6C', rock: '#3A3550', rockHi: '#4E4870', lid: '#B7B0D6', screen: '#8FD3FF', notes: ['#7FD1B9', '#EDBE6C'] },
    morning: { hair: '#2A1E24', skin: '#C98E62', skinLit: '#D9A072', screenLit: '#D9A072', hood: '#5D5396', hoodLit: '#7366AE', hoodDark: '#463E7A', pants: '#3A3554', shoe: '#22202E', band: '#3A3550', cup: '#E9AE45', rock: '#7F7290', rockHi: '#978AA6', lid: '#D6CFE6', screen: '#CFE6F5', notes: ['#2E8A74', '#B07A1F'] }
  };
  const SCENE = {
    d: { w: 320, h: 150, title: [155, 95], stars: 85, horizon: 96, moon: [300, 18, 8], galaxy: [190, 34, .75], planet: [236, 26, .85], halos: [[214, 12], [160, 22], [262, 46]], birds: [[176, 48], [188, 43], [200, 50]],
      layers: [{ base: 88, peaks: [[180, 24, 16], [214, 36, 15], [246, 30, 18], [60, 4, 30]], a: .7, k: .22, ph: .9, c: 'r0', snow: 68 },
               { base: 96, peaks: [[150, 10, 22], [230, 14, 24], [290, 20, 20], [50, 5, 30]], a: .8, k: .17, ph: 1.9, c: 'r1', forest: [[150, 320, .5]] },
               { base: 102, peaks: [[262, 24, 16], [120, 7, 24], [195, 9, 20]], a: .7, k: .14, ph: 2.9, c: 'r2', forest: [[100, 240, .6]] },
               { base: 108, peaks: [[90, 7, 24], [170, 6, 20]], a: .5, k: .12, ph: .7, c: 'r3', terraces: [70, 120], houses: [84, 96], forest: [[140, 230, .6]] },
               { base: 112, peaks: [], a: .4, k: .08, ph: 1.5, c: 'ground' }],
      obs: { x: 262, layer: 2, s: 1 }, river: { y0: 120, amp: 4, k: .025, ph: 1.6, hw: 4.4 },
      near: x => 129 - 4 * bump(x, 205, 30) + Math.sin(x * .07), fire: 196, cdx: 18, k: 1.25, trees: [[280, 20], [292, 36], [306, 46], [318, 32]], mist: [113, 125] },
    m: { w: 125, h: 136, title: [125, 60], stars: 30, horizon: 98, moon: [20, 70, 5], galaxy: null, planet: [50, 70, .45], halos: [[10, 84], [70, 62]], birds: [[40, 80], [50, 76]],
      layers: [{ base: 92, peaks: [[70, 24, 12], [98, 20, 12]], a: .5, k: .25, ph: .9, c: 'r0', snow: 78 },
               { base: 102, peaks: [[30, 6, 14], [110, 10, 12]], a: .5, k: .2, ph: 1.9, c: 'r1', forest: [[40, 125, .5]] },
               { base: 107, peaks: [[86, 14, 10]], a: .5, k: .2, ph: 2.6, c: 'r2', forest: [[10, 70, .6]] },
               { base: 112, peaks: [[40, 5, 14]], a: .4, k: .2, ph: .6, c: 'r3', terraces: [20, 56], houses: [34] },
               { base: 115, peaks: [], a: .3, k: .1, ph: 1, c: 'ground' }],
      obs: { x: 86, layer: 2, s: .75 }, river: { y0: 121, amp: 1.5, k: .05, ph: 1.3, hw: 3 },
      near: x => 131 - 3 * bump(x, 62, 16) + .8 * Math.sin(x * .1), fire: 54, cdx: 14, k: 1, trees: [[100, 14], [111, 24], [122, 30]], mist: [115, 125] }
  };
  const ridgeFn = ly => x => ly.base - ly.peaks.reduce((s, [px, h, w]) => s + h * bump(x, px, w), 0) + ly.a * Math.sin(x * ly.k + ly.ph) + .5 * ly.a * Math.sin(x * ly.k * 2.7 + ly.ph * 3);

  const drawObs = (P, x, y, s, mode) => {
    const R = Math.round(7 * s), bw = Math.round(15 * s), bh = Math.round(7 * s), bx = Math.round(x - bw / 2), by = Math.round(y - bh), night = mode === 'night';
    const wall = night ? '#B7B0D6' : '#D6CFE6', wallSh = night ? '#8D86B5' : '#B3AACC', dome = night ? '#DCD6F0' : '#EEE9F6', domeSh = night ? '#A9A2D0' : '#C6BEDB';
    P.r(bx, by, bw, bh + 2, wall); P.r(bx + bw - Math.max(2, Math.round(4 * s)), by, Math.max(2, Math.round(4 * s)), bh + 2, wallSh);
    for (let yy = -R; yy <= 0; yy++) { const h = Math.floor(Math.sqrt((R + .5) ** 2 - yy * yy)); P.r(x - h, by + yy, h * 2 + 1, 1, dome); const sh = Math.ceil(h * .4); P.r(x + h - sh + 1, by + yy, sh, 1, domeSh); }
    P.r(bx + 1, by - 1, bw - 2, 1, wallSh);
    P.r(bx + Math.round(3 * s), by + Math.round(3 * s), Math.max(2, Math.round(3 * s)), bh - Math.round(3 * s) + 2, night ? '#3E2F66' : '#7E73A0');
    P.r(x + Math.round(2 * s), by + Math.round(2 * s), Math.max(2, Math.round(3 * s)), Math.max(2, Math.round(3 * s)), night ? '#FFCF6B' : '#9A93B8');
    if (night) { P.r(x - 1, by - R, 3, R, '#0E0C1F'); for (let i = 0; i < Math.round(9 * s); i++) P.p(x + Math.round(i * .55), by - R - 1 - i, i < 2 ? '#7FB2C9' : '#C9C2E6'); }
    else P.r(x, by - R, 1, R, domeSh);
  };
  const drawPlanet = (P, cx, cy, s, mode) => {
    const pts = []; for (let a = 0; a < 360; a += 4) { const t = a * Math.PI / 180; pts.push([Math.round(cx + Math.cos(t) * 11 * s), Math.round(cy + Math.sin(t) * 3 * s - Math.cos(t) * 1.5 * s), Math.sin(t) > 0]); }
    if (mode === 'morning') { pts.forEach(([x, y], i) => { if (i % 2) P.p(x, y, '#E2D7E2'); }); return; }
    pts.filter(q => !q[2]).forEach(([x, y]) => P.p(x, y, '#9A7430'));
    const r = Math.max(2, Math.round(6 * s));
    P.circ(cx, cy, r, '#141018'); P.circ(cx - Math.round(2 * s), cy - Math.round(2 * s), Math.max(1, Math.round(2 * s)), '#F1E9D2');
    pts.filter(q => q[2]).forEach(([x, y]) => P.p(x, y, '#EDBE6C'));
  };
  const conifer = (P, x, base, h, col, hi) => {
    for (let i = 0; i < h; i++) { const y = base - h + i, tier = i % 4, w = Math.round(.5 + (i / h) * h * .26 * (.55 + .15 * tier)); P.r(x - w, y, w * 2 + 1, 1, col); if (tier === 3 && w > 0) P.p(x - w, y, hi); }
    P.r(x, base, 1, 2, '#2A1F1A');
  };

  const buildScene = (L, mode) => {
    const W = L.w, H = L.h, c = mk(W, H), g = c.getContext('2d'), P = PX(g), pal = SPAL[mode], night = mode === 'night';
    const img = g.createImageData(W, H), d = img.data, stops = pal.sky.map(hex), n = stops.length - 1, [mx, my, mr] = L.moon;
    const mix = (a, b, f) => a.map((v, j) => v + (b[j] - v) * f);
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
      const t = Math.min(1, y / L.horizon) * n, i = Math.floor(t), fr = t - i, th = BY[y % 4][x % 4];
      let col = fr * 16 > th ? stops[Math.min(i + 1, n)] : stops[i];
      if (!night) {
        // morning sky in plain bands rather than dither, so the heading and the sun sit on a calm background
        const k = 1 - Math.hypot(x - mx, (y - my) * 1.1) / 60;
        col = mix(stops[i], stops[Math.min(i + 1, n)], Math.round(fr * 4) / 4);
        if (k > 0) col = mix(col, [255, 246, 223], Math.min(.6, Math.round(k * 8) / 8));
      }
      const p = (y * W + x) * 4; d[p] = col[0]; d[p + 1] = col[1]; d[p + 2] = col[2]; d[p + 3] = 255;
    }
    g.putImageData(img, 0, 0);
    if (night && L.galaxy) { const [gx, gy, gs] = L.galaxy; for (let arm = 0; arm < 2; arm++) for (let th = 0; th < Math.PI * 4.2; th += .05) { const rr = (1.5 + th * 1.12) * gs, a = th + arm * Math.PI; P.p(gx + Math.cos(a) * rr, gy + Math.sin(a) * rr * .8, Math.floor(th * 6) % 3 ? '#2A3577' : '#36468F'); } }
    if (night) L.halos.forEach(([hx, hy]) => { for (let y = -7; y <= 7; y++) for (let x = -7; x <= 7; x++) { const dd = Math.hypot(x, y), th = BY[(hy + y + 32) % 4][(hx + x + 32) % 4]; if (dd > 2.5 && dd < 3.6 && th < 9) P.p(hx + x, hy + y, '#7E6A3E'); else if (dd > 4.6 && dd < 5.7 && th < 4) P.p(hx + x, hy + y, '#4E4430'); } });
    if (L.planet) drawPlanet(P, L.planet[0], L.planet[1], L.planet[2], mode);
    for (let y = -mr - 7; y <= mr + 7; y++) for (let x = -mr - 7; x <= mr + 7; x++) {
      const dd = Math.hypot(x, y), th = BY[(my + y + 32) % 4][(mx + x + 32) % 4];
      if (night) { if (dd > mr + 1.5 && dd < mr + 3 && th < 6) P.p(mx + x, my + y, '#5C4E33'); else if (dd > mr + 4.5 && dd < mr + 6 && th < 3) P.p(mx + x, my + y, '#463B2B'); }
      else if (dd > mr + 1.5 && dd < mr + 2.6) P.p(mx + x, my + y, '#FFE7B0');
    }
    for (let y = -mr; y <= mr; y++) for (let x = -mr; x <= mr; x++) { const dd = Math.hypot(x, y); if (dd > mr + .4) continue; P.p(mx + x, my + y, night ? ((x * 5 + y * 3 + 40) % 11 === 0 ? '#D4CBB2' : '#F1E9D2') : (dd > mr - 1.2 ? '#FFDF8F' : '#FFF4D1')); }
    const ridges = L.layers.map(ridgeFn), windows = [];
    L.layers.forEach((ly, li) => {
      const f = ridges[li], col = pal[ly.c], hi = pal[ly.c + 'Hi'];
      for (let x = 0; x < W; x++) { const y = Math.round(f(x)); if (y >= H) continue; P.r(x, y, 1, H - y, col); if ((x + y) % 2 === 0) P.p(x, y, hi); }
      if (ly.snow) for (let x = 0; x < W; x++) { const top = Math.round(f(x)); if (top >= ly.snow) continue; const depth = Math.round((ly.snow - top) * .7 + 1 + hash(x * 1.7) * 2), slope = f(x + 1) - f(x - 1); for (let y = top; y < top + depth && y < H; y++) { if (y >= top + depth - 1 && hash(x + y) > .5) continue; P.p(x, y, slope > .5 ? pal.snowSh : y === top ? pal.snowHi : pal.snow); } }
      if (ly.terraces) { const [t0, t1] = ly.terraces; for (let x = t0; x < t1; x++) { const top = f(x); for (let k = 1; k <= 4; k++) { const y = Math.round(top + k * 2.5 + Math.sin(x * .05 + k) * .5); if (y < H && (x + k * 2) % 9 !== 0) P.p(x, y, hi); } } }
      (ly.forest || []).forEach(([x0, x1, dens]) => { for (let x = x0; x < Math.min(x1, W); x += 2) { if (hash(x * 3.3 + li * 17) > dens) continue; const top = Math.round(f(x)) + 1 + Math.round(hash(x * 5.1 + li) * 3), h = 2 + Math.round(hash(x * 7.9 + li) * (li > 2 ? 3 : 2)); for (let i = 0; i < h; i++) { const w = i > h - 2 ? 1 : 0; P.r(x - w, top - h + i + 1, w * 2 + 1, 1, i === 0 ? pal.forestHi : pal.forest); } } });
      (ly.houses || []).forEach(hx => { const y = Math.round(f(hx)) + 3; P.r(hx - 2, y - 3, 4, 3, pal.house); P.r(hx - 3, y - 4, 6, 1, pal.roof); P.r(hx - 2, y - 5, 4, 1, pal.roof); windows.push([hx - 1, y - 2]); P.p(hx - 1, y - 2, pal.win); });
      if (L.obs.layer === li) drawObs(P, L.obs.x, Math.round(f(L.obs.x)) + 1, L.obs.s, mode);
    });
    const landTop = x => Math.min(...ridges.map(f => f(x)));
    const mask = new Uint8Array(W * H), R = L.river;
    for (let x = 0; x < W; x++) { const cy = R.y0 + R.amp * Math.sin(R.k * x + R.ph); for (let y = Math.round(cy - R.hw); y <= Math.round(cy + R.hw); y++) if (y >= 0 && y < H) mask[y * W + x] = 1; }
    const water = [];
    for (let x = 0; x < W; x++) {
      let top = -1;
      for (let y = 0; y < H; y++) {
        if (!mask[y * W + x]) continue;
        if (top < 0) top = y;
        if (y === top) { P.p(x, y, pal.shore); continue; }
        const refl = 2 * top - y + 1 >= landTop(x) - 1;
        P.p(x, y, refl ? pal.waterDeep : ((y + Math.floor(x / 9)) % 3 === 0 ? pal.water2 : pal.water));
        water.push([x, y, refl]);
      }
    }
    const nearY = x => Math.round(L.near(x));
    for (let x = 0; x < W; x++) { const y = nearY(x); if (y >= H) continue; P.r(x, y, 1, H - y, pal.near); P.p(x, y, pal.nearHi); if (hash(x * 3.1) < .18) P.p(x, y - 1, pal.nearHi); }
    L.trees.forEach(([tx, th]) => conifer(P, tx, nearY(tx) + 1, th, pal.tree, pal.treeHi));
    const fx = L.fire, fy = nearY(fx);
    // two soft checker rows into the page colour, then a clean page-coloured last row
    const half = `rgb(${mix(hex(pal.near), hex(pal.page), .5).map(Math.round)})`;
    for (let x = 0; x < W; x++) { if (x % 2) P.p(x, H - 3, half); P.p(x, H - 2, x % 2 ? pal.page : half); P.p(x, H - 1, pal.page); }
    const treeTop = x => Math.min(999, ...L.trees.filter(([tx, th]) => Math.abs(x - tx) <= th * .3 + 1).map(([tx, th]) => nearY(tx) - th));
    const obsTop = x => Math.abs(x - L.obs.x) < 10 * L.obs.s ? ridges[L.obs.layer](L.obs.x) - 17 * L.obs.s : 999;
    const S = { canvas: c, water: water.filter(([x, y]) => y < nearY(x) && !L.trees.some(([tx, th]) => Math.abs(x - tx) <= th * .3 + 1 && y >= nearY(tx) - th)), windows, nearY, fx, fy, wet: mask, stars: [], glow: [] };
    if (night) {
      const r = rng(L.stars * 7 + W); let guard = 0;
      while (S.stars.length < L.stars && guard++ < 5000) {
        const x = Math.floor(r() * W), y = Math.floor(r() * (L.horizon - 6));
        if (y > Math.min(landTop(x), treeTop(x), obsTop(x)) - 4 || Math.hypot(x - mx, y - my) < mr + 8) continue;
        if (L.planet && Math.hypot(x - L.planet[0], y - L.planet[1]) < 14 * L.planet[2]) continue;
        if (L.halos.some(([hx, hy]) => Math.hypot(x - hx, y - hy) < 7)) continue;
        const tz = x < L.title[0] && y < L.title[1];
        S.stars.push({ x, y, sp: .5 + r(), ph: r() * 6.28, big: !tz && r() < .18, c: tz ? '#6E68A0' : ['#FFFFFF', '#FFE9A8', '#C9D4FF', '#E6E1F4'][Math.floor(r() * 4)], d: tz ? '#2E2B55' : '#4C4778' });
      }
      for (let dy = -7; dy <= 6; dy++) for (let dx = -18; dx <= 18; dx++) { const x = fx + dx, y = fy + dy; if (x < 0 || x >= W || y < 0 || y >= H || y < nearY(x)) continue; const e = (dx / 18) ** 2 + (dy / 7) ** 2; if (e < 1) S.glow.push([x, y, 1 - e]); }
    }
    return S;
  };

  const drawFigure = (P, cx, by, mode, t, flick) => {
    const C = CH[mode], night = mode === 'night';
    P.r(cx - 1, by - 3, 6, 3, C.rock); P.r(cx - 1, by - 3, 6, 1, C.rockHi);
    P.r(cx - 6, by - 5, 7, 2, C.pants); P.r(cx - 7, by - 5, 2, 5, C.pants); P.r(cx - 9, by - 1, 4, 1, C.shoe);
    P.r(cx - 1, by - 11, 5, 7, C.hood); P.r(cx + 3, by - 11, 1, 7, C.hoodDark); P.r(cx + 2, by - 12, 2, 2, C.hoodDark);
    P.r(cx - 1, by - 16, 4, 5, C.skin); P.r(cx - 1, by - 17, 5, 2, C.hair); P.r(cx + 2, by - 16, 2, 4, C.hair); P.p(cx - 1, by - 15, C.hair);
    P.p(cx, by - 14, '#2A1E24');
    P.r(cx - 1, by - 18, 5, 1, C.band); P.p(cx - 1, by - 17, C.band); P.r(cx + 1, by - 15, 2, 3, C.cup); P.p(cx + 1, by - 15, '#FFE09A');
    P.r(cx - 6, by - 6, 5, 1, '#8D86B0');
    [[-6, -7], [-6, -8], [-7, -9], [-7, -10], [-7, -11]].forEach(([dx, dy]) => P.p(cx + dx, by + dy, C.lid));
    [[-6, -9], [-6, -10], [-6, -11]].forEach(([dx, dy]) => P.p(cx + dx, by + dy, C.screen));
    P.r(cx - 4, by - 8, 4, 1, C.hood); P.r(cx - 5, by - 7, 2, 1, C.skin);
    if (night) {
      if (flick > .35) { P.r(cx - 1, by - 11, 1, 6, C.hoodLit); P.p(cx - 1, by - 16, C.skinLit); }
      P.p(cx - 1, by - 13, C.screenLit); P.p(cx - 1, by - 12, C.screenLit); P.p(cx - 5, by - 7, C.screenLit);
    } else {
      P.r(cx + 5, by - 3, 2, 3, '#F6EFE4'); P.p(cx + 5, by - 3, '#C98A3B');
      const ph = (t * .0006) % 1; for (let i = 0; i < 3; i++) { const p = (ph + i / 3) % 1; P.p(cx + 5 + Math.round(Math.sin(p * 6 + i) * .8), by - 5 - Math.round(p * 6), p < .6 ? '#FFFFFF' : '#EDE6DE'); }
    }
  };

  const NOTE = [[0, 1, 1], [0, 1, 0], [1, 1, 0], [1, 1, 0]];
  // the scene is drawn at native size into a buffer, scaled up by a whole number B, then the fire and figure go on top k times bigger
  const drawScene = (L, b, mode, t) => {
    const { S, P, g, out, B } = b, night = mode === 'night', pal = SPAL[mode], W = L.w;
    g.drawImage(S.canvas, 0, 0);
    if (night) {
      S.stars.forEach(s => { const q = Math.sin(t * .0021 * s.sp + s.ph); P.p(s.x, s.y, q > .35 ? s.c : s.d); if (s.big && q > .85) { P.p(s.x - 1, s.y, s.d); P.p(s.x + 1, s.y, s.d); P.p(s.x, s.y - 1, s.d); P.p(s.x, s.y + 1, s.d); } });
      L.halos.forEach(([hx, hy], i) => P.r(hx, hy, 2, 2, Math.sin(t * .0024 + i * 1.7) > -.2 ? '#FFF4C8' : '#E9C46A'));
      if (L.galaxy) { const [gx, gy, gs] = L.galaxy, th0 = (t * .0016) % (Math.PI * 4.2); for (let arm = 0; arm < 2; arm++) for (let k = 0; k < 6; k++) { const th = (th0 + k * .06) % (Math.PI * 4.2), rr = (1.5 + th * 1.12) * gs, a = th + arm * Math.PI; P.p(gx + Math.cos(a) * rr, gy + Math.sin(a) * rr * .8, '#5266B8'); } }
      S.windows.forEach(([x, y], i) => P.p(x, y, Math.sin(t * .0013 + i * 2.3) > -.6 ? '#FFCF6B' : '#C98A3B'));
    } else {
      L.birds.forEach(([bx, by], k) => { const span = W * .22, x = Math.round(bx - ((t * .003 + k * 9) % span)), y = by + Math.round(Math.sin(t * .001 + k) * 1.5), up = Math.floor(t / 280 + k) % 2; P.p(x, y, '#4A4560'); if (up) { P.p(x - 1, y - 1, '#4A4560'); P.p(x + 1, y - 1, '#4A4560'); } else { P.p(x - 1, y, '#4A4560'); P.p(x + 1, y, '#4A4560'); } });
    }
    const [mx] = L.moon, tt = t * .0022;
    S.water.forEach(([x, y, refl]) => {
      if (Math.abs(x - mx) <= 1 + (y % 4 === 0 ? 1 : 0)) { if (BY[y % 4][(x + Math.floor(t / 180)) % 4] < 4) P.p(x, y, night ? (y % 2 ? pal.refl : pal.refl2) : (y % 2 ? '#FFF1CF' : '#FFFFFF')); return; }
      const s = Math.sin(x * .45 + y * 1.7 - tt);
      if (s > (night ? .94 : .995 - .06 * bump(x, mx, W * .16))) P.p(x, y, night ? (refl ? pal.shore : pal.waterHi) : pal.refl);
      else if (night && !refl && hash(x * 7.7 + y * 3.3) > .985 && Math.sin(t * .003 + x) > .3) P.p(x, y, pal.refl2);
    });
    if (!night) {
      const [y0, y1] = L.mist, mid = (y0 + y1) / 2, half = (y1 - y0) / 2, off = Math.floor(t * .004);
      for (let y = y0; y <= y1; y++) { const fall = 1 - Math.abs(y - mid) / half; for (let x = 0; x < W; x++) { if (y >= S.nearY(x) || L.trees.some(([tx, th]) => Math.abs(x - tx) <= th * .3 + 2)) continue; const dens = fall * (1.4 + 1.8 * Math.sin(x * .05 + t * .0004 + y * .3)) * (S.wet[y * W + x] ? .4 : 1); if (BY[y % 4][(x + off) % 4] + 1 < dens) P.p(x, y, pal.mist); } }
    }
    const fx = S.fx, fy = S.fy, flick = .5 + .5 * Math.sin(t * .021) * Math.sin(t * .013 + 1);
    if (night) S.glow.forEach(([x, y, k]) => { if (k * 15 * (.8 + .3 * flick) > BY[y % 4][x % 4] + 4) P.p(x, y, k > .55 ? pal.glow1 : pal.glow2); });
    out.imageSmoothingEnabled = false; out.drawImage(g.canvas, 0, 0, W * B, L.h * B);
    const cx = fx + L.cdx, cby = S.nearY(cx);
    const F = PXA(out, B, L.k, fx, fy);
    [[-5, 0], [5, 0], [-4, 1], [4, 1]].forEach(([dx, dy]) => F.p(fx + dx, fy + dy, night ? '#3A3550' : '#8F84A0'));
    F.r(fx - 3, fy - 1, 7, 1, '#5E3F2E'); F.r(fx - 4, fy - 2, 3, 1, '#7A5440'); F.r(fx + 2, fy - 2, 3, 1, '#7A5440'); F.p(fx, fy - 2, '#4A3226');
    if (night) {
      const base = [3, 5, 7, 5, 3];
      for (let i = 0; i < 5; i++) { const h = Math.max(1, Math.round(base[i] * (.7 + .45 * hash(Math.floor(t / 90) * 5 + i)))), x = fx - 2 + i; for (let j = 0; j < h; j++) { const f = j / h; F.p(x, fy - 3 - j, f < .3 && i > 0 && i < 4 ? '#FFE7A8' : f < .6 ? '#FFB347' : f < .85 ? '#E9893A' : '#C8452F'); } }
      for (let k = 0; k < 6; k++) { const ph = ((t * .00085 + k * .37) % 1.3) / 1.3; if (ph >= 1) continue; F.p(fx + Math.round(Math.sin(k * 2.1 + ph * 6) * 1.5 + (hash(k) - .5) * 4), fy - 9 - Math.round(ph * 16), ph < .4 ? '#FFCF6B' : ph < .75 ? '#E9893A' : '#8A4A3A'); }
      for (let k = 0; k < 6; k++) { const ph = (t * .00032 + k / 6) % 1; if (ph > .6 && k % 2) continue; F.p(fx + Math.round(Math.sin(ph * 5 + k) * 2 * ph), fy - 11 - Math.round(ph * 20), ph < .5 ? '#5A5578' : '#3E3A5C'); }
    } else {
      [[-1, -2], [1, -2], [0, -3], [2, -1]].forEach(([dx, dy], i) => F.p(fx + dx, fy + dy, ['#E9893A', '#C8452F', '#FFB347'][(Math.floor(t / 300) + i) % 3]));
      for (let i = 0; i < 26; i++) { if (hash(i + 3) < .25 * (i / 26)) continue; F.p(fx + Math.round(Math.sin(i * .32 - t * .0016) * (.4 + i * .07)), fy - 4 - i, i < 12 ? '#A99FA2' : '#C7BEBC'); }
    }
    const C = PXA(out, B, L.k, cx, cby);
    drawFigure(C, cx, cby, mode, t, flick);
    const nn = night ? 3 : 2;
    for (let k = 0; k < nn; k++) {
      const ph = (t * .00022 + k / nn) % 1; if (ph > .9) continue;
      const x = Math.round(cx + 2 + ph * 7 * (k % 2 ? -1 : 1) + Math.sin(ph * 7 + k) * 1.5), y = Math.round(cby - 20 - ph * 22), col = CH[mode].notes[k % 2];
      NOTE.forEach((row, j) => row.forEach((on, i) => { if (on) C.p(x + i, y + j, col); }));
    }
  };

  const scene = (() => {
    const box = $('home'), cvs = { night: $('heroNight'), morning: $('heroMorning') }, phone = matchMedia('(max-width: 720px)');
    let L, built = {}, mode = document.documentElement.dataset.theme === 'light' ? 'morning' : 'night', bothUntil = 0, vis = true, last = 0;
    const setup = () => {
      L = SCENE[phone.matches ? 'm' : 'd']; built = {};
      const B = L.k > 1 ? 4 : 1;
      Object.entries(cvs).forEach(([m, cv]) => { cv.width = L.w * B; cv.height = L.h * B; const g = mk(L.w, L.h).getContext('2d'); built[m] = { S: buildScene(L, m), g, P: PX(g), out: cv.getContext('2d'), B }; });
      paint(reduce ? 2400 : performance.now(), true);
    };
    const paint = (t, all) => Object.entries(built).forEach(([m, b]) => { if (all || m === mode || t < bothUntil) drawScene(L, b, m, t); });
    phone.addEventListener('change', setup);
    watch(box, v => { vis = v; });
    setup();
    const loop = t => { if (!reduce && vis && t - last > 60) { last = t; paint(t, false); } requestAnimationFrame(loop); };
    requestAnimationFrame(loop);
    return { setMode: m => { if (m === mode) return; mode = m; bothUntil = performance.now() + 1200; if (reduce) paint(2400, true); } };
  })();

  const drawHireArt = theme => {
    const c = $('hireArt'); c.width = 64; c.height = 44; const P = PX(c.getContext('2d')), night = theme !== 'light', pal = SPAL[night ? 'night' : 'morning'];
    pal.sky.forEach((col, i) => P.r(0, i * 6, 64, 6, col));
    if (night) [[5, 5], [14, 12], [24, 3], [36, 9], [58, 15], [8, 20], [46, 4]].forEach(([x, y], i) => P.p(x, y, i % 3 ? '#C9C4DA' : '#EDBE6C'));
    P.circ(52, 9, 4, night ? '#F1E9D2' : '#FFF4D1');
    for (let x = 0; x < 64; x++) { const y = Math.round(30 - 14 * bump(x, 40, 9) - 8 * bump(x, 12, 10)); P.r(x, y, 1, 44 - y, pal.r1); if (y < 21) P.p(x, y, pal.snow); }
    const ridge = x => Math.round(34 - 6 * bump(x, 26, 14));
    for (let x = 0; x < 64; x++) { const y = ridge(x); P.r(x, y, 1, 44 - y, pal.r2); if ((x + y) % 2 === 0) P.p(x, y, pal.r2Hi); }
    drawObs(P, 26, ridge(26) + 1, 1.3, night ? 'night' : 'morning');
    P.r(0, 40, 64, 4, pal.ground);
  };
  const drawBust = (cv, theme) => {
    cv.width = 24; cv.height = 24;
    const P = PX(cv.getContext('2d')), night = theme !== 'light', C = CH[night ? 'night' : 'morning'];
    P.r(0, 0, 24, 24, night ? '#141230' : '#E7DCCB');
    if (night) { [[3, 4], [19, 3], [21, 9], [2, 12]].forEach(([x, y], i) => P.p(x, y, i % 2 ? '#FFE9A8' : '#C9D4FF')); P.r(0, 20, 24, 4, '#2A1E2A'); }
    else { P.r(0, 0, 24, 9, '#C9D8EA'); P.r(0, 9, 24, 3, '#E9E0D2'); P.r(0, 18, 24, 6, '#CFBFA8'); }
    for (let y = 17; y < 24; y++) { const w = Math.min(11, Math.round(6 + (y - 17) * 1.3)); P.r(12 - w, y, w * 2, 1, C.hood); P.r(12 + w - 3, y, 3, 1, C.hoodDark); }
    P.r(9, 16, 6, 2, C.hoodDark); [[10, 19], [13, 19], [10, 20], [13, 20]].forEach(([x, y]) => P.p(x, y, '#E8E0D0'));
    P.r(10, 14, 4, 3, '#A9744E');
    P.r(8, 5, 8, 1, C.skin); P.r(7, 6, 10, 8, C.skin); P.r(8, 14, 8, 1, C.skin); P.r(9, 15, 6, 1, C.skin);
    P.r(15, 9, 2, 5, '#B47C55'); P.r(14, 14, 2, 1, '#B47C55');
    P.r(9, 2, 6, 1, C.hair); P.r(7, 3, 10, 1, C.hair); P.r(6, 4, 12, 2, C.hair); P.r(6, 6, 3, 1, C.hair); P.r(15, 6, 3, 1, C.hair); P.p(10, 6, C.hair); P.p(12, 6, C.hair); P.r(6, 7, 1, 4, C.hair); P.r(17, 7, 1, 4, C.hair);
    P.p(9, 3, '#4A3540'); P.p(8, 4, '#4A3540');
    P.r(8, 8, 3, 1, C.hair); P.r(13, 8, 3, 1, C.hair);
    P.r(9, 10, 2, 1, '#1A1420'); P.r(13, 10, 2, 1, '#1A1420');
    P.p(12, 12, '#A9744E'); P.r(11, 13, 2, 1, '#8E4E42');
    P.r(8, 1, 8, 1, C.band); P.r(6, 2, 2, 1, C.band); P.r(16, 2, 2, 1, C.band); P.r(5, 3, 1, 4, C.band); P.r(18, 3, 1, 4, C.band);
    P.r(4, 7, 3, 5, C.cup); P.r(17, 7, 3, 5, C.cup); P.r(6, 8, 1, 3, '#B8862E'); P.r(17, 8, 1, 3, '#B8862E'); P.p(4, 7, '#FFE09A'); P.p(17, 7, '#FFE09A');
    if (night) { P.r(7, 7, 1, 6, C.skinLit); P.p(8, 13, '#E7AE7C'); }
  };
  drawBust($('portrait'), document.documentElement.dataset.theme);


  const yrsMos = (y, m) => { const n = (now.getFullYear() - y) * 12 + now.getMonth() - m + 2, yr = Math.floor(n / 12), mo = n % 12; return [yr && `${yr} yr${yr > 1 ? 's' : ''}`, mo && `${mo} mo${mo > 1 ? 's' : ''}`].filter(Boolean).join(' '); };
  document.querySelectorAll('[data-since]').forEach(el => { const [y, m] = el.dataset.since.split('-').map(Number); el.textContent = yrsMos(y, m); });

  const wins = [...document.querySelectorAll('.nav a')], secs = ['work', 'skills', 'projects', 'services', 'contact'].map(id => $(id));
  const spy = () => { let cur = ''; secs.forEach(s => { if (s.getBoundingClientRect().top < innerHeight * .4) cur = s.id; }); wins.forEach(a => a.classList.toggle('on', a.dataset.sec === cur)); };
  addEventListener('scroll', spy, { passive: true }); spy();
  const tm = document.querySelector('.topbar'), menuBtn = $('menuBtn');
  const setMenu = v => { tm.classList.toggle('open', v); menuBtn.setAttribute('aria-expanded', String(v)); menuBtn.textContent = v ? 'Close' : 'Menu'; };
  menuBtn.addEventListener('click', () => setMenu(!tm.classList.contains('open')));
  wins.forEach(a => a.addEventListener('click', () => setMenu(false)));
  addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });
  const root = document.documentElement, themeBtn = $('themeBtn'), sysLight = matchMedia('(prefers-color-scheme: light)');
  const applyTheme = t => {
    root.dataset.theme = t;
    $('themeColor').content = t === 'light' ? '#F6F1E6' : '#14131E';
    themeBtn.setAttribute('aria-label', t === 'light' ? 'Switch to dark mode' : 'Switch to light mode');
    scene.setMode(t === 'light' ? 'morning' : 'night'); drawBust($('portrait'), t); drawMailbox(t); drawHireArt(t);
  };
  const saved = () => { try { return localStorage.getItem('theme'); } catch (e) { return null; } };
  applyTheme(root.dataset.theme === 'light' ? 'light' : 'dark');
  themeBtn.addEventListener('click', () => { const t = root.dataset.theme === 'light' ? 'dark' : 'light'; applyTheme(t); try { localStorage.setItem('theme', t); } catch (e) { } });
  sysLight.addEventListener('change', e => { if (!saved()) applyTheme(e.matches ? 'light' : 'dark'); });

  if (typing) { const t0 = dlgFull; dlgText.style.visibility = 'hidden'; setTimeout(() => { dlgText.style.visibility = ''; dialogSay(t0); }, 250); }
})();
