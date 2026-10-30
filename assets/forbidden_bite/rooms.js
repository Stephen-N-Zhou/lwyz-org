(()=>{
  const photos=[
    ['dining-room-01.jpg','Main dining room at blue hour','A broad view of the lantern-lit dining room, with jade chairs and tables set for an evening meal.','main'],
    ['dining-room-02.jpg','From the entrance','A welcoming view from the entry toward the softly glowing dining tables.','main'],
    ['dining-room-03.jpg','Jade-wall two-top','An intimate two-person table beside glossy jade tile and warm brass lighting.','main'],
    ['dining-room-04.jpg','The central dining room','Round tables and green velvet chairs gather beneath the amber lanterns.','main'],
    ['dining-room-05.jpg','Curved window banquette','A curved booth catches the last warm light beside tall windows.','windows'],
    ['dining-room-06.jpg','A booth for four','A tucked-away jade banquette with a round table for a relaxed meal.','windows'],
    ['dining-room-07.jpg','Morning window table','A bright little table with garden views, made for a quiet lunch.','windows'],
    ['dining-room-08.jpg','Long velvet booth','A row of comfortable booths creates a cozy corner for catching up.','windows'],
    ['dining-room-09.jpg','Round-table private room','A private dining room arranged around a round table for eight.','private'],
    ['dining-room-10.jpg','Long-table celebration room','A long shared table waits under warm lanterns for a family-style meal.','private'],
    ['dining-room-11.jpg','Garden-screen dining nook','A leafy semi-private corner framed by carved wood screens.','private'],
    ['dining-room-12.jpg','Lantern room','An intimate private room with jade tile, soft gold light, and a round table.','private'],
    ['dining-room-13.jpg','The tea lounge','A calm counter with teaware, brass details, and a few comfortable seats.','tea'],
    ['dining-room-14.jpg','Tea for two','A rounded banquette and a small tea tray make a peaceful corner.','tea'],
    ['dining-room-15.jpg','Leafy corner table','A quiet table tucked beside a potted tree and a carved screen.','tea'],
    ['dining-room-16.jpg','Tea-shelf alcove','A snug seating nook with softly lit shelves of ceramic teaware.','tea'],
    ['dining-room-17.jpg','The long shared table','A communal table set for sharing small plates with a whole group.','gatherings'],
    ['dining-room-18.jpg','Round-table dinner','A round table set for a special dinner with friends.','gatherings'],
    ['dining-room-19.jpg','Group dining room','Several flexible tables make room for a lively gathering.','gatherings'],
    ['dining-room-20.jpg','Family-size booth','A roomy banquette with space for shared plates in the center.','gatherings'],
    ['dining-room-21.jpg','The welcome desk','A curved host stand opens onto the jade-and-brass dining room.','details'],
    ['dining-room-22.jpg','Lantern-lit passage','A warm corridor leads past carved screens to the dining tables.','details'],
    ['dining-room-23.jpg','Jade tile and brass','A closer look at the green tile, brass sconce, and intimate table setting.','details'],
    ['dining-room-24.jpg','The waiting nook','A calm bench, a leafy planter, and a softly lit arrival corner.','details'],
    ['dining-room-25.jpg','The imagined street entrance','A glowing jade-tile facade hints at the warm dining room inside.','details'],
    ['feast-01.jpg','A sunny multigenerational lunch','Grandparents, parents, and a child pass dumplings and shared plates around a bright window table.','feasts'],
    ['feast-02.jpg','Noodle night with the kids','A family leans in over bowls of noodles and baskets of dumplings beneath the evening lanterns.','feasts'],
    ['feast-03.jpg','A birthday table for everyone','Three generations gather around a colorful celebratory spread and a whole fish.','feasts'],
    ['feast-04.jpg','A cozy hot-pot evening','Grandparents and cousins share bubbling hot pot, vegetables, and thin-sliced meats.','feasts'],
    ['feast-05.jpg','Birthday wishes and shared plates','A family celebrates with a small cake surrounded by dumplings and favorite dishes.','feasts'],
    ['feast-06.jpg','Sunday lunch with the cousins','A long conversation unfolds as relatives pass noodles, greens, and serving chopsticks.','feasts'],
    ['feast-07.jpg','A weekday noodle supper','Parents and children enjoy a relaxed meal of noodles, dumplings, and greens.','feasts'],
    ['feast-08.jpg','Lunar New Year reunion','A festive family table brings together dumplings, a whole fish, and bright red details.','feasts'],
    ['feast-09.jpg','Tea with the visiting grandparents','A family shares a generous meal while one grandparent pours a quiet cup of tea.','feasts'],
    ['feast-10.jpg','Seafood feast for the family','Crab, prawns, vegetables, and shared plates make this a special family dinner.','feasts'],
    ['feast-11.jpg','A graduation dinner','A proud family celebrates a graduate over roast duck, noodles, and dumplings.','feasts'],
    ['feast-12.jpg','Rainy-day dumpling lunch','A child offers a bun across the table while a warm soup steams nearby.','feasts'],
    ['feast-13.jpg','Four generations at brunch','Baskets of buns and small plates bring four generations together for a slow brunch.','feasts'],
    ['feast-14.jpg','Passing plates around the table','A family reaches for greens, noodles, and dumplings in the middle of lunch.','feasts'],
    ['feast-15.jpg','An anniversary dinner together','An older couple celebrates with their grown children over tea and a shared feast.','feasts'],
    ['kitchen-photo-01.jpg','Stretching fresh noodles','A cook draws long strands of fresh dough across a floured counter.','kitchen'],
    ['kitchen-photo-02.jpg','A quick wok toss','Vegetables leap through a hot wok in a bright burst of flame.','kitchen'],
    ['kitchen-photo-03.jpg','Folding dumplings by hand','Two cooks shape dumplings beside trays ready for steaming.','kitchen'],
    ['kitchen-photo-04.jpg','The final touch at the pass','A chef garnishes noodle bowls while the next plates are lined up.','kitchen'],
    ['kitchen-photo-05.jpg','Building a fragrant broth','A cook tends a gently simmering pot of broth and fresh aromatics.','kitchen'],
    ['kitchen-photo-06.jpg','The vegetable prep counter','Fresh greens, tofu, herbs, and noodles are arranged for service.','kitchen'],
    ['kitchen-photo-07.jpg','Cutting noodles from fresh dough','A chef slices fresh dough into even ribbons at the worktop.','kitchen'],
    ['kitchen-photo-08.jpg','Tea and sesame sweets','Tea is poured and black-sesame desserts are arranged for the pass.','kitchen'],
    ['kitchen-photo-09.jpg','Tasting the house broth','A chef checks the seasoning beside the steaming stock pots.','kitchen'],
    ['kitchen-photo-10.jpg','Ready for the dinner rush','A cook organizes fresh vegetables and noodles across the prep line.','kitchen']
  ];
  const gallery=document.getElementById('rooms-gallery');
  const count=document.getElementById('gallery-count');
  const dialog=document.getElementById('room-lightbox');
  const largeImage=document.getElementById('lightbox-image');
  let visiblePhotos=photos.slice(),openIndex=0;
  const root='/assets/forbidden_bite/';
  function render(items){
    gallery.replaceChildren();
    for(const photo of items){
      const [file,title,description,category]=photo;
      const button=document.createElement('button');
      button.type='button';button.className=category==='kitchen'?'room-card kitchen-photo-card':'room-card';button.dataset.photo=String(photos.indexOf(photo));
      button.setAttribute('aria-label',`Open large picture: ${title}`);
      const image=document.createElement('img');image.src=root+file;image.alt=title;image.width=760;image.height=504;image.loading='lazy';image.decoding='async';
      const text=document.createElement('span');text.className='room-card-copy';
      const tag=document.createElement('small');tag.textContent=category==='main'?'Dining room':category==='windows'?'Windows & booths':category==='private'?'Private dining':category==='tea'?'Tea & quiet corners':category==='gatherings'?'Group tables':category==='feasts'?'Family feasts':category==='kitchen'?'Kitchen':'Entry & details';
      const label=document.createElement('strong');label.textContent=title;
      const caption=document.createElement('span');caption.textContent=description;
      text.append(tag,label,caption);button.append(image,text);button.addEventListener('click',()=>openPhoto(Number(button.dataset.photo)));gallery.append(button);
    }
    count.textContent=`Showing ${items.length} of 50 dining, feast, and kitchen pictures.`;
  }
  function openPhoto(index){openIndex=(index+photos.length)%photos.length;const [file,title,description]=photos[openIndex];largeImage.src=root+file;largeImage.alt=title;document.getElementById('lightbox-title').textContent=title;document.getElementById('lightbox-description').textContent=description;document.getElementById('lightbox-count').textContent=`PICTURE ${openIndex+1} OF ${photos.length}`;if(!dialog.open)dialog.showModal()}
  function filter(value){visiblePhotos=value==='all'?photos.slice():photos.filter(photo=>photo[3]===value);document.querySelectorAll('.room-filter').forEach(button=>{const active=button.dataset.filter===value;button.classList.toggle('is-active',active);button.setAttribute('aria-pressed',String(active))});render(visiblePhotos);document.querySelector('.rooms-gallery-section').scrollIntoView({behavior:'smooth',block:'start'})}
  document.querySelectorAll('.room-filter').forEach(button=>button.addEventListener('click',()=>filter(button.dataset.filter)));
  document.querySelectorAll('[data-filter-chip]').forEach(button=>button.addEventListener('click',()=>{filter(button.dataset.filterChip);document.getElementById('gallery-title').focus({preventScroll:true})}));
  document.getElementById('lightbox-close').addEventListener('click',()=>dialog.close());
  document.getElementById('lightbox-prev').addEventListener('click',()=>openPhoto(openIndex-1));
  document.getElementById('lightbox-next').addEventListener('click',()=>openPhoto(openIndex+1));
  dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close()});
  dialog.addEventListener('keydown',event=>{if(event.key==='ArrowRight'){event.preventDefault();openPhoto(openIndex+1)}if(event.key==='ArrowLeft'){event.preventDefault();openPhoto(openIndex-1)}});
  const initialFilter=new URLSearchParams(window.location.search).get('filter');
  if(initialFilter&&['main','windows','private','tea','gatherings','feasts','details','kitchen'].includes(initialFilter))filter(initialFilter);else render(photos);
})();
