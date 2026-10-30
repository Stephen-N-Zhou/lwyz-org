(()=>{
  const features={
    'Chef Mei Lin':{
      ingredient:'Fresh ginger',ingredientWhy:'It brings a clean, lively note to a slow-simmered broth.',
      tip:'Toast the aromatics briefly before adding broth to deepen their fragrance.',
      question:'How do you know when a broth is ready?',answer:'I taste for balance: the broth should feel savory first, then finish with a fresh lift from ginger or scallion.'
    },
    'Chef Jun Park':{
      ingredient:'Scallions',ingredientWhy:'They add freshness and a little sweetness to wok dishes and dumplings.',
      tip:'For crisp dumplings, leave them undisturbed long enough to build a golden bottom.',
      question:'What is your trick for crispy dumplings?',answer:'Start with a hot pan, give each dumpling a little space, and let the bottoms brown before adding a small splash of water to steam.'
    },
    'Chef Anya Zhao':{
      ingredient:'Jasmine tea',ingredientWhy:'Its floral aroma pairs gently with sesame and fruit desserts.',
      tip:'Let tea leaves open in hot water, then taste often so the delicate aroma stays clear.',
      question:'How do you pair tea with dessert?',answer:'I match the tea’s aroma to one note in the dessert, then keep the sweetness light so both flavors can shine.'
    },
    'Chef Lian Chen':{
      ingredient:'White pepper',ingredientWhy:'A small pinch adds warmth to soup without covering its fragrance.',
      tip:'Season soup in stages; a little at the end can brighten a long-simmered pot.',
      question:'What makes a comforting soup?',answer:'A clear, balanced broth and one fresh finishing touch. I want every spoonful to feel warm without becoming heavy.'
    },
    'Chef David Wu':{
      ingredient:'Black vinegar',ingredientWhy:'Its mellow tang gives rich sauces a clean, rounded finish.',
      tip:'Build a sauce by balancing salty, tangy, sweet, and spicy notes one small taste at a time.',
      question:'How do you balance a house sauce?',answer:'I adjust one flavor at a time. A little vinegar can lift richness, while sesame or a touch of honey softens the edges.'
    },
    'Chef Sofia Tran':{
      ingredient:'Market-fresh greens',ingredientWhy:'Their crisp texture and changing flavors inspire her seasonal plates.',
      tip:'Cook vegetables in small batches so the pan stays hot and their color stays vivid.',
      question:'How do you keep vegetables crisp?',answer:'Dry them well, heat the pan first, and avoid crowding it. A quick toss keeps the vegetables bright and lively.'
    },
    'Chef Marcus Lee':{
      ingredient:'Fresh ginger',ingredientWhy:'It adds a bright, clean accent to seafood and citrus.',
      tip:'Watch the cooking time closely; seafood stays tender when it comes off the heat promptly.',
      question:'How do you keep seafood tender?',answer:'I keep the heat steady and the cooking time short. Then I finish with ginger, scallion, or citrus for a fresh note.'
    },
    'Chef Priya Shah':{
      ingredient:'Scallions',ingredientWhy:'They bring a fresh, savory note to dumpling fillings and dipping sauces.',
      tip:'Use a little less filling than you think you need so the wrapper seals neatly.',
      question:'How do you get a neat dumpling fold?',answer:'Keep the wrapper edge clean, add a modest spoonful of filling, and press out extra air as you seal each pleat.'
    }
  };
  const make=(tag,className,text)=>{const node=document.createElement(tag);node.className=className;if(text)node.textContent=text;return node};
  document.querySelectorAll('.chef-profile').forEach(card=>{
    const name=card.querySelector('h3')?.textContent.trim(),feature=features[name];
    if(!feature)return;
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
    if(stats){card.insertBefore(notes,stats);card.insertBefore(ask,stats)}else card.append(notes,ask);
  });
})();
