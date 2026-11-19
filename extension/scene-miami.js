// Original Miami coast artwork, drawn locally and mounted only for this theme.
(() => {
  'use strict';
  (globalThis.SearchscapeScenePacks ??= []).push(({path,circle,rect,group,line}) => {
    const pink='var(--miami-pink)',cyan='var(--miami-cyan)',peach='var(--miami-peach)';
    const ink='var(--miami-ink)',stone='var(--miami-stone)',palmColor='var(--miami-palm)';
    const placed=(x,y,body,extra='')=>`<g transform="translate(${x} ${y})" ${extra}>${body}</g>`;
    const label=(x,y,text,size=12,extra='')=>`<text x="${x}" y="${y}" fill="${peach}" font-family="'GR Outfit',Arial,sans-serif" font-size="${size}" ${extra}>${text}</text>`;
    const number=value=>Math.round(value*10)/10;

    function frond(endX,endY,bendX,bendY) {
      const point=t=>[2*(1-t)*t*bendX+t*t*endX,2*(1-t)*t*bendY+t*t*endY];
      const leaves=[];
      for(let i=1;i<=9;i++){
        const t=i/11,[x,y]=point(t),[nextX,nextY]=point(t+.03);
        const dx=nextX-x,dy=nextY-y,length=Math.hypot(dx,dy);
        const reach=28*(1-t)+8;
        for(const side of [-1,1]){
          const tipX=x+dx*.8-side*dy/length*reach,tipY=y+dy*.8+side*dx/length*reach;
          leaves.push(`M${number(x)} ${number(y)}Q${number(tipX-dx*.4)} ${number(tipY-dy*.4)} ${number(tipX)} ${number(tipY)}L${number(nextX)} ${number(nextY)}Z`);
        }
      }
      return path(leaves.join(' '),palmColor)+line(`M0 0Q${bendX} ${bendY} ${endX} ${endY}`,palmColor,2.5,.95);
    }

    function palm(x,y,scale,flip,phase) {
      const crown=[[-140,15,-70,-50],[-117,-53,-43,-83],[-52,-101,-3,-80],[53,-92,13,-90],[143,-35,87,-73],[138,34,91,-7],[57,83,77,39]];
      return placed(x,y,`<g transform="scale(${scale*flip} ${scale})">`+
        path('M-10 0C-32-77 0-195 47-272L57-270C23-172-8-72 8 0Z','url(#miami-trunk)')+
        line('M-6-30 5-26M-9-58 2-54M-7-87 3-84M-1-116 9-112M8-145 18-141M19-174 29-170M31-203 40-200',peach,1.5,.3)+
        placed(52,-272,group('miami-fronds',crown.map(args=>frond(...args)).join('')+
          circle(0,0,7,palmColor)+circle(2,8,4,ink)+circle(-5,6,3.5,ink),`style="--miami-phase:${phase}s"`))+'</g>');
    }

    function tower(x,width,height,index) {
      const top=738-height;
      const windows=[];
      for(let row=0;row<Math.floor((height-20)/22);row++){
        for(let column=0;column<Math.floor((width-12)/14);column++){
          if((row*7+column*3+index)%5===0)continue;
          windows.push(rect(x+8+column*14,top+15+row*22,4,7,(row+column)%3?peach:cyan,`opacity="${.25+(row+column)%4*.15}"`));
        }
      }
      return rect(x,top,width,height,ink,`rx="2" opacity="${.65+index%3*.1}"`)+
        rect(x+width-5,top,5,height,pink,'opacity=".16"')+
        line(`M${x} ${top}H${x+width}M${x+width/2} ${top}v-14`,cyan,1.2,.55)+
        group('miami-window-lights',windows.join(''),`style="--miami-phase:-${index*2.3}s"`);
    }

    const car=(color)=>path('M0 10 10 6 21 0H49L60 7 72 10 75 19H-2Z',color)+
      path('M24 2H46L53 7H16Z',ink)+line('M8 11H65',peach,1,.6)+
      circle(15,19,5,ink)+circle(59,19,5,ink)+circle(15,19,2,cyan)+circle(59,19,2,cyan)+
      rect(69,11,7,3,peach)+rect(-3,12,5,3,pink);

    return {miami:()=>`<defs>
      <radialGradient id="miami-sunset"><stop stop-color="${pink}" stop-opacity=".38"/><stop offset=".45" stop-color="${pink}" stop-opacity=".13"/><stop offset="1" stop-color="${pink}" stop-opacity="0"/></radialGradient>
      <linearGradient id="miami-sun" x2="0" y2="1"><stop stop-color="#ffe5a9"/><stop offset=".46" stop-color="#ffac99"/><stop offset="1" stop-color="#ed6da8"/></linearGradient>
      <linearGradient id="miami-sea" x2="0" y2="1"><stop stop-color="${cyan}" stop-opacity=".15"/><stop offset=".35" stop-color="${cyan}" stop-opacity=".035"/><stop offset="1" stop-color="${pink}" stop-opacity=".1"/></linearGradient>
      <linearGradient id="miami-facade" x2="1" y2=".3"><stop stop-color="${stone}"/><stop offset=".7" stop-color="${stone}"/><stop offset="1" stop-color="${pink}" stop-opacity=".36"/></linearGradient>
      <linearGradient id="miami-trunk"><stop stop-color="${ink}"/><stop offset=".65" stop-color="${palmColor}"/><stop offset="1" stop-color="${peach}" stop-opacity=".55"/></linearGradient>
      <linearGradient id="miami-road" x2="0" y2="1"><stop stop-color="${ink}"/><stop offset="1" stop-color="${pink}" stop-opacity=".12"/></linearGradient>
      <linearGradient id="miami-reflection" x2="0" y2="1"><stop stop-color="#ffb3a0" stop-opacity=".6"/><stop offset="1" stop-color="${pink}" stop-opacity="0"/></linearGradient>
      <mask id="miami-sun-slats"><rect width="1600" height="1000" fill="white"/>${[344,358,375,395,418,444].map((y,i)=>rect(1235,y,320,4+i*1.6,'black')).join('')}</mask>
    </defs>`+
      circle(1400,340,400,'url(#miami-sunset)')+circle(78,710,330,'url(#miami-sunset)')+
      group('miami-sun',circle(1400,337,119,'url(#miami-sun)','mask="url(#miami-sun-slats)"'))+
      group('miami-clouds',
        path('M1180 262Q1235 249 1290 258T1390 259Q1490 244 1592 253Q1510 262 1440 267Q1320 275 1180 262Z',pink,'opacity=".13"')+
        line('M1256 215Q1340 207 1430 216M100 323Q179 308 267 324',peach,2,.2))+
      // Distant bayfront towers have individually lit windows and rooftop antennas.
      group('miami-skyline',
        [[-20,55,88],[45,48,152],[103,62,119],[176,55,186],[240,53,95],[1280,54,108],[1342,58,170],[1412,44,231],[1467,66,146],[1541,74,201]].map(([x,w,h],i)=>tower(x,w,h,i)).join('')+
        line('M1434 494v-32M1425 482h18',pink,1.5,.65))+
      rect(0,740,1600,260,'url(#miami-sea)')+line('M0 740H1600',cyan,1,.25)+
      group('miami-sun-reflections',Array.from({length:15},(_,i)=>{
        const y=756+i*14,width=45+i*9;
        return rect(1400-width/2+(i%3-1)*13,y,width,2+i*.3,'url(#miami-reflection)',`rx="2" opacity="${.85-i*.045}"`);
      }).join(''))+
      group('miami-ripples',Array.from({length:22},(_,i)=>{
        const side=i%2,x=side?1250+(i*41%340):-50+(i*59%365),y=765+(i*23%220);
        return line(`M${x} ${y}q18-3 ${28+i%4*11} 0`,i%3?cyan:pink,1,.22,`class="miami-ripple" style="--miami-phase:-${i*.87}s"`);
      }).join(''))+
      // Streamlined Art Deco hotel, with portholes, balcony rails and a vertical marquee.
      group('miami-hotel',
        rect(5,477,230,299,'url(#miami-facade)','rx="7"')+
        path('M5 497V472Q5 453 25 453H210Q231 453 231 472V497Z',stone)+
        line('M13 466H220M13 473H220M13 481H220',pink,2,.7)+
        rect(32,505,140,226,ink,'opacity=".8"')+
        [528,582,636].map(y=>rect(36,y,132,29,cyan,'opacity=".14"')+
          line(`M39 ${y+27}H168M43 ${y+20}H162`,peach,1,.65)+
          [48,76,104,132,160].map(x=>line(`M${x} ${y+19}v10`,cyan,1,.45)).join('')).join('')+
        [524,567,610,653].map(y=>circle(203,y,10,ink,`stroke="${pink}" stroke-width="2" stroke-opacity=".65"`)+circle(203,y,5,cyan,'opacity=".18"')).join('')+
        rect(22,691,156,10,pink,'opacity=".7"')+rect(22,707,156,5,cyan,'opacity=".65"')+
        rect(59,718,39,58,ink,'rx="18"')+rect(109,718,39,58,ink,'rx="18"')+
        line('M79 726V772M129 726V772',peach,1,.3)+
        placed(209,438,group('miami-marquee',rect(0,0,36,188,ink,'rx="16" stroke="var(--miami-pink)" stroke-width="2"')+
          ['O','C','E','A','N'].map((letter,i)=>label(18,29+i*29,letter,17,'text-anchor="middle" fill="var(--miami-cyan)"')).join('')))+
        label(39,456,'THE PALMS',12,'letter-spacing="3" fill="var(--miami-ink)"')+
        line('M0 777H261',pink,3,.65))+
      // Coastal highway and its thin neon edge sit below the main reading area.
      path('M0 887Q150 850 332 891L434 1000H0Z','url(#miami-road)')+
      line('M0 885Q150 847 332 889',pink,2,.55)+
      line('M0 899Q150 863 340 903',cyan,1,.3)+
      path('M0 948Q180 909 370 946','none',`stroke="${peach}" stroke-width="2" stroke-dasharray="18 23" opacity=".4"`)+
      placed(0,909,group('miami-car miami-car-a',car(pink)))+
      placed(0,947,group('miami-car miami-car-b',car(cyan)))+
      // A marina launch and animated wake move together across the bay.
      placed(1295,842,group('miami-boat',
        path('M-55 26Q-5 23 54 29M-83 32Q-8 30 67 36','none',`stroke="${cyan}" stroke-width="1" opacity=".3"`)+
        path('M-43 5 2 1 43 8 26 23H-25Z',peach)+path('M-31 5-14-9H11L25 6Z',ink)+
        path('M-16-6H9L17 3H-24Z',cyan,'opacity=".65"')+
        line('M-36 12H35',pink,3,.9)+line('M-39 26H30',cyan,1,.55)))+
      // Beach cabana and flamingos add small discoveries at the shoreline.
      path('M1353 1000Q1450 914 1600 905V1000Z',peach,'opacity=".1"')+
      placed(1510,941,
        line('M-36 11V-64M28 11V-64M-36-43H28M-29-48V-20M-15-48V-20M0-48V-20M15-48V-20',stone,3,.75)+
        rect(-40,-71,72,22,pink,'rx="2" opacity=".85"')+
        path('M-50-73-18-98H13L44-73Z',cyan,'opacity=".7"')+
        line('M-13-72v-23M-31 10H25M-28-9H25',peach,2,.7))+
      [[1377,963,.8],[1403,978,.6]].map(([x,y,s])=>placed(x,y,`<g transform="scale(${s})">`+
        group('miami-flamingo',path('M-8-17Q6-27 15-20Q18-13 8-11H-3Z',pink)+
          line('M7-20Q-8-37 5-43Q15-44 11-34',pink,3,.9)+
          line('M-1-12V10M6-12 11 9M10-34l7 2',pink,1.6,.9))+'</g>')).join('')+
      palm(75,1005,1.48,1,-2)+palm(1580,1030,1.75,-1,-7)+
      // Slow distant flight and navigation lights, kept above the search controls.
      group('miami-flight',path('M0 0 16-3 30-13 36-12 28-2 49 1 50 4 27 6 18 16 13 16 15 6 2 6Z',peach,'opacity=".6"')+
        circle(37,2,1.4,pink,'class="miami-navigation-light"'))+
      label(22,838,'O C E A N   D R I V E',9,'opacity=".65"')+
      label(1455,712,'MIAMI',10,'letter-spacing="4" opacity=".55"')
    };
  });
})();
