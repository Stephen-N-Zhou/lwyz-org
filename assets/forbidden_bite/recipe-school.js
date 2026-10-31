(() => {
  const choices = document.getElementById('recipe-choices');
  const lesson = document.getElementById('recipe-lesson');
  if (!choices || !lesson) return;
  const recipes = [
    { id:'popcorn', name:'Forbidden Popcorn Chicken', image:'', time:'30 min · Medium', food:'chicken', steps:[
      ['Cut and season','Cut boneless chicken into bite-size pieces. Pat them dry, then season with five-spice, salt, and white pepper.','A dry surface helps the coating cling.','board'],
      ['Coat each piece','Toss the chicken with a little starch until every piece has a thin, even coat. Shake off extra flour.','Work in small handfuls so the pieces stay separate.','bowl'],
      ['Fry until crisp','Lower a few pieces at a time into hot oil. Turn them once, then lift them out when deeply golden and cooked through.','Keep the pan uncrowded; hot oil needs room to recover.','wok'],
      ['Toss with five-spice','Drain the chicken briefly, then toss it with scallion, chili salt, and a pinch of five-spice while it is still hot.','Season while warm so the fragrant spices stick.','pan'],
      ['Garnish and serve','Pile the crisp bites on a platter and finish with fresh scallions. Serve the chili salt on the side.','Let the coating rest for a minute so it stays crunchy.','plate']
    ]},
    { id:'dumplings', name:'Pork & Chive Dumplings', image:'food-photo-05.jpg', time:'50 min · Hands-on', food:'dumpling', steps:[
      ['Mix the filling','Combine ground pork, finely chopped chives, grated ginger, soy, and a little sesame oil. Mix until just sticky.','Cook a tiny test piece and adjust the seasoning before filling.','bowl'],
      ['Roll the wrappers','Rest the dough, then roll it into thin rounds. Keep the center a little thicker than the edge.','Cover unused dough so it does not dry out.','board'],
      ['Fill and pleat','Add a small spoonful of filling, fold the wrapper, and press several pleats closed along one side.','Leave a clean rim so the wrapper seals tightly.','board'],
      ['Boil gently','Slide the dumplings into gently boiling water in batches. Stir once to keep them from sticking.','They are ready when the wrappers look tender and the filling is cooked through.','pot'],
      ['Serve with ginger soy','Lift the dumplings out carefully and serve with ginger, soy, and rice-vinegar dipping sauce.','A little scallion makes a fresh finish.','plate']
    ]},
    { id:'pan-seared', name:'Pan-Seared Dumplings', image:'food-photo-05.jpg', time:'45 min · Medium', food:'dumpling', steps:[
      ['Prepare and fill','Set out the dumplings with their seams pressed closed and the bottoms flat.','Use a little less filling so each dumpling sits neatly in the pan.','board'],
      ['Warm the skillet','Heat a lightly oiled skillet over medium heat. Arrange dumplings flat-side down with space between them.','Give each dumpling a clear patch of pan for an even crust.','pan'],
      ['Sear the bottoms','Let the dumplings cook without moving them until their bottoms turn crisp and golden.','Lift one edge to check the color before adding water.','pan'],
      ['Cover and steam','Carefully add a small splash of water and cover the skillet. Let the steam cook the filling and soften the tops.','Keep your hand back as the water hits the hot pan.','pan'],
      ['Uncover and serve','Remove the lid and let the last moisture cook away. Loosen the golden bottoms and serve crisp-side up.','Finish with scallions and a ginger-soy dip.','plate']
    ]},
    { id:'cucumbers', name:'Smashed Cucumbers', image:'food-photo-06.jpg', time:'15 min · Easy', food:'cucumber', steps:[
      ['Wash and smash','Dry the cucumbers. Lay them on a board and gently crack them with the flat side of a cleaver, then cut into rough pieces.','Cracking the skin gives the dressing more places to cling.','board'],
      ['Salt and drain','Toss the cucumber pieces with a pinch of salt and let them drain briefly in a bowl or colander.','Pat away extra moisture for a crisper salad.','bowl'],
      ['Whisk the dressing','Stir together minced garlic, rice vinegar, soy, sesame, and a little chili oil. Taste and balance the tang.','Add chili oil gradually so the heat stays gentle.','bowl'],
      ['Toss until coated','Add the drained cucumbers and toss until the dressing reaches all the cracked edges.','Use a wide bowl so the pieces stay crisp instead of crushed.','mix'],
      ['Chill and finish','Chill briefly, then scatter sesame and scallions over the salad just before serving.','Serve cold while the cucumbers still have a clean crunch.','plate']
    ]}
  ];
  const svgArt = (food, scene, index) => {
    const gold = ['#f4c34f','#e9b73f','#dba23b','#c8872d','#f1c653'][index];
    const bg = ['#efe2c4','#ead7b2','#dfc799','#ecd9b9','#f2e5c9'][index];
    const chicken = index < 2 ? '#d88f80' : index === 2 ? '#efcc75' : '#c9822e';
    const foodBits = food === 'chicken'
      ? `<g fill="${chicken}" stroke="#8e5e3b" stroke-width="3"><path d="M0 4q-24-29-46-8-12 18 5 35 18 14 41-6 17 1 25-12Q17 0 0 4Z"/><path d="M70 26q-16-24-37-7-13 13-3 31 15 16 34 1 17 5 23-8Q87 29 70 26Z"/><path d="M-68 59q-12-25-32-13-18 12-8 32 15 17 33 2 18 2 22-9Q-51 59-68 59Z"/></g><g fill="#fff4c9" opacity=".8"><ellipse cx="-10" cy="0" rx="9" ry="3" transform="rotate(-28 -10 0)"/><ellipse cx="57" cy="26" rx="8" ry="3" transform="rotate(-24 57 26)"/></g>`
      : food === 'dumpling'
        ? `<g fill="${index<2?'#f1dfb7':'#f8e9c9'}" stroke="#b28b52" stroke-width="3"><path d="M-86 24Q-74-42-25-39 16-36 38 25Q-20 54-86 24Z"/><path d="M-10 37Q7-28 53-25 96-21 111 37 56 67-10 37Z"/><path d="M-72 75Q-54 24-17 31 15 37 27 77-22 101-72 75Z"/></g><g fill="none" stroke="#c2a26d" stroke-width="3"><path d="m-67 8 8 18m10-37 3 25m20-35-3 28m18-23 1 28M8 21l8 17m11-34 4 25m18-31-2 27m17-21 4 24"/></g>`
        : `<g stroke="#376241" stroke-width="5"><ellipse cx="-67" cy="8" rx="37" ry="19" fill="#79a958" transform="rotate(-24 -67 8)"/><ellipse cx="3" cy="-12" rx="40" ry="19" fill="#91bd68" transform="rotate(18 3 -12)"/><ellipse cx="67" cy="21" rx="39" ry="20" fill="#6d9c4d" transform="rotate(-13 67 21)"/><ellipse cx="-18" cy="60" rx="38" ry="19" fill="#84b660" transform="rotate(-8 -18 60)"/></g><g fill="#e7edc7"><circle cx="-72" cy="5" r="3"/><circle cx="-60" cy="12" r="3"/><circle cx="-1" cy="-17" r="3"/><circle cx="9" cy="-7" r="3"/><circle cx="65" cy="16" r="3"/><circle cx="74" cy="26" r="3"/></g>`;
    const vessel = scene === 'wok' || scene === 'pan'
      ? `<ellipse cx="360" cy="240" rx="207" ry="135" fill="#172827" stroke="#b68a47" stroke-width="12"/><ellipse cx="360" cy="224" rx="181" ry="106" fill="#48564b"/><path d="M520 209h117q24 0 24 17t-24 17h-117" fill="#745638" stroke="#3f3325" stroke-width="8"/>`
      : scene === 'plate'
        ? `<ellipse cx="360" cy="235" rx="208" ry="142" fill="#c8ad79" opacity=".38"/><ellipse cx="360" cy="222" rx="195" ry="132" fill="#fffdf3" stroke="#d2c7ae" stroke-width="8"/><ellipse cx="360" cy="222" rx="164" ry="103" fill="#faf5e6" stroke="#eee3ce" stroke-width="3"/>`
        : scene === 'pot' || scene === 'steamer'
          ? `<ellipse cx="360" cy="233" rx="194" ry="130" fill="#b8864c" stroke="#734d2d" stroke-width="10"/><ellipse cx="360" cy="210" rx="167" ry="99" fill="#f4e8ce" stroke="#d5b981" stroke-width="7"/><path d="M205 198h310M222 229h276M245 260h230M272 175v115m45-129v141m46-145v148m45-141v135m44-118v99" stroke="#bd955d" stroke-width="5" opacity=".8"/>`
          : `<rect x="124" y="98" width="472" height="278" rx="34" fill="#bd8a50" stroke="#885b32" stroke-width="8"/><path d="M157 126h406M157 346h406" stroke="#dca96c" stroke-width="4" opacity=".75"/>`;
    let tool = '';
    if (scene === 'board' && (food === 'chicken' || index === 0)) tool = `<g transform="translate(570 132) rotate(34)"><path d="M0 0h15v119H0z" fill="#d5e5e5" stroke="#596c6c" stroke-width="4"/><rect x="-3" y="112" width="21" height="72" rx="8" fill="#725039"/></g>`;
    if (scene === 'board' && food === 'dumpling') tool = `<g transform="translate(405 110) rotate(22)"><rect x="-100" y="-18" width="200" height="36" rx="18" fill="#d8bd8b" stroke="#8d6c43" stroke-width="5"/><rect x="-124" y="-10" width="25" height="20" rx="8" fill="#755234"/><rect x="99" y="-10" width="25" height="20" rx="8" fill="#755234"/></g>`;
    if (scene === 'pan' || scene === 'wok') tool = `<g transform="translate(550 125) rotate(26)"><path d="M0 0 22 8 112 163 89 175Z" fill="#d7d4cc" stroke="#625b50" stroke-width="5"/><rect x="75" y="153" width="30" height="96" rx="13" fill="#765136"/></g>`;
    if (scene === 'mix' || scene === 'bowl') tool = `<g transform="translate(548 104) rotate(34)"><path d="M0 0h13v134H0z" fill="#d5d1c4" stroke="#746e61" stroke-width="3"/><ellipse cx="7" cy="144" rx="30" ry="15" fill="#d7d2c5" stroke="#746e61" stroke-width="4"/></g>`;
    const cucumberSmash = food === 'cucumber' && index === 0 ? `<g transform="translate(548 92) rotate(28)"><path d="M0 0h56v156H0z" fill="#c5c6bd" stroke="#70736c" stroke-width="6"/><rect x="9" y="-68" width="38" height="78" rx="16" fill="#6b5138"/></g>` : '';
    const flour = food==='chicken' && index===1 ? `<g fill="#fff9e8" opacity=".9"><circle cx="292" cy="212" r="8"/><circle cx="418" cy="264" r="7"/><circle cx="374" cy="183" r="6"/><circle cx="468" cy="221" r="8"/></g>` : '';
    const sauce = food==='cucumber' && index===2 ? `<path d="M225 274q65-34 130 0t139 0" fill="none" stroke="#a04e2d" stroke-width="9" stroke-linecap="round"/><circle cx="293" cy="240" r="8" fill="#f5d789"/><circle cx="448" cy="274" r="7" fill="#f5d789"/>` : '';
    const steam = (scene==='wok'||scene==='pot'||scene==='steamer') ? `<g fill="none" stroke="#fffdf0" stroke-width="9" stroke-linecap="round" opacity=".72"><path d="M292 89q-25-28 0-53t0-41"/><path d="M360 78q-25-28 0-53t0-41"/><path d="M428 89q-25-28 0-53t0-41"/></g>` : '';
    const bgId=`bg-${food}-${scene}-${index}`,woodId=`wood-${food}-${scene}-${index}`;
    const hands = scene==='board'||scene==='mix' ? `<g fill="#b97e5e" stroke="#8b5f49" stroke-width="3"><path d="M152 308q38-47 79-21l36 29-31 32-76-4q-33-9-8-36Z"/><path d="M552 308q-38-47-79-21l-36 29 31 32 76-4q33-9 8-36Z"/></g><g fill="#1c6048"><path d="M125 323h56v56h-71v-28q0-28 15-28Z"/><path d="M539 323h56v56h71v-28q0-28-15-28Z"/></g>` : '';
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 420" role="img"><defs><linearGradient id="${bgId}" x2="0" y2="1"><stop stop-color="${bg}"/><stop offset="1" stop-color="#cbb48b"/></linearGradient><linearGradient id="${woodId}" x2="1" y2="1"><stop stop-color="#eccb91"/><stop offset="1" stop-color="#a86f3e"/></linearGradient><filter id="shadow-${index}"><feDropShadow dx="0" dy="9" stdDeviation="8" flood-color="#392515" flood-opacity=".25"/></filter></defs><rect width="720" height="420" fill="url(#${bgId})"/><path d="M0 50H720M0 370H720" stroke="#a6865a" stroke-opacity=".2" stroke-width="3"/><circle cx="77" cy="78" r="43" fill="#fff9e7" opacity=".55"/><circle cx="650" cy="325" r="58" fill="#fff9e7" opacity=".35"/><g filter="url(#shadow-${index})">${vessel}<g transform="translate(360 222)">${foodBits}</g>${tool}${cucumberSmash}${flour}${sauce}${steam}${hands}</g><g fill="#fff9e5" opacity=".8"><path d="M578 72h53v12h-53z"/><path d="M596 53h12v50h-12z"/></g></svg>`;
  };
  function renderRecipe(recipe, selectedIndex) {
    choices.querySelectorAll('.recipe-choice').forEach((item, index) => item.setAttribute('aria-pressed', String(index === selectedIndex)));
    lesson.replaceChildren();
    const head = document.createElement('div'); head.className='recipe-lesson-head';
    const titleWrap = document.createElement('div'); const title = document.createElement('h3'); title.textContent=recipe.name;
    const meta = document.createElement('p'); meta.textContent=`5 illustrated steps · ${recipe.time}`; titleWrap.append(title,meta);
    const badge=document.createElement('span');badge.className='recipe-step-number';badge.textContent='Kitchen lesson';head.append(titleWrap,badge);
    const grid=document.createElement('div');grid.className='recipe-step-grid';
    recipe.steps.forEach((step,index)=>{
      const card=document.createElement('article');card.className='recipe-step-card';
      const picture=document.createElement('img');picture.className='recipe-step-picture';picture.alt=`Illustrated picture for ${recipe.name}, step ${index+1}: ${step[0]}`;picture.loading='lazy';picture.decoding='async';picture.src=`data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgArt(recipe.food,step[3],index))}`;
      const copy=document.createElement('div');copy.className='recipe-step-copy';const number=document.createElement('span');number.className='recipe-step-number';number.textContent=`Step ${index+1} of 5`;
      const heading=document.createElement('h4');heading.textContent=step[0];const text=document.createElement('p');text.textContent=step[1];const tip=document.createElement('small');tip.className='recipe-step-tip';tip.textContent=`Chef’s note · ${step[2]}`;copy.append(number,heading,text,tip);card.append(picture,copy);grid.append(card);
    });
    lesson.append(head,grid);
  }
  recipes.forEach((recipe,index)=>{
    const button=document.createElement('button');button.type='button';button.className='recipe-choice';button.dataset.recipe=recipe.id;button.setAttribute('aria-pressed',String(index===0));
    const image=document.createElement('img');image.src=recipe.image?`/assets/forbidden_bite/${recipe.image}`:`data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgArt(recipe.food,'plate',4))}`;image.alt='';image.loading='lazy';image.decoding='async';
    const info=document.createElement('span');const title=document.createElement('strong');title.textContent=recipe.name;const meta=document.createElement('small');meta.textContent=recipe.time;info.append(title,meta);button.append(image,info);
    button.addEventListener('click',()=>renderRecipe(recipe,index));choices.append(button);
  });
  renderRecipe(recipes[0],0);
})();
