(() => {
  'use strict';
  // GTA VI · Miami: a neon dusk over the bay. Original artwork; no game logos, type or characters.
  (globalThis.SearchscapeScenePacks ??= []).push(({plate}) => {
    const HORIZON = 708;
    // Small deterministic hash, so lit windows stay put between renders.
    const lit = (x, y, odds) => ((Math.sin(x * 12.9898 + y * 78.233) * 43758.5453) % 1 + 1) % 1 < odds;

    const towers = [
      [0,46,120],[50,38,170],[92,60,140],[156,30,214],[190,52,160],[246,40,122],[290,64,190],[358,36,150],[398,50,112],[452,44,82],[500,40,62],
      [548,30,48],[584,46,34],[640,26,56],[676,60,40],[744,22,64],[772,40,44],[822,52,30],[884,28,52],[918,44,38],[970,34,58],[1010,46,42],
      [1060,40,72],[1104,52,112],[1160,36,160],[1200,60,132],[1264,30,204],[1298,50,150],[1352,42,182],[1398,58,122],[1460,36,162],[1500,50,132],[1554,46,104]
    ];
    const skyline = towers.map(([x,w,h]) => `M${x} ${HORIZON}V${HORIZON-h}H${x+w}V${HORIZON}Z` +
      (h > 175 ? `M${x+w/2-1} ${HORIZON-h}v-26h2v26Z` : '')).join('');
    let skyWindows = '';
    for (const [x,w,h] of towers) {
      if (h < 60) continue;
      for (let wy = HORIZON - h + 10; wy < HORIZON - 8; wy += 12)
        for (let wx = x + 5; wx < x + w - 5; wx += 8)
          if (lit(wx, wy, .2)) skyWindows += `M${wx} ${wy}h3v4h-3Z`;
    }

    // Sun reflection: broken strokes that narrow toward the viewer.
    let glare = '', glareSoft = '';
    for (let k = 0; k < 10; k++) {
      const y = HORIZON + 8 + k * 16, half = 182 - k * 14;
      glare += `M${800-half} ${y}h${half*2}`;
      glareSoft += `M${800-half*.7} ${y+7}h${half*1.4}`;
    }

    // A frond is a drooping spine with fine leaflets hanging from it.
    const spine = t => [2*(1-t)*t*48 + t*t*104, 2*(1-t)*t*-40 + t*t*14];
    let frond = 'M0 0';
    for (let i = 1; i <= 20; i++) { const [x,y] = spine(i/20); frond += `L${x.toFixed(1)} ${(y-2.2*Math.sin(Math.PI*i/20)).toFixed(1)}`; }
    for (let i = 19; i >= 1; i--) {
      const t = i/20, [x,y] = spine(t), drop = 5 + 19*Math.sin(Math.PI*Math.min(1,t*1.15));
      frond += i % 2 ? `L${(x-7).toFixed(1)} ${(y+drop).toFixed(1)}` : `L${x.toFixed(1)} ${(y+1.5).toFixed(1)}`;
    }
    frond += 'Z';

    // Trunk rings follow the trunk's centre curve.
    const rings = Array.from({length:9}, (_, i) => {
      const t = .08 + i * .1, x = 28 * t * t, y = -178 * t * t - 2 * (1 - t) * t * 90;
      return `M${(x-7).toFixed(1)} ${y.toFixed(1)}h14`;
    }).join('');
    const crown = [[0,1],[30,1],[62,.86],[-38,.8],[-2,-1],[34,-1],[66,-.84],[-72,.7]]
      .map(([angle, s]) => `<use href="#m-frond" transform="${s < 0 ? `scale(${s} ${-s}) ` : `scale(${s}) `}rotate(${angle})"/>`).join('');
    const palm = (id, cls) => `<g id="${id}">
      <path d="M-8 0Q-8-90 24-178L33-176Q6-90 8 0Z" fill="var(--m-palm)"/>
      <path d="${rings}" stroke="var(--m-palm-ring)" stroke-width="2"/>
      <g transform="translate(29 -177)"><g ${cls} fill="var(--m-palm)">${crown}<circle cx="-3" cy="6" r="5"/><circle cx="5" cy="7" r="4.5"/></g></g>
    </g>`;

    // Hotel facade: three ribbon-window bands between eyebrow ledges.
    const bands = [[246,274],[292,324],[342,374]];
    const glass = bands.map(([a,b]) => `M78 ${a}H160V${b}H78Q74 ${b} 74 ${(a+b)/2}T78 ${a}ZM168 ${a}H256V${b}H168ZM304 ${a}H420V${b}H304Z`).join('');
    const mullions = bands.map(([a,b]) => [186,204,222,240,322,340,358,376,394,96,118,140].map(x => `M${x} ${a}V${b}`).join('')).join('');
    let panes = '';
    bands.forEach(([a,b]) => {
      for (const [from,to] of [[168,256],[304,420],[78,160]])
        for (let x = from; x < to - 2; x += 18) if (lit(x, a, .34)) panes += `M${x+2} ${a+3}h${Math.min(14,to-x-4)}V${b-3}h-${Math.min(14,to-x-4)}Z`;
    });

    return {miami: () => `
      <defs>
        <linearGradient id="m-glow" x2="0" y2="1"><stop stop-color="var(--m-glow)" stop-opacity="0"/><stop offset=".55" stop-color="var(--m-glow)" stop-opacity=".42"/><stop offset="1" stop-color="var(--m-glow2)" stop-opacity=".95"/></linearGradient>
        <radialGradient id="m-halo"><stop stop-color="var(--m-sun2)" stop-opacity=".55"/><stop offset=".5" stop-color="var(--m-sun3)" stop-opacity=".18"/><stop offset="1" stop-color="var(--m-sun3)" stop-opacity="0"/></radialGradient>
        <linearGradient id="m-sun" x2="0" y2="1"><stop offset=".08" stop-color="var(--m-sun1)"/><stop offset=".55" stop-color="var(--m-sun2)"/><stop offset=".95" stop-color="var(--m-sun3)"/></linearGradient>
        <linearGradient id="m-sea" x2="0" y2="1"><stop stop-color="var(--m-sea1)"/><stop offset="1" stop-color="var(--m-sea2)"/></linearGradient>
        <mask id="m-sun-cut"><rect x="560" y="400" width="480" height="320" fill="#fff"/><path d="M560 604h480v3H560Zm0 26h480v5H560Zm0 24h480v7H560Zm0 22h480v9H560Zm0 20h480v11H560Z" fill="#000"/></mask>
        <linearGradient id="m-car" x2="0" y2="1"><stop stop-color="#ff86bd"/><stop offset=".45" stop-color="#ea3684"/><stop offset="1" stop-color="#8a1856"/></linearGradient>
        <linearGradient id="m-car-glass" x2=".4" y2="1"><stop stop-color="var(--m-sun1)"/><stop offset=".45" stop-color="#8c4b8f"/><stop offset="1" stop-color="#21173a"/></linearGradient>
        <linearGradient id="m-stripe"><stop stop-color="var(--m-sun1)"/><stop offset=".5" stop-color="var(--m-sun2)"/><stop offset="1" stop-color="#3fe6f2"/></linearGradient>
        <radialGradient id="m-underglow"><stop stop-color="var(--m-neon-cyan)" stop-opacity=".85"/><stop offset="1" stop-color="var(--m-neon-cyan)" stop-opacity="0"/></radialGradient>
        <linearGradient id="m-deck"><stop offset=".7" stop-color="var(--m-road)"/><stop offset="1" stop-color="var(--m-road)" stop-opacity="0"/></linearGradient>
        <linearGradient id="m-beam"><stop stop-color="#fff2c4" stop-opacity=".6"/><stop offset="1" stop-color="#fff2c4" stop-opacity="0"/></linearGradient>
        <linearGradient id="m-tower" x2="1"><stop stop-color="var(--m-shadow)"/><stop offset=".35" stop-color="var(--m-trim)"/><stop offset=".7" stop-color="var(--m-stucco)"/><stop offset="1" stop-color="var(--m-shadow)"/></linearGradient>
        <linearGradient id="m-lobby" x2="0" y2="1"><stop stop-color="var(--m-lit)"/><stop offset="1" stop-color="var(--m-sun3)" stop-opacity=".7"/></linearGradient>
        <path id="m-frond" d="${frond}"/>
        ${palm('m-palm','class="miami-leaves"')}
        ${palm('m-palm-still','')}
        <g id="m-wheel"><circle r="22" fill="#120c1c"/><circle r="15" fill="var(--m-chrome)"/><circle r="11" fill="#2a2238"/>
          <path class="miami-spokes" d="M0-11V-3M10.5-3.4 2.9-.9M6.5 8.9 1.8 2.4M-6.5 8.9-1.8 2.4M-10.5-3.4-2.9-.9" stroke="var(--m-chrome)" stroke-width="2.6" stroke-linecap="round"/><circle r="3" fill="var(--m-chrome)"/></g>
      </defs>
      ${plate('land',`
        <rect y="330" width="1600" height="${HORIZON-330}" fill="url(#m-glow)"/>
        <circle class="miami-halo" cx="800" cy="640" r="340" fill="url(#m-halo)"/>
        <circle cx="800" cy="640" r="212" fill="url(#m-sun)" mask="url(#m-sun-cut)"/>
        <g fill="var(--m-cloud)"><path d="M380 566q150-16 350-7-170 14-350 7Zm520 18q170-14 330-2-150 10-330 2Z" opacity=".7"/><path d="M560 610q130-9 260-3-120 8-260 3Zm510-40q110-8 220-1-100 6-220 1Z" opacity=".45"/></g>
        <g transform="translate(-160 430)"><g class="miami-heli" fill="var(--m-palm)">
          <ellipse cx="0" cy="0" rx="16" ry="8"/><path d="M-12-3-46-7v4l34 7Z"/><circle cx="-46" cy="-6" r="4" fill="none" stroke="var(--m-palm)" stroke-width="1.5"/>
          <path d="M-30-13h60M-12 12h28M-6 7v5m14-5v5M0-8v-5" stroke="var(--m-palm)" stroke-width="1.6" fill="none"/>
          <path d="M5-5q7 0 9 5h-9Z" fill="var(--m-neon-cyan)" opacity=".7"/><circle cx="-44" cy="1" r="1.8" fill="#ff3b5c"/>
        </g></g>
        <path d="${skyline}" fill="var(--m-distant)"/>
        <path d="${skyWindows}" fill="var(--m-window)" opacity="var(--m-window-o)"/>
        <g fill="none" stroke-linecap="round"><path d="M157 495h28M1265 505h28M1373 532v168" stroke="var(--m-neon-pink)" stroke-width="8" opacity="var(--m-glow-o)"/><path d="M157 495h28M1265 505h28" stroke="var(--m-neon-pink)" stroke-width="2.5"/><path d="M1373 532v168" stroke="var(--m-neon-cyan)" stroke-width="2.5"/></g>
        <rect y="${HORIZON-1}" width="1600" height="300" fill="url(#m-sea)"/>
        <path d="M0 ${HORIZON}H1600" stroke="var(--m-sun2)" stroke-width="2" opacity=".55"/>
        <g class="miami-tide" fill="none" stroke-linecap="round">
          <path d="${glare}" stroke="var(--m-sun2)" stroke-width="3.2" stroke-dasharray="46 14 22 12" opacity=".8"/>
          <path d="${glareSoft}" stroke="var(--m-sun1)" stroke-width="1.8" stroke-dasharray="18 22 40 16" opacity=".7"/>
          <path d="M70 760q90-8 170-3m1130 18q80-7 150-2M190 812q70-5 130-2m1000 26q70-6 140-2" stroke="var(--m-foam)" stroke-width="2" opacity=".5"/>
        </g>
        <use href="#m-palm-still" transform="translate(470 876) scale(.42)"/><use href="#m-palm-still" transform="translate(520 872) scale(-.34 .34)"/>
        <use href="#m-palm-still" transform="translate(1120 872) scale(.38)"/><use href="#m-palm-still" transform="translate(1176 874) scale(-.46 .46)"/>
        <path d="M0 878Q400 866 800 872T1600 868V1000H0Z" fill="var(--m-road)"/>
        <path d="M0 878Q400 866 800 872T1600 868" fill="none" stroke="var(--m-neon-pink)" stroke-width="9" opacity="var(--m-glow-o)"/>
        <path d="M0 878Q400 866 800 872T1600 868" fill="none" stroke="var(--m-neon-pink)" stroke-width="2.4"/>
        <g class="miami-traffic" fill="none" stroke-linecap="round">
          <path class="miami-lanes" d="M-40 944Q800 930 1640 944" stroke="var(--m-lane)" stroke-width="3" stroke-dasharray="36 44"/>
          <path d="M-40 914Q800 900 1640 914" stroke="#ff3b6b" stroke-width="3" stroke-dasharray="180 620" opacity=".85"/>
          <path d="M-40 974Q800 962 1640 974" stroke="var(--m-neon-cyan)" stroke-width="3" stroke-dasharray="110 690" opacity=".8"/>
        </g>`)}
      ${plate('left',`
        <use href="#m-palm" transform="translate(96 470) scale(1.42)"/>
        <use href="#m-palm" transform="translate(214 462) scale(-.86 .86)" style="--sway:-2.6s"/>
        <use href="#m-palm-still" transform="translate(20 466) scale(.7)"/>
        <path d="M0 492H420V512H0Z" fill="url(#m-deck)"/>
        <g transform="translate(34 404)">
          <ellipse cx="160" cy="92" rx="172" ry="9" fill="var(--m-car-shadow)"/>
          <ellipse class="miami-underglow" cx="160" cy="88" rx="160" ry="16" fill="url(#m-underglow)" opacity="var(--m-underglow-o)"/>
          <path d="M314 40 520 6v92Z" fill="url(#m-beam)" opacity="var(--m-beam-o)"/>
          <path d="M8 28 40 25 42 29 12 33Z" fill="#8a1856"/><path d="M30 29l-2 6" stroke="#5c1040" stroke-width="3"/>
          <path d="M6 66 2 44Q2 34 14 32L108 28 146 12Q156 8 174 8L198 9Q208 10 216 15L250 32 308 40Q318 42 318 50L316 64Q314 68 306 68H284A29 29 0 0 0 226 68H100A29 29 0 0 0 42 68H12Q6 68 6 66Z" fill="url(#m-car)"/>
          <path d="M6 56H317L316 64Q314 68 306 68H284A29 29 0 0 0 226 68H100A29 29 0 0 0 42 68H12Q6 68 6 66Z" fill="#5c1040" opacity=".55"/>
          <path d="M8 47 300 43 314 46 10 52Z" fill="url(#m-stripe)"/>
          <path d="M120 28 144 15 149 28ZM156 13Q160 11 174 11L196 12Q204 13 210 16L238 31 156 29Z" fill="url(#m-car-glass)"/>
          <path d="M150 28 153 12M150 29Q147 48 153 66M112 39 140 37 136 43 114 44Z" fill="#5c1040" stroke="#7a1650" stroke-width="1.6"/>
          <path d="M2 37 16 36 15 43 3 44Z" fill="#ff2a4a"/><path d="M2 40h14" stroke="#ffd0d8" stroke-width="1"/>
          <path d="M282 37 306 40" stroke="#fff1d6" stroke-width="3" stroke-linecap="round"/><path d="M210 24l8-2 2 6-8 1Z" fill="#8a1856"/>
          <path d="M108 28 146 12Q156 8 174 8L198 9Q208 10 216 15L250 32 308 40" fill="none" stroke="var(--m-rim)" stroke-width="1.8" opacity=".9"/>
          <path class="miami-glint" d="M20 33Q140 25 302 40" fill="none" stroke="#fff6ea" stroke-width="2.6" stroke-linecap="round" pathLength="100"/>
          <use href="#m-wheel" x="71" y="68"/><use href="#m-wheel" x="255" y="68"/>
        </g>`)}
      ${plate('right',`
        <path d="M150 236H420V470H150Z" fill="var(--m-stucco)"/>
        <path d="M160 196H112Q70 196 70 238V470H160Z" fill="url(#m-tower)"/>
        <path d="M84 196V178h62v18Zm10-18v-14h42v14Zm10-14v-12h22v12Z" fill="var(--m-trim)"/>
        <path d="M115 152v-44" stroke="var(--m-trim)" stroke-width="3"/><circle cx="115" cy="106" r="3" fill="#ff3b5c"/>
        <path d="${glass}" fill="var(--m-glass)"/>
        <path d="${panes}" fill="var(--m-lit)" opacity=".9"/>
        <path d="${mullions}" stroke="var(--m-stucco)" stroke-width="2.4" opacity=".85"/>
        <path d="M64 236H420v7H64Zm0 44H420v7H64Zm0 50H420v7H64Zm0 50H420v7H64Z" fill="var(--m-trim)"/>
        <path d="M70 243H420M70 287H420M70 337H420M70 387H420" stroke="var(--m-shadow)" stroke-width="3" opacity=".7"/>
        <path d="M262 470V132l18-24 18 24V470Z" fill="var(--m-trim)"/><path d="M269 470V138l11-15 11 15V470Z" fill="var(--m-shadow)"/>
        <g fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M66 284H160M66 334H160M66 384H160" stroke="var(--m-neon-cyan)" stroke-width="8" opacity="var(--m-glow-o)"/><path d="M66 284H160M66 334H160M66 384H160" stroke="var(--m-neon-cyan)" stroke-width="2.2"/></g>
        <g class="miami-marquee">
          <path d="M262 236V132l18-24 18 24V236" fill="none" stroke="var(--m-neon-pink)" stroke-width="9" stroke-linejoin="round" opacity="var(--m-glow-o)"/>
          <path d="M262 236V132l18-24 18 24V236M64 232H260M300 232H420" fill="none" stroke="var(--m-neon-pink)" stroke-width="2.4" stroke-linejoin="round"/>
          <g fill="var(--m-sign)" font-family="sans-serif" font-size="19" font-weight="800" text-anchor="middle">${[...'OCEAN'].map((c,i)=>`<text x="280" y="${156+21*i}">${c}</text>`).join('')}</g>
        </g>
        <path d="M74 470V418q0-14 14-14h0q14 0 14 14v52m10 0V418q0-14 14-14t14 14v52" fill="var(--m-glass)" stroke="var(--m-trim)" stroke-width="3"/>
        <path d="M170 404H420V470H170Z" fill="url(#m-lobby)" opacity=".92"/>
        <path d="M196 404v66m34-66v66m34-66v66m40-66v66m38-66v66m40-66v66" stroke="var(--m-stucco)" stroke-width="3"/>
        <path d="M180 396h130l12 12H168Z" fill="var(--m-trim)"/><path d="M168 408H322" stroke="var(--m-neon-pink)" stroke-width="2.4"/>
        <text x="245" y="405" fill="var(--m-shadow)" font-family="sans-serif" font-size="8" font-weight="800" letter-spacing="3" text-anchor="middle">HOTEL</text>
        <path d="M222 470v-30h46v30" fill="none" stroke="var(--m-trim)" stroke-width="2"/>
        <path d="M60 470H420v10H60Z" fill="var(--m-shadow)"/>
        <path d="M338 470l4-18h18l4 18Z" fill="var(--m-trim)"/><path d="M351 452q-16-8-17-20 12 3 17 12-2-17 7-25 4 15-5 25 9-11 18-11-3 12-20 19Z" fill="var(--m-palm)"/>
        <use href="#m-palm" transform="translate(402 482) scale(-.92 .92)" style="--sway:-1.3s"/>
        <use href="#m-palm-still" transform="translate(34 482) scale(.62)"/>`)}`};
  });
})();
