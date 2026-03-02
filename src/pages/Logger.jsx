import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Plus, X, Edit3, Trash2, ChevronDown, ChevronUp, Tag } from 'lucide-react';
import './Logger.css';

const TYPES = ['Photography', 'Short-Form Video', 'Long-Form Video', 'Blog Post'];
const PLATFORMS = ['Instagram', 'TikTok', 'YouTube', 'LinkedIn', 'Substack'];
const STATUSES = ['Idea', 'In Progress', 'Posted'];

export default function Logger() {
  const { entries, dispatch } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ title: '', type: TYPES[0], platform: PLATFORMS[0], status: 'Idea', tags: '', notes: '' });
  const [filter, setFilter] = useState('All');
  const [expandedId, setExpandedId] = useState(null);

  const resetForm = () => {
    setForm({ title: '', type: TYPES[0], platform: PLATFORMS[0], status: 'Idea', tags: '', notes: '' });
    setEditingId(null);
    setShowForm(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    const entry = {
      ...form,
      title: form.title.trim(),
      tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
      notes: form.notes.trim(),
    };

    if (editingId) {
      dispatch({ type: 'UPDATE_ENTRY', payload: { ...entry, id: editingId } });
    } else {
      dispatch({ type: 'ADD_ENTRY', payload: entry });
    }
    resetForm();
  };

  const handleEdit = (entry) => {
    setForm({
      title: entry.title,
      type: entry.type,
      platform: entry.platform,
      status: entry.status,
      tags: (entry.tags || []).join(', '),
      notes: entry.notes || '',
    });
    setEditingId(entry.id);
    setShowForm(true);
  };

  const handleStatusChange = (entry, newStatus) => {
    dispatch({ type: 'UPDATE_ENTRY', payload: { id: entry.id, status: newStatus } });
  };

  const filtered = filter === 'All' ? entries : entries.filter(e => e.status === filter);
  const sorted = [...filtered].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="logger page">
      <header className="page-header">
        <h1>Content Logger</h1>
        <button className="btn btn-primary btn-sm" onClick={() => { resetForm(); setShowForm(true); }}>
          <Plus size={16} /> New
        </button>
      </header>

      {showForm && (
        <div className="modal-overlay" onClick={resetForm}>
          <form className="logger-form card" onClick={e => e.stopPropagation()} onSubmit={handleSubmit}>
            <div className="form-header">
              <h3>{editingId ? 'Edit Entry' : 'Log Content'}</h3>
              <button type="button" className="btn-icon" onClick={resetForm}><X size={18} /></button>
            </div>

            <div className="form-group">
              <label>Title</label>
              <input
                className="input-field"
                type="text"
                placeholder="What are you creating?"
                value={form.title}
                onChange={e => setForm({...form, title: e.target.value})}
                autoFocus
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Type</label>
                <select className="input-field" value={form.type} onChange={e => setForm({...form, type: e.target.value})}>
                  {TYPES.map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label>Platform</label>
                <select className="input-field" value={form.platform} onChange={e => setForm({...form, platform: e.target.value})}>
                  {PLATFORMS.map(p => <option key={p}>{p}</option>)}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Status</label>
              <div className="status-pills">
                {STATUSES.map(s => (
                  <button
                    key={s}
                    type="button"
                    className={`status-pill ${form.status === s ? 'active' : ''} status-${s.replace(/\s/g, '-').toLowerCase()}`}
                    onClick={() => setForm({...form, status: s})}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>Tags <span className="label-hint">(comma separated)</span></label>
              <input
                className="input-field"
                type="text"
                placeholder="e.g. vlog, tutorial, trending"
                value={form.tags}
                onChange={e => setForm({...form, tags: e.target.value})}
              />
            </div>

            <div className="form-group">
              <label>Notes</label>
              <textarea
                className="input-field textarea"
                placeholder="Any thoughts or notes..."
                value={form.notes}
                onChange={e => setForm({...form, notes: e.target.value})}
                rows={3}
              />
            </div>

            <button type="submit" className="btn btn-primary btn-block">
              {editingId ? 'Update Entry' : 'Log It! +10 XP'}
            </button>
          </form>
        </div>
      )}

      <div className="filter-row">
        {['All', ...STATUSES].map(s => (
          <button
            key={s}
            className={`filter-chip ${filter === s ? 'active' : ''}`}
            onClick={() => setFilter(s)}
          >
            {s} {s !== 'All' && <span className="filter-count">{entries.filter(e => e.status === s).length}</span>}
          </button>
        ))}
      </div>

      {sorted.length === 0 ? (
        <div className="empty-state">
          <p>No entries yet. Start logging your content!</p>
        </div>
      ) : (
        <div className="entries-list">
          {sorted.map(entry => (
            <div key={entry.id} className="entry-card card">
              <div className="entry-main" onClick={() => setExpandedId(expandedId === entry.id ? null : entry.id)}>
                <div className="entry-left">
                  <span className={`status-dot status-${entry.status?.replace(/\s/g, '-').toLowerCase()}`} />
                  <div className="entry-info">
                    <span className="entry-title">{entry.title}</span>
                    <span className="entry-meta">{entry.type} · {entry.platform}</span>
                  </div>
                </div>
                <div className="entry-right">
                  <select
                    className="status-select"
                    value={entry.status}
                    onChange={(e) => { e.stopPropagation(); handleStatusChange(entry, e.target.value); }}
                    onClick={e => e.stopPropagation()}
                  >
                    {STATUSES.map(s => <option key={s}>{s}</option>)}
                  </select>
                  {expandedId === entry.id ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </div>
              </div>

              {expandedId === entry.id && (
                <div className="entry-expanded">
                  {entry.tags && entry.tags.length > 0 && (
                    <div className="entry-tags">
                      <Tag size={12} />
                      {entry.tags.map((tag, i) => (
                        <span key={i} className="tag">{tag}</span>
                      ))}
                    </div>
                  )}
                  {entry.notes && <p className="entry-notes">{entry.notes}</p>}
                  <div className="entry-date">{new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' })}</div>
                  <div className="entry-actions">
                    <button className="btn btn-ghost btn-sm" onClick={() => handleEdit(entry)}>
                      <Edit3 size={14} /> Edit
                    </button>
                    <button className="btn btn-ghost btn-sm btn-danger" onClick={() => dispatch({ type: 'DELETE_ENTRY', payload: entry.id })}>
                      <Trash2 size={14} /> Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
