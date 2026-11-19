// Motion overlays share the painted boulevard's coordinates (1586 × 992).
(() => {
  'use strict';

  function tailLights() {
    return `<g class="miami-brakes">
      ${[[20,730],[63,729],[278,727],[320,727]].map(([x,y]) =>
        `<circle cx="${x}" cy="${y}" r="32" fill="url(#miami-lamp)"/>`).join('')}
      <ellipse cx="46" cy="950" rx="75" ry="17" fill="url(#miami-spill)"/>
      <ellipse cx="288" cy="959" rx="69" ry="20" fill="url(#miami-spill)"/>
    </g>`;
  }

  function ripples() {
    // Narrow, perspective-flattened rings catch the reflected neon in puddles.
    return [[34,922],[168,970],[345,935],[493,963],[607,902],[1015,928],
      [1125,887],[1290,961],[1450,919],[1528,981]].map(([x,y],i) =>
      `<g transform="translate(${x} ${y})"><ellipse class="miami-ripple" rx="${17+i%3*6}" ry="2.4"
        fill="none" stroke="${i%2?'#ffb4bc':'#aaf5e4'}" stroke-width="1" style="--phase:-${i*1.91}s"/></g>`).join('');
  }

  function traffic() {
    return `<g transform="translate(807 821)"><g class="miami-traffic">
      <ellipse cy="6" rx="13" ry="2" fill="url(#miami-headlamp)"/>
      <path d="M-9 1 -8-2 -5-3 -3-6 3-6 6-3 8-2 9 1 7 3H-7Z" fill="#432843"/>
      <path d="M-4-3 -2-5H2L4-3Z" fill="#e4a5b5"/>
      <path d="M-8-1h4m8 0h4" stroke="#ffebba" stroke-width="1.8"/>
      <circle cx="-6" cy="-1" r="5" fill="url(#miami-headlamp)"/><circle cx="6" cy="-1" r="5" fill="url(#miami-headlamp)"/>
    </g></g>`;
  }

  function helicopter() {
    return `<g class="miami-flight"><g class="miami-helicopter">
      <path d="M-27-4 -13-2 -5-7 5-8 12-5 18 1 17 4 8 6 -3 6 -11 1 -26-1 -30-8 -28-9Z" fill="#342740"/>
      <path d="M3-7 10-4 14 0 5-1Z" fill="#c396ab"/>
      <path d="M0-8v-4m-4 18 -1 4m13-4 1 4m-19 0h24l3-2" fill="none" stroke="#38293f" stroke-width="1.4"/>
      <path class="miami-rotor" d="M-24-12h48" stroke="#453448" stroke-width="1.8"/>
      <circle class="miami-beacon" cx="-27" cy="-4" r="1.7" fill="#fff1bd"/>
    </g></g>`;
  }

  function petals() {
    return [[30,189],[80,220],[65,390],[130,484],[82,533],[120,413]].map(([x,y],i) =>
      `<g transform="translate(${x} ${y})"><g class="miami-petal" style="--phase:-${i*2.7}s">
        <path d="M-3 0Q-2-5 3-4Q5 1 0 3Z" fill="${i%2?'#ff5197':'#f892a6'}"/></g></g>`).join('');
  }

  (globalThis.SearchscapeScenePacks ??= []).push(() => ({
    miami: () => `<g transform="scale(${1600/1586} ${1000/992})">
      <defs>
        <radialGradient id="miami-lamp"><stop stop-color="#ffefd5"/><stop offset=".32" stop-color="#ff795c" stop-opacity=".95"/><stop offset=".59" stop-color="#ff273d" stop-opacity=".78"/><stop offset="1" stop-color="#fa1545" stop-opacity="0"/></radialGradient>
        <radialGradient id="miami-spill"><stop stop-color="#ff344b" stop-opacity=".88"/><stop offset="1" stop-color="#ff5364" stop-opacity="0"/></radialGradient>
        <radialGradient id="miami-headlamp"><stop stop-color="#fff9cf"/><stop offset="1" stop-color="#ffd981" stop-opacity="0"/></radialGradient>
      </defs>
      <g class="miami-marquee" fill="none" stroke="#fff1fe" stroke-linecap="round">
        <path d="M165 520Q401 555 442 591" stroke-width="1.8"/>
        <path d="M1389 331Q1396 294 1495 281M1534 272l52-36M1303 432l78-71" stroke-width="2.1"/>
      </g>
      ${tailLights()}${ripples()}${traffic()}${helicopter()}${petals()}
    </g>`
  }));
})();
