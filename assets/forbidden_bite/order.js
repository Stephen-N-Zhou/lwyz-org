(()=>{
  const storageKey='forbidden-bite-demo-cart-v1';
  const readCart=()=>{try{const value=JSON.parse(localStorage.getItem(storageKey)||'[]');return Array.isArray(value)?value:[]}catch{return[]}};
  let cart=readCart();
  let promoApplied=false;
  const money=value=>new Intl.NumberFormat(undefined,{style:'currency',currency:'USD'}).format(value);
  const nav=document.querySelector('.nav');
  const cartButton=document.createElement('button');
  cartButton.type='button';cartButton.className='cart-open';cartButton.setAttribute('aria-haspopup','dialog');
  cartButton.innerHTML='Cart <span class="cart-count" aria-live="polite">0</span>';
  nav.append(cartButton);
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
          <div class="promo-row"><input name="promo" autocomplete="off" placeholder="Try DEMO10" aria-label="Promo code"><button type="button" class="promo-apply">Apply</button></div>
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
  const cartItems=dialog.querySelector('.cart-items');
  const cartCount=cartButton.querySelector('.cart-count');
  const cartTotal=dialog.querySelector('.cart-total');
  const cartView=dialog.querySelector('.cart-view');
  const checkoutView=dialog.querySelector('.checkout-view');
  const successView=dialog.querySelector('.checkout-success');
  const checkoutForm=dialog.querySelector('.checkout-form');
  const persist=()=>{try{localStorage.setItem(storageKey,JSON.stringify(cart))}catch{}};
  const subtotal=()=>cart.reduce((sum,item)=>sum+item.price*item.quantity,0);
  const saveAndRender=()=>{persist();render()};
  const render=()=>{
    const quantity=cart.reduce((sum,item)=>sum+item.quantity,0);
    cartCount.textContent=String(quantity);cartButton.setAttribute('aria-label',`Open cart, ${quantity} ${quantity===1?'item':'items'}`);
    cartItems.replaceChildren();
    if(!cart.length){const empty=document.createElement('p');empty.className='cart-empty';empty.textContent='Your cart is empty. Add something tasty from either menu.';cartItems.append(empty)}
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
  const setView=view=>{cartView.hidden=view!=='cart';checkoutView.hidden=view!=='checkout';successView.hidden=view!=='success';dialog.querySelector('#cart-title').textContent=view==='checkout'?'Checkout preview':view==='success'?'Thank you':'Your order'};
  const selected=name=>checkoutForm.querySelector(`input[name="${name}"]:checked`)?.value;
  const updateDelivery=()=>{const delivery=selected('fulfillment')==='Delivery';const address=dialog.querySelector('.delivery-address');address.hidden=!delivery;for(const input of address.querySelectorAll('input'))input.required=delivery;dialog.querySelector('.pickup-time-label').hidden=delivery;dialog.querySelector('[name="pickupTime"]').required=!delivery;dialog.querySelector('.delivery-fee-row').hidden=!delivery;updateReview()};
  const updateReview=()=>{
    if(!checkoutForm)return;
    const reviewItems=dialog.querySelector('.review-items');reviewItems.replaceChildren();
    for(const item of cart){const row=document.createElement('p');const label=document.createElement('span');label.textContent=`${item.quantity} × ${item.name}`;const price=document.createElement('strong');price.textContent=money(item.quantity*item.price);row.append(label,price);reviewItems.append(row)}
    const delivery=selected('fulfillment')==='Delivery';const subtotalAmount=subtotal();const discount=promoApplied?subtotalAmount*.1:0;
    dialog.querySelector('.review-subtotal').textContent=money(subtotalAmount);
    dialog.querySelector('.discount-row').hidden=!promoApplied;dialog.querySelector('.discount-amount').textContent=`−${money(discount)}`;
    dialog.querySelector('.review-total').textContent=money(Math.max(0,subtotalAmount+(delivery?4.99:0)-discount));
  };
  const showToast=name=>{let toast=document.querySelector('.cart-toast');if(!toast){toast=document.createElement('div');toast.className='cart-toast';toast.setAttribute('role','status');toast.setAttribute('aria-live','polite');document.body.append(toast)}toast.textContent=`${name} added to your cart`;clearTimeout(showToast.timer);showToast.timer=setTimeout(()=>toast.remove(),2200)};
  document.addEventListener('click',event=>{
    const add=event.target.closest('[data-order-item]');if(!add)return;
    let selectedItem;try{selectedItem=JSON.parse(add.dataset.orderItem)}catch{return}
    if(!selectedItem||typeof selectedItem.name!=='string'||!Number.isFinite(Number(selectedItem.price))||Number(selectedItem.price)<=0)return;
    const existing=cart.find(item=>item.name===selectedItem.name);
    if(existing)existing.quantity+=1;else cart.push({name:selectedItem.name,price:Number(selectedItem.price),quantity:1});
    saveAndRender();showToast(selectedItem.name);
  });
  cartButton.addEventListener('click',()=>{setView('cart');dialog.showModal()});
  dialog.querySelector('.cart-close').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close()});
  dialog.querySelector('.checkout-start').addEventListener('click',()=>{promoApplied=false;dialog.querySelector('[name="promo"]').value='';dialog.querySelector('.promo-status').textContent='';setView('checkout');updateDelivery();updateReview()});
  dialog.querySelector('.checkout-back').addEventListener('click',()=>setView('cart'));
  dialog.querySelector('.success-done').addEventListener('click',()=>dialog.close());
  checkoutForm.addEventListener('change',event=>{if(event.target.name==='fulfillment')updateDelivery();else updateReview()});
  dialog.querySelector('.promo-apply').addEventListener('click',()=>{const code=checkoutForm.elements.promo.value.trim().toUpperCase();const status=dialog.querySelector('.promo-status');promoApplied=code==='DEMO10';status.textContent=promoApplied?'DEMO10 applied: 10% off your demo subtotal.':code?'That demo code was not recognized. Try DEMO10.':'Enter DEMO10 to try the sample discount.';status.classList.toggle('is-error',!!code&&!promoApplied);updateReview()});
  checkoutForm.addEventListener('submit',event=>{
    event.preventDefault();if(!cart.length)return;
    const formData=new FormData(checkoutForm);const fulfillment=formData.get('fulfillment');
    const detail=fulfillment==='Delivery'?'Delivery details are shown for the preview.':`Pickup time: ${formData.get('pickupTime')}.`;
    const demoNumber=`DEMO-${Math.random().toString(36).slice(2,8).toUpperCase()}`;
    dialog.querySelector('.success-message').textContent=`Reference ${demoNumber}. ${detail} No order was sent and no payment was processed.`;
    cart=[];promoApplied=false;saveAndRender();setView('success');
  });
  dialog.addEventListener('close',()=>{if(successView.hidden===false){checkoutForm.reset();promoApplied=false}setView('cart')});
  render();updateDelivery();
})();
