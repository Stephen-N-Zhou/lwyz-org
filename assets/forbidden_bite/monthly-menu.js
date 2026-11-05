(()=> {
  const months=[
    {title:'Winter Lantern Table',intro:'New Year comfort with bright citrus, warm ginger, and dishes made for sharing.',mark:'❄️',specials:[
      ['Snow-Pea Dumpling Basket','Tender pork and chive dumplings with snow peas and a ginger-black-vinegar dip.',14,'🥟',['Limited release']],
      ['Winter Citrus Chicken Noodles','Roast chicken, wheat noodles, greens, and a clear broth brightened with mandarin.',18,'🍜',[]],
      ['Pear Blossom Sesame Cups','Warm pear, black sesame cream, and crisp rice pearls.',9,'🍐',['Vegetarian']]
    ],deals:[
      ['Winter Reunion Seafood Pot','Lobster, crab, shrimp, napa cabbage, and mushrooms in ginger-scallion broth for sharing.',96,118,['Ginger broth','Mild chili broth'],['Serves 3–4']],
      ['Golden Lantern Peking Duck','Crisp roast duck with pancakes, cucumber, scallions, and plum sauce.',92,112,['Classic pancake set'],['Serves 3–4']],
      ['Snowcap Whole Sea Bass','Whole sea bass with ginger, scallion, fragrant rice, and winter greens.',68,84,['Ginger-scallion sauce'],['Serves 2–3']],
      ['Black Pepper Wagyu Hot Pot','Wagyu, mushrooms, tofu, and greens simmered tableside in pepper broth.',88,108,['Mild pepper','Extra pepper'],['Serves 2']]
    ]},
    {title:'Red Lantern Supper',intro:'A cozy February table of rosy fruit, crisp edges, and warming shared plates.',mark:'🏮',specials:[
      ['Rose-Soy Heart Dumplings','Hand-folded dumplings with chicken, cabbage, and a fragrant rose-ginger dip.',14,'🥟',[]],
      ['Red Date Beef Noodle Bowl','Slow-braised beef, wheat noodles, greens, and a gently sweet red-date broth.',20,'🍜',[]],
      ['Lychee Rose Jelly','Lychee jelly, rose cream, and a sprinkle of toasted sesame.',9,'🍮',['Vegetarian']]
    ],deals:[
      ['Red Lantern Crab Feast','Snow crab, shrimp, corn, potatoes, and scallion chili butter for the table.',84,104,['Garlic butter','Chili butter'],['Serves 2–3']],
      ['Rosewood Peking Duck','Crisp duck, warm pancakes, scallions, cucumber, and plum-hoisin sauce.',94,116,['Classic pancake set'],['Serves 3–4']],
      ['Lobster Heart Hot Pot','Lobster, shrimp, tofu, and mushrooms in a fragrant rose-ginger broth.',88,108,['Ginger broth','Mild chili broth'],['Serves 2']],
      ['Wagyu & Shiitake Clay Pot','Sliced wagyu, shiitake, and scallions over sizzling jasmine rice.',76,94,['Mild pepper','Extra pepper'],['Serves 2']]
    ]},
    {title:'Spring Garden Menu',intro:'Fresh greens, tender mushrooms, and delicate tea notes welcome the first spring days.',mark:'🌱',specials:[
      ['Spring Pea Scallion Dumplings','Green peas, chives, and tofu in thin wrappers with a light sesame dip.',13,'🥟',['Vegetarian']],
      ['Bamboo Shoot Noodle Soup','Wheat noodles, tender bamboo shoots, shiitake, and spring onion broth.',17,'🍜',['Vegan']],
      ['Strawberry Jasmine Pudding','Jasmine-set pudding with fresh strawberry and crisp rice crumble.',9,'🍓',['Vegetarian']]
    ],deals:[
      ['Spring Tide Seafood Boil','Crab, shrimp, mussels, new potatoes, and corn in lemon-garlic butter.',82,100,['Garlic butter','Chili butter'],['Serves 2–3']],
      ['Garden Feast Peking Duck','Roast duck with spring-herb pancakes, cucumber, scallions, and plum sauce.',92,112,['Classic pancake set'],['Serves 3–4']],
      ['Lobster Bamboo Hot Pot','Lobster, shrimp, tofu, bamboo shoots, and greens in ginger broth.',86,106,['Ginger broth','Mild chili broth'],['Serves 2']],
      ['Wagyu Spring Mushroom Pot','Wagyu and spring mushrooms served sizzling with jasmine rice.',78,96,['Mild pepper','Extra pepper'],['Serves 2']]
    ]},
    {title:'Jade Rain Collection',intro:'A fresh April menu with crisp vegetables, gentle heat, and bright ginger-citrus finishes.',mark:'🌧️',specials:[
      ['Jade Garden Dumplings','Spinach, mushroom, and cabbage dumplings with scallion-vinegar sauce.',13,'🥟',['Vegan']],
      ['Rainy Day Ginger Udon','Thick udon, tofu, bok choy, and shiitake in ginger broth.',17,'🍜',['Vegetarian']],
      ['Honey Pomelo Tea Cake','Soft tea cake with pomelo, honey, and a light sesame crunch.',8,'🍰',['Vegetarian']]
    ],deals:[
      ['Jade Coast Crab Boil','Snow crab, shrimp, clams, potatoes, and corn in ginger-lime butter.',86,106,['Ginger butter','Chili-lime butter'],['Serves 2–3']],
      ['Rain Garden Duck Table','Crisp duck with scallion pancakes, cucumber, and plum-ginger sauce.',94,116,['Classic pancake set'],['Serves 3–4']],
      ['Lobster Jade Broth Hot Pot','Lobster, shrimp, tofu, and spring greens in jade pepper broth.',88,108,['Jade pepper broth','Mild ginger broth'],['Serves 2']],
      ['Wagyu Peppercorn Rice Pot','Sizzling wagyu, mushrooms, and scallions over jasmine rice.',78,96,['Mild pepper','Extra pepper'],['Serves 2']]
    ]},
    {title:'Garden Tea Table',intro:'May’s menu pairs garden herbs, mellow tea, and sunny seasonal produce.',mark:'🍵',specials:[
      ['Chive Blossom Dumplings','Pork, chive blossoms, and ginger folded into pan-seared dumplings.',14,'🥟',[]],
      ['Tea-Smoked Mushroom Noodles','Wheat noodles with tea-smoked mushrooms, greens, and sesame broth.',18,'🍜',['Vegetarian']],
      ['Mango Chrysanthemum Cup','Fresh mango, chrysanthemum jelly, and coconut cream.',9,'🥭',['Vegetarian']]
    ],deals:[
      ['Garden Party Seafood Boil','Crab, shrimp, scallops, corn, and potatoes with garden-herb butter.',88,108,['Herb butter','Chili butter'],['Serves 2–3']],
      ['Jasmine Peking Duck Feast','Roast duck with jasmine-scented pancakes and classic accompaniments.',96,118,['Classic pancake set'],['Serves 3–4']],
      ['Lobster Garden Hot Pot','Lobster, shrimp, tofu, and herbs in a delicate tea-ginger broth.',88,108,['Tea-ginger broth','Mild chili broth'],['Serves 2']],
      ['Wagyu Tea-House Clay Pot','Wagyu, shiitake, and scallions in a sizzling clay pot with rice.',80,98,['Mild pepper','Extra pepper'],['Serves 2']]
    ]},
    {title:'Summer Market Table',intro:'June brings cool noodles, peak-season vegetables, and a bright fruit finish.',mark:'☀️',specials:[
      ['Market Corn Dumplings','Sweet corn, cabbage, and scallion dumplings with chili-lime dip.',13,'🥟',['Vegetarian']],
      ['Chilled Sesame Cucumber Noodles','Cool wheat noodles, smashed cucumber, sesame, and a tangy soy dressing.',16,'🍜',['Vegetarian']],
      ['Peach Lychee Ice Cup','Peach, lychee, and jasmine ice with a touch of lime.',8,'🍑',['Vegan']]
    ],deals:[
      ['Summer Dockside Seafood Boil','Crab, shrimp, mussels, sweet corn, and potatoes in lemon-chili butter.',86,106,['Lemon butter','Chili butter'],['Serves 2–3']],
      ['Market Peking Duck Feast','Crisp duck, warm pancakes, market cucumber, and plum sauce.',94,116,['Classic pancake set'],['Serves 3–4']],
      ['Lobster Sweet-Corn Hot Pot','Lobster, shrimp, corn, tofu, and greens in a sweet-corn broth.',88,108,['Corn broth','Mild chili broth'],['Serves 2']],
      ['Wagyu Summer Pepper Pot','Wagyu and seasonal mushrooms over sizzling jasmine rice.',78,96,['Mild pepper','Extra pepper'],['Serves 2']]
    ]},
    {title:'Firecracker Feast',intro:'July’s lively menu layers smoky aromatics, garden crunch, and cool fruit.',mark:'🎆',specials:[
      ['Firecracker Chicken Dumplings','Chicken, cabbage, and scallion with a bright chili-vinegar dip.',14,'🥟',[]],
      ['Charred Pepper Beef Noodles','Seared beef, wheat noodles, sweet pepper, and scallion broth.',19,'🍜',[]],
      ['Watermelon Mint Snow','Watermelon granita, mint, and lychee jelly.',8,'🍉',['Vegan']]
    ],deals:[
      ['Firecracker Crab & Shrimp Boil','Crab, shrimp, corn, and potatoes tossed in smoky chili-garlic butter.',88,108,['Garlic butter','Firecracker chili'],['Serves 2–3']],
      ['Festival Peking Duck','Roast duck with pancakes, cucumber, scallions, and plum-chili sauce.',96,118,['Classic pancake set'],['Serves 3–4']],
      ['Lobster Firecracker Hot Pot','Lobster, shrimp, tofu, and greens in a warming chili broth.',90,110,['Mild chili','Firecracker hot'],['Serves 2']],
      ['Wagyu Charred Pepper Pot','Wagyu, charred sweet peppers, and mushrooms in a clay pot.',82,100,['Mild pepper','Extra pepper'],['Serves 2']]
    ]},
    {title:'Golden Harvest Prelude',intro:'August’s market finds bring golden corn, fragrant herbs, and chilled tea sweets.',mark:'🌾',specials:[
      ['Golden Corn & Chive Dumplings','Sweet corn, chives, and tofu in crisp-bottomed dumplings.',13,'🥟',['Vegetarian']],
      ['Harvest Tomato Noodles','Wheat noodles, ripe tomato, ginger broth, and leafy greens.',17,'🍜',['Vegan']],
      ['Honeydew Oolong Jelly','Honeydew, oolong jelly, and coconut cream served chilled.',9,'🍈',['Vegetarian']]
    ],deals:[
      ['Golden Harvest Seafood Pot','Crab, shrimp, scallops, corn, and potatoes in toasted garlic butter.',88,108,['Garlic butter','Chili butter'],['Serves 2–3']],
      ['Golden Skin Peking Duck','Crisp duck with pancakes, cucumber, scallion, and plum-honey sauce.',94,116,['Classic pancake set'],['Serves 3–4']],
      ['Lobster Sweet-Corn Feast','Lobster, shrimp, tofu, corn, and greens in golden ginger broth.',88,108,['Ginger broth','Mild chili broth'],['Serves 2']],
      ['Wagyu Chestnut Clay Pot','Wagyu, chestnuts, mushrooms, and jasmine rice in a hot clay pot.',82,100,['Mild pepper','Extra pepper'],['Serves 2']]
    ]},
    {title:'Moon Festival Table',intro:'September’s moon-viewing menu pairs savory sharing plates with cool, fragrant sweets.',mark:'🌕',specials:[
      ['Mooncake Garden Dumplings','Mushroom, cabbage, and ginger dumplings with black-vinegar dip.',13,'🥟',['Vegetarian']],
      ['Moonlit Duck Noodle Bowl','Roast duck, wheat noodles, greens, and star-anise broth.',20,'🍜',[]],
      ['Osmanthus Pear Jelly','Pear, osmanthus jelly, and a soft black-sesame crumble.',9,'🍐',['Vegetarian']]
    ],deals:[
      ['Moon Festival Seafood Boil','Crab, shrimp, clams, corn, and potatoes with ginger-scallion butter.',88,108,['Ginger butter','Chili butter'],['Serves 2–3']],
      ['Full Moon Peking Duck','Whole crisp duck with pancakes, scallions, cucumber, and plum sauce.',98,120,['Classic pancake set'],['Serves 3–4']],
      ['Lobster Moonlight Hot Pot','Lobster, shrimp, tofu, mushrooms, and greens in clear ginger broth.',90,110,['Clear ginger broth','Mild chili broth'],['Serves 2']],
      ['Wagyu Star Anise Clay Pot','Wagyu, shiitake, and jasmine rice with a fragrant star-anise glaze.',82,100,['Mild pepper','Extra pepper'],['Serves 2']]
    ]},
    {title:'Autumn Lantern Menu',intro:'October’s kitchen brings roasted squash, warming spice, and crisp autumn apples.',mark:'🍁',specials:[
      ['Maple Squash Dumplings','Roasted squash, shiitake, and scallion in golden wrappers with ginger dip.',14,'🥟',['Vegetarian']],
      ['Smoky Apple Pork Noodles','Braised pork, wheat noodles, greens, and a savory apple broth.',19,'🍜',[]],
      ['Black Sesame Pumpkin Cup','Silky pumpkin cream, black sesame, and toasted rice.',9,'🎃',['Vegetarian']]
    ],deals:[
      ['Autumn Harbor Seafood Boil','Crab, shrimp, corn, potatoes, and mushrooms in spiced garlic butter.',88,108,['Garlic butter','Chili butter'],['Serves 2–3']],
      ['Autumn Lantern Peking Duck','Crisp duck with warm pancakes, apple-plum relish, and scallions.',96,118,['Classic pancake set'],['Serves 3–4']],
      ['Lobster Squash Hot Pot','Lobster, shrimp, tofu, and roasted squash in ginger broth.',88,108,['Ginger broth','Mild chili broth'],['Serves 2']],
      ['Wagyu Chestnut Pepper Pot','Wagyu, roasted chestnuts, shiitake, and rice in a clay pot.',82,100,['Mild pepper','Extra pepper'],['Serves 2']]
    ]},
    {title:'Golden Harvest Table',intro:'November brings roasted roots, warming broths, crisp bites, and bright orchard fruit.',mark:'🍂',specials:[
      ['Maple Ginger Pumpkin Dumplings','Roasted pumpkin and shiitake folded in golden wrappers with ginger-soy dip.',14,'🥟',['Vegetarian']],
      ['Cider-Braised Pork Noodles','Slow-braised pork, wheat noodles, greens, and a savory apple-cider broth.',19,'🍜',[]],
      ['Chestnut Mushroom Clay Pot','Jasmine rice, roasted chestnuts, shiitake, tofu, and ginger glaze.',17,'🍚',['Vegetarian']],
      ['Crispy Pear Spring Rolls','Tender pear, cabbage, and five-spice in crisp wrappers with plum dip.',9,'🍐',['Vegan']],
      ['Pomegranate Lychee Sparkler','Lychee, tart pomegranate, lime, and sparkling water over ice.',7,'🥤',['Vegan']],
      ['Apple-Cinnamon Sesame Mochi','Soft sesame mochi with cinnamon apple and toasted sesame.',8,'🍡',['Vegetarian']]
    ],deals:[
      ['Harvest Crab & Shrimp Boil','Crab, shrimp, mussels, corn, and potatoes in roasted-garlic chili butter.',88,108,['Garlic butter','Chili butter'],['Serves 2–3']],
      ['Orchard Peking Duck Feast','Crisp roast duck, warm pancakes, cucumber, scallions, and apple-plum sauce.',96,118,['Classic pancake set'],['Serves 3–4']],
      ['Lobster Chestnut Hot Pot','Lobster, shrimp, tofu, shiitake, and chestnuts in ginger-scallion broth.',90,110,['Ginger broth','Mild chili broth'],['Serves 2']],
      ['Wagyu Harvest Clay Pot','Wagyu, roasted mushrooms, scallions, and jasmine rice in a hot clay pot.',82,100,['Mild pepper','Extra black pepper'],['Serves 2']]
    ]},
    {title:'Winter Reunion Table',intro:'December’s menu is made for gathering: slow-cooked comfort, citrus, and shared sweets.',mark:'🎐',specials:[
      ['Reunion Pork Dumplings','Pork, napa cabbage, chives, and ginger with a warm black-vinegar dip.',14,'🥟',[]],
      ['Mandarin Beef Noodle Soup','Slow-braised beef, wheat noodles, greens, and mandarin peel broth.',20,'🍜',[]],
      ['Coconut Snowball Mochi','Soft coconut mochi with red bean and toasted sesame.',9,'🍡',['Vegetarian']]
    ],deals:[
      ['Winter Reunion Seafood Boil','Crab, shrimp, mussels, corn, potatoes, and lemon-garlic butter.',90,110,['Garlic butter','Chili butter'],['Serves 2–3']],
      ['Candlelight Peking Duck','Whole roast duck with pancakes, scallions, cucumber, and plum sauce.',98,120,['Classic pancake set'],['Serves 3–4']],
      ['Lobster Reunion Hot Pot','Lobster, shrimp, tofu, mushrooms, and winter greens in ginger broth.',92,112,['Ginger broth','Mild chili broth'],['Serves 2']],
      ['Wagyu Winter Pepper Clay Pot','Wagyu, shiitake, and scallion rice served sizzling for the table.',84,102,['Mild pepper','Extra pepper'],['Serves 2']]
    ]}
  ];
  const monthKey=date=>`${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}`;
  const current=()=>{const now=new Date(),pack=months[now.getMonth()],next=new Date(now.getFullYear(),now.getMonth()+1,1),fmt=new Intl.DateTimeFormat(undefined,{month:'long',day:'numeric'}),section=`${pack.title} · ${now.getFullYear()}`,deals=pack.deals.map(([name,description,price,compare_at,options,tags])=>({name,description,price,compare_at,tags:['Limited time',...tags],options,section:'Limited-Time Deals'})),specialties=pack.specials.map(([name,description,price,icon,tags=[]])=>({name,description,price,icon,tags,section}));return{...pack,year:now.getFullYear(),monthLabel:now.toLocaleDateString(undefined,{month:'long'}),section,changeDate:fmt.format(next),limitedTimeDeals:deals,monthlySpecialties:specialties}};
  let monthAtLoad=monthKey(new Date());
  const refreshIfMonthChanged=()=>{if(monthKey(new Date())!==monthAtLoad)window.location.reload()};
  window.setInterval(refreshIfMonthChanged,60000);window.addEventListener('focus',refreshIfMonthChanged);document.addEventListener('visibilitychange',()=>{if(!document.hidden)refreshIfMonthChanged()});
  window.ForbiddenBiteMonthlyMenu={current};
})();
