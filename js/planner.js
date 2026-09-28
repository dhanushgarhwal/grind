const pend=()=>SUB.map((_,si)=>{const a=[];sub(si).forEach(c=>c.l.forEach((v,li)=>{if(!v)a.push({si,id:c.id,li,p:c.p})}));return a});
const merged=()=>{const a=[];pend().forEach((p,si)=>p.forEach((x,j)=>a.push({k:(j+.5)/p.length-(x.p?.15:0),si,id:x.id,li:x.li})));return a.sort((u,v)=>u.k-v.k||u.si-v.si)};
function days(){const r=[],e=new Date(st.m.end+'T00:00'),d=new Date();d.setHours(0,0,0,0);for(;d<=e;d.setDate(d.getDate()+1)){const s=iso(d);if(!st.m.off.includes(d.getDay())&&!st.m.od.includes(s))r.push(s)}return r}
function caps(N,n,q){const a=[];if(n<=0)return a;if(N>=q*n)for(let i=0;i<n;i++)a.push(Math.floor((i+1)*N/n)-Math.floor(i*N/n));else for(let r=N;r>0;r-=q)a.push(Math.min(q,r));return a}
function take(M,k,used){const r=[];while(k-->0&&M.length){let j=M.findIndex((m,i)=>i<8&&!used.has(m.si));if(j<0)j=0;const m=M.splice(j,1)[0];used.add(m.si);r.push(m)}return r}
function plan(){const T=TD(),ds=days(),M=merged(),dT=[];
st.ch.forEach(c=>c.l.forEach((v,li)=>{if(v===T)dT.push({si:c.s,id:c.id,li})}));
const out=[];let i0=0;
if(ds[0]===T){const c0=caps(M.length+dT.length,ds.length,st.m.q)[0]||0,k=Math.max(0,c0-dT.length)+(st.m.more.d===T?st.m.more.n:0);out.push({d:T,it:take(M,k,new Set(dT.map(x=>x.si)))});i0=1}
const rest=ds.slice(i0),cp=caps(M.length,rest.length,st.m.q);
rest.forEach((d,i)=>out.push({d,it:take(M,cp[i]||0,new Set())}));
return{out,dT,ds,left:M.length}}
function stats(){let L=0,a=0,Dn=0,b=0;st.ch.forEach(c=>{L+=c.L;a+=done(c);Dn+=c.D;b+=dpp(c)});return{L,a,D:Dn,b}}
function status(p){const N=p.left,n=p.ds.length,q=st.m.q;if(!st.ch.length)return['Ready','ok'];if(!N)return['All done','ok'];if(n<=0)return['Past deadline','bad'];
if(N>q*n)return N/n>q+1?['Behind','bad']:['Stretch +'+(N-q*n),'wa'];
const last=p.out.reduce((a,x,i)=>x.it.length?i:a,0),e=n-1-last;return e>=1?['Ahead '+e+'d','ok']:['On track','ok']}
