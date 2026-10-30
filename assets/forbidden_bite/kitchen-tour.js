(()=>{
  const image=document.getElementById('kitchen-tour-image');
  if(!image)return;
  const stops=[
    {title:'The noodle counter',caption:'Stop 1 · The noodle counter',image:'/assets/forbidden_bite/kitchen-noodle-station.jpg',alt:'Bright jade-tile noodle station with fresh noodles on a pale stone counter',count:'STOP 1 OF 3',description:'Fresh noodles meet fragrant broth at the heart of this imagined kitchen. This is where Chef Mei builds each bowl and finishes it with greens, herbs, and a little sparkle of chili oil.'},
    {title:'The wok station',caption:'Stop 2 · The wok station',image:'/assets/forbidden_bite/kitchen-wok-station.jpg',alt:'Polished wok station with blue flames, ingredient bowls, and jade-green tile',count:'STOP 2 OF 3',description:'At the wok, Chef Jun gives vegetables and dumplings a quick, high-heat sear. Aromatic ginger, scallion, and garlic are ready to finish each dish.'},
    {title:'Plating & tea',caption:'Stop 3 · Plating and tea',image:'/assets/forbidden_bite/kitchen-plating-station.jpg',alt:'Pale stone plating counter with dumplings, noodle dishes, tea cups, and jade-green tile',count:'STOP 3 OF 3',description:'At the pass, Chef Anya adds the final garnish and pours jasmine tea. It is the last quiet moment before the imagined dishes head to the table.'}
  ];
  const buttons=[...document.querySelectorAll('.kitchen-stop')];
  const title=document.getElementById('tour-stop-title');
  const description=document.getElementById('tour-stop-description');
  const count=document.getElementById('tour-stop-count');
  const caption=document.getElementById('kitchen-tour-caption');
  function showStop(index){
    const stop=stops[index];
    if(!stop)return;
    image.src=stop.image;
    image.alt=stop.alt;
    image.classList.remove('tour-image-in');
    void image.offsetWidth;
    image.classList.add('tour-image-in');
    title.textContent=stop.title;
    description.textContent=stop.description;
    count.textContent=stop.count;
    caption.textContent=stop.caption;
    buttons.forEach((button,i)=>{
      const active=i===index;
      button.classList.toggle('is-active',active);
      button.setAttribute('aria-pressed',String(active));
    });
  }
  buttons.forEach(button=>button.addEventListener('click',()=>showStop(Number(button.dataset.stop))));
})();
