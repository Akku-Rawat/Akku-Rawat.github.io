(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = id => document.getElementById(id);
  const rng = s => () => (s = (s * 16807) % 2147483647) / 2147483647;
  const watch = (el, cb) => { if (!('IntersectionObserver' in window)) return cb(true); new IntersectionObserver(es => es.forEach(e => cb(e.isIntersecting)), { rootMargin: '60px' }).observe(el); };
  const BY = [[0, 8, 2, 10], [12, 4, 14, 6], [3, 11, 1, 9], [15, 7, 13, 5]];
  const hex = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));
  const lift = (c, a) => c.map(v => Math.min(255, v + a));
  const mk = (w, h) => { const c = document.createElement('canvas'); c.width = w; c.height = h; return c; };
  const hhmm = d => `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
  const FONT = { A: '010101111101101', B: '110101110101110', C: '011100100100011', D: '110101101101110', E: '111100110100111', F: '111100110100100', G: '011100101101011', H: '101101111101101', I: '111010010010111', J: '001001001101010', K: '101101110101101', L: '100100100100111', M: '101111111101101', N: '110101101101101', O: '010101101101010', P: '110101110100100', Q: '010101101110011', R: '110101110101101', S: '011100010001110', T: '111010010010010', U: '101101101101111', V: '101101101101010', W: '101101111111101', X: '101101010101101', Y: '101101010010010', Z: '111001010100111', 0: '111101101101111', 1: '010110010010111', 2: '110001010100111', 3: '110001010001110', 4: '101101111001001', 5: '111100110001110', 6: '011100111101111', 7: '111001010010010', 8: '111101111101111', 9: '111101111001110', '.': '000000000000010', '-': '000000111000000', '!': '010010010000010', '?': '110001010000010', "'": '010010000000000', ':': '000010000010000' };
  const FB = {}; Object.keys(FONT).forEach(k => FB[k] = [...FONT[k]].map(Number));
  const PX = ctx => {
    const R = Math.round;
    return {
      r: (x, y, w, h, c) => { ctx.fillStyle = c; ctx.fillRect(R(x), R(y), w, h); },
      p: (x, y, c) => { ctx.fillStyle = c; ctx.fillRect(R(x), R(y), 1, 1); },
      circ: (cx, cy, rad, c) => { ctx.fillStyle = c; const X = R(cx), Y = R(cy); for (let y = -rad; y <= rad; y++) { const h = Math.floor(Math.sqrt((rad + .5) ** 2 - y * y)); ctx.fillRect(X - h, Y + y, h * 2 + 1, 1); } },
      line: (x0, y0, x1, y1, c, dash = 0) => { const n = Math.max(Math.abs(x1 - x0), Math.abs(y1 - y0)) || 1; ctx.fillStyle = c; for (let i = 0; i <= n; i++) { if (dash && i % dash >= dash - 1) continue; ctx.fillRect(R(x0 + (x1 - x0) * i / n), R(y0 + (y1 - y0) * i / n), 1, 1); } },
      tw: s => String(s).length * 4 - 1,
      text: (s, x, y, c) => { ctx.fillStyle = c; let cx = R(x); for (const ch of String(s).toUpperCase()) { const b = FB[ch]; if (b) for (let i = 0; i < 15; i++) if (b[i]) ctx.fillRect(cx + i % 3, R(y) + ((i / 3) | 0), 1, 1); cx += 4; } },
      spr: (rows, pal, x, y) => rows.forEach((row, j) => [...row].forEach((ch, i) => { if (pal[ch]) { ctx.fillStyle = pal[ch]; ctx.fillRect(R(x) + i, R(y) + j, 1, 1); } }))
    };
  };

  const now = new Date();
  const syn = 29.530588853, ref = Date.UTC(2000, 0, 6, 18, 14);
  const ph = (((now - ref) / 864e5) % syn + syn) % syn / syn;
  const illum = Math.round((1 - Math.cos(2 * Math.PI * ph)) / 2 * 100);
  const phase = ['New moon', 'Waxing crescent', 'First quarter', 'Waxing gibbous', 'Full moon', 'Waning gibbous', 'Last quarter', 'Waning crescent'][Math.round(ph * 8) % 8];
  const SHOWERS = [['Quadrantids', 0, 3], ['Lyrids', 3, 22], ['Eta Aquariids', 4, 6], ['Perseids', 7, 12], ['Orionids', 9, 21], ['Leonids', 10, 17], ['Geminids', 11, 14]];
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const next = SHOWERS.map(([n, m, d]) => { let dt = new Date(now.getFullYear(), m, d); if (dt < today) dt = new Date(now.getFullYear() + 1, m, d); return { n, dt }; }).sort((a, c) => a.dt - c.dt)[0];
  const days = Math.round((next.dt - today) / 864e5);
  const inDays = days === 0 ? 'peaks tonight' : `in ${days} day${days === 1 ? '' : 's'}`;

  const RESUME = 'Akhilesh_Rawat_Resume.pdf', EMAIL = 'akhileshrawat.asr@gmail.com', LINKEDIN = 'https://www.linkedin.com/in/akhilesh-rawat-asr', GITHUB = 'https://github.com/Akku-Rawat';
  const PROJ = {
    los: { name: 'Loan Origination System', short: 'application to e-signed offer and booked loan', dir: 'work', star: [170, 24], label: 'LOS' },
    lms: { name: 'Loan Management System', short: 'loan products, schedules, arrears and statements', dir: 'work', star: [190, 32], label: 'LMS' },
    hrms: { name: 'HRMS', short: 'tech lead · HR workflows and statutory payroll', dir: 'work', star: [160, 38], label: 'HRMS' },
    erp: { name: 'ERP System', short: 'sales to accounting, ZRA-certified e-invoicing', dir: 'work', star: [196, 52], label: 'ERP ZRA' },
    recon: { name: 'AI-Recon', short: 'bank transaction reconciliation', dir: 'work', star: [174, 46], label: 'AI-RECON' },
    tazama: { name: 'Tazama case management', short: 'tech lead · open-source fraud and AML', dir: 'work', star: [258, 24], label: 'TAZAMA' },
    mojaloop: { name: 'Mojaloop reporting hub', short: 'open-source payments · 100k+ transactions a day', dir: 'work', star: [276, 32], label: 'MOJALOOP' },
    'access-sa': { name: 'Access South Africa', short: 'Spring Boot middleware for Oracle FLEXCUBE', dir: 'work', star: [304, 62], label: 'ACCESS SA' },
    'access-gh': { name: 'Access Ghana', short: 'Oracle FLEXCUBE teller customizations', dir: 'work', star: [311, 75], label: 'ACCESS GHANA' },
    creddex: { name: 'Creddex', short: 'self-hosted team credential vault', dir: 'after-dark', star: [202, 72], label: 'CREDDEX' },
    signboard: { name: 'Signboard', short: 'website builder for local businesses', dir: 'after-dark', star: [184, 81], label: 'SIGNBOARD' },
    chaos8: { name: 'Chaos 8', short: 'multiplayer pool in the browser', dir: 'after-dark', star: [250, 50], label: 'CHAOS 8' }
  };
  const state = { lofi: false };

  const dlgText = $('dlgText');
  let typer, dlgFull = dlgText.textContent;
  const dialogSay = txt => {
    dlgFull = txt; clearInterval(typer);
    if (reduce) { dlgText.textContent = txt; return; }
    let i = 0; dlgText.textContent = '';
    typer = setInterval(() => { i += 2; dlgText.textContent = txt.slice(0, i); if (i >= txt.length) clearInterval(typer); }, 22);
  };
  dlgText.addEventListener('click', () => { clearInterval(typer); dlgText.textContent = dlgFull; });
  const goTo = id => { const el = $(id); if (!el) return; el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' }); if (el.classList.contains('entry')) { el.classList.add('flash'); setTimeout(() => el.classList.remove('flash'), 1800); } };

  const drawPatch = cvs => {
    cvs.width = 40; cvs.height = 40;
    const P = PX(cvs.getContext('2d')), hillY = x => Math.round(29 + Math.sin(x * .35) * 1.2);
    for (let y = 0; y < 40; y++) for (let x = 0; x < 40; x++) {
      const d = Math.hypot(x + .5 - 20, y + .5 - 20);
      if (d > 19.6) continue;
      let col;
      if (d > 17.6) col = '#EDBE6C';
      else if (d > 16.4) col = (x + y) % 2 ? '#B8862E' : '#16142C';
      else if (y >= hillY(x)) col = y === hillY(x) ? '#3A3360' : '#26213F';
      else col = y < 12 ? '#120F26' : y < 22 ? '#16132D' : '#1B1735';
      P.p(x, y, col);
    }
    for (let t = 0; t < Math.PI * 2.6; t += .18) P.p(20 + Math.cos(t) * (1 + t * 1.2), 20 + Math.sin(t) * (1 + t * 1.2) * .8, '#2C3778');
    [[9, 18], [16, 7], [24, 8], [32, 25], [33, 13], [7, 24]].forEach(([x, y], i) => P.p(x, y, i % 3 ? '#C9C4DA' : '#EDBE6C'));
    for (let y = -4; y <= 4; y++) for (let x = -4; x <= 4; x++) if (x * x + y * y <= 18 && (x - 2) ** 2 + (y + 1) ** 2 > 12) P.p(12 + x, 12 + y, '#F1E9D2');
    const ring = []; for (let a = 0; a < 360; a += 6) { const t = a * Math.PI / 180; ring.push([Math.round(27 + Math.cos(t) * 7), Math.round(18 + Math.sin(t) * 2 - Math.cos(t)), Math.sin(t) > 0]); }
    ring.filter(q => !q[2]).forEach(([x, y]) => P.p(x, y, '#B8862E'));
    P.circ(27, 18, 4, '#0E0C18'); P.r(25, 16, 2, 2, '#F1E9D2'); P.p(29, 15, '#4A4370');
    ring.filter(q => q[2]).forEach(([x, y]) => P.p(x, y, '#EDBE6C'));
    for (let y = -3; y <= 0; y++) { const h = Math.floor(Math.sqrt(3.5 ** 2 - y * y)); P.r(13 - h, 27 + y, h * 2 + 1, 1, '#C9C2E6'); }
    P.r(10, 27, 7, 3, '#A9A2D0'); P.p(13, 24, '#120F26'); P.p(13, 25, '#120F26'); P.p(15, 28, '#FFCF6B');
    [[21, 31], [22, 32], [21, 33]].forEach(([x, y]) => P.p(x, y, '#7FD1B9')); P.r(24, 33, 4, 1, '#7FD1B9');
  };
  drawPatch($('patch')); drawPatch($('portrait'));

  const bank = (bg, acc) => [bg, P => { for (let y = 0; y < 4; y++) P.r(10 - y * 2, 3 + y, y * 4 + 1, 1, '#C9C2E6'); P.p(10, 5, acc); P.r(3, 7, 15, 1, '#8D86B0'); [5, 8, 11, 14].forEach(x => P.r(x, 9, 2, 6, '#EFE6D8')); P.r(3, 15, 15, 2, '#8D86B0'); P.r(3, 15, 15, 1, '#C9C2E6'); }];
  const ICONS = {
    lending: ['#22304A', P => { P.r(5, 2, 10, 15, '#EFE6D8'); [[12, 2], [13, 2], [14, 2], [13, 3], [14, 3], [14, 4]].forEach(([x, y]) => P.p(x, y, '#22304A')); P.r(12, 3, 1, 2, '#C9BFA0'); P.r(13, 4, 1, 1, '#C9BFA0'); P.r(7, 5, 4, 1, '#8D86B0'); P.r(7, 7, 6, 1, '#8D86B0'); P.r(7, 9, 5, 1, '#8D86B0'); [[7, 13], [8, 12], [9, 13], [10, 12], [11, 13]].forEach(([x, y]) => P.p(x, y, '#3E5A8A')); P.circ(14, 15, 3, '#5FA36A'); [[13, 15], [14, 16], [15, 15], [16, 14]].forEach(([x, y]) => P.p(x, y, '#EFE6D8')); }],
    zra: ['#3A2E22', P => { P.r(5, 2, 10, 15, '#EFE6D8'); for (let i = 0; i < 5; i++) P.p(5 + i * 2, 17, '#EFE6D8'); P.r(7, 5, 6, 1, '#8D86B0'); P.r(7, 7, 4, 1, '#8D86B0'); P.r(7, 9, 6, 1, '#8D86B0'); P.r(7, 12, 5, 1, '#5B4F5E'); P.circ(14, 14, 3, '#EDBE6C'); [[14, 13], [13, 14], [14, 14], [15, 14], [14, 15]].forEach(([x, y]) => P.p(x, y, '#B8862E')); P.p(13, 18, '#E0566E'); P.p(15, 18, '#E0566E'); }],
    recon: ['#1F3A3A', P => { P.r(2, 4, 7, 12, '#7FB2C9'); P.r(11, 4, 7, 12, '#7FB2C9'); P.r(2, 4, 1, 12, '#4E7F9A'); P.r(17, 4, 1, 12, '#4E7F9A'); [7, 10, 13].forEach(y => { P.r(4, y, 4, 1, '#EFE6D8'); P.r(12, y, 4, 1, '#EFE6D8'); }); P.r(9, 8, 2, 1, '#EDBE6C'); P.r(9, 10, 2, 1, '#EDBE6C'); [[7, 17], [8, 18], [9, 17], [10, 16], [11, 15]].forEach(([x, y]) => P.p(x, y, '#5FA36A')); }],
    tazama: ['#2E2443', P => { for (let y = 3; y <= 16; y++) { const w = y < 10 ? 6 : Math.max(0, 6 - (y - 9)); if (w > 0) P.r(10 - w, y, w * 2, 1, y === 3 ? '#B9A0F0' : '#9C7BE0'); } P.r(9, 6, 2, 6, '#EFE6D8'); P.r(9, 13, 2, 2, '#EFE6D8'); }],
    chaos8: ['#1D3B2C', P => { P.circ(10, 10, 7, '#141018'); P.circ(8, 8, 3, '#F1E9D2'); P.p(8, 7, '#141018'); P.p(8, 9, '#141018'); P.p(13, 5, '#4A4370'); P.p(14, 6, '#4A4370'); }],
    signboard: ['#1F2E2A', P => { P.r(3, 3, 14, 1, '#8A6A4A'); [[6, 4], [6, 5], [14, 4], [14, 5]].forEach(([x, y]) => P.p(x, y, '#C9C2E6')); P.r(4, 6, 12, 8, '#EDBE6C'); P.r(4, 6, 12, 1, '#FFE09A'); P.r(6, 9, 8, 1, '#5A4A2E'); P.r(6, 11, 5, 1, '#5A4A2E'); P.circ(15, 16, 2, '#5FA36A'); P.p(15, 16, '#EFE6D8'); }],
    creddex: ['#353020', P => { P.circ(6, 10, 4, '#EDBE6C'); P.circ(6, 10, 2, '#353020'); P.r(9, 9, 9, 3, '#EDBE6C'); P.r(9, 9, 9, 1, '#FFE09A'); P.r(14, 12, 2, 3, '#EDBE6C'); P.r(17, 12, 1, 2, '#EDBE6C'); }],
    'sk-domain': ['#2A2618', P => { P.r(3, 15, 9, 2, '#C98A3B'); P.r(3, 13, 9, 2, '#EDBE6C'); P.r(3, 11, 9, 2, '#C98A3B'); P.r(3, 9, 9, 2, '#EDBE6C'); P.r(3, 9, 9, 1, '#FFE09A'); P.line(11, 11, 16, 5, '#7FD1B9'); P.r(14, 4, 3, 1, '#7FD1B9'); P.r(16, 4, 1, 3, '#7FD1B9'); }],
    'sk-lang': ['#1F2E3A', P => { [[6, 6], [5, 7], [4, 8], [3, 9], [4, 10], [5, 11], [6, 12]].forEach(([x, y]) => P.p(x, y, '#7FD1B9')); P.line(11, 5, 8, 14, '#EDBE6C'); [[13, 6], [14, 7], [15, 8], [16, 9], [15, 10], [14, 11], [13, 12]].forEach(([x, y]) => P.p(x, y, '#7FD1B9')); }],
    'sk-front': ['#2A2238', P => { P.r(3, 4, 14, 12, '#C9C2E6'); P.r(3, 4, 14, 2, '#8D86B0'); P.p(4, 5, '#E0566E'); P.p(6, 5, '#EDBE6C'); P.p(8, 5, '#7FD1B9'); P.r(5, 8, 6, 1, '#5D5396'); P.r(5, 10, 9, 1, '#5D5396'); P.r(5, 12, 4, 2, '#7FB2C9'); P.r(11, 12, 4, 2, '#EBA3AE'); }],
    'sk-back': ['#1D2433', P => { for (let i = 0; i < 3; i++) { P.r(4, 3 + i * 5, 12, 4, '#5D5396'); P.r(4, 3 + i * 5, 12, 1, '#7C74B8'); P.p(6, 5 + i * 5, '#7FD1B9'); P.p(8, 5 + i * 5, '#EDBE6C'); P.r(11, 5 + i * 5, 4, 1, '#3E3770'); } }],
    'sk-tools': ['#171622', P => { P.r(2, 4, 16, 12, '#0E0D16'); P.r(2, 4, 16, 1, '#8D86B0'); P.r(2, 15, 16, 1, '#8D86B0'); P.r(2, 4, 1, 12, '#8D86B0'); P.r(17, 4, 1, 12, '#8D86B0'); [[5, 8], [6, 9], [5, 10]].forEach(([x, y]) => P.p(x, y, '#7FD1B9')); P.r(8, 10, 4, 1, '#EDBE6C'); }],
    'sk-db': ['#1D2433', P => { P.r(4, 5, 12, 11, '#5D5396'); P.r(5, 3, 10, 1, '#9C94D8'); P.r(4, 4, 12, 2, '#7C74B8'); P.r(5, 16, 10, 1, '#3E3770'); P.r(4, 9, 12, 1, '#3E3770'); P.r(4, 13, 12, 1, '#3E3770'); P.p(13, 7, '#7FD1B9'); P.p(13, 11, '#EDBE6C'); P.p(13, 15, '#7FD1B9'); }],
    'sk-sec': ['#2A2238', P => { P.r(6, 3, 8, 1, '#C9C2E6'); P.r(5, 4, 1, 5, '#C9C2E6'); P.r(14, 4, 1, 5, '#C9C2E6'); P.r(4, 9, 12, 9, '#EDBE6C'); P.r(4, 9, 12, 1, '#FFE09A'); P.r(4, 17, 12, 1, '#B8862E'); P.r(9, 12, 2, 3, '#3A2E22'); P.p(9, 15, '#3A2E22'); }],
    'sk-practice': ['#1F2E2A', P => { P.r(4, 4, 12, 14, '#EFE6D8'); P.r(7, 3, 6, 2, '#8D86B0'); [7, 11, 15].forEach(y => { P.p(6, y, '#5FA36A'); P.p(7, y + 1, '#5FA36A'); P.p(8, y, '#5FA36A'); P.p(9, y - 1, '#5FA36A'); P.r(11, y, 4, 1, '#8D86B0'); }); }],
    lms: ['#1F2A3A', P => { P.r(3, 5, 14, 12, '#EFE6D8'); P.r(3, 5, 14, 3, '#7FB2C9'); P.r(6, 3, 1, 3, '#8D86B0'); P.r(13, 3, 1, 3, '#8D86B0'); for (let r = 0; r < 3; r++) for (let c = 0; c < 4; c++) P.r(5 + c * 3, 10 + r * 2, 2, 1, r * 4 + c < 6 ? '#5FA36A' : '#8D86B0'); P.circ(15, 15, 3, '#EDBE6C'); P.r(15, 14, 1, 3, '#B8862E'); }],
    hrms: ['#2A2238', P => { P.r(4, 4, 12, 14, '#C9C2E6'); P.r(4, 4, 12, 3, '#8D86B0'); P.r(8, 2, 4, 3, '#5D5396'); P.r(9, 3, 2, 1, '#2A2238'); P.circ(10, 9, 2, '#E0B07A'); P.r(7, 12, 7, 3, '#7FD1B9'); P.r(6, 16, 9, 1, '#8D86B0'); }],
    mojaloop: ['#1D2A33', P => { P.line(5, 6, 15, 6, '#4E7F9A'); P.line(5, 6, 10, 15, '#4E7F9A'); P.line(15, 6, 10, 15, '#4E7F9A'); P.circ(5, 6, 2, '#7FD1B9'); P.circ(15, 6, 2, '#EDBE6C'); P.circ(10, 15, 2, '#29ADFF'); P.r(9, 5, 2, 2, '#EFE6D8'); P.p(7, 10, '#EFE6D8'); P.p(13, 10, '#EFE6D8'); }],
    'bank-sa': bank('#2A2418', '#EDBE6C'),
    'bank-gh': bank('#1A2A20', '#5FA36A'),
    'job-now': ['#2A2418', P => { const ring = []; for (let a = 0; a < 360; a += 6) { const t = a * Math.PI / 180; ring.push([Math.round(10 + Math.cos(t) * 8.5), Math.round(10 + Math.sin(t) * 2.4 - Math.cos(t) * 1.6), Math.sin(t) > 0]); } ring.filter(q => !q[2]).forEach(([x, y]) => P.p(x, y, '#9A7430')); P.circ(10, 10, 5, '#EDBE6C'); P.r(7, 7, 2, 2, '#FFE09A'); P.r(11, 13, 3, 1, '#C98A3B'); ring.filter(q => q[2]).forEach(([x, y]) => P.p(x, y, '#F1E9D2')); P.p(3, 3, '#F1E9D2'); P.p(17, 17, '#C9C2E6'); }],
    'job-past': ['#16242A', P => { P.circ(9, 11, 6, '#5FB8A8'); P.r(6, 8, 2, 2, '#9FE3D2'); P.r(9, 15, 4, 1, '#3E8C80'); P.r(4, 12, 2, 1, '#3E8C80'); P.r(11, 9, 3, 1, '#4FA595'); P.circ(16, 4, 1, '#C9C2E6'); P.p(3, 3, '#F1E9D2'); }]
  };
  document.querySelectorAll('canvas[data-ico]').forEach(c => { const [bg, fn] = ICONS[c.dataset.ico]; c.width = 20; c.height = 20; const P = PX(c.getContext('2d')); P.r(0, 0, 20, 20, bg); fn(P); });

  (() => {
    const c = $('mailbox'); c.width = 48; c.height = 36; const P = PX(c.getContext('2d'));
    P.r(0, 0, 48, 36, '#16142A');
    for (let t = 0; t < Math.PI * 3; t += .16) P.p(28 + Math.cos(t) * (1 + t * 1.3), 8 + Math.sin(t) * (1 + t * 1.3) * .6, '#26306A');
    [[5, 4], [14, 9], [30, 3], [41, 7], [24, 12], [44, 17], [3, 15]].forEach(([x, y], i) => P.p(x, y, i % 3 ? '#C9C4DA' : '#EDBE6C'));
    for (let y = -3; y <= 3; y++) for (let x = -3; x <= 3; x++) if (x * x + y * y <= 10 && (x - 1) ** 2 + (y + 1) ** 2 > 6) P.p(43 + x, 14 + y, '#F1E9D2');
    P.r(0, 30, 48, 6, '#15122A'); P.r(0, 30, 48, 1, '#252240'); [[4, 29], [9, 29], [30, 29], [43, 29]].forEach(([x, y]) => P.p(x, y, '#252240'));
    P.r(21, 19, 3, 11, '#5E3F2E');
    P.r(12, 9, 22, 11, '#5D5396'); P.r(13, 8, 20, 1, '#7C74B8'); P.r(12, 9, 22, 1, '#7C74B8'); P.r(12, 19, 22, 1, '#3E3770');
    P.r(9, 11, 3, 8, '#4A4380');
    P.r(14, 11, 9, 6, '#F1E9D2'); P.r(14, 11, 9, 1, '#D8CFB8'); P.p(18, 14, '#E0566E');
    P.r(34, 4, 1, 9, '#8D86B0'); P.r(35, 4, 5, 3, '#E0566E');
    P.p(41, 24, '#E8FF7A'); P.p(6, 22, '#E8FF7A');
  })();

  const hero = (() => {
    const cv = $('heroCv'), W = 320, H = 150; cv.width = W; cv.height = H;
    const g = cv.getContext('2d'), G = PX(g), r = rng(77);
    const skyC = mk(W, H), sctx = skyC.getContext('2d'), S = PX(sctx);
    const landC = mk(W, H), L = PX(landC.getContext('2d'));
    const frontC = mk(W, H), F = PX(frontC.getContext('2d'));
    const back = x => Math.round(110 + Math.sin(x * .03) * 4 + Math.sin(x * .09 + 1) * 2);
    const front = x => Math.round(128 - 14 * Math.exp(-(((x - 275) / 55) ** 2)) - 3 * Math.exp(-(((x - 110) / 40) ** 2)));
    const ML = Math.hypot(140, 360), mw = (x, y) => Math.abs((x - 340) * 140 + (y + 20) * 360) / ML;
    const titleZone = (x, y) => x < 152 && y < 94;

    const img = sctx.createImageData(W, H), d = img.data;
    const SK = ['#0A0916', '#0C0D20', '#111129', '#171632', '#1F1C3D', '#292449'].map(hex);
    const put = (x, y, c) => { const p = (y * W + x) * 4; d[p] = c[0]; d[p + 1] = c[1]; d[p + 2] = c[2]; d[p + 3] = 255; };
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
      const t = Math.min(1, y / 116) * (SK.length - 1), i = Math.floor(t), fr = t - i, th = BY[y % 4][x % 4];
      let c = fr * 16 > th ? SK[Math.min(i + 1, SK.length - 1)] : SK[i];
      const md = mw(x, y);
      if (md < 24 && y < 104) { const k = 1 - md / 24; if (k * 16 > th) c = lift(c, 6); if ((k - .45) * 30 > th) c = lift(c, 6); }
      put(x, y, c);
    }
    const dimA = hex('#3B3762'), dimB = hex('#4C4778');
    for (let k = 0; k < 600; k++) { const x = Math.floor(r() * W), y = Math.floor(r() * 108); if (mw(x, y) > 26 && r() < .55) continue; put(x, y, r() < .5 ? dimA : dimB); }
    sctx.putImageData(img, 0, 0);

    const BANDS = [
      { y0: 34, amp: 5, k: .045, ph: 1.2, x0: 152, x1: 320 },
      { y0: 61, amp: 6, k: .038, ph: 3.1, x0: 152, x1: 320 },
      { y0: 99, amp: 2.5, k: .05, ph: .4, x0: 0, x1: 320 }
    ];
    const bandY = (b, x) => b.y0 + Math.sin(x * b.k + b.ph) * b.amp;
    BANDS.forEach(b => { for (let x = b.x0; x < b.x1; x++) { const y = bandY(b, x); if (y > back(x) - 3 || titleZone(x, y)) continue; if ((x + Math.floor(y)) % 3 !== 2) S.p(x, y, '#252F68'); if (x % 4 === 0) S.p(x, y + 1, '#1D2656'); } });
    const SWX = 222, SWY = 64, SPIN = Math.PI * 4.2;
    for (let arm = 0; arm < 2; arm++) for (let th = 0; th < SPIN; th += .045) { const rr = 1.5 + th * 1.12, a = th + arm * Math.PI; S.p(SWX + Math.cos(a) * rr, SWY + Math.sin(a) * rr * .8, Math.floor(th * 6) % 3 ? '#2A3577' : '#36468F'); }
    const HALOS = [[206, 12], [268, 9], [292, 46], [270, 70], [156, 100]];
    const haloRing = (ctxP, hx, hy, boost) => { for (let y = -7; y <= 7; y++) for (let x = -7; x <= 7; x++) { const dd = Math.hypot(x, y), th = BY[(hy + y + 32) % 4][(hx + x + 32) % 4]; if (dd > 2.5 && dd < 3.6 && th < (boost ? 14 : 9)) ctxP.p(hx + x, hy + y, boost ? '#C9A85A' : '#7E6A3E'); else if (dd > 4.6 && dd < 5.7 && th < (boost ? 9 : 4)) ctxP.p(hx + x, hy + y, boost ? '#8E7A48' : '#4E4430'); } };
    HALOS.forEach(([hx, hy]) => haloRing(S, hx, hy, false));
    const MX = 300, MY = 18, MR = 8, wax = ph < .5, tc = Math.cos(2 * Math.PI * ph);
    for (let y = -15; y <= 15; y++) for (let x = -15; x <= 15; x++) { const dd = Math.hypot(x, y), th = BY[(MY + y + 32) % 4][(MX + x + 32) % 4]; if (dd > 9.5 && dd < 11 && th < 6) S.p(MX + x, MY + y, '#5C4E33'); else if (dd > 12.5 && dd < 14 && th < 3) S.p(MX + x, MY + y, '#463B2B'); }
    for (let y = -MR; y <= MR; y++) for (let x = -MR; x <= MR; x++) {
      if (x * x + y * y > MR * MR + MR * .8) continue;
      const chord = Math.sqrt(Math.max(.01, MR * MR - y * y)), xs = x / chord, lit = wax ? xs > tc : xs < -tc;
      S.p(MX + x, MY + y, lit ? ((x * 5 + y * 3 + 40) % 11 === 0 ? '#D4CBB2' : '#F1E9D2') : '#272545');
    }
    const [PLX, PLY] = PROJ.chaos8.star;
    const ringPts = []; for (let a = 0; a < 360; a += 3) { const t = a * Math.PI / 180; ringPts.push([Math.round(PLX + Math.cos(t) * 11), Math.round(PLY + Math.sin(t) * 3 - Math.cos(t) * 1.5), Math.sin(t) > 0]); }
    ringPts.filter(q => !q[2]).forEach(([x, y]) => S.p(x, y, '#9A7430'));
    S.circ(PLX, PLY, 6, '#141018'); S.circ(PLX - 2, PLY - 2, 2, '#F1E9D2'); S.p(PLX - 2, PLY - 3, '#141018'); S.p(PLX - 2, PLY - 1, '#141018'); S.p(PLX + 3, PLY - 4, '#3E3858'); S.p(PLX + 4, PLY - 3, '#3E3858');
    ringPts.filter(q => q[2]).forEach(([x, y]) => S.p(x, y, '#EDBE6C'));

    for (let x = 0; x < W; x++) { const y = back(x); L.r(x, y, 1, H - y, '#1B1731'); }
    for (let x = 14; x < 134;) {
      const w = 4 + Math.floor(r() * 4), h = 3 + Math.floor(r() * 4), base = back(x + (w >> 1));
      L.r(x, base - h, w, h + 3, '#1B1731');
      if (r() < .35) L.r(x + (w >> 1) - 1, base - h - 2, 2, 2, '#1B1731');
      for (let yy = base - h + 1; yy < base; yy += 2) for (let xx = x + 1; xx < x + w - 1; xx += 2) if (r() < .4) L.p(xx, yy, r() < .15 ? '#7FD1B9' : '#E9B865');
      x += w + 1 + Math.floor(r() * 4);
    }
    const cb = back(120);
    L.r(117, cb - 9, 7, 11, '#1B1731');
    for (let i = 0; i < 16; i++) { const w = i < 5 ? 3 : 1; L.r(120 - (w >> 1), cb - 10 - i, w, 1, '#1B1731'); }
    L.p(120, cb - 27, '#1B1731'); L.r(119, cb - 25, 3, 1, '#1B1731'); L.r(120, cb - 6, 1, 2, '#E9B865');
    for (let x = 0; x < W; x++) { const y = front(x); L.r(x, y, 1, H - y, '#15122A'); L.p(x, y, '#252240'); if (r() < .18) L.p(x, y - 1, '#252240'); }
    for (let y = 140; y < H; y++) for (let x = 0; x < W; x++) if (BY[y % 4][x % 4] < (y - 139) * 1.6) L.p(x, y, '#100E1F');
    for (let y = 40; y < H; y++) {
      const h = (y - 40) / (H - 40), w = .6 + 7.6 * Math.pow(h, .62) + Math.sin(y * .45) * .9, cx = 16 + Math.sin(y * .07) * 1.5 + (1 - h) * 1.5;
      for (let x = Math.round(cx - w); x <= Math.round(cx + w); x++) { const s = (x - cx + Math.sin(y * .3) * 2.2 + 30) % 3; L.p(x, y, s < 1 ? '#1A2C26' : BY[y % 4][(x + 8) % 4] < 2 ? '#24392F' : '#0F1A17'); }
    }
    const pine = (x, h) => { const base = front(x) + 1; for (let i = 0; i < h; i++) { const w = Math.floor(i * .45); L.r(x - w, base - h + i, w * 2 + 1, 1, i % 4 === 3 ? '#16222A' : '#1C2A33'); } L.r(x, base, 1, 2, '#2A1F1A'); };
    pine(178, 15); pine(188, 10); pine(312, 13);
    for (let y = 112; y < 126; y++) for (let x = 262; x < 306; x++) { if (y < front(x)) continue; const dd = Math.hypot(x - 284, (y - 116) * 2.4); if (dd < 22 && BY[y % 4][x % 4] < (1 - dd / 22) * 12) L.p(x, y, '#2A2236'); }
    L.r(270, 96, 29, 19, '#B7B0D6'); L.r(292, 96, 7, 19, '#8D86B5'); L.r(270, 96, 29, 1, '#D4CEEC');
    L.r(274, 105, 6, 10, '#3E2F66'); L.r(274, 105, 6, 1, '#2A2050'); L.p(278, 110, '#EDBE6C'); L.p(277, 103, '#FFE6A8'); L.p(276, 103, '#C98A3B');
    L.r(286, 100, 6, 6, '#FFCF6B'); L.r(288, 100, 1, 6, '#C98A3B'); L.r(286, 102, 6, 1, '#C98A3B');
    for (let y = -14; y <= 0; y++) { const h = Math.floor(Math.sqrt(14.5 ** 2 - y * y)), sh = Math.ceil(h * .4); L.r(284 - h, 96 + y, h * 2 + 1, 1, '#DCD6F0'); L.r(284 + h - sh + 1, 96 + y, sh, 1, '#A9A2D0'); }
    L.r(271, 95, 27, 1, '#8D86B5');
    L.r(282, 82, 5, 14, '#0E0C1F');
    L.r(214, 96, 1, front(214) - 96 + 1, '#5E3F2E'); L.p(214, 95, '#7A5440');
    const bulbs = [];
    for (let i = 0; i <= 56; i++) { const t = i / 56, x = 214 + 57 * t, y = 97 - 3 * t + Math.sin(Math.PI * t) * 6; L.p(x, y, '#3A2E3A'); if (i % 5 === 2) bulbs.push({ x: Math.round(x), y: Math.round(y) + 1, c: ['#EDBE6C', '#EBA3AE', '#7FD1B9'][bulbs.length % 3], ph: r() * 6.28 }); }
    L.r(202, 113, 2, front(202) - 113 + 1, '#5E3F2E');
    L.r(198, 108, 9, 6, '#5D5396'); L.r(198, 108, 9, 1, '#7C74B8'); L.r(198, 113, 9, 1, '#3E3770'); L.r(199, 110, 1, 2, '#2A2550');
    L.r(207, 106, 1, 5, '#8D86B0'); L.r(208, 106, 3, 2, '#E0566E');
    F.r(227, 113, 25, 2, '#6B4A36'); F.r(227, 113, 25, 1, '#8A6A4A');
    F.r(228, 108, 23, 1, '#7A5440'); F.r(228, 111, 23, 1, '#6B4A36');
    F.r(229, 107, 2, 8, '#5E3F2E'); F.r(248, 107, 2, 8, '#5E3F2E');
    F.r(229, 115, 2, front(230) - 115 + 1, '#4A3226'); F.r(248, 115, 2, front(249) - 115 + 1, '#4A3226');

    const HUMAN = ['...tttt...', '..tttttt..', '.tttTtttt.', '.ttttTttt.', '.tttttttt.', '..tttttt..', '.tttttttt.', 'tttttttttt', 'ttTttttTtt', 'tttttttttt', 'tttttttttt', '.tttttttt.'];
    const HPAL = { t: '#B9853A', T: '#8E6428' };
    const CAT = ['.o...o.', '.oo.oo.', '.ooooo.', '.eoooe.', '..ono..', '.ooooo.', 'ooooooo', 'ooooooo', 'ooooooo', 'ooooooo'];
    const glowPts = []; for (let y = 103; y <= 112; y++) for (let x = 230; x <= 245; x++) { if (x > 232 && x < 244) continue; if (BY[y % 4][x % 4] < 7) glowPts.push([x, y]); }
    const tw = []; while (tw.length < 90) { const x = Math.floor(r() * W), y = Math.floor(r() * 104); if (y > back(x) - 4) continue; if (Math.hypot(x - MX, y - MY) < MR + 6 || Math.hypot(x - PLX, y - PLY) < 13 || HALOS.some(([hx, hy]) => Math.hypot(x - hx, y - hy) < 7) || (x < 26 && y > 38)) continue; const tz = titleZone(x, y); tw.push({ x, y, sp: .5 + r(), ph: r() * 6.28, big: !tz && r() < .2, c: tz ? '#7F79AE' : ['#FFFFFF', '#FFE9A8', '#C9D4FF', '#E6E1F4'][Math.floor(r() * 4)], d: tz ? '#3B3762' : '#4C4778' }); }
    const CONS = [
      { name: 'LEDGER', at: [158, 58], ids: ['los', 'lms', 'hrms', 'erp', 'recon'], seg: [[160, 38, 170, 24], [170, 24, 190, 32], [190, 32, 196, 52], [196, 52, 174, 46], [174, 46, 160, 38]], extra: [] },
      { name: 'COMMONS', at: [236, 30], ids: ['tazama', 'mojaloop'], seg: [[258, 24, 276, 32]], extra: [] },
      { name: 'FLEXCUBE', at: [286, 54], ids: ['access-sa', 'access-gh'], seg: [[304, 62, 311, 75]], extra: [] },
      { name: 'CUE', at: [212, 16], ids: ['chaos8'], seg: [[222, 26, 234, 36], [234, 36, 243, 44]], extra: [[222, 26], [234, 36]] },
      { name: 'WORKBENCH', at: [158, 87], ids: ['signboard', 'creddex'], seg: [[168, 76, 184, 81], [184, 81, 202, 72]], extra: [[168, 76]] }
    ];
    const flies = Array.from({ length: 10 }, () => ({ x: 30 + r() * 285, y: 120 + r() * 18, ph: r() * 6.28 }));
    const LBL = { mail: 'SAY HI', cat: 'PET THE CAT', me: "THAT'S ME", obs: 'TELESCOPE' };
    const PIV = [284, 88];
    let ang = -1.3, hover = null, pointer = null, lockId = null, lockUntil = 0, catUntil = 0, boostUntil = 0, shoots = [], vis = false, last = 0;

    const hit = (x, y) => {
      for (const id of Object.keys(PROJ)) { const [sx, sy] = PROJ[id].star; const big = id === 'chaos8'; if (Math.hypot(x - sx - (big ? 0 : .5), y - sy - (big ? 0 : .5)) < (big ? 11 : 6)) return id; }
      if (x >= 196 && x <= 212 && y >= 104 && y <= 127) return 'mail';
      if (x >= 243 && x <= 253 && y >= 101 && y <= 114) return 'cat';
      if (x >= 232 && x <= 243 && y >= 99 && y <= 114) return 'me';
      if (x >= 268 && x <= 300 && y >= 80 && y <= 116) return 'obs';
      return null;
    };
    const spawn = (delay = 0) => { const x = 200 + Math.random() * 118, y = 3 + Math.random() * 30; shoots.push({ x, y, life: Math.max(8, (x - 158) / 2.3), wait: delay }); };
    const ringAround = (cx, cy, rad, col) => { for (let a = 0; a < 12; a++) { const t = a / 12 * Math.PI * 2; G.p(cx + Math.cos(t) * rad, cy + Math.sin(t) * rad, col); } };
    const plate = (txt, x, y) => { const w = G.tw(txt), px = Math.max(2, Math.min(W - w - 3, x)), py = Math.max(2, Math.min(H - 9, y)); G.r(px - 2, py - 2, w + 4, 9, '#0B0A16'); G.r(px - 2, py + 6, w + 4, 1, '#EDBE6C'); G.text(txt, px, py, '#FFE9A8'); };
    const loc = e => { const b = cv.getBoundingClientRect(); return [(e.clientX - b.left) / b.width * W, (e.clientY - b.top) / b.height * H]; };

    const draw = t => {
      const T = reduce ? 0 : t, nowMs = performance.now(), pulse = reduce ? 1 : Math.round(Math.sin(T * .008) + 1), boost = nowMs < boostUntil;
      g.drawImage(skyC, 0, 0);
      if (!reduce) {
        const off = (T * .012) % 24;
        BANDS.forEach(b => { for (let x = b.x0 + off; x < b.x1; x += boost ? 12 : 24) for (let k = 0; k < 4; k++) { const xx = x + k, y = bandY(b, xx); if (y < back(xx) - 3 && !titleZone(xx, y)) G.p(xx, y, boost ? '#8FA6EC' : '#4A5DB0'); } });
        const th0 = (T * .0016) % SPIN;
        for (let arm = 0; arm < 2; arm++) for (let k = 0; k < (boost ? 30 : 8); k++) { const th = (th0 + k * .06) % SPIN, rr = 1.5 + th * 1.12, a = th + arm * Math.PI; G.p(SWX + Math.cos(a) * rr, SWY + Math.sin(a) * rr * .8, boost ? '#A9BBF2' : '#5266B8'); }
      }
      if (boost) { HALOS.forEach(([hx, hy]) => haloRing(G, hx, hy, true)); }
      HALOS.forEach(([hx, hy], i) => G.r(hx, hy, 2, 2, Math.sin(T * .0024 + i * 1.7) > -.2 ? '#FFF4C8' : '#E9C46A'));
      tw.forEach(s => { const v = Math.sin(T * .0021 * s.sp + s.ph); G.p(s.x, s.y, v > .35 ? s.c : s.d); if (s.big && v > .85) { G.p(s.x - 1, s.y, s.d); G.p(s.x + 1, s.y, s.d); G.p(s.x, s.y - 1, s.d); G.p(s.x, s.y + 1, s.d); } });
      const focus = lockId && nowMs < lockUntil ? lockId : null;
      CONS.forEach(c => {
        const hot = c.ids.includes(hover) || c.ids.includes(focus);
        c.seg.forEach(([a, b, e, f]) => G.line(a, b, e, f, hot ? '#8F88C0' : '#2B2850', 3));
        if (hot) G.text(c.name, c.at[0], c.at[1], '#C9C2E6');
        c.extra.forEach(([x, y]) => G.p(x, y, '#9A94C8'));
      });
      Object.entries(PROJ).forEach(([id, p]) => {
        const [x, y] = p.star, on = id === hover || id === focus;
        if (id === 'chaos8') { if (on) ringAround(PLX, PLY, 14 + pulse, '#FFE9A8'); return; }
        G.r(x, y, 2, 2, on ? '#FFE9A8' : '#E6E1F4');
        if (on) ringAround(x + .5, y + .5, 5 + pulse, '#FFE9A8'); else { G.p(x - 1, y, '#5F5A8A'); G.p(x + 2, y + 1, '#5F5A8A'); }
      });
      shoots.forEach(s => { if (s.wait > 0) return; G.p(s.x, s.y, '#FFFFFF'); ['#C9D4FF', '#8F88C0', '#5D5396', '#3A3070'].forEach((c, i) => G.p(s.x + (i + 1) * 1.6, s.y - (i + 1) * .8, c)); });
      g.drawImage(landC, 0, 0);
      bulbs.forEach(b => G.p(b.x, b.y, Math.sin(T * .0016 + b.ph) > -.5 ? b.c : '#3A2E3A'));
      let target;
      if (focus) target = Math.atan2(PROJ[focus].star[1] - PIV[1], PROJ[focus].star[0] - PIV[0]);
      else if (pointer) target = Math.atan2(pointer[1] - PIV[1], pointer[0] - PIV[0]);
      else target = -Math.PI / 2 + Math.sin(T * .0004) * .75;
      if (target > .5) target = -Math.PI + .55;
      target = Math.max(-2.6, Math.min(-.55, target));
      ang += (target - ang) * (reduce ? 1 : .14);
      const dx = Math.cos(ang), dy = Math.sin(ang), nx = -dy, ny = dx;
      [-1, 0, 1].forEach(k => G.line(PIV[0] + nx * k, PIV[1] + ny * k, PIV[0] + dx * 15 + nx * k, PIV[1] + dy * 15 + ny * k, k < 0 ? '#E0DBF2' : k === 0 ? '#C9C2E6' : '#8D86B0'));
      for (let k = -2; k <= 2; k++) G.p(PIV[0] + dx * 15 + nx * k, PIV[1] + dy * 15 + ny * k, '#3A3042');
      G.p(PIV[0] + dx * 16, PIV[1] + dy * 16, '#7FB2C9');
      const flick = Math.sin(T * .02) > .92;
      glowPts.forEach(([x, y]) => G.p(x, y, flick ? '#1F403E' : '#264E4B'));
      G.spr(HUMAN, HPAL, 233, 101);
      const blink = (T % 3600) < 140;
      G.spr(CAT, { o: '#D08A4E', e: blink ? '#D08A4E' : '#2A1810', n: '#E7A0A0' }, 244, 103);
      const tail = Math.round(Math.sin(T * .003) * 1.2);
      G.p(251, 110, '#D08A4E'); G.p(252, 109 + tail, '#D08A4E'); G.p(252, 108 + tail, '#D08A4E');
      if (state.lofi) [0, 5].forEach((off, i) => { const p = (Math.floor(T / 240) + off) % 10, x = 236 + i * 5 + (p % 2), y = 97 - p, c = i ? '#EDBE6C' : '#7FD1B9'; G.r(x + 1, y, 2, 1, c); G.r(x + 1, y + 1, 1, 3, c); G.r(x, y + 3, 2, 2, c); });
      g.drawImage(frontC, 0, 0);
      if (nowMs < catUntil) { G.r(239, 92, 21, 9, '#F1E9D2'); G.p(247, 101, '#F1E9D2'); G.p(248, 102, '#F1E9D2'); G.text('MRRP', 242, 94, '#2A2238'); }
      flies.forEach(f => { const x = f.x + Math.sin(T * .0006 + f.ph) * 10, y = f.y + Math.sin(T * .0011 + f.ph * 2) * 4; if (Math.sin(T * .003 + f.ph) > .1) G.p(x, y, '#E8FF7A'); });
      if (hover) { if (PROJ[hover]) { const [x, y] = PROJ[hover].star; plate(PROJ[hover].label, x + (hover === 'chaos8' ? 15 : 6), y - 3); } else if (hover === 'mail') plate(LBL.mail, 192, 98); else if (hover === 'cat') plate(LBL.cat, 238, 93); else if (hover === 'me') plate(LBL.me, 222, 93); else if (hover === 'obs') plate(LBL.obs, 262, 72); }
    };
    const step = () => {
      if (reduce) return;
      shoots.forEach(s => { if (s.wait > 0) { s.wait--; return; } s.x -= 2.3; s.y += 1.15; s.life--; });
      shoots = shoots.filter(s => s.life > 0);
      if (Math.random() < .004) spawn();
    };
    cv.addEventListener('pointermove', e => { const [x, y] = loc(e); pointer = [x, y]; hover = hit(x, y); cv.style.cursor = hover ? 'pointer' : 'default'; });
    cv.addEventListener('pointerleave', () => { pointer = null; hover = null; });
    cv.addEventListener('click', e => {
      const [x, y] = loc(e), h = hit(x, y);
      if (!h) return;
      if (PROJ[h]) { lockId = h; lockUntil = performance.now() + 2500; setTimeout(() => goTo('p-' + h), reduce ? 0 : 450); return; }
      if (h === 'mail') goTo('contact');
      else if (h === 'cat') { catUntil = performance.now() + 1600; dialogSay('That ginger furball is the observatory cat. It supervises every deploy.'); }
      else if (h === 'me') dialogSay("That's me, counting meteors between builds. Laptop open, obviously.");
      else if (h === 'obs') dialogSay('The telescope follows your cursor. The labelled stars are my projects; click one and it takes you there.');
    });
    draw(0);
    watch(cv, v => vis = v);
    const loop = t => { if (vis && t - last > 32) { last = t; step(); draw(t); } requestAnimationFrame(loop); };
    requestAnimationFrame(loop);
    return {
      pointAt: id => { lockId = id; lockUntil = performance.now() + 5000; },
      meow: () => { catUntil = performance.now() + 1600; },
      shoot: () => spawn(),
      shower: n => { for (let i = 0; i < n; i++) spawn(i * 6); },
      starry: () => { boostUntil = performance.now() + 12000; }
    };
  })();

  (() => {
    const cv = $('pool'), W = 200, H = 100; cv.width = W; cv.height = H;
    const g = cv.getContext('2d'), P = PX(g), RAIL = 8, RB = 2.6, PK = 5;
    const X0 = RAIL + RB, X1 = W - RAIL - RB, Y0 = RAIL + RB, Y1 = H - RAIL - RB;
    const POCKETS = [[RAIL + 1, RAIL + 1], [W / 2, RAIL - 1], [W - RAIL - 1, RAIL + 1], [RAIL + 1, H - RAIL - 1], [W / 2, H - RAIL + 1], [W - RAIL - 1, H - RAIL - 1]];
    const COL = ['#F1E9D2', '#EDBE6C', '#E0566E', '#29ADFF', '#141018', '#7FD1B9', '#B49AD8'];
    let balls = [], aim = null, potted = 0, vis = false, autoBroke = false, cueOut = false;
    const msg = $('poolMsg'), pot = $('potted');
    const rack = () => {
      balls = [{ x: 52, y: 50, vx: 0, vy: 0, c: COL[0], cue: true }];
      let k = 1; for (let row = 0; row < 3; row++) for (let i = 0; i <= row; i++) { balls.push({ x: 132 + row * 4.6, y: 50 + (i - row / 2) * 5.4, vx: 0, vy: 0, c: row === 2 && i === 1 ? COL[4] : COL[k === 4 ? 6 : k] }); k++; }
      potted = 0; cueOut = false; pot.textContent = '0/6'; msg.textContent = 'Drag back from the white ball, then let go.';
    };
    const cue = () => balls.find(b => b.cue);
    const moving = () => balls.some(b => Math.hypot(b.vx, b.vy) > .02);
    const shoot = (vx, vy) => { const c = cue(); if (!c) return; c.vx = vx; c.vy = vy; };
    const step = f => {
      balls.forEach(b => { b.x += b.vx * f; b.y += b.vy * f; const fr = Math.pow(.986, f); b.vx *= fr; b.vy *= fr; if (b.x < X0 || b.x > X1) { b.vx *= -.82; b.x = Math.max(X0, Math.min(X1, b.x)); } if (b.y < Y0 || b.y > Y1) { b.vy *= -.82; b.y = Math.max(Y0, Math.min(Y1, b.y)); } });
      for (let i = 0; i < balls.length; i++) for (let j = i + 1; j < balls.length; j++) {
        const a = balls[i], c = balls[j], ddx = c.x - a.x, ddy = c.y - a.y, dd = Math.hypot(ddx, ddy);
        if (dd > 0 && dd < RB * 2) { const nx = ddx / dd, ny = ddy / dd, p = (a.vx - c.vx) * nx + (a.vy - c.vy) * ny; if (p > 0) { a.vx -= p * nx; a.vy -= p * ny; c.vx += p * nx; c.vy += p * ny; } const o = (RB * 2 - dd) / 2; a.x -= nx * o; a.y -= ny * o; c.x += nx * o; c.y += ny * o; }
      }
      balls = balls.filter(b => {
        const inPocket = POCKETS.some(([px, py]) => Math.hypot(b.x - px, b.y - py) < PK);
        if (!inPocket) return true;
        if (b.cue) { cueOut = true; msg.textContent = 'Scratch. The white ball comes back when the table settles.'; return false; }
        potted++; pot.textContent = `${potted}/6`;
        msg.textContent = b.c === '#141018' && potted < 6 ? 'Potted the 8 early. In Chaos 8 that might even be allowed.' : potted === 6 ? 'Table cleared. Shark would be proud.' : 'Nice shot.';
        return false;
      });
      if (cueOut && !moving()) { let y = 50; while (balls.some(b => Math.hypot(b.x - 52, b.y - y) < RB * 2.2)) y += 6; balls.unshift({ x: 52, y, vx: 0, vy: 0, c: COL[0], cue: true }); cueOut = false; }
    };
    const draw = () => {
      P.r(0, 0, W, H, '#5E3A2C'); P.r(0, 0, W, 2, '#7A4A3A'); P.r(0, H - 2, W, 2, '#4A2E23');
      P.r(RAIL - 1, RAIL - 1, W - RAIL * 2 + 2, H - RAIL * 2 + 2, '#1D6B47'); P.r(RAIL - 1, RAIL - 1, W - RAIL * 2 + 2, 2, '#17583A');
      [[50, 3], [100, 3], [150, 3], [50, H - 4], [100, H - 4], [150, H - 4]].forEach(([x, y]) => P.r(x, y, 2, 1, '#E9D7B0'));
      P.r(52, RAIL + 2, 1, H - RAIL * 2 - 4, '#23805A');
      POCKETS.forEach(([x, y]) => P.circ(x, y, 4, '#0E0A10'));
      const c = cue();
      if (aim && c) {
        const ax = c.x - aim[0], ay = c.y - aim[1], len = Math.hypot(ax, ay), pw = Math.min(len, 60) / 60;
        if (len > 2) {
          const ux = ax / len, uy = ay / len;
          for (let i = 4; i < 10 + pw * 50; i += 3) P.p(c.x + ux * i, c.y + uy * i, '#F1E9D2');
          const back0 = 4 + pw * 10;
          P.line(c.x - ux * back0, c.y - uy * back0, c.x - ux * (back0 + 34), c.y - uy * (back0 + 34), '#C9A16E');
          P.p(c.x - ux * back0, c.y - uy * back0, '#EFE6D8');
        }
      }
      balls.forEach(b => { P.circ(b.x, b.y, 2, b.c); if (b.c === '#141018') P.p(b.x, b.y - 1, '#F1E9D2'); else P.p(b.x - 1, b.y - 1, '#FFFFFF66'); });
    };
    const loc = e => { const b = cv.getBoundingClientRect(); return [(e.clientX - b.left) / b.width * W, (e.clientY - b.top) / b.height * H]; };
    cv.addEventListener('pointerdown', e => { if (moving() || !cue()) return; autoBroke = true; aim = loc(e); cv.setPointerCapture(e.pointerId); draw(); });
    cv.addEventListener('pointermove', e => { if (!aim) return; aim = loc(e); draw(); });
    const release = () => { if (!aim) return; const c = cue(); if (c) { const ax = c.x - aim[0], ay = c.y - aim[1], len = Math.hypot(ax, ay); if (len > 3) { const pw = Math.min(len, 60) / 60 * 6.2; shoot(ax / len * pw, ay / len * pw); msg.textContent = 'Rolling…'; } } aim = null; };
    cv.addEventListener('pointerup', release); cv.addEventListener('pointercancel', () => { aim = null; draw(); });
    $('rerack').addEventListener('click', () => { rack(); draw(); });
    rack(); draw();
    watch(cv, v => { vis = v; if (v && !autoBroke && !reduce) { autoBroke = true; setTimeout(() => shoot(5.6, (Math.random() - .5) * .5), 600); } });
    let lastT = 0;
    const loop = t => { const f = Math.min(3, (t - (lastT || t)) / 16.67); lastT = t; if (vis && (moving() || cueOut)) { step(f); draw(); if (!moving() && !cueOut && msg.textContent === 'Rolling…') msg.textContent = 'Your shot.'; } requestAnimationFrame(loop); };
    requestAnimationFrame(loop);
  })();

  $('tmMoon').textContent = `☾ ${illum}%`;
  $('nowSky').textContent = `Moon ${illum}% lit, ${phase.toLowerCase()}. ${next.n} ${days === 0 ? 'peak tonight' : `peak in ${days} day${days === 1 ? '' : 's'}`}.`;
  (() => {
    const c = $('nowMoon'); c.width = 24; c.height = 24; const P = PX(c.getContext('2d')), wax = ph < .5, tc = Math.cos(2 * Math.PI * ph), R0 = 7;
    P.r(0, 0, 24, 24, '#141325');
    [[3, 4], [20, 3], [19, 20], [4, 19], [12, 1]].forEach(([x, y], i) => P.p(x, y, i % 2 ? '#C9C4DA' : '#EDBE6C'));
    for (let y = -R0; y <= R0; y++) for (let x = -R0; x <= R0; x++) { if (x * x + y * y > R0 * R0 + R0 * .8) continue; const chord = Math.sqrt(Math.max(.01, R0 * R0 - y * y)), xs = x / chord, lit = wax ? xs > tc : xs < -tc; P.p(12 + x, 12 + y, lit ? ((x * 5 + y * 3 + 40) % 11 === 0 ? '#D4CBB2' : '#F1E9D2') : '#272545'); }
  })();
  const yrsMos = (y, m) => { const n = (now.getFullYear() - y) * 12 + now.getMonth() - m + 2, yr = Math.floor(n / 12), mo = n % 12; return [yr && `${yr} yr${yr > 1 ? 's' : ''}`, mo && `${mo} mo${mo > 1 ? 's' : ''}`].filter(Boolean).join(' '); };
  document.querySelectorAll('[data-since]').forEach(el => { const [y, m] = el.dataset.since.split('-').map(Number); el.textContent = yrsMos(y, m); });
  const tick = () => { $('tmClock').textContent = hhmm(new Date()); };
  tick(); setInterval(tick, 30000);

  const wins = [...document.querySelectorAll('.wins a')], secs = ['home', 'experience', 'skills', 'projects', 'now', 'console', 'contact'].map(id => $(id));
  const spy = () => { let cur = 'home'; secs.forEach(s => { if (s.getBoundingClientRect().top < innerHeight * .4) cur = s.id; }); wins.forEach(a => a.classList.toggle('on', a.dataset.win === cur)); };
  addEventListener('scroll', spy, { passive: true }); spy();

  const amb = $('amb'), radioBtn = $('radioBtn'), radioEl = $('radio'), radioState = $('radioState'), hz = m => 440 * Math.pow(2, (m - 69) / 12);
  const CH = [[57, 60, 64, 67], [53, 57, 60, 64], [48, 52, 55, 59], [55, 59, 62, 65]], CHN = ['Am7', 'Fmaj7', 'Cmaj7', 'G7'], ARP = [0, 2, 1, 3, 2, 1, 3, 2];
  let ac, master, timer, beat = 0;
  const tone = (f, t, dur, type, vol, atk = .02) => { const o = ac.createOscillator(), gn = ac.createGain(); o.type = type; o.frequency.value = f; gn.gain.setValueAtTime(0, t); gn.gain.linearRampToValueAtTime(vol, t + atk); gn.gain.exponentialRampToValueAtTime(.0001, t + dur); o.connect(gn); gn.connect(master); o.start(t); o.stop(t + dur + .05); };
  const beatStep = () => { const t = ac.currentTime + .06, ci = Math.floor(beat / 16) % 4, c = CH[ci]; if (beat % 16 === 0) { c.forEach(m => tone(hz(m - 12), t, 4.8, 'triangle', .035, .6)); radioState.textContent = `playing · ${CHN[ci]} · made live in your browser`; } if (beat % 8 === 0) tone(hz(c[0] - 24), t, 1.4, 'sine', .12); if (beat % 2 === 0 && Math.random() > .15) tone(hz(c[ARP[(beat / 2) % 8]] + 12), t, .6, 'sine', .045); beat++; };
  const setLofiUI = v => {
    amb.setAttribute('aria-pressed', String(v)); amb.textContent = v ? '♪ lo-fi on' : '♪ lo-fi off';
    radioBtn.setAttribute('aria-pressed', String(v)); radioBtn.querySelector('.pi').textContent = v ? '❚❚' : '▶';
    radioBtn.setAttribute('aria-label', v ? 'Pause night radio' : 'Play night radio');
    radioEl.classList.toggle('on', v);
    if (!v) radioState.textContent = 'lo-fi, made live in your browser';
  };
  const lofi = want => {
    try {
      if (want === state.lofi) return state.lofi;
      if (!ac) {
        ac = new (window.AudioContext || window.webkitAudioContext)();
        master = ac.createGain(); master.gain.value = 0;
        const lp = ac.createBiquadFilter(), dl = ac.createDelay(), fb = ac.createGain(), wet = ac.createGain();
        lp.type = 'lowpass'; lp.frequency.value = 1500; dl.delayTime.value = .36; fb.gain.value = .32; wet.gain.value = .28;
        master.connect(lp); lp.connect(ac.destination); lp.connect(dl); dl.connect(fb); fb.connect(dl); dl.connect(wet); wet.connect(ac.destination);
      }
      state.lofi = want; setLofiUI(want);
      const t = ac.currentTime; master.gain.cancelScheduledValues(t); master.gain.setValueAtTime(master.gain.value, t);
      if (want) { ac.resume(); beat = 0; master.gain.linearRampToValueAtTime(.85, t + 1.2); beatStep(); timer = setInterval(beatStep, 300); }
      else { master.gain.linearRampToValueAtTime(0, t + .6); clearInterval(timer); }
    } catch (e) { amb.textContent = '♪ unavailable'; radioState.textContent = "audio isn't available here"; }
    return state.lofi;
  };
  amb.addEventListener('click', () => lofi(!state.lofi));
  radioBtn.addEventListener('click', () => lofi(!state.lofi));

  (() => {
    const out = $('out'), inp = $('cmd'), ps1 = $('ps1'), stMode = $('stMode'), stCwd = $('stCwd'), stCount = $('stCount'), title = $('termTitle');
    const txt = el => el ? el.textContent.replace(/\s+/g, ' ').trim() : '';
    const md = (head, meta, sum, pts, stack) => [`# ${head}`, `@ ${meta}`, sum, '', ...pts.map(p => `- ${p}`), '', `stack  ${stack}`].join('\n');
    const cardMd = el => md(txt(el.querySelector('h3')), txt(el.querySelector('.e-meta')), txt(el.querySelector('.e-sum')), [...el.querySelectorAll('.e-pts li')].map(txt), [...el.querySelectorAll('.tags span')].map(txt).join(' · '));
    const dirOf = d => Object.fromEntries(Object.keys(PROJ).filter(id => PROJ[id].dir === d && $('p-' + id)).map(id => [`${id}.md`, cardMd($('p-' + id))]));
    const SKILLS = [...document.querySelectorAll('.srow')].map(r => [r.dataset.k, [...r.querySelectorAll('.chip')].map(c => (c.classList.contains('core') ? '★ ' : '') + txt(c))]);
    const NOW = [...document.querySelectorAll('.now-list li')].map(li => { const v = li.querySelector('span'); return [txt(li.querySelector('b')), v.classList.contains('tbd') ? `(${txt(v)})` : txt(v)]; }).concat([['sky', `${next.n} ${inDays}, moon ${illum}% lit`]]);
    const JOBS = [
      { role: 'Software Developer', co: 'Rolaface Softwares', when: 'Jul 2023 – present', where: 'Dehradun, India', ids: ['los', 'lms', 'hrms', 'erp', 'recon', 'tazama', 'mojaloop'] },
      { role: 'Backend Developer', co: 'Kaveosoft Innovations', when: 'Jun 2021 – Jul 2023', where: 'Haldwani, India', ids: ['access-sa', 'access-gh'] }
    ];
    const EDU = 'B.Tech, Computer Science and Engineering\nGraphic Era (Deemed to be University), Dehradun\n2019 – 2023 · CGPA 8.44';
    const FS = {
      'about.txt': 'Akhilesh Rawat\nFull-stack developer and technical lead · Dehradun, India\n\n5+ years designing, building and shipping fintech, lending,\nHR and ERP platforms with React, TypeScript, Node.js,\nPython and Java. Tech lead for the open-source Tazama case\nmanagement system and an HRMS on Frappe, and a contributor\nto the open-source Mojaloop payments platform.\n\nAfter dark: pixel art, games, music, manga and the night sky.',
      'experience.txt': JOBS.map(j => `# ${j.role} @ ${j.co}\n@ ${j.when} · ${j.where}\n${j.ids.map(id => '- ' + PROJ[id].name).join('\n')}`).join('\n\n'),
      'education.txt': EDU,
      'skills.txt': SKILLS.map(([k, v]) => `${k.padEnd(10)} ${v.join(' · ')}`).join('\n') + '\n\n★ = main stack',
      'now.txt': NOW.map(([k, v]) => `${k.padEnd(10)} ${v}`).join('\n'),
      'contact.txt': `email     ${EMAIL}\nlinkedin  linkedin.com/in/akhilesh-rawat-asr\ngithub    github.com/Akku-Rawat\nrésumé    open resume.pdf`,
      'resume.pdf': null,
      '.secrets': "it's just a list of meteor showers.\nquadrantids, lyrids, eta aquariids, perseids, orionids, leonids, geminids.\nalso: try the konami code on this page.",
      '.zshrc': "alias hire='open resume.pdf && mail akhilesh'\nexport SKY=starry\nexport COFFEE=probably",
      work: dirOf('work'),
      'after-dark': dirOf('after-dark')
    };
    const isDir = v => v !== null && typeof v === 'object';
    const get = segs => { let n = FS; for (const s of segs) { if (!isDir(n) || !Object.prototype.hasOwnProperty.call(n, s)) return undefined; n = n[s]; } return n; };
    let cwd = [], hist = [], hi = 0, count = 0, queue = [], pumping = false, greeted = false;
    const resolve = p => { const segs = p.startsWith('~') || p.startsWith('/') ? [] : [...cwd]; p.replace(/^~\/?/, '').replace(/^\/(home\/akku\/?)?/, '').split('/').forEach(s => { if (!s || s === '.') return; if (s === '..') segs.pop(); else segs.push(s); }); return segs; };
    const pathStr = segs => '~' + (segs.length ? '/' + segs.join('/') : '');
    const updatePS1 = () => { ps1.innerHTML = ''; ps1.append('akku@observatory:'); const b = document.createElement('b'); b.textContent = pathStr(cwd); ps1.append(b, '$'); stCwd.textContent = pathStr(cwd); title.textContent = `akku@observatory: ${pathStr(cwd)}`; };
    const node = p => {
      if (typeof p === 'string') return document.createTextNode(p);
      if (p.href) { const a = document.createElement('a'); a.textContent = p.t; a.href = p.href; a.className = 'run' + (p.c ? ' ' + p.c : ''); if (!p.href.startsWith('mailto:')) { a.target = '_blank'; a.rel = 'noopener'; } a.addEventListener('click', ev => ev.stopPropagation()); return a; }
      const e = document.createElement(p.cmd ? 'button' : 'span'); e.textContent = p.t; e.className = (p.c || '') + (p.cmd ? ' run' : ''); if (p.cmd) { e.type = 'button'; e.addEventListener('click', ev => { ev.stopPropagation(); run(p.cmd); }); } return e;
    };
    const pump = () => { if (pumping) return; pumping = true; const nextLine = () => { const dEl = queue.shift(); if (!dEl) { pumping = false; return; } out.appendChild(dEl); out.scrollTop = out.scrollHeight; if (reduce) nextLine(); else setTimeout(nextLine, 11); }; nextLine(); };
    const print = (parts = '', cls = '') => { const dEl = document.createElement('div'); dEl.className = 'ln' + (cls ? ' ' + cls : ''); (Array.isArray(parts) ? parts : [parts]).forEach(p => { if (p !== '' && p != null) dEl.appendChild(node(p)); }); queue.push(dEl); pump(); };
    const lines = (str, cls) => str.split('\n').forEach(l => print(l, cls));
    const echoCmd = v => print([{ t: 'akku@observatory', c: 'u' }, { t: ':', c: 'd' }, { t: pathStr(cwd), c: 'path' }, { t: '$ ', c: 'd' }, v]);
    const walk = (dir, segs, cb) => Object.keys(dir).forEach(k => { const v = dir[k]; if (isDir(v)) walk(v, [...segs, k], cb); else if (typeof v === 'string') cb([...segs, k], v); });
    const leven = (a, b) => { const m = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]); for (let j = 1; j <= b.length; j++) m[0][j] = j; for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++) m[i][j] = Math.min(m[i - 1][j] + 1, m[i][j - 1] + 1, m[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)); return m[a.length][b.length]; };
    const link = (k, label, href) => print([{ t: k.padEnd(10), c: 'k' }, { t: label, href }]);
    const openUrl = (href, label) => { print([{ t: '→ opening ', c: 'd' }, { t: label, href }]); try { window.open(href, '_blank', 'noopener'); } catch (e) { } };
    const FACTS = ["Benford's Law: in a lot of real-world data, about 30% of numbers start with a 1. Tazama's fraud charts include a Benford's Law analysis.", 'The Mojaloop reporting APIs support 100k+ transactions a day.', "The ERP's e-invoicing integration passed the Zambia Revenue Authority's certification.", 'The loan origination rule engines look at 20+ applicant variables.', 'Creddex encrypts every secret with AES-256-GCM.', 'Chaos 8 has 14 chaos modifiers, plus dares and power-ups.', "The moon on the hill is tonight's real phase.", "The sky's swirls are borrowed from Van Gogh's The Starry Night."];
    let factI = Math.floor(Math.random() * FACTS.length);

    const CMDS = {
      help() {
        const row = (label, cmds) => { const parts = [{ t: label.padEnd(10), c: 'k' }]; cmds.forEach((c, i) => { parts.push({ t: c, cmd: c.startsWith('cd ') ? `${c} && ls` : c }); if (i < cmds.length - 1) parts.push('  '); }); print(parts); };
        row('about me', ['whoami', 'experience', 'skills', 'education', 'resume', 'contact']);
        row('explore', ['ls', 'cd work', 'cat about.txt', 'tree', 'grep react', 'open los']);
        row('the sky', ['sky', 'point tazama', 'wish', 'starry']);
        row('just fun', ['neofetch', 'now', 'meow', 'lofi', 'sudo', 'vim']);
        print(''); print({ t: 'tab completes · ↑↓ history · ctrl+l clears · ` jumps here from anywhere', c: 'd' });
      },
      ls(a) {
        const all = a.some(x => /^-\w*a/.test(x)), target = a.find(x => !x.startsWith('-')), segs = target ? resolve(target) : cwd, n = get(segs);
        if (n === undefined) return print({ t: `ls: ${target}: no such file or directory`, c: 'err' });
        if (!isDir(n)) return print(target);
        const names = Object.keys(n).filter(k => all || !k.startsWith('.')), parts = [];
        names.forEach((k, i) => { const rel = target ? `${target.replace(/\/$/, '')}/${k}` : k; parts.push(isDir(n[k]) ? { t: k + '/', c: 'dir', cmd: `cd ${rel} && ls` } : k.endsWith('.pdf') ? { t: k, c: 'h', cmd: `open ${rel}` } : { t: k, cmd: `cat ${rel}` }); if (i < names.length - 1) parts.push('   '); });
        print(parts.length ? parts : { t: '(empty)', c: 'd' });
      },
      cd(a) { const t = a[0] || '~', segs = resolve(t), n = get(segs); if (n === undefined) return print({ t: `cd: no such file or directory: ${t}`, c: 'err' }); if (!isDir(n)) return print({ t: `cd: not a directory: ${t}`, c: 'err' }); cwd = segs; updatePS1(); },
      pwd() { print('/home/akku' + (cwd.length ? '/' + cwd.join('/') : '')); },
      cat(a) {
        if (!a.length) return print({ t: 'usage: cat <file>   try: cat about.txt', c: 'd' });
        a.forEach(f => {
          const n = get(resolve(f));
          if (n === undefined) return print({ t: `cat: ${f}: no such file or directory`, c: 'err' });
          if (isDir(n)) return print([{ t: `cat: ${f}: is a directory. `, c: 'err' }, { t: `ls ${f}`, cmd: `ls ${f}` }]);
          if (n === null) return print([{ t: 'binary file. try: ', c: 'd' }, { t: 'open resume.pdf', cmd: 'open resume.pdf' }]);
          n.split('\n').forEach(l => print(l.startsWith('# ') ? { t: l.slice(2), c: 'h' } : l.startsWith('@ ') ? { t: l.slice(2), c: 'd' } : l.startsWith('- ') ? [{ t: '✦ ', c: 'h' }, l.slice(2)] : l));
        });
      },
      tree(a) {
        const segs = a[0] ? resolve(a[0]) : cwd, n = get(segs);
        if (!isDir(n)) return print({ t: 'tree: not a directory', c: 'err' });
        print({ t: pathStr(segs), c: 'path' });
        let files = 0, dirs = 0;
        const rec = (dir, pre, base) => { const ks = Object.keys(dir).filter(k => !k.startsWith('.')); ks.forEach((k, i) => { const lastK = i === ks.length - 1, rel = [...base, k].join('/'), sub = isDir(dir[k]); sub ? dirs++ : files++; print([{ t: pre + (lastK ? '└── ' : '├── '), c: 'd' }, sub ? { t: k + '/', c: 'dir', cmd: `cd ~/${rel} && ls` } : k.endsWith('.pdf') ? { t: k, c: 'h', cmd: `open ~/${rel}` } : { t: k, cmd: `cat ~/${rel}` }]); if (sub) rec(dir[k], pre + (lastK ? '    ' : '│   '), [...base, k]); }); };
        rec(n, '', segs); print({ t: `${dirs} directories, ${files} files`, c: 'd' });
      },
      grep(a) {
        const term = a.filter(x => !x.startsWith('-')).join(' ').replace(/^["']|["']$/g, '').toLowerCase();
        if (!term) return print({ t: 'usage: grep <word>   try: grep react', c: 'd' });
        let hits = 0;
        walk(FS, [], (segs, body) => body.split('\n').forEach(l => { const i = l.toLowerCase().indexOf(term); if (i < 0) return; hits++; const rel = segs.join('/'), cut = /^(# |@ |- )/.test(l) && i >= 2 ? 2 : 0; print([{ t: rel, c: 'path', cmd: `cat ~/${rel}` }, { t: ': ', c: 'd' }, l.slice(cut, i), { t: l.slice(i, i + term.length), c: 'mark' }, l.slice(i + term.length)]); }));
        print(hits ? { t: `${hits} match${hits === 1 ? '' : 'es'}`, c: 'd' } : { t: `no matches for "${term}"`, c: 'd' });
      },
      open(a) {
        const q = (a[0] || '').toLowerCase().replace(/^.*\//, '').replace(/\.(md|pdf|txt)$/, '');
        if (!q) return print({ t: 'usage: open <project | resume | linkedin | github>   try: open los', c: 'd' });
        if (['resume', 'résumé', 'cv'].includes(q)) return openUrl(RESUME, RESUME);
        if (q === 'linkedin') return openUrl(LINKEDIN, 'linkedin.com/in/akhilesh-rawat-asr');
        if (q === 'github') return openUrl(GITHUB, 'github.com/Akku-Rawat');
        const p = PROJ[q];
        if (!p) return print([{ t: `open: ${a[0]}: no such project. try `, c: 'err' }, { t: 'ls work', cmd: 'ls work' }]);
        print([{ t: '→ ', c: 'd' }, { t: p.name, c: 'h' }, { t: ` · ${p.short}`, c: 'd' }]); goTo('p-' + q);
      },
      echo(a, raw) { print(raw.replace(/^echo\s*/, '').replace(/^["']|["']$/g, '').replace(/\$SKY/g, 'starry').replace(/\$USER/g, 'akku')); },
      history() { hist.forEach((h, i) => print([{ t: String(i + 1).padStart(4) + '  ', c: 'd' }, { t: h, cmd: h }])); },
      clear() { out.innerHTML = ''; queue = []; },
      whoami() { print({ t: 'akhilesh rawat · full-stack developer and technical lead', c: 'h' }); print('5+ years in fintech, lending, HR and ERP · dehradun, india'); print([{ t: 'more: ', c: 'd' }, { t: 'experience', cmd: 'experience' }, { t: ' · ', c: 'd' }, { t: 'skills', cmd: 'skills' }, { t: ' · ', c: 'd' }, { t: 'resume', cmd: 'resume' }]); },
      experience() {
        JOBS.forEach((j, i) => {
          if (i) print('');
          print([{ t: j.role, c: 'h' }, ` @ ${j.co}`]);
          print({ t: `${j.when} · ${j.where}`, c: 'd' });
          j.ids.forEach(id => print([{ t: '  ✦ ', c: 'h' }, { t: PROJ[id].name, cmd: `cat ~/work/${id}.md` }, { t: ` · ${PROJ[id].short}`, c: 'd' }]));
        });
        print(''); print([{ t: 'education ', c: 'k' }, 'B.Tech CSE, Graphic Era University, 2019–2023, CGPA 8.44']);
      },
      education() { lines(EDU); },
      neofetch() {
        const logo = ['      *     .      *', '  .      _____      .', "       .'  |  '.", '      /    |    \\    *', '     |_____|_____|', '     |  []   []  |', '  ___|_____[]____|___', '', '', ''];
        const info = [[{ t: 'akku', c: 'u' }, { t: '@', c: 'd' }, { t: 'observatory', c: 'u' }], [{ t: '────────────────', c: 'd' }], ...[['name', 'Akhilesh Rawat'], ['role', 'Full-stack developer · tech lead'], ['exp', '5+ years'], ['work', 'Rolaface Softwares'], ['focus', 'lending · payments · fraud · ERP'], ['stack', 'React · TS · Node · Python · Java'], ['shell', 'zsh, obviously'], ['moon', `${phase.toLowerCase()}, ${illum}% lit`]].map(([k, v]) => [{ t: k.padEnd(8), c: 'k' }, v])];
        const narrow = out.clientWidth < 600;
        info.forEach((parts, i) => print(narrow ? parts : [{ t: (logo[i] || '').padEnd(24), c: 'logo' }, ...parts]));
        print([{ t: narrow ? '' : ' '.repeat(24) }, ...['#EDBE6C', '#7FD1B9', '#9DA3F2', '#EBA3AE', '#E0566E', '#B49AD8'].map(c => ({ t: '██', c: 'sw' + c.slice(1) }))]);
      },
      skills() { SKILLS.forEach(([k, v]) => print([{ t: k.padEnd(11), c: 'k' }, v.join(' · ')])); print({ t: '★ = main stack', c: 'd' }); },
      now() { NOW.forEach(([k, v]) => print([{ t: k.padEnd(11), c: 'k' }, v])); },
      sky() { print({ t: `local time ${hhmm(new Date())}. always night at the observatory.`, c: 'h' }); print(`moon     ${phase.toLowerCase()}, ${illum}% lit`); print(`meteors  ${next.n} ${inDays}`); print([{ t: 'try: ', c: 'd' }, { t: 'starry', cmd: 'starry' }, { t: ' or ', c: 'd' }, { t: 'point chaos8', cmd: 'point chaos8' }]); },
      moon() { print(`${phase.toLowerCase()}, ${illum}% lit`); },
      meteors() { print(`${next.n} · ${inDays}`); },
      point(a) { const id = (a[0] || '').toLowerCase(); if (!PROJ[id]) return print({ t: a[0] ? `point: can't find ${a[0]} in the sky. try ls work` : 'usage: point <project>   try: point tazama', c: 'd' }); print({ t: `slewing the telescope to ${PROJ[id].name} ↑`, c: 'h' }); goTo('home'); setTimeout(() => hero.pointAt(id), reduce ? 0 : 500); },
      wish() { factI = (factI + 1) % FACTS.length; print({ t: 'a shooting star crosses the hill. fun fact:', c: 'h' }); print(FACTS[factI]); hero.shoot(); },
      meow() { hero.meow(); print('mrrp. the cat approves of your commit.'); },
      lofi() { print(lofi(!state.lofi) ? 'lo-fi on ♪  (look at the bench)' : 'lo-fi off'); },
      starry() { hero.starry(); print({ t: 'Starry Night mode for 12 seconds. Look up ↑', c: 'h' }); goTo('home'); },
      hire() { print({ t: 'excellent choice.', c: 'h' }); link('email', EMAIL, 'mailto:' + EMAIL); link('linkedin', 'linkedin.com/in/akhilesh-rawat-asr', LINKEDIN); link('github', 'github.com/Akku-Rawat', GITHUB); link('résumé', RESUME, RESUME); },
      sudo(a) { if (a.join(' ').toLowerCase().includes('hire')) { print({ t: 'permission granted.', c: 'h' }); return CMDS.hire(); } print({ t: 'permission denied. the telescope only answers to akku.', c: 'err' }); },
      rm() { print({ t: 'rm: the stars are read-only.', c: 'err' }); },
      vim() { print("opening vim… just kidding. you'd never get out. (it's :q)"); },
      exit() { print('logout? the meteors are just getting started.'); },
      date() { print(new Date().toString()); }
    };
    Object.assign(CMDS, { fortune: CMDS.wish, music: CMDS.lofi, play: CMDS.lofi, vangogh: CMDS.starry, man: CMDS.help, cls: CMDS.clear, nano: CMDS.vim, emacs: CMDS.vim, contact: CMDS.hire, email: CMDS.hire, mail: CMDS.hire, jobs: CMDS.experience, ll: () => CMDS.ls(['-a']), about: () => CMDS.cat(['about.txt']), resume: () => CMDS.open(['resume']), cv: () => CMDS.open(['resume']), linkedin: () => CMDS.open(['linkedin']), github: () => CMDS.open(['github']), cat8: CMDS.meow });

    const run = raw => {
      const v = raw.trim(); if (!v) return;
      echoCmd(v); hist.push(v); hi = hist.length; count++; stCount.textContent = `${count} cmd${count === 1 ? '' : 's'}`;
      v.split('&&').map(s => s.trim()).filter(Boolean).forEach(seg => {
        const [c, ...a] = seg.split(/\s+/), fn = CMDS[c.toLowerCase()];
        if (fn) return fn(a, seg);
        const near = Object.keys(CMDS).map(k => [k, leven(c.toLowerCase(), k)]).sort((x, y) => x[1] - y[1])[0];
        print([{ t: `zsh: command not found: ${c}`, c: 'err' }, ...(near && near[1] <= 2 ? [{ t: '   did you mean ', c: 'd' }, { t: near[0], cmd: near[0] }, { t: '?', c: 'd' }] : [{ t: '   try ', c: 'd' }, { t: 'help', cmd: 'help' }])]);
      });
    };
    const complete = () => {
      const v = inp.value, m = v.match(/^(.*?)(\S*)$/), before = m[1], tok = m[2], first = !before.trim();
      let opts;
      if (first) opts = Object.keys(CMDS).filter(c => c.startsWith(tok));
      else {
        const cmd = before.trim().split(/\s+/)[0];
        if (['open', 'point'].includes(cmd)) opts = Object.keys(PROJ).concat(cmd === 'open' ? ['resume', 'linkedin', 'github'] : []).filter(k => k.startsWith(tok));
        else { const slash = tok.lastIndexOf('/'), dirPart = slash >= 0 ? tok.slice(0, slash + 1) : '', base = tok.slice(slash + 1), n = get(dirPart ? resolve(dirPart) : cwd); opts = isDir(n) ? Object.keys(n).filter(k => k.startsWith(base) && (base.startsWith('.') || !k.startsWith('.'))).map(k => dirPart + k + (isDir(n[k]) ? '/' : '')) : []; }
      }
      if (!opts.length) return;
      if (opts.length === 1) { inp.value = before + opts[0] + (opts[0].endsWith('/') ? '' : ' '); return; }
      const pre = opts.reduce((x, y) => { let i = 0; while (i < x.length && x[i] === y[i]) i++; return x.slice(0, i); });
      if (pre.length > tok.length) inp.value = before + pre;
      else { echoCmd(v); print({ t: opts.join('   '), c: 'd' }); }
    };
    $('form').addEventListener('submit', e => { e.preventDefault(); run(inp.value); inp.value = ''; });
    inp.addEventListener('keydown', e => {
      if (e.key === 'Tab' && inp.value) { e.preventDefault(); complete(); }
      else if (e.key === 'ArrowUp' && hist.length) { e.preventDefault(); hi = Math.max(0, hi - 1); inp.value = hist[hi]; }
      else if (e.key === 'ArrowDown' && hist.length) { e.preventDefault(); hi = Math.min(hist.length, hi + 1); inp.value = hist[hi] || ''; }
      else if (e.ctrlKey && e.key.toLowerCase() === 'l') { e.preventDefault(); CMDS.clear(); }
      else if (e.ctrlKey && e.key.toLowerCase() === 'c' && !String(window.getSelection())) { e.preventDefault(); echoCmd(inp.value + '^C'); inp.value = ''; }
    });
    inp.addEventListener('focus', () => { stMode.textContent = 'INSERT'; stMode.classList.add('ins'); });
    inp.addEventListener('blur', () => { stMode.textContent = 'NORMAL'; stMode.classList.remove('ins'); });
    out.addEventListener('click', e => { if (!e.target.closest('button, a') && !String(window.getSelection())) inp.focus({ preventScroll: true }); });
    document.querySelectorAll('.cheats [data-cmd]').forEach(btn => btn.addEventListener('click', () => run(btn.dataset.cmd)));
    addEventListener('keydown', e => {
      if (e.key !== '`' || e.ctrlKey || e.metaKey || e.altKey) return;
      const t = e.target; if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return;
      e.preventDefault(); $('console').scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' }); setTimeout(() => inp.focus({ preventScroll: true }), reduce ? 0 : 500);
    });
    print({ t: `Last login: ${now.toDateString()} ${hhmm(now)} from your browser`, c: 'd' });
    watch($('term'), v => { if (!v || greeted) return; greeted = true; run('neofetch'); print([{ t: 'type ', c: 'd' }, { t: 'help', cmd: 'help' }, { t: ', click anything underlined, or try ', c: 'd' }, { t: 'experience', cmd: 'experience' }]); });
    updatePS1();
  })();

  const KON = ['arrowup', 'arrowup', 'arrowdown', 'arrowdown', 'arrowleft', 'arrowright', 'arrowleft', 'arrowright', 'b', 'a'];
  let kpos = 0;
  addEventListener('keydown', e => { if (e.target && e.target.tagName === 'INPUT') return; const k = e.key.toLowerCase(); kpos = k === KON[kpos] ? kpos + 1 : k === KON[0] ? 1 : 0; if (kpos === KON.length) { kpos = 0; hero.shower(24); dialogSay('Meteor shower unlocked. Make a wish.'); } });

  if (!reduce) { const t0 = dlgFull; dlgText.textContent = ''; setTimeout(() => dialogSay(t0), 250); }
})();
