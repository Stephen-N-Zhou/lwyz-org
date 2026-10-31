(() => {
  const choices = document.getElementById('recipe-choices');
  const lesson = document.getElementById('recipe-lesson');
  const cover = document.getElementById('recipe-book-cover');
  const inside = document.getElementById('recipe-book-inside');
  const closeBook = document.getElementById('recipe-book-close');
  const previousPage = document.getElementById('recipe-book-previous');
  const nextPage = document.getElementById('recipe-book-next');
  const pageLabel = document.getElementById('recipe-book-page-label');
  if (!choices || !lesson || !cover || !inside) return;
  const recipes = [
    { id:'popcorn', name:'Forbidden Popcorn Chicken', image:'recipe-popcorn-05.webp', time:'30 min · Medium', food:'chicken', steps:[
      ['Cut and season','Cut boneless chicken into bite-size pieces. Pat them dry, then season with five-spice, salt, and white pepper.','A dry surface helps the coating cling.','board'],
      ['Coat each piece','Toss the chicken with a little starch until every piece has a thin, even coat. Shake off extra flour.','Work in small handfuls so the pieces stay separate.','bowl'],
      ['Fry until crisp','Lower a few pieces at a time into hot oil. Turn them once, then lift them out when deeply golden and cooked through.','Keep the pan uncrowded; hot oil needs room to recover.','wok'],
      ['Toss with five-spice','Drain the chicken briefly, then toss it with scallion, chili salt, and a pinch of five-spice while it is still hot.','Season while warm so the fragrant spices stick.','pan'],
      ['Garnish and serve','Pile the crisp bites on a platter and finish with fresh scallions. Serve the chili salt on the side.','Let the coating rest for a minute so it stays crunchy.','plate']
    ]},
    { id:'dumplings', name:'Pork & Chive Dumplings', image:'recipe-dumplings-05.webp', time:'50 min · Hands-on', food:'dumpling', steps:[
      ['Mix the filling','Combine ground pork, finely chopped chives, grated ginger, soy, and a little sesame oil. Mix until just sticky.','Cook a tiny test piece and adjust the seasoning before filling.','bowl'],
      ['Roll the wrappers','Rest the dough, then roll it into thin rounds. Keep the center a little thicker than the edge.','Cover unused dough so it does not dry out.','board'],
      ['Fill and pleat','Add a small spoonful of filling, fold the wrapper, and press several pleats closed along one side.','Leave a clean rim so the wrapper seals tightly.','board'],
      ['Boil gently','Slide the dumplings into gently boiling water in batches. Stir once to keep them from sticking.','They are ready when the wrappers look tender and the filling is cooked through.','pot'],
      ['Serve with ginger soy','Lift the dumplings out carefully and serve with ginger, soy, and rice-vinegar dipping sauce.','A little scallion makes a fresh finish.','plate']
    ]},
    { id:'pan-seared', name:'Pan-Seared Dumplings', image:'recipe-pan-seared-05.webp', time:'45 min · Medium', food:'dumpling', steps:[
      ['Prepare and fill','Set out the dumplings with their seams pressed closed and the bottoms flat.','Use a little less filling so each dumpling sits neatly in the pan.','board'],
      ['Warm the skillet','Heat a lightly oiled skillet over medium heat. Arrange dumplings flat-side down with space between them.','Give each dumpling a clear patch of pan for an even crust.','pan'],
      ['Sear the bottoms','Let the dumplings cook without moving them until their bottoms turn crisp and golden.','Lift one edge to check the color before adding water.','pan'],
      ['Cover and steam','Carefully add a small splash of water and cover the skillet. Let the steam cook the filling and soften the tops.','Keep your hand back as the water hits the hot pan.','pan'],
      ['Uncover and serve','Remove the lid and let the last moisture cook away. Loosen the golden bottoms and serve crisp-side up.','Finish with scallions and a ginger-soy dip.','plate']
    ]},
    { id:'cucumbers', name:'Smashed Cucumbers', image:'recipe-cucumbers-05.webp', time:'15 min · Easy', food:'cucumber', steps:[
      ['Wash and smash','Dry the cucumbers. Lay them on a board and gently crack them with the flat side of a cleaver, then cut into rough pieces.','Cracking the skin gives the dressing more places to cling.','board'],
      ['Salt and drain','Toss the cucumber pieces with a pinch of salt and let them drain briefly in a bowl or colander.','Pat away extra moisture for a crisper salad.','bowl'],
      ['Whisk the dressing','Stir together minced garlic, rice vinegar, soy, sesame, and a little chili oil. Taste and balance the tang.','Add chili oil gradually so the heat stays gentle.','bowl'],
      ['Toss until coated','Add the drained cucumbers and toss until the dressing reaches all the cracked edges.','Use a wide bowl so the pieces stay crisp instead of crushed.','mix'],
      ['Chill and finish','Chill briefly, then scatter sesame and scallions over the salad just before serving.','Serve cold while the cucumbers still have a clean crunch.','plate']
    ]}
  ];
  function renderRecipe(recipe, selectedIndex, direction = '') {
    const turningPage = direction ? lesson.cloneNode(true) : null;
    choices.querySelectorAll('.recipe-choice').forEach((item, index) => item.setAttribute('aria-pressed', String(index === selectedIndex)));
    lesson.replaceChildren();
    const head = document.createElement('div'); head.className='recipe-lesson-head';
    const titleWrap = document.createElement('div'); const title = document.createElement('h3'); title.textContent=recipe.name;
    const meta = document.createElement('p'); meta.textContent=`5 photo steps · ${recipe.time}`; titleWrap.append(title,meta);
    const badge=document.createElement('span');badge.className='recipe-step-number';badge.textContent='Kitchen lesson';head.append(titleWrap,badge);
    const grid=document.createElement('div');grid.className='recipe-step-grid';
    recipe.steps.forEach((step,index)=>{
      const card=document.createElement('article');card.className='recipe-step-card';
      const picture=document.createElement('img');picture.className='recipe-step-picture';picture.alt=`AI-generated cooking photo for ${recipe.name}, step ${index+1}: ${step[0]}`;picture.loading='lazy';picture.decoding='async';picture.src=`/assets/forbidden_bite/recipe-${recipe.id}-${String(index+1).padStart(2,'0')}.webp`;
      const copy=document.createElement('div');copy.className='recipe-step-copy';const number=document.createElement('span');number.className='recipe-step-number';number.textContent=`Step ${index+1} of 5`;
      const heading=document.createElement('h4');heading.textContent=step[0];const text=document.createElement('p');text.textContent=step[1];const tip=document.createElement('small');tip.className='recipe-step-tip';tip.textContent=`Chef’s note · ${step[2]}`;copy.append(number,heading,text,tip);card.append(picture,copy);grid.append(card);
    });
    lesson.append(head,grid);
    if (turningPage) {
      turningPage.removeAttribute('id');
      turningPage.classList.add('recipe-page-turner', `turn-${direction}`);
      turningPage.setAttribute('aria-hidden', 'true');
      turningPage.querySelectorAll('[id]').forEach(element => element.removeAttribute('id'));
      lesson.append(turningPage);
      turningPage.addEventListener('animationend', () => turningPage.remove(), { once: true });
      window.setTimeout(() => turningPage.remove(), 750);
    }
    if (pageLabel) pageLabel.textContent = `Recipe ${selectedIndex + 1} of ${recipes.length}`;
  }
  recipes.forEach((recipe,index)=>{
    const button=document.createElement('button');button.type='button';button.className='recipe-choice';button.dataset.recipe=recipe.id;button.setAttribute('aria-pressed',String(index===0));
    const image=document.createElement('img');image.src=`/assets/forbidden_bite/${recipe.image}`;image.alt='';image.loading='lazy';image.decoding='async';
    const info=document.createElement('span');const title=document.createElement('strong');title.textContent=recipe.name;const meta=document.createElement('small');meta.textContent=recipe.time;info.append(title,meta);button.append(image,info);
    choices.append(button);
  });
  let selectedRecipe = 0;
  const renderSelected = (index, direction = '') => {
    selectedRecipe = (index + recipes.length) % recipes.length;
    renderRecipe(recipes[selectedRecipe],selectedRecipe,direction);
  };
  // Every contents entry turns to the selected recipe page.
  choices.querySelectorAll('.recipe-choice').forEach((button,index)=>{
    button.addEventListener('click',()=>renderSelected(index,index===selectedRecipe?'':index>selectedRecipe?'next':'previous'));
  });
  previousPage?.addEventListener('click',()=>renderSelected(selectedRecipe-1,'previous'));
  nextPage?.addEventListener('click',()=>renderSelected(selectedRecipe+1,'next'));
  cover.addEventListener('click',()=>{
    inside.hidden=false;
    cover.setAttribute('aria-expanded','true');
    cover.classList.add('is-opening');
    window.setTimeout(()=>{cover.hidden=true;cover.classList.remove('is-opening');choices.querySelector('.recipe-choice')?.focus();},620);
  });
  closeBook?.addEventListener('click',()=>{
    cover.hidden=false;
    inside.hidden=true;
    cover.setAttribute('aria-expanded','false');
    cover.focus();
  });
  renderRecipe(recipes[0],0);
})();
