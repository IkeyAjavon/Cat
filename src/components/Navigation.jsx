import { NavLink } from 'react-router-dom';
import { LayoutDashboard, BookOpen, Lightbulb, BarChart3, Settings } from 'lucide-react';
import './Navigation.css';

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Home' },
  { to: '/logger', icon: BookOpen, label: 'Log' },
  { to: '/prompts', icon: Lightbulb, label: 'Prompts' },
  { to: '/stats', icon: BarChart3, label: 'Stats' },
  { to: '/settings', icon: Settings, label: 'Settings' },
];

export default function Navigation() {
  return (
    <nav className="bottom-nav">
      {navItems.map(({ to, icon: Icon, label }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          end={to === '/'}
        >
          <Icon size={20} />
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
