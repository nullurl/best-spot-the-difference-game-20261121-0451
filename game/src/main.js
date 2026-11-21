// Startup: wire the page's elements to the game and start level 1.

import { Game } from './game.js';

const game = new Game({
  levelName: document.getElementById('level-name'),
  timer: document.getElementById('timer'),
  remaining: document.getElementById('remaining'),
  hintBtn: document.getElementById('hint-btn'),
  restartBtn: document.getElementById('restart-btn'),
  svgA: document.getElementById('svg-a'),
  svgB: document.getElementById('svg-b'),
  boardA: document.getElementById('board-a'),
  boardB: document.getElementById('board-b'),
  toast: document.getElementById('toast'),
  overlay: document.getElementById('overlay'),
  overlayTitle: document.getElementById('overlay-title'),
  overlayText: document.getElementById('overlay-text'),
  overlayStats: document.getElementById('overlay-stats'),
  overlayBtn: document.getElementById('overlay-btn'),
  lvl1: document.getElementById('lvl-1'),
  lvl2: document.getElementById('lvl-2'),
});

document.getElementById('hint-btn').addEventListener('click', () => game.hint());
document.getElementById('restart-btn').addEventListener('click', () => game.restart());
document.getElementById('overlay-btn').addEventListener('click', () => game.next());
document.addEventListener('keydown', (event) => {
  if (event.key === 'h' || event.key === 'H') game.hint();
  if (event.key === 'r' || event.key === 'R') game.restart();
});

game.startLevel(0);
