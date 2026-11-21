(() => {
  'use strict';
  (globalThis.SearchscapeScenePacks ??= []).push(({plate}) => ({
    miami: () => `
      <defs>
        <linearGradient id="m-car" x2=".2" y2="1"><stop stop-color="#ffd1a5"/><stop offset=".38" stop-color="#e98c80"/><stop offset="1" stop-color="#a95268"/></linearGradient>
        <linearGradient id="m-glass" x2="1" y2="1"><stop stop-color="#95ccc4"/><stop offset="1" stop-color="#47687a"/></linearGradient>
        <linearGradient id="m-hotel" x2="1" y2=".6"><stop stop-color="var(--m-stucco)"/><stop offset="1" stop-color="var(--m-shadow)"/></linearGradient>
        <linearGradient id="m-night-glass" x2=".35" y2="1"><stop stop-color="#33505b"/><stop offset=".44" stop-color="#698c96"/><stop offset="1" stop-color="#465d71"/></linearGradient>
        <linearGradient id="m-lobby" x2="0" y2="1"><stop stop-color="#eebf8e"/><stop offset=".55" stop-color="#b67c76"/><stop offset="1" stop-color="#675267"/></linearGradient>
        <g id="m-balcony">
          <path d="M1 5Q1 0 13 0h97v18H1Z" fill="url(#m-night-glass)"/>
          <path d="M9 2h22l-7 7H7Zm46 0h15l-7 7H48Z" fill="#c7d6cb" opacity=".42"/>
          <path d="M17 1v16m25-16v16m25-16v16m25-16v16" stroke="var(--m-shadow)" stroke-width="2"/>
          <path d="M-3 14q1-3 12-3h102v2H9q-8 0-12 3Z" fill="#e7b7a4"/>
          <path d="M4 13v7m18-8v8m25-8v8m25-8v8m23-8v8" stroke="#b99293" stroke-width="1.4"/>
          <path d="M-6 20q3-3 15-3h105v5H9q-12 0-15 3Z" fill="var(--m-shadow)"/>
          <path d="M-6 19q4-4 15-4h105v3H9q-12 0-15 3Z" fill="#edb6a2"/>
        </g>
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
        <path d="M88 445V325h18v-29h19v29h20v-61h35v-12h10v13h18v180Z" fill="var(--m-distant)" opacity=".72"/>
        <path d="M61 464v-142q0-34 31-40l112-12v-33l61-6v-45l44-5 15 5v42l64 7 32 14v215Z" fill="url(#m-hotel)"/>
        <path d="m309 181 15 5v42l64 7 32 14v215h-44V249l-67-8Z" fill="var(--m-shadow)"/>
        <path d="m259 239 6-54 44-5 17 5v7l-17-5-39 4-3 47Z" fill="#d39d9e"/>
        <g transform="translate(272 189) skewY(-5)">
          <path d="M0 44V-5h6v49Zm10 0V-13h7v57Zm11 0V-4h5v48Z" fill="#ecb2a0"/>
          <path d="M2 36V0m11 32V-8m10 42V1" stroke="#ad7e82" stroke-width="1.4"/>
        </g>
        <path d="M61 314q0-28 31-32l115-13m-145 53q0-24 30-27l114-12m0-45 62-7m56-3 62 7 34 14" fill="none" stroke="#e3a99d" stroke-width="2.4"/>
        <g transform="translate(74 320) skewY(-5)">
          <use href="#m-balcony"/><use href="#m-balcony" y="28"/><use href="#m-balcony" y="56"/>
        </g>
        <g transform="translate(253 260) skewY(-5)">
          <path d="M0 0h94v117H0Z" fill="var(--m-shadow)"/>
          <path d="M6 5h82v106H6Z" fill="url(#m-night-glass)"/>
          <path d="M10 8h14v22H10Zm30 43h16v24H40Zm31 35h13v21H71Z" fill="#d3a18c" opacity=".84"/>
          <path d="M7 34h80M7 77h80" stroke="var(--m-shadow)" stroke-width="5"/>
          <path d="M29 0v117m33-117v117" stroke="var(--m-stucco)" stroke-width="5"/>
          <path d="M31 0v117m33-117v117" stroke="#efb09b" stroke-width="1.6"/>
        </g>
        <path d="m371 256 49 15v59l-49-11Zm0 74 49 11v62l-49-8Z" fill="var(--m-glass)"/>
        <path d="m371 281 49 14m-49 58 49 10m-29-100v135" stroke="var(--m-shadow)" stroke-width="3"/>
        <g transform="translate(72 407) skewY(-5)">
          <path d="M0 0h111l8 8H-4Z" fill="#dfa29b"/><path d="M-4 8h123v5H-3Z" fill="#a56e7c"/>
          <path d="M4 15h103v40H4Z" fill="url(#m-night-glass)"/>
          <path d="M12 18h84v4H12Z" fill="#e6bc94"/><path d="M26 15v39m34-39v39m25-39v39" stroke="var(--m-stucco)" stroke-width="2.4"/>
          <g fill="#d7a385" stroke="#5d6671" stroke-width="1.4">
            <path d="M8 41q-2-6 3-6h5v9h-6Zm28 0q2-6-3-6h-5v9h6Z"/><path d="M10 43h6l-1 7m16-7-1 7" fill="none"/>
            <ellipse cx="22" cy="40" rx="8" ry="1.7"/><path d="M22 42v8m-5 1h10" fill="none"/>
            <path d="M75 20v7" fill="none"/><path d="M70 30q1-6 5-6t5 6Z" fill="#ffd4a4"/>
          </g>
        </g>
        <path d="M194 461v-43q0-24 32-28l47-5q18-1 18 18v58Z" fill="var(--m-shadow)"/>
        <path d="M206 459v-40q0-16 19-19l45-4q8 0 8 10v53Z" fill="url(#m-lobby)"/>
        <path d="M210 440q5-3 15-3h15v6h-30Z" fill="#946761"/><path d="M210 442h28v12h-28Z" fill="#826064"/>
        <path d="M261 421v8m-5 1h10l-2-5h-6Z" fill="#f5cc9e" stroke="#ad8076" stroke-width=".9"/>
        <path d="m209 418 68-6m-34 3-18-14m18 14 11-17m-11 17 27-15m-27 15-33-6m16 8v42m34-46v46" fill="none" stroke="#755c62" stroke-width="2.3"/>
        <path d="m194 458 98-1 5 3-108 2Zm-7 5 113-1 6 4H180Z" fill="#c49690"/>
        <path d="m185 393 104-11 15 9-113 13-14-5Z" fill="#d29792"/><path d="m177 399 14 5 113-13v6l-113 12-14-6Z" fill="var(--m-shadow)"/>
        <path class="miami-canopy-light" d="m192 405 108-12" fill="none" stroke="#ffcf9e" stroke-width="2.2"/>
        <path d="m194 261 12-1m-12 85 12-1" stroke="var(--m-shadow)" stroke-width="5"/>
        <rect x="201" y="241" width="36" height="139" rx="15" fill="#49566a" stroke="#bd8991" stroke-width="3"/>
        <rect x="205" y="245" width="28" height="131" rx="12" fill="#395c64" stroke="#f5bb9d" stroke-width="1.5"/>
        <g class="miami-marquee" fill="#ffdfb8" font-family="sans-serif" font-size="15" text-anchor="middle">${[...'OCEAN'].map((c,i)=>`<text x="219" y="${269+22*i}">${c}</text>`).join('')}</g>
        <g transform="translate(339 423)" stroke-linecap="round">
          <path d="M-10 33V12q0-10 10-10t10 10v21M-1 2V0" fill="none" stroke="#d3ad8d" stroke-width="2"/>
          <rect x="-7" y="21" width="16" height="11" rx="2" fill="#885c63" stroke="#5f5161"/>
          <path d="M-4 21v-2h5v2m2 1v9" fill="none" stroke="#c99584" stroke-width="1.5"/>
          <path d="M-13 34h26" stroke="#c7a18c" stroke-width="2.5"/><path d="M-8 36v1m17-1v1" stroke="#515461" stroke-width="3"/>
        </g>
        <path d="M306 440h20l-3 19h-14Z" fill="#bd877d"/><path d="M316 442q-14-6-15-16 10 2 15 10-3-15 6-23 3 13-5 23 8-10 16-10-3 10-17 16Z" fill="var(--m-palm)"/>
        <use href="#m-palm" transform="translate(383 474) scale(-.78 .78)"/>
        <path d="M58 466h362" fill="none" stroke="var(--m-shadow)" stroke-width="4"/>`)}`
  }));
})();
