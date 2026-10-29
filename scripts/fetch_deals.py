#!/usr/bin/env python3
"""Haalt de weekaanbiedingen op via de PrijsProfeet API en schrijft deals.json."""
import json, os, re, statistics, sys, time, urllib.parse, urllib.request
from datetime import date

BASE = "https://www.prijsprofeet.nl/api/v1/search"
UA = "Weekmenu/1.0 (+https://fayderijk26.github.io/MealApp/)"
STORES = {"AH": "albert_heijn", "Jumbo": "jumbo", "Lidl": "lidl", "Aldi": "aldi", "Dirk": "dirk"}

# ingredient-sleutel in de app -> zoekpatroon in de productnaam
KW = {
 "kip": r"kip(filet|dij|reep|stuk|bout|vleugel)|kippen(dij|bout)", "kipgehakt": r"kipgehakt|kippengehakt",
 "gehakt": r"(?<!kip)gehakt", "spek": r"spek|bacon", "ham": r"\bham\b", "zalm": r"zalm",
 "orzo": r"orzo|risoni", "wrap": r"wrap|tortilla", "naan": r"naan", "bloemkool": r"bloemkool",
 "broccoli": r"broccoli", "spinazie": r"spinazie", "boerenkool": r"boerenkool", "zuurkool": r"zuurkool",
 "rodekool": r"rode ?kool", "sperzieb": r"sperziebo", "courgette": r"courgette",
 "tomaat": r"tomaat|tomaten", "paprika": r"paprika", "mozzarella": r"mozzarella", "feta": r"feta",
 "burrata": r"burrata", "kaas": r"geraspte|rasp ?kaas|kaasblokjes", "boursin": r"boursin",
 "room": r"kookroom|cuisine|cr[eè]me fra", "pesto": r"pesto", "currypasta": r"curry ?pasta|curry paste",
 "kokos": r"kokosmelk|kokoscreme|kokosroom", "linzen": r"linzen", "aardappel": r"aardappel|kriel",
 "sla": r"\bsla\b|ijsbergsla|kropsla|romaine|veldsla", "avocado": r"avocado", "tzatziki": r"tzatziki",
 "mais": r"\bmais\b|maiskorrels|kidney", "asperges": r"asperge", "witlof": r"witlof",
 "wortel": r"wortel|waspeen|winterpeen", "snijbonen": r"snijbo", "pompoen": r"pompoen|butternut",
 "aubergine": r"aubergine", "gnocchi": r"gnocchi", "ricotta": r"ricotta",
 "deeg": r"bladerdeeg|pizzadeeg|flammkuchen", "broodje": r"hamburger ?broodje|burger ?broodje|brioche bun",
 "friet": r"\bfriet|frites|patat", "pita": r"\bpita", "nacho": r"nacho", "pindasaus": r"pindasaus",
 "stoofvlees": r"stoofvlees|draadjesvlees", "bulgur": r"bulgur", "couscous": r"couscous",
 "kikkererwten": r"kikkererwt", "carpaccio": r"carpaccio", "pijnboompitten": r"pijnboompit",
 "basilicum": r"basilicum", "aardbeien": r"aardbei", "rucola": r"rucola", "capres": r"capers|capres",
 "rijst": r"\brijst|basmati|jasmijn", "pasta": r"spaghetti|penne|fusilli|macaroni|tagliatelle|farfalle|rigatoni|\bpasta\b|ravioli|tortellini",
 "ei": r"\beieren\b", "ui": r"\buien\b|\bui\b", "knoflook": r"knoflook",
}
EXEMPT = {"pesto", "currypasta", "kokos", "pindasaus", "tzatziki", "nacho"}
JUNK = re.compile(r"soep|ketchup|saus|chips|koek|\bijs\b|drank|smoothie|yoghurt|vla\b|snoep|reep\b|chocola|pizza|maaltijd|poeder|kruiden|wafel|cracker")
KWC = {k: re.compile(v) for k, v in KW.items()}


def get(params):
    url = BASE + "?" + urllib.parse.urlencode(params)
    headers = {"User-Agent": UA, "Accept": "application/json"}
    if os.environ.get("PP_API_KEY"):
        headers["X-API-Key"] = os.environ["PP_API_KEY"]
    for attempt in range(3):
        try:
            with urllib.request.urlopen(urllib.request.Request(url, headers=headers), timeout=30) as r:
                return json.load(r)
        except Exception as e:
            print("  fout:", e)
            time.sleep(2 + attempt * 3)
    return None


def items_of(data):
    if isinstance(data, list):
        return data
    if isinstance(data, dict):
        for k in ("results", "items", "products", "data"):
            if isinstance(data.get(k), list):
                return data[k]
        for v in data.values():
            if isinstance(v, list):
                return v
    return []


def num(x):
    try:
        return float(x)
    except (TypeError, ValueError):
        return None


def discount(it):
    for f in ("savings_percentage", "discount_percentage"):
        v = num(it.get(f))
        if v:
            return v / 100 if v > 1 else v
    p, o = num(it.get("price")), num(it.get("original_price"))
    return 1 - p / o if p and o and o > p else 0.0


UNITS = {"kg": ("g", 1000), "g": ("g", 1), "gr": ("g", 1), "gram": ("g", 1), "l": ("ml", 1000), "liter": ("ml", 1000),
         "cl": ("ml", 10), "ml": ("ml", 1), "stuks": ("st", 1), "stuk": ("st", 1), "st": ("st", 1)}
AMT = re.compile(r"(?:(\d+)\s*[x\u00d7]\s*)?(\d+(?:[.,]\d+)?)\s*(kg|gram|gr|g|liter|l|cl|ml|stuks|stuk|st)\b")


def amount(it):
    for f in ("quantity", "name", "unit"):
        m = AMT.search(str(it.get(f) or "").lower())
        if m:
            u, mult = UNITS[m.group(3)]
            return u, float(m.group(1) or 1) * float(m.group(2).replace(",", ".")) * mult
    return None


def main():
    out = {"updated": date.today().isoformat(), "source": "PrijsProfeet", "stores": {}, "reg": {}}
    total, pool = 0, {}
    for store, slug in STORES.items():
        best, seen, smp = {}, 0, {}
        for page in range(1, 61):
            data = get({"q": "*", "retailer": slug, "promotion_status": "active", "page": page, "page_size": 100})
            items = items_of(data)
            seen += len(items)
            for it in items:
                name = str(it.get("name") or it.get("title") or it.get("product_name") or "").lower()
                d = min(discount(it), 0.6)
                p, o = num(it.get("price")), num(it.get("original_price"))
                reg = o if o and p and o >= p else p
                a = amount(it)
                for key, rx in KWC.items():
                    if not (rx.search(name) and (key in EXEMPT or not JUNK.search(name))):
                        continue
                    if reg and a and a[1] > 0:
                        smp.setdefault(key, {}).setdefault(a[0], []).append(reg / a[1])
                    if d >= 0.10 and d > best.get(key, {}).get("d", 0):
                        best[key] = {"d": round(d, 2), "n": name[:60]}
            if len(items) < 100:
                break
            time.sleep(0.7)
        print(f"{store}: {seen} acties, {len(best)} ingredienten in de aanbieding, {len(smp)} met prijs")
        out["stores"][store] = best
        out["reg"][store] = {}
        for key, units in smp.items():
            for u, v in units.items():
                pool.setdefault(key, {}).setdefault(u, []).extend(v)
                if len(v) >= 2:
                    out["reg"][store].setdefault(key, {})[u] = {"p": round(statistics.median(v), 6), "n": len(v)}
        total += seen
        time.sleep(0.7)
    out["reg"]["ALL"] = {k: {u: {"p": round(statistics.median(v), 6), "n": len(v)} for u, v in us.items() if len(v) >= 3}
                         for k, us in pool.items()}
    if total == 0:
        print("Geen data opgehaald, deals.json blijft ongewijzigd.")
        sys.exit(1)
    with open("deals.json", "w", encoding="utf-8") as f:
        json.dump(out, f, ensure_ascii=False, separators=(",", ":"))


if __name__ == "__main__":
    main()
