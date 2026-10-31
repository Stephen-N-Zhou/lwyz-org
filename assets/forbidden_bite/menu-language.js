(() => {
  const controls = [...document.querySelectorAll('[data-menu-language]')];
  if (!controls.length) return;
  const dishNames = {
    'Smashed Cucumbers':'拍黄瓜','Forbidden Popcorn Chicken':'秘制椒盐鸡米花','Pork & Chive Dumplings':'猪肉韭菜饺子','Crispy Spring Rolls':'香脆春卷','Scallion Pancake':'葱油饼','Five-Spice Wings':'五香鸡翅','Shrimp Toast':'金黄虾多士','Seasonal Bao Buns (2)':'时令包子（2个）',
    'Dragon Fire Noodles':'烈焰龙火面','Empress’ Comfort':'皇后暖心面','Silken Path (Vegan)':'丝绸之路素面','Golden Chill Udon':'金香冷乌冬','Imperial Hot & Sour':'宫廷酸辣汤','Lotus Root & Pork':'莲藕猪肉汤','Spicy Wonton Soup':'香辣馄饨汤','Tofu Seaweed Soup':'豆腐海带汤',
    'Char Siu Bowl':'叉烧饭','Mapo Tofu Bowl':'麻婆豆腐饭','Dragon Beef Bowl':'龙火牛肉饭','Golden Veggie Bowl':'金玉蔬菜饭','Imperial Garlic Prawns':'宫廷蒜香大虾','Chili Crab Claws':'香辣蟹钳','Ginger-Scallion Steamed Fish':'姜葱蒸鱼','Golden Seafood Fried Rice':'金香海鲜炒饭','Moonlight Fried Rice':'月光炒饭','Charred Seasonal Greens':'炙烤时蔬',
    'Mini Noodle Bowl':'迷你汤面','Popcorn Chicken Bites':'迷你鸡米花','Kids’ Fried Rice Cup':'儿童蛋炒饭杯','Panda Dessert':'熊猫冰淇淋','Noodle + Popcorn Chicken':'面条鸡米花套餐','Small Bite + Drink':'小食饮品套餐','Family Feast':'家庭分享盛宴','Emperor’s Midnight Bowl':'皇帝午夜面碗',
    'Sweet Sin':'黑芝麻奶冻','Jade Pillows':'翡翠麻薯','Red Moon Ice Cream':'红月红豆冰淇淋','Wolfberry Chrysanthemum Tea':'枸杞菊花茶','Jade Matcha Latte':'翡翠抹茶拿铁','Lychee Sparkler':'荔枝气泡饮','Mandarin Blossom Cold Brew':'柑橘花冷泡茶',
    'Seafood Boil for Two':'双人海鲜锅','Peking Duck Celebration':'北京烤鸭盛宴','Lobster Ginger Hot Pot':'姜葱龙虾火锅','Black Pepper Wagyu Clay Pot':'黑椒和牛煲','Crispy Whole Sea Bass Feast':'香脆整条海鲈鱼盛宴',
    'Pumpkin Lantern Dumplings':'南瓜灯笼饺子','Black Cat Chili Noodles':'黑猫香辣面','Ghost Pepper Wonton Soup':'幽灵椒馄饨汤','Moonlit Lychee Fizz':'月光荔枝气泡饮'
  };
  const dishDescriptions = {
    'Chilled cucumber, garlic, rice vinegar, sesame, and a little chili oil.':'冰镇黄瓜拌蒜、米醋、芝麻和少许辣椒油。','Crispy five-spice chicken with scallion and chili salt.':'酥脆五香鸡米花，搭配葱花和椒盐。','Pan-seared dumplings with ginger soy dip.':'香煎饺子，搭配姜香酱油蘸汁。','Vegetable rolls with a sweet chili dip.':'蔬菜春卷，搭配甜辣蘸酱。','Flaky layers served with sesame soy sauce.':'层层酥香，搭配芝麻酱油。','Crisp wings tossed with scallion and five-spice salt.':'酥炸鸡翅拌葱花和五香椒盐。','Golden sesame toast topped with seasoned shrimp.':'金黄芝麻吐司，铺上调味鲜虾。','Soft steamed buns with the chef’s seasonal filling.':'柔软蒸包，包入主厨时令馅料。',
    'Spicy broth, braised beef, bok choy, and chili crisp.':'香辣汤底、慢炖牛肉、小白菜和香脆辣椒。','Soy broth, roast pork, bamboo shoots, and a tea egg.':'酱香汤底、烤猪肉、竹笋和茶叶蛋。','Sesame broth, tofu, mushrooms, and scallions.':'芝麻汤底、豆腐、蘑菇和葱花。','Chilled udon, golden sesame sauce, cucumber, nori, and citrus.':'冰镇乌冬面配金香芝麻酱、黄瓜、海苔和柑橘。',
    'Tofu, shiitake, bamboo shoots, egg, and black vinegar.':'豆腐、香菇、竹笋、鸡蛋和黑醋。','Slow-simmered pork, lotus root, ginger, and scallion.':'慢炖猪肉、莲藕、姜和葱花。','Pork wontons, greens, and warming chili broth.':'猪肉馄饨、青菜和暖香辣汤。','Silken tofu and seaweed in a light ginger broth.':'嫩豆腐和海带浸在清淡姜汤中。',
    'Roast pork, jasmine rice, greens, and sesame.':'烤猪肉、茉莉香米、青菜和芝麻。','Silky tofu in a savory, gently spicy sauce.':'嫩滑豆腐配咸香微辣酱汁。','Braised beef, rice, and chili scallion sauce.':'慢炖牛肉、米饭和辣葱酱。','Seasonal vegetables, tofu, and sesame dressing.':'时令蔬菜、豆腐和芝麻酱汁。',
    'Garlic prawns with scallions and steamed rice.':'蒜香大虾、葱花和蒸米饭。','Crab claws in a sweet, savory chili sauce.':'蟹钳裹上甜咸香辣酱。','Steamed fish with ginger, scallion, and delicate soy.':'清蒸鲜鱼配姜、葱和淡酱油。','Wok-fried rice with seafood, egg, and scallion.':'海鲜、鸡蛋和葱花 wok 炒香米饭。','Jasmine rice, egg, scallion, and crisp garlic.':'茉莉香米、鸡蛋、葱花和脆蒜。','Market greens with garlic and sesame.':'时令青菜配蒜香和芝麻。',
    'A small noodle bowl with a gentle broth.':'小份面条，搭配温和汤底。','A kid-sized portion with a mild seasoning.':'儿童小份，调味温和。','A little cup of egg and scallion fried rice.':'小杯鸡蛋葱花炒饭。','A playful panda-shaped ice cream treat.':'可爱的熊猫造型冰淇淋。','A house noodle bowl with a side of chicken bites.':'招牌面碗，配一份鸡米花。','One small plate paired with a tea or soft drink.':'一份小食，搭配茶或软饮。','A shareable spread of noodles, rice, and small bites.':'适合分享的面食、米饭和小食组合。','A rotating seasonal noodle special from the chef.':'主厨轮换推出的时令特色面食。',
    'Black sesame panna cotta with toasted sesame.':'黑芝麻奶冻，撒上烘香芝麻。','Soft matcha mochi with a sweet red bean center.':'柔软抹茶麻薯，内含香甜红豆馅。','Creamy red bean ice cream with a sesame wafer.':'绵滑红豆冰淇淋，配芝麻薄脆。','A gently floral tea with wolfberry, served by the pot.':'花香柔和的枸杞茶，按壶供应。','Whisked matcha with steamed milk or poured over ice.':'现打抹茶，可选热牛奶或冰饮。','Lychee, citrus, and sparkling water over ice.':'荔枝、柑橘和冰镇气泡水。','Cold-brew tea with mandarin and a bright citrus finish.':'冷泡茶融合柑橘，清新明亮。',
    'Crab, shrimp, mussels, corn, and potatoes tossed in a fragrant garlic-chili butter. Served family-style with rice.':'螃蟹、鲜虾、贻贝、玉米和土豆拌入蒜香辣味黄油，配米饭供大家分享。','Crisp-skinned roast duck carved for the table with thin pancakes, cucumber, scallions, and plum sauce.':'烤鸭皮酥肉嫩，现场切片，搭配薄饼、黄瓜、葱丝和梅子酱。','Lobster, shrimp, tofu, mushrooms, and napa cabbage simmered in a fragrant ginger-scallion broth. Served with jasmine rice.':'龙虾、鲜虾、豆腐、蘑菇和白菜慢煮于姜葱汤底，配茉莉香米。','Sliced wagyu beef seared with black pepper, mushrooms, and scallions, served sizzling in a clay pot with jasmine rice.':'和牛片与黑胡椒、蘑菇和葱花煎香，盛入热砂锅，搭配茉莉香米。','Whole sea bass fried until crisp, finished with ginger-scallion sauce, and served with rice and seasonal greens.':'整条海鲈鱼炸至酥脆，淋上姜葱酱，配米饭和时令青菜。',
    'Pumpkin and shiitake folded in golden wrappers, pan-seared with ginger soy.':'南瓜和香菇包入金黄饺皮，以姜香酱油煎香。','Black sesame noodles with braised beef, chili oil, and charred scallions.':'黑芝麻面配慢炖牛肉、辣椒油和炙烤葱花。','Pork wontons in a peppery red broth with greens and a little garlic.':'猪肉馄饨浸在胡椒香红汤中，配青菜和少许蒜香。','Lychee, blood orange, and sparkling water with a sugared rosemary rim.':'荔枝、红橙与气泡水，杯口点缀糖霜迷迭香。'
  };
  const sections = {
    'Small Bites':'小食','Noodles':'面食','Soups':'汤品','Rice Bowls':'盖饭','Seafood & Sides':'海鲜与配菜','Kids, Combos & Specials':'儿童餐、套餐与特色菜','Desserts':'甜品','Drinks & Tea':'饮品与茶','Limited-Time Deals':'限时特惠',
    'A little something to start.':'开胃小食，开启这一餐。','Hand-pulled favorites, from warming broth to chilled udon.':'手作面食精选，从暖心汤面到清爽冷乌冬。','Comforting bowls, simmered for a little warmth.':'慢火炖煮的暖心汤品。','Served with jasmine rice and seasonal greens.':'搭配茉莉香米和时令青菜。','Fresh-from-the-sea favorites and dishes for sharing.':'鲜美海味与适合分享的佳肴。','Smaller portions, shareable sets, and a rotating chef’s special.':'小份餐点、分享套餐和主厨轮换特色菜。','A sweet ending, with a touch of jade and gold.':'以一抹翡翠与金色甜蜜收尾。','A warm pot, a cool glass, or something bright and sparkling.':'一壶暖茶、一杯清饮，或一份明亮气泡。','Five lavish, short-run feasts at special concept prices.':'五款限时奢享盛宴，采用概念特惠价。'
  };
  const tags = {'Vegan':'纯素','Vegetarian':'素食','Caffeine-free':'不含咖啡因','Nonalcoholic':'无酒精','Limited time':'限时','Serves 2':'适合2人','Serves 2–3':'适合2–3人','Serves 3–4':'适合3–4人','Premium':'精选'};
  const optionWords = {'Mild':'微辣','Medium':'中辣','Hot':'辣','No chili available':'可选不加辣','Sweet & spicy':'甜辣','Garlic butter':'蒜香黄油','Honey pepper':'蜂蜜黑椒','No chili':'不加辣','Classic':'经典','Vegan with mushrooms':'蘑菇纯素版','Chili butter':'辣味黄油','Pancakes and classic accompaniments':'薄饼及经典配菜','Ginger-scallion broth':'姜葱汤底','Mild chili broth':'微辣汤底','Mild pepper':'微辣黑椒','Extra black pepper':'加黑椒','Ginger-scallion sauce':'姜葱酱','Light soy glaze':'清淡酱油汁','Hot':'热饮','Iced':'冰饮','Oat milk available':'可选燕麦奶','Spice level varies by season':'辣度随季节调整'};
  const staticText = {
    'Full menu · ingredients, flavor notes & choices':'完整菜单 · 食材、风味与可选项','Explore the menu':'浏览菜单','Dish descriptions and customization options.':'菜品介绍与定制选项。','Print / Save takeout menu':'打印 / 保存外带菜单','Print or save the complete takeout menu as a PDF':'打印完整外带菜单或保存为 PDF','Add to cart':'加入购物车','Add to pretend cart':'加入模拟购物车',
    'Limited-time offers · shareable feasts':'限时优惠 · 分享盛宴','Specials worth gathering for':'相聚共享的特色佳肴','Five premium dishes at special concept prices.':'五款精选菜品，享概念优惠价。',
    'A little secret for younger diners':'给小小食客的秘密菜单','Open the Little Bites menu':'打开迷你精选菜单','Small plates · little prices':'小份餐点 · 亲民价格','Forbidden Bite · Little Bites':'Forbidden Bite · 迷你精选','Build a mini meal with one small appetizer, one small main, and one small dessert.':'选择一份迷你前菜、一份迷你主菜和一份迷你甜点，搭配成小餐。','1 · Small appetizer':'1 · 迷你前菜','Choose one to start':'请选择一道前菜','Choose an appetizer':'请选择前菜','Mini Spring Roll Duo · $3':'迷你春卷双份 · $3','Mini Smashed Cucumbers · $3':'迷你拍黄瓜 · $3','Two Little Dumplings · $4':'迷你饺子两只 · $4',
    '2 · Small main':'2 · 迷你主菜','Choose one little bowl':'请选择一份迷你主食','Choose a main':'请选择主菜','Mini Noodle Bowl · $6':'迷你汤面 · $6','Little Fried Rice Cup · $5':'迷你炒饭杯 · $5','Junior Dragon Beef Rice Bowl · $7':'迷你龙火牛肉饭 · $7','Small Tofu Rice Bowl · $5':'迷你豆腐饭 · $5',
    '3 · Small dessert':'3 · 迷你甜点','Finish with a sweet bite':'用一口甜品收尾','Choose a dessert':'请选择甜点','Panda Ice Cream Cup · $3':'熊猫冰淇淋杯 · $3','Jade Mochi Duo · $3':'翡翠麻薯双份 · $3','Little Red Bean Ice Cream · $3':'迷你红豆冰淇淋 · $3','Mini meal total':'迷你套餐总价','Choose all three to see your total':'选好三项后显示总价','Add Little Bites meal to pretend cart':'将迷你精选套餐加入模拟购物车','A fictional kids’ menu with smaller sample portions and prices. Cart and checkout are pretend only.':'虚构儿童菜单，提供较小份量和示例价格。购物车和结账仅为模拟。'
  };
  const all = {...dishNames,...dishDescriptions,...sections,...staticText};
  const translate = (text) => {
    const trimmed=text.trim();
    if(all[trimmed]) return text.replace(trimmed,all[trimmed]);
    if(tags[trimmed]) return text.replace(trimmed,tags[trimmed]);
    if(optionWords[trimmed]) return text.replace(trimmed,optionWords[trimmed]);
    if(trimmed.startsWith('Options: ')) return text.replace(trimmed,'可选项：'+trimmed.slice(9).split(' / ').map(word=>optionWords[word]||word).join(' / '));
    if(trimmed.includes(' · ')) return text.replace(trimmed,trimmed.split(' · ').map(word=>tags[word]||word).join(' · '));
    return text;
  };
  const setNodeText = (element, value) => {
    const textNode=[...element.childNodes].find(node=>node.nodeType===Node.TEXT_NODE);
    if(textNode) textNode.nodeValue=value; else element.textContent=value;
  };
  const remember = element => { if(element.dataset.sourceText===undefined) element.dataset.sourceText=element.textContent; };
  const apply = language => {
    const chinese=language==='zh';
    document.body.classList.toggle('menu-lang-zh',chinese);
    controls.forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.menuLanguage===language)));
    document.querySelectorAll('#menu-grid .card h3,#deal-grid .deal-card h3,#seasonal-menu-grid h3,#menu-grid .section-note,#deal-grid .section-note,#menu-grid .detail,#deal-grid .detail,#seasonal-menu-grid p,#menu-grid .meta,#deal-grid .meta,#menu-grid .options,#deal-grid .options,#menu-grid .add-to-cart,#deal-grid .add-to-cart,#seasonal-menu-grid button,.kids-menu-content :is(h2,p,small,strong,summary),.kids-menu-content option').forEach(element=>{
      remember(element);
      if(element.tagName==='OPTION'&&!element.hasAttribute('data-source-text')) element.dataset.sourceText=element.textContent;
      if(element.tagName==='H3'&&element.closest('li')){
        remember(element);const original=element.dataset.sourceText;const textNode=[...element.childNodes].find(node=>node.nodeType===Node.TEXT_NODE);if(textNode)textNode.nodeValue=chinese?(dishNames[original]||original):original;return;
      }
      const original=element.dataset.sourceText;
      if(element.classList.contains('options')||element.tagName==='OPTION'||element.classList.contains('meta')){setNodeText(element,chinese?translate(original):original);return}
      const value=chinese?(dishNames[original]||dishDescriptions[original]||sections[original]||staticText[original]||original):original;
      setNodeText(element,value);
    });
    document.querySelectorAll('#menu-grid li strong,#deal-grid li strong,#seasonal-menu-grid h3').forEach(element=>{
      remember(element);const original=element.dataset.sourceText;const textNode=[...element.childNodes].find(node=>node.nodeType===Node.TEXT_NODE);if(textNode)textNode.nodeValue=chinese?(dishNames[original]||original):original;
    });
    document.querySelectorAll('.menu-heading-tools p,.menu-section .section-label,.deals .section-label,.menu-section #menu-title,.print-menu-button,.kids-menu>summary small,.kids-menu>summary strong,.kids-menu-heading h2,.kids-menu-heading p,.kids-meal-builder label strong,.kids-meal-builder label small,.kids-menu-content .kids-menu-note,.kids-meal-add').forEach(element=>{
      remember(element);element.textContent=chinese?(staticText[element.dataset.sourceText]||sections[element.dataset.sourceText]||element.dataset.sourceText):element.dataset.sourceText;
    });
    window.dispatchEvent(new CustomEvent('forbidden-bite:menu-language',{detail:{language}}));
  };
  controls.forEach(button=>button.addEventListener('click',()=>{currentLanguage=button.dataset.menuLanguage;try{localStorage.setItem('forbidden-bite-menu-language',currentLanguage)}catch{}apply(currentLanguage)}));
  const observer=new MutationObserver(()=>apply(currentLanguage));
  ['menu-grid','deal-grid','seasonal-menu-grid'].forEach(id=>{const node=document.getElementById(id);if(node)observer.observe(node,{childList:true,subtree:true})});
  let currentLanguage='en';
  try{currentLanguage=localStorage.getItem('forbidden-bite-menu-language')==='zh'?'zh':'en'}catch{}
  apply(currentLanguage);
})();
