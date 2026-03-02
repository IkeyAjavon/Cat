import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Check, ChevronRight, Plus, X, Sparkles, Film, Building2, User, Heart, DollarSign, Globe, Sprout, Flame } from 'lucide-react';
import './Prompts.css';

const ICON_MAP = {
  Film, Building2, User, Heart, DollarSign, Globe, Sprout, Flame,
};

export default function Prompts() {
  const { categories, customCategories, selectedCategoryIds, completedPrompts, dispatch } = useApp();
  const [activeCategory, setActiveCategory] = useState(null);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [newCatName, setNewCatName] = useState('');
  const [newPrompts, setNewPrompts] = useState(['']);
  const [showAddPrompt, setShowAddPrompt] = useState(false);
  const [newPromptText, setNewPromptText] = useState('');

  const allCategories = [...categories, ...customCategories].filter(c => selectedCategoryIds.includes(c.id));

  const activeCat = activeCategory
    ? allCategories.find(c => c.id === activeCategory)
    : null;

  const handleTogglePrompt = (promptId) => {
    if (completedPrompts.includes(promptId)) {
      dispatch({ type: 'UNCOMPLETE_PROMPT', payload: promptId });
    } else {
      dispatch({ type: 'COMPLETE_PROMPT', payload: promptId });
    }
  };

  const handleAddCategory = () => {
    if (!newCatName.trim()) return;
    const validPrompts = newPrompts.filter(p => p.trim());
    if (validPrompts.length === 0) return;
    const id = 'custom-' + Date.now();
    dispatch({
      type: 'ADD_CUSTOM_CATEGORY',
      payload: {
        id,
        name: newCatName.trim(),
        icon: 'Sparkles',
        isCustom: true,
        prompts: validPrompts.map((text, i) => ({
          id: `${id}-p${i}`,
          text: text.trim(),
          suggestedType: 'Short-Form Video',
          suggestedPlatform: 'Instagram',
        })),
      },
    });
    setNewCatName('');
    setNewPrompts(['']);
    setShowAddCategory(false);
  };

  const handleAddPromptToCategory = () => {
    if (!newPromptText.trim() || !activeCat?.isCustom) return;
    const updated = {
      ...activeCat,
      prompts: [
        ...activeCat.prompts,
        {
          id: `${activeCat.id}-p${Date.now()}`,
          text: newPromptText.trim(),
          suggestedType: 'Short-Form Video',
          suggestedPlatform: 'Instagram',
        },
      ],
    };
    dispatch({ type: 'UPDATE_CUSTOM_CATEGORY', payload: updated });
    setNewPromptText('');
    setShowAddPrompt(false);
  };

  if (activeCat) {
    const completedCount = activeCat.prompts.filter(p => completedPrompts.includes(p.id)).length;
    return (
      <div className="prompts page">
        <header className="page-header">
          <button className="btn btn-ghost btn-sm" onClick={() => setActiveCategory(null)}>
            &larr; Back
          </button>
          <span className="prompt-progress">{completedCount}/{activeCat.prompts.length}</span>
        </header>
        <h2 className="category-title">{activeCat.name}</h2>
        <div className="prompts-list">
          {activeCat.prompts.map(prompt => {
            const completed = completedPrompts.includes(prompt.id);
            return (
              <div
                key={prompt.id}
                className={`prompt-card card ${completed ? 'completed' : ''}`}
              >
                <div className="prompt-content">
                  <p className="prompt-text">{prompt.text}</p>
                  <div className="prompt-suggestion">
                    <span className="prompt-tag">{prompt.suggestedType}</span>
                    <span className="prompt-tag">{prompt.suggestedPlatform}</span>
                  </div>
                </div>
                <button
                  className={`prompt-check ${completed ? 'checked' : ''}`}
                  onClick={() => handleTogglePrompt(prompt.id)}
                >
                  <Check size={16} />
                </button>
              </div>
            );
          })}
        </div>
        {activeCat.isCustom && (
          <>
            {showAddPrompt ? (
              <div className="add-prompt-form card">
                <textarea
                  className="input-field textarea"
                  placeholder="Write your prompt..."
                  value={newPromptText}
                  onChange={e => setNewPromptText(e.target.value)}
                  rows={2}
                  autoFocus
                />
                <div className="add-prompt-actions">
                  <button className="btn btn-ghost btn-sm" onClick={() => setShowAddPrompt(false)}>Cancel</button>
                  <button className="btn btn-primary btn-sm" onClick={handleAddPromptToCategory}>Add</button>
                </div>
              </div>
            ) : (
              <button className="btn btn-ghost add-prompt-btn" onClick={() => setShowAddPrompt(true)}>
                <Plus size={16} /> Add Prompt
              </button>
            )}
          </>
        )}
      </div>
    );
  }

  return (
    <div className="prompts page">
      <header className="page-header">
        <h1>Thought Prompts</h1>
        <button className="btn btn-primary btn-sm" onClick={() => setShowAddCategory(true)}>
          <Plus size={16} /> New
        </button>
      </header>

      <div className="categories-grid">
        {allCategories.map(cat => {
          const IconComponent = ICON_MAP[cat.icon] || Sparkles;
          const completedCount = cat.prompts.filter(p => completedPrompts.includes(p.id)).length;
          const progress = cat.prompts.length > 0 ? completedCount / cat.prompts.length : 0;
          return (
            <button
              key={cat.id}
              className="category-card card"
              onClick={() => setActiveCategory(cat.id)}
            >
              <div className="category-card-icon">
                <IconComponent size={24} />
              </div>
              <span className="category-card-name">{cat.name}</span>
              <div className="category-card-progress">
                <div className="mini-progress-track">
                  <div className="mini-progress-fill" style={{ width: `${progress * 100}%` }} />
                </div>
                <span className="category-card-count">{completedCount}/{cat.prompts.length}</span>
              </div>
              <ChevronRight size={14} className="category-card-arrow" />
            </button>
          );
        })}
      </div>

      {showAddCategory && (
        <div className="modal-overlay" onClick={() => setShowAddCategory(false)}>
          <div className="logger-form card" onClick={e => e.stopPropagation()}>
            <div className="form-header">
              <h3>New Category</h3>
              <button className="btn-icon" onClick={() => setShowAddCategory(false)}><X size={18} /></button>
            </div>
            <div className="form-group">
              <label>Category Name</label>
              <input
                className="input-field"
                type="text"
                placeholder="e.g. Tech & Innovation"
                value={newCatName}
                onChange={e => setNewCatName(e.target.value)}
                autoFocus
              />
            </div>
            <div className="form-group">
              <label>Prompts</label>
              {newPrompts.map((p, i) => (
                <div key={i} className="new-prompt-row">
                  <textarea
                    className="input-field textarea"
                    placeholder={`Prompt ${i + 1}...`}
                    value={p}
                    onChange={e => {
                      const updated = [...newPrompts];
                      updated[i] = e.target.value;
                      setNewPrompts(updated);
                    }}
                    rows={2}
                  />
                  {newPrompts.length > 1 && (
                    <button className="btn-icon" onClick={() => setNewPrompts(newPrompts.filter((_, j) => j !== i))}>
                      <X size={14} />
                    </button>
                  )}
                </div>
              ))}
              <button className="btn btn-ghost btn-sm" onClick={() => setNewPrompts([...newPrompts, ''])}>
                <Plus size={14} /> Add another prompt
              </button>
            </div>
            <button className="btn btn-primary btn-block" onClick={handleAddCategory}>
              Create Category
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
