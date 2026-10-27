(function(){
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const grid=$('#grid');
if(grid){const q=$('#q'),sort=$('#sort'),cnt=$('#count'),empty=$('#empty'),cards=$$('.card',grid);
 function run(){const t=q.value.trim().toLowerCase();
  const v=cards.filter(c=>{const m=c.textContent.toLowerCase().includes(t);c.hidden=!m;return m});
  const k=sort.value;
  v.sort((a,b)=>k==='pa'?a.dataset.price-b.dataset.price:k==='pd'?b.dataset.price-a.dataset.price:k==='ar'?b.dataset.area-a.dataset.area:cards.indexOf(a)-cards.indexOf(b));
  v.forEach(c=>grid.appendChild(c));
  cnt.textContent=v.length+(v.length===1?' land':' lands');empty.hidden=v.length>0}
 q.oninput=run;sort.onchange=run;run()}
const gal=$('.gal');
if(gal){const bt=$$('.th button',gal),im=$$('.th img',gal).map(i=>({s:i.src,a:i.alt}));let n=0;
 const main=$('#main'),gc=$('#gc'),lb=$('#lb'),lbi=$('#lbi');
 function show(i){n=(i+im.length)%im.length;main.src=lbi.src=im[n].s;main.alt=im[n].a;gc.textContent=(n+1)+' / '+im.length;bt.forEach((b,j)=>b.setAttribute('aria-current',j===n))}
 function close(){lb.hidden=true;document.body.style.overflow=''}
 bt.forEach((b,j)=>b.onclick=()=>show(j));
 $('#gp').onclick=()=>show(n-1);$('#gn').onclick=()=>show(n+1);
 $('#lp').onclick=()=>show(n-1);$('#ln').onclick=()=>show(n+1);$('#lbx').onclick=close;
 $('#open').onclick=()=>{lb.hidden=false;document.body.style.overflow='hidden';$('#lbx').focus()};
 lb.onclick=e=>{if(e.target===lb)close()};
 addEventListener('keydown',e=>{if(e.key==='Escape'&&!lb.hidden)close();if(e.key==='ArrowLeft')show(n-1);if(e.key==='ArrowRight')show(n+1)});
 show(0)}
window.send=function(){const nm=$('#nm'),ph=$('#ph'),er=$('#er');
 if(!nm.value.trim()||ph.value.replace(/\D/g,'').length<7){er.hidden=false;(nm.value.trim()?ph:nm).focus();return false}
 er.hidden=true;const num=($('.wa').href.match(/wa\.me\/(\d+)/)||[])[1];
 const t='Enquiry: '+$('h1').textContent+'\nName: '+nm.value.trim()+'\nPhone: '+ph.value.trim()+'\n'+$('#ms').value;
 window.open('https://wa.me/'+num+'?text='+encodeURIComponent(t),'_blank');return false}
})();
