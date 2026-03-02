import { useApp } from '../context/AppContext';
import CatAvatar from '../components/CatAvatar';
import XpBar from '../components/XpBar';
import { Flame, Zap, ArrowRight, Camera, Video, FileText, Tv } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const TYPE_ICONS = {
  'Photography': Camera,
  'Short-Form Video': Video,
  'Long-Form Video': Tv,
  'Blog Post': FileText,
};

export default function Dashboard() {
  const { catName, streak, xp, level, levelName, promptOfTheDay, entries } = useApp();
  const navigate = useNavigate();

  const todayEntries = entries.filter(e => {
    const today = new Date().toISOString().split('T')[0];
    return e.date?.startsWith(today);
  });

  const PromptIcon = promptOfTheDay?.suggestedType ? TYPE_ICONS[promptOfTheDay.suggestedType] || Zap : Zap;

  return (
    <div className="dashboard page">
      <header className="dashboard-header">
        <h1>Content Cat</h1>
        <div className="streak-badge">
          <Flame size={16} />
          <span>{streak} day{streak !== 1 ? 's' : ''}</span>
        </div>
      </header>

      <div className="cat-showcase">
        <CatAvatar size={180} />
      </div>

      <div className="xp-section">
        <XpBar />
      </div>

      {promptOfTheDay && (
        <div className="prompt-of-day card" onClick={() => navigate('/prompts')}>
          <div className="potd-header">
            <Zap size={16} />
            <span>Prompt of the Day</span>
          </div>
          <p className="potd-text">{promptOfTheDay.text}</p>
          <div className="potd-meta">
            <span className="potd-tag">{promptOfTheDay.suggestedType}</span>
            <span className="potd-tag">{promptOfTheDay.suggestedPlatform}</span>
            {promptOfTheDay.categoryName && (
              <span className="potd-category">{promptOfTheDay.categoryName}</span>
            )}
          </div>
        </div>
      )}

      <div className="quick-actions">
        <button className="card action-card" onClick={() => navigate('/logger')}>
          <div className="action-icon log-icon">
            <FileText size={20} />
          </div>
          <div className="action-text">
            <strong>Log Content</strong>
            <span>+10 XP</span>
          </div>
          <ArrowRight size={16} className="action-arrow" />
        </button>
        <button className="card action-card" onClick={() => navigate('/prompts')}>
          <div className="action-icon prompt-icon">
            <Zap size={20} />
          </div>
          <div className="action-text">
            <strong>Get Inspired</strong>
            <span>+15 XP</span>
          </div>
          <ArrowRight size={16} className="action-arrow" />
        </button>
      </div>

      {todayEntries.length > 0 && (
        <div className="today-activity">
          <h3>Today's Activity</h3>
          {todayEntries.map(entry => (
            <div key={entry.id} className="today-entry">
              <span className={`status-dot status-${entry.status?.replace(/\s/g, '-').toLowerCase()}`} />
              <span className="today-entry-title">{entry.title}</span>
              <span className="today-entry-type">{entry.type}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
