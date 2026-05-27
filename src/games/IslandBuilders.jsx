import { useState } from 'react';
import { sfx } from '../sound';
const RES=['木','石','麦','羊','鉱'];
const tiles=[{n:5,r:'木'},{n:6,r:'石'},{n:8,r:'麦'},{n:9,r:'羊'},{n:4,r:'鉱'},{n:10,r:'木'},{n:3,r:'石'}];
const costs={road:{木:1,石:1},village:{木:1,石:1,麦:1,羊:1},town:{麦:2,鉱:3},plan:{羊:1,麦:1,鉱:1}};
const initP=()=>({res:Object.fromEntries(RES.map(r=>[r,0])),roads:0,villages:2,towns:0,vp:2,plans:0});
export default function IslandBuilders(){const [p,setP]=useState(initP());const [c,setC]=useState(initP());const [logs,setLogs]=useState(['開始']);const [turn,setTurn]=useState('あなた');const [winner,setWinner]=useState(null);
const can=(obj,cost)=>Object.entries(cost).every(([k,v])=>obj.res[k]>=v);
const pay=(obj,cost)=>{const n={...obj,res:{...obj.res}};Object.entries(cost).forEach(([k,v])=>n.res[k]-=v);return n;};
const gain=(obj,sum)=>{const n={...obj,res:{...obj.res}};tiles.filter(t=>t.n===sum).forEach(t=>n.res[t.r]+=1+Math.floor(obj.towns/2));return n;};
const roll=()=>{if(turn!=='あなた'||winner)return;const sum=1+Math.floor(Math.random()*6)+1+Math.floor(Math.random()*6);sfx.dice();setP(v=>gain(v,sum));setC(v=>gain(v,sum));setLogs(v=>[`出目${sum} 資源配布`,...v]);};
const build=(type)=>{if(turn!=='あなた'||winner)return;const cost=costs[type];if(!can(p,cost)){sfx.fail();setLogs(v=>[`資源不足:${type}`,...v]);return;}let n=pay(p,cost);if(type==='road')n.roads+=1;if(type==='village'){n.villages+=1;n.vp+=1;}if(type==='town'&&n.villages>0){n.villages-=1;n.towns+=1;n.vp+=1;}if(type==='plan'){n.plans+=1;n.vp+=Math.random()<0.5?1:0;}sfx.build();setP(n);if(n.vp>=7){setWinner('あなた');sfx.win();return;}setTurn('CPU');setTimeout(cpu,500);};
const cpu=()=>{let n={...c};const actions=['town','village','road','plan'];for(const a of actions){if(can(n,costs[a])){n=pay(n,costs[a]);if(a==='town'&&n.villages>0){n.villages--;n.towns++;n.vp++;}if(a==='village'){n.villages++;n.vp++;}if(a==='road')n.roads++;if(a==='plan'&&Math.random()<0.4)n.vp++;break;}}setC(n);setLogs(v=>['CPUが建設',...v]);if(n.vp>=7){setWinner('CPU');sfx.lose();}setTurn('あなた');};
return <div className='panel'><div>資源 あなた {RES.map(r=>`${r}${p.res[r]}`).join(' ')}</div><div>CPU {RES.map(r=>`${r}${c.res[r]}`).join(' ')}</div><div>得点 あなた{p.vp} CPU{c.vp}</div><div className='row'><button className='btn' onClick={roll}>🎲 ダイス</button><button className='btn ghost' onClick={()=>build('road')}>道</button><button className='btn ghost' onClick={()=>build('village')}>村</button><button className='btn ghost' onClick={()=>build('town')}>町</button><button className='btn ghost' onClick={()=>build('plan')}>発展</button></div><div className='hex'>{tiles.map((t,i)=><span key={i} className='tile'>{t.r}{t.n}</span>)}</div>{winner&&<h3>{winner==='あなた'?'勝利!':'敗北...'}</h3>}</div>}
