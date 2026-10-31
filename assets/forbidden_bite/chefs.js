(()=>{
  const features={
    'Chef Mei Lin':{
      dish:'Dragon Fire Noodles',image:'/assets/forbidden_bite/food-photo-01.jpg',
      steps:[['Prep the noodles','Set out fresh noodles, beef, ginger, and scallions.','🥢'],['Build the broth','Warm the broth with toasted aromatics and a little chili.','🥣'],['Cook the bowl','Simmer the beef, then lift the noodles through the spicy broth.','♨'],['Finish and serve','Add scallions and chili oil; serve while the bowl is steaming.','✨']],
      ingredient:'Fresh ginger',ingredientWhy:'It brings a clean, lively note to a slow-simmered broth.',
      tip:'Toast the aromatics briefly before adding broth to deepen their fragrance.',
      question:'How do you know when a broth is ready?',answer:'I taste for balance: the broth should feel savory first, then finish with a fresh lift from ginger or scallion.'
    },
    'Chef Jun Park':{
      dish:'Pork & Chive Dumplings',image:'/assets/forbidden_bite/food-photo-05.jpg',
      steps:[['Mix the filling','Combine pork, chopped chives, ginger, and seasoning.','🥬'],['Fold the dumplings','Spoon filling into wrappers and press the pleats closed.','🥟'],['Sear the bottoms','Set dumplings in a hot pan until the bases turn golden.','🔥'],['Steam and plate','Add a splash of water, cover until tender, then serve with dip.','✨']],
      ingredient:'Scallions',ingredientWhy:'They add freshness and a little sweetness to wok dishes and dumplings.',
      tip:'For crisp dumplings, leave them undisturbed long enough to build a golden bottom.',
      question:'What is your trick for crispy dumplings?',answer:'Start with a hot pan, give each dumpling a little space, and let the bottoms brown before adding a small splash of water to steam.'
    },
    'Chef Anya Zhao':{
      dish:'Sweet Sin',image:'/assets/forbidden_bite/food-photo-21.jpg',
      steps:[['Toast the sesame','Warm black sesame gently until its aroma opens.','⚫'],['Make it silky','Whisk sesame into a smooth, lightly sweet cream base.','🥣'],['Chill to set','Pour into small cups and let the dessert turn delicate and cool.','❄'],['Add the finish','Top with toasted sesame and serve with a fragrant cup of tea.','🍵']],
      ingredient:'Jasmine tea',ingredientWhy:'Its floral aroma pairs gently with sesame and fruit desserts.',
      tip:'Let tea leaves open in hot water, then taste often so the delicate aroma stays clear.',
      question:'How do you pair tea with dessert?',answer:'I match the tea’s aroma to one note in the dessert, then keep the sweetness light so both flavors can shine.'
    },
    'Chef Lian Chen':{
      dish:'Wonton Soup',image:'/assets/forbidden_bite/food-photo-02.jpg',
      steps:[['Prepare the wontons','Fill wrappers with a small spoonful of seasoned filling.','🥟'],['Warm the broth','Simmer a clear broth with ginger and a little white pepper.','🥣'],['Cook until tender','Lower wontons into gently bubbling water until they float.','♨'],['Bring it together','Add greens and scallions, then ladle everything into a warm bowl.','✨']],
      ingredient:'White pepper',ingredientWhy:'A small pinch adds warmth to soup without covering its fragrance.',
      tip:'Season soup in stages; a little at the end can brighten a long-simmered pot.',
      question:'What makes a comforting soup?',answer:'A clear, balanced broth and one fresh finishing touch. I want every spoonful to feel warm without becoming heavy.'
    },
    'Chef David Wu':{
      dish:'Peking Duck Celebration',image:'/assets/forbidden_bite/food-photo-20.jpg',
      steps:[['Prep the glaze','Stir a glossy mix of savory sauce, gentle sweetness, and spice.','🥣'],['Roast until crisp','Cook the duck until the skin is deeply golden and crisp.','🔥'],['Slice and arrange','Cut thin slices and set them beside pancakes and fresh scallions.','🔪'],['Serve with sauce','Brush on a little glaze and bring the plum sauce to the table.','✨']],
      ingredient:'Black vinegar',ingredientWhy:'Its mellow tang gives rich sauces a clean, rounded finish.',
      tip:'Build a sauce by balancing salty, tangy, sweet, and spicy notes one small taste at a time.',
      question:'How do you balance a house sauce?',answer:'I adjust one flavor at a time. A little vinegar can lift richness, while sesame or a touch of honey softens the edges.'
    },
    'Chef Sofia Tran':{
      dish:'Smashed Cucumbers',image:'/assets/forbidden_bite/food-photo-06.jpg',
      steps:[['Break the cucumbers','Crack chilled cucumbers into bite-size pieces for rough edges.','🥒'],['Season and rest','Toss with salt and let the crisp pieces release extra water.','🧂'],['Make it bright','Add garlic, rice vinegar, sesame, and a little chili oil.','🥣'],['Chill and serve','Finish with sesame and serve cold for a crunchy, tangy bite.','✨']],
      ingredient:'Market-fresh greens',ingredientWhy:'Their crisp texture and changing flavors inspire her seasonal plates.',
      tip:'Cook vegetables in small batches so the pan stays hot and their color stays vivid.',
      question:'How do you keep vegetables crisp?',answer:'Dry them well, heat the pan first, and avoid crowding it. A quick toss keeps the vegetables bright and lively.'
    },
    'Chef Marcus Lee':{
      dish:'Seafood Boil for Two',image:'/assets/forbidden_bite/food-photo-19.jpg',
      steps:[['Start the seasoned pot','Bring a fragrant broth to a lively simmer with corn and potatoes.','🥔'],['Add seafood in turns','Cook each seafood ingredient just until tender.','🦐'],['Toss with the sauce','Coat the platter with garlic, citrus, and a touch of chili.','🥣'],['Set out the feast','Scatter scallions over the platter and serve it family-style.','✨']],
      ingredient:'Fresh ginger',ingredientWhy:'It adds a bright, clean accent to seafood and citrus.',
      tip:'Watch the cooking time closely; seafood stays tender when it comes off the heat promptly.',
      question:'How do you keep seafood tender?',answer:'I keep the heat steady and the cooking time short. Then I finish with ginger, scallion, or citrus for a fresh note.'
    },
    'Chef Priya Shah':{
      dish:'Moonlit Crystal Dumplings',image:'/assets/forbidden_bite/food-photo-05.jpg',
      steps:[['Make a light filling','Mix finely chopped vegetables with ginger and seasoning.','🥬'],['Fill and pleat','Add a modest spoonful to each wrapper and seal the edge.','🥟'],['Steam until tender','Arrange dumplings in a lined bamboo steamer and cook gently.','♨'],['Serve with a dip','Finish with scallions and a bright soy-vinegar dipping sauce.','✨']],
      ingredient:'Scallions',ingredientWhy:'They bring a fresh, savory note to dumpling fillings and dipping sauces.',
      tip:'Use a little less filling than you think you need so the wrapper seals neatly.',
      question:'How do you get a neat dumpling fold?',answer:'Keep the wrapper edge clean, add a modest spoonful of filling, and press out extra air as you seal each pleat.'
    }
  };
  const make=(tag,className,text)=>{const node=document.createElement(tag);node.className=className;if(text)node.textContent=text;return node};
  document.querySelectorAll('.chef-profile').forEach(card=>{
    const name=card.querySelector('h3')?.textContent.trim(),feature=features[name];
    if(!feature)return;
    const video=make('section','chef-video-demo');
    const videoHead=make('div','chef-video-head');
    videoHead.append(make('span','chef-feature-label','Animated cooking video'),make('span','chef-video-duration','4 steps · about 16 seconds'));
    const screen=make('div','chef-video-screen');
    const dishImage=make('img','chef-video-dish');dishImage.src=feature.image;dishImage.alt=`Finished ${feature.dish}, featured in ${name}'s cooking video`;dishImage.loading='lazy';dishImage.decoding='async';
    const chefPortrait=card.querySelector('.chef-portrait')?.cloneNode();
    const chefPip=make('div','chef-video-chef');if(chefPortrait){chefPortrait.removeAttribute('width');chefPortrait.removeAttribute('height');chefPortrait.alt='';chefPortrait.loading='lazy';chefPip.append(chefPortrait)}chefPip.append(make('span','',name));
    const action=make('span','chef-video-action','🥢');action.setAttribute('aria-hidden','true');
    const overlay=make('div','chef-video-caption');
    const stepTitle=make('strong','chef-video-step','Step 1 · '+feature.steps[0][0]);
    const stepText=make('span','chef-video-instruction',feature.steps[0][1]);
    overlay.append(stepTitle,stepText);screen.append(dishImage,chefPip,action,overlay);
    const progress=make('div','chef-video-progress');progress.setAttribute('role','progressbar');progress.setAttribute('aria-label',`${name} cooking video progress`);progress.setAttribute('aria-valuemin','0');progress.setAttribute('aria-valuemax',String(feature.steps.length));progress.setAttribute('aria-valuenow','0');const progressFill=make('span','');progress.append(progressFill);
    const controls=make('div','chef-video-controls');
    const play=make('button','chef-video-play','▶ Play demo');play.type='button';play.setAttribute('aria-pressed','false');
    controls.append(play,make('span','chef-video-dish-name',feature.dish));video.append(videoHead,screen,progress,controls);
    let stepIndex=0,timer=null;
    const stop=finished=>{clearInterval(timer);timer=null;screen.classList.remove('is-playing');play.setAttribute('aria-pressed','false');play.textContent=finished?'↻ Replay demo':'▶ Play demo'};
    const showStep=index=>{stepIndex=index;const [title,copy,emoji]=feature.steps[index];stepTitle.textContent=`Step ${index+1} · ${title}`;stepText.textContent=copy;action.textContent=emoji;progressFill.style.width=`${(index+1)/feature.steps.length*100}%`;progress.setAttribute('aria-valuenow',String(index+1));screen.classList.remove('chef-video-cut');void screen.offsetWidth;screen.classList.add('chef-video-cut')};
    play.addEventListener('click',()=>{if(timer){stop(false);return}if(stepIndex===feature.steps.length-1)showStep(0);screen.classList.add('is-playing');play.setAttribute('aria-pressed','true');play.textContent='Ⅱ Pause demo';timer=setInterval(()=>{if(stepIndex<feature.steps.length-1)showStep(stepIndex+1);else stop(true)},4000)});
    const notes=make('div','chef-feature-notes');
    const ingredient=make('div','chef-feature-item');
    ingredient.append(make('span','chef-feature-label','Favorite ingredient'),make('strong','',feature.ingredient),make('p','',feature.ingredientWhy));
    const tip=make('div','chef-feature-item');
    tip.append(make('span','chef-feature-label','Chef’s quick tip'),make('p','',feature.tip));
    notes.append(ingredient,tip);
    const ask=make('details','chef-ask');
    const summary=make('summary','','Ask '+name+' a question');
    const answer=make('div','chef-ask-answer');
    answer.append(make('p','chef-ask-question','“'+feature.question+'”'),make('p','',feature.answer));
    ask.append(summary,answer);
    const stats=card.querySelector('.chef-mini-stats');
    if(stats){card.insertBefore(video,stats);card.insertBefore(notes,stats);card.insertBefore(ask,stats)}else card.append(video,notes,ask);
  });
})();
