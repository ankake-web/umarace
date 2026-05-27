import { useState } from 'react';
import RuleModal from './RuleModal';

export default function GameShell({ title, subtitle, winCondition, turnLabel, logs, rules, onRetry, onHome, soundToggle, children }) {
  const [open, setOpen] = useState(false);
  return <div className="shell"><header className="panel"><div><h2>{title}</h2><p>{subtitle}</p></div><div className="row"><button className="btn ghost" onClick={() => setOpen(true)}>ルール</button><button className="btn ghost" onClick={onRetry}>リトライ</button><button className="btn ghost" onClick={onHome}>トップへ戻る</button>{soundToggle}</div></header><section className="panel mini"><b>ターン:</b> {turnLabel} / <b>勝利条件:</b> {winCondition}</section>{children}<section className="panel"><h4>ログ</h4><div className="logs">{logs.slice(0, 8).map((l, i) => <div key={i}>{l}</div>)}</div></section><RuleModal open={open} onClose={() => setOpen(false)} title={title + ' ルール'} rules={rules} /></div>;
}
