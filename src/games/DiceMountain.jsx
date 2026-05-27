import { useMemo, useState } from 'react';
import { sfx } from '../sound';
const LEN = { 2:3,12:3,3:5,11:5,4:7,10:7,5:9,9:9,6:11,8:11,7:13 };
const allPairs = (d) => [[d[0]+d[1],d[2]+d[3]],[d[0]+d[2],d[1]+d[3]],[d[0]+d[3],d[1]+d[2]]];
const init = () => ({turn:'player',perm:{player:Object.fromEntries(Object.keys(LEN).map(k=>[k,0])),cpu:Object.fromEntries(Object.keys(LEN).map(k=>[k,0]))},tmp:{},active:new Set(),claim:{},dice:[1,1,1,1],logs:['開始'],winner:null});
export default function DiceMountain(){const [st,setSt]=useState(init());
const roll=()=>{if(st.turn!=='player'||st.winner)return;const dice=[1,2,3,4].map(()=>1+Math.floor(Math.random()*6));sfx.dice();setSt(v=>({...v,dice,logs:[`🎲 ${dice.join(',')}`,...v.logs]}));};
const opts=useMemo(()=>allPairs(st.dice),[st.dice]);
const choose=(a,b,who='player')=>setSt(v=>{const n={...v,tmp:{...v.tmp},active:new Set(v.active),logs:[`${who} が ${a}/${b}`,...v.logs]};[a,b].forEach(x=>{if(n.claim[x])return;if(!n.active.has(x)&&n.active.size>=3)return;n.active.add(x);n.tmp[x]=(n.tmp[x]||0)+1;});return n;});
const bank=(who='player')=>setSt(v=>{const n={...v,tmp:{},active:new Set(),perm:{...v.perm,[who]:{...v.perm[who]}},claim:{...v.claim},turn:who==='player'?'cpu':'player'};Object.keys(v.tmp).forEach(k=>{n.perm[who][k]=Math.min(LEN[k],n.perm[who][k]+v.tmp[k]);if(n.perm[who][k]>=LEN[k]&&!n.claim[k])n.claim[k]=who;});const cnt=Object.values(n.claim).filter(x=>x===who).length;if(cnt>=3){n.winner=who;n.turn='end';who==='player'?sfx.win():sfx.lose();}n.logs=[`${who} 確定`,...v.logs];return n;});
const cpu=()=>{if(st.turn!=='cpu'||st.winner)return;const d=[1,2,3,4].map(()=>1+Math.floor(Math.random()*6);const o=allPairs(d)[Math.floor(Math.random()*3)];setTimeout(()=>{choose(o[0],o[1],'CPU');setTimeout(()=>bank('cpu'),300);},300)};
if(st.turn==='cpu'&&!st.winner)setTimeout(cpu,200);
return <div className='panel'><div className='row'><button className='btn' onClick={roll}>🎲 振る</button><button className='btn ghost' onClick={()=>bank('player')}>✅ 確定</button></div><div className='row'>{opts.map((o,i)=><button key={i} className='btn ghost' onClick={()=>choose(o[0],o[1])}>{o[0]} / {o[1]}</button>)}</div>{Object.keys(LEN).map(k=><div key={k}>山道{k} あなた{(st.perm.player[k]||0)+(st.tmp[k]||0)}/{LEN[k]} CPU{st.perm.cpu[k]||0}</div>)}{st.winner&&<h3>{st.winner==='player'?'勝利！':'敗北…'}</h3>}</div>}
