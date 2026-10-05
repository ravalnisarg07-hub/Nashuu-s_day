/* ============ CONFIG: Nissuuu, paste your links here ============ */
const PLAYLISTS = {
  rainy: { icon: '🌧️', name: 'Rainy',  title: 'Rain on the window',   sub: 'warm socks, nowhere to be', c: ['#b8d4f5', '#cdb9f6'], url: '' },
  sleepy:{ icon: '🌙', name: 'Sleepy', title: 'Soft and slow',        sub: 'for closing your eyes',     c: ['#9d8bd8', '#ffc0d6'], url: '' },
  calm:  { icon: '☁️', name: 'Calm',   title: 'Cloud-level quiet',    sub: 'nothing to solve',          c: ['#d7ecff', '#e6dcff'], url: '' },
  happy: { icon: '✨', name: 'Happy',  title: 'Tiny sparkle songs',   sub: 'for a little lift',         c: ['#ffe2cf', '#ffc0d6'], url: '' },
  main:  { icon: '🎧', name: 'Main-character mode', title: 'Walk like the soundtrack is on', sub: 'headphones on, world off', c: ['#ff9fc2', '#cdb9f6'], url: '' }
};
/* Spotify / YouTube links go in the url fields above. No music is bundled. */

/* ============ helpers ============ */
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const pick = a => a[Math.floor(Math.random() * a.length)];
const lastPick = {};
const fresh = (k, a) => { let x; do { x = pick(a); } while (x === lastPick[k] && a.length > 1); return lastPick[k] = x; };
const store = {
  get: (k, d) => { try { const v = localStorage.getItem('nsp-' + k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
  set: (k, v) => { try { localStorage.setItem('nsp-' + k, JSON.stringify(v)); } catch (e) {} }
};

/* ============ panda ============ */
const PANDA = `<svg viewBox="0 0 200 210" aria-hidden="true">
<g class="body"><ellipse cx="100" cy="160" rx="50" ry="42" fill="#fff" stroke="#eadcf0" stroke-width="2"/>
<ellipse class="armL" cx="62" cy="150" rx="12" ry="26" fill="#3b2f45"/><ellipse class="armR" cx="138" cy="150" rx="12" ry="26" fill="#3b2f45"/>
<ellipse cx="72" cy="196" rx="15" ry="9" fill="#3b2f45"/><ellipse cx="128" cy="196" rx="15" ry="9" fill="#3b2f45"/></g>
<g class="mug"><rect x="112" y="150" width="28" height="24" rx="7" fill="#fff0e6" stroke="#f3b8c8" stroke-width="2"/><path d="M140 156q10 4 0 14" fill="none" stroke="#f3b8c8" stroke-width="3"/><g class="steam" stroke="#fff" stroke-width="2.5" fill="none" stroke-linecap="round"><path d="M120 144q-4-6 0-10M130 144q4-6 0-10"/></g></g>
<g class="head"><circle cx="62" cy="50" r="17" fill="#3b2f45"/><circle cx="138" cy="50" r="17" fill="#3b2f45"/>
<ellipse cx="100" cy="88" rx="57" ry="46" fill="#fff" stroke="#eadcf0" stroke-width="2"/>
<ellipse cx="76" cy="88" rx="12" ry="16" fill="#3b2f45" transform="rotate(20 76 88)"/><ellipse cx="124" cy="88" rx="12" ry="16" fill="#3b2f45" transform="rotate(-20 124 88)"/>
<g class="eo"><circle cx="77" cy="88" r="5" fill="#fff"/><circle cx="78" cy="89" r="2.4" fill="#3b2f45"/><circle cx="123" cy="88" r="5" fill="#fff"/><circle cx="122" cy="89" r="2.4" fill="#3b2f45"/></g>
<g class="ec" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round"><path d="M69 90q8 6 16 0M115 90q8 6 16 0"/></g>
<ellipse cx="100" cy="102" rx="6" ry="4" fill="#3b2f45"/><path d="M92 109q8 7 16 0" fill="none" stroke="#3b2f45" stroke-width="2.5" stroke-linecap="round"/>
<circle cx="60" cy="108" r="7" fill="#ffb7cf" opacity=".7"/><circle cx="140" cy="108" r="7" fill="#ffb7cf" opacity=".7"/></g>
<g class="blanket"><path d="M30 142Q100 112 170 142L180 208H20Z" fill="#ffc2d8"/><path d="M26 170Q100 144 174 170" stroke="#fff" stroke-width="5" fill="none" opacity=".7"/><path d="M24 192Q100 166 176 192" stroke="#cdb9f6" stroke-width="5" fill="none"/></g>
<text class="zz" x="150" y="40" font-size="20" fill="#b9a4e6" font-weight="800">z z</text><text class="qq" x="146" y="38" font-size="30" fill="#b9a4e6" font-weight="800">?</text>
<text class="sp" x="14" y="40" font-size="22">✨</text><text class="sp" x="160" y="34" font-size="22">✨</text><text class="sp" x="170" y="110" font-size="18">🌸</text>
</svg>`;
function setPanda(el, ...s) { el.className = el.className.replace(/\bp-\S+/g, '').trim() + ' ' + s.map(x => 'p-' + x).join(' '); }
$$('[data-panda]').forEach(el => { el.innerHTML = PANDA; setPanda(el, ...el.dataset.panda.split(' ')); });

/* ============ effects ============ */
let sayT;
function say(msg, ms = 3800) { const s = $('#say'); s.textContent = msg; s.classList.add('on'); clearTimeout(sayT); sayT = setTimeout(() => s.classList.remove('on'), ms); }
function burst(x, y, list = ['✨', '🌸', '💗', '⭐']) {
  for (let i = 0; i < 7; i++) {
    const e = document.createElement('span'); e.textContent = pick(list);
    Object.assign(e.style, { position: 'fixed', left: x + 'px', top: y + 'px', zIndex: 150, pointerEvents: 'none', fontSize: 16 + Math.random() * 14 + 'px' });
    document.body.appendChild(e);
    const a = Math.random() * Math.PI * 2, d = 50 + Math.random() * 60;
    e.animate([{ transform: 'translate(0,0)', opacity: 1 }, { transform: `translate(${Math.cos(a) * d}px,${Math.sin(a) * d - 40}px)`, opacity: 0 }], { duration: 1100, easing: 'ease-out' }).onfinish = () => e.remove();
  }
}
const centerOf = el => { const r = el.getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height / 2]; };
function bloom(box, n) {
  const f = ['🌸', '🌷', '🌼', '🪻', '🌺'];
  box.innerHTML = '';
  for (let i = 0; i < n; i++) {
    const s = document.createElement('span'); s.className = 'fl'; s.textContent = pick(f);
    s.style.cssText = `left:${Math.random() * 92}%;font-size:${26 + Math.random() * 26}px;animation-delay:${i * 0.12}s`;
    box.appendChild(s);
  }
}
function confetti(n = 60) {
  const c = ['#ffb6d0', '#cdb9f6', '#ffe2cf', '#fff', '#ffd9a8'];
  for (let i = 0; i < n; i++) {
    const e = document.createElement('i'); e.className = 'cf';
    e.style.cssText = `left:${Math.random() * 100}%;background:${pick(c)};animation-duration:${2.5 + Math.random() * 2.5}s;animation-delay:${Math.random() * 1.2}s`;
    document.body.appendChild(e); setTimeout(() => e.remove(), 7000);
  }
}
$$('.stars').forEach(box => {
  for (let i = 0; i < 40; i++) {
    const s = document.createElement('i'); s.className = 'star'; const z = 1 + Math.random() * 3;
    s.style.cssText = `left:${Math.random() * 100}%;top:${Math.random() * 100}%;width:${z}px;height:${z}px;animation-delay:${Math.random() * 3}s,0s`;
    box.appendChild(s);
  }
});
let br;
function breath(el) { clearInterval(br); let i = 0; const t = () => { el.textContent = i++ % 2 ? 'breathe out…' : 'breathe in…'; }; t(); br = setInterval(t, 4000); }

/* ============ overlays ============ */
function openOv(id) { $('#' + id).classList.add('on'); document.body.classList.add('lock'); }
function closeOv(o) {
  o.classList.remove('on'); clearInterval(br); clearInterval(bTick); resetBrain();
  if (!$('.ov.on')) document.body.classList.remove('lock');
}
document.addEventListener('click', e => { if (e.target.closest('[data-close]')) closeOv(e.target.closest('.ov')); });
$$('.ov.sheet').forEach(o => o.addEventListener('click', e => { if (e.target === o) closeOv(o); }));

/* ============ opening ============ */
$('#enter').onclick = () => {
  const i = $('#intro'); setPanda($('#introPanda'), 'happy'); bloom($('#flowers'), 16);
  $('#enter').disabled = true;
  setTimeout(() => { $('#app').hidden = false; document.body.classList.remove('lock'); i.classList.add('gone'); say('Bubuuu...', 3200); }, 2400);
  setTimeout(() => i.remove(), 4400);
};

/* ============ companion ============ */
const buddyLines = ['Bubuuu...', 'Nashuuu?', 'Where is the blanket?', 'Nissuuu told you to rest 😭', 'Snack break?'];
const buddyStates = [['happy'], ['sleepy'], ['dance'], ['confused'], ['mug'], ['hug'], ['blanket'], ['hide']];
$('#buddy').onclick = e => { setPanda($('#buddyPanda'), ...pick(buddyStates)); say(fresh('b', buddyLines)); burst(e.clientX, e.clientY, ['🌸', '✨']); };
setInterval(() => { if (!$('#app').hidden && !$('.ov.on')) { setPanda($('#buddyPanda'), ...pick(buddyStates)); say(fresh('b', buddyLines)); } }, 32000);

/* ============ night theme ============ */
function theme(night) { document.body.classList.toggle('night', night); $('#themeBtn').textContent = night ? '☀️' : '🌙'; store.set('night', night); }
theme(store.get('night', false));
$('#themeBtn').onclick = () => { if (document.body.classList.contains('night')) theme(false); else { openOv('ov-night'); breath($('#nBreath')); } };
$('#keepNight').onclick = () => { theme(true); closeOv($('#ov-night')); };
$('#wake').onclick = () => { theme(false); closeOv($('#ov-night')); say('Good morning, bachaaaaa 🌷'); };

/* ============ I need Nissuuu ============ */
const comfortMsgs = ["Bubuuu, you don't have to explain everything.", 'Come here, digital hug first. 🫂', 'Take it easy today, bachaaaaa.', 'You are allowed to have a bad day.', 'Nothing needs to be fixed right now.', 'Rest first. Everything else can wait.'];
function comfortNext() { const m = $('#cMsg'); m.classList.remove('show'); void m.offsetWidth; m.textContent = fresh('c', comfortMsgs); m.classList.add('show'); setPanda($('#comfortPanda'), pick([['hug'], ['blanket'], ['hide'], ['mug']])); }
let cT;
function openComfort() {
  $('#cMsg').textContent = ''; $('#cAgain').hidden = true; setPanda($('#comfortPanda'), 'blanket'); openOv('ov-comfort');
  clearTimeout(cT); cT = setTimeout(() => { comfortNext(); $('#cAgain').hidden = false; }, 5200);
}
$('#cAgain').onclick = comfortNext;

/* ============ mood cards + sheet ============ */
const moods = [
  { e: '🥲', t: 'Bubuuu is struggling', pd: ['blanket'], h: 'Okay. Blanket first.', p: "Nissuuu's official diagnosis: you need a blanket. Everything else can wait.", go: [['Comfort Station', 'room'], ['Read a note', 'notes']] },
  { e: '😤', t: 'Everyone is annoying', pd: ['dramatic'], h: 'Official ruling: valid.', p: "Everyone IS annoying today. Nissuuu officially gives you permission to ignore unnecessary nonsense. Tell panda everything. Nothing is saved, it floats away.", x: 'rant' },
  { e: '😭', t: 'I feel emotional', pd: ['hug'], h: 'Come here, tiny hug.', p: "You don't have to explain it. Nothing needs to be fixed right now.", go: [['What do I need?', 'need'], ['Notes from Nissuuu', 'notes']] },
  { e: '🫠', t: 'Nashuuu.exe has stopped', pd: ['confused'], h: 'Nashuuu.exe is not responding', p: 'Restarting…', x: 'load', go: [['Check the chaos meter', 'chaos']] },
  { e: '😴', t: 'I want bed', pd: ['sleepy', 'blanket'], h: 'Granted.', p: 'Panda is already horizontal in spirit.', x: 'bed' },
  { e: '🫂', t: 'I need Nissuuu', act: 'comfort' }
];
$('#moods').innerHTML = moods.map((m, i) => `<button data-m="${i}"><span>${m.e}</span>${m.t}</button>`).join('');
const toSec = id => { closeOv($('#sheet')); document.getElementById(id).scrollIntoView({ behavior: 'smooth' }); };
$('#moods').onclick = e => {
  const b = e.target.closest('button'); if (!b) return; const m = moods[b.dataset.m];
  burst(...centerOf(b), [m.e, '✨']);
  if (m.act) return openComfort();
  setPanda($('#sheetPanda'), ...m.pd); $('#sH').textContent = m.h; $('#sP').textContent = m.p;
  const x = $('#sExtra'); x.innerHTML = '';
  if (m.x === 'rant') {
    x.innerHTML = '<textarea id="rant" placeholder="say it all. panda is listening…"></textarea><div class="row"><button class="btn" id="rantGo">Send to the clouds ☁️</button></div>';
    $('#rantGo').onclick = () => {
      const t = $('#rant').value.trim() || '(a very dramatic sigh)'; const f = document.createElement('div'); f.className = 'flyaway'; f.textContent = t.slice(0, 120); document.body.appendChild(f);
      setTimeout(() => f.remove(), 2800); $('#rant').value = ''; setPanda($('#sheetPanda'), 'hug'); $('#sH').textContent = 'Released. Nothing was saved. 🌤️';
    };
  }
  if (m.x === 'load') {
    x.innerHTML = '<div class="load"><i id="ld"></i></div><p id="ldT" class="fine">Restarting… 0%</p>';
    setTimeout(() => { $('#ld').style.width = '3%'; }, 100);
    setTimeout(() => { $('#ldT').textContent = 'Stuck at 3%. Please insert snacks and try again. 🍫'; }, 1900);
  }
  if (m.x === 'bed') x.innerHTML = '<div class="row"><button class="btn" id="tuck">Tuck me in 🌙</button></div>';
  if (m.x === 'bed') $('#tuck').onclick = () => { closeOv($('#sheet')); setTimeout(() => { openOv('ov-night'); breath($('#nBreath')); }, 300); };
  $('#sGo').innerHTML = (m.go || []).map(g => `<button class="btn" onclick="toSec('${g[1]}')">${g[0]}</button>`).join('');
  openOv('sheet');
};

/* ============ choose what you need ============ */
const nd = $('#needOut');
const distract = ['Would you rather fight one horse-sized duck or a hundred duck-sized horses? Panda has a strong opinion.', 'If Nashuuu.exe had a loading screen, what would the tip say?', 'Invent a name for the sleepiest cloud in the sky.', 'What would panda order at a very fancy restaurant? (Bamboo is not an answer.)', 'Rate your mood as a weather forecast. Go.', 'Pick one forever: unlimited snacks or unlimited blankets? Choose wisely.'];
const cheer = ["Fun fact: pandas spend most of the day eating and napping. Role models.", "Nissuuu's honest review of you: 10/10, would annoy again. 🌸", 'You are a very good person to have around, and Nissuuu would know.', 'Today is a soft-landing day. Zero pressure, maximum fluffy.', 'Panda just did a tiny dance because you showed up. 🐼'];
const starters = ['Nissuuu, today has been…', 'Can I just rant for a bit?', 'Distract me with literally anything.', "I don't know how I feel, help."];
const needs = {
  comfort: () => ({ pd: ['hug'], html: `<div class="panda" data-panda="hug"></div><p class="big" id="nL">${fresh('c', comfortMsgs)}</p><button class="btn" data-a="comfort">Another hug 🫂</button>` }),
  distract: () => ({ html: `<div class="panda" data-panda="confused"></div><p class="big" id="nL">${fresh('d', distract)}</p><button class="btn" data-a="distract">Next one 😂</button>` }),
  rest: () => ({ html: `<div class="panda" data-panda="sleepy blanket"></div><p class="big">Okay Nashuuu. Resting is the whole task now.</p><div class="row"><button class="btn" data-a="brain">Brain off mode 🧠</button><button class="btn" data-a="night">Goodnight 🌙</button></div>` }),
  talk: () => ({ html: `<div class="panda" data-panda="mug"></div><p class="big">Okayyy Nashuuu, panda is listening.</p><p class="small">The real Nissuuu would actually like to hear it too. Tap a starter to copy it, then paste it to him.</p>${starters.map(s => `<button class="copy" data-copy="${s}">${s}</button>`).join('')}` }),
  cheer: () => ({ html: `<div class="panda" data-panda="dance"></div><p class="big" id="nL">${fresh('ch', cheer)}</p><button class="btn" data-a="cheer">More 🌸</button>` }),
  quiet: () => ({ html: `<div class="panda" data-panda="hide"></div><p class="big">Okay Bubuuu.<br>No talking required.<br>Nissuuu will shut up now. 😭</p><div class="rings"><i></i><i></i><i></i></div>` })
};
let hushT;
function showNeed(k) {
  const n = needs[k](); nd.hidden = false; nd.classList.remove('hush'); nd.innerHTML = n.html; clearTimeout(hushT);
  $$('[data-panda]', nd).forEach(el => { el.innerHTML = PANDA; setPanda(el, ...el.dataset.panda.split(' ')); });
  $$('#needs button').forEach(b => b.classList.toggle('on', b.dataset.n === k));
  if (k === 'quiet') hushT = setTimeout(() => nd.classList.add('hush'), 3600);
  if (k === 'cheer') burst(...centerOf(nd));
  nd.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}
$('#needs').onclick = e => { const b = e.target.closest('button'); if (b) showNeed(b.dataset.n); };
nd.onclick = e => {
  const b = e.target.closest('button'); if (!b) return;
  if (b.dataset.copy) { (navigator.clipboard ? navigator.clipboard.writeText(b.dataset.copy) : Promise.reject()).then(() => say('Copied! Paste it to Nissuuu 💬'), () => say('Long-press the text to copy it 💬')); return; }
  const a = b.dataset.a;
  if (a === 'brain') return startBrainOv();
  if (a === 'night') { openOv('ov-night'); return breath($('#nBreath')); }
  showNeed(a);
};

/* ============ chaos meter ============ */
const levels = [
  { e: '🌱', n: 'Tiny inconvenience', l: 'Panda is chilling.', p: ['happy'] },
  { e: '🥲', n: 'Mild suffering', l: 'Panda is yawning in solidarity.', p: ['sleepy'] },
  { e: '😭', n: 'Why is my body doing this', l: 'Panda is bringing a blanket.', p: ['blanket'] },
  { e: '😤', n: 'I am done', l: 'Panda is being dramatic on your behalf.', p: ['dramatic'] },
  { e: '🫠', n: 'Nashuuu.exe has crashed', l: 'Panda has collapsed. Send snacks.', p: ['collapsed'] },
  { e: '💀', n: 'Send backup', l: 'Panda is down. Nissuuu is on the way (emotionally).', p: ['collapsed'] }
];
$('#chaosR').oninput = e => {
  const v = +e.target.value, L = levels[v];
  $('#cEmoji').textContent = L.e; $('#cName').textContent = L.n; $('#cLine').textContent = L.l; setPanda($('#chaosPanda'), ...L.p); $('#cAlert').hidden = v < 5;
};

/* ============ comfort station ============ */
const items = [
  { i: '🫖', n: 'Warm drink', p: ['mug'], m: 'Hydration/warm drink reminder from Nissuuu 👀' },
  { i: '🧸', n: 'Blanket', p: ['blanket'], m: 'Blanket deployed successfully. Nashuuu is now 37% safer from the world.' },
  { i: '🛏️', n: 'Pillow', p: ['sleepy'], m: 'Okay bachaaaaa, go rest.' },
  { i: '🎧', n: 'Headphones', p: ['dance'], m: 'Headphones on. World muted. Panda is vibing.' },
  { i: '🍫', n: 'Snack', p: ['happy'], m: 'Snack acquired. Nissuuu approves. Panda wants a bite.' },
  { i: '🌙', n: 'Sleep', p: ['sleepy', 'blanket'], m: 'Shhh. Lights going down…', night: 1 },
  { i: '📱', n: 'Comfort show', p: ['happy'], m: 'Comfort show loaded. Rule: it must be one you have already watched 11 times.' }
];
$('#items').innerHTML = items.map((x, i) => `<button data-i="${i}" aria-label="${x.n}">${x.i}<small>${x.n}</small></button>`).join('');
$('#items').onclick = e => {
  const b = e.target.closest('button'); if (!b) return; const x = items[b.dataset.i];
  b.classList.remove('pop'); void b.offsetWidth; b.classList.add('pop');
  setPanda($('#roomPanda'), ...x.p); const m = $('#roomMsg'); m.textContent = x.m; m.style.animation = 'none'; void m.offsetWidth; m.style.animation = '';
  burst(...centerOf(b), [x.i, '✨']);
  if (x.night) setTimeout(() => { openOv('ov-night'); breath($('#nBreath')); }, 1200);
};
const unlockSecret = () => { store.set('secret', true); $('#secretChip').hidden = false; };
$('#secretFlower').onclick = e => { burst(e.clientX, e.clientY, ['🌼', '✨']); unlockSecret(); openOv('ov-secret'); };
if (store.get('secret', false)) $('#secretChip').hidden = false;

/* ============ notes ============ */
const notes = [
  "Bubuuu, you don't have to be okay every day.",
  'Nashuuu, please be a little gentle with yourself today.',
  "Bachaaaaa, today's productivity target is literally surviving. 😂",
  'Nissuuu officially gives you permission to ignore unnecessary nonsense today.',
  'Even if today sucks, tomorrow gets another chance.',
  'Water. Snack. Blanket. Nissuuu\'s orders, zero arguments.',
  "If everyone is annoying today, that's not your fault. Panda is on your side.",
  "Nashuuuu, you're allowed to go slow. Slow is still moving. 🐼"
];
$('#envs').innerHTML = notes.map((_, i) => `<button data-n="${i}">💌 Open Note #${i + 1}</button>`).join('');
$('#envs').onclick = e => {
  const b = e.target.closest('button'); if (!b) return; const p = $('#paper');
  b.classList.add('read'); p.hidden = false; p.style.setProperty('--r', (Math.random() * 3 - 1.5) + 'deg');
  p.style.animation = 'none'; void p.offsetWidth; p.style.animation = '';
  p.innerHTML = `<p class="hand">${notes[b.dataset.n]}</p><small>Note #${+b.dataset.n + 1}. Signed, Nissuuu ✍️</small>`;
  p.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
};

/* ============ press this ============ */
const presses = [
  'Why are you still pressing me 😭', "Nissuuu has no idea what he's doing either.", 'Official announcement:<br>Bubuuu deserves snacks.', 'Panda has requested that you go lie down.', 'Your current mission:<br>exist peacefully.', 'Nashuuu.exe is currently running on 3% battery.', 'Okayyy bachaaaaa, one more hug.', "Nissuuu's official diagnosis: you need a blanket.", 'This button has no function except being pressed. You are doing great.', 'Breaking news: Nashuuu is allowed to sit down.', 'Panda just stole your problems. He will lose them somewhere.', 'Have you had water? Asking for a panda.'
];
let pc = 0;
$('#pressBtn').onclick = e => {
  pc++; const b = e.currentTarget, m = $('#pressMsg');
  b.classList.remove('shake'); void b.offsetWidth; b.classList.add('shake');
  m.classList.remove('pop'); void m.offsetWidth; m.classList.add('pop');
  m.innerHTML = pc % 10 === 0 ? `You have pressed this ${pc} times. Panda is concerned and impressed.` : fresh('p', presses);
  setPanda($('#pressPanda'), ...pick(buddyStates)); burst(e.clientX, e.clientY, ['💗', '✨', '🐼', '🌸']);
};

/* ============ brain off ============ */
let bTick;
function resetBrain() { clearInterval(bTick); $('#bH').textContent = 'Brain officially closed for maintenance.'; $('#bP').innerHTML = 'No overthinking.<br>No unnecessary stress.<br>No solving the entire universe tonight.'; $('#bTimer').textContent = ''; $$('#bBtns button').forEach(b => b.disabled = false); setPanda($('#brainPanda'), 'sleepy'); }
function startBrainOv() { resetBrain(); openOv('ov-brain'); breath($('#bBreath')); }
$('#brainOpen').onclick = startBrainOv;
$('#bBtns').onclick = e => {
  const b = e.target.closest('button'); if (!b) return; let t = +b.dataset.sec;
  $$('#bBtns button').forEach(x => x.disabled = true); const draw = () => { $('#bTimer').textContent = `${Math.floor(t / 60)}:${String(t % 60).padStart(2, '0')}`; }; draw();
  bTick = setInterval(() => {
    t--; draw();
    if (t <= 0) {
      clearInterval(bTick); $('#bH').textContent = 'Maintenance complete.'; $('#bP').innerHTML = 'Nashuuu.exe may restart whenever ready. 🐼'; $('#bTimer').textContent = ''; setPanda($('#brainPanda'), 'happy'); $$('#bBtns button').forEach(x => x.disabled = false);
    }
  }, 1000);
};

/* ============ music ============ */
let cat = 'rainy';
$('#cats').innerHTML = Object.entries(PLAYLISTS).map(([k, v]) => `<button data-k="${k}">${v.icon} ${v.name}</button>`).join('');
function drawPlayer() {
  const p = PLAYLISTS[cat]; $$('#cats button').forEach(b => b.classList.toggle('on', b.dataset.k === cat));
  $('#player').style.setProperty('--c1', p.c[0]); $('#player').style.setProperty('--c2', p.c[1]);
  $('#pTitle').textContent = p.title; $('#pSub').textContent = p.sub; $('#pNote').textContent = ''; $('#disc').classList.remove('spin'); $('#eq').classList.remove('on'); $('#pBar').style.width = '0';
}
$('#cats').onclick = e => { const b = e.target.closest('button'); if (b) { cat = b.dataset.k; drawPlayer(); } };
$('#pPlay').onclick = () => {
  const p = PLAYLISTS[cat];
  if (!p.url) { $('#pNote').textContent = "Nissuuu hasn't added a link here yet. (It goes in the PLAYLISTS list in script.js.)"; return; }
  window.open(p.url, '_blank', 'noopener'); $('#disc').classList.add('spin'); $('#eq').classList.add('on'); $('#pBar').style.width = '100%'; say('Headphones on, bachaaaaa 🎧');
};
drawPlayer();

/* ============ mission ============ */
const missions = ['Drink some water.', 'Get comfortable. Blanket optional, but recommended.', 'Listen to one song.', 'Eat something you like.', 'Take 10 minutes just for yourself.', 'Text someone you trust, if you feel like talking.', 'Look out of a window for one minute. That counts.'];
let mi = Math.floor(Math.random() * missions.length), done = store.get('done', 0);
function drawMission(reset = true) { $('#mText').textContent = missions[mi]; $('#mDone').disabled = false; $('#mCount').textContent = done ? `Tiny missions done so far: ${done} 🌷` : 'Optional. Zero pressure.'; if (reset) setPanda($('#missionPanda'), 'happy'); }
$('#mNext').onclick = () => { mi = (mi + 1 + Math.floor(Math.random() * (missions.length - 1))) % missions.length; drawMission(); };
$('#mDone').onclick = e => {
  done++; store.set('done', done); $('#mText').textContent = 'GOOD JOB BUBUUU 😭💗'; $('#mDone').disabled = true; setPanda($('#missionPanda'), 'celebrate');
  $('#mCount').textContent = `Tiny missions done so far: ${done} 🌷`; confetti(30); burst(e.clientX, e.clientY, ['💗', '✨', '🌸']);
};
drawMission();

/* ============ final surprise ============ */
$('#finalBtn').onclick = () => {
  openOv('ov-final'); $('#finalFlowers').innerHTML = '';
  setTimeout(() => bloom($('#finalFlowers'), 22), 3000); setTimeout(() => confetti(80), 3600);
};
