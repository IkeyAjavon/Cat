import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { DEFAULT_CATEGORIES } from '../data/prompts';
import { Cat, ChevronRight, ChevronLeft, Sparkles, Check } from 'lucide-react';
import './Onboarding.css';

export default function Onboarding() {
  const { dispatch } = useApp();
  const [step, setStep] = useState(0);
  const [catName, setCatName] = useState('');
  const [selectedIds, setSelectedIds] = useState(DEFAULT_CATEGORIES.map(c => c.id));

  const toggleCategory = (id) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleComplete = () => {
    dispatch({
      type: 'COMPLETE_ONBOARDING',
      payload: {
        catName: catName.trim() || 'Whiskers',
        selectedCategoryIds: selectedIds,
      },
    });
  };

  return (
    <div className="onboarding">
      {step === 0 && (
        <div className="onboarding-step fade-in">
          <div className="onboarding-icon-wrap">
            <Cat size={64} />
          </div>
          <h1>Welcome to Content Cat</h1>
          <p>Your creative content companion. Stay consistent, grow your cat, and never run out of ideas.</p>
          <button className="btn btn-primary btn-lg" onClick={() => setStep(1)}>
            Get Started <ChevronRight size={18} />
          </button>
        </div>
      )}

      {step === 1 && (
        <div className="onboarding-step fade-in">
          <div className="onboarding-icon-wrap">
            <Sparkles size={48} />
          </div>
          <h2>Name Your Cat</h2>
          <p>Give your content companion a name. They'll grow as you create!</p>
          <input
            type="text"
            className="input-field"
            placeholder="e.g. Whiskers, Mochi, Luna..."
            value={catName}
            onChange={(e) => setCatName(e.target.value)}
            maxLength={20}
            autoFocus
          />
          <div className="onboarding-nav">
            <button className="btn btn-ghost" onClick={() => setStep(0)}>
              <ChevronLeft size={18} /> Back
            </button>
            <button className="btn btn-primary" onClick={() => setStep(2)}>
              Next <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="onboarding-step fade-in">
          <h2>Pick Your Categories</h2>
          <p>Choose the prompt categories that interest you. You can always change these later.</p>
          <div className="category-grid">
            {DEFAULT_CATEGORIES.map(cat => (
              <button
                key={cat.id}
                className={`category-chip ${selectedIds.includes(cat.id) ? 'selected' : ''}`}
                onClick={() => toggleCategory(cat.id)}
              >
                {selectedIds.includes(cat.id) && <Check size={14} />}
                {cat.name}
              </button>
            ))}
          </div>
          <div className="onboarding-nav">
            <button className="btn btn-ghost" onClick={() => setStep(1)}>
              <ChevronLeft size={18} /> Back
            </button>
            <button
              className="btn btn-primary"
              onClick={handleComplete}
              disabled={selectedIds.length === 0}
            >
              Let's Go! <Sparkles size={16} />
            </button>
          </div>
        </div>
      )}

      <div className="onboarding-dots">
        {[0, 1, 2].map(i => (
          <div key={i} className={`dot ${step === i ? 'active' : ''}`} />
        ))}
      </div>
    </div>
  );
}
