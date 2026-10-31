(()=>{
  const features={
    'Chef Mei Lin':{
      dish:'Dragon Fire Noodles',image:'/assets/forbidden_bite/food-photo-01.jpg',motion:'noodles',
      steps:[['Make the noodles','Mix, knead, rest, and roll the dough into long fresh strands.','🥢'],['Make the broth','Simmer ginger and toasted aromatics, then season with chili.','🥣'],['Cook noodles and broth together','Boil the noodles in the spicy broth until springy and tender.','♨'],['Add the beef','Cook thin slices of beef in the hot broth with greens.','🥩'],['Finish and serve','Top with scallions and chili oil, then serve steaming hot.','✨']],
      ingredient:'Fresh ginger',ingredientWhy:'It brings a clean, lively note to a slow-simmered broth.',
      tip:'Toast the aromatics briefly before adding broth to deepen their fragrance.',
      question:'How do you know when a broth is ready?',answer:'I taste for balance: the broth should feel savory first, then finish with a fresh lift from ginger or scallion.'
    },
    'Chef Jun Park':{
      dish:'Pork & Chive Dumplings',image:'/assets/forbidden_bite/food-photo-05.jpg',motion:'dumplings',
      steps:[['Mix the filling','Combine pork, chopped chives, ginger, and seasoning.','🥬'],['Prepare the wrappers','Roll dough thinly and cut into small round wrappers.','🥢'],['Fill and pleat','Add a little filling, fold, and press the pleats closed.','🥟'],['Sear the bottoms','Set dumplings in a hot pan until their bases turn golden.','🔥'],['Steam and serve','Add a splash of water, cover until tender, and serve with dip.','✨']],
      ingredient:'Scallions',ingredientWhy:'They add freshness and a little sweetness to wok dishes and dumplings.',
      tip:'For crisp dumplings, leave them undisturbed long enough to build a golden bottom.',
      question:'What is your trick for crispy dumplings?',answer:'Start with a hot pan, give each dumpling a little space, and let the bottoms brown before adding a small splash of water to steam.'
    },
    'Chef Anya Zhao':{
      dish:'Sweet Sin',image:'/assets/forbidden_bite/food-photo-21.jpg',motion:'dessert',
      steps:[['Toast the sesame','Warm black sesame gently until its aroma opens.','⚫'],['Blend the cream','Grind sesame and whisk it into a smooth, lightly sweet base.','🥣'],['Cook until silky','Warm the mixture slowly, stirring until it thickens gently.','♨'],['Chill to set','Pour into small cups and chill until delicate and cool.','❄'],['Pair and finish','Add toasted sesame and serve with fragrant jasmine tea.','🍵']],
      ingredient:'Jasmine tea',ingredientWhy:'Its floral aroma pairs gently with sesame and fruit desserts.',
      tip:'Let tea leaves open in hot water, then taste often so the delicate aroma stays clear.',
      question:'How do you pair tea with dessert?',answer:'I match the tea’s aroma to one note in the dessert, then keep the sweetness light so both flavors can shine.'
    },
    'Chef Lian Chen':{
      dish:'Wonton Soup',image:'/assets/forbidden_bite/food-photo-02.jpg',motion:'soup',
      steps:[['Fill the wontons','Spoon seasoned filling into wrappers and fold them closed.','🥟'],['Start the broth','Simmer a clear broth with ginger and white pepper.','🥣'],['Cook the wontons','Lower them into gently bubbling water until they float.','♨'],['Add fresh greens','Stir tender greens and scallions into the hot broth.','🥬'],['Ladle and serve','Set wontons in warm bowls and pour the broth over them.','✨']],
      ingredient:'White pepper',ingredientWhy:'A small pinch adds warmth to soup without covering its fragrance.',
      tip:'Season soup in stages; a little at the end can brighten a long-simmered pot.',
      question:'What makes a comforting soup?',answer:'A clear, balanced broth and one fresh finishing touch. I want every spoonful to feel warm without becoming heavy.'
    },
    'Chef David Wu':{
      dish:'Peking Duck Celebration',image:'/assets/forbidden_bite/food-photo-20.jpg',motion:'duck',
      steps:[['Prepare the duck','Dry the duck and season its skin for a crisp roast.','🦆'],['Mix the house glaze','Balance savory sauce, gentle sweetness, and warm spice.','🥣'],['Roast until crisp','Roast slowly until the skin turns deeply golden.','🔥'],['Slice and arrange','Cut thin slices beside pancakes, cucumber, and scallions.','🔪'],['Glaze and serve','Brush lightly with glaze and bring plum sauce to the table.','✨']],
      ingredient:'Black vinegar',ingredientWhy:'Its mellow tang gives rich sauces a clean, rounded finish.',
      tip:'Build a sauce by balancing salty, tangy, sweet, and spicy notes one small taste at a time.',
      question:'How do you balance a house sauce?',answer:'I adjust one flavor at a time. A little vinegar can lift richness, while sesame or a touch of honey softens the edges.'
    },
    'Chef Sofia Tran':{
      dish:'Smashed Cucumbers',image:'/assets/forbidden_bite/food-photo-06.jpg',motion:'cucumbers',
      steps:[['Wash and smash','Wash chilled cucumbers, then crack them into rough bite-size pieces.','🥒'],['Salt and drain','Toss with salt and rest briefly to keep the salad crisp.','🧂'],['Mix the dressing','Stir garlic, rice vinegar, sesame, and a little chili oil.','🥣'],['Toss it together','Coat the cucumber pieces evenly in the tangy dressing.','🥢'],['Chill and serve','Finish with sesame and serve cold and crunchy.','✨']],
      ingredient:'Market-fresh greens',ingredientWhy:'Their crisp texture and changing flavors inspire her seasonal plates.',
      tip:'Cook vegetables in small batches so the pan stays hot and their color stays vivid.',
      question:'How do you keep vegetables crisp?',answer:'Dry them well, heat the pan first, and avoid crowding it. A quick toss keeps the vegetables bright and lively.'
    },
    'Chef Marcus Lee':{
      dish:'Seafood Boil for Two',image:'/assets/forbidden_bite/food-photo-19.jpg',motion:'seafood',
      steps:[['Prepare the feast','Rinse the seafood and cut corn and potatoes for the pot.','🦐'],['Season the broth','Bring garlic, ginger, and spice to a fragrant simmer.','🥣'],['Cook the vegetables','Simmer potatoes and corn until just tender.','🌽'],['Add the seafood','Cook seafood in batches, taking each piece out as it turns tender.','♨'],['Toss and serve','Coat with citrus-garlic butter and bring the platter to the table.','✨']],
      ingredient:'Fresh ginger',ingredientWhy:'It adds a bright, clean accent to seafood and citrus.',
      tip:'Watch the cooking time closely; seafood stays tender when it comes off the heat promptly.',
      question:'How do you keep seafood tender?',answer:'I keep the heat steady and the cooking time short. Then I finish with ginger, scallion, or citrus for a fresh note.'
    },
    'Chef Priya Shah':{
      dish:'Moonlit Crystal Dumplings',image:'/assets/forbidden_bite/food-photo-05.jpg',motion:'crystal-dumplings',
      steps:[['Chop the vegetables','Dice the vegetables finely and season with ginger.','🥬'],['Prepare each wrapper','Lay out thin wrappers and keep their edges lightly moist.','🥢'],['Fill and pleat','Add a modest spoonful of filling and seal each edge.','🥟'],['Steam until tender','Arrange dumplings in a lined bamboo steamer and cook gently.','♨'],['Add the dipping sauce','Finish with scallions and a bright soy-vinegar dip.','✨']],
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
    videoHead.append(make('span','chef-feature-label','Three cooking videos'),make('span','chef-video-duration','5 recipe steps'));
    const chapterRanges=[{label:'1 · Prep',from:0,to:1},{label:'2 · Cook',from:2,to:3},{label:'3 · Finish',from:4,to:4}];
    const chapterNav=make('div','chef-video-chapters');chapterNav.setAttribute('role','group');chapterNav.setAttribute('aria-label',`${name} cooking video chapters`);
    const screen=make('div',`chef-video-screen scene-${feature.motion} phase-prep`);
    const dishImage=make('img','chef-video-dish');dishImage.src=feature.image;dishImage.alt=`Finished ${feature.dish}, featured in ${name}'s cooking video`;dishImage.loading='lazy';dishImage.decoding='async';
    const motion=make('div','chef-video-motion');motion.setAttribute('aria-hidden','true');for(let index=0;index<3;index++){const mote=make('span',`chef-video-mote chef-video-mote-${index+1}`);motion.append(mote)}
    const chefPortrait=card.querySelector('.chef-portrait')?.cloneNode();
    const chefPip=make('div','chef-video-chef');if(chefPortrait){chefPortrait.removeAttribute('width');chefPortrait.removeAttribute('height');chefPortrait.alt='';chefPortrait.loading='lazy';chefPip.append(chefPortrait)}chefPip.append(make('span','',name));
    const action=make('span','chef-video-action','🥢');action.setAttribute('aria-hidden','true');
    const overlay=make('div','chef-video-caption');
    const stepTitle=make('strong','chef-video-step','Step 1 of 5 · '+feature.steps[0][0]);
    const stepText=make('span','chef-video-instruction',feature.steps[0][1]);
    overlay.append(stepTitle,stepText);screen.append(dishImage,motion,chefPip,action,overlay);
    const progress=make('div','chef-video-progress');progress.setAttribute('role','progressbar');progress.setAttribute('aria-label',`${name} cooking video progress`);progress.setAttribute('aria-valuemin','0');progress.setAttribute('aria-valuemax',String(feature.steps.length));progress.setAttribute('aria-valuenow','0');const progressFill=make('span','');progress.append(progressFill);
    let activeChapter=0,stepIndex=0,timer=null;
    const play=make('button','chef-video-play','▶ Play video');play.type='button';play.setAttribute('aria-pressed','false');
    const chapterButtons=chapterRanges.map((chapter,index)=>{const button=make('button','chef-video-chapter',chapter.label);button.type='button';button.setAttribute('aria-pressed',String(index===0));button.addEventListener('click',()=>{if(timer)stop(false);activeChapter=index;chapterButtons.forEach((item,itemIndex)=>item.setAttribute('aria-pressed',String(itemIndex===index)));showStep(chapter.from);play.textContent='▶ Play video'});chapterNav.append(button);return button});
    const controls=make('div','chef-video-controls');
    controls.append(play,make('span','chef-video-dish-name',feature.dish));video.append(videoHead,chapterNav,screen,progress,controls);
    const stop=finished=>{clearInterval(timer);timer=null;screen.classList.remove('is-playing');play.setAttribute('aria-pressed','false');play.textContent=finished?'↻ Replay this video':'▶ Play video'};
    const showStep=index=>{stepIndex=index;const [title,copy,emoji]=feature.steps[index];stepTitle.textContent=`Step ${index+1} of 5 · ${title}`;stepText.textContent=copy;action.textContent=emoji;const chapterIndex=chapterRanges.findIndex(chapter=>index>=chapter.from&&index<=chapter.to);screen.classList.remove('phase-prep','phase-cook','phase-finish');screen.classList.add(`phase-${['prep','cook','finish'][chapterIndex]}`);progressFill.style.width=`${(index+1)/feature.steps.length*100}%`;progress.setAttribute('aria-valuenow',String(index+1));screen.classList.remove('chef-video-cut');void screen.offsetWidth;screen.classList.add('chef-video-cut')};
    play.addEventListener('click',()=>{const chapter=chapterRanges[activeChapter];if(timer){stop(false);return}if(stepIndex>=chapter.to)showStep(chapter.from);screen.classList.add('is-playing');play.setAttribute('aria-pressed','true');play.textContent='Ⅱ Pause video';timer=setInterval(()=>{if(stepIndex<chapter.to)showStep(stepIndex+1);else stop(true)},4000)});
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
