import { useState } from 'react';
import Home from './components/Home';
import GameShell from './components/GameShell';
import SoundToggle from './components/SoundToggle';
import { isSoundOn, toggleSound } from './sound';
import UmaRace from './games/UmaRace';
import IslandBuilders from './games/IslandBuilders';
import DiceMountain from './games/DiceMountain';
import SecretLetter from './games/SecretLetter';

const games = [
  { key:'uma', title:'うまうまレース', genre:'レース×予想', desc:'既存ゲームをそのまま収録。', features:['既存挙動を維持','トップから起動'] },
  { key:'island', title:'島の開拓者', genre:'資源×建設×得点競争', desc:'ダイスで資源獲得、建設で7点先取。', features:['プレイヤーvsCPU','資源5種','道・村・町・発展'] },
  { key:'dice', title:'ダイス登山', genre:'4ダイス×チキンレース', desc:'分け方3択で進む山道戦。', features:['バーストあり','最大3ルート同時','3本制覇で勝利'] },
  { key:'secret', title:'密書カードバトル', genre:'軽量心理戦カード', desc:'2枚から1枚選ぶ読み合い。', features:['3ラウンド先取','CPU対戦','カード効果あり'] }
];

export default function App(){
  const [current, setCurrent] = useState(null);
  const [soundOn, setSoundOn] = useState(isSoundOn());
  const soundToggle = <SoundToggle on={soundOn} onToggle={() => setSoundOn(toggleSound())} />;
  if(!current) return <div className='app'><Home games={games} onStart={setCurrent} soundToggle={soundToggle} /></div>;
  const map = {uma:<UmaRace/>, island:<IslandBuilders/>, dice:<DiceMountain/>, secret:<SecretLetter/>};
  const rules = {
    uma:['既存のうまうまレースを遊べます。'],
    island:['2D6で資源発生','資源で建設','7点で勝利'],
    dice:['4ダイスを2組に分ける','同時3ルートまで','バーストで仮進行消失'],
    secret:['1枚引いて1枚使う','効果解決後に判定','3ラウンド先取']
  };
  return <div className='app'><GameShell title={games.find(g=>g.key===current).title} subtitle={games.find(g=>g.key===current).desc} winCondition='各ゲーム内表示' turnLabel='ゲーム内表示' logs={['ゲーム中']} rules={rules[current]} onRetry={() => setCurrent(current + '')} onHome={() => setCurrent(null)} soundToggle={soundToggle}>{map[current]}</GameShell></div>;
}
