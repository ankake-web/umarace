export default function Home({ games, onStart, soundToggle }) {
  return <div><header className="hero panel"><h1>🎲 わいわいボードゲーム集</h1><p>スマホで遊びやすい4本を収録。読み合い、建設、ダイス運を楽しもう。</p>{soundToggle}</header><div className="grid">{games.map((g) => <article className="panel card" key={g.key}><h3>{g.title}</h3><p className="genre">{g.genre}</p><p>{g.desc}</p><ul>{g.features.map((f) => <li key={f}>{f}</li>)}</ul><button className="btn" onClick={() => onStart(g.key)}>開始</button></article>)}</div></div>;
}
