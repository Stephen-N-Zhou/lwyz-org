(()=>{
  const storageKey='forbidden-bite-demo-cart-v1';
  const spinCouponKey='forbidden-bite-spin-coupon-v1';
  const spinPromoRules={'SPIN5':{amount:5,min:0},'SPIN7-30':{amount:7,min:30},'SPIN8-35':{amount:8,min:35},'SPIN10-40':{amount:10,min:40},'SPIN12-60':{amount:12,min:60},'SPIN10-50':{amount:10,min:50},'SPIN25-100':{amount:25,min:100},'SPIN15':{percent:15,min:0}};
  const readCart=()=>{try{const value=JSON.parse(localStorage.getItem(storageKey)||'[]');return Array.isArray(value)?value:[]}catch{return[]}};
  let cart=readCart();
  let promoApplied='';
  const flavorRewardAmounts={FLAVOR1:1,FLAVOR2:3,FLAVOR3:5,FLAVOR4:8,FLAVOR5:12};
  const money=value=>new Intl.NumberFormat(undefined,{style:'currency',currency:'USD'}).format(value);
  const nav=document.querySelector('.nav')||document.querySelector('.topbar');
  const cartButton=document.createElement('button');
  cartButton.type='button';cartButton.className='cart-open';cartButton.setAttribute('aria-haspopup','dialog');
  cartButton.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 4h2l2.1 11.1a2 2 0 0 0 2 1.6h8.7a2 2 0 0 0 1.9-1.5L21 9H7"/><circle cx="10" cy="20" r="1"/><circle cx="18" cy="20" r="1"/></svg><span class="cart-open-label">View cart</span><span class="cart-count" aria-live="polite">0</span>';
  cartButton.setAttribute('aria-label','Open your demo cart, 0 items');
  cartButton.title='Open your demo cart';
  (nav||document.body).append(cartButton);
  const dialog=document.createElement('dialog');dialog.className='cart-dialog';dialog.setAttribute('aria-labelledby','cart-title');
  dialog.innerHTML=`
    <div class="cart-head"><h2 id="cart-title">Your order</h2><button class="cart-close" type="button">Close</button></div>
    <section class="cart-view" aria-label="Shopping cart">
      <div class="cart-items"></div>
      <div class="cart-summary"><span>Demo total</span><span class="cart-total">$0.00</span></div>
      <p class="cart-demo-note"><strong>Demo only:</strong> Browse the checkout preview, but no real order or payment will be processed.</p>
      <button class="checkout-start" type="button">Continue to checkout</button>
    </section>
    <section class="checkout-view" aria-label="Checkout preview" hidden>
      <button class="checkout-back" type="button">← Back to cart</button>
      <p class="checkout-kicker">Secure checkout preview · Step 2 of 2</p>
      <form class="checkout-form">
        <fieldset class="checkout-group">
          <legend>Contact details</legend>
          <label>Full name<input name="customerName" autocomplete="name" placeholder="Taylor Example" required></label>
          <label>Email address<input name="email" type="email" autocomplete="email" placeholder="taylor@example.com" required></label>
          <label>Phone (optional)<input name="phone" type="tel" autocomplete="tel" placeholder="(555) 555-0100"></label>
        </fieldset>
        <fieldset class="checkout-group">
          <legend>How would you like your food?</legend>
          <div class="choice-row">
            <label class="choice-card"><input type="radio" name="fulfillment" value="Pickup" checked> Pickup</label>
            <label class="choice-card"><input type="radio" name="fulfillment" value="Delivery"> Delivery</label>
          </div>
          <label class="pickup-time-label">Pickup time<select name="pickupTime"><option>As soon as possible</option><option>5:30 PM</option><option>6:00 PM</option><option>6:30 PM</option><option>7:00 PM</option><option>7:30 PM</option><option>8:00 PM</option></select></label>
          <div class="delivery-address" hidden>
            <label>Street address<input name="address" autocomplete="street-address" placeholder="123 Example Street"></label>
            <div class="address-row"><label>City<input name="city" autocomplete="address-level2" placeholder="Charlotte"></label><label>ZIP code<input name="zip" autocomplete="postal-code" inputmode="numeric" placeholder="28202"></label></div>
          </div>
        </fieldset>
        <fieldset class="checkout-group">
          <legend>Payment choice</legend>
          <div class="choice-row payment-choices">
            <label class="choice-card"><input type="radio" name="payment" value="Card demo" checked> Credit or debit card <small>Demo</small></label>
            <label class="choice-card"><input type="radio" name="payment" value="Pay on pickup"> Pay in person <small>Demo</small></label>
          </div>
          <p class="payment-note">No card number is requested. This demo does not charge or collect payment.</p>
        </fieldset>
        <fieldset class="checkout-group promo-group">
          <legend>Promo code</legend>
          <div class="promo-row"><input name="promo" autocomplete="off" placeholder="DEMO10 or your FLAVOR reward" aria-label="Promo code"><button type="button" class="promo-apply">Apply</button></div>
          <p class="promo-status" role="status" aria-live="polite"></p>
        </fieldset>
        <div class="review-box"><h3>Order review</h3><div class="review-items"></div><div class="review-totals"><p><span>Subtotal</span><strong class="review-subtotal"></strong></p><p class="delivery-fee-row" hidden><span>Delivery</span><strong>$4.99</strong></p><p class="discount-row" hidden><span>Demo discount</span><strong class="discount-amount"></strong></p><p class="review-grand-total"><span>Estimated total</span><strong class="review-total"></strong></p></div></div>
        <p class="checkout-demo-note"><strong>Preview only:</strong> Your entries stay in this browser and are not sent anywhere. Completing this step will not place an actual order or take payment.</p>
        <button class="checkout-submit" type="submit">Complete demo checkout</button>
      </form>
    </section>
    <section class="checkout-success" aria-live="polite" hidden>
      <div class="success-mark" aria-hidden="true">✓</div><p class="checkout-kicker">Demo checkout complete</p><h3>Your pretend order is ready.</h3><p class="success-message"></p><p class="checkout-demo-note"><strong>No real order was sent. No payment was taken.</strong> This is only a website preview.</p><button class="success-done" type="button">Done</button>
    </section>`;
  document.body.append(dialog);
  const celebration=document.createElement('dialog');celebration.className='order-celebration';celebration.setAttribute('aria-labelledby','order-celebration-title');celebration.setAttribute('aria-describedby','order-celebration-item order-celebration-detail');celebration.innerHTML='<div class="order-celebration-card"><div class="order-confetti" aria-hidden="true"></div><span class="order-celebration-check" aria-hidden="true">✓</span><p class="order-celebration-kicker">FORBIDDEN BITE · DEMO</p><h2 class="order-celebration-title" id="order-celebration-title">Added to your cart</h2><p class="order-celebration-item" id="order-celebration-item"></p><p class="order-celebration-detail" id="order-celebration-detail"></p><span class="order-celebration-progress" aria-hidden="true"></span></div>';document.body.append(celebration);
  const celebrationTitle=celebration.querySelector('.order-celebration-title'),celebrationItem=celebration.querySelector('.order-celebration-item'),celebrationDetail=celebration.querySelector('.order-celebration-detail'),confettiHost=celebration.querySelector('.order-confetti');
  for(let index=0;index<16;index++){const spark=document.createElement('span');spark.className='order-spark';spark.textContent=index%3===0?'✦':index%3===1?'•':'✧';spark.style.left=`${(index*37+6)%100}%`;spark.style.setProperty('--spark-index',String(index));confettiHost.append(spark)}
  let celebrationTimer;
  const celebrate=(title,item,detail)=>{celebrationTitle.textContent=title;celebrationItem.textContent=item;celebrationDetail.textContent=detail;if(!celebration.open)celebration.showModal();celebration.classList.remove('is-celebrating');void celebration.offsetWidth;celebration.classList.add('is-celebrating');clearTimeout(celebrationTimer);celebrationTimer=setTimeout(()=>{if(celebration.open)celebration.close();celebration.classList.remove('is-celebrating')},2000)};
  const cartItems=dialog.querySelector('.cart-items');
  const cartCount=cartButton.querySelector('.cart-count');
  const cartTotal=dialog.querySelector('.cart-total');
  const cartView=dialog.querySelector('.cart-view');
  const checkoutView=dialog.querySelector('.checkout-view');
  const successView=dialog.querySelector('.checkout-success');
  const checkoutForm=dialog.querySelector('.checkout-form');
  const persist=()=>{try{localStorage.setItem(storageKey,JSON.stringify(cart))}catch{}};
  const subtotal=()=>cart.reduce((sum,item)=>sum+item.price*item.quantity,0);
  const discountFor=(code,amount)=>{if(code==='DEMO10')return amount*.1;if(flavorRewardAmounts[code])return flavorRewardAmounts[code];const rule=spinPromoRules[code];return rule&&amount>=rule.min?rule.percent?amount*rule.percent/100:rule.amount:0};
  const saveAndRender=()=>{persist();render()};
  const render=()=>{
    const quantity=cart.reduce((sum,item)=>sum+item.quantity,0);
    cartCount.textContent=String(quantity);cartButton.classList.toggle('has-items',quantity>0);cartButton.setAttribute('aria-label',`Open your demo cart, ${quantity} ${quantity===1?'item':'items'}`);document.querySelectorAll('[data-cart-shortcut-count]').forEach(count=>count.textContent=String(quantity));
    cartItems.replaceChildren();
    if(!cart.length){const empty=document.createElement('div');empty.className='cart-empty';const art=document.createElement('span');art.className='cart-empty-art';art.setAttribute('aria-hidden','true');art.innerHTML='<svg viewBox="0 0 72 64"><path class="cart-empty-steam" d="M26 14c-5-5 4-7 0-12M38 14c-5-5 4-7 0-12M50 14c-5-5 4-7 0-12"/><path d="M11 25h50l-6 22a9 9 0 0 1-9 7H26a9 9 0 0 1-9-7z"/><path d="M8 24h56M24 57h24"/><circle cx="29" cy="35" r="2"/><circle cx="42" cy="39" r="2"/><path d="M32 30c5 2 8 2 12-1"/></svg>';const title=document.createElement('strong');title.textContent='Ready for your first bite?';const copy=document.createElement('span');copy.textContent='Add a favorite dish and it will appear here.';empty.append(art,title,copy);const browse=document.createElement('button');browse.type='button';browse.className='cart-browse-menu';browse.textContent='Explore the menu';browse.addEventListener('click',()=>{dialog.close();const target=document.getElementById('menu-title')||document.querySelector('.nutrition-details')||document.querySelector('.gallery-disclosure');if(target){if(target.matches('details'))target.open=true;target.scrollIntoView({behavior:'smooth',block:'start'})}});cartItems.append(empty,browse)}
    for(const item of cart){
      const line=document.createElement('article');line.className='cart-line';
      const name=document.createElement('span');name.className='cart-line-name';name.textContent=item.name;
      const price=document.createElement('span');price.className='cart-line-price';price.textContent=money(item.price*item.quantity);
      const desc=document.createElement('span');desc.className='cart-line-description';desc.textContent=`${money(item.price)} each`;
      const actions=document.createElement('div');actions.className='cart-line-actions';
      const qty=document.createElement('div');qty.className='cart-qty';
      const minus=document.createElement('button');minus.type='button';minus.textContent='−';minus.setAttribute('aria-label',`Remove one ${item.name}`);minus.addEventListener('click',()=>changeQty(item.name,-1));
      const count=document.createElement('span');count.textContent=String(item.quantity);
      const plus=document.createElement('button');plus.type='button';plus.textContent='+';plus.setAttribute('aria-label',`Add one ${item.name}`);plus.addEventListener('click',()=>changeQty(item.name,1));
      qty.append(minus,count,plus);
      const remove=document.createElement('button');remove.type='button';remove.className='cart-remove';remove.textContent='Remove';remove.addEventListener('click',()=>{cart=cart.filter(entry=>entry.name!==item.name);saveAndRender()});
      actions.append(qty,remove);line.append(name,price,desc,actions);cartItems.append(line);
    }
    cartTotal.textContent=money(subtotal());
    dialog.querySelector('.checkout-start').disabled=cart.length===0;
    updateReview();
  };
  const changeQty=(name,delta)=>{const item=cart.find(entry=>entry.name===name);if(!item)return;item.quantity+=delta;if(item.quantity<1)cart=cart.filter(entry=>entry!==item);saveAndRender()};
  const setView=view=>{cartView.hidden=view!=='cart';checkoutView.hidden=view!=='checkout';successView.hidden=view!=='success';dialog.querySelector('#cart-title').textContent=view==='checkout'?'Checkout preview':view==='success'?'Thank you':'Your order';dialog.classList.toggle('order-complete',view==='success')};
  const selected=name=>checkoutForm.querySelector(`input[name="${name}"]:checked`)?.value;
  const updateDelivery=()=>{const delivery=selected('fulfillment')==='Delivery';const address=dialog.querySelector('.delivery-address');address.hidden=!delivery;for(const input of address.querySelectorAll('input'))input.required=delivery;dialog.querySelector('.pickup-time-label').hidden=delivery;dialog.querySelector('[name="pickupTime"]').required=!delivery;dialog.querySelector('.delivery-fee-row').hidden=!delivery;updateReview()};
  const updateReview=()=>{
    if(!checkoutForm)return;
    const reviewItems=dialog.querySelector('.review-items');reviewItems.replaceChildren();
    for(const item of cart){const row=document.createElement('p');const label=document.createElement('span');label.textContent=`${item.quantity} × ${item.name}`;const price=document.createElement('strong');price.textContent=money(item.quantity*item.price);row.append(label,price);reviewItems.append(row)}
    const delivery=selected('fulfillment')==='Delivery';const subtotalAmount=subtotal();const discount=discountFor(promoApplied,subtotalAmount);
    dialog.querySelector('.review-subtotal').textContent=money(subtotalAmount);
    dialog.querySelector('.discount-row').hidden=!promoApplied;dialog.querySelector('.discount-amount').textContent=`−${money(discount)}`;
    dialog.querySelector('.review-total').textContent=money(Math.max(0,subtotalAmount+(delivery?4.99:0)-discount));
  };
  const tapTimers=new WeakMap(),activeTapEffects=new WeakMap(),activeTapLayers=new WeakMap(),orderTimers=new WeakMap();
  const tapSymbols={
    'fx-serve':['✦','✧','•'],'fx-cart':['◉','●','◉'],'fx-reservation':['✦','✧'],'fx-prize':['✦','✧','✷'],
    'fx-route':['•','◆'],'fx-photo':['✦','✧'],'fx-page':['◇','✦'],'fx-note':['★','✧'],
    'fx-audio':['♪','♫'],'fx-reveal':['✧','＋'],'fx-builder':['◆','✦'],'fx-press':['✦','•']
  };
  const tapEffectFor=control=>{
    if(control.matches('.cart-open,.cart-nav-shortcut,[data-cart-shortcut]'))return 'fx-cart';
    if(control.matches('#reservation-form .reservation-action'))return 'fx-reservation';
    if(control.matches('#spin-button,#spin-claim-button,.spin-button'))return 'fx-prize';
    if(control.matches('.flavor-stop'))return 'fx-route';
    if(control.matches('.dish-tile,.dialog-add'))return 'fx-photo';
    if(control.matches('.recipe-book-cover,.recipe-book-page-button,.recipe-book-next,.recipe-book-previous'))return 'fx-page';
    if(control.matches('.review-form button,.review-tools button'))return 'fx-note';
    if(control.matches('.sound-button'))return 'fx-audio';
    if(control.matches('summary'))return 'fx-reveal';
    if(control.matches('.add-to-cart,[data-order-item]'))return 'fx-serve';
    if(control.matches('.fun-button,[data-builder-add],#feast-add,#planner-build,#planner-add'))return 'fx-builder';
    return 'fx-press';
  };
  document.addEventListener('click',event=>{
    const control=event.target.closest('button,a,summary,[role="button"]');if(!control||control.disabled||control.getAttribute('aria-disabled')==='true')return;
    const previous=activeTapEffects.get(control);if(previous)control.classList.remove(previous);
    activeTapLayers.get(control)?.remove();
    const effect=tapEffectFor(control),layer=document.createElement('span'),symbols=tapSymbols[effect]||tapSymbols['fx-press'];
    layer.className=`restaurant-fx-layer ${effect}-layer`;layer.setAttribute('aria-hidden','true');
    const count=effect==='fx-prize'?14:effect==='fx-serve'||effect==='fx-cart'||effect==='fx-builder'?10:7;
    for(let index=0;index<count;index++){const particle=document.createElement('span'),angle=(Math.PI*2*index/count)-Math.PI/2,distance=effect==='fx-prize'?48+index%3*12:effect==='fx-cart'?36+index%3*10:30+index%3*9;particle.className='restaurant-fx-particle';particle.textContent=symbols[index%symbols.length];particle.style.setProperty('--fx-x',`${Math.cos(angle)*distance}px`);particle.style.setProperty('--fx-y',`${Math.sin(angle)*distance}px`);particle.style.setProperty('--fx-delay',`${index%5*24}ms`);layer.append(particle)}
    control.append(layer);activeTapLayers.set(control,layer);void control.offsetWidth;control.classList.add(effect);activeTapEffects.set(control,effect);
    clearTimeout(tapTimers.get(control));tapTimers.set(control,setTimeout(()=>{control.classList.remove(effect);activeTapEffects.delete(control);activeTapLayers.delete(control);layer.remove()},1100));
  },true);
  document.addEventListener('click',event=>{
    const add=event.target.closest('[data-order-item]');if(!add)return;
    let selectedItem;try{selectedItem=JSON.parse(add.dataset.orderItem)}catch{return}
    if(!selectedItem||typeof selectedItem.name!=='string'||!Number.isFinite(Number(selectedItem.price))||Number(selectedItem.price)<0)return;
    add.classList.remove('cart-added');void add.offsetWidth;add.classList.add('cart-added');clearTimeout(orderTimers.get(add));orderTimers.set(add,setTimeout(()=>add.classList.remove('cart-added'),900));
    const existing=cart.find(item=>item.name===selectedItem.name);
    if(existing)existing.quantity+=1;else cart.push({name:selectedItem.name,price:Number(selectedItem.price),quantity:1});
    saveAndRender();const count=cartButton.querySelector('.cart-count'),quantity=cart.reduce((sum,item)=>sum+item.quantity,0);count.classList.remove('cart-count-pop');void count.offsetWidth;count.classList.add('cart-count-pop');cartButton.classList.remove('cart-open-pop');void cartButton.offsetWidth;cartButton.classList.add('cart-open-pop');setTimeout(()=>{count.classList.remove('cart-count-pop');cartButton.classList.remove('cart-open-pop')},800);celebrate('Added to your demo cart',selectedItem.name,`${money(Number(selectedItem.price))} · ${quantity} ${quantity===1?'item':'items'} in your cart · No order has been sent.`);window.dispatchEvent(new CustomEvent('forbidden-bite:item-added',{detail:{name:selectedItem.name,flavorStop:add.dataset.flavorStopOrder||''}}));
  });
  const openCart=()=>{setView('cart');if(!dialog.open)dialog.showModal();dialog.querySelectorAll('.cart-line').forEach((line,index)=>{line.style.setProperty('--line-order',String(Math.min(index,8)));line.classList.remove('cart-line-enter');void line.offsetWidth;line.classList.add('cart-line-enter');setTimeout(()=>line.classList.remove('cart-line-enter'),650)})};
  cartButton.addEventListener('click',openCart);document.querySelectorAll('[data-cart-shortcut]').forEach(button=>button.addEventListener('click',openCart));
  dialog.querySelector('.cart-close').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close()});
  const applyPromoCode=()=>{const code=checkoutForm.elements.promo.value.trim().toUpperCase();const status=dialog.querySelector('.promo-status'),rule=spinPromoRules[code];if(code==='DEMO10'){promoApplied=code;status.textContent='DEMO10 applied: 10% off your demo subtotal.'}else if(flavorRewardAmounts[code]){promoApplied=code;status.textContent=`${code} applied: ${money(flavorRewardAmounts[code])} off your demo total.`}else if(rule&&subtotal()>=(rule.min||0)){promoApplied=code;status.textContent=rule.percent?`${code} applied: ${rule.percent}% off your demo subtotal.`:`${code} applied: ${money(rule.amount)} off your demo subtotal.`}else if(rule){promoApplied='';status.textContent=`${code} needs a ${money(rule.min)} pretend subtotal.`}else{promoApplied='';status.textContent=code?'That demo code was not recognized. Try DEMO10, an unlocked FLAVOR code, or your wheel prize code.':'Enter DEMO10, an unlocked FLAVOR code, or your wheel prize code.'}status.classList.toggle('is-error',!promoApplied);updateReview()};
  window.addEventListener('forbidden-bite:flavor-reward-unlocked',event=>{const code=event.detail?.code;if(flavorRewardAmounts[code]){try{localStorage.setItem('forbidden-bite-flavor-reward-v1',code)}catch{}}});
  window.addEventListener('forbidden-bite:spinner-prize-claimed',event=>{const reward=event.detail;if(!reward)return;if(reward.kind==='item'&&typeof reward.name==='string'){const name=`Daily Wheel Prize: ${reward.name}`,existing=cart.find(item=>item.name===name);if(existing)existing.quantity++;else cart.push({name,price:0,quantity:1});saveAndRender();cartButton.click();const quantity=cart.reduce((sum,item)=>sum+item.quantity,0);celebrate('Prize added to your demo cart',reward.name,`${quantity} ${quantity===1?'item':'items'} in your cart · Your prize is free in this demo.`);return}if(reward.kind==='coupon'&&spinPromoRules[reward.code]){try{const current=JSON.parse(localStorage.getItem(spinCouponKey)||'[]'),coupons=Array.isArray(current)?current:current?.code?[current]:[];if(!coupons.some(item=>item.code===reward.code&&item.day===reward.day))coupons.push({code:reward.code,day:reward.day});localStorage.setItem(spinCouponKey,JSON.stringify(coupons))}catch{};dialog.querySelector('.cart-demo-note').innerHTML='<strong>Daily wheel prize saved:</strong> Close the cart, add a menu dish, then return to Checkout Preview to apply it.';cartButton.click()}});
  dialog.querySelector('.checkout-start').addEventListener('click',()=>{promoApplied='';let code='';try{code=localStorage.getItem('forbidden-bite-flavor-reward-v1')||'';const saved=JSON.parse(localStorage.getItem(spinCouponKey)||'[]'),coupons=Array.isArray(saved)?saved:saved?.code?[saved]:[],eligible=coupons.filter(item=>spinPromoRules[item.code]).sort((a,b)=>discountFor(b.code,subtotal())-discountFor(a.code,subtotal()));if(eligible.length)code=eligible[0].code}catch{};dialog.querySelector('[name="promo"]').value=code;dialog.querySelector('.promo-status').textContent='';setView('checkout');updateDelivery();if(code)applyPromoCode();else updateReview()});
  dialog.querySelector('.checkout-back').addEventListener('click',()=>setView('cart'));
  dialog.querySelector('.success-done').addEventListener('click',()=>dialog.close());
  checkoutForm.addEventListener('change',event=>{if(event.target.name==='fulfillment')updateDelivery();else updateReview()});
  dialog.querySelector('.promo-apply').addEventListener('click',applyPromoCode);
  checkoutForm.addEventListener('submit',event=>{
    event.preventDefault();if(!cart.length)return;
    const formData=new FormData(checkoutForm);const fulfillment=formData.get('fulfillment');
    const detail=fulfillment==='Delivery'?'Delivery details are shown for the preview.':`Pickup time: ${formData.get('pickupTime')}.`;
    const demoNumber=`DEMO-${Math.random().toString(36).slice(2,8).toUpperCase()}`;
    const subtotalAmount=subtotal(),discount=discountFor(promoApplied,subtotalAmount),total=Math.max(0,subtotalAmount+(fulfillment==='Delivery'?4.99:0)-discount);
    window.dispatchEvent(new CustomEvent('forbidden-bite:demo-order-completed',{detail:{id:demoNumber,total,items:cart.map(item=>({...item})),promo:promoApplied||''}}));
    dialog.querySelector('.success-message').textContent=`Reference ${demoNumber}. ${detail} No order was sent and no payment was processed.`;
    cart=[];const completedPromo=promoApplied;promoApplied='';try{const saved=JSON.parse(localStorage.getItem(spinCouponKey)||'[]'),coupons=Array.isArray(saved)?saved:saved?.code?[saved]:[];localStorage.setItem(spinCouponKey,JSON.stringify(coupons.filter(item=>item.code!==completedPromo)))}catch{};saveAndRender();setView('success');dialog.querySelector('.success-done').focus({preventScroll:true});celebrate('Demo order complete',demoNumber,`${money(total)} demo total · No payment was taken.`);
  });
  dialog.addEventListener('close',()=>{if(successView.hidden===false){checkoutForm.reset();promoApplied=''}setView('cart')});
  window.addEventListener('storage',event=>{if(event.key===storageKey){cart=readCart();render()}});
  render();updateDelivery();
})();
