(()=>{
  const profileKey='forbidden-bite-visitor-profile-v1';
  const orderEvent='forbidden-bite:demo-order-completed';
  const reviewEvent='forbidden-bite:review-prepared';
  const safeRead=(key,fallback)=>{try{const value=JSON.parse(localStorage.getItem(key)||'null');return value??fallback}catch{return fallback}};
  const safeWrite=(key,value)=>{try{localStorage.setItem(key,JSON.stringify(value))}catch{}};
  const stored=safeRead(profileKey,{});
  const collection=window.ForbiddenBiteCollection;
  const profile={name:typeof stored.name==='string'?stored.name:'Flavor Explorer',avatar:typeof stored.avatar==='string'?stored.avatar:'dumpling',orders:Array.isArray(stored.orders)?stored.orders:[],reviews:Array.isArray(stored.reviews)?stored.reviews:[],orderCount:Number.isFinite(Number(stored.orderCount))?Number(stored.orderCount):(Array.isArray(stored.orders)?stored.orders.length:0),reviewCount:Number.isFinite(Number(stored.reviewCount))?Number(stored.reviewCount):(Array.isArray(stored.reviews)?stored.reviews.length:0)};
  const avatars=collection?.dishes||[{id:'dumpling',icon:'🥟',name:'Golden Dumpling',cost:0}];
  const ranks=[
    {min:0,name:'Noodle Rookie',icon:'🥢',title:'Your flavor journey begins'},
    {min:80,name:'Flavor Scout',icon:'🧭',title:'You’re finding your favorite bites'},
    {min:180,name:'Kitchen Star',icon:'⭐',title:'The kitchen knows your name'},
    {min:330,name:'Feast Legend',icon:'🏮',title:'A whole menu of memories'},
    {min:520,name:'Jade Grandmaster',icon:'👑',title:'A Forbidden Bite legend'}
  ];
  const nameInput=document.getElementById('profile-name'),avatarFace=document.getElementById('profile-avatar'),avatarStatus=document.getElementById('profile-avatar-status'),avatarGrid=document.getElementById('profile-avatar-grid');
  if(!nameInput||!avatarFace||!avatarGrid)return;
  nameInput.value=profile.name;nameInput.addEventListener('input',()=>{profile.name=nameInput.value.trim().slice(0,24)||'Flavor Explorer';save()});
  const save=()=>safeWrite(profileKey,profile);
  const gameProgress=()=>{
    const bestValue=safeRead('forbidden-bite-dumpling-dash-best-level',0);
    const achievementValue=safeRead('forbidden-bite-dumpling-dash-achievements-v1',[]);
    const flavors=safeRead('forbidden-bite-flavor-orders-v1',{});
    return {best:Number(bestValue)||0,achievements:Array.isArray(achievementValue)?achievementValue:[],flavorCount:flavors&&typeof flavors==='object'?Object.keys(flavors).length:0};
  };
  const renderHistory=(host,entries,empty,kind)=>{
    host.replaceChildren();if(!entries.length){const note=document.createElement('p');note.textContent=empty;host.append(note);return}
    entries.slice(0,5).forEach(entry=>{const card=document.createElement('article');card.className='profile-history-item';const title=document.createElement('strong');const detail=document.createElement('small');card.append(title,detail);
      if(kind==='order'){title.textContent=`${entry.id||'Demo order'} · $${Number(entry.total||0).toFixed(2)}`;const items=Array.isArray(entry.items)?entry.items.map(item=>`${item.quantity||1}× ${item.name}`).join(' · '):'';detail.textContent=`${items}${items?' · ':''}${new Date(entry.date||Date.now()).toLocaleDateString()}`}
      else{title.textContent=`${'★'.repeat(Math.max(1,Math.min(5,Number(entry.rating)||5)))} · ${entry.dish||'Surprise me'}`;const copy=document.createElement('p');copy.textContent=entry.text||'';detail.textContent=`${entry.status==='posted'?'Posted publicly':'Draft prepared'} · ${new Date(entry.date||Date.now()).toLocaleDateString()}`;card.append(copy)}
      host.append(card);
    });
  };
  const refresh=()=>{
    const game=gameProgress(),wallet=collection?.getState()||{points:0,owned:['dumpling'],tiers:{},selected:'dumpling'},unlocked=avatars.filter(avatar=>wallet.owned.includes(avatar.id));
    if(!wallet.owned.includes(profile.avatar))profile.avatar=wallet.selected||'dumpling';
    const chosen=avatars.find(avatar=>avatar.id===profile.avatar)||avatars[0],tier=collection?.tier(chosen.id)||'Bronze',faceArt=document.createElement('span');faceArt.className='profile-avatar-art';faceArt.dataset.avatar=chosen.id;faceArt.setAttribute('aria-hidden','true');avatarFace.replaceChildren(faceArt);avatarFace.dataset.tier=tier.toLowerCase();avatarStatus.textContent=`${chosen.name} · ${tier} style · ${unlocked.length} of ${avatars.length} collected.`;
    const pointsLabel=document.getElementById('bite-points-count');if(pointsLabel)pointsLabel.textContent=`${wallet.points} Bite Point${wallet.points===1?'':'s'}`;
    avatarGrid.replaceChildren();avatars.forEach(avatar=>{const owned=wallet.owned.includes(avatar.id),button=document.createElement('button');button.type='button';button.className='profile-avatar-choice';button.dataset.tier=collection?.tier(avatar.id).toLowerCase()||'bronze';button.disabled=!owned&&wallet.points<avatar.cost;button.setAttribute('aria-pressed',String(profile.avatar===avatar.id));const icon=document.createElement('span');icon.className='profile-avatar-art';icon.dataset.avatar=avatar.id;icon.setAttribute('aria-hidden','true');const label=document.createElement('strong');label.textContent=avatar.name;const sub=document.createElement('small');sub.textContent=owned?`${collection?.tier(avatar.id)||'Bronze'}${profile.avatar===avatar.id?' · Selected':''}`:`🔒 ${avatar.cost} Bite Points`;button.append(icon,label,sub);button.addEventListener('click',()=>{if(owned){collection?.select(avatar.id);profile.avatar=avatar.id;save()}else if(collection?.buy(avatar.id)){profile.avatar=avatar.id;save()}refresh()});avatarGrid.append(button)});
    const upgrade=document.getElementById('profile-avatar-upgrade');if(upgrade){const current=Number(wallet.tiers[chosen.id])||0,nextCost=current===0?40:90;upgrade.disabled=current>=2||wallet.points<nextCost||!wallet.owned.includes(chosen.id);upgrade.textContent=current>=2?`${chosen.name} is Gold ✨`: `Upgrade ${chosen.name} to ${current===0?'Silver':'Gold'} · ${nextCost} points`;upgrade.onclick=()=>{if(collection?.upgrade(chosen.id))refresh()}}
    const xp=profile.orderCount*25+profile.reviewCount*12+game.achievements.length*18+game.flavorCount*20,rankIndex=ranks.reduce((best,rank,index)=>xp>=rank.min?index:best,0),rank=ranks[rankIndex],next=ranks[rankIndex+1],progress=next?Math.max(0,Math.min(100,Math.round((xp-rank.min)/(next.min-rank.min)*100))):100;
    document.getElementById('profile-rank-emblem').textContent=rank.icon;document.getElementById('profile-rank-label').textContent=`LEVEL ${rankIndex+1} · ${rank.name.toUpperCase()}`;document.getElementById('profile-rank-title').textContent=rank.title;document.getElementById('profile-xp-count').textContent=`${xp} flavor points`;document.getElementById('profile-xp-fill').style.width=`${progress}%`;const xpTrack=document.querySelector('.profile-xp-track');xpTrack.setAttribute('aria-valuenow',String(progress));document.getElementById('profile-xp-caption').textContent=next?`${next.min-xp} more flavor points to ${next.name}. Earn them with pretend checkouts, reviews, games, and flavor-map stops.`:'Top flavor level reached · your tasting legend is complete!';
    const badges=[{icon:'🧾',name:'First Feast',earned:profile.orderCount>=1},{icon:'💌',name:'Storyteller',earned:profile.reviewCount>=1},{icon:'🥟',name:'Dash Starter',earned:game.achievements.length>=1},{icon:'🗺️',name:'Map Explorer',earned:game.flavorCount>=1},{icon:'🏆',name:'Trailblazer',earned:game.flavorCount>=5},{icon:'🌟',name:'Arcade Ace',earned:game.achievements.length>=10}].filter(badge=>badge.earned),badgeHost=document.getElementById('profile-badges');badgeHost.replaceChildren();if(!badges.length){const empty=document.createElement('span');empty.className='profile-badge-empty';empty.textContent='Complete a demo order, write a review, or explore a game to earn your first pin.';badgeHost.append(empty)}else badges.forEach(badge=>{const chip=document.createElement('span');chip.className='profile-badge';const icon=document.createElement('span');icon.textContent=badge.icon;icon.setAttribute('aria-hidden','true');chip.append(icon,document.createTextNode(badge.name));badgeHost.append(chip)});
    document.getElementById('profile-order-count').textContent=String(profile.orderCount);document.getElementById('profile-review-count').textContent=String(profile.reviewCount);document.getElementById('profile-achievement-count').textContent=String(game.achievements.length);
    renderHistory(document.getElementById('profile-orders'),profile.orders,'No pretend checkouts yet. Your completed demo orders will appear here.','order');renderHistory(document.getElementById('profile-reviews'),profile.reviews,'No review drafts yet. Write one in the guestbook to see it here.','review');
  };
  document.getElementById('profile-refresh').addEventListener('click',refresh);
  window.addEventListener(orderEvent,event=>{profile.orderCount++;profile.orders.unshift({...event.detail,date:new Date().toISOString()});profile.orders=profile.orders.slice(0,5);save();refresh()});
  window.addEventListener(reviewEvent,event=>{profile.reviewCount++;profile.reviews.unshift({...event.detail,date:new Date().toISOString(),status:'draft'});profile.reviews=profile.reviews.slice(0,5);save();refresh()});
  window.addEventListener('forbidden-bite:flavor-reward-unlocked',refresh);
  window.addEventListener('forbidden-bite:collection-updated',refresh);
  window.addEventListener('forbidden-bite:points-earned',event=>{avatarStatus.textContent=`+${event.detail.amount} Bite Points · ${event.detail.total} saved. Visit the profile to upgrade your dish avatar.`;refresh()});
  window.addEventListener('focus',refresh);document.addEventListener('visibilitychange',()=>{if(!document.hidden)refresh()});
  refresh();
})();
