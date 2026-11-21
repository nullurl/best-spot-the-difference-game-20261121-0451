// Builds the two picture panels of a level: the same scene drawn twice,
// once as picture A and once as picture B, plus the invisible hit zones
// and the marks for differences already found.

/** Draw one level into both SVG panels. Returns the hit-zone elements. */
export function drawPanels(level, svgA, svgB) {
  svgA.innerHTML = level.render('svg-a', false);
  svgB.innerHTML = level.render('svg-b', true);
  const zones = [];
  for (const diff of level.diffs) {
    for (const svg of [svgA, svgB]) {
      const hit = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      hit.setAttribute('cx', diff.x);
      hit.setAttribute('cy', diff.y);
      hit.setAttribute('r', diff.r);
      hit.setAttribute('class', 'hit');
      hit.setAttribute('data-diff', diff.id);
      svg.appendChild(hit);
      zones.push(hit);
    }
  }
  return zones;
}

/** Draw the red ring (and a small tick) on both panels for a found difference. */
export function markFound(diff, svgA, svgB) {
  for (const svg of [svgA, svgB]) {
    const ring = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    ring.setAttribute('cx', diff.x);
    ring.setAttribute('cy', diff.y);
    ring.setAttribute('r', diff.r - 3);
    ring.setAttribute('class', 'mark');
    svg.appendChild(ring);
    const tick = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    tick.setAttribute('d', `M ${diff.x - 8} ${diff.y} l 5 6 l 9 -11`);
    tick.setAttribute('class', 'mark');
    svg.appendChild(tick);
  }
}

/** Pulse a hint ring on both panels for an unfound difference. Returns a cleanup. */
export function hintRing(diff, svgA, svgB) {
  const rings = [];
  for (const svg of [svgA, svgB]) {
    const ring = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    ring.setAttribute('cx', diff.x);
    ring.setAttribute('cy', diff.y);
    ring.setAttribute('r', diff.r + 6);
    ring.setAttribute('class', 'hint-ring');
    svg.appendChild(ring);
    rings.push(ring);
  }
  return () => rings.forEach((ring) => ring.remove());
}
