(() => {
  'use strict';
  (globalThis.SearchscapeScenePacks ??= []).push(({plate}) => ({
    miami: () => `
      <defs>
        <linearGradient id="m-car" x2=".2" y2="1"><stop stop-color="#ffd1a5"/><stop offset=".38" stop-color="#e98c80"/><stop offset="1" stop-color="#a95268"/></linearGradient>
        <linearGradient id="m-glass" x2="1" y2="1"><stop stop-color="#95ccc4"/><stop offset="1" stop-color="#47687a"/></linearGradient>
        <linearGradient id="m-hotel" x2="1" y2=".6"><stop stop-color="var(--m-stucco)"/><stop offset="1" stop-color="var(--m-shadow)"/></linearGradient>
        <path id="m-frond" d="M0 0Q31-49 86-29Q65-33 53-22L50-26 37-15 35-19 23-8 22-12Z"/>
        <g id="m-palm"><path d="M-7 0Q-9-84 19-163L25-163Q2-80 6 0Z" fill="var(--m-palm)"/><g transform="translate(22 -162)"><g class="miami-leaves" fill="var(--m-palm)">
          <use href="#m-frond"/><use href="#m-frond" transform="rotate(28)"/><use href="#m-frond" transform="rotate(62) scale(.85)"/><use href="#m-frond" transform="scale(-1 1) rotate(4)"/><use href="#m-frond" transform="scale(-1 1) rotate(44)"/><use href="#m-frond" transform="rotate(-39) scale(.8)"/>
        </g></g></g>
        <g id="m-wheel"><circle r="21" fill="#373b50"/><circle r="13" fill="#98abb2"/><circle r="8" fill="#46596a"/><g class="miami-spokes" stroke="#e4cbc0" stroke-width="2" fill="none"><path d="M0-10v7m9-2-6 4m4 9-5-6m-8 6 4-6m-8-6 7 3"/></g><circle r="2.6" fill="#dbc3b2"/></g>
      </defs>
      ${plate('land',`<path d="M0 709Q290 666 558 714T1112 722Q1382 685 1600 701V1000H0Z" fill="var(--m-bay)"/>
        <path d="M0 790Q247 748 453 777T945 790Q1225 751 1600 764" fill="none" stroke="var(--m-foam)" stroke-width="2" opacity=".45"/>
        <g class="miami-tide" fill="none" stroke="var(--m-foam)" stroke-linecap="round" opacity=".62"><path d="M58 808q88-10 158-4m800 12q95-7 166-3m132 28q80-8 163-4" stroke-width="3"/><path d="M115 827q70-5 108-3m1090 36q52-5 99-3" stroke-width="2"/></g>
        <path d="M0 885Q280 819 522 888Q224 864 0 948Z" fill="var(--m-pavement)"/>`)}
      ${plate('left',`
        <circle cx="127" cy="214" r="59" fill="#efa887" opacity=".63"/>
        <g fill="var(--m-distant)"><path d="M0 402V310h25v-19h21v19h17v92m4 0V336h35v-12h17v78m6 0V300h35v102m7 0v-64h31v64Z"/></g>
        <path d="M0 401q118-13 223 0l32 9q-157-8-255 6Z" fill="var(--m-palm)" opacity=".85"/>
        <path d="M0 419q116-14 199-6" fill="none" stroke="var(--m-foam)" stroke-width="2"/>
        <use href="#m-palm" transform="translate(73 406) scale(1.28)"/><use href="#m-palm" transform="translate(191 398) scale(.64)"/>
        <path d="M0 468q130-10 346 5v24q-220-11-346 4Z" fill="var(--m-pavement)"/>
        <path class="miami-lanes" d="M-24 496q151-17 373-3" fill="none" stroke="#edcaae" opacity=".77" stroke-width="2.7" stroke-dasharray="23 48"/>
        <g transform="translate(30 408)">
          <ellipse cx="157" cy="82" rx="156" ry="11" fill="var(--m-pavement)"/>
          <path d="M9 43Q25 27 77 24L116 0Q128-6 175-5L214 23Q275 24 303 43L300 63Q297 70 278 71H19Q4 67 9 43Z" fill="url(#m-car)"/>
          <path d="M89 23 119 3Q135-1 152 0L153 21Z M159 0h15l32 22-46-1Z" fill="url(#m-glass)"/>
          <path d="M20 44Q84 31 205 29L287 39Q219 34 118 39Z" fill="#ffccad"/>
          <path d="M12 61Q166 64 300 48L298 64Q181 81 16 71Z" fill="#9c5063"/>
          <path d="M62 43Q87 36 103 64M213 61Q222 28 250 34" fill="none" stroke="#b75e6a" stroke-width="3"/>
          <use href="#m-wheel" x="76" y="67"/><use href="#m-wheel" x="238" y="61"/>
          <path d="M12 46l25-5-5 9-20 3Z" fill="#bb4b5a"/><path d="m267 38 27 3-1 6-27-2Z" fill="#ffe1ab"/>
          <path d="m118 28 2 27 68-3 11-23m-71 5h12" fill="none" stroke="#aa6870" stroke-width="1.7"/>
          <path d="m34 34 32-5m-28 9 27-5m145 18 13-5-5 9-12 1Z" fill="#925b69" stroke="#c98c8e" stroke-width="1.3"/>
          <path d="m9 57 23-4m227 5 37-4" fill="none" stroke="#e4b5ac" stroke-width="3" stroke-linecap="round"/>
          <path class="miami-glint" d="M20 46Q121 27 210 30" fill="none" stroke="#ffe8c8" stroke-width="3" pathLength="100"/>
        </g>`)}
      ${plate('right',`
        <g fill="var(--m-distant)"><path d="M124 423V280h37v143m8 0V321h34v102m9 0V256h48v167Z"/></g>
        <path d="M73 461V306Q73 283 97 279l116-12v-27l84-7v-24l66-7 57 6v253Z" fill="url(#m-hotel)"/>
        <path d="m298 234 64-8 58 5v230h-58V252l-64 5Z" fill="var(--m-shadow)"/>
        <g fill="none" stroke-linecap="round">
          <path d="m83 306 131-14m-131 26 131-14m8-36 66-7m20-34 45-6" stroke="#f6b09f" stroke-width="4"/>
          <path d="M100 343l89-8m-89 29 89-8m-89 30 89-8m90-71v102m13-104v102m13-103v103" stroke="var(--m-glass)" stroke-width="8"/>
        </g>
        <path d="M195 459v-42q0-13 13-15l38-3q12-1 12 11v49Z" fill="var(--m-glass)"/>
        <path d="m81 409 104-9 11 11-115 11Z" fill="#d79a9a"/><path d="m81 421 114-10v5q-5 5-10 0-5 6-11 1-5 6-11 1-5 6-11 1-5 6-11 1-5 5-11 1-5 6-11 1-5 6-11 1-6 6-12 1-6 6-15 2Z" fill="#9a677b"/>
        <path d="m89 429 37-3v31H89Zm43-4 44-4v36h-44Z" fill="var(--m-glass)"/><path d="m95 451 12-17m42 17 17-23" stroke="#d0c8c2" opacity=".5" stroke-width="2.5"/>
        <path d="m270 443 21-1-4 17h-14Z" fill="#bb857d"/><path d="M280 444q-2-15-13-19 12 1 15 12 3-15 13-19-2 14-14 25Z" fill="var(--m-palm)"/>
        <rect x="208" y="249" width="29" height="129" rx="13" fill="var(--m-palm)" stroke="#df9d96" stroke-width="2"/>
        <g class="miami-marquee" fill="#ffd9be" font-family="sans-serif" font-size="14" text-anchor="middle">${[...'OCEAN'].map((c,i)=>`<text x="222.5" y="${272+21*i}">${c}</text>`).join('')}</g>
        <use href="#m-palm" transform="translate(383 474) scale(-.78 .78)"/>
        <path d="M58 466h362" fill="none" stroke="var(--m-shadow)" stroke-width="4"/>`)}`
  }));
})();
