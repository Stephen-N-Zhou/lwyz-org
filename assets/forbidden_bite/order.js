(()=>{
  const storageKey='forbidden-bite-demo-cart-v1';
  const readCart=()=>{try{const value=JSON.parse(localStorage.getItem(storageKey)||'[]');return Array.isArray(value)?value:[]}catch{return[]}};
  let cart=readCart();
  const money=value=>new Intl.NumberFormat(undefined,{style:'currency',currency:'USD'}).format(value);
  const nav=document.querySelector('.nav');
  const cartButton=document.createElement('button');
  cartButton.type='button';cartButton.className='cart-open';cartButton.setAttribute('aria-haspopup','dialog');
  cartButton.innerHTML='Cart <span class="cart-count" aria-live="polite">0</span>';
  nav.append(cartButton);
  const dialog=document.createElement('dialog');dialog.className='cart-dialog';dialog.setAttribute('aria-labelledby','cart-title');
  dialog.innerHTML='<div class="cart-head"><h2 id="cart-title">Your order</h2><button class="cart-close" type="button">Close</button></div><div class="cart-items"></div><div class="cart-summary"><span>Demo total</span><span class="cart-total">$0.00</span></div><p class="cart-demo-note"><strong>Demo only:</strong> This cart is a preview. It does not submit, send, or place a real order.</p>';
  document.body.append(dialog);
  const cartItems=dialog.querySelector('.cart-items');
  const cartCount=cartButton.querySelector('.cart-count');
  const cartTotal=dialog.querySelector('.cart-total');
  const persist=()=>{try{localStorage.setItem(storageKey,JSON.stringify(cart))}catch{}}
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
    cartTotal.textContent=money(cart.reduce((sum,item)=>sum+item.price*item.quantity,0));
  };
  const saveAndRender=()=>{persist();render()};
  const changeQty=(name,delta)=>{const item=cart.find(entry=>entry.name===name);if(!item)return;item.quantity+=delta;if(item.quantity<1)cart=cart.filter(entry=>entry!==item);saveAndRender()};
  const showToast=name=>{let toast=document.querySelector('.cart-toast');if(!toast){toast=document.createElement('div');toast.className='cart-toast';toast.setAttribute('role','status');toast.setAttribute('aria-live','polite');document.body.append(toast)}toast.textContent=`${name} added to your cart`;clearTimeout(showToast.timer);showToast.timer=setTimeout(()=>toast.remove(),2200)};
  document.addEventListener('click',event=>{
    const add=event.target.closest('[data-order-item]');if(!add)return;
    let selected;try{selected=JSON.parse(add.dataset.orderItem)}catch{return}
    if(!selected||typeof selected.name!=='string'||!Number.isFinite(Number(selected.price))||Number(selected.price)<=0)return;
    const existing=cart.find(item=>item.name===selected.name);
    if(existing)existing.quantity+=1;else cart.push({name:selected.name,price:Number(selected.price),quantity:1});
    saveAndRender();showToast(selected.name);
  });
  cartButton.addEventListener('click',()=>dialog.showModal());
  dialog.querySelector('.cart-close').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close()});
  render();
})();
