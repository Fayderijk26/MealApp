'use strict';
// De originele ingrediënten en recepten zijn overgenomen uit MealApp (29 oktober 2026).
const ingredientText=`kip|Kipfilet|1.25|g|125|0
gehakt|Gehakt|0.8|g|100|0
spek|Spekjes|0.45|g|30|0
ham|Ham|0.45|g|30|0
zalm|Zalm|2.6|g|120|0
rijst|Rijst|0.17|g|75|1
pasta|Pasta|0.16|g|90|1
orzo|Orzo|0.24|g|80|0
wrap|Wraps|0.6|st|2|0
naan|Naanbrood|0.5|st|1|0
bloemkool|Bloemkool|0.45|g|200|0
broccoli|Broccoli|0.45|g|150|0
spinazie|Spinazie|0.5|g|100|0
boerenkool|Boerenkool|0.6|g|200|0
zuurkool|Zuurkool|0.5|g|200|0
rodekool|Rode kool|0.5|g|200|0
sperzieb|Sperziebonen|0.85|g|150|0
courgette|Courgette|0.45|st|0.5|0
tomaat|Tomaten|0.5|g|120|0
paprika|Paprika|0.45|st|0.5|0
mozzarella|Mozzarella|0.5|g|60|0
feta|Feta|0.6|g|50|0
burrata|Burrata|1.0|g|60|0
kaas|Geraspte kaas|0.45|g|40|0
boursin|Boursin|0.7|g|40|0
room|Kookroom|0.25|ml|50|0
pesto|Pesto|0.35|g|30|0
currypasta|Currypasta|0.45|g|25|0
kokos|Kokosmelk|0.4|ml|100|0
linzen|Linzen|0.3|g|60|0
aardappel|Aardappelen|0.3|g|200|0
sla|Sla|0.45|g|60|0
avocado|Avocado|0.55|st|0.5|0
tzatziki|Tzatziki|0.45|g|50|0
mais|Mais en bonen|0.35|g|80|0
ei|Eieren|0.3|st|1|1
ui|Ui|0.1|st|0.5|1
knoflook|Knoflook|0.05|teen|1|1
olie|Olijfolie|0.05|ml|10|1
zout|Zout|0.03|st|0|1
peper|Peper|0.03|st|0|1
nootmuskaat|Nootmuskaat|0.03|st|0|1
ikruiden|Italiaanse kruiden|0.03|st|0|1
tacokruiden|Tacokruiden|0.15|st|0|1
komijn|Komijn|0.03|st|0|1
kerriepoeder|Kerriepoeder|0.03|st|0|1
paprikapoeder|Paprikapoeder|0.03|st|0|1
gember|Gember|0.1|g|5|1
bouillon|Bouillon|0.1|st|0.5|1
boter|Boter|0.1|g|10|1
melk|Melk|0.1|ml|50|1
sojasaus|Sojasaus|0.05|ml|10|1
azijn|Azijn|0.03|ml|10|1
honing|Honing|0.1|g|10|1
tomatenpuree|Tomatenpuree|0.1|g|15|1
asperges|Groene asperges|1.4|g|150|0
witlof|Witlof|0.6|g|150|0
wortel|Wortelen|0.3|g|150|0
snijbonen|Snijbonen|0.8|g|150|0
pompoen|Pompoen|0.5|g|200|0
aubergine|Aubergine|0.7|st|0.5|0
gnocchi|Gnocchi|0.5|g|125|0
ricotta|Ricotta|0.45|g|50|0
deeg|Bladerdeeg of pizzadeeg|0.5|st|0.5|0
broodje|Burgerbroodjes|0.45|st|1|0
kipgehakt|Kipgehakt|0.9|g|100|0
friet|Friet|0.4|g|150|0
pita|Pitabroodjes|0.27|st|1|0
nacho|Nacho's|0.4|g|40|0
pindasaus|Pindasaus|0.4|g|40|0
stoofvlees|Stoofvlees|1.75|g|125|0
bulgur|Bulgur|0.2|g|70|0
couscous|Couscous|0.2|g|70|0
kikkererwten|Kikkererwten|0.4|g|80|0
carpaccio|Carpaccio|1.9|g|50|0
pijnboompitten|Pijnboompitten|0.75|g|15|0
basilicum|Basilicum|0.35|g|10|0
aardbeien|Aardbeien|0.55|g|80|0
rucola|Rucola|0.5|g|30|0
capres|Capres|0.18|g|10|0`;
const recipeText=`Bloemkoolschotel|Schotels|45|1|bloemkool,aardappel,kaas,room,ham
Broccoli-ovenschotel|Schotels|40|1|broccoli,aardappel,kaas,room,gehakt
Lasagne|Schotels|75|2|gehakt,pasta,tomaat,kaas,room,ui
Quiche met spinazie|Schotels|60|2|spinazie,ei,room,kaas,spek
Pan-lasagne pesto|Schotels|35|1|pasta,pesto,gehakt,mozzarella,tomaat,olie
Boerenkoolstamppot|Hollands|40|1|boerenkool,aardappel,spek
Zuurkool met spekjes|Hollands|35|1|zuurkool,aardappel,spek
Rode kool met kip|Hollands|40|1|rodekool,aardappel,kip
Sperziebonen met kip|Hollands|35|1|sperzieb,aardappel,kip
Kippensoep|Soep|60|2|kip,ui,aardappel
Broccolisoep|Soep|30|1|broccoli,room,aardappel,ui
Pasta carbonara|Pasta|25|1|pasta,spek,ei,kaas,knoflook
Orzo met ham en kaas|Pasta|25|1|orzo,ham,kaas,room
Pasta pesto met kip|Pasta|25|1|pasta,pesto,kip,tomaat
Pasta boursin en broccoli|Pasta|25|1|pasta,boursin,broccoli
Ravioli spinazie-mozzarella|Pasta|20|1|pasta,spinazie,mozzarella,tomaat
Orzo met spinazie en tomaatjes|Pasta|25|1|orzo,spinazie,tomaat,feta
Chili con carne|Wraps|45|1|gehakt,mais,tomaat,paprika,rijst,ui
Tacos|Wraps|25|1|gehakt,wrap,sla,tomaat,kaas,avocado
Fajitas|Wraps|25|1|kip,paprika,wrap,ui,kaas
Shoarma-wraps|Wraps|25|1|kip,wrap,sla,tzatziki,tomaat
Nasi|Rijst|30|1|rijst,kip,ei,ui,paprika,knoflook,olie
Butter chicken|Rijst|40|2|kip,rijst,room,tomaat,currypasta
Kip kerrie|Rijst|35|1|kip,rijst,currypasta,kokos,paprika
Pokebowl|Rijst|25|1|zalm,rijst,avocado,mais
Linzencurry met naan|Curry|35|1|linzen,kokos,currypasta,tomaat,naan
Groene curry|Curry|35|2|kip,kokos,currypasta,broccoli,rijst
Orzosalade met feta|Salades|20|1|orzo,feta,tomaat,paprika,sla
Burratasalade|Salades|15|1|burrata,tomaat,sla,pesto
Caesar-pastasalade|Salades|25|1|pasta,kip,spek,ei,sla
Gevulde paprika|Overig|50|2|paprika,gehakt,rijst,kaas,tomaat
Courgette-parmigiana|Overig|55|2|courgette,tomaat,mozzarella,kaas
Risotto met burrata|Overig|40|2|rijst,burrata,courgette,room,ui
Kip tandoori met naan|Overig|35|1|kip,naan,tzatziki,currypasta
Courgetteschotel|Schotels|45|1|courgette,aardappel,kaas,room,gehakt
Spinazieschotel|Schotels|45|1|spinazie,aardappel,kaas,room,ei
Witlof met ham en kaas|Schotels|40|1|witlof,ham,kaas,aardappel,room
Quiche met capres|Schotels|60|2|ei,room,kaas,spek,deeg,capres
Gnocchi-ovenschotel met kip en pesto|Schotels|40|1|gnocchi,pesto,kip,courgette,mozzarella
Wortelen met gehakt|Hollands|40|1|wortel,aardappel,gehakt
Snijbonen met gehakt|Hollands|35|1|snijbonen,aardappel,gehakt
Spinazie met ei|Hollands|30|1|spinazie,aardappel,ei
Groene asperges met spek|Hollands|30|1|asperges,spek,aardappel,ei
Gegrilde ovengroenten|Hollands|45|1|courgette,paprika,aubergine,aardappel,feta
Pompoensoep|Soep|40|1|pompoen,room,ui
Courgettepasta|Pasta|25|1|courgette,pasta,room,kaas
Pasta pesto|Pasta|20|1|pasta,pesto,tomaat,pijnboompitten
Macaroni met ham en kaas|Pasta|35|1|pasta,ham,kaas,tomaat
Mac and cheese|Pasta|30|1|pasta,kaas,room,melk
Pasta met kip, courgette en room|Pasta|30|1|pasta,kip,courgette,room
Orzo met spek, courgette en burrata|Pasta|30|2|orzo,spek,courgette,burrata,rucola
Quesadilla's|Wraps|25|1|wrap,kaas,kip,paprika,mais
Bloemkoolpizza|Wraps|50|2|bloemkool,mozzarella,tomaat,ei
Wrap-pizza met crème fraîche|Wraps|20|1|wrap,room,spinazie,kaas,tomaat
Kipcorn|Wraps|35|1|kip,deeg,kaas
Hamburgers|Wraps|30|1|broodje,gehakt,sla,tomaat,kaas,aardappel
Plaattaart (flammkuchen)|Wraps|30|1|deeg,room,spek,ui,kaas
Tostada met gehakt|Wraps|25|1|wrap,gehakt,mais,sla,tomaat,avocado
Pita tandoori|Wraps|25|1|pita,kip,tzatziki,sla,tomaat,kerriepoeder
Taquito's|Wraps|30|1|wrap,kip,kaas,mais
Gyros-wraps|Wraps|25|1|wrap,kip,tzatziki,sla,tomaat
Kip-saté-wraps|Wraps|25|1|wrap,kip,pindasaus,sla,wortel
Kip Caesar-wraps|Wraps|25|1|wrap,kip,sla,spek,kaas
Kip-tacos met sla|Wraps|25|1|wrap,kipgehakt,sla,tomaat,avocado
Mexicaanse bowl|Wraps|30|1|rijst,gehakt,mais,avocado,tomaat,nacho
Gevulde courgette met Mexicaans gehakt|Wraps|45|2|courgette,gehakt,mais,kaas,tomaat
Enchilada's met kip|Wraps|40|2|wrap,kip,mais,tomaat,kaas
Loaded fries|Wraps|30|1|friet,kipgehakt,kaas,sla,tomaat
Gezonde kapsalon|Wraps|35|1|aardappel,kip,sla,tomaat,tzatziki,kaas
Turkse pizza|Wraps|35|2|deeg,gehakt,tomaat,paprika,sla
Chicken tonight|Rijst|30|1|kip,rijst,paprika,room,tomaat
Stoofvlees met rijst en boontjes|Rijst|30|1|stoofvlees,rijst,snijbonen
Kip met rijst en broccoli|Rijst|30|1|kip,rijst,broccoli,room
Kip tandoori met rijst|Rijst|35|1|kip,rijst,tzatziki,kerriepoeder
Kip madras|Rijst|35|1|kip,rijst,currypasta,tomaat,room
Honing-gemberkip met rijst|Rijst|30|1|kip,rijst,honing,sojasaus,broccoli
Roti met kip|Rijst|40|2|wrap,kip,aardappel,sperzieb,currypasta
Risotto|Rijst|40|2|rijst,kaas,room,boter,ui
Risotto verde met burrata|Rijst|40|2|rijst,courgette,spinazie,burrata,kaas
Paprikarisotto met burrata|Rijst|40|2|rijst,paprika,burrata,kaas
Pastasalade pesto met kip|Salades|25|1|pasta,pesto,tomaat,kip,pijnboompitten
Bulgursalade met feta|Salades|25|1|bulgur,feta,paprika,tomaat,sla
Orzosalade met mozzarella|Salades|20|1|orzo,tomaat,mozzarella,basilicum
Linda-salade met nacho's|Salades|20|1|nacho,sla,tomaat,avocado,gehakt,mais
Spinaziesalade met aardbeien|Salades|15|1|spinazie,aardbeien,feta,pijnboompitten
Couscoussalade|Salades|20|1|couscous,kikkererwten,tomaat,feta,sla
Krokante aardappelsalade|Salades|35|1|aardappel,spek,ei,sla,tomaat
Pastasalade met carpaccio|Salades|25|1|pasta,carpaccio,rucola,tomaat,pijnboompitten
Pastasalade met avocado en spek|Salades|25|1|pasta,avocado,spek,tomaat,sla
Orzosalade met gegrilde groenten|Salades|30|1|orzo,courgette,paprika,aubergine,feta
Pompoencurry|Curry|40|1|pompoen,kokos,currypasta,rijst,kikkererwten
Kip met tzatziki en naan|Overig|25|1|kip,tzatziki,naan,sla,tomaat
Courgettepatatjes|Overig|35|1|courgette,ei,kaas,aardappel
Melanzane parmigiana|Overig|60|2|aubergine,tomaat,mozzarella,kaas
Kipburger|Overig|30|1|broodje,kipgehakt,sla,tomaat,kaas
Kip shoarma met tzatziki|Overig|30|1|kip,tzatziki,rijst,sla,tomaat
Courgetterolletjes met ricotta|Overig|45|2|courgette,ricotta,tomaat,mozzarella
Italiaanse plaattaart|Overig|30|1|deeg,tomaat,mozzarella,rucola,ham`;
const categoryExtras={Schotels:'zout,peper,nootmuskaat,boter',Hollands:'zout,peper,boter,melk',Soep:'bouillon,zout,peper,knoflook',Pasta:'knoflook,olie,zout,peper,ikruiden',Wraps:'knoflook,olie,tacokruiden,zout,peper',Rijst:'knoflook,olie,zout,peper,gember',Curry:'knoflook,gember,olie,komijn,kerriepoeder,zout',Salades:'olie,azijn,zout,peper',Overig:'knoflook,olie,zout,peper,ikruiden'};
const ING=Object.fromEntries(ingredientText.split('\n').map(x=>{const [id,name,estimate,unit,qty,pantry]=x.split('|');return [id,{id,name,estimate:+estimate,unit,qty:+qty,pantry:pantry==='1'}]}));
const RECIPES=recipeText.split('\n').map((x,i)=>{const [name,category,minutes,difficulty,ingredients]=x.split('|');return {id:'builtin-'+i,name,category,minutes:+minutes,difficulty:+difficulty,ingredients:[...new Set([...ingredients.split(','),...(categoryExtras[category]||'').split(',')])].filter(Boolean),steps:[],photo:''}});
const CATEGORY_EMOJI={Schotels:'🥘',Hollands:'🥔',Soep:'🍲',Pasta:'🍝',Wraps:'🌮',Rijst:'🍛',Curry:'🍛',Salades:'🥗',Overig:'🍽️'};
