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
})();
