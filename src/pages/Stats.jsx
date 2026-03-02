import { useApp } from '../context/AppContext';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line,
} from 'recharts';
import './Stats.css';

const COLORS = ['#FF6B6B', '#4ECDC4', '#F4A261', '#2C3E50', '#95a5a6'];

export default function Stats() {
  const { entries, streak, xp, level, levelName, completedPrompts, streakHistory } = useApp();

  // Posts by type
  const typeCount = {};
  entries.forEach(e => { typeCount[e.type] = (typeCount[e.type] || 0) + 1; });
  const byType = Object.entries(typeCount).map(([name, value]) => ({ name, value }));

  // Posts by platform
  const platformCount = {};
  entries.forEach(e => { platformCount[e.platform] = (platformCount[e.platform] || 0) + 1; });
  const byPlatform = Object.entries(platformCount).map(([name, value]) => ({ name, value }));

  // Posts per week (last 8 weeks)
  const weeklyData = [];
  const now = new Date();
  for (let i = 7; i >= 0; i--) {
    const weekStart = new Date(now);
    weekStart.setDate(weekStart.getDate() - (i * 7 + weekStart.getDay()));
    weekStart.setHours(0, 0, 0, 0);
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 7);
    const count = entries.filter(e => {
      const d = new Date(e.date);
      return d >= weekStart && d < weekEnd;
    }).length;
    const label = `${weekStart.getMonth() + 1}/${weekStart.getDate()}`;
    weeklyData.push({ name: label, posts: count });
  }

  // Streak history (last 14 entries)
  const recentStreaks = streakHistory.slice(-14).map(s => ({
    name: new Date(s.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    streak: s.streak,
  }));

  const totalPosts = entries.filter(e => e.status === 'Posted').length;
  const totalIdeas = entries.filter(e => e.status === 'Idea').length;
  const totalInProgress = entries.filter(e => e.status === 'In Progress').length;

  return (
    <div className="stats page">
      <h1>Stats</h1>

      <div className="stat-overview">
        <div className="stat-card card">
          <span className="stat-number">{entries.length}</span>
          <span className="stat-label">Total Entries</span>
        </div>
        <div className="stat-card card">
          <span className="stat-number">{totalPosts}</span>
          <span className="stat-label">Posted</span>
        </div>
        <div className="stat-card card">
          <span className="stat-number">{streak}</span>
          <span className="stat-label">Day Streak</span>
        </div>
        <div className="stat-card card">
          <span className="stat-number">{xp}</span>
          <span className="stat-label">Total XP</span>
        </div>
      </div>

      <div className="stat-summary">
        <span className="stat-badge">{levelName} (Lv.{level + 1})</span>
        <span className="stat-badge">{completedPrompts.length} Prompts Done</span>
        <span className="stat-badge">{totalIdeas} Ideas</span>
        <span className="stat-badge">{totalInProgress} In Progress</span>
      </div>

      {byType.length > 0 && (
        <div className="chart-section card">
          <h3>Posts by Type</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={byType} margin={{ top: 5, right: 5, bottom: 5, left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="value" fill="#FF6B6B" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {byPlatform.length > 0 && (
        <div className="chart-section card">
          <h3>Posts by Platform</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={byPlatform}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={3}
                dataKey="value"
                label={({ name, value }) => `${name} (${value})`}
              >
                {byPlatform.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}

      {weeklyData.some(w => w.posts > 0) && (
        <div className="chart-section card">
          <h3>Posts per Week</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={weeklyData} margin={{ top: 5, right: 5, bottom: 5, left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 11 }} allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="posts" fill="#4ECDC4" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {recentStreaks.length > 0 && (
        <div className="chart-section card">
          <h3>Streak History</h3>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={recentStreaks} margin={{ top: 5, right: 5, bottom: 5, left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 11 }} allowDecimals={false} />
              <Tooltip />
              <Line type="monotone" dataKey="streak" stroke="#F4A261" strokeWidth={2} dot={{ fill: '#F4A261', r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {entries.length === 0 && (
        <div className="empty-state">
          <p>Start logging content to see your stats here!</p>
        </div>
      )}
    </div>
  );
}
