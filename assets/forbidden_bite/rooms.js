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
    ['kitchen-photo-10.jpg','Ready for the dinner rush','A cook organizes fresh vegetables and noodles across the prep line.','kitchen'],
    ['food-photo-01.jpg','Dragon Fire Noodles','A vivid chili broth with tender beef, bok choy, scallions, and long noodles.','food'],
    ['food-photo-02.jpg','Wonton Soup','Tender wontons float in clear broth with greens and scallions.','food'],
    ['food-photo-03.jpg','Silken Path','Sesame-coated noodles meet mushrooms, snap peas, and crisp vegetables.','food'],
    ['food-photo-04.jpg','Char Siu Bowl','Glazed roast pork, rice, bok choy, cucumber, and carrot share one bowl.','food'],
    ['food-photo-05.jpg','Pork & Chive Dumplings','Pan-seared dumplings with crisp edges and a soy-vinegar dipping sauce.','food'],
    ['food-photo-06.jpg','Smashed Cucumbers','Chilled cucumber, garlic, chili oil, sesame, and rice vinegar.','food'],
    ['food-photo-07.jpg','Shrimp Toast','Crisp sesame shrimp toast with a savory dipping sauce.','food'],
    ['food-photo-08.jpg','Scallion Pancake','Flaky scallion pancake wedges served warm for sharing.','food'],
    ['food-photo-09.jpg','Mapo Tofu Bowl','Silky tofu and rice in a glossy, chili-rich sauce.','food'],
    ['food-photo-10.jpg','Golden Veggie Bowl','Tofu, mushrooms, greens, and carrots over rice with sesame.','food'],
    ['food-photo-11.jpg','Dragon Beef Bowl','Tender beef, broccoli, sesame, and rice in a savory glaze.','food'],
    ['food-photo-12.jpg','Moonlight Fried Rice','Fried rice with shrimp, egg, peas, and fresh scallions.','food'],
    ['food-photo-13.jpg','Imperial Hot & Sour','A warming bowl with mushrooms, tofu, bamboo shoots, and scallion.','food'],
    ['food-photo-14.jpg','Tofu Seaweed Soup','Soft tofu and seaweed in a light, delicate broth.','food'],
    ['food-photo-15.jpg','Charred Seasonal Greens','Garlicky greens with sesame and lightly crisped edges.','food'],
    ['food-photo-16.jpg','Crispy Spring Rolls','Golden vegetable spring rolls with a bright dipping sauce.','food'],
    ['food-photo-17.jpg','Ginger-Scallion Steamed Fish','Steamed fish finished with fresh ginger, scallion, and soy.','food'],
    ['food-photo-18.jpg','Imperial Garlic Prawns','Juicy prawns with toasted garlic, scallion, and a hint of chili.','food'],
    ['food-photo-19.jpg','Seafood Boil for Two','Crab, prawns, corn, and potatoes gathered on a shareable platter.','food'],
    ['food-photo-20.jpg','Peking Duck Celebration','Crisp duck with pancakes, cucumber, scallions, and plum sauce.','food'],
    ['food-photo-21.jpg','Sweet Sin','Black sesame panna cotta with a silky finish and toasted sesame.','food'],
    ['food-photo-22.jpg','Jade Pillows','Golden sesame dessert bites with a tender, sweet center.','food'],
    ['food-photo-23.jpg','Mango Cloud Pudding','Cool mango pudding topped with fresh fruit and cream.','food'],
    ['food-photo-24.jpg','Lychee Sparkler','A bright lychee drink with bubbles, ice, and fresh fruit.','food'],
    ['food-photo-25.jpg','Forbidden Popcorn Chicken','Five-spice chicken bites with a crisp coating and chili dip.','food'],
    ['surprise-photo-01.jpg','Dumplings under the teapot','A bamboo steamer of golden dumplings joins a quiet pot of tea.','surprises'],
    ['surprise-photo-02.jpg','Lanterns in the tea','A warm lantern glow shimmers across a freshly poured cup.','surprises'],
    ['surprise-photo-03.jpg','A basket made for sharing','Steamed dumplings and a little teapot wait at the table.','surprises'],
    ['surprise-photo-04.jpg','Lantern-lit koi fountain','A red-and-jade ceramic koi fountain welcomes guests beneath the lanterns.','surprises'],
    ['surprise-photo-05.jpg','Noodles reaching for the sky','A playful lift of long noodles rises above a steaming bowl.','surprises'],
    ['surprise-photo-06.jpg','Mango cloud tower','A tall, sunny mango dessert with layers of fruit and cream.','surprises'],
    ['surprise-photo-07.jpg','A mountain view after dusk','A peaceful waterside dining table glows in the evening.','surprises'],
    ['surprise-photo-08.jpg','The long-spout tea pour','A traditional kettle sends a ribbon of tea into waiting cups.','surprises'],
    ['surprise-photo-09.jpg','Panda bun parade','Steamed buns get a playful panda makeover.','surprises'],
    ['surprise-photo-10.jpg','The house chili collection','Colorful spice jars line up for guests who like a little heat.','surprises'],
    ['surprise-photo-11.jpg','Rainy window, warm table','A cozy spread of noodles and tea on a drizzly evening.','surprises'],
    ['surprise-photo-12.jpg','A lucky cookie, a blank wish','Fortune cookies wait beside a little bowl for your message.','surprises'],
    ['surprise-photo-13.jpg','Wok-fire moment','A chef sends a bright wok flame dancing over dinner.','surprises'],
    ['surprise-photo-14.jpg','Seven teacups, seven glazes','A colorful collection of handmade cups ready for tea.','surprises'],
    ['surprise-photo-15.jpg','The little festival dragon','A festive dragon puppet visits the dining room.','surprises'],
    ['surprise-photo-16.jpg','Koi napkin fold','A folded red-and-jade napkin takes the shape of a koi.','surprises'],
    ['surprise-photo-17.jpg','Scallion pancake in flight','Fresh dough spins above the counter before hitting the pan.','surprises'],
    ['surprise-photo-18.jpg','A quiet chessboard','A Chinese chessboard waits in a peaceful lounge corner.','surprises'],
    ['surprise-photo-19.jpg','Jasmine leaves opening','Jasmine blossoms unfurl slowly inside a glass teapot.','surprises'],
    ['surprise-photo-20.jpg','Fox-shaped sauce pourer','A little ceramic fox brings soy sauce to the table.','surprises'],
    ['surprise-photo-21.jpg','Sugar lantern dessert','A delicate spun-sugar lantern crowns a sesame sweet.','surprises'],
    ['surprise-photo-22.jpg','Koi tile wall','A bright wall of hand-painted koi brings the room to life.','surprises'],
    ['surprise-photo-23.jpg','Lychee lantern sparkler','A fizzy lychee drink dressed with mint and citrus.','surprises'],
    ['surprise-photo-24.jpg','Lantern painting in progress','A maker paints gold blossoms onto a red paper lantern.','surprises'],
    ['surprise-photo-25.jpg','Cloud-shaped sesame mochi','A soft, snowy dessert floats above a plate of fresh fruit.','surprises']
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
      button.type='button';button.className=category==='kitchen'?'room-card kitchen-photo-card':category==='food'?'room-card food-photo-card':'room-card';button.dataset.photo=String(photos.indexOf(photo));
      button.setAttribute('aria-label',`Open large picture: ${title}`);
      const image=document.createElement('img');image.src=root+file;image.alt=title;image.width=760;image.height=504;image.loading='lazy';image.decoding='async';
      const text=document.createElement('span');text.className='room-card-copy';
      const tag=document.createElement('small');tag.textContent=category==='main'?'Dining room':category==='windows'?'Windows & booths':category==='private'?'Private dining':category==='tea'?'Tea & quiet corners':category==='gatherings'?'Group tables':category==='feasts'?'Family feasts':category==='kitchen'?'Kitchen':category==='food'?'Menu dish':category==='surprises'?'Surprise scene':'Entry & details';
      const label=document.createElement('strong');label.textContent=title;
      const caption=document.createElement('span');caption.textContent=description;
      text.append(tag,label,caption);button.append(image,text);button.addEventListener('click',()=>openPhoto(Number(button.dataset.photo)));gallery.append(button);
    }
    count.textContent=`Showing ${items.length} of 100 dining, feast, kitchen, food, and surprise pictures.`;
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
  if(initialFilter&&['main','windows','private','tea','gatherings','feasts','details','kitchen','food','surprises'].includes(initialFilter))filter(initialFilter);else render(photos);
})();
