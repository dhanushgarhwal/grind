const K='grind4', KEY='grind4key';
const $=id=>document.getElementById(id);
const iso=d=>d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
const TD=()=>iso(new Date()), arr=(n,f)=>Array.from({length:n},(_,i)=>f(i));
const esc=s=>String(s??'').replace(/[&<>\"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;','\\':'&#39;'}[c]));
const uid=()=> 'n'+Date.now().toString(36)+Math.random().toString(36).slice(2,7);
const mk=(s,o,n,L,D)=>({id:uid(),s,o,n,L,D,l:arr(L,()=>0),d:arr(D,()=>0),c:0,p:0,t:''});
const datePlus=(days)=>{const d=new Date();d.setHours(0,0,0,0);d.setDate(d.getDate()+days);return iso(d)};
const fresh=()=>({m:{end:datePlus(30),q:2,off:[],od:[],more:{d:'',n:0},goal:10},ch:[],lg:{}});
function norm(o){
  const f=fresh(); o=o&&typeof o==='object'?o:{};
  o.m={...f.m,...(o.m||{})}; o.m.off=Array.isArray(o.m.off)?o.m.off:[]; o.m.od=Array.isArray(o.m.od)?o.m.od:[]; o.m.more={...f.m.more,...(o.m.more||{})};
  o.m.q=Math.max(1,Math.min(60,Number(o.m.q)||2)); o.m.goal=Math.max(1,Math.min(99,Number(o.m.goal)||10));
  o.m.end=/^\d{4}-\d{2}-\d{2}$/.test(o.m.end)?o.m.end:f.m.end;
  o.ch=Array.isArray(o.ch)?o.ch.filter(c=>c&&typeof c==='object').map((c,i)=>({id:c.id||uid(),s:Number.isInteger(c.s)&&c.s>=0&&c.s<SUB.length?c.s:0,o:Number.isFinite(c.o)?c.o:i,n:String(c.n||'Untitled chapter'),L:Math.max(0,Math.min(60,Number(c.L)||0)),D:Math.max(0,Math.min(60,Number(c.D)||0)),l:Array.isArray(c.l)?c.l.map(Boolean).slice(0,60):[],d:Array.isArray(c.d)?c.d.map(Boolean).slice(0,60):[],c:Math.max(0,Math.min(5,Number(c.c)||0)),p:c.p?1:0,t:String(c.t||'')})):[];
  o.ch.forEach(c=>{while(c.l.length<c.L)c.l.push(0);while(c.d.length<c.D)c.d.push(0);if(c.l.length>c.L)c.l.length=c.L;if(c.d.length>c.D)c.d.length=c.D});
  o.lg=o.lg&&typeof o.lg==='object'?o.lg:{}; return o;
}
// Deliberately ignore all legacy localStorage keys. A new app version starts empty.
localStorage.removeItem('grind1');localStorage.removeItem('grind2');localStorage.removeItem('grind3');localStorage.removeItem('grind');
let st=fresh();
try{const saved=JSON.parse(localStorage.getItem(K)||'null');if(saved?.ch&&Array.isArray(saved.ch))st=norm(saved)}catch{}
let key=localStorage.getItem(KEY);if(!key){key=[...crypto.getRandomValues(new Uint8Array(12))].map(x=>x.toString(36).padStart(2,'0')).join('');localStorage.setItem(KEY,key)}
const local=()=>{try{localStorage.setItem(K,JSON.stringify(st))}catch{}};
const C=id=>st.ch.find(c=>c.id===id), sub=si=>st.ch.filter(c=>c.s===si).sort((a,b)=>a.o-b.o);
const done=c=>c.l.filter(Boolean).length, dpp=c=>c.d.filter(Boolean).length, ratio=c=>c.L?done(c)/c.L:0;
const glog=s=>((st.lg[s.slice(0,7)]||{})[s.slice(8)])||[0,0];
const back=n=>{const d=new Date();d.setHours(0,0,0,0);d.setDate(d.getDate()-n);return iso(d)};
function bump(k,v){const T=TD(),m=T.slice(0,7),o=(st.lg[m]=st.lg[m]||{}),a=o[T.slice(8)]=o[T.slice(8)]||[0,0];a[k]=Math.max(0,a[k]+v);D('l:'+m)}
function streak(){let n=0;for(let i=0;i<365;i++){const a=glog(back(i));if(a[0]+a[1]>0)n++;else break}return n}
const fd=s=>new Date(s+'T00:00').toLocaleDateString('en-GB',{weekday:'short',day:'numeric',month:'short'});
