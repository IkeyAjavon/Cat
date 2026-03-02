import { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import { DEFAULT_CATEGORIES } from '../data/prompts';

const AppContext = createContext();

const STORAGE_KEY = 'content-cat-data';

const XP_REWARDS = {
  LOG_CONTENT: 10,
  MOVE_TO_IN_PROGRESS: 5,
  MOVE_TO_POSTED: 20,
  COMPLETE_PROMPT: 15,
  DAILY_STREAK: 5,
};

const LEVEL_THRESHOLDS = [0, 50, 150, 400, 1000];
const LEVEL_NAMES = ['Kitten', 'Young Cat', 'Cool Cat', 'Wise Cat', 'Legendary Cat'];
const MOOD_NAMES = ['Sad', 'Meh', 'Happy', 'Thriving', 'On Fire'];

function getLevel(xp) {
  for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
    if (xp >= LEVEL_THRESHOLDS[i]) return i;
  }
  return 0;
}

function getLevelProgress(xp) {
  const level = getLevel(xp);
  if (level >= LEVEL_THRESHOLDS.length - 1) return 1;
  const current = LEVEL_THRESHOLDS[level];
  const next = LEVEL_THRESHOLDS[level + 1];
  return (xp - current) / (next - current);
}

function calculateStreak(entries, lastActiveDate) {
  if (!lastActiveDate) return 0;
  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
  if (lastActiveDate !== today && lastActiveDate !== yesterday) return 0;

  let streak = lastActiveDate === today ? 1 : 0;
  const sortedDates = [...new Set(entries.map(e => e.date?.split('T')[0]).filter(Boolean))].sort().reverse();

  let checkDate = new Date(lastActiveDate);
  for (let i = 0; i < sortedDates.length; i++) {
    const entryDate = sortedDates[i];
    const diff = Math.floor((checkDate - new Date(entryDate)) / 86400000);
    if (diff === 0) continue;
    if (diff === 1) {
      streak++;
      checkDate = new Date(entryDate);
    } else {
      break;
    }
  }
  return Math.max(streak, lastActiveDate === today ? 1 : 0);
}

function calculateMood(streak, lastActiveDate) {
  if (!lastActiveDate) return 0;
  const today = new Date().toISOString().split('T')[0];
  const last = new Date(lastActiveDate);
  const now = new Date(today);
  const daysSinceActive = Math.floor((now - last) / 86400000);

  if (daysSinceActive === 0) {
    if (streak >= 7) return 4;
    if (streak >= 4) return 3;
    if (streak >= 2) return 2;
    return 2;
  }
  return Math.max(0, 2 - daysSinceActive);
}

const defaultState = {
  onboarded: false,
  catName: 'Whiskers',
  xp: 0,
  entries: [],
  completedPrompts: [],
  categories: DEFAULT_CATEGORIES,
  customCategories: [],
  selectedCategoryIds: DEFAULT_CATEGORIES.map(c => c.id),
  lastActiveDate: null,
  streakHistory: [],
  promptOfTheDay: null,
  promptOfTheDayDate: null,
};

function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return { ...defaultState, ...parsed };
    }
  } catch (e) {
    console.error('Failed to load state:', e);
  }
  return defaultState;
}

function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error('Failed to save state:', e);
  }
}

function getRandomPromptOfTheDay(state) {
  const today = new Date().toISOString().split('T')[0];
  if (state.promptOfTheDayDate === today && state.promptOfTheDay) {
    return { promptOfTheDay: state.promptOfTheDay, promptOfTheDayDate: state.promptOfTheDayDate };
  }
  const allCategories = [...state.categories, ...state.customCategories];
  const activeCategories = allCategories.filter(c => state.selectedCategoryIds.includes(c.id));
  const allPrompts = activeCategories.flatMap(c => c.prompts.map(p => ({ ...p, categoryName: c.name })));
  const uncompleted = allPrompts.filter(p => !state.completedPrompts.includes(p.id));
  const pool = uncompleted.length > 0 ? uncompleted : allPrompts;
  if (pool.length === 0) return { promptOfTheDay: null, promptOfTheDayDate: today };
  const prompt = pool[Math.floor(Math.random() * pool.length)];
  return { promptOfTheDay: prompt, promptOfTheDayDate: today };
}

function reducer(state, action) {
  switch (action.type) {
    case 'COMPLETE_ONBOARDING': {
      const newState = {
        ...state,
        onboarded: true,
        catName: action.payload.catName,
        selectedCategoryIds: action.payload.selectedCategoryIds,
        lastActiveDate: new Date().toISOString().split('T')[0],
      };
      const potd = getRandomPromptOfTheDay(newState);
      return { ...newState, ...potd };
    }
    case 'ADD_ENTRY': {
      const today = new Date().toISOString().split('T')[0];
      const isNewDay = state.lastActiveDate !== today;
      const newXp = state.xp + XP_REWARDS.LOG_CONTENT + (isNewDay ? XP_REWARDS.DAILY_STREAK : 0);
      const entry = { ...action.payload, id: Date.now().toString(), date: new Date().toISOString() };
      const newEntries = [...state.entries, entry];
      const newState = {
        ...state,
        entries: newEntries,
        xp: newXp,
        lastActiveDate: today,
        streakHistory: isNewDay
          ? [...state.streakHistory, { date: today, streak: calculateStreak(newEntries, today) }]
          : state.streakHistory,
      };
      return newState;
    }
    case 'UPDATE_ENTRY': {
      const oldEntry = state.entries.find(e => e.id === action.payload.id);
      let bonusXp = 0;
      if (oldEntry) {
        if (action.payload.status === 'In Progress' && oldEntry.status !== 'In Progress' && oldEntry.status !== 'Posted') {
          bonusXp = XP_REWARDS.MOVE_TO_IN_PROGRESS;
        }
        if (action.payload.status === 'Posted' && oldEntry.status !== 'Posted') {
          bonusXp = XP_REWARDS.MOVE_TO_POSTED;
        }
      }
      return {
        ...state,
        entries: state.entries.map(e => e.id === action.payload.id ? { ...e, ...action.payload } : e),
        xp: state.xp + bonusXp,
      };
    }
    case 'DELETE_ENTRY':
      return {
        ...state,
        entries: state.entries.filter(e => e.id !== action.payload),
      };
    case 'COMPLETE_PROMPT': {
      if (state.completedPrompts.includes(action.payload)) return state;
      const today = new Date().toISOString().split('T')[0];
      const isNewDay = state.lastActiveDate !== today;
      return {
        ...state,
        completedPrompts: [...state.completedPrompts, action.payload],
        xp: state.xp + XP_REWARDS.COMPLETE_PROMPT + (isNewDay ? XP_REWARDS.DAILY_STREAK : 0),
        lastActiveDate: today,
      };
    }
    case 'UNCOMPLETE_PROMPT':
      return {
        ...state,
        completedPrompts: state.completedPrompts.filter(id => id !== action.payload),
      };
    case 'ADD_CUSTOM_CATEGORY':
      return {
        ...state,
        customCategories: [...state.customCategories, action.payload],
        selectedCategoryIds: [...state.selectedCategoryIds, action.payload.id],
      };
    case 'UPDATE_CUSTOM_CATEGORY':
      return {
        ...state,
        customCategories: state.customCategories.map(c => c.id === action.payload.id ? action.payload : c),
      };
    case 'DELETE_CUSTOM_CATEGORY':
      return {
        ...state,
        customCategories: state.customCategories.filter(c => c.id !== action.payload),
        selectedCategoryIds: state.selectedCategoryIds.filter(id => id !== action.payload),
      };
    case 'TOGGLE_CATEGORY': {
      const selected = state.selectedCategoryIds.includes(action.payload)
        ? state.selectedCategoryIds.filter(id => id !== action.payload)
        : [...state.selectedCategoryIds, action.payload];
      return { ...state, selectedCategoryIds: selected };
    }
    case 'RENAME_CAT':
      return { ...state, catName: action.payload };
    case 'IMPORT_DATA':
      return { ...defaultState, ...action.payload, onboarded: true };
    case 'RESET':
      return { ...defaultState };
    case 'REFRESH_PROMPT_OF_DAY': {
      const potd = getRandomPromptOfTheDay(state);
      return { ...state, ...potd };
    }
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, null, loadState);

  useEffect(() => {
    saveState(state);
  }, [state]);

  useEffect(() => {
    if (state.onboarded) {
      dispatch({ type: 'REFRESH_PROMPT_OF_DAY' });
    }
  }, [state.onboarded]);

  const streak = calculateStreak(state.entries, state.lastActiveDate);
  const mood = calculateMood(streak, state.lastActiveDate);
  const level = getLevel(state.xp);
  const levelProgress = getLevelProgress(state.xp);

  const value = {
    ...state,
    streak,
    mood,
    moodName: MOOD_NAMES[mood],
    level,
    levelName: LEVEL_NAMES[level],
    levelProgress,
    nextLevelXp: level < LEVEL_THRESHOLDS.length - 1 ? LEVEL_THRESHOLDS[level + 1] : null,
    currentLevelXp: LEVEL_THRESHOLDS[level],
    xpRewards: XP_REWARDS,
    dispatch,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
