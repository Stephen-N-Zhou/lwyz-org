(()=>{
  const key='forbidden-bite-bite-points-v1', profileKey='forbidden-bite-visitor-profile-v1';
  const dishes=[
    {id:'dumpling',name:'Golden Dumpling',icon:'🥟',cost:0},
    {id:'popcorn-chicken',name:'Popcorn Chicken',icon:'🍗',cost:25},
    {id:'fire-noodles',name:'Dragon Fire Noodles',icon:'🍜',cost:55},
    {id:'smashed-cucumber',name:'Smashed Cucumber',icon:'🥒',cost:85},
    {id:'soup-bowl',name:'Cozy Soup Bowl',icon:'🍲',cost:120},
    {id:'scallion-pancake',name:'Scallion Pancake',icon:'🥞',cost:160},
    {id:'bao-bun',name:'Jade Bao Bun',icon:'🥮',cost:205},
    {id:'bubble-tea',name:'Lychee Bubble Tea',icon:'🧋',cost:250},
    {id:'sesame-mochi',name:'Sesame Mochi',icon:'🍡',cost:300},
    {id:'seafood-feast',name:'Seafood Feast',icon:'🦐',cost:375}
  ];
  const read=()=>{try{const x=JSON.parse(localStorage.getItem(key)||'{}');return {points:Math.max(0,Number(x.points)||0),owned:Array.isArray(x.owned)?x.owned:['dumpling'],tiers:x.tiers&&typeof x.tiers==='object'?x.tiers:{},selected:typeof x.selected==='string'?x.selected:'dumpling',runs:x.runs&&typeof x.runs==='object'?x.runs:{}}}catch{return {points:0,owned:['dumpling'],tiers:{},selected:'dumpling',runs:{}}}};
  let state=read(); if(!state.owned.includes('dumpling'))state.owned.unshift('dumpling');
  const save=()=>{try{localStorage.setItem(key,JSON.stringify(state))}catch{};window.dispatchEvent(new CustomEvent('forbidden-bite:collection-updated',{detail:api.getState()}))};
  const api={
    dishes,
    getState(){return {...state,owned:[...state.owned],tiers:{...state.tiers}}},
    award(amount,source='game',runId=''){amount=Math.max(0,Math.min(20,Math.floor(Number(amount)||0)));if(!amount)return 0;if(runId){const now=Date.now();state.runs[runId]=now;for(const [id,time] of Object.entries(state.runs))if(now-time>86400000)delete state.runs[id];if(state.runs[`paid:${runId}`])return 0;state.runs[`paid:${runId}`]=now}state.points+=amount;save();window.dispatchEvent(new CustomEvent('forbidden-bite:points-earned',{detail:{amount,source,total:state.points}}));return amount},
    buy(id){const dish=dishes.find(x=>x.id===id);if(!dish||state.owned.includes(id)||state.points<dish.cost)return false;state.points-=dish.cost;state.owned.push(id);state.selected=id;this.syncProfile();save();return true},
    upgrade(id){if(!state.owned.includes(id))return false;const tier=Number(state.tiers[id])||0;if(tier>=2)return false;const cost=tier===0?40:90;if(state.points<cost)return false;state.points-=cost;state.tiers[id]=tier+1;save();return true},
    select(id){if(!state.owned.includes(id))return false;state.selected=id;this.syncProfile();save();return true},
    syncProfile(){try{const p=JSON.parse(localStorage.getItem(profileKey)||'{}');p.avatar=state.selected;localStorage.setItem(profileKey,JSON.stringify(p))}catch{}},
    tier(id){return ['Bronze','Silver','Gold'][Math.min(2,Number(state.tiers[id])||0)]}
  };
  window.ForbiddenBiteCollection=api;
  window.addEventListener('storage',e=>{if(e.key===key){state=read();window.dispatchEvent(new CustomEvent('forbidden-bite:collection-updated',{detail:api.getState()}))}});
})();
