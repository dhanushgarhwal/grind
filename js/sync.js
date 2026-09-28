// Firestore layout: profiles/{key}/meta/main · profiles/{key}/chapters/{id} · profiles/{key}/log/{YYYY-MM}
// Every document stays a few KB, far below the 1 MB limit.
const SYL={off:'Local',sync:'Syncing',ok:'Synced',err:'Offline'};
let db=null,ready=0,sy='off',dirty=new Set(),ft=0;
const ref=(c,id)=>db.collection('profiles').doc(key).collection(c).doc(id);
function setSy(v){sy=v;document.querySelectorAll('[data-sy]').forEach(e=>{e.dataset.sy=v;const t=e.querySelector('span');if(t)t.textContent=SYL[v]})}
function D(k){dirty.add(k);clearTimeout(ft);ft=setTimeout(flush,700)}
async function flush(){if(!ready||!dirty.size)return;setSy('sync');const ks=[...dirty];dirty.clear();
try{for(let i=0;i<ks.length;i+=400){const b=db.batch();ks.slice(i,i+400).forEach(k=>{const t=k[0],x=k.slice(2);
if(t==='m')b.set(ref('meta','main'),st.m);else if(t==='c'){const c=C(x);if(c)b.set(ref('chapters',x),c)}else if(t==='x')b.delete(ref('chapters',x));else b.set(ref('log',x),{d:st.lg[x]||{}})});await b.commit()}setSy('ok')}
catch(e){ks.forEach(k=>dirty.add(k));setSy('err')}}
const dAll=()=>{D('m');st.ch.forEach(c=>D('c:'+c.id));Object.keys(st.lg).forEach(m=>D('l:'+m))};
function listen(){['meta','chapters','log'].forEach(c=>db.collection('profiles').doc(key).collection(c).onSnapshot(s=>{
if(s.empty&&!s.metadata.fromCache){if(c==='chapters')dAll();return}
let ch=0;s.docChanges().forEach(x=>{if(x.doc.metadata.hasPendingWrites)return;const v=x.doc.data(),id=x.doc.id;
if(c==='meta')st.m={...st.m,...v};
else if(c==='chapters'){if(x.type==='removed'){st.ch=st.ch.filter(k=>k.id!==id)}else if(!dirty.has('x:'+id)){const n={...v,id,s:v.s??v.si,o:v.o??v.ci},i=st.ch.findIndex(k=>k.id===id);if(i<0)st.ch.push(n);else st.ch[i]=n}}
else st.lg[id]=v.d;ch=1});
if(ch){norm(st);local();if(!/INPUT|TEXTAREA/.test((document.activeElement||{}).tagName||''))R()}if(!s.metadata.fromCache)setSy('ok')},()=>setSy('err')))}
function initSync(){if(!window.firebase)return;try{firebase.initializeApp(CFG);db=firebase.firestore();db.enablePersistence({synchronizeTabs:true}).catch(()=>{});setSy('sync');
firebase.auth().signInAnonymously().then(()=>{ready=1;listen();flush()}).catch(()=>setSy('err'))}catch(e){setSy('err')}}
