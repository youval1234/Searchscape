(() => {
  'use strict';
  (globalThis.SearchscapeScenePacks ??= []).push(({plate}) => {
    function tank() {
      return `<path d="M8 62 31 47 191 46 217 61 205 83Q197 96 178 98H45Q29 98 19 86Z" fill="var(--field-track)"/>
        <path d="M20 65 38 56h146l20 8-11 18q-4 6-15 6H46q-13 0-22-14Z" fill="var(--field-shade)"/>
        ${[45,73,101,129,157,183].map((x,i)=>`<circle cx="${x}" cy="${i===0||i===5?71:74}" r="11.5" fill="var(--field-hull)" stroke="var(--field-track)" stroke-width="2"/><circle cx="${x}" cy="${i===0||i===5?71:74}" r="3.3" fill="var(--field-shade)"/>`).join('')}
        <path d="m7 54 22-19 117-5 46 8 30 19-6 8-166-1-37 5Z" fill="var(--field-hull)"/>
        <path d="m29 35 111-5 49 8-36 8-129 2Z" fill="var(--field-lit)"/>
        <path d="M49 46h102l-10 12H34Zm109 0 31-6 24 16-61 1Z" fill="var(--field-shade)" opacity=".6"/>
        <path d="m61 31 6-13 22-11 42 2 24 12-8 13-72 3Z" fill="var(--field-hull)"/>
        <path d="m67 18 20-12 45 1 18 9-57 5Z" fill="var(--field-lit)"/>
        <path d="m140 17 18 2 63-12 2 5-67 15-18-2Z" fill="var(--field-shade)"/>
        <path d="m86 7 5-5 18-1 4 6Z" fill="var(--field-shade)"/>
        <path d="m76 14-5-30" stroke="var(--field-shade)" stroke-width="1.5"/>
        <g transform="translate(53 26) rotate(-4)"><rect width="33" height="12" rx="5" fill="#99947a" stroke="var(--field-shade)" stroke-width="1.5"/><path d="M8 0v12m16-12v12" stroke="#585e4d" stroke-width="3"/><path d="m2 6 4-2m22 3 4-2" stroke="#c7bb96" fill="none"/></g>
        <path d="m36 63 9-2m131-2 14 1m-20-27 4-3 10 3" fill="none" stroke="var(--field-mark)" stroke-width="1.5"/>
        <path d="m113 18 10-1-5 7-8 1Z" fill="var(--field-mark)"/>
        <path d="M54 50h26l-4 10H49Zm31-1h24l-3 10H81Zm28-1h27l-4 10h-27Z" fill="var(--field-hull)" stroke="var(--field-shade)" stroke-width=".9"/>
        <path d="M18 52h24m123-11 17-2" fill="none" stroke="var(--field-mark)" stroke-width="2" opacity=".8"/>`;
    }
    function soldier(x,y,scale,pose) {
      // The two standing figures meet at the map table.
      return `<g transform="translate(${x} ${y}) scale(${scale})">
        <path d="m-7 51 9-1-1 28-4 21-7 1 1-24Zm10 0 9-2 2 25 9 23-7 3-12-25Z" fill="var(--field-shade)"/>
        <path d="M-11 97h8l2 4-14 1Zm26 0 7-2 6 4-12 3Z" fill="var(--field-track)"/>
        <path d="m-8 17 7-6 12 1 5 11-3 32-24-1Z" fill="var(--field-hull)"/>
        <path d="M-11 21q-8 0-8 9v14l8 3Z" fill="var(--field-shade)"/>
        <path d="m-8 28 14-1 1 9-15 1m-2 11 23 1" fill="none" stroke="var(--field-shade)" stroke-width="3"/>
        <path d="m-4 0 15-2-1 7 2 3-4 1-1 5-7-1-2-6Z" fill="#c49b78"/>
        <path d="M-8 2q0-14 10-15q11-1 13 11l3 3-24 4Z" fill="var(--field-shade)"/>
        <path d="M-6-4q2-7 10-7l5 2" fill="none" stroke="var(--field-lit)" stroke-width="2"/>
        <path d="${pose==='point'?'M7 20 14 20 23 32 45 27 47 31 23 40 17 38 9 31Z':'M8 20 16 21 21 36 12 47 8 43 15 35Z'}" fill="var(--field-lit)"/>
      </g>`;
    }
    return {military:()=>`
      <defs><g id="field-tank">${tank()}</g></defs>
      ${plate('land',`<path d="M0 650 144 579 223 603 340 530 535 649 697 672 856 621 979 634 1184 508 1284 555 1375 504 1600 594V1000H0Z" fill="var(--field-far)"/>
        <path d="m1089 568 95-60 61 29-59-13-35 26 5-13Z" fill="var(--field-mark)" opacity=".5"/>
        <g class="field-mist" fill="var(--field-mist)"><path d="M-90 649q151-32 306-9t304 5q-165 22-350 10Z"/><path d="M972 631q125-22 280-8t315-4q-140 30-337 22Z"/></g>
        <path d="M0 729q166-74 375-44t420 33q202 1 410-67t395 12v337H0Z" fill="var(--field-ground)"/>
        <path d="M0 880q213-85 392-55t401 51q-218-2-411-28T0 909Z" fill="var(--field-path)" opacity=".77"/>`)}
      ${plate('left',`
        <path d="M0 407q146-26 276-16t144 8v9q-93-8-153-9t-267 18Z" fill="var(--field-path)"/>
        <g transform="translate(0 344)"><g class="field-convoy"><use href="#field-tank" transform="scale(.59)"/></g></g>
        <path d="M-10 488q143-38 337-6l69 16q-241-13-406 11Z" fill="var(--field-path)"/>
        <ellipse cx="168" cy="474" rx="145" ry="9" fill="var(--field-shade)" opacity=".30"/>
        <g transform="translate(7 332) scale(1.48)"><use href="#field-tank"/></g>
        <g fill="none" stroke="var(--field-lit)" stroke-width="2" opacity=".7"><path d="m14 487 5-10 4 9m303-2 4-10 4 7m-4 3 9-6"/></g>`)}
      ${plate('right',`
        <circle cx="308" cy="258" r="38" fill="#d6b091" opacity=".52"/>
        <g fill="var(--field-far)"><path d="m80 404 16-36 14 36h-8l11 21H78l11-21Zm33 3 12-25 12 25h-6l7 16h-31l9-16Z"/></g>
        <path d="m209 410 66-99 86-3 59 89v43H209Z" fill="var(--field-hull)"/>
        <path d="m275 311 33 97 112-11-61-89Z" fill="var(--field-lit)"/>
        <path d="m226 415 49-83 18 84Z" fill="var(--field-shade)"/><path d="m275 332 8 80-25 3Z" fill="var(--field-track)"/>
        <path d="m274 309-59 131m146-132 56 119" stroke="var(--field-shade)" stroke-width="1.6" fill="none"/>
        <g transform="translate(334 309)"><path d="m-2 0 4-24 4 25Z" fill="var(--field-shade)"/><g class="field-dish"><path d="M-19-35q3 24 24 17l12-5Z" fill="var(--field-mark)" stroke="var(--field-shade)" stroke-width="2"/><path d="m-9-32 9-8 3 12" fill="none" stroke="var(--field-shade)" stroke-width="2"/></g></g>
        <path d="M371 334V169" stroke="var(--field-shade)" stroke-width="3"/>
        <g transform="translate(371 173)"><path class="field-pennant" d="M0 0Q-15 3-28-3T-59-1Q-46 11-32 8T0 14Z" fill="#c18162"/></g>
        ${soldier(159,373,1,'point')}<g transform="translate(550 0) scale(-1 1)">${soldier(275,376,.96,'rest')}</g>
        <path d="m196 420 38-9 31 6-40 12Z" fill="var(--field-lit)"/><path d="m197 420 28 8 39-11v5l-39 12-28-9Z" fill="var(--field-shade)"/>
        <path d="m202 425-2 41m28-36 2 40m29-48 4 33" stroke="var(--field-shade)" stroke-width="3"/>
        <path d="m201 420 23-6 15 1-7 3 5 2-13 5Z" fill="#d8c6a2"/>
        <path d="m208 420 7-3 3 2 7-3 3 1m-9-2 3 8" stroke="#9e906a" stroke-width="1.4" fill="none"/>
        <g transform="translate(347 413)"><rect width="26" height="19" rx="2" fill="var(--field-track)"/><path d="m20 0 4-21M3 12h9m-9 3h9" stroke="var(--field-lit)" stroke-width="1.5"/><rect x="4" y="4" width="13" height="4" fill="#9eb29a"/><circle cx="20" cy="12" r="2.5" fill="var(--field-mark)"/></g>
        <rect x="332" y="433" width="56" height="31" rx="3" fill="var(--field-shade)"/><path d="M340 436v24m39-24v24m-26-17h12" stroke="var(--field-lit)" stroke-width="3"/>
      `)}`};
  });
})();
