(()=>{
  const galleryOrder=[
    'Smashed Cucumbers','Forbidden Popcorn Chicken','Pork & Chive Dumplings','Crispy Spring Rolls','Scallion Pancake','Five-Spice Wings','Shrimp Toast','Seasonal Bao Buns (2)',
    'Dragon Fire Noodles','Empress’ Comfort','Silken Path (Vegan)','Golden Chill Udon','Imperial Hot & Sour','Lotus Root & Pork','Spicy Wonton Soup','Tofu Seaweed Soup',
    'Char Siu Bowl','Mapo Tofu Bowl','Dragon Beef Bowl','Golden Veggie Bowl','Imperial Garlic Prawns','Chili Crab Claws','Ginger-Scallion Steamed Fish','Golden Seafood Fried Rice',
    'Moonlight Fried Rice','Charred Seasonal Greens','Silken Path (Vegan)','Forbidden Popcorn Chicken','Kids’ Fried Rice Cup','Panda Dessert','Family Feast','Sweet Sin',
    'Jade Pillows','Red Moon Ice Cream','Wolfberry Chrysanthemum Tea','Jade Matcha Latte','Lychee Sparkler','Mandarin Blossom Cold Brew','Seafood Boil for Two','Peking Duck Celebration',
    'Lobster Ginger Hot Pot','Black Pepper Wagyu Clay Pot','Crispy Whole Sea Bass Feast','Peking Duck Celebration','Pork & Chive Dumplings','Silken Path (Vegan)','Wolfberry Chrysanthemum Tea','Red Moon Ice Cream'
  ];
  const columnCuts=[[0,177],[183,362],[367,549],[553,726]];
  const rowCuts=[[0,162],[165,329],[332,494],[497,662],[666,830],[833,1003],[1006,1178],[1181,1370],[1373,1550],[1554,1738],[1741,1928],[1931,2167]];
  const image=new Image();image.src='/assets/forbidden_bite/menu.png?v=picture-gallery-5';
  const menuPromise=fetch('/assets/forbidden_bite/menu.json').then(r=>{if(!r.ok)throw Error('Menu unavailable');return r.json()});
  const menuIndexName={'Mini Noodles':'Mini Noodle Bowl'};
  const drawDish=(canvas,index)=>{
    const ctx=canvas.getContext('2d'),col=index%4,row=Math.floor(index/4);
    const sx=image.naturalWidth/726,sy=image.naturalHeight/2167;
    ctx.imageSmoothingEnabled=true;ctx.imageSmoothingQuality='high';ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.drawImage(image,columnCuts[col][0]*sx,rowCuts[row][0]*sy,(columnCuts[col][1]-columnCuts[col][0])*sx,(rowCuts[row][1]-rowCuts[row][0])*sy,0,0,canvas.width,canvas.height);
  };
  const pickButton=document.getElementById('mystery-pick');
  const mysteryAdd=document.getElementById('mystery-add');
  let currentMystery=null;
  if(pickButton){
    Promise.all([menuPromise,image.decode()]).then(([menu])=>{
      const dishes=menu.sections.flatMap(section=>section.items);
      const pictured=galleryOrder.map((name,index)=>({dish:dishes.find(item=>item.name===(menuIndexName[name]||name)),index})).filter(entry=>entry.dish);
      pickButton.addEventListener('click',()=>{
        if(!pictured.length)return;
        currentMystery=pictured[Math.floor(Math.random()*pictured.length)];
        document.getElementById('mystery-name').textContent=currentMystery.dish.name;
        document.getElementById('mystery-description').textContent=currentMystery.dish.description;
        document.getElementById('mystery-price').textContent=`$${currentMystery.dish.price}`;
        const canvas=document.getElementById('mystery-photo');drawDish(canvas,currentMystery.index);canvas.setAttribute('aria-label',currentMystery.dish.name);
        mysteryAdd.dataset.orderItem=JSON.stringify({name:currentMystery.dish.name,price:currentMystery.dish.price});mysteryAdd.disabled=false;
      });
    }).catch(()=>{pickButton.disabled=true;pickButton.textContent='Dish picker unavailable';});
  }
  const fortunes=[
    'A brave noodle choice may lead to a very good day.','Your next great idea arrives between bites.','A small dumpling can bring a big smile.','Good fortune favors the one who shares the last spring roll.','A warm bowl will make a chilly day feel shorter.','The secret ingredient is inviting someone to join you.','Today is a good day to try something new.','Your future looks crisp, golden, and delicious.'
  ];
  const fortuneButton=document.getElementById('fortune-open');
  if(fortuneButton)fortuneButton.addEventListener('click',()=>{document.getElementById('fortune-message').textContent=fortunes[Math.floor(Math.random()*fortunes.length)];fortuneButton.textContent='Open another fortune'});
  const soupForm=document.getElementById('soup-builder-form');
  if(soupForm){
    const extras=[...soupForm.querySelectorAll('input[name="extra"]')];
    const updateSoup=()=>{
      const base=soupForm.elements.base.value,proteins=[...soupForm.querySelectorAll('input[name="protein"]:checked')].map(input=>input.value),spice=soupForm.elements.spice.value,selectedExtras=extras.filter(input=>input.checked).map(input=>input.value);
      const total=13.5+selectedExtras.length*.5;
      document.getElementById('soup-preview').textContent=`Your custom bowl: ${base} · ${proteins.length?proteins.join(' & '):'Choose up to two proteins'} · ${spice} spice${selectedExtras.length?` · Extra: ${selectedExtras.join(', ')}`:''}`;
      document.getElementById('soup-total').textContent=`$${total.toFixed(2)}`;
      return {base,proteins,spice,selectedExtras,total};
    };
    soupForm.addEventListener('change',event=>{
      if(event.target.name==='protein'){
        const selectedProteins=[...soupForm.querySelectorAll('input[name="protein"]:checked')];
        if(selectedProteins.length>2){event.target.checked=false;document.getElementById('soup-error').textContent='Choose up to two meats or proteins.';document.getElementById('soup-error').hidden=false;setTimeout(()=>{document.getElementById('soup-error').hidden=true},2400)}
      }
      updateSoup();
    });
    soupForm.addEventListener('submit',event=>{
      event.preventDefault();const bowl=updateSoup();
      if(!bowl.proteins.length){document.getElementById('soup-error').textContent='Please choose at least one meat or protein.';document.getElementById('soup-error').hidden=false;return}
      document.getElementById('soup-error').hidden=true;
      const choices=[bowl.proteins.join(' & '),`${bowl.spice} spice`,...bowl.selectedExtras.map(extra=>`extra ${extra}`)].join(', ');
      const button=soupForm.querySelector('button[type="submit"]');button.dataset.orderItem=JSON.stringify({name:`Custom soup noodles — ${bowl.base}; ${choices}`,price:bowl.total});button.type='button';button.click();button.type='submit';
    });
    updateSoup();
  }
  document.querySelectorAll('.custom-builder-form').forEach(form=>{
    const add=form.querySelector('[data-builder-add]'),priceOutput=add.querySelector('[data-builder-price]'),preview=form.querySelector('.custom-builder-preview'),buttonLabel=add.firstChild.textContent.replace(/[·\s]+$/,'');
    const update=()=>{
      const selects=[...form.querySelectorAll('select')],chosenOptions=selects.map(select=>({name:select.selectedOptions[0].textContent.replace(/\s*·\s*\$\d+(?:\.\d{1,2})?.*$/,''),price:Number(select.selectedOptions[0].dataset.price||0)})),checked=[...form.querySelectorAll('input[type="checkbox"]:checked')],extras=checked.map(input=>({name:input.value,price:Number(input.dataset.price||0)})),items=[...chosenOptions,...extras],total=Math.round((Number(form.dataset.basePrice||0)+items.reduce((sum,item)=>sum+item.price,0))*100)/100;
      priceOutput.textContent=`$${total.toFixed(2)}`;preview.textContent=items.map(item=>item.name).join(' · ');add.firstChild.textContent=`${buttonLabel} · `;
      return {items,total};
    };
    form.addEventListener('change',update);form.addEventListener('input',update);
    add.addEventListener('click',()=>{const {items,total}=update();add.dataset.orderItem=JSON.stringify({name:`${form.dataset.builderName} — ${items.map(item=>item.name).join('; ')}`,price:total})});
    update();
  });
  (function setupDishPassport(){
    const storageKey='forbidden-bite-dish-passport-v1',buttons=[...document.querySelectorAll('[data-passport-dish]')],status=document.getElementById('passport-progress'),reset=document.getElementById('passport-reset');
    if(!buttons.length)return;
    const read=()=>{try{return new Set(JSON.parse(localStorage.getItem(storageKey)||'[]'))}catch{return new Set()}};
    let stamps=read();
    const render=()=>{
      buttons.forEach(button=>{const earned=stamps.has(button.dataset.passportDish);button.dataset.stamped=String(earned);button.disabled=earned;button.setAttribute('aria-label',`${button.dataset.passportDish}${earned?' · stamp collected':' · collect stamp'}`)});
      status.textContent=stamps.size===buttons.length?'Passport complete · all 8 dish stamps collected!':`${stamps.size} of ${buttons.length} dish stamps collected`;
    };
    buttons.forEach(button=>button.addEventListener('click',()=>{stamps.add(button.dataset.passportDish);try{localStorage.setItem(storageKey,JSON.stringify([...stamps]))}catch{}render()}));
    reset.addEventListener('click',()=>{stamps.clear();try{localStorage.removeItem(storageKey)}catch{}render()});
    render();
  })();
  (function setupKitchenSoundboard(){
    const buttons=[...document.querySelectorAll('[data-kitchen-sound]')],status=document.getElementById('sound-status');
    if(!buttons.length)return;
    let context=null;
    const getContext=()=>{const AudioContextType=window.AudioContext||window.webkitAudioContext;if(!AudioContextType)throw Error('Audio is not supported in this browser.');context??=new AudioContextType();if(context.state==='suspended')context.resume();return context};
    const noise=(duration,{filterType='bandpass',frequency=1800,endFrequency=frequency,volume=.12}={})=>{
      const audio=getContext(),length=Math.floor(audio.sampleRate*duration),buffer=audio.createBuffer(1,length,audio.sampleRate),data=buffer.getChannelData(0);
      for(let i=0;i<length;i++)data[i]=Math.random()*2-1;
      const source=audio.createBufferSource(),filter=audio.createBiquadFilter(),gain=audio.createGain(),now=audio.currentTime;
      source.buffer=buffer;filter.type=filterType;filter.frequency.setValueAtTime(frequency,now);filter.frequency.linearRampToValueAtTime(endFrequency,now+duration);gain.gain.setValueAtTime(.0001,now);gain.gain.exponentialRampToValueAtTime(volume,now+.04);gain.gain.exponentialRampToValueAtTime(.0001,now+duration);source.connect(filter);filter.connect(gain);gain.connect(audio.destination);source.start(now);source.stop(now+duration);
    };
    const bell=(frequency,start,duration,volume)=>{
      const audio=getContext(),oscillator=audio.createOscillator(),gain=audio.createGain(),now=audio.currentTime+start;
      oscillator.type='sine';oscillator.frequency.value=frequency;gain.gain.setValueAtTime(.0001,now);gain.gain.exponentialRampToValueAtTime(volume,now+.012);gain.gain.exponentialRampToValueAtTime(.0001,now+duration);oscillator.connect(gain);gain.connect(audio.destination);oscillator.start(now);oscillator.stop(now+duration);
    };
    buttons.forEach(button=>button.addEventListener('click',()=>{
      try{
        const sound=button.dataset.kitchenSound;
        if(sound==='sizzle')noise(.72,{filterType:'bandpass',frequency:2800,endFrequency:1800,volume:.15});
        if(sound==='chop'){noise(.08,{filterType:'highpass',frequency:850,endFrequency:420,volume:.2});setTimeout(()=>noise(.065,{filterType:'highpass',frequency:900,endFrequency:430,volume:.16}),115)}
        if(sound==='steam')noise(1.05,{filterType:'lowpass',frequency:450,endFrequency:1850,volume:.12});
        if(sound==='bell'){bell(880,0,.48,.12);bell(1320,.025,.35,.055)}
        status.textContent=`Playing ${button.textContent.trim().toLowerCase()}.`;
      }catch{status.textContent='Kitchen sounds are unavailable in this browser.'}
    }));
  })();
  (function setupSurpriseMailbox(){
    const button=document.getElementById('mailbox-open'),lettersHost=document.getElementById('mailbox-letters');
    if(!button)return;
    const notes=[
      'The chef says your next noodle bowl should be extra cozy.',
      'A dumpling left a note: good things are better when shared.',
      'Tonight’s tiny secret: save a little room for something sweet.',
      'The tea kettle predicts a calm moment and a very good sip.',
      'A little bird says the crispy dish at your table will disappear first.',
      'You have been officially invited to linger over one more cup of tea.',
      'A secret kitchen wish: may your next meal come with great company.'
    ];
    button.addEventListener('click',()=>{
      const count=Math.random()<.42?2:1,picked=[];
      while(picked.length<count){const note=notes[Math.floor(Math.random()*notes.length)];if(!picked.includes(note))picked.push(note)}
      lettersHost.replaceChildren(...picked.map(message=>{const letter=document.createElement('article');letter.className='mail-letter';letter.textContent=message;return letter}));
      lettersHost.hidden=false;button.classList.add('has-mail');button.setAttribute('aria-label',`Mailbox opened · ${count} ${count===1?'letter':'letters'} inside`);
    });
  })();
})();
