const KEY = 'board_sound_on';
let enabled = localStorage.getItem(KEY) !== 'off';
let ctx;

function ensure() {
  if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
  if (ctx.state === 'suspended') ctx.resume();
}

function play(freq = 440, dur = 0.08, type = 'sine', vol = 0.04, delay = 0) {
  if (!enabled) return;
  ensure();
  const t = ctx.currentTime + delay;
  const o = ctx.createOscillator();
  const g = ctx.createGain();
  o.type = type;
  o.frequency.value = freq;
  o.connect(g); g.connect(ctx.destination);
  g.gain.setValueAtTime(vol, t);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.start(t); o.stop(t + dur);
}

export const sfx = {
  click: () => play(600, 0.05, 'square'),
  start: () => [420, 540, 680].forEach((f, i) => play(f, 0.08, 'triangle', 0.04, i * 0.06)),
  dice: () => [220, 320, 180].forEach((f, i) => play(f, 0.08, 'sawtooth', 0.04, i * 0.04)),
  build: () => [380, 520].forEach((f, i) => play(f, 0.07, 'square', 0.04, i * 0.05)),
  card: () => play(760, 0.06, 'triangle'),
  fail: () => [320, 220].forEach((f, i) => play(f, 0.08, 'sawtooth', 0.04, i * 0.06)),
  win: () => [520, 660, 820, 980].forEach((f, i) => play(f, 0.1, 'triangle', 0.05, i * 0.08)),
  lose: () => [320, 260, 180].forEach((f, i) => play(f, 0.12, 'sawtooth', 0.04, i * 0.08)),
  resource: () => play(700, 0.05, 'triangle')
};

export function isSoundOn() { return enabled; }
export function toggleSound() { enabled = !enabled; localStorage.setItem(KEY, enabled ? 'on' : 'off'); return enabled; }
