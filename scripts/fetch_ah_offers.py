#!/usr/bin/env python3
"""Conservatieve AH-aanbiedingen voor MealApp; faalt gesloten bij twijfel."""
import json, re, urllib.request, urllib.parse, os, time
from datetime import date, datetime

BASE='https://www.prijsprofeet.nl/api/v1/search'
# Alleen herkenbare enkelvoudige supermarktproducten, geen samengestelde maaltijden.
PATTERNS={
 'kip':r'(?:kipfilet|kipdijfilet|kipdijstukjes)', 'gehakt':r'(?:rundergehakt|half.om.half gehakt|gemengd gehakt)',
 'spek':r'(?:spekblokjes|gerookte spekreepjes)', 'zalm':r'(?:zalmfilet)',
 'broccoli':r'broccoli', 'bloemkool':r'bloemkool', 'spinazie':r'(?:verse spinazie|spinazie blad|spinazie)',
 'courgette':r'courgette', 'paprika':r'(?:rode paprika|gele paprika|groene paprika|paprika)',
 'tomaat':r'(?:tomaten|cherrytomaten|snoeptomaten)', 'wortel':r'(?:wortels|waspeen|winterpeen)',
 'sperzieb':r'sperziebonen', 'snijbonen':r'snijbonen','aubergine':r'aubergine',
 'avocado':r"avocado(?:s|\'s)?", 'aardappel':r'(?:aardappelen|krieltjes)',
 'mozzarella':r'mozzarella', 'feta':r'feta', 'burrata':r'burrata', 'ricotta':r'ricotta',
 'pasta':r'(?:spaghetti|penne|fusilli|macaroni|tagliatelle)', 'rijst':r'(?:basmatirijst|jasmijnrijst|witte rijst|zilvervliesrijst)',
 'orzo':r'orzo','gnocchi':r'gnocchi','wrap':r'(?:tortilla wraps|tarwe wraps|volkoren wraps)',
 'pesto':r'(?:groene pesto|pesto genovese)', 'kokos':r'kokosmelk','linzen':r'linzen',
 'kikkererwten':r'kikkererwten', 'mais':r'(?:mais|maiskorrels)', 'ei':r'(?:eieren|vrije uitloop eieren)',
}
BAD=re.compile(r'(?i)baby|olvarit|knorr|soep|mix|saus|maaltijd|pizza|chips|smaak|douche|shower|ijs|salade|wraps met|vegan|vegetar|vivera|kruiden|reep|snoep|frisdrank|crème|ketchup|gebakken|bereid|kant.en.klaar|burger|poeder|tortelloni|verspakket')
PREFIX=re.compile(r'^(?:ah|albert heijn|ah biologisch|ah excellent|biologisch|excellent|jumbo)\s+',re.I)
PACK=re.compile(r'^(?:[0-9]+(?:[.,][0-9]+)?\s*(?:g|gr|kg|ml|l|stuks|st|x|gram)|[0-9]+\s*[x×]\s*[0-9]+\s*(?:g|gr|kg|ml|l)|verpakking|zak|bakje|bos|schaal|voordeelverpakking)(?:\s+.*)?$',re.I)

def match(name):
 name=re.sub(r'\s+',' ',name.lower()).strip();name=PREFIX.sub('',name)
 if BAD.search(name):return None
 for key,term in PATTERNS.items():
  m=re.match(r'^(?:'+term+r')(?:\s+|$)',name,re.I)
  if m and (not name[m.end():].strip() or PACK.fullmatch(name[m.end():].strip())):return key
 return None

def items(raw):
 if isinstance(raw,list):return raw
 if isinstance(raw,dict):
  for k in ('results','items','products','data'):
   if isinstance(raw.get(k),list):return raw[k]
 return []

def get(page):
 query=urllib.parse.urlencode(dict(q='*',retailer='albert_heijn',promotion_status='active',page=page,page_size=100))
 headers={'User-Agent':'MealApp/2.1 (https://github.com/Fayderijk26/MealApp)','Accept':'application/json'}
 if os.getenv('PP_API_KEY'):headers['X-API-Key']=os.environ['PP_API_KEY']
 with urllib.request.urlopen(urllib.request.Request(BASE+'?'+query,headers=headers),timeout=35) as r:return json.load(r)

def main():
 out=[];seen=set()
 for page in range(1,61):
  try: batch=items(get(page))
  except Exception as e:
   print('API fout:',e);raise SystemExit(1)
  for item in batch:
   name=str(item.get('name') or item.get('title') or item.get('product_name') or '')
   ingredient=match(name)
   if not ingredient:continue
   start=str(item.get('valid_from') or '')[:10];end=str(item.get('valid_until') or '')[:10]
   try:
    first=date.fromisoformat(start);last=date.fromisoformat(end)
    if last<date.today() or first>last:continue
    price=float(item.get('price'));original=float(item.get('original_price'))
    discount=1-price/original
    if not(.05<=discount<=.75 and price>0):continue
   except (TypeError,ValueError):continue
   marker=(ingredient,start,end,name.lower())
   if marker in seen:continue
   seen.add(marker)
   out.append({'ingredient':ingredient,'product':name,'discount':round(discount,3),'valid_from':start,'valid_until':end,'price':price,'original_price':original})
  if len(batch)<100:break
  time.sleep(.5)
 if not out:print('Geen betrouwbaar gematchte AH-aanbiedingen: bestaand bestand ongewijzigd');raise SystemExit(1)
 with open('ah-offers.json','w',encoding='utf-8') as f:json.dump({'updated':date.today().isoformat(),'source':'PrijsProfeet','retailer':'AH','offers':out},f,ensure_ascii=False,indent=2)
 print('Betrouwbare AH-productmatches:',len(out))
if __name__=='__main__':main()
