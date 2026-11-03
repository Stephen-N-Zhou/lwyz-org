(() => {
  const calories = {
    'Smashed Cucumbers':'150–230','Forbidden Popcorn Chicken':'420–620','Pork & Chive Dumplings':'360–520','Crispy Spring Rolls':'280–420','Scallion Pancake':'320–480','Five-Spice Wings':'430–650','Shrimp Toast':'350–500','Seasonal Bao Buns (2)':'380–560',
    'Dragon Fire Noodles':'650–900','Empress’ Comfort':'600–850','Silken Path (Vegan)':'520–760','Golden Chill Udon':'480–700','Imperial Hot & Sour':'150–260','Lotus Root & Pork':'260–420','Spicy Wonton Soup':'350–520','Tofu Seaweed Soup':'120–220',
    'Char Siu Bowl':'600–850','Mapo Tofu Bowl':'550–800','Dragon Beef Bowl':'620–880','Golden Veggie Bowl':'480–700','Imperial Garlic Prawns':'420–620','Chili Crab Claws':'400–650','Ginger-Scallion Steamed Fish':'350–560','Golden Seafood Fried Rice':'550–800','Moonlight Fried Rice':'420–650','Charred Seasonal Greens':'140–260',
    'Mini Noodle Bowl':'300–460','Popcorn Chicken Bites':'250–390','Kids’ Fried Rice Cup':'240–360','Panda Dessert':'180–320','Noodle + Popcorn Chicken':'650–950','Small Bite + Drink':'220–620','Family Feast':'1,800–2,800 (shared)','Emperor’s Midnight Bowl':'550–850',
    'Sweet Sin':'260–390','Jade Pillows':'180–300','Red Moon Ice Cream':'200–340','Wolfberry Chrysanthemum Tea':'0–40','Jade Matcha Latte':'120–280','Lychee Sparkler':'90–180','Mandarin Blossom Cold Brew':'0–100',
    'Seafood Boil for Two':'1,400–2,200 (shared)','Peking Duck Celebration':'2,000–3,000 (shared)','Lobster Ginger Hot Pot':'1,200–1,900 (shared)','Black Pepper Wagyu Clay Pot':'850–1,300','Crispy Whole Sea Bass Feast':'1,000–1,600 (shared)',
    'Maple Ginger Pumpkin Dumplings':'380–560','Cider Braised Pork Noodles':'620–880','Chestnut Mushroom Clay Pot':'500–740','Crispy Pear Spring Rolls':'260–400','Pomegranate Lychee Sparkler':'90–180','Apple Cinnamon Sesame Mochi':'220–360'
  };
  const allergenRules = [
    ['Wheat',/noodle|udon|wonton|dumpling|bao|bun|pancake|spring roll|wrapper|toast|crisp|wheat|flour|pasta|soy sauce|soy dip|ginger soy|soy glaze/i],
    ['Soy',/soy|tofu|miso|edamame/i],['Sesame',/sesame/i],['Egg',/egg|mayonnaise|mayo/i],
    ['Milk',/milk|cream|butter|cheese|panna cotta|ice cream|ghee/i],['Shellfish',/shrimp|prawn|crab|lobster|mussel|seafood/i],
    ['Fish',/\bfish\b|sea bass|anchov|fish sauce/i],['Peanuts / tree nuts',/peanut|cashew|almond|walnut|chestnut|tree nut/i]
  ];
  const spice = dish => {
    const text=`${dish.name||''} ${dish.description||''}`.toLowerCase(), options=(dish.options||[]).map(value=>value.toLowerCase()), levels=[];
    if(options.some(value=>/no chili|no chilli|mild/.test(value))) levels.push('Mild');
    if(options.some(value=>/medium/.test(value))) levels.push('Medium');
    if(options.some(value=>/hot/.test(value))) levels.push('Hot');
    if(levels.length) return [...new Set(levels)].join(' / ');
    if(/ghost pepper|extra hot|very spicy|fiery hot/.test(text)) return 'Hot';
    if(/spicy|chili|chilli|pepper|mapo|dragon fire|hot & sour/.test(text)) return 'Medium';
    return 'Mild';
  };
  const details = dish => {
    const text=`${dish.name||''} ${dish.description||''} ${(dish.options||[]).join(' ')}`;
    const matches=allergenRules.filter(([,pattern])=>pattern.test(text)).map(([name])=>name);
    return {calories:calories[dish.name]||'Not estimated',allergens:matches.length?matches:['Not specified in this menu description'],spice:spice(dish)};
  };
  const render = (host,dish,{compact=false}={}) => {
    const info=details(dish),wrap=document.createElement('span');
    wrap.className=compact?'dish-info-compact':'dish-info-panel';
    const isShared=info.calories.includes('(shared)'),calorieAmount=info.calories.replace(' (shared)',''),calorieText=calorieAmount==='Not estimated'?'Not estimated':isShared?`${calorieAmount} kcal total for the shared dish (estimate)`:`${calorieAmount} kcal per dish (estimate)`;
    const rows=[['Calories',calorieText],['Potential allergens',info.allergens.join(', ')],['Spice',`${info.spice} (estimated)`]];
    rows.forEach(([label,value])=>{const row=document.createElement('span');row.className='dish-info-row';const heading=document.createElement('strong');heading.textContent=`${label}: `;heading.dataset.sourceText=heading.textContent;const content=document.createElement('span');content.textContent=value;content.dataset.sourceText=value;row.append(heading,content);wrap.append(row)});
    host.append(wrap);return wrap;
  };
  window.ForbiddenBiteDishInfo={details,render};
})();
