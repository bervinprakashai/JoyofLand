# Run:  python3 update.py   (after adding, removing or editing property pages)
import re,glob
WA="919999999999"   # your WhatsApp number: country code + number, no +
def key(f): return int(re.findall(r'\d+',f)[0])
files=sorted(glob.glob("property-*.html"),key=key)
num=lambda t:re.sub(r'\D','',t) or "0"
cards=""
for i,f in enumerate(files):
    s=open(f,encoding="utf-8").read()
    title=re.search(r'<h1>(.*?)</h1>',s).group(1)
    loc=re.search(r'<p class="sub">(.*?)</p>',s).group(1)
    area=re.search(r'<span>Area</span><b>(.*?)</b>',s).group(1)
    price=re.search(r'<span>Price</span><b>(.*?)</b>',s).group(1)
    img=re.search(r'id="main" src="([^"]+)"',s).group(1)
    prv=files[i-1] if i>0 else "index.html"; nxt=files[i+1] if i<len(files)-1 else "index.html"
    s=re.sub(r'<nav class="pn">.*?</nav>',f'<nav class="pn"><a href="{prv}">‹ Previous</a><a href="{nxt}">Next ›</a></nav>',s,flags=re.S)
    s=re.sub(r'wa\.me/\d+',f'wa.me/{WA}',s)
    open(f,"w",encoding="utf-8").write(s)
    cards+=f'<a class="card" href="{f}" data-price="{num(price)}" data-area="{num(area)}"><div class="im"><img src="{img}" alt="{title}" loading="lazy" onerror="this.style.visibility=\'hidden\'"><span class="badge">{area}</span></div><div class="cb"><h3>{title}</h3><p>{loc}</p><p class="pr">{price}</p></div></a>'
x=open("index.html",encoding="utf-8").read()
x=re.sub(r'<!--CARDS-->.*<!--/CARDS-->',lambda m:f'<!--CARDS-->{cards}<!--/CARDS-->',x,flags=re.S)
x=re.sub(r'\d+ lands available',f'{len(files)} lands available',x)
x=re.sub(r'wa\.me/\d+',f'wa.me/{WA}',x)
open("index.html","w",encoding="utf-8").write(x)
print(f"index.html updated with {len(files)} properties")
