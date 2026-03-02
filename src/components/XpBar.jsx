import { useApp } from '../context/AppContext';
import './XpBar.css';

export default function XpBar({ compact = false }) {
  const { xp, level, levelName, levelProgress, nextLevelXp, currentLevelXp } = useApp();

  return (
    <div className={`xp-bar-container ${compact ? 'compact' : ''}`}>
      <div className="xp-bar-header">
        <span className="xp-level-badge">Lv.{level + 1} {levelName}</span>
        <span className="xp-amount">
          {nextLevelXp ? `${xp} / ${nextLevelXp} XP` : `${xp} XP (MAX)`}
        </span>
      </div>
      <div className="xp-bar-track">
        <div
          className="xp-bar-fill"
          style={{ width: `${Math.min(levelProgress * 100, 100)}%` }}
        />
      </div>
    </div>
  );
}
