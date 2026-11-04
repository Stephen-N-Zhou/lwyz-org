(()=>{
  const update=()=>{
    const now=new Date(),hour=now.getHours()+now.getMinutes()/60,day=hour>=6&&hour<19.25;
    document.body.dataset.worldTime=day?'day':'night';
    const arena=document.getElementById('game-arena');if(!arena)return;
    let sky=arena.querySelector('.world-weather');
    if(!sky){sky=document.createElement('div');sky.className='world-weather';sky.setAttribute('aria-hidden','true');sky.innerHTML='<span class="weather-sun"></span><span class="weather-moon"></span><span class="weather-cloud cloud-a"></span><span class="weather-cloud cloud-b"></span><span class="weather-cloud cloud-c"></span><span class="weather-time-label"></span>';arena.prepend(sky)}
    const localTime=new Intl.DateTimeFormat(undefined,{hour:'numeric',minute:'2-digit'}).format(now);
    sky.querySelector('.weather-time-label').textContent=`${day?'☀ DAY':'☾ NIGHT'} · ${localTime}`;
    if(!sky.dataset.cloudRefresh||Date.now()-Number(sky.dataset.cloudRefresh)>8*60_000){const cloudCount=1+Math.floor(Math.random()*3);sky.querySelectorAll('.weather-cloud').forEach((cloud,index)=>{cloud.hidden=index>=cloudCount});sky.dataset.cloudRefresh=String(Date.now())}
  };
  update();setInterval(update,60_000);
})();
