export default function SoundToggle({ on, onToggle }) { return <button className="btn ghost" onClick={onToggle}>{on ? '🔊 Sound ON' : '🔈 Sound OFF'}</button>; }
