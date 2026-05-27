export default function RuleModal({ open, onClose, title, rules }) {
  if (!open) return null;
  return <div className="modalBg" onClick={onClose}><div className="modal" onClick={(e) => e.stopPropagation()}><h3>{title}</h3><ul>{rules.map((r) => <li key={r}>{r}</li>)}</ul><button className="btn" onClick={onClose}>閉じる</button></div></div>;
}
