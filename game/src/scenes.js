// The two scenes of Spot the Difference, drawn as SVG. Each level is one
// picture drawn twice: render(svgId, isB) draws the same scene, and the
// differences are the details that change when isB is true. Every
// difference has a hit zone (x, y, r in the 640x460 viewBox) shared by both
// panels, so a click on either picture finds it.

const STARS = [
  [120, 40], [200, 70], [280, 35], [360, 60], [440, 45],
  [580, 140], [40, 140], [150, 120], [250, 110], [330, 140], [420, 110],
];

function starField(extra) {
  return STARS.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2.5" fill="#fff8d0" opacity="0.9"/>`).join('') + extra;
}

function flower(x, y, petal) {
  const petals = [0, 72, 144, 216, 288].map((a) => {
    const rad = (a * Math.PI) / 180;
    return `<circle cx="${(x + Math.cos(rad) * 7).toFixed(1)}" cy="${(y + Math.sin(rad) * 7).toFixed(1)}" r="4" fill="${petal}"/>`;
  }).join('');
  return `<line x1="${x}" y1="${y}" x2="${x}" y2="${y + 16}" stroke="#3a6b35" stroke-width="3"/>${petals}<circle cx="${x}" cy="${y}" r="4.5" fill="#ffd76a"/>`;
}

/** Level 1: a quiet house and garden under the moon. 7 differences. */
export const LEVEL_1 = {
  name: 'Moonlit Garden',
  diffs: [
    { id: 'moon-crater', name: 'a crater on the moon', x: 505, y: 70, r: 26 },
    { id: 'missing-star', name: 'a star in the sky', x: 60, y: 60, r: 26 },
    { id: 'window-lit', name: 'the lit window', x: 111, y: 256, r: 26 },
    { id: 'cat-tail', name: "the cat's tail", x: 455, y: 330, r: 30 },
    { id: 'flower-color', name: 'a flower changing colour', x: 250, y: 405, r: 26 },
    { id: 'pond-fish', name: 'a fish in the pond', x: 468, y: 396, r: 26 },
    { id: 'tree-apple', name: 'an apple on the tree', x: 330, y: 262, r: 24 },
  ],
  render(svgId, isB) {
    return `
    <defs>
      <linearGradient id="${svgId}-sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#16233f"/><stop offset="1" stop-color="#2c4a6e"/>
      </linearGradient>
    </defs>
    <rect x="0" y="0" width="640" height="340" fill="url(#${svgId}-sky)"/>
    ${starField(isB ? '' : '<circle cx="60" cy="60" r="2.5" fill="#fff8d0" opacity="0.9"/>')}
    <circle cx="520" cy="80" r="42" fill="#f5e9c8"/>
    ${isB ? '' : '<circle cx="505" cy="70" r="8" fill="#dcc78e"/>'}
    <rect x="0" y="340" width="640" height="120" fill="#2d4a2b"/>
    <rect x="80" y="220" width="140" height="120" fill="#8a5a3b"/>
    <polygon points="65,220 235,220 155,155" fill="#6b3a2a"/>
    <rect x="195" y="170" width="18" height="42" fill="#6b3a2a"/>
    <rect x="138" y="282" width="32" height="58" fill="#4a2c1e"/>
    <circle cx="164" cy="312" r="3" fill="#ffd76a"/>
    <rect x="95" y="240" width="32" height="32" fill="${isB ? '#23233a' : '#ffd76a'}"/>
    <rect x="172" y="240" width="32" height="32" fill="#ffd76a"/>
    <rect x="296" y="280" width="16" height="62" fill="#5a3a22"/>
    <circle cx="304" cy="250" r="40" fill="#3a6b35"/>
    <circle cx="272" cy="278" r="30" fill="#3a6b35"/>
    <circle cx="336" cy="278" r="30" fill="#3a6b35"/>
    <circle cx="288" cy="240" r="6" fill="#d23c3c"/>
    <circle cx="318" cy="232" r="6" fill="#d23c3c"/>
    ${isB ? '' : '<circle cx="330" cy="262" r="6" fill="#d23c3c"/>'}
    <ellipse cx="480" cy="398" rx="72" ry="20" fill="#3a6a8a"/>
    ${isB ? '' : '<path d="M 452 396 q 10 -8 20 0 q -10 8 -20 0 Z" fill="#e8862a"/><path d="M 472 396 l 8 -5 l -2 5 l 2 5 Z" fill="#e8862a"/>'}
    <ellipse cx="420" cy="335" rx="20" ry="16" fill="#2a2a2e"/>
    <circle cx="420" cy="312" r="13" fill="#2a2a2e"/>
    <polygon points="410,302 414,288 420,300" fill="#2a2a2e"/>
    <polygon points="420,300 428,288 432,302" fill="#2a2a2e"/>
    <path d="${isB ? 'M 438 340 q 22 4 26 18' : 'M 438 340 q 22 -6 18 -28'}" fill="none" stroke="#2a2a2e" stroke-width="7" stroke-linecap="round"/>
    <circle cx="415" cy="310" r="1.8" fill="#ffd76a"/>
    <circle cx="425" cy="310" r="1.8" fill="#ffd76a"/>
    ${flower(60, 400, '#e85d75')}
    ${flower(150, 420, '#e85d75')}
    ${flower(250, 405, isB ? '#9a6ee8' : '#e85d75')}
    ${flower(350, 425, '#e85d75')}
    ${flower(560, 415, '#e85d75')}
    `;
  },
};

/** Level 2: a lantern market at dusk. 8 differences, subtler than level 1. */
export const LEVEL_2 = {
  name: 'Lantern Market',
  diffs: [
    { id: 'lantern-color', name: 'a lantern changing colour', x: 320, y: 140, r: 26 },
    { id: 'bunting-flag', name: 'a flag on the bunting', x: 300, y: 72, r: 24 },
    { id: 'sign-text', name: 'a letter on the sign', x: 300, y: 188, r: 28 },
    { id: 'crate-stripes', name: 'the stripes on a crate', x: 540, y: 352, r: 26 },
    { id: 'dog-ear', name: "the dog's ear", x: 185, y: 368, r: 26 },
    { id: 'awning-stripe', name: 'a stripe on the awning', x: 460, y: 280, r: 28 },
    { id: 'coin', name: 'a coin on the ground', x: 340, y: 430, r: 22 },
    { id: 'shutter', name: 'the window shutter', x: 115, y: 215, r: 28 },
  ],
  render(svgId, isB) {
    const lanterns = [120, 220, 320, 420, 520].map((x) => {
      const color = x === 320 ? (isB ? '#e8862a' : '#d23c3c') : '#d23c3c';
      return `<line x1="${x}" y1="110" x2="${x}" y2="126" stroke="#2a2a2e" stroke-width="2"/>
        <rect x="${x - 8}" y="126" width="16" height="5" fill="#8a6a2a"/>
        <circle cx="${x}" cy="142" r="16" fill="${color}"/>
        <rect x="${x - 8}" y="156" width="16" height="5" fill="#8a6a2a"/>`;
    }).join('');
    const flags = [];
    for (let i = 0; i < 15; i++) {
      const x = 50 + i * 38;
      const y = 78 - Math.sin((i / 14) * Math.PI) * 14;
      if (isB && i === 7) continue;
      const color = ['#d23c3c', '#ffd76a', '#3a6a8a', '#e8862a'][i % 4];
      flags.push(`<polygon points="${x},${y.toFixed(0)} ${x + 22},${y.toFixed(0)} ${x + 11},${(y + 20).toFixed(0)}" fill="${color}"/>`);
    }
    const awning2 = [0, 1, 2, 3].map((i) => {
      const color = i % 2 === 0 ? (isB ? '#3a8a5a' : '#3a6a8a') : '#f5e9c8';
      return `<rect x="${400 + i * 40}" y="260" width="40" height="40" fill="${color}"/>`;
    }).join('');
    return `
    <defs>
      <linearGradient id="${svgId}-sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#4a2a4a"/><stop offset="1" stop-color="#8a5a3a"/>
      </linearGradient>
    </defs>
    <rect x="0" y="0" width="640" height="360" fill="url(#${svgId}-sky)"/>
    <rect x="0" y="360" width="640" height="100" fill="#4a3a2a"/>
    <path d="M 40 80 Q 320 40 600 60" fill="none" stroke="#2a2a2e" stroke-width="2"/>
    ${flags.join('')}
    <line x1="60" y1="110" x2="580" y2="110" stroke="#2a2a2e" stroke-width="2"/>
    ${lanterns}
    <rect x="90" y="190" width="50" height="50" fill="#ffd76a"/>
    ${isB
      ? '<rect x="90" y="190" width="50" height="50" fill="#6b3a2a"/><rect x="112" y="190" width="6" height="50" fill="#4a2c1e"/>'
      : '<rect x="84" y="190" width="8" height="50" fill="#6b3a2a"/><rect x="138" y="190" width="8" height="50" fill="#6b3a2a"/>'}
    <rect x="260" y="170" width="80" height="36" fill="#f5e9c8" stroke="#8a6a2a" stroke-width="2"/>
    <text x="300" y="195" text-anchor="middle" font-family="Georgia, serif" font-size="22" fill="#2a2a2e">${isB ? 'TEE' : 'TEA'}</text>
    <line x1="270" y1="170" x2="270" y2="150" stroke="#2a2a2e" stroke-width="2"/>
    <line x1="330" y1="170" x2="330" y2="150" stroke="#2a2a2e" stroke-width="2"/>
    <rect x="60" y="260" width="40" height="40" fill="#d23c3c"/>
    <rect x="100" y="260" width="40" height="40" fill="#f5e9c8"/>
    <rect x="140" y="260" width="40" height="40" fill="#d23c3c"/>
    <rect x="180" y="260" width="40" height="40" fill="#f5e9c8"/>
    <rect x="60" y="300" width="160" height="60" fill="#7a4a2a"/>
    <circle cx="90" cy="290" r="9" fill="#e8862a"/>
    <circle cx="120" cy="290" r="9" fill="#d23c3c"/>
    <circle cx="150" cy="290" r="9" fill="#e8862a"/>
    <circle cx="180" cy="290" r="9" fill="#d23c3c"/>
    ${awning2}
    <rect x="400" y="300" width="160" height="60" fill="#6a4a2a"/>
    <circle cx="430" cy="290" r="9" fill="#d23c3c"/>
    <circle cx="460" cy="290" r="9" fill="#e8862a"/>
    <circle cx="490" cy="290" r="9" fill="#d23c3c"/>
    <circle cx="520" cy="290" r="9" fill="#e8862a"/>
    <rect x="520" y="330" width="44" height="44" fill="#8a5a3b" stroke="#5a3a22" stroke-width="2"/>
    <rect x="520" y="374" width="44" height="44" fill="#8a5a3b" stroke="#5a3a22" stroke-width="2"/>
    ${isB
      ? '<line x1="520" y1="345" x2="564" y2="345" stroke="#5a3a22" stroke-width="2"/><line x1="520" y1="356" x2="564" y2="356" stroke="#5a3a22" stroke-width="2"/><line x1="520" y1="367" x2="564" y2="367" stroke="#5a3a22" stroke-width="2"/>'
      : '<line x1="520" y1="348" x2="564" y2="348" stroke="#5a3a22" stroke-width="2"/><line x1="520" y1="362" x2="564" y2="362" stroke="#5a3a22" stroke-width="2"/>'}
    <ellipse cx="180" cy="400" rx="26" ry="16" fill="#8a6a4a"/>
    <circle cx="180" cy="378" r="14" fill="#8a6a4a"/>
    ${isB
      ? '<polygon points="172,368 176,350 184,364" fill="#8a6a4a"/>'
      : '<path d="M 172 366 q -4 14 4 20 q 6 -10 2 -20 Z" fill="#6a4a34"/>'}
    <circle cx="176" cy="376" r="1.8" fill="#2a2a2e"/>
    <path d="M 196 400 q 14 -2 18 8" fill="none" stroke="#8a6a4a" stroke-width="6" stroke-linecap="round"/>
    ${isB ? '' : '<circle cx="340" cy="430" r="7" fill="#ffd76a" stroke="#8a6a2a" stroke-width="2"/>'}
    `;
  },
};

export const LEVELS = [LEVEL_1, LEVEL_2];
