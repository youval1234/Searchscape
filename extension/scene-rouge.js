// All placements use the painted shop window's original pixel coordinates.
(() => {
  'use strict';

  function pendantLight(x, y, size, delay) {
    return `<g transform="translate(${x} ${y}) scale(${size})">
      <g class="rouge-lamplight" style="--phase:${delay}s">
        <ellipse rx="48" ry="13" fill="url(#rouge-amber)"/>
        <path d="M-42 0 Q-75 97 -124 176 Q0 204 126 176 Q65 82 42 0Z" fill="url(#rouge-cone)"/>
      </g>
    </g>`;
  }

  function jewel(x, y, size, delay) {
    return `<g transform="translate(${x} ${y}) scale(${size})">
      <g class="rouge-facet" style="--phase:${delay}s">
        <circle r="11" fill="url(#rouge-amber)"/>
        <path d="M0-9 1-1 6 0 1 1 0 9 -1 1 -6 0 -1-1Z" fill="#fff0c9"/>
      </g>
    </g>`;
  }

  function silkMoth(x, y, size, delay, period) {
    return `<g transform="translate(${x} ${y}) scale(${size})">
      <g class="rouge-moth" style="--phase:${delay}s;--period:${period}s">
        <g class="rouge-wings">
          <path d="M0 1Q-6-9-20-8Q-16-1-10 0Q-13 4-10 8Q-2 8 0 2Q3 8 10 7Q12 4 9 1Q17-2 19-10Q7-10 0 1Z" fill="url(#rouge-velvet)" stroke="#e6a287" stroke-width=".65"/>
          <path d="M-16-6 -3 1 -9 5M15-7 3 1 8 4" fill="none" stroke="#f5c2a0" stroke-width=".6"/>
        </g>
        <path d="M0-2v7m0-7-3-3m3 3 2-4" stroke="#d5a067" stroke-width="1.2"/>
      </g>
    </g>`;
  }

  const silkFolds = [
    'M288 351C220 430 203 525 158 576',
    'M300 382C268 502 255 594 209 704S160 815 117 852',
    'M312 535C303 653 335 755 417 826',
    'M1331 385C1273 408 1247 462 1242 482',
    'M1386 596C1422 676 1352 738 1306 768'
  ];

  (globalThis.SearchscapeScenePacks ??= []).push(() => ({
    lerouge: () => `<g transform="scale(${1600/1586} ${1000/992})">
      <defs>
        <radialGradient id="rouge-amber"><stop stop-color="#fff1bf"/><stop offset=".3" stop-color="#ffbc78" stop-opacity=".65"/><stop offset="1" stop-color="#e4703f" stop-opacity="0"/></radialGradient>
        <radialGradient id="rouge-cone" cy="0" r="1"><stop stop-color="#ffc693" stop-opacity=".55"/><stop offset=".6" stop-color="#f4a25c" stop-opacity=".1"/><stop offset="1" stop-color="#e7a269" stop-opacity="0"/></radialGradient>
        <linearGradient id="rouge-velvet" x2="0" y2="1"><stop stop-color="#ee6b69"/><stop offset=".45" stop-color="#902339"/><stop offset="1" stop-color="#391321"/></linearGradient>
      </defs>
      ${pendantLight(1347,148,1,-4)}${pendantLight(1284,216,.65,-8)}
      <g class="rouge-marble">
        <ellipse cx="1340" cy="930" rx="32" ry="8" fill="url(#rouge-amber)"/>
        <ellipse cx="1339" cy="947" rx="20" ry="4" fill="url(#rouge-amber)"/>
      </g>
      ${silkFolds.map((d,i)=>`<path class="rouge-silk" d="${d}" pathLength="100" fill="none" stroke="#ffd0a3" stroke-width="1.6" stroke-linecap="round" style="--phase:-${i*2.5}s"/>`).join('')}
      ${[[194,118,.8],[337,138,.68],[232,151,.5],[297,222,.87],[1473,205,.65],[1535,444,.66]].map(([x,y,s],i)=>jewel(x,y,s,-i*1.83)).join('')}
      ${silkMoth(94,371,.72,-1,18)}${silkMoth(370,298,.48,-9,23)}${silkMoth(1240,385,.58,-5,20)}
      ${Array.from({length:18},(_,i)=>{
        const x=i%2 ? 1170+i*17 : 92+i*18;
        return `<circle class="rouge-dust" cx="${x}" cy="${209+i*73%450}" r="${1+i%3*.4}" fill="#ffe1b6" style="--phase:-${i*1.3}s;--period:${8+i%5}s"/>`;
      }).join('')}
    </g>`
  }));
})();
