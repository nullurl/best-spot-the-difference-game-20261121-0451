// Small sounds, synthesized with WebAudio — no audio files to load.
// The context is created lazily on the first user gesture, as browsers
// require, and every sound is a short envelope of oscillators.

let ctx = null;

function audio() {
  if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
  if (ctx.state === 'suspended') void ctx.resume();
  return ctx;
}

function tone(freq, at, dur, type = 'sine', gain = 0.12) {
  const ac = audio();
  const osc = ac.createOscillator();
  const amp = ac.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  amp.gain.setValueAtTime(0.0001, ac.currentTime + at);
  amp.gain.exponentialRampToValueAtTime(gain, ac.currentTime + at + 0.02);
  amp.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + at + dur);
  osc.connect(amp).connect(ac.destination);
  osc.start(ac.currentTime + at);
  osc.stop(ac.currentTime + at + dur + 0.05);
}

/** A bright two-note chime when a difference is found. */
export function playFound() {
  try {
    tone(660, 0, 0.18);
    tone(880, 0.09, 0.28);
  } catch {
    /* audio unavailable: the game plays on silently */
  }
}

/** A soft low thud for a wrong click. */
export function playMiss() {
  try {
    tone(160, 0, 0.14, 'triangle', 0.08);
  } catch {
    /* audio unavailable */
  }
}

/** A little arpeggio when a level is cleared. */
export function playWin() {
  try {
    [523, 659, 784, 1047].forEach((freq, i) => tone(freq, i * 0.11, 0.32));
  } catch {
    /* audio unavailable */
  }
}
