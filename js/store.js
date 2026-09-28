const K='grind3',$=id=>document.getElementById(id);
const iso=d=>d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
const TD=()=>iso(new Date()),arr=(n,f)=>Array.from({length:n},(_,i)=>f(i));
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const uid=()=>'n'+Date.now().toString(36)+Math.random().toString(36).slice(2,5);
const mk=(s,o,n,L,D,sl=0,sd=0,id)=>({id:id||uid(),s,o,n,L,D,l:arr(L,i=>i<sl?'s':0),d:arr(D,i=>i<sd?1:0),c:0,p:0,t:''});
const fresh=()=>({m:{end:'2027-01-31',q:2,off:[],od:[],more:{d:'',n:0},goal:10},ch:S.flatMap((cs,s)=>cs.map((c,o)=>mk(s,o,c[0],c[1],c[2],c[3],c[4],s+'_'+o))),lg:{}});
function norm(o){o.m=o.m||{end:o.end,q:o.q,off:o.off,od:o.od,more:o.more};const m=o.m;m.end=m.end||'2027-01-31';m.q=m.q||2;m.off=m.off||[];m.od=m.od||[];m.more=m.more||{d:'',n:0};m.goal=m.goal||10;o.lg=o.lg||{};
if(o.ch[0]&&Array.isArray(o.ch[0]))o.ch=o.ch.flatMap((cs,s)=>cs.map((c,i)=>({...c,id:s+'_'+i,s,o:i})));
o.ch.forEach(c=>{c.c=c.c||0;c.p=c.p||0;c.t=c.t||''});return o}
let st;for(const k of [K,'grind2','grind1']){try{const v=JSON.parse(localStorage.getItem(k));if(v&&v.ch){st=norm(v);break}}catch(e){}}st=st||fresh();
let key=localStorage.getItem('grindkey');if(!key){key=[...crypto.getRandomValues(new Uint8Array(12))].map(x=>x.toString(36).padStart(2,'0')).join('');localStorage.setItem('grindkey',key)}
const local=()=>{try{localStorage.setItem(K,JSON.stringify(st))}catch(e){}};
const C=id=>st.ch.find(c=>c.id===id),sub=si=>st.ch.filter(c=>c.s===si).sort((a,b)=>a.o-b.o);
const done=c=>c.l.filter(Boolean).length,dpp=c=>c.d.filter(Boolean).length,ratio=c=>c.L?done(c)/c.L:0;
const glog=s=>((st.lg[s.slice(0,7)]||{})[s.slice(8)])||[0,0];
const back=n=>{const d=new Date();d.setDate(d.getDate()-n);return iso(d)};
function bump(k,v){const T=TD(),m=T.slice(0,7),o=(st.lg[m]=st.lg[m]||{}),a=o[T.slice(8)]=o[T.slice(8)]||[0,0];a[k]=Math.max(0,a[k]+v);D('l:'+m)}
function streak(){const t=glog(TD());let n=0,i=t[0]+t[1]?0:1;for(;;i++){const a=glog(back(i));if(a[0]+a[1]>0)n++;else break}return n}
const fd=s=>new Date(s+'T00:00').toLocaleDateString('en-GB',{weekday:'short',day:'numeric',month:'short'});
