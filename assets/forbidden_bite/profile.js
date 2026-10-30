(()=>{
  const profileKey='forbidden-bite-visitor-profile-v1';
  const orderEvent='forbidden-bite:demo-order-completed';
  const reviewEvent='forbidden-bite:review-prepared';
  const safeRead=(key,fallback)=>{try{const value=JSON.parse(localStorage.getItem(key)||'null');return value??fallback}catch{return fallback}};
  const safeWrite=(key,value)=>{try{localStorage.setItem(key,JSON.stringify(value))}catch{}};
  const stored=safeRead(profileKey,{});
  const profile={name:typeof stored.name==='string'?stored.name:'Flavor Explorer',avatar:typeof stored.avatar==='string'?stored.avatar:'noodle',orders:Array.isArray(stored.orders)?stored.orders:[],reviews:Array.isArray(stored.reviews)?stored.reviews:[],orderCount:Number.isFinite(Number(stored.orderCount))?Number(stored.orderCount):(Array.isArray(stored.orders)?stored.orders.length:0),reviewCount:Number.isFinite(Number(stored.reviewCount))?Number(stored.reviewCount):(Array.isArray(stored.reviews)?stored.reviews.length:0)};
  const avatars=[
    {id:'noodle',icon:'🍜',name:'Noodle Pal',unlock:'Ready now',unlocked:()=>true},
    {id:'dumpling',icon:'🥟',name:'Dash Dumpling',unlock:'Catch your first dumpling',unlocked:game=>game.achievements.includes('first-bite')||game.best>=1},
    {id:'dragon',icon:'🐉',name:'Dragon Dash',unlock:'Reach level 10',unlocked:game=>game.best>=10||game.achievements.includes('feast-champion')},
    {id:'roadster',icon:'🏎️',name:'Flavor Roadster',unlock:'Order from 3 flavor stops',unlocked:game=>game.flavorCount>=3},
    {id:'trailblazer',icon:'🏆',name:'Trailblazer',unlock:'Complete the 5-stop map',unlocked:game=>game.flavorCount>=5},
    {id:'arcade',icon:'🌟',name:'Arcade Ace',unlock:'Earn 10 Dash achievements',unlocked:game=>game.achievements.length>=10}
  ];
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
    const game=gameProgress(),unlocked=avatars.filter(avatar=>avatar.unlocked(game));
    if(!unlocked.some(avatar=>avatar.id===profile.avatar))profile.avatar='noodle';
    const chosen=avatars.find(avatar=>avatar.id===profile.avatar)||avatars[0];avatarFace.textContent=chosen.icon;avatarStatus.textContent=`${chosen.name} is your profile picture. ${unlocked.length} of ${avatars.length} avatars unlocked.`;
    avatarGrid.replaceChildren();avatars.forEach(avatar=>{const available=avatar.unlocked(game),button=document.createElement('button');button.type='button';button.className='profile-avatar-choice';button.disabled=!available;button.setAttribute('aria-pressed',String(profile.avatar===avatar.id));button.title=available?`Choose ${avatar.name}`:`Unlock: ${avatar.unlock}`;const icon=document.createElement('span');icon.textContent=avatar.icon;icon.setAttribute('aria-hidden','true');const label=document.createElement('strong');label.textContent=avatar.name;const unlock=document.createElement('small');unlock.textContent=available?(profile.avatar===avatar.id?'Selected':avatar.unlock):`🔒 ${avatar.unlock}`;button.append(icon,label,unlock);button.addEventListener('click',()=>{if(!available)return;profile.avatar=avatar.id;save();refresh()});avatarGrid.append(button)});
    const xp=profile.orderCount*25+profile.reviewCount*12+game.achievements.length*18+game.flavorCount*20,rankIndex=ranks.reduce((best,rank,index)=>xp>=rank.min?index:best,0),rank=ranks[rankIndex],next=ranks[rankIndex+1],progress=next?Math.max(0,Math.min(100,Math.round((xp-rank.min)/(next.min-rank.min)*100))):100;
    document.getElementById('profile-rank-emblem').textContent=rank.icon;document.getElementById('profile-rank-label').textContent=`LEVEL ${rankIndex+1} · ${rank.name.toUpperCase()}`;document.getElementById('profile-rank-title').textContent=rank.title;document.getElementById('profile-xp-count').textContent=`${xp} XP`;document.getElementById('profile-xp-fill').style.width=`${progress}%`;const xpTrack=document.querySelector('.profile-xp-track');xpTrack.setAttribute('aria-valuenow',String(progress));document.getElementById('profile-xp-caption').textContent=next?`${next.min-xp} XP to ${next.name} · earn points with demo checkouts, reviews, Dash, and map stops.`:'Max rank reached · your tasting legend is complete!';
    const badges=[{icon:'🧾',name:'First Feast',earned:profile.orderCount>=1},{icon:'💌',name:'Storyteller',earned:profile.reviewCount>=1},{icon:'🥟',name:'Dash Starter',earned:game.achievements.length>=1},{icon:'🗺️',name:'Map Explorer',earned:game.flavorCount>=1},{icon:'🏆',name:'Trailblazer',earned:game.flavorCount>=5},{icon:'🌟',name:'Arcade Ace',earned:game.achievements.length>=10}].filter(badge=>badge.earned),badgeHost=document.getElementById('profile-badges');badgeHost.replaceChildren();if(!badges.length){const empty=document.createElement('span');empty.className='profile-badge-empty';empty.textContent='Complete a demo order, write a review, or explore a game to earn your first pin.';badgeHost.append(empty)}else badges.forEach(badge=>{const chip=document.createElement('span');chip.className='profile-badge';const icon=document.createElement('span');icon.textContent=badge.icon;icon.setAttribute('aria-hidden','true');chip.append(icon,document.createTextNode(badge.name));badgeHost.append(chip)});
    document.getElementById('profile-order-count').textContent=String(profile.orderCount);document.getElementById('profile-review-count').textContent=String(profile.reviewCount);document.getElementById('profile-achievement-count').textContent=String(game.achievements.length);
    renderHistory(document.getElementById('profile-orders'),profile.orders,'No pretend checkouts yet. Your completed demo orders will appear here.','order');renderHistory(document.getElementById('profile-reviews'),profile.reviews,'No review drafts yet. Write one in the guestbook to see it here.','review');
  };
  document.getElementById('profile-refresh').addEventListener('click',refresh);
  window.addEventListener(orderEvent,event=>{profile.orderCount++;profile.orders.unshift({...event.detail,date:new Date().toISOString()});profile.orders=profile.orders.slice(0,5);save();refresh()});
  window.addEventListener(reviewEvent,event=>{profile.reviewCount++;profile.reviews.unshift({...event.detail,date:new Date().toISOString(),status:'draft'});profile.reviews=profile.reviews.slice(0,5);save();refresh()});
  window.addEventListener('forbidden-bite:flavor-reward-unlocked',refresh);
  window.addEventListener('focus',refresh);document.addEventListener('visibilitychange',()=>{if(!document.hidden)refresh()});
  refresh();
})();
