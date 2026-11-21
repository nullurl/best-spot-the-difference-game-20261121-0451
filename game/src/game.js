// The rules of Spot the Difference: two levels, a timer, a counter of
// how many differences remain, three hints, and a win screen per level.
// A click on a difference's hit zone in either picture finds it; a click
// anywhere else on a picture is a miss. Keyboard: H hints, R restarts.

import { LEVELS } from './scenes.js';
import { drawPanels, markFound, hintRing } from './render.js';
import { playFound, playMiss, playWin } from './audio.js';

const HINTS_PER_LEVEL = 3;

function formatTime(seconds) {
  const mm = String(Math.floor(seconds / 60)).padStart(2, '0');
  const ss = String(seconds % 60).padStart(2, '0');
  return `${mm}:${ss}`;
}

export class Game {
  constructor(elements) {
    this.el = elements;
    this.levelIndex = 0;
    this.found = new Set();
    this.hintsLeft = HINTS_PER_LEVEL;
    this.clicks = 0;
    this.wrongClicks = 0;
    this.seconds = 0;
    this.timer = null;
    this.totalSeconds = 0;
    this.levelTimes = [];
    this.zones = [];
    this.hintCleanup = null;
    this.won = false;
  }

  get level() {
    return LEVELS[this.levelIndex];
  }

  startLevel(index) {
    this.levelIndex = index;
    this.found = new Set();
    this.hintsLeft = HINTS_PER_LEVEL;
    this.clicks = 0;
    this.wrongClicks = 0;
    this.seconds = 0;
    this.won = false;
    if (this.hintCleanup) {
      this.hintCleanup();
      this.hintCleanup = null;
    }
    this.el.levelName.textContent = `Level ${index + 1} · ${this.level.name}`;
    this.el.lvl1.className = index === 0 ? 'now' : 'done';
    this.el.lvl2.className = index === 1 ? 'now' : index > 1 ? 'done' : '';
    this.el.overlay.classList.remove('show');
    this.zones = drawPanels(this.level, this.el.svgA, this.el.svgB);
    for (const zone of this.zones) {
      zone.addEventListener('click', (event) => {
        event.stopPropagation();
        this.find(zone.dataset.diff);
      });
    }
    for (const board of [this.el.boardA, this.el.boardB]) {
      board.addEventListener('click', () => this.miss(board));
    }
    this.updateHud();
    this.startTimer();
  }

  startTimer() {
    clearInterval(this.timer);
    this.el.timer.textContent = '00:00';
    this.timer = setInterval(() => {
      this.seconds += 1;
      this.el.timer.textContent = formatTime(this.seconds);
    }, 1000);
  }

  updateHud() {
    const left = this.level.diffs.length - this.found.size;
    this.el.remaining.textContent = String(left);
    this.el.hintBtn.textContent = `💡 Hint (${this.hintsLeft})`;
    this.el.hintBtn.disabled = this.hintsLeft <= 0 || this.won;
  }

  toast(message) {
    this.el.toast.textContent = message;
    this.el.toast.classList.add('show');
    clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => this.el.toast.classList.remove('show'), 1800);
  }

  find(diffId) {
    if (this.won || this.found.has(diffId)) return;
    const diff = this.level.diffs.find((d) => d.id === diffId);
    if (!diff) return;
    this.clicks += 1;
    this.found.add(diffId);
    markFound(diff, this.el.svgA, this.el.svgB);
    playFound();
    this.toast(`Found: ${diff.name}!`);
    this.updateHud();
    if (this.found.size === this.level.diffs.length) this.winLevel();
  }

  miss(board) {
    if (this.won) return;
    this.clicks += 1;
    this.wrongClicks += 1;
    playMiss();
    board.classList.remove('shake');
    void board.offsetWidth;
    board.classList.add('shake');
  }

  hint() {
    if (this.won || this.hintsLeft <= 0) return;
    const unfound = this.level.diffs.filter((d) => !this.found.has(d.id));
    if (unfound.length === 0) return;
    const diff = unfound[Math.floor(Math.random() * unfound.length)];
    this.hintsLeft -= 1;
    if (this.hintCleanup) this.hintCleanup();
    this.hintCleanup = hintRing(diff, this.el.svgA, this.el.svgB);
    setTimeout(() => {
      if (this.hintCleanup) {
        this.hintCleanup();
        this.hintCleanup = null;
      }
    }, 2500);
    this.toast(`Hint: look near ${diff.name}…`);
    this.updateHud();
  }

  winLevel() {
    this.won = true;
    clearInterval(this.timer);
    this.levelTimes.push(this.seconds);
    this.totalSeconds += this.seconds;
    playWin();
    const accuracy = this.clicks === 0 ? 100 : Math.round(((this.clicks - this.wrongClicks) / this.clicks) * 100);
    const lastLevel = this.levelIndex === LEVELS.length - 1;
    this.el.overlayTitle.textContent = lastLevel ? 'You found them all!' : `Level ${this.levelIndex + 1} cleared!`;
    this.el.overlayText.textContent = lastLevel
      ? `Both scenes complete — ${this.level.diffs.length + LEVELS[0].diffs.length} differences found.`
      : `All ${this.level.diffs.length} differences in ${this.level.name} found.`;
    this.el.overlayStats.textContent = `Time ${formatTime(this.seconds)} · Accuracy ${accuracy}% · Total ${formatTime(this.totalSeconds)}`;
    this.el.overlayBtn.textContent = lastLevel ? '↺ Play again' : 'Next level →';
    this.el.overlay.classList.add('show');
  }

  next() {
    if (this.levelIndex < LEVELS.length - 1) {
      this.startLevel(this.levelIndex + 1);
    } else {
      this.levelTimes = [];
      this.totalSeconds = 0;
      this.startLevel(0);
    }
  }

  restart() {
    this.levelTimes = this.levelTimes.slice(0, this.levelIndex);
    this.totalSeconds = this.levelTimes.reduce((a, b) => a + b, 0);
    this.startLevel(this.levelIndex);
  }
}
