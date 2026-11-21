(() => {
  'use strict';
  (globalThis.SearchscapeScenePacks ??= []).push(({plate}) => {
    const repeat = (count, draw) => Array.from({length:count}, (_,i)=>draw(i)).join('');
    const star = '<path d="M0-9 2-2 8 0 2 2 0 10-2 2-8 0-2-2Z"/>';
    const halo = (id,color) => `<radialGradient id="${id}"><stop stop-color="${color}" stop-opacity=".87"/><stop offset=".35" stop-color="${color}" stop-opacity=".48"/><stop offset="1" stop-color="${color}" stop-opacity="0"/></radialGradient>`;

    function technician(receiving) {
      return `<g stroke="#384748" stroke-width="2.4" stroke-linejoin="round">
        <path fill="url(#rx-suit)" d="M-28 43Q-33 23-23 8Q-10-11 12-7Q31-4 36 18L35 42L44 60Q49 77 42 109L35 131 33 174H9L4 133-5 173H-29L-28 123Q-39 99-36 70Z"/>
        <path d="M-30 50Q-14 60 6 53M-23 107Q-9 114 5 109M-21 150l14 3m22-9 13 2" fill="none" stroke="#a27146"/>
        <path d="M-29 167h25l-1 15h-31q-5-10 7-15Zm38 0h24q11 4 12 15H8Z" fill="#465753"/>
        <g stroke="#242f33" stroke-width="1.8" stroke-linecap="round">
          <path d="m-27 14 21 6-1 5-21-6Zm0 24 17-3 3 5-18 5Z" fill="#424a45"/>
          <path d="M-18 14Q-7 4 13 6Q29 7 34 17L35 30Q35 36 28 41L26 51Q21 57 8 55L-5 50Q-14 46-17 36Q-24 24-18 14Z" fill="#303a3c"/>
          <path d="M-13 15Q-1 8 17 10Q28 11 31 18L30 28Q25 33 16 33L10 28Q3 33-7 31Q-16 29-16 22Z" fill="url(#rx-visor)" stroke="#151f25" stroke-width="3"/>
          <path d="M-10 17Q-2 13 8 13l-9 11-8 2Z" fill="#edf4dd" stroke="none" opacity=".8"/>
          <path d="m13 33 6-2 10 6-3 9-15 2-6-5Z" fill="#465153"/>
          <circle cx="1" cy="42" r="7.6" fill="#202c31"/><circle cx="1" cy="42" r="4.7" fill="#506065" stroke-width="1"/>
          <path d="M-1.5 40h4m-4.5 3h5" fill="none" stroke="#253239" stroke-width="1.3"/>
          <g transform="translate(27 42) rotate(31)">
            <path d="M-4-6H4v12h-8Z" fill="#5e6865"/>
            <rect x="2" y="-11" width="19" height="22" rx="3" fill="#434c4b"/>
            <path d="M7-10h5v20H7Z" fill="#c0a770" stroke="none"/>
            <ellipse cx="20" rx="3.8" ry="10.4" fill="#73807a"/>
            <path d="M19-6q2 6 0 12" fill="none" stroke-width="1.4"/>
          </g>
        </g>
        <path d="m-1 59 5 43m-25 2 48-1" fill="none" stroke="#917447"/>
        <rect x="10" y="63" width="13" height="18" rx="3" fill="#58645c"/><path d="M13 69h7" stroke="#e5c681"/>
        <path d="M-23 56Q-32 57-35 70q-4 10-2 20l4 15 13-3-3-20 7-13q2-9-7-13Z" fill="url(#rx-suit)"/>
        <path d="m-33 99 14-3 2 7-14 4Z" fill="#626e65"/>
        <path d="M-31 105q-2 5 0 11l3 5q2 3 5 1 3 2 5-1 3 0 3-4l-1-6q3 3 5 0l-3-7-4-3Z" fill="#4d6260"/>
        <g class="${receiving?'rx-receive':'rx-lift'}">
          <path d="M16 57q8-8 18-1l18 18 17-8 7 12-24 13q-7 3-12-2L17 71q-7-7-1-14Z" fill="url(#rx-suit)"/>
          <path d="m63 68 8-4 8 13-8 5Z" fill="#748077"/>
          ${receiving?`<path d="m78 70 17-5 2 4-16 6Z" fill="#596a69"/>
          <path d="M88 66q1-2 5-3l26-3 13 4q2 2-2 4l-28 5-11-3Z" fill="#647b78"/>
          <path d="m90 65 29-4 10 3-28 5Z" fill="#b6c5b2" stroke-width="1.4"/>
          <path d="m73 68 6-4q3-1 6 0l6 3q2 2 0 4l-5-1 2 2q2 3-2 5l-7 2-4-2Z" fill="#516966"/>
          <path d="m80 73 5 2m-6 0 4 2" fill="none" stroke="#86988b" stroke-width="1.3"/>`:`<path d="m81 73 30-32 6-2m-35 36 36-20 6-9" stroke="#794d3e" stroke-width="4.8" fill="none" stroke-linecap="round"/>
          <path d="m81 73 30-32 6-2m-35 36 36-20 6-9" stroke="#db9c6c" stroke-width="2.6" fill="none" stroke-linecap="round"/>
          <path d="m72 68 5-5q3-3 6-2l5 3q3 2 1 4l-3 2q5-2 6 1 2 3-2 5l-6 4q-4 1-7-2Z" fill="#516966"/>
          <path d="m78 65 4 3 4-1m-6 6 5 3m-7-1 4 3" stroke="#90a093" stroke-width="1.35" fill="none"/>`}
        </g>
      </g>`;
    }

    function radioactive() {
      return `<defs>${halo('rx-aura','#b4f967')}
        <linearGradient id="rx-suit" x2=".92" y2=".65"><stop stop-color="#ffe29a"/><stop offset=".51" stop-color="#e4b963"/><stop offset=".54" stop-color="#ce9c58"/><stop offset="1" stop-color="#b9814a"/></linearGradient>
        <linearGradient id="rx-visor" x2=".8" y2="1"><stop stop-color="#b1c9bd"/><stop offset=".55" stop-color="#81999d"/><stop offset="1" stop-color="#5b707a"/></linearGradient>
        <linearGradient id="rx-metal"><stop stop-color="var(--studio-shadow)"/><stop offset=".4" stop-color="var(--studio-metal)"/><stop offset="1" stop-color="var(--studio-shadow)"/></linearGradient>
        <clipPath id="rx-window"><rect x="201" y="240" width="111" height="122" rx="40"/></clipPath>
      </defs>
      ${plate('land',`<path d="M0 807 398 787 1160 806 1600 771v229H0Z" fill="var(--studio-ground)"/><path d="m0 904 381-70m839-8 380 41" fill="none" stroke="var(--studio-metal)" opacity=".3" stroke-width="3"/>`)}
      ${plate('left',`<g fill="none" stroke="var(--studio-metal)" opacity=".48" stroke-width="7"><path d="M-8 197h85q17 0 17 17v43M0 211h62q15 0 15 17v21"/></g>
        <g transform="translate(0 52) scale(.93)"><rect x="14" y="450" width="361" height="15" rx="4" fill="var(--studio-metal)"/><path d="M22 465h344v14H22Z" fill="var(--studio-shadow)"/>
        <g transform="translate(75 247) scale(1.13)">${technician(false)}</g>
        <g transform="translate(313 275) scale(-.96 .96)">${technician(true)}</g>
        <g class="rx-carry"><g class="rx-tray-ride"><g class="rx-sample" transform="translate(210.315 319.195) rotate(-11)"><circle class="rx-glow" r="32" fill="url(#rx-aura)" stroke="none"/><rect x="-7" y="-10" width="15" height="22" rx="5" fill="#b9f875" stroke="#deff99"/><path d="M-3-6v11" stroke="#f5ffce"/></g></g></g></g>`)}
      ${plate('right',`<path d="M112 444V234q0-26 28-26h63m94-46V99q0-12 17-12h106" fill="none" stroke="var(--studio-shadow)" stroke-width="16"/><path d="M113 342V234q0-24 28-24h61m96-58v-53q0-9 13-9h109" fill="none" stroke="var(--studio-metal)" stroke-width="5"/>
        <g transform="translate(74 370) scale(.88)"><rect width="40" height="78" rx="9" fill="var(--studio-shadow)"/><rect x="6" y="9" width="28" height="22" rx="3" fill="#8baf87"/><path d="m11 26 5-8 4 4 8-7" fill="none" stroke="#d6f7ab" stroke-width="2"/><path d="M9 43h23m-23 6h23" stroke="#839785" stroke-width="2"/></g>
        <path d="M162 389V235q0-53 80-67h32q72 16 72 66v155Z" fill="url(#rx-metal)" stroke="var(--studio-edge)" stroke-width="3"/>
        <ellipse cx="254" cy="174" rx="49" ry="10" fill="var(--studio-metal)"/><path d="M219 172v-17q32-14 68 0v17Z" fill="var(--studio-shadow)"/>
        <rect x="193" y="228" width="126" height="143" rx="45" fill="var(--studio-edge)"/><rect x="201" y="240" width="111" height="122" rx="40" fill="#304f49"/>
        <g clip-path="url(#rx-window)"><circle class="rx-glow" cx="257" cy="313" r="73" fill="url(#rx-aura)"/>
        <g fill="#b5db83">${[0,1,2,3,4].map((n)=>`<rect x="${222+n*14}" y="${275+n%2*8}" width="6" height="77" rx="3"/>`).join('')}</g>
        <path class="rx-rings" d="M207 312q48-29 98 0t-98 0m6 12q42 13 84-1" fill="none" stroke="#cbff85" stroke-width="2.4"/>
        <path d="m212 284 24-34h11l-37 53Z" fill="#e4fbdc" opacity=".27"/></g>
        <path d="M147 389h211v12H147Zm15 17h183v42H162Z" fill="var(--studio-shadow)"/><path d="M146 386v-32m53 32v-32m121 32v-32m41 32v-32m-218 6h220" fill="none" stroke="#c39b59" stroke-width="3"/>
        <circle cx="374" cy="290" r="21" fill="#b7bb9c" stroke="var(--studio-shadow)" stroke-width="5"/><path class="rx-needle" d="m374 291 9-11" stroke="#855645" stroke-width="3"/>
        <g fill="var(--studio-metal)">${repeat(9,i=>`<circle cx="${173+i*20}" cy="419" r="2"/>`)}</g>
        <g transform="translate(252 423)"><rect x="-20" y="-14" width="40" height="28" rx="4" fill="#d6b66f"/><g fill="#40544c"><circle r="2.5"/><path id="rx-mark" d="M-2-4-5-10a11 11 0 0 1 10 0L2-4Z"/><use href="#rx-mark" transform="rotate(120)"/><use href="#rx-mark" transform="rotate(240)"/></g></g>
        <path d="M127 456h260" stroke="var(--studio-shadow)" stroke-width="6" stroke-linecap="round"/>`)}`;
    }

    function building(x,y,w,h,color,rows,columns) {
      return `<g transform="translate(${x} ${y})"><path d="M0 0 ${w*.76} -8 ${w} 0V${h}H0Z" fill="${color}"/><path d="m${w*.76} -8 ${w*.24} 8v${h}h-${w*.24}Z" fill="#27374b" opacity=".33"/>
        ${repeat(rows,r=>repeat(columns,c=>`<rect x="${5+c*(w*.67/columns)}" y="${8+r*(h-18)/rows}" width="${w*.38/columns}" height="${Math.min(10,h/rows*.42)}" fill="${(r+2*c)%4?'var(--city-glass)':'#f8c995'}" opacity="${(r+2*c)%4?.68:.93}"/>`))}</g>`;
    }
    function city() {
      return `<defs><linearGradient id="ct-spire"><stop stop-color="#cbac92"/><stop offset=".5" stop-color="#e6c5aa"/><stop offset=".52" stop-color="#a88883"/><stop offset="1" stop-color="#806a80"/></linearGradient>
        <clipPath id="ct-route"><rect y="348" width="376" height="61"/></clipPath></defs>
        ${plate('land',`<path d="M0 741Q386 715 756 750t844-21v271H0Z" fill="var(--studio-ground)"/>
        <g fill="none" stroke="var(--city-glass)" stroke-width="3" opacity=".46"><path class="ct-water" d="M12 893h149m48 17h77m744-40h93m108 30h140m75-14h98"/></g>`)}
        ${plate('left',`<circle cx="116" cy="158" r="49" fill="#edb091" opacity=".7"/>
          ${building(4,253,65,160,'var(--city-far)',7,3)}${building(197,265,61,150,'var(--city-far)',7,3)}
          ${building(67,236,102,178,'var(--city-stone)',9,5)}
          <path d="M75 233v-24h9v-22h11v-21l18-30 19 30v21h10v22h12v24Z" fill="url(#ct-spire)"/><path d="M113 141v-32m-27 102 27-27 27 26m-45-26 18-21 18 20" fill="none" stroke="var(--city-stone)" stroke-width="3"/>
          ${building(158,311,65,105,'var(--city-brick)',4,4)}<g transform="translate(173 279)"><path d="M1 28V6h29v22l-4 3H5Z" fill="#886e73"/><path d="m-3 7 18-11 19 11Z" fill="var(--studio-shadow)"/><path d="M5 30 2 40m24-10 3 10M3 35h26" fill="none" stroke="var(--studio-shadow)" stroke-width="2.5"/></g>
          <path d="M-5 405h437v18H-5Zm0 18h21q47-1 59 64h14q8-63 63-64h12q48 3 56 64h15q12-63 61-64h13q58 2 66 64h14q8-61 35-64v-8H0Z" fill="var(--studio-shadow)"/>
          <g clip-path="url(#ct-route)"><g class="ct-train">
            ${repeat(2,i=>`<g transform="translate(${i*77} 376)"><path d="M1 25V10Q1 1 12 1h51q8 0 11 11v13Z" fill="#d98974" stroke="#684b5a" stroke-width="1.6"/><rect x="6" y="7" width="60" height="10" rx="3" fill="#405e74"/><path d="M17 7v10m12-10v10m12-10v10m12-10v10" stroke="#a9bac0" stroke-width="2"/><path d="M5 20h64" stroke="#ffd2a3"/><path d="M11 26h53" stroke="#344755" stroke-width="4"/></g>`)}
          </g></g><path d="M0 404h380" stroke="#d7aa8f" stroke-width="3"/>
          <path d="M348 409v-19q0-29 27-30l24 9 16 35v40l-26 28-28-5v-59h15v-18q0-12-8-14-11 4-11 17v16Z" fill="var(--studio-shadow)"/>
          <path d="M350 393q0-24 19-28l16 3m-25 51h17m-14 7h8" stroke="var(--city-stone)" stroke-width="2.5" fill="none"/>
          <path d="M0 475q60-1 92 5t77 2l-7 7q-49 0-74-5T0 482Zm321 4 44-15 28 1 24-13v31l-94 6Z" fill="var(--city-far)" opacity=".65"/>`)}
        ${plate('right',`${building(133,244,83,202,'var(--city-far)',9,4)}${building(248,195,97,248,'var(--city-stone)',11,4)}
          <path d="m249 192 55-52 40 39v15l-40-22-55 30Z" fill="url(#ct-spire)"/><path d="M304 145v-22" stroke="var(--city-stone)" stroke-width="3"/>
          ${building(206,343,125,113,'var(--city-brick)',4,5)}${building(345,302,74,149,'var(--studio-shadow)',6,3)}
          <path d="M103 438q28-63 58-2m-65 12q35-89 73-2" fill="none" stroke="var(--city-stone)" stroke-width="4"/>
          <path d="M76 459q171-10 348-6v11q-187-4-348 8Z" fill="var(--studio-shadow)"/>
          <g stroke="var(--city-stone)" stroke-width="3"><path d="M115 451v-21q5-8 14-6m154 25v-31q4-9 15-7m84 38v-32q4-9 15-7" fill="none"/></g>
          <path d="M124 426h12m155-13h13m85 0h14" stroke="#ffd4a0" stroke-width="3"/>`)}`;
    }
    function magical() {
      return `<defs>${halo('mg-halo','#e9bd82')}<linearGradient id="mg-gold" x2=".9" y2="1"><stop stop-color="#ffe3a8"/><stop offset=".45" stop-color="#d6a86b"/><stop offset="1" stop-color="#927550"/></linearGradient>
        <linearGradient id="mg-gem" x2="1" y2="1"><stop stop-color="#b4e0cb"/><stop offset=".5" stop-color="#6eaba6"/><stop offset="1" stop-color="#52758e"/></linearGradient></defs>
        ${plate('land',`<path d="M0 804q186-69 386-17t386 46q231-55 422-44t406-47v258H0Z" fill="var(--studio-ground)"/>`)}
        ${plate('left',`<path d="M3 467V203q12-94 137-128q118 26 137 128v264" fill="var(--mg-niche)"/><path d="M13 451V207q12-87 127-119q112 26 127 119v244" fill="none" stroke="var(--mg-line)" stroke-width="2"/>
          <g transform="translate(147 271)"><circle r="108" fill="url(#mg-halo)" opacity=".55"/>
            <path d="M-78 26Q-46 95 34 72Q74 56 80 15M3 75v52m-39 8q35-20 71 0" fill="none" stroke="url(#mg-gold)" stroke-width="8"/>
            <ellipse rx="83" ry="30" transform="rotate(-35)" fill="none" stroke="var(--mg-line)" stroke-width="4"/>
            <g class="mg-orbit"><circle r="65" fill="none" stroke="url(#mg-gold)" stroke-width="3"/>
            ${repeat(18,i=>`<path d="M0-64v${i%3?4:8}" transform="rotate(${20*i})" stroke="#d3ad79" stroke-width="2"/>`)}
            <circle cx="65" r="10" fill="url(#mg-gem)" stroke="#d0ae81" stroke-width="2"/><circle cx="-65" r="5" fill="#d79790"/></g>
            <g class="mg-moon"><path d="M13-32Q-6-17 1 3Q8 23 30 22Q15 41-9 30Q-33 17-28-7Q-22-29 13-32Z" fill="url(#mg-gold)"/></g>
            <ellipse rx="86" ry="22" transform="rotate(22)" stroke="url(#mg-gold)" stroke-width="2.6" fill="none"/>
          </g>
          <path d="m13 423 121-12 92 13 54 12-123 15-144-16Z" fill="var(--mg-cover)"/><path d="m19 419 114-13 27 12 21-5 88 17-111 13-138-13Z" fill="#d8bc92"/>
          <path d="m26 416 99-14q23 0 35 13 13-10 26-8l76 19-101 11Z" fill="#ead6af"/>
          <path d="m40 417 75-8m-57 12 55-6m66 5 54 7" stroke="#be9d78" stroke-width="2"/><path d="m172 437 19-3 7 22-8-4-6 6Z" fill="#ac6a75"/>
          <g fill="#e4c791" transform="translate(67 183)">${star}</g><g fill="#e4c791" transform="translate(228 212) scale(.55)">${star}</g>`)}
        ${plate('right',`<path d="M143 449V322h18v-36l17-18 18 20v34h25v-82l32-47 33 46v81h20v-48l18-27 19 28v49h30v-72l20-26 22 28v192Z" fill="var(--mg-niche)"/>
          <path d="m214 242 40-62 38 61-35-11Zm89 29 21-33 23 33-22-7Z" fill="var(--mg-cover)"/><path d="M240 319v-31q9-20 18 0v31Zm77 8v-24q6-14 13 0v24Z" fill="#e7c18e"/>
          <path d="M164 352v-18l5-6 5 6v18Zm19-2v-16l4-6 4 6v16Zm55-13h24v7h-24Zm73 5h24v5h-24Z" fill="var(--mg-line)"/>
          <path d="M227 249v73m51-75v72m-36-18h15m-7-18v36m68-5h12" fill="none" stroke="var(--mg-line)" stroke-width="2"/>
          <path d="M208 416v-46h7v-7h7v7h11v-7h8v7h7v45h-12v-18q-8-16-16 0v18Z" fill="var(--mg-cover)"/>
          <path d="M142 455q91-60 181-38t104-2v44Z" fill="var(--mg-cover)"/>
          <g transform="translate(262 179)"><g class="mg-familiar">
            <path d="M-2 6Q-36-25-69-21l13 17-9-1 21 16-8 1q20 14 49 10Z" fill="#b89eb7"/>
            <path d="M-1 5Q25-31 64-38L54-20l9-4-16 17 8-2Q38 11 10 20Z" fill="#ceb3bf"/>
            <path d="m-49-12 34 24m65-36L16 6" stroke="#e4c7ae" stroke-width="2.5"/>
            <path d="M-15-9-5-6 7-12l13-2-2 13q5 14-1 27L5 40l-18-14q-11-18-2-28Z" fill="var(--mg-cover)" stroke="#ccb397" stroke-width="1.6"/>
            <path d="M-13 1q9-7 15 0 6-8 13-6-2 17-13 20Q-8 13-13 1Z" fill="#e9cfa7"/><path d="m-8 2 6 2m8-3 5-3" stroke="#654f68" stroke-width="2.6"/><path d="m-1 7 6-1-2 7Z" fill="#b28664"/>
          </g></g><g class="mg-trail" fill="none" stroke="#c8a476" stroke-width="2" stroke-dasharray="2 10"><path d="M175 211Q237 178 199 154T238 123"/></g>`)}`;
    }
    return {radioactive,city,magical};
  });
})();
