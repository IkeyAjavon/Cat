import { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { DEFAULT_CATEGORIES } from '../data/prompts';
import CatAvatar from '../components/CatAvatar';
import { Download, Upload, Trash2, Edit3, Check, X, RotateCcw } from 'lucide-react';
import './SettingsPage.css';

export default function SettingsPage() {
  const state = useApp();
  const { catName, xp, level, levelName, categories, customCategories, selectedCategoryIds, dispatch } = state;
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(catName);
  const [showConfirmReset, setShowConfirmReset] = useState(false);
  const fileRef = useRef();

  const handleRename = () => {
    if (name.trim()) {
      dispatch({ type: 'RENAME_CAT', payload: name.trim() });
    }
    setEditing(false);
  };

  const handleExport = () => {
    const data = {
      catName: state.catName,
      xp: state.xp,
      entries: state.entries,
      completedPrompts: state.completedPrompts,
      customCategories: state.customCategories,
      selectedCategoryIds: state.selectedCategoryIds,
      lastActiveDate: state.lastActiveDate,
      streakHistory: state.streakHistory,
      onboarded: state.onboarded,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `content-cat-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target.result);
        dispatch({ type: 'IMPORT_DATA', payload: data });
        setName(data.catName || catName);
      } catch {
        alert('Invalid JSON file');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleReset = () => {
    dispatch({ type: 'RESET' });
    setShowConfirmReset(false);
  };

  const allCategories = [...categories, ...customCategories];

  return (
    <div className="settings page">
      <h1>Settings</h1>

      <div className="settings-section card">
        <div className="cat-preview">
          <CatAvatar size={100} showInfo={false} />
        </div>
        <div className="cat-name-edit">
          {editing ? (
            <div className="name-edit-row">
              <input
                className="input-field"
                value={name}
                onChange={e => setName(e.target.value)}
                maxLength={20}
                autoFocus
              />
              <button className="btn-icon" onClick={handleRename}><Check size={18} /></button>
              <button className="btn-icon" onClick={() => { setEditing(false); setName(catName); }}><X size={18} /></button>
            </div>
          ) : (
            <div className="name-display-row">
              <span className="settings-cat-name">{catName}</span>
              <button className="btn-icon" onClick={() => setEditing(true)}><Edit3 size={16} /></button>
            </div>
          )}
          <span className="settings-cat-level">Lv.{level + 1} {levelName} · {xp} XP</span>
        </div>
      </div>

      <div className="settings-section">
        <h3>Manage Categories</h3>
        <p className="settings-hint">Toggle categories on or off. Custom categories can be deleted.</p>
        <div className="category-manage-list">
          {allCategories.map(cat => {
            const isSelected = selectedCategoryIds.includes(cat.id);
            const isCustom = cat.isCustom;
            return (
              <div key={cat.id} className="category-manage-item">
                <label className="category-toggle">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => dispatch({ type: 'TOGGLE_CATEGORY', payload: cat.id })}
                  />
                  <span className="toggle-track"><span className="toggle-thumb" /></span>
                  <span className="category-manage-name">{cat.name}</span>
                  {isCustom && <span className="custom-badge">Custom</span>}
                </label>
                {isCustom && (
                  <button
                    className="btn-icon btn-danger-icon"
                    onClick={() => dispatch({ type: 'DELETE_CUSTOM_CATEGORY', payload: cat.id })}
                  >
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="settings-section">
        <h3>Data</h3>
        <div className="settings-buttons">
          <button className="btn btn-ghost" onClick={handleExport}>
            <Download size={16} /> Export JSON
          </button>
          <button className="btn btn-ghost" onClick={() => fileRef.current?.click()}>
            <Upload size={16} /> Import JSON
          </button>
          <input ref={fileRef} type="file" accept=".json" onChange={handleImport} hidden />
        </div>
      </div>

      <div className="settings-section">
        <h3>Danger Zone</h3>
        {showConfirmReset ? (
          <div className="reset-confirm card">
            <p>Are you sure? This will delete ALL your data including your cat, entries, and progress.</p>
            <div className="reset-actions">
              <button className="btn btn-ghost" onClick={() => setShowConfirmReset(false)}>Cancel</button>
              <button className="btn btn-danger" onClick={handleReset}>
                <Trash2 size={14} /> Yes, Reset Everything
              </button>
            </div>
          </div>
        ) : (
          <button className="btn btn-ghost btn-danger-text" onClick={() => setShowConfirmReset(true)}>
            <RotateCcw size={16} /> Reset All Data
          </button>
        )}
      </div>

      <div className="settings-footer">
        <p>Content Cat v1.0</p>
        <p>Data stored locally in your browser.</p>
      </div>
    </div>
  );
}
