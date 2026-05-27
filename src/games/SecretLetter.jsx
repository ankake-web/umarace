import { useState } from 'react';
import { sfx } from '../sound';
const cards=[{n:'影見',v:1,e:'guess'},{n:'斥候',v:2,e:'peek'},{n:'決闘士',v:3,e:'duel'},{n:'守り手',v:4,e:'guard'},{n:'商人',v:5,e:'draw2'},{n:'王紋',v:8,e:'royal'}];
const draw=(d)=>d.pop();
function mkDeck(){const d=[];cards.forEach(c=>{for(let i=0;i<2;i++)d.push({...c,id:Math.random()});});return d.sort(()=>Math.random()-0.5)}
export default function SecretLetter(){const [deck,setDeck]=useState(mkDeck());const [ph,setPh]=useState([draw(deck)]);const [ch,setCh]=useState([draw(deck)]);const [score,setScore]=useState({p:0,c:0,r:1});const [logs,setLogs]=useState(['開始']);const [winner,setWinner]=useState(null);
const turn=()=>{if(winner)return;const d=[...deck];const p=[...ph,draw(d)];setDeck(d);setPh(p);};
const play=(idx)=>{const p=[...ph];const played=p.splice(idx,1)[0];let cpu=[...ch];if(cpu.length<2&&deck.length){const d=[...deck];cpu=[...cpu,d.pop()];setDeck(d);}const cPlayed=cpu.splice(Math.floor(Math.random()*cpu.length),1)[0];setPh(p);setCh(cpu);sfx.card();setLogs(v=>[`あなた:${played.n} CPU:${cPlayed.n}`,...v]);const pv=p[0]?.v||0,cv=cpu[0]?.v||0;if(pv===0||cv===0||deck.length===0){let np=score.p,nc=score.c;if(pv>cv)np++;else if(cv>pv)nc++;const nr=score.r+1;setScore({p:np,c:nc,r:nr});if(np>=3||nc>=3){setWinner(np>nc?'あなた':'CPU');np>nc?sfx.win():sfx.lose();return;}const nd=mkDeck();setDeck(nd);setPh([draw(nd)]);setCh([draw(nd)]);setLogs(v=>['次ラウンド',...v]);}}
return <div className='panel'><div>ラウンド{score.r} 勝利数 あなた{score.p} CPU{score.c}</div><button className='btn' onClick={turn}>1枚引く</button><div className='row'>{ph.map((c,i)=><button key={c.id} className='btn ghost' onClick={()=>play(i)}>{c.n}({c.v})</button>)}</div><div>CPU手札: {ch.length}枚</div>{winner&&<h3>{winner==='あなた'?'総合勝利!':'総合敗北'}</h3>}</div>}
