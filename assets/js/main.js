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
  // moon phase from a known new moon (6 Jan 2000 18:14 UTC); the hero and the Now strip both use it
  const LUN = 29.530588853, NEW = Date.UTC(2000, 0, 6, 18, 14);
  const moonAge = ms => (((ms - NEW) / 864e5) % LUN + LUN) % LUN;
  const SPAL = {
    night: { sky: ['#120E2A', '#171233', '#1E173E', '#271E4A', '#312558', '#3E2F68'],
      r0: '#2C2854', r0Hi: '#3A3566', r1: '#24204A', r1Hi: '#2F2A5A', r2: '#1C1939', r2Hi: '#28234D', r3: '#17152F', r3Hi: '#221E40', ground: '#191632', groundHi: '#221E40', near: '#14112A', nearHi: '#211D3C',
      snow: '#9C97C6', snowHi: '#C3BEE6', snowSh: '#6F6AA0', forest: '#0F1622', forestHi: '#18212F',
      water: '#1A2152', water2: '#212A62', waterDeep: '#11152F', waterHi: '#3D4A94', shore: '#2A2F66', refl: '#F1E9D2', refl2: '#C9C2E6', page: '#0B0B10',
      tree: '#0A1216', treeHi: '#14222A', house: '#2A2648', roof: '#3E3966', win: '#FFCF6B', glow1: '#4A2E2C', glow2: '#2B1D27' },
    morning: { sky: ['#9DBCE2', '#B5CBE7', '#D4DAE4', '#EFE3D4', '#F6D6B4', '#F3C197'],
      r0: '#DCCDDA', r0Hi: '#E8DAE4', r1: '#C7B4CC', r1Hi: '#D4C2D8', r2: '#AE9BBA', r2Hi: '#BEABC8', r3: '#93819F', r3Hi: '#A592AF', ground: '#7F6E8D', groundHi: '#8F7E9C', near: '#5A4A69', nearHi: '#706083',
      snow: '#FFF8F0', snowHi: '#FFFFFF', snowSh: '#EADBE3', forest: '#5F7469', forestHi: '#728679',
      water: '#93BBD6', water2: '#A7CBE1', waterDeep: '#7FA2BF', waterHi: '#D9EBF4', shore: '#B9D3E2', refl: '#FFFFFF', refl2: '#FFF1CF', page: '#F5F5F7', mist: '#F8F0E6',
      tree: '#3D4D47', treeHi: '#53655C', house: '#EFE6DA', roof: '#7A6A88', win: '#8E7FA0' }
  };
  const CH = {
    night: { hair: '#2A1E24', skin: '#C98E62', skinLit: '#E7AE7C', screenLit: '#A9CDEB', shirt: '#BFAC8C', shirtLit: '#E8D0A6', shirtDark: '#93826A', beard: '#5A3D33', beardDark: '#46302A', pants: '#2E2A44', shoe: '#17151F', band: '#3A3550', cup: '#EDBE6C', rock: '#3A3550', rockHi: '#4E4870', lid: '#B7B0D6', screen: '#8FD3FF', notes: ['#BBA7F6', '#EDBE6C'] },
    morning: { hair: '#2A1E24', skin: '#C98E62', skinLit: '#D9A072', screenLit: '#D9A072', shirt: '#D9C5A3', shirtLit: '#E8D7B8', shirtDark: '#B39F80', beard: '#5A3D33', beardDark: '#46302A', pants: '#3A3554', shoe: '#22202E', band: '#3A3550', cup: '#E9AE45', rock: '#7F7290', rockHi: '#978AA6', lid: '#D6CFE6', screen: '#CFE6F5', notes: ['#2E8A74', '#B07A1F'] }
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

  // sun (morning) or moon with tonight's real phase (night), centred on mx,my
  const orb = (P, mode, mx, my, mr) => {
    const night = mode === 'night';
    for (let y = -mr - 7; y <= mr + 7; y++) for (let x = -mr - 7; x <= mr + 7; x++) {
      const dd = Math.hypot(x, y), th = BY[(my + y + 32) % 4][(mx + x + 32) % 4];
      if (night) { if (dd > mr + 1.5 && dd < mr + 3 && th < 6) P.p(mx + x, my + y, '#5C4E33'); else if (dd > mr + 4.5 && dd < mr + 6 && th < 3) P.p(mx + x, my + y, '#463B2B'); }
      else if (dd > mr + 1.5 && dd < mr + 2.6) P.p(mx + x, my + y, '#FFE7B0');
    }
    for (let y = -mr; y <= mr; y++) for (let x = -mr; x <= mr; x++) { const dd = Math.hypot(x, y); if (dd > mr + .4) continue; P.p(mx + x, my + y, night ? ((x * 5 + y * 3 + 40) % 11 === 0 ? '#D4CBB2' : '#F1E9D2') : (dd > mr - 1.2 ? '#FFDF8F' : '#FFF4D1')); }
    // its dark side in faint earthshine
    if (night) { const age = moonAge(Date.now()), c = Math.cos(2 * Math.PI * age / LUN), R = mr + .5; for (let y = -mr; y <= mr; y++) for (let x = -mr; x <= mr; x++) { if (Math.hypot(x, y) > mr + .4) continue; const w = Math.sqrt(Math.max(0, 1 - (y / R) ** 2)), nx = x / R, on = age < LUN / 2 ? nx > w * c : nx < -w * c; if (!on) P.p(mx + x, my + y, (x * 5 + y * 3 + 40) % 7 === 0 ? '#2F2A55' : '#262145'); } }
  };

  // part: 'sky' = sky without sun/moon, 'land' = everything below on a transparent canvas (for the day/night transition)
  const buildScene = (L, mode, part) => {
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
    if (part === 'sky') return c;
    orb(P, mode, mx, my, mr);
    if (part === 'land') g.clearRect(0, 0, W, H);
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
    P.r(cx - 1, by - 11, 5, 7, C.shirt); P.r(cx + 3, by - 11, 1, 7, C.shirtDark);
    // wavy mullet, longer at the back and flicking out over the collar; short beard along the jaw
    P.r(cx - 1, by - 16, 4, 5, C.skin); P.r(cx - 1, by - 17, 5, 2, C.hair); P.r(cx + 2, by - 16, 2, 5, C.hair); P.r(cx + 3, by - 11, 1, 2, C.hair); P.p(cx + 4, by - 10, C.hair); P.p(cx - 1, by - 15, C.hair);
    P.p(cx, by - 17, '#4A3540'); P.p(cx + 3, by - 14, '#4A3540');
    P.r(cx - 1, by - 12, 3, 1, C.beard); P.p(cx - 1, by - 13, C.beard);
    P.p(cx, by - 14, '#2A1E24');
    P.r(cx - 1, by - 18, 5, 1, C.band); P.p(cx - 1, by - 17, C.band); P.r(cx + 1, by - 15, 2, 3, C.cup); P.p(cx + 1, by - 15, '#FFE09A');
    P.r(cx - 6, by - 6, 5, 1, '#8D86B0');
    [[-6, -7], [-6, -8], [-7, -9], [-7, -10], [-7, -11]].forEach(([dx, dy]) => P.p(cx + dx, by + dy, C.lid));
    [[-6, -9], [-6, -10], [-6, -11]].forEach(([dx, dy]) => P.p(cx + dx, by + dy, C.screen));
    P.r(cx - 2, by - 8, 2, 1, C.shirt); P.r(cx - 4, by - 8, 2, 1, C.skin); P.r(cx - 5, by - 7, 2, 1, C.skin);
    if (night) {
      if (flick > .35) { P.r(cx - 1, by - 11, 1, 6, C.shirtLit); P.p(cx - 1, by - 16, C.skinLit); }
      P.p(cx - 5, by - 7, C.screenLit);
    } else {
      P.r(cx + 5, by - 3, 2, 3, '#F6EFE4'); P.p(cx + 5, by - 3, '#C98A3B');
      const ph = (t * .0006) % 1; for (let i = 0; i < 3; i++) { const p = (ph + i / 3) % 1; P.p(cx + 5 + Math.round(Math.sin(p * 6 + i) * .8), by - 5 - Math.round(p * 6), p < .6 ? '#FFFFFF' : '#EDE6DE'); }
    }
  };

  const NOTE = [[0, 1, 1], [0, 1, 0], [1, 1, 0], [1, 1, 0]];
  // the scene is drawn at native size into a buffer, scaled up by a whole number B, then the fire and figure go on top k times bigger
  // day <-> night, lit by the sun: as it sinks the sky far from it darkens first and the glow around it last,
  // a golden-hour tint follows it down, the land catches a warm rim then goes dark, and stars come out where
  // the sky is already dark. Light steps in fine dithered levels so it stays pixel art.
  let TRANS = null;
  const sm = (p, a, z) => { const k = Math.min(1, Math.max(0, (p - a) / (z - a))); return k * k * (3 - 2 * k); };
  const WARM = [255, 136, 88];
  const blend = (L, b, p) => {
    const o = b.other, toN = b.night, Dy = toN ? o : b, Nt = toN ? b : o, W = L.w, H = L.h, d = b.buf.data, l = b.lbuf.data;
    const [mx, my, mr] = L.moon, drop = L.horizon - my + mr + 8;
    // heights: 1 = in its place, 0 = below the ridges. The moon follows the sun a beat later.
    const sun = toN ? 1 - sm(p, 0, .75) : sm(p, .05, .8), moon = toN ? sm(p, .4, 1) : 1 - sm(p, 0, .45);
    const sx = mx + (1 - sun) * W * .03, sy = my + (1 - sun) * drop, gl = sm(sun, .02, 1), mid = gl * (1 - gl) * 4, warm = Math.sin(Math.PI * Math.min(1, sun * 1.2));
    const R = W * .8, near = (x, y) => Math.max(0, 1 - Math.hypot(x - sx, (y - sy) * 1.5) / R);
    const litAt = (x, y, n = near(x, y)) => Math.min(1, Math.max(0, gl + (n * n * .9 - (1 - n) * .35) * mid));
    const lv = (v, bay, n) => Math.min(1, Math.floor(v * n + bay) / n);
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
      const i = (y * W + x) * 4, bay = (BY[y % 4][x % 4] + .5) / 16, n = near(x, y);
      const s = lv(litAt(x, y, n), bay, 12), tw = lv(warm * n ** 1.5 * (1 - s * .5) * .6 * (.4 + .6 * Math.min(1, y / L.horizon)), bay, 6);
      for (let c = 0; c < 3; c++) { const v = Nt.sky[i + c] + (Dy.sky[i + c] - Nt.sky[i + c]) * s; d[i + c] = v + (WARM[c] - v) * tw; }
      d[i + 3] = 255;
      if (Dy.land[i + 3]) {
        const ls = lv(Math.min(1, Math.max(0, gl + (n * .6 - .2) * mid)), bay, 10), lw = lv(warm * n * .35 * (1 - ls * .4), bay, 5);
        for (let c = 0; c < 3; c++) { const v = Nt.land[i + c] + (Dy.land[i + c] - Nt.land[i + c]) * ls; l[i + c] = v + (WARM[c] - v) * lw; }
        l[i + 3] = 255;
      } else l[i + 3] = 0;
    }
    // sky, then stars where it is dark enough, the moon and sun, then the land on top so they set and rise behind the ridges
    b.g.putImageData(b.buf, 0, 0);
    Nt.S.stars.forEach((s, j) => { if (litAt(s.x, s.y) < .4 - hash(j + 1) * .3) b.P.p(s.x, s.y, s.c); });
    orb(b.P, 'night', Math.round(mx - (1 - moon) * W * .05), Math.round(my + (1 - moon) * drop), mr);
    orb(b.P, 'morning', Math.round(sx), Math.round(sy), mr);
    b.lc.getContext('2d').putImageData(b.lbuf, 0, 0); b.g.drawImage(b.lc, 0, 0);
  };

  const drawScene = (L, b, mode, t) => {
    const { S, P, g, out, B } = b, night = mode === 'night', pal = SPAL[mode], W = L.w;
    const tr = TRANS && TRANS.to === mode && t - TRANS.t0 < TRANS.D;
    if (tr) blend(L, b, Math.max(0, (t - TRANS.t0) / TRANS.D)); else g.drawImage(S.canvas, 0, 0);
    if (night) {
      if (!tr) S.stars.forEach(s => { const q = Math.sin(t * .0021 * s.sp + s.ph); P.p(s.x, s.y, q > .35 ? s.c : s.d); if (s.big && q > .85) { P.p(s.x - 1, s.y, s.d); P.p(s.x + 1, s.y, s.d); P.p(s.x, s.y - 1, s.d); P.p(s.x, s.y + 1, s.d); } });
      L.halos.forEach(([hx, hy], i) => P.r(hx, hy, 2, 2, Math.sin(t * .0024 + i * 1.7) > -.2 ? '#FFF4C8' : '#E9C46A'));
      if (L.galaxy) { const [gx, gy, gs] = L.galaxy, th0 = (t * .0016) % (Math.PI * 4.2); for (let arm = 0; arm < 2; arm++) for (let k = 0; k < 6; k++) { const th = (th0 + k * .06) % (Math.PI * 4.2), rr = (1.5 + th * 1.12) * gs, a = th + arm * Math.PI; P.p(gx + Math.cos(a) * rr, gy + Math.sin(a) * rr * .8, '#5266B8'); } }
      S.windows.forEach(([x, y], i) => P.p(x, y, Math.sin(t * .0013 + i * 2.3) > -.6 ? '#FFCF6B' : '#C98A3B'));
    } else {
      L.birds.forEach(([bx, by], k) => { const span = W * .22, x = Math.round(bx - ((t * .003 + k * 9) % span)), y = by + Math.round(Math.sin(t * .001 + k) * 1.5), up = Math.floor(t / 280 + k) % 2; P.p(x, y, '#4A4560'); if (up) { P.p(x - 1, y - 1, '#4A4560'); P.p(x + 1, y - 1, '#4A4560'); } else { P.p(x - 1, y, '#4A4560'); P.p(x + 1, y, '#4A4560'); } });
    }
    const [mx] = L.moon, tt = t * .0022;
    S.water.forEach(([x, y, refl]) => {
      if (Math.abs(x - mx) <= 1 + (y % 4 === 0 ? 1 : 0)) { if (BY[y % 4][(x + Math.floor(t / 180)) % 4] < 4) P.p(x, y, night ? (y % 2 ? pal.refl : pal.refl2) : (y % 2 ? '#FFF1CF' : '#FFFFFF')); return; }
      // firelight flickering on the water near the fire
      if (night && Math.abs(x - S.fx) < 12) { const near = 1 - Math.abs(x - S.fx) / 12, h = hash(x * 3.7 + y * 1.3 + Math.floor(t / 140)); if (h > .9 - .2 * near) { P.p(x, y, h > .965 ? '#FFC36B' : '#B4643F'); return; } }
      const s = Math.sin(x * .45 + y * 1.7 - tt);
      if (s > (night ? .94 : .995 - .06 * bump(x, mx, W * .16))) P.p(x, y, night ? (refl ? pal.shore : pal.waterHi) : pal.refl);
      else if (night && !refl && hash(x * 7.7 + y * 3.3) > .985 && Math.sin(t * .003 + x) > .3) P.p(x, y, pal.refl2);
    });
    if (!night) {
      const [y0, y1] = L.mist, mid = (y0 + y1) / 2, half = (y1 - y0) / 2, off = Math.floor(t * .004);
      for (let y = y0; y <= y1; y++) { const fall = 1 - Math.abs(y - mid) / half; for (let x = 0; x < W; x++) { if (y >= S.nearY(x) || L.trees.some(([tx, th]) => Math.abs(x - tx) <= th * .3 + 2)) continue; const dens = fall * (1.4 + 1.8 * Math.sin(x * .05 + t * .0004 + y * .3)) * (S.wet[y * W + x] ? .4 : 1); if (BY[y % 4][(x + off) % 4] + 1 < dens) P.p(x, y, pal.mist); } }
    }
    // chimney smoke from the village houses
    S.windows.forEach(([wx, wy], i) => { for (let k = 0; k < 4; k++) { const ph = (t * .0003 + k / 4 + i * .37) % 1; P.p(wx + 3 + Math.round(Math.sin(ph * 4 + i) * ph * 2 + ph * 3), wy - 4 - Math.round(ph * 9), night ? (ph < .5 ? '#55508A' : '#3A3566') : (ph < .5 ? '#FBF6F2' : '#EDE3EA')); } });
    if (night) {
      // fireflies by the trees
      const span = Math.max(20, W - S.fx - 34);
      for (let k = 0; k < 8; k++) { const x = Math.round(S.fx + 30 + (k * 37 % span) + Math.sin(t * .0007 + k * 2) * 6); if (x < 0 || x >= W) continue; const y = Math.round(S.nearY(x) - 3 - (k % 4) * 3 + Math.sin(t * .0011 + k) * 2), b = Math.sin(t * .004 + k * 1.9); if (b > .2) { P.p(x, y, b > .7 ? '#F2FFB0' : '#A9C25A'); if (b > .7) [[1, 0], [-1, 0], [0, 1], [0, -1]].forEach(([u, v]) => P.p(x + u, y + v, '#4F6A3A')); } }
      // pixel shooting stars queued by scene.shoot
      S.shots = (S.shots || []).filter(s => t - s.t0 < 800);
      S.shots.forEach(s => { const p = (t - s.t0) / 800, hx = s.x - p * 50, hy = s.y + p * 21; for (let i = 0; i < 22; i++) { const a = i / 22; if (a > 1.2 - p) continue; P.p(Math.round(hx + i), Math.round(hy - i * .42), i === 0 ? '#FFFFFF' : a < .25 ? '#FFE9A8' : a < .6 ? '#C9C2E6' : '#5C5590'); } });
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
    let L, built = {}, mode = document.documentElement.dataset.theme === 'light' ? 'morning' : 'night', bothUntil = 0, vis = true, last = 0, dnT;
    const setup = () => {
      L = SCENE[phone.matches ? 'm' : 'd']; built = {};
      const B = L.k > 1 ? 4 : 1;
      const px = c => c.getContext('2d').getImageData(0, 0, L.w, L.h).data;
      Object.entries(cvs).forEach(([m, cv]) => { cv.width = L.w * B; cv.height = L.h * B; const g = mk(L.w, L.h).getContext('2d'); built[m] = { S: buildScene(L, m), g, P: PX(g), out: cv.getContext('2d'), B, night: m === 'night' }; });
      if (!reduce) Object.entries(built).forEach(([m, b]) => Object.assign(b, { sky: px(buildScene(L, m, 'sky')), land: px(buildScene(L, m, 'land').canvas), other: built[m === 'night' ? 'morning' : 'night'], buf: b.g.createImageData(L.w, L.h), lbuf: b.g.createImageData(L.w, L.h), lc: mk(L.w, L.h) }));
      paint(reduce ? 2400 : performance.now(), true);
    };
    const paint = (t, all) => Object.entries(built).forEach(([m, b]) => { if (all || m === mode || t < bothUntil) drawScene(L, b, m, t); });
    phone.addEventListener('change', setup);
    watch(box, v => { vis = v; });
    setup();
    // ~60fps while the sky changes, ~16fps otherwise
    const loop = t => { if (!reduce && vis && t - last > (TRANS && t - TRANS.t0 < TRANS.D ? 14 : 60)) { last = t; paint(t, false); } requestAnimationFrame(loop); };
    requestAnimationFrame(loop);
    return { shoot: (fx, fy) => { const S = built.night.S; (S.shots ||= []).push({ x: fx * L.w, y: fy * L.h, t0: performance.now() }); }, setMode: m => {
      if (m === mode) return; mode = m;
      if (reduce) { bothUntil = performance.now() + 1200; paint(2400, true); return; }
      // the canvases swap instantly; the animation itself plays out on the new one
      const r = document.documentElement; TRANS = { to: m, t0: performance.now(), D: 3200 };
      r.classList.add('dn'); paint(TRANS.t0, false); clearTimeout(dnT); dnT = setTimeout(() => r.classList.remove('dn'), 100);
    } };
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
    else { P.r(0, 0, 24, 9, '#C9D8EA'); P.r(0, 9, 24, 3, '#E9E0D2'); P.r(0, 16, 24, 8, '#B9B0CC'); }
    for (let y = 17; y < 24; y++) { const w = Math.min(11, Math.round(6 + (y - 17) * 1.3)); P.r(12 - w, y, w * 2, 1, C.shirt); P.r(12 + w - 3, y, 3, 1, C.shirtDark); }
    P.r(10, 14, 4, 4, '#A9744E'); P.p(9, 17, C.shirtDark); P.p(14, 17, C.shirtDark); P.r(10, 18, 4, 1, C.shirtDark);
    P.r(8, 5, 8, 1, C.skin); P.r(7, 6, 10, 8, C.skin); P.r(8, 14, 8, 1, C.skin); P.r(9, 15, 6, 1, C.skin);
    P.r(15, 9, 2, 5, '#B47C55'); P.r(14, 14, 2, 1, '#B47C55');
    P.r(9, 2, 6, 1, C.hair); P.r(7, 3, 10, 1, C.hair); P.r(6, 4, 12, 2, C.hair); P.r(6, 6, 3, 1, C.hair); P.r(15, 6, 3, 1, C.hair); P.p(10, 6, C.hair); P.p(12, 6, C.hair); P.r(6, 7, 1, 4, C.hair); P.r(17, 7, 1, 4, C.hair);
    [[9, 3], [8, 4], [12, 3], [11, 4], [15, 3], [14, 4]].forEach(([x, y]) => P.p(x, y, '#4A3540'));
    // wavy mullet falling behind the neck, the ends flicking out over the shoulders
    [[5, 12, 2], [5, 13, 2], [6, 14, 2], [7, 15, 2], [7, 16, 3], [7, 17, 2], [6, 18, 1]].forEach(([x, y, w]) => { P.r(x, y, w, 1, C.hair); P.r(24 - x - w, y, w, 1, C.hair); });
    [[6, 13], [8, 16], [17, 13], [15, 16]].forEach(([x, y]) => P.p(x, y, '#4A3540'));
    P.r(8, 8, 3, 1, C.hair); P.r(13, 8, 3, 1, C.hair);
    P.r(9, 10, 2, 1, '#1A1420'); P.r(13, 10, 2, 1, '#1A1420');
    P.p(12, 11, '#A9744E');
    // short beard with a moustache
    P.r(7, 11, 1, 3, C.beard); P.r(10, 12, 4, 1, C.beard); P.r(8, 13, 3, 1, C.beard); P.r(13, 13, 3, 1, C.beard); P.r(8, 14, 8, 1, C.beard); P.r(9, 15, 6, 1, C.beard);
    P.r(16, 11, 1, 3, C.beardDark); P.p(15, 13, C.beardDark); P.r(14, 14, 2, 1, C.beardDark); P.p(14, 15, C.beardDark);
    P.r(11, 13, 2, 1, '#8E4E42');
    P.r(8, 1, 8, 1, C.band); P.r(6, 2, 2, 1, C.band); P.r(16, 2, 2, 1, C.band); P.r(5, 3, 1, 4, C.band); P.r(18, 3, 1, 4, C.band);
    P.r(4, 7, 3, 5, C.cup); P.r(17, 7, 3, 5, C.cup); P.r(6, 8, 1, 3, '#B8862E'); P.r(17, 8, 1, 3, '#B8862E'); P.p(4, 7, '#FFE09A'); P.p(17, 7, '#FFE09A');
    if (night) P.r(7, 7, 1, 4, C.skinLit);
  };
  drawBust($('portrait'), document.documentElement.dataset.theme);



  const wins = [...document.querySelectorAll('.nav a')], secs = ['about', 'work', 'services', 'contact'].map(id => $(id)), tm = document.querySelector('.topbar');
  const spy = () => {
    let cur = ''; secs.forEach(s => { if (s.getBoundingClientRect().top < innerHeight * .4) cur = s.id; });
    wins.forEach(a => { const on = a.dataset.sec === cur; a.classList.toggle('on', on); if (on) a.setAttribute('aria-current', 'location'); else a.removeAttribute('aria-current'); });
    tm.classList.toggle('scrolled', scrollY > 8);
  };
  addEventListener('scroll', spy, { passive: true }); spy();
  const root = document.documentElement, themeBtn = $('themeBtn'), sysLight = matchMedia('(prefers-color-scheme: light)');
  const applyTheme = t => {
    root.dataset.theme = t;
    $('themeColor').content = t === 'light' ? '#FFFFFF' : '#0B0B10';
    themeBtn.setAttribute('aria-label', t === 'light' ? 'Switch to dark mode' : 'Switch to light mode');
    scene.setMode(t === 'light' ? 'morning' : 'night'); drawBust($('portrait'), t); drawMailbox(t); drawHireArt(t);
  };
  const saved = () => { try { return localStorage.getItem('theme'); } catch (e) { return null; } };
  applyTheme(root.dataset.theme === 'light' ? 'light' : 'dark');
  themeBtn.addEventListener('click', () => { const t = root.dataset.theme === 'light' ? 'dark' : 'light'; applyTheme(t); try { localStorage.setItem('theme', t); } catch (e) { } });
  sysLight.addEventListener('change', e => { if (!saved()) applyTheme(e.matches ? 'light' : 'dark'); });

  // cards fade up as they scroll into view; anything already on screen at load is left alone
  if (!reduce && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver(es => {
      let k = 0;
      es.forEach(e => {
        if (!e.isIntersecting) return;
        const el = e.target; io.unobserve(el);
        const done = ev => { if (ev.target !== el || ev.propertyName !== 'transform') return; el.removeEventListener('transitionend', done); el.classList.remove('rv', 'in'); el.style.removeProperty('--d'); };
        el.addEventListener('transitionend', done);
        el.style.setProperty('--d', Math.min(k++, 4) * 70 + 'ms'); el.classList.add('in');
      });
    }, { rootMargin: '0px 0px -6% 0px' });
    document.querySelectorAll('.h2, .tile, .after, .side-h').forEach(el => {
      if (el.getBoundingClientRect().top < innerHeight) return;
      el.classList.add('rv'); io.observe(el);
    });
  }


  const copyBtn = $('copyMail'), copyLabel = copyBtn.querySelector('span'), copyStatus = $('copyStatus');
  let copyT;
  copyBtn.addEventListener('click', async () => {
    const v = copyBtn.dataset.copy;
    let ok = false;
    try { await navigator.clipboard.writeText(v); ok = true; } catch (e) {
      const t = document.createElement('textarea'); t.value = v; t.setAttribute('readonly', ''); t.style.cssText = 'position:fixed;opacity:0'; document.body.append(t); t.select();
      try { ok = document.execCommand('copy'); } catch (e2) { }
      t.remove();
    }
    copyBtn.classList.toggle('ok', ok); copyLabel.textContent = ok ? 'Copied' : 'Copy failed';
    copyStatus.textContent = ok ? 'Email address copied' : `Couldn’t copy. The address is ${v}`;
    clearTimeout(copyT); copyT = setTimeout(() => { copyBtn.classList.remove('ok'); copyLabel.textContent = 'Copy'; copyStatus.textContent = ''; }, 2200);
  });

  // Local time chip: Dehradun time and a guess at what I'm doing
  const clock = $('localTime');
  const tick = () => {
    const d = new Date(), h = +d.toLocaleString('en-GB', { timeZone: 'Asia/Kolkata', hour: '2-digit', hour12: false }) % 24;
    const t = d.toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata', hour: 'numeric', minute: '2-digit' }).toLowerCase();
    clock.textContent = `Dehradun · ${t} · ${h < 6 ? 'asleep (or debugging)' : h < 9 ? 'morning chai' : h < 19 ? 'shipping code' : 'under the stars'}`;
  };
  tick(); setInterval(tick, 30000);

  // Ask-me bubble on the portrait
  const askBtn = $('askBtn'), bub = $('bubble'), ans = bub.querySelector('.a'), qs = bub.querySelectorAll('.qs button');
  const setOpen = o => { bub.hidden = !o; askBtn.setAttribute('aria-expanded', o); };
  askBtn.addEventListener('click', () => setOpen(bub.hidden));
  let typing;
  qs.forEach(b => b.addEventListener('click', () => {
    qs.forEach(x => x.setAttribute('aria-pressed', x === b));
    const s = b.dataset.a; clearInterval(typing);
    if (reduce) { ans.textContent = s; return; }
    let n = 0; typing = setInterval(() => { ans.textContent = s.slice(0, ++n); if (n >= s.length) clearInterval(typing); }, 14);
  }));
  addEventListener('keydown', e => { if (e.key === 'Escape' && !bub.hidden) { setOpen(false); askBtn.focus(); } });
  document.addEventListener('click', e => { if (!bub.hidden && !e.target.closest('.ask')) setOpen(false); });

  // Now strip: tonight's real moon phase
  console.assert(Math.min(moonAge(Date.UTC(2024, 3, 8, 18, 21)), LUN - moonAge(Date.UTC(2024, 3, 8, 18, 21))) < 1, 'new moon 8 Apr 2024');
  console.assert(Math.abs(moonAge(Date.UTC(2024, 8, 18, 2, 34)) - LUN / 2) < 1, 'full moon 18 Sep 2024');
  const age = moonAge(Date.now()), ang = 2 * Math.PI * age / LUN, lit = Math.round((1 - Math.cos(ang)) / 2 * 100);
  const phase = ['New moon', 'Waxing crescent', 'First quarter', 'Waxing gibbous', 'Full moon', 'Waning gibbous', 'Last quarter', 'Waning crescent'][Math.round(age / LUN * 8) % 8];
  $('moonText').textContent = `${phase}, ${lit}% lit`;
  $('moon').setAttribute('aria-label', `${phase}, ${lit}% lit`);
  const px14 = (cv, fn) => { const g = cv.getContext('2d'); for (let y = 0; y < 14; y++) for (let x = 0; x < 14; x++) { const c = fn(x, y); if (c) { g.fillStyle = c; g.fillRect(x, y, 1, 1); } } };
  px14($('moon'), (x, y) => {
    const nx = (x - 6.5) / 6, ny = (y - 6.5) / 6; if (nx * nx + ny * ny > 1) return;
    const t = Math.sqrt(1 - ny * ny) * Math.cos(ang), on = age < LUN / 2 ? nx > t : nx < -t;
    return on ? ((x * 7 + y * 3) % 11 === 0 ? '#E3D9B8' : '#FFF3C9') : '#3A3558';
  });
  const PXI = {
    build: (x, y) => (y > 9 && y < 13 && x > 1 && x < 12) ? '#5D5396' : (y > 2 && y < 10 && x > 3 && x < 10) ? ((x + y) % 2 ? '#7FD1B9' : '#5FA36A') : null,
    pin: (x, y) => { const d = Math.hypot(x - 6.5, y - 5); return d < 2 ? '#EFE6D8' : d < 4.5 ? '#EDBE6C' : (y > 7 && y < 13 && Math.abs(x - 6.5) < (13 - y) / 2.2) ? '#B8862E' : null; }
  };
  document.querySelectorAll('canvas[data-px]').forEach(c => px14(c, PXI[c.dataset.px]));

  // Shooting stars: click the sky or press S; one drifts by on its own at night
  const sky = $('home');
  const shoot = (x, y) => {
    if (reduce) return;
    const r = sky.getBoundingClientRect();
    // night: drawn into the pixel scene; morning: a soft CSS streak
    if (root.dataset.theme === 'dark') { scene.shoot((x ?? r.width * (.35 + Math.random() * .6)) / r.width, (y ?? r.height * (.05 + Math.random() * .3)) / r.height); return; }
    const s = document.createElement('i');
    s.className = 'shoot';
    s.style.left = (x ?? r.width * (.35 + Math.random() * .6)) + 'px';
    s.style.top = (y ?? r.height * (.05 + Math.random() * .3)) + 'px';
    sky.append(s); s.addEventListener('animationend', () => s.remove());
  };
  sky.addEventListener('click', e => { const r = sky.getBoundingClientRect(); shoot(e.clientX - r.left, e.clientY - r.top); });
  addEventListener('keydown', e => { if (e.key.toLowerCase() === 's' && !e.metaKey && !e.ctrlKey && !/INPUT|TEXTAREA/.test(document.activeElement.tagName)) shoot(); });
  setInterval(() => { if (root.dataset.theme === 'dark' && !document.hidden && sky.getBoundingClientRect().bottom > 0) shoot(); }, 14000);

})();

// Polished cards: a soft light follows the cursor
document.querySelectorAll('.tile').forEach(t => t.addEventListener('pointermove', e => { const r = t.getBoundingClientRect(); t.style.setProperty('--mx', e.clientX - r.left + 'px'); t.style.setProperty('--my', e.clientY - r.top + 'px'); }));

// Personality: rotating hero line, greeting, notes, kickers, keyboard shortcuts
{
  const $ = s => document.querySelector(s), root = document.documentElement, reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1 · rotating hero line
  const sub = $('.hero .sub');
  sub.innerHTML = 'Full-stack developer. I build <span class="rot" aria-hidden="true"></span><span class="sr-only">websites, apps, business software and anything that makes life a bit easier.</span>';
  const words = ['websites.', 'apps.', 'business software.', 'things that make life a bit easier.'], rot = sub.querySelector('.rot');
  if (reduce) rot.textContent = words[3];
  else {
    let w = 0, n = 0, dir = 1;
    const step = () => {
      const s = words[w]; n += dir; rot.textContent = s.slice(0, n);
      let wait = dir > 0 ? 55 : 28;
      if (dir > 0 && n === s.length) { dir = -1; wait = w === 3 ? 3600 : 1600; }
      else if (dir < 0 && n === 0) { dir = 1; w = (w + 1) % words.length; wait = 300; }
      setTimeout(step, wait);
    };
    step();
  }

  // 2 · greeting by the visitor's own time
  const h = new Date().getHours(), hi = $('.card h2');
  hi.textContent = (h < 5 ? 'Up late? ' : h < 12 ? 'Good morning, ' : h < 17 ? 'Good afternoon, ' : 'Good evening, ') + 'I’m Akhilesh.';

  // 3 · handwritten notes
  $('#home').insertAdjacentHTML('beforeend', '<span class="doodle d-me" aria-hidden="true">me, mid-bugfix<svg viewBox="0 0 52 40"><path d="M2 4c20 0 36 10 44 30"/><path d="M38 29l8 5 2-9"/></svg></span>');
  $('.ask').insertAdjacentHTML('beforeend', '<span class="doodle d-tap" aria-hidden="true">psst, tap me<svg viewBox="0 0 40 26"><path d="M2 22c14 0 26-8 32-20"/><path d="M27 5l7-3 1 8"/></svg></span>');

  // 4 · section kickers (sample lines)
  $('#work-h').insertAdjacentHTML('afterend', '<p class="kick">Real software, real users, zero buzzwords.</p>');
  $('#services-h').insertAdjacentHTML('afterend', '<p class="kick">You bring the messy problem. I bring it <b>to life</b>.</p>');

  // 5 · keyboard shortcuts
  const keys = $('#keys');
  const toggleKeys = o => { keys.hidden = !o; if (o) keys.querySelector('div').focus?.(); };
  keys.addEventListener('click', e => { if (e.target === keys) toggleKeys(false); });
  addEventListener('keydown', e => {
    if (e.metaKey || e.ctrlKey || e.altKey || /INPUT|TEXTAREA/.test(document.activeElement.tagName)) return;
    const k = e.key.toLowerCase();
    if (k === '?') toggleKeys(keys.hidden);
    else if (k === 'escape') toggleKeys(false);
    else if (k === 't') $('#themeBtn').click();
    else if (k === 'a') { $('#about').scrollIntoView({ behavior: 'smooth', block: 'center' }); $('#askBtn').click(); }
    else if (k === 'w') $('#work').scrollIntoView({ behavior: 'smooth' });
    else if (k === 'r') location.href = 'Akhilesh_Rawat_Resume.pdf';
  });

}

// Clickable pixel world and secrets
{
  const $ = s => document.querySelector(s), hero = $('#home'), reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // secrets: found by exploring
  const SECRETS = [
    ['me', 'Say hi to tiny me', 'Night owl'],
    ['fire', 'Poke the campfire', 'Pyromaniac (the safe kind)'],
    ['obs', 'Use the telescope', 'Stargazer'],
    ['wish', 'Make a wish (click the sky or press S)', 'Wishful thinker'],
    ['keys', 'Press ? for the developer menu', 'Power user'],
    ['chai', 'Type “chai” anywhere', 'Chai connoisseur'],
  ];
  let got = new Set();
  try { got = new Set(JSON.parse(localStorage.getItem('secrets') || '[]')); } catch (e) {}
  const save = () => { try { localStorage.setItem('secrets', JSON.stringify([...got])); } catch (e) {} };

  // a tiny pixel trophy for toasts
  const trophy = cv => { const g = cv.getContext('2d'), M = ['..XXXXXX..', '.XXYYYYXX.', 'XX.YYYY.XX', 'X..YYYY..X', '.X.YYYY.X.', '...YYYY...', '....YY....', '....YY....', '...XXXX...', '..XXXXXX..'];
    M.forEach((r, y) => [...r].forEach((c, x) => { if (c !== '.') { g.fillStyle = c === 'X' ? '#E9AE45' : '#FFE09A'; g.fillRect(x + 3, y + 3, 1, 1); } })); };
  let toastT;
  const toast = html => {
    document.querySelector('.toast8')?.remove(); clearTimeout(toastT);
    const t = document.createElement('div'); t.className = 'toast8'; t.setAttribute('role', 'status');
    t.innerHTML = '<canvas width="16" height="16"></canvas><div>' + html + '</div>'; document.body.append(t); trophy(t.firstChild);
    toastT = setTimeout(() => t.remove(), 4200);
  };
  const find = id => {
    if (got.has(id)) return; got.add(id); save(); render();
    const s = SECRETS.find(x => x[0] === id), n = got.size;
    if (n === SECRETS.length) toast(`<small>All ${n} secrets found</small>You explored everything. Clearly we’d work well together. <a href="#contact">Say hi →</a>`);
    else toast(`<small>Secret ${n} of ${SECRETS.length}</small>${s[2]}`);
    document.querySelector('.s-' + id)?.classList.add('found');
  };

  // secrets list inside the ? menu
  const menu = $('#keys > div');
  menu.insertAdjacentHTML('beforeend', '<div class="secrets"><b id="secCount"></b><div class="secret-bar"><i id="secBar"></i></div><ul id="secList"></ul></div>');
  const render = () => {
    $('#secCount').textContent = `Secrets found: ${got.size} / ${SECRETS.length}`;
    $('#secBar').style.width = got.size / SECRETS.length * 100 + '%';
    $('#secList').innerHTML = SECRETS.map(([id, hint]) => `<li class="${got.has(id) ? 'got' : ''}">${got.has(id) ? hint : '???'}</li>`).join('');
  };
  render();
  new MutationObserver(() => { if (!$('#keys').hidden) find('keys'); }).observe($('#keys'), { attributes: true, attributeFilter: ['hidden'] });

  // clickable spots
  const say = (spot, lines) => {
    hero.querySelector('.say8')?.remove();
    const r = hero.getBoundingClientRect(), s = spot.getBoundingClientRect(), b = document.createElement('div');
    b.className = 'say8'; b.textContent = lines[Math.floor(Math.random() * lines.length)];
    b.style.left = Math.min(Math.max(s.left - r.left + s.width / 2, 120), r.width - 120) + 'px'; b.style.top = s.top - r.top - 10 + 'px';
    hero.append(b); setTimeout(() => b.remove(), 3200);
  };
  const ME = ['Hi! Pull up a rock, the fire’s warm.', 'One more commit, then sleep. Probably.', 'It works on my laptop. And my laptop is in the mountains.', 'Chai number four today. Don’t judge.', 'Shh, I’m teaching a spreadsheet to behave.', 'Psst. The telescope does something.', 'Pro tip: press ? on your keyboard.'];
  const OBS = ['Telescope says: incoming wishes ✨', 'Scanning the sky for bugs… none found.', 'Saturn says hi.'];
  hero.insertAdjacentHTML('beforeend', SECRETS.slice(0, 3).map(([id, hint]) => `<button type="button" class="spot s-${id}${got.has(id) ? ' found' : ''}" aria-label="${hint}"></button>`).join(''));
  hero.querySelector('.s-me').addEventListener('click', e => { e.stopPropagation(); say(e.currentTarget, ME); find('me'); });
  hero.querySelector('.s-fire').addEventListener('click', e => {
    e.stopPropagation(); find('fire'); if (reduce) return;
    const r = hero.getBoundingClientRect(), s = e.currentTarget.getBoundingClientRect(), cx = s.left - r.left + s.width / 2, cy = s.top - r.top + s.height * .5;
    for (let i = 0; i < 18; i++) { const p = document.createElement('i'); p.className = 'spark'; p.style.left = cx + 'px'; p.style.top = cy + 'px'; p.style.background = ['#FFE7A8', '#FFB347', '#E9893A', '#C8452F'][i % 4]; p.style.setProperty('--dx', (Math.random() - .5) * 120 + 'px'); p.style.setProperty('--dy', -40 - Math.random() * 120 + 'px'); p.style.animationDelay = Math.random() * .15 + 's'; hero.append(p); p.addEventListener('animationend', () => p.remove()); }
  });
  hero.querySelector('.s-obs').addEventListener('click', e => {
    e.stopPropagation(); find('obs'); window.openScope?.();
  });

  // wish: the existing shooting-star triggers
  hero.addEventListener('click', e => { if (!e.target.closest('.spot')) find('wish'); });
  let buf = '';
  addEventListener('keydown', e => {
    if (!e.isTrusted || e.metaKey || e.ctrlKey || /INPUT|TEXTAREA/.test(document.activeElement.tagName)) return;
    if (e.key.toLowerCase() === 's') find('wish');
    buf = (buf + e.key.toLowerCase()).slice(-4);
    if (buf === 'chai') { find('chai'); if (got.size < SECRETS.length) setTimeout(() => toast('<small>Chai refilled</small>Productivity +10%. Typing speed +20%. Sleep −1 hour.'), 4300); }
  });
}

// Real sky over Dehradun: constellations, planets, Moon, telescope, meteor showers
{
  const $ = s => document.querySelector(s), root = document.documentElement, R = Math.PI / 180;
  const LAT = 30.3165, LON = 78.0322; // Dehradun

  // Bright stars: [RA hours, Dec degrees, magnitude, colour?]. Lines join star indexes.
  const SKY = [
    { n: 'Orion', s: [[5.919, 7.41, .5, '#FFB98A'], [5.419, 6.35, 1.6], [5.679, -1.94, 1.8], [5.604, -1.2, 1.7], [5.533, -.3, 2.2], [5.796, -9.67, 2.1], [5.242, -8.2, .1, '#CFE0FF']],
      l: [[0, 1], [0, 2], [1, 4], [2, 3], [3, 4], [2, 5], [4, 6]], lab: [[0, 'Betelgeuse'], [6, 'Rigel']],
      f: 'The hunter. Betelgeuse, his red shoulder, is so huge that if it sat where our Sun is, it would swallow everything out past Mars.' },
    { n: 'The Big Dipper (Saptarishi)', s: [[11.062, 61.75, 1.8], [11.031, 56.38, 2.4], [11.897, 53.69, 2.4], [12.257, 57.03, 3.3], [12.9, 55.96, 1.8], [13.399, 54.93, 2.2], [13.792, 49.31, 1.9]],
      l: [[0, 1], [1, 2], [2, 3], [3, 0], [3, 4], [4, 5], [5, 6]], lab: [[0, 'Dubhe']],
      f: 'In India these are the Saptarishi, the seven sages. Follow the two stars at the end of the bowl and they point straight to Polaris.' },
    { n: 'Cassiopeia', s: [[.153, 59.15, 2.3], [.675, 56.54, 2.2], [.945, 60.72, 2.2], [1.43, 60.24, 2.7], [1.907, 63.67, 3.4]],
      l: [[0, 1], [1, 2], [2, 3], [3, 4]], lab: [[1, 'Schedar']],
      f: 'The W-shaped queen. She sits opposite the Big Dipper around the North Star, so from Dehradun one of the two is almost always up.' },
    { n: 'Cygnus, the Northern Cross', s: [[20.69, 45.28, 1.3], [20.37, 40.26, 2.2], [19.512, 27.96, 3.1, '#FFD48A'], [20.77, 33.97, 2.5], [19.75, 45.13, 2.9]],
      l: [[0, 1], [1, 2], [4, 1], [1, 3]], lab: [[0, 'Deneb']],
      f: 'A swan flying down the Milky Way. Deneb, its tail, shines tens of thousands of times brighter than the Sun.' },
    { n: 'Lyra', s: [[18.616, 38.78, 0, '#DCE8FF'], [18.746, 37.61, 4.3], [18.835, 33.36, 3.5], [18.982, 32.69, 3.2], [18.908, 36.9, 4.3]],
      l: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 1]], lab: [[0, 'Vega']],
      f: 'Vega was the North Star about 12,000 years ago, and Earth’s slow wobble will make it the North Star again around the year 14,000.' },
    { n: 'Taurus and the Pleiades', s: [[4.599, 16.51, .9, '#FFB98A'], [4.33, 15.63, 3.6], [4.382, 17.54, 3.8], [4.477, 19.18, 3.5], [5.438, 28.61, 1.7], [5.627, 21.14, 3], [3.791, 24.11, 2.9, '#CFE0FF']],
      l: [[1, 2], [2, 3], [3, 4], [1, 0], [0, 5]], lab: [[0, 'Aldebaran'], [6, 'Pleiades']],
      f: 'That little cluster is the Pleiades: Krittika in Indian astronomy, and Subaru in Japan. Yes, the car logo.' },
    { n: 'Gemini', s: [[7.577, 31.89, 1.6], [7.755, 28.03, 1.1, '#FFD48A'], [6.383, 25.13, 3], [7.335, 21.98, 3.5], [6.629, 16.4, 1.9]],
      l: [[0, 1], [0, 2], [1, 3], [3, 4]], lab: [[0, 'Castor'], [1, 'Pollux']],
      f: 'The twins. Castor looks like one star, but a telescope shows it is actually six stars orbiting each other.' },
    { n: 'Leo', s: [[10.14, 11.97, 1.4], [10.122, 16.76, 3.5], [10.333, 19.84, 2.1], [10.278, 23.42, 3.4], [9.764, 23.77, 3], [11.235, 20.52, 2.6], [11.818, 14.57, 2.1], [11.237, 15.43, 3.3]],
      l: [[0, 1], [1, 2], [2, 3], [3, 4], [2, 5], [5, 6], [6, 7], [7, 0]], lab: [[0, 'Regulus']],
      f: 'The lion. Every November the Leonid meteors seem to fly out of his mane.' },
    { n: 'Scorpius', s: [[16.091, -19.81, 2.6], [16.006, -22.62, 2.3], [15.981, -26.11, 2.9], [16.49, -26.43, 1, '#FF9A7A'], [16.598, -28.22, 2.8], [16.836, -34.29, 2.3], [16.865, -38.05, 3], [16.91, -42.36, 3.6], [17.203, -43.24, 3.3], [17.622, -43, 1.9], [17.793, -40.13, 3], [17.708, -39.03, 2.4], [17.56, -37.1, 1.6]],
      l: [[0, 1], [1, 2], [1, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9], [9, 10], [10, 11], [11, 12]], lab: [[3, 'Antares']],
      f: 'Antares, the scorpion’s red heart, means “rival of Mars”: the two are often mistaken for each other.' },
    { n: 'The Great Square of Pegasus', s: [[23.079, 15.21, 2.5], [23.063, 28.08, 2.4, '#FFC9A0'], [.14, 29.09, 2.1], [.22, 15.18, 2.8]],
      l: [[0, 1], [1, 2], [2, 3], [3, 0]], lab: [[2, 'Alpheratz']],
      f: 'Hop two stars up from its corner and you can find the Andromeda galaxy: 2.5 million light-years away, the farthest thing your eyes can see.' },
    { n: 'Canis Major', s: [[6.752, -16.72, -1.5, '#E6F0FF'], [6.378, -17.96, 2], [7.14, -26.39, 1.8], [6.977, -28.97, 1.5], [7.401, -29.3, 2.4]],
      l: [[1, 0], [0, 2], [2, 3], [2, 4]], lab: [[0, 'Sirius']],
      f: 'Sirius is the brightest star in the night sky, and one of the closest: its light left only 8.6 years ago.' },
    { n: 'The Little Dipper', s: [[2.53, 89.26, 2], [17.537, 86.59, 4.4], [16.766, 82.04, 4.2], [15.734, 77.79, 4.3], [14.845, 74.16, 2.1, '#FFC9A0'], [15.345, 71.83, 3], [16.292, 75.76, 5]],
      l: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 3]], lab: [[0, 'Polaris'], [4, 'Kochab']],
      f: 'Polaris sits at the tip of its handle. Unlike every other star, it stays put all night while the whole sky wheels around it.' },
    { n: 'Boötes', s: [[14.261, 19.18, -.1, '#FFC08A'], [14.75, 27.07, 2.4], [15.258, 33.31, 3.5], [15.032, 40.39, 3.5], [14.535, 38.31, 3], [14.53, 30.37, 3.6], [13.911, 18.4, 2.7]],
      l: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0], [0, 6]], lab: [[0, 'Arcturus']],
      f: 'Arcturus, the orange star at the bottom of this kite, is the brightest star north of the celestial equator.' },
    { n: 'Virgo', s: [[13.42, -11.16, 1, '#D6E4FF'], [12.694, -1.45, 2.7], [12.927, 3.4, 3.4], [13.036, 10.96, 2.8], [11.845, 1.76, 3.6], [13.578, -.6, 3.4]],
      l: [[0, 1], [1, 2], [2, 3], [1, 4], [0, 5], [5, 2]], lab: [[0, 'Spica']],
      f: 'Spica is Chitra in Indian astronomy. Over 2,000 years ago Hipparchus used it to discover that Earth’s axis slowly wobbles.' },
    { n: 'Aquila', s: [[19.846, 8.87, .8], [19.771, 10.61, 2.7, '#FFC9A0'], [19.922, 6.41, 3.7], [19.425, 3.11, 3.4], [19.09, 13.86, 3], [20.188, -.82, 3.2]],
      l: [[1, 0], [0, 2], [0, 3], [1, 4], [2, 5]], lab: [[0, 'Altair']],
      f: 'Altair spins so fast, one turn in about nine hours, that it is squashed into an egg shape.' },
    { n: 'Sagittarius, the Teapot', s: [[18.097, -30.42, 3], [18.35, -29.83, 2.7], [18.466, -25.42, 2.8], [18.761, -26.99, 3.2], [18.921, -26.3, 2], [19.116, -27.67, 3.3], [19.044, -29.88, 2.6], [18.403, -34.38, 1.8]],
      l: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 0], [1, 7], [3, 6]], lab: [[7, 'Kaus Australis']],
      f: 'The teapot’s spout points at the centre of our galaxy, about 26,000 light-years away, where a giant black hole sits.' },
    { n: 'Auriga', s: [[5.278, 46, .1, '#FFE6A8'], [5.992, 44.95, 1.9], [5.995, 37.21, 2.6], [5.438, 28.61, 1.7], [4.95, 33.17, 2.7, '#FFC08A'], [5.032, 43.82, 3]],
      l: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0]], lab: [[0, 'Capella']],
      f: 'Capella looks like one golden star, but it is four: two pairs of stars orbiting each other.' },
    { n: 'Perseus', s: [[3.405, 49.86, 1.8], [3.136, 40.96, 2.1], [3.715, 47.79, 3], [3.08, 53.51, 2.9], [3.964, 40.01, 2.9], [3.902, 31.88, 2.9]],
      l: [[3, 0], [0, 2], [2, 4], [4, 5], [0, 1]], lab: [[0, 'Mirfak'], [1, 'Algol']],
      f: 'Algol, the “demon star”, visibly dims every 2.87 days when its dimmer companion passes in front of it.' },
    { n: 'Andromeda', s: [[.14, 29.09, 2.1], [.655, 30.86, 3.3], [1.162, 35.62, 2.1, '#FFB98A'], [2.065, 42.33, 2.2, '#FFD48A'], [.712, 41.27, 3.4, '#C9C2E6']],
      l: [[0, 1], [1, 2], [2, 3]], lab: [[0, 'Alpheratz'], [4, 'Andromeda galaxy']],
      f: 'That faint smudge is the Andromeda galaxy: a trillion stars, 2.5 million light-years away, the farthest thing your eyes can see.' },
    { n: 'Canis Minor', s: [[7.655, 5.22, .4, '#FFF4D8'], [7.453, 8.29, 2.9]],
      l: [[0, 1]], lab: [[0, 'Procyon']],
      f: 'Procyon means “before the dog”: it rises just before Sirius, the Dog Star.' },
    { n: 'Hercules', s: [[17.251, 36.81, 3.2], [16.714, 38.92, 3.5], [16.688, 31.6, 2.8], [17.005, 30.93, 3.9], [16.504, 21.49, 2.8]],
      l: [[0, 1], [1, 2], [2, 3], [3, 0], [2, 4]], lab: [[2, 'Keystone']],
      f: 'Along one side of the Keystone hides M13, a ball of several hundred thousand stars older than Earth.' },
    { n: 'Corona Borealis', s: [[15.464, 29.11, 3.7], [15.549, 31.36, 4.1], [15.578, 26.71, 2.2], [15.712, 26.3, 3.8], [15.827, 26.07, 4.6], [15.96, 26.88, 4.1]],
      l: [[1, 0], [0, 2], [2, 3], [3, 4], [4, 5]], lab: [[2, 'Alphecca']],
      f: 'The Northern Crown. Its brightest star, Alphecca, gets its name from Arabic for “the bright one of the broken ring”.' },
    { n: 'Aries', s: [[2.12, 23.46, 2, '#FFC9A0'], [1.911, 20.81, 2.6], [1.892, 19.29, 3.9]],
      l: [[0, 1], [1, 2]], lab: [[0, 'Hamal']],
      f: 'Over 2,000 years ago the Sun crossed into spring right here, which is why astronomers still call that spot the “first point of Aries”.' },
    { n: 'Capricornus', s: [[20.3, -12.54, 3.6], [20.35, -14.78, 3.1], [20.864, -26.92, 4.1], [21.444, -22.41, 3.7], [21.668, -16.66, 3.7], [21.784, -16.13, 2.9]],
      l: [[0, 1], [1, 2], [2, 3], [3, 5], [5, 4], [4, 1]], lab: [[5, 'Deneb Algedi']],
      f: 'One of the oldest constellations: the Babylonians drew it as a sea-goat over 3,000 years ago.' },
    { n: 'Cepheus', s: [[21.31, 62.59, 2.5], [21.478, 70.56, 3.2], [23.656, 77.63, 3.2], [22.828, 66.2, 3.5], [22.181, 58.2, 3.4, '#FFC08A']],
      l: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 0], [1, 3]], lab: [[0, 'Alderamin']],
      f: 'A star here, Delta Cephei, gave its name to Cepheids: the cosmic yardsticks that proved other galaxies exist.' },
  ];
  const POLARIS = { n: 'Polaris, the North Star', s: [[2.53, 89.26, 2]], l: [], lab: [[0, 'Polaris']],
    f: 'It barely moves all night while everything turns around it. From Dehradun it sits about 30° up, which is exactly your latitude.' };

  // sky maths: horizontal coordinates for Dehradun at a given time
  const jd = ms => ms / 864e5 + 2440587.5;
  const altAz = (raH, dec, ms) => {
    const lst = (280.46061837 + 360.98564736629 * (jd(ms) - 2451545) + LON) % 360, H = (lst - raH * 15) * R, d = dec * R, p = LAT * R;
    const alt = Math.asin(Math.sin(d) * Math.sin(p) + Math.cos(d) * Math.cos(p) * Math.cos(H));
    const az = Math.atan2(-Math.cos(d) * Math.sin(H), Math.sin(d) * Math.cos(p) - Math.cos(d) * Math.sin(p) * Math.cos(H));
    return [alt / R, (az / R + 360) % 360];
  };
  // low-precision Moon position (good to about a degree)
  const moonRaDec = ms => {
    const d = jd(ms) - 2451545, L = (218.316 + 13.176396 * d) * R, M = (134.963 + 13.064993 * d) * R, F = (93.272 + 13.22935 * d) * R;
    const lon = L + 6.289 * R * Math.sin(M), lat = 5.128 * R * Math.sin(F), e = 23.4397 * R;
    const ra = Math.atan2(Math.sin(lon) * Math.cos(e) - Math.tan(lat) * Math.sin(e), Math.cos(lon)), dec = Math.asin(Math.sin(lat) * Math.cos(e) + Math.cos(lat) * Math.sin(e) * Math.sin(lon));
    return [((ra / R + 360) % 360) / 15, dec / R];
  };
  // planets from NASA JPL's approximate Keplerian elements (Standish, valid 1800–2050):
  // [a, e, I, L, long. perihelion, long. node] and their rates per century
  const EL = {
    Mercury: [[.38709927, .20563593, 7.00497902, 252.2503235, 77.45779628, 48.33076593], [.00000037, .00001906, -.00594749, 149472.67411175, .16047689, -.12534081]],
    Venus: [[.72333566, .00677672, 3.39467605, 181.9790995, 131.60246718, 76.67984255], [.0000039, -.00004107, -.0007889, 58517.81538729, .00268329, -.27769418]],
    Earth: [[1.00000261, .01671123, -.00001531, 100.46457166, 102.93768193, 0], [.00000562, -.00004392, -.01294668, 35999.37244981, .32327364, 0]],
    Mars: [[1.52371034, .0933941, 1.84969142, -4.55343205, -23.94362959, 49.55953891], [.00001847, .00007882, -.00813131, 19140.30268499, .44441088, -.29257343]],
    Jupiter: [[5.202887, .04838624, 1.30439695, 34.39644051, 14.72847983, 100.47390909], [-.00011607, -.00013253, -.00183714, 3034.74612775, .21252668, .20469106]],
    Saturn: [[9.53667594, .05386179, 2.48599187, 49.95424423, 92.59887831, 113.66242448], [-.0012506, -.00050991, .00193609, 1222.49362201, -.41897216, -.28867794]],
  };
  const helio = (k, ms) => {
    const T = (jd(ms) - 2451545) / 36525, [a, e, I, L, wb, O] = EL[k][0].map((v, i) => v + EL[k][1][i] * T);
    const w = (wb - O) * R, i = I * R, o = O * R; let M = ((L - wb) % 360) * R, E = M;
    for (let n = 0; n < 8; n++) E = M + e * Math.sin(E);
    const x = a * (Math.cos(E) - e), y = a * Math.sqrt(1 - e * e) * Math.sin(E);
    return [(Math.cos(w) * Math.cos(o) - Math.sin(w) * Math.sin(o) * Math.cos(i)) * x + (-Math.sin(w) * Math.cos(o) - Math.cos(w) * Math.sin(o) * Math.cos(i)) * y,
      (Math.cos(w) * Math.sin(o) + Math.sin(w) * Math.cos(o) * Math.cos(i)) * x + (-Math.sin(w) * Math.sin(o) + Math.cos(w) * Math.cos(o) * Math.cos(i)) * y,
      Math.sin(w) * Math.sin(i) * x + Math.cos(w) * Math.sin(i) * y];
  };
  const planetRaDec = (k, ms) => {
    const p = helio(k, ms), q = helio('Earth', ms), [x, y0, z0] = p.map((v, i) => v - q[i]), e = 23.4397 * R;
    const y = y0 * Math.cos(e) - z0 * Math.sin(e), z = y0 * Math.sin(e) + z0 * Math.cos(e);
    return [((Math.atan2(y, x) / R + 360) % 360) / 15, Math.atan2(z, Math.hypot(x, y)) / R];
  };
  const sep = ([r1, d1], [r2, d2]) => Math.acos(Math.sin(d1 * R) * Math.sin(d2 * R) + Math.cos(d1 * R) * Math.cos(d2 * R) * Math.cos((r1 - r2) * 15 * R)) / R;
  console.assert(sep(planetRaDec('Jupiter', Date.UTC(2020, 11, 21, 18)), planetRaDec('Saturn', Date.UTC(2020, 11, 21, 18))) < .4, 'great conjunction 21 Dec 2020');
  console.assert(sep(planetRaDec('Venus', Date.UTC(2023, 2, 2)), planetRaDec('Jupiter', Date.UTC(2023, 2, 2))) < 1, 'Venus–Jupiter conjunction 2 Mar 2023');
  const PLANETS = {
    Jupiter: { c: '#F2D3A2', f: 'So big that all the other planets would fit inside it. Even binoculars show its four biggest moons, first spotted by Galileo in 1610.' },
    Saturn: { c: '#EAD08F', f: 'Its main rings stretch about 280,000 km across, yet in most places they are less than a kilometre thick.' },
    Mars: { c: '#E8794A', f: 'A day on Mars lasts just 37 minutes longer than ours. Its red is rust: iron oxide dust.' },
    Venus: { c: '#FFF4D6', f: 'The brightest planet. It spins so slowly that a day on Venus is longer than its whole year.' },
    Mercury: { c: '#C9C2B8', f: 'The fastest planet: one lap around the Sun every 88 days.' },
  };
  const LUN = 29.530588853, moonAge = ms => (((ms - Date.UTC(2000, 0, 6, 18, 14)) / 864e5) % LUN + LUN) % LUN;
  console.assert(Math.abs(altAz(2.53, 89.26, Date.now())[0] - LAT) < 1.5, 'Polaris altitude equals latitude');
  console.assert(Math.abs(Math.max(...Array.from({ length: 288 }, (_, i) => altAz(6.752, -16.72, Date.now() + i * 3e5)[0])) - (90 - LAT - 16.72)) < .6, 'Sirius peaks at 90 - lat + dec');
  const wrap = a => ((a + 540) % 360) - 180;
  const dir = az => ['north', 'north-east', 'east', 'south-east', 'south', 'south-west', 'west', 'north-west'][Math.round(az / 45) % 8];
  const place = (c, ms) => {
    const pts = c.s.map(([ra, dec]) => altAz(ra, dec, ms)), alt = pts.reduce((s, p) => s + p[0], 0) / pts.length;
    const az = (Math.atan2(pts.reduce((s, p) => s + Math.sin(p[1] * R), 0), pts.reduce((s, p) => s + Math.cos(p[1] * R), 0)) / R + 360) % 360;
    return { ...c, pts, alt, az };
  };

  // meteor showers: [name, start, peak, end] as month*100+day
  const SHOWERS = [['Quadrantids', 1228, 103, 112], ['Lyrids', 414, 422, 430], ['Eta Aquariids', 419, 506, 528], ['Perseids', 717, 812, 824], ['Orionids', 1002, 1021, 1107], ['Leonids', 1106, 1117, 1130], ['Geminids', 1204, 1214, 1220]];
  const today = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })), md = (today.getMonth() + 1) * 100 + today.getDate();
  const shower = SHOWERS.find(([, a, , b]) => a <= b ? md >= a && md <= b : md >= a || md <= b);
  if (shower) {
    const mt = $('#moonText'); if (mt) mt.textContent += ` · ${shower[0]} active`;
    setInterval(() => { if (root.dataset.theme === 'dark' && !document.hidden) dispatchEvent(new KeyboardEvent('keydown', { key: 's' })); }, 7000);
  }

  // what is up right now: the Moon first, then constellations by height, Polaris always
  const upNow = () => {
    const ms = Date.now(), list = SKY.map(c => place(c, ms)).filter(c => c.alt > 12).sort((a, b) => b.alt - a.alt);
    const [mra, mdec] = moonRaDec(ms), [malt, maz] = altAz(mra, mdec, ms);
    const pl = Object.keys(PLANETS).map(k => { const [ra, dec] = planetRaDec(k, ms), [alt, az] = altAz(ra, dec, ms); return { n: k, planet: k, alt, az, f: PLANETS[k].f }; }).filter(p => p.alt > 5).sort((a, b) => b.alt - a.alt);
    list.unshift(...pl);
    if (malt > 3) list.unshift({ n: 'The Moon', moon: true, alt: malt, az: maz });
    return list;
  };

  // hero overlay: the real constellations, faint, facing the highest one
  const hero = $('#home'), ov = document.createElement('canvas');
  ov.className = 'sky-ov'; ov.setAttribute('aria-hidden', 'true'); hero.append(ov);
  const drawSky = () => {
    const w = hero.clientWidth, h = hero.clientHeight, dpr = devicePixelRatio || 1; ov.width = w * dpr; ov.height = h * dpr;
    const g = ov.getContext('2d'); g.scale(dpr, dpr);
    const cons = upNow().filter(c => c.pts), az0 = (cons[0] || { az: 180 }).az, px = Math.max(2, Math.round(w / 640));
    const toXY = ([alt, az]) => [w * (.62 + wrap(az - az0) / 150), h * (.56 - (alt - 12) / 70 * .5)];
    upNow().filter(p => p.planet).forEach(p => { const [x, y] = toXY([p.alt, p.az]); if (x < w * .3 || x > w || p.alt < 12) return; const s = px * 2; g.fillStyle = PLANETS[p.planet].c; g.shadowColor = PLANETS[p.planet].c; g.shadowBlur = 8; g.fillRect(Math.round(x - s / 2), Math.round(y - s / 2), s, s); g.shadowBlur = 0; g.font = '500 10px ui-monospace,Menlo,monospace'; g.fillStyle = 'rgba(255,236,190,.65)'; g.fillText(p.n, x + 8, y + 3); });
    cons.forEach(c => {
      const xy = c.pts.map(toXY); if (xy.every(([x]) => x < w * .3 || x > w)) return;
      g.strokeStyle = 'rgba(201,194,230,.22)'; g.lineWidth = 1; g.setLineDash([2, 5]);
      c.l.forEach(([a, b]) => { g.beginPath(); g.moveTo(...xy[a]); g.lineTo(...xy[b]); g.stroke(); });
      c.s.forEach(([, , mag, col], i) => { const s = mag < 1 ? px * 2 : px; g.fillStyle = col || '#F4F1FF'; g.globalAlpha = Math.max(.45, 1 - mag * .15); g.fillRect(Math.round(xy[i][0] - s / 2), Math.round(xy[i][1] - s / 2), s, s); });
      g.globalAlpha = 1; g.font = '500 10px ui-monospace,Menlo,monospace'; g.fillStyle = 'rgba(201,194,230,.5)';
      const [x, y] = xy[c.lab[0][0]]; g.fillText(c.n.replace(/^The /, '').split(/[,(]| and/)[0].trim(), x + 8, y - 6);
    });
  };
  drawSky(); addEventListener('resize', drawSky); setInterval(drawSky, 60000);

  // telescope eyepiece
  const scope = $('#scope'), eye = $('#eye'), E = eye.getContext('2d');
  let items = [], idx = 0, opener;
  const hash = n => { const x = Math.sin(n * 12.9898) * 43758.5453; return x - Math.floor(x); };
  const drawEye = it => {
    const S = 600, c = S / 2; E.clearRect(0, 0, S, S); E.save(); E.beginPath(); E.arc(c, c, c, 0, 7); E.clip();
    for (let i = 0; i < 160; i++) { E.fillStyle = `rgba(230,226,255,${.15 + hash(i) * .45})`; E.fillRect(hash(i * 3.1) * S, hash(i * 7.7) * S, 2, 2); }
    if (it.planet) {
      const B = 10, n = it.planet === 'Saturn' ? 46 : 30, r = it.planet === 'Saturn' ? 10.5 : 13.5, cx0 = n / 2 - .5, base = PLANETS[it.planet].c;
      const band = y => it.planet === 'Jupiter' ? ['#F2D3A2', '#C98E62', '#F6E2C0', '#B9784E', '#F2D3A2', '#E4B98A'][Math.floor((y / n) * 9) % 6] : it.planet === 'Saturn' ? (Math.floor(y / 3) % 2 ? '#E2C47E' : '#F0D9A0') : it.planet === 'Mars' ? (hash(y * 3.3) > .7 ? '#C2552E' : base) : base;
      for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
        const dx = x - cx0, dy = y - cx0, inDisc = Math.hypot(dx, dy) <= r, ring = it.planet === 'Saturn' && Math.abs(Math.hypot(dx / 1, dy / .32) - 19) < 3.2 && Math.abs(Math.hypot(dx, dy / .32) - 19) >= 0;
        let col = null;
        if (ring && (!inDisc || dy > 0)) col = Math.abs(Math.hypot(dx, dy / .32) - 19) < 1 ? '#8C7A55' : '#D9C38E';
        else if (inDisc) col = (dx + dy) > r * .9 ? 'rgba(0,0,0,.35)' : band(y);
        if (col) { if (col.startsWith('rgba')) { E.fillStyle = band(y); E.fillRect(c - n * B / 2 + x * B, c - n * B / 2 + y * B, B, B); } E.fillStyle = col; E.fillRect(c - n * B / 2 + x * B, c - n * B / 2 + y * B, B, B); }
      }
    } else if (it.moon) {
      const age = moonAge(Date.now()), ang = 2 * Math.PI * age / LUN, B = 10, n = 38, r = n / 2 - .5;
      for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
        const nx = (x - r) / r, ny = (y - r) / r; if (nx * nx + ny * ny > 1) continue;
        const t = Math.sqrt(1 - ny * ny) * Math.cos(ang), on = age < LUN / 2 ? nx > t : nx < -t, crater = hash(x * 13 + y * 7) > .93 || Math.hypot(x - 13.5, y - 12.5) < 3.2 || Math.hypot(x - 24.5, y - 23.5) < 2.4 || Math.hypot(x - 22, y - 9) < 1.6;
        E.fillStyle = on ? (crater ? '#D9CFB0' : '#FFF3C9') : (crater ? '#242040' : '#2B2650'); E.fillRect(c - n * B / 2 + x * B, c - n * B / 2 + y * B, B, B);
      }
    } else {
      const a0 = it.alt, z0 = it.az, pts = it.pts.map(([alt, az]) => [wrap(az - z0) * Math.cos(a0 * R), alt - a0]);
      const ext = Math.max(4, ...pts.map(([x, y]) => Math.max(Math.abs(x), Math.abs(y)))), k = 200 / ext, P = ([x, y]) => [c + x * k, c - y * k];
      E.strokeStyle = 'rgba(170,160,255,.4)'; E.lineWidth = 2; E.setLineDash([6, 8]);
      it.l.forEach(([a, b]) => { E.beginPath(); E.moveTo(...P(pts[a])); E.lineTo(...P(pts[b])); E.stroke(); });
      E.setLineDash([]);
      it.s.forEach(([, , mag, col], i) => { const [x, y] = P(pts[i]), r = Math.max(3, 11 - mag * 2.6); E.shadowColor = col || '#C9D4FF'; E.shadowBlur = 24; E.fillStyle = col || '#FFFFFF'; E.beginPath(); E.arc(x, y, r, 0, 7); E.fill(); });
      E.shadowBlur = 0; E.font = '500 20px ui-monospace,Menlo,monospace'; E.fillStyle = 'rgba(214,208,240,.85)';
      it.lab.forEach(([i, name]) => { const [x, y] = P(pts[i]); E.fillText(name, x + 16, y - 12); });
    }
    E.restore();
    E.strokeStyle = 'rgba(255,255,255,.07)'; E.lineWidth = 2; E.beginPath(); E.arc(c, c, 180, 0, 7); E.moveTo(c - 20, c); E.lineTo(c + 20, c); E.moveTo(c, c - 20); E.lineTo(c, c + 20); E.stroke();
  };
  const show = () => {
    const it = items[idx], day = root.dataset.theme !== 'dark', age = moonAge(Date.now()), lit = Math.round((1 - Math.cos(2 * Math.PI * age / LUN)) / 2 * 100);
    $('#scopeName').textContent = it.n;
    $('#scopeWhere').textContent = `${Math.round(it.alt)}° up in the ${dir(it.az)}` + (it.moon ? ` · ${lit}% lit` : '') + (day ? ' · hidden by daylight right now' : ' · visible now');
    $('#scopeFact').textContent = it.moon ? 'It drifts about 3.8 cm farther from Earth every year, roughly as fast as your fingernails grow.' : it.f;
    if (it.planet) $('#scopeName').textContent = it.n + ' (planet)';
    $('#scopeN').textContent = `${idx + 1} of ${items.length}`;
    eye.setAttribute('aria-label', `Telescope view of ${it.n}`);
    drawEye(it);
  };
  const open = () => {
    items = upNow(); idx = 0; opener = document.activeElement;
    $('#scopeTime').textContent = 'Telescope · Dehradun · ' + new Date().toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata', hour: 'numeric', minute: '2-digit' }).toLowerCase();
    const sh = $('#scopeShower'); sh.hidden = !shower; if (shower) sh.textContent = `☄ ${shower[0]} meteor shower is active`;
    scope.hidden = false; show(); $('#scopeX').focus();
  };
  const close = () => { scope.hidden = true; opener?.focus?.(); };
  $('#scopeX').addEventListener('click', close);
  scope.addEventListener('click', e => { if (e.target === scope) close(); });
  $('#scopePrev').addEventListener('click', () => { idx = (idx - 1 + items.length) % items.length; show(); });
  $('#scopeNext').addEventListener('click', () => { idx = (idx + 1) % items.length; show(); });
  addEventListener('keydown', e => { if (scope.hidden) return; if (e.key === 'Escape') close(); if (e.key === 'ArrowRight') $('#scopeNext').click(); if (e.key === 'ArrowLeft') $('#scopePrev').click(); });
  window.openScope = open;
}


// ---------- Motion: intro, parallax, headings, tilt, magnetic buttons, confetti, theme circle ----------
{
  const $ = s => document.querySelector(s), root = document.documentElement, reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduce) {
    // 1 · split the name into letters
    const h1 = $('.hero h1'), name = h1.textContent; let i = 0;
    h1.setAttribute('aria-label', name);
    h1.innerHTML = name.split(' ').map(w => `<span class="ln" aria-hidden="true">${[...w].map(c => `<span class="ch" style="--i:${i++}">${c}</span>`).join('')}</span>`).join('');

    // 2 · parallax + 6 · progress, one scroll handler
    const hero = $('#home'), bar = $('.topbar .wrap'); let ticking = false;
    const onScroll = () => {
      ticking = false;
      const p = Math.min(1, Math.max(0, scrollY / hero.offsetHeight)); hero.style.setProperty('--p', p.toFixed(3));
      bar.style.setProperty('--sp', (scrollY / Math.max(1, document.documentElement.scrollHeight - innerHeight)).toFixed(3));
    };
    addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true }); onScroll();

    // 3 · headings word by word, kickers written in
    document.querySelectorAll('.h2').forEach(h => { h.innerHTML = h.textContent.split(' ').map((w, k) => `<span class="w" style="--i:${k}">${w}</span>`).join(' '); });
    // a clipped element never reports as visible, so each kicker is revealed by its heading
    const io = new IntersectionObserver(es => es.forEach(e => { if (!e.isIntersecting) return; const h = e.target, k = h.nextElementSibling; h.classList.add('seen'); if (k?.classList.contains('kick')) k.classList.add('seen'); io.unobserve(h); }), { threshold: .4 });
    document.querySelectorAll('.h2').forEach(el => io.observe(el));

    // 4 · tilt cards toward the cursor
    if (matchMedia('(hover: hover)').matches) document.querySelectorAll('.work, .side').forEach(t => {
      t.addEventListener('pointermove', e => { const r = t.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5; t.classList.add('tilt'); t.style.transform = `perspective(900px) rotateX(${(-y * 6).toFixed(2)}deg) rotateY(${(x * 7).toFixed(2)}deg) translateY(-4px)`; });
      t.addEventListener('pointerleave', () => { t.style.transform = ''; setTimeout(() => t.classList.remove('tilt'), 150); });
    });

    // 5 · magnetic buttons
    if (matchMedia('(hover: hover)').matches) document.querySelectorAll('.btn:not(.ghost), .pill-sm').forEach(b => {
      b.addEventListener('pointermove', e => { const r = b.getBoundingClientRect(); b.style.transform = `translate(${((e.clientX - r.left) / r.width - .5) * 8}px, ${((e.clientY - r.top) / r.height - .5) * 6}px)`; });
      b.addEventListener('pointerleave', () => { b.style.transform = ''; });
    });

    // 8 · confetti when the email is copied
    $('#copyMail')?.addEventListener('click', e => {
      const r = e.currentTarget.getBoundingClientRect();
      for (let k = 0; k < 22; k++) { const c = document.createElement('i'); c.className = 'conf'; c.style.left = r.left + r.width / 2 + 'px'; c.style.top = r.top + 'px'; c.style.background = ['#0071E3', '#EDBE6C', '#C9C2E6', '#7FD1B9', '#FFB347'][k % 5]; c.style.setProperty('--dx', (Math.random() - .5) * 220 + 'px'); c.style.setProperty('--dy', -60 - Math.random() * 140 + 'px'); c.style.setProperty('--r', (Math.random() - .5) * 540 + 'deg'); document.body.append(c); c.addEventListener('animationend', () => c.remove()); }
    });

    // 9 · day/night as a spreading circle (View Transitions, where supported)
    const tb = $('#themeBtn');
    if (document.startViewTransition) tb.addEventListener('click', e => {
      if (e.detail === -1) return; // our own replayed click
      e.stopImmediatePropagation();
      const r = tb.getBoundingClientRect(), x = r.left + r.width / 2, y = r.top + r.height / 2, end = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
      root.classList.add('vt');
      const vt = document.startViewTransition(() => tb.dispatchEvent(new MouseEvent('click', { detail: -1 })));
      vt.ready.then(() => root.animate({ clipPath: [`circle(0 at ${x}px ${y}px)`, `circle(${end}px at ${x}px ${y}px)`] }, { duration: 750, easing: 'cubic-bezier(.2,.8,.2,1)', pseudoElement: '::view-transition-new(root)' }));
      vt.finished.finally(() => root.classList.remove('vt'));
    }, true);
  }
}
