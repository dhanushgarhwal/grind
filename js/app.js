let ui={tab:0,q:'',f:-1,so:0,all:0,m:null,dc:'',rs:0};
const toast=t=>{const e=document.createElement('div');e.textContent=t;$('ts').appendChild(e);setTimeout(()=>e.remove(),1800)};
const act={
 l(d){const c=C(d.id),x=+d.i,v=c.l[x];c.l[x]=v?0:TD();if(v!=='s')bump(0,v?-1:1);D('c:'+c.id)},
 d(d){const c=C(d.id),x=+d.i;c.d[x]=c.d[x]?0:1;bump(1,c.d[x]?1:-1);D('c:'+c.id)},
 nl(d){const c=C(d.id),x=c.l.findIndex(v=>!v);if(x>=0){c.l[x]=TD();bump(0,1);D('c:'+c.id)}},
 nd(d){const c=C(d.id),x=c.d.findIndex(v=>!v);if(x>=0){c.d[x]=1;bump(1,1);D('c:'+c.id)}},
 allc(d){const c=C(d.id);c.l=c.l.map(v=>{if(!v)bump(0,1);return v||TD()});c.d=c.d.map(v=>{if(!v)bump(1,1);return 1});D('c:'+c.id)},
 clr(d){const c=C(d.id);c.l=c.l.map(()=>0);c.d=c.d.map(()=>0);D('c:'+c.id)},
 cnt(d){const c=C(d.id),k=d.k,a=k==='L'?'l':'d',n=Math.max(0,Math.min(60,c[k]+ +d.v));c[k]=n;c[a]=arr(n,i=>c[a][i]||0);D('c:'+c.id)},
 conf(d){const c=C(d.id);c.c=c.c===+d.v?0:+d.v;D('c:'+c.id)},
 pin(d){const c=C(d.id);c.p=c.p?0:1;D('c:'+c.id)},
 open(d){ui.m={t:'ch',id:d.id};ui.dc=''},close(){ui.m=null;ui.dc=''},noop(){},
 del(d){if(ui.dc===d.id){st.ch=st.ch.filter(c=>c.id!==d.id);D('x:'+d.id);ui.m=null;ui.dc='';toast('Chapter deleted')}else ui.dc=d.id},
 addm(){ui.m={t:'add',s:ui.f>=0?ui.f:0,n:'',L:5,D:5}},
 asub(d){Object.assign(ui.m,{n:$('an').value,L:+$('aL').value||0,D:+$('aD').value||0,s:+d.v})},
 add(){const n=$('an').value.trim();if(!n){toast('Enter a chapter name');return}const s=ui.m.s,o=Math.max(-1,...sub(s).map(c=>c.o))+1,
  c=mk(s,o,n,Math.max(0,Math.min(60,+$('aL').value||0)),Math.max(0,Math.min(60,+$('aD').value||0)));st.ch.push(c);D('c:'+c.id);ui.m=null;ui.f=-1;ui.q='';toast('Chapter added')},
 more(){const T=TD();st.m.more={d:T,n:(st.m.more.d===T?st.m.more.n:0)+1};D('m')},
 tab(d){ui.tab=+d.t;ui.rs=0;scrollTo(0,0)},showall(){ui.all=!ui.all},
 fs(d){ui.f=+d.v},so(d){ui.so=+d.v},
 q(d){st.m.q=Math.max(1,Math.min(6,st.m.q+ +d.v));D('m')},g(d){st.m.goal=Math.max(1,Math.min(99,st.m.goal+ +d.v));D('m')},
 wd(d){const i=+d.v,o=st.m.off;st.m.off=o.includes(i)?o.filter(x=>x!==i):[...o,i];D('m')},
 rest(){const T=TD(),o=st.m.od;st.m.od=o.includes(T)?o.filter(x=>x!==T):[...o,T];D('m')},
 exp(){const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([JSON.stringify(st)],{type:'application/json'}));a.download='grind-backup-'+TD()+'.json';a.click();toast('Backup saved')},
 link(){ui.m={t:'link'}},
 copy(){navigator.clipboard&&navigator.clipboard.writeText(key).then(()=>toast('Key copied'),()=>toast('Copy failed'))},
 apply(){const k=$('lk').value.trim().toLowerCase();if(!/^[a-z0-9]{8,40}$/.test(k)){toast('Invalid key');return}localStorage.setItem('grindkey',k);localStorage.removeItem(K);location.reload()},
 reset(){if(ui.rs){const f=fresh(),ids=new Set(f.ch.map(c=>c.id));st.ch.forEach(c=>{if(!ids.has(c.id))D('x:'+c.id)});st=f;dAll();ui.rs=0;toast('Progress reset')}else ui.rs=1}
};
function R(){const o=document.querySelector('.db'),top=o?o.scrollTop:0;$('side').innerHTML=vSide();$('main').innerHTML=[vToday,vChapters,vPlan,vStats,vSettings][ui.tab]();
if(ui.m&&ui.m.t==='ch'&&!C(ui.m.id))ui.m=null;$('ov').innerHTML=!ui.m?'':ui.m.t==='ch'?vDrawer(C(ui.m.id)):ui.m.t==='add'?vAdd():vLink();
document.body.classList.toggle('lock',!!ui.m);const n=document.querySelector('.db');if(n)n.scrollTop=top;if(ui.m&&ui.m.t!=='ch'){const f=$(ui.m.t==='add'?'an':'lk');f&&f.focus()}}
document.addEventListener('click',e=>{const b=e.target.closest('[data-a]');if(!b)return;const a=b.dataset.a;if(a==='noop')return;e.preventDefault();e.stopPropagation();if(!act[a])return;act[a](b.dataset);local();R()});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&ui.m){ui.m=null;R()}else if(e.key==='Enter'&&e.target.classList.contains('cd'))e.target.click()});
document.addEventListener('input',e=>{if(e.target.id==='qs'){ui.q=e.target.value;$('grid').innerHTML=cards()}});
document.addEventListener('change',e=>{const t=e.target;
if(t.id==='end'&&t.value){st.m.end=t.value;D('m');local();R()}
else if(t.id==='nm'){const c=C(t.dataset.id);if(c&&t.value.trim()){c.n=t.value.trim();D('c:'+c.id);local()}}
else if(t.id==='nt'){const c=C(t.dataset.id);if(c){c.t=t.value.slice(0,500);D('c:'+c.id);local()}}
else if(t.id==='imp'&&t.files[0]){const r=new FileReader();r.onload=()=>{try{const v=JSON.parse(r.result);if(!v||!v.ch)throw 0;st=norm(v);dAll();local();R();toast('Backup restored')}catch(x){toast('Invalid backup file')}};r.readAsText(t.files[0])}});
R();initSync();
