export const DEFAULT_CATEGORIES = [
  {
    id: 'film-culture',
    name: 'Film & Culture',
    icon: 'Film',
    prompts: [
      { id: 'fc1', text: 'What film changed the way you see the world, and why does it still haunt you?', suggestedType: 'Long-Form Video', suggestedPlatform: 'YouTube' },
      { id: 'fc2', text: 'Is modern cinema losing its soul to franchise fatigue? Defend your answer.', suggestedType: 'Short-Form Video', suggestedPlatform: 'TikTok' },
      { id: 'fc3', text: 'What director deserves more recognition and what should people watch first?', suggestedType: 'Blog Post', suggestedPlatform: 'Substack' },
      { id: 'fc4', text: 'How does your cultural background shape the stories that resonate with you?', suggestedType: 'Long-Form Video', suggestedPlatform: 'YouTube' },
      { id: 'fc5', text: 'What film scene made you feel truly seen for the first time?', suggestedType: 'Short-Form Video', suggestedPlatform: 'TikTok' },
      { id: 'fc6', text: 'Are remakes ever better than originals? Name one that actually was.', suggestedType: 'Short-Form Video', suggestedPlatform: 'Instagram' },
      { id: 'fc7', text: 'What does the rise of international cinema (Parasite, RRR) say about American audiences?', suggestedType: 'Blog Post', suggestedPlatform: 'Substack' },
      { id: 'fc8', text: 'Create a visual mood board inspired by your favorite film\'s cinematography.', suggestedType: 'Photography', suggestedPlatform: 'Instagram' },
    ]
  },
  {
    id: 'life-in-nyc',
    name: 'Life in NYC',
    icon: 'Building2',
    prompts: [
      { id: 'nyc1', text: 'What moment made you feel like a real New Yorker for the first time?', suggestedType: 'Short-Form Video', suggestedPlatform: 'TikTok' },
      { id: 'nyc2', text: 'Is NYC still the city of dreams, or has it become a city of survival?', suggestedType: 'Long-Form Video', suggestedPlatform: 'YouTube' },
      { id: 'nyc3', text: 'What neighborhood tells the realest story about how NYC is changing?', suggestedType: 'Photography', suggestedPlatform: 'Instagram' },
      { id: 'nyc4', text: 'What do people who\'ve never lived in NYC get completely wrong about it?', suggestedType: 'Short-Form Video', suggestedPlatform: 'TikTok' },
      { id: 'nyc5', text: 'Describe your perfect NYC day from morning to night — no budget, no rules.', suggestedType: 'Blog Post', suggestedPlatform: 'Substack' },
      { id: 'nyc6', text: 'What hidden spot in the city do you never want to go viral?', suggestedType: 'Photography', suggestedPlatform: 'Instagram' },
      { id: 'nyc7', text: 'How does the subway shape the way New Yorkers experience time and patience?', suggestedType: 'Short-Form Video', suggestedPlatform: 'TikTok' },
      { id: 'nyc8', text: 'What would you tell someone who just moved to NYC and feels completely lost?', suggestedType: 'Long-Form Video', suggestedPlatform: 'YouTube' },
    ]
  },
  {
    id: 'masculinity-identity',
    name: 'Masculinity & Identity',
    icon: 'User',
    prompts: [
      { id: 'mi1', text: 'What did you have to unlearn about being a man to become a better person?', suggestedType: 'Long-Form Video', suggestedPlatform: 'YouTube' },
      { id: 'mi2', text: 'When was the last time you cried, and what does that say about how you were raised?', suggestedType: 'Short-Form Video', suggestedPlatform: 'TikTok' },
      { id: 'mi3', text: 'Is vulnerability a strength or a liability for men in today\'s world?', suggestedType: 'Blog Post', suggestedPlatform: 'Substack' },
      { id: 'mi4', text: 'What does healthy masculinity actually look like in practice, not just theory?', suggestedType: 'Long-Form Video', suggestedPlatform: 'YouTube' },
      { id: 'mi5', text: 'How do you navigate being strong without being emotionally unavailable?', suggestedType: 'Short-Form Video', suggestedPlatform: 'TikTok' },
      { id: 'mi6', text: 'What conversation do men need to have more often but rarely do?', suggestedType: 'Short-Form Video', suggestedPlatform: 'Instagram' },
      { id: 'mi7', text: 'How has your definition of success as a man evolved over the past 5 years?', suggestedType: 'Blog Post', suggestedPlatform: 'LinkedIn' },
      { id: 'mi8', text: 'What role model showed you a version of manhood you actually respected?', suggestedType: 'Long-Form Video', suggestedPlatform: 'YouTube' },
    ]
  },
  {
    id: 'marriage-relationships',
    name: 'Marriage & Relationships',
    icon: 'Heart',
    prompts: [
      { id: 'mr1', text: 'What\'s the hardest truth about marriage that nobody warns you about?', suggestedType: 'Short-Form Video', suggestedPlatform: 'TikTok' },
      { id: 'mr2', text: 'How do you keep a relationship exciting when routine becomes the default?', suggestedType: 'Long-Form Video', suggestedPlatform: 'YouTube' },
      { id: 'mr3', text: 'What\'s the best advice you\'d give to someone about to get married?', suggestedType: 'Short-Form Video', suggestedPlatform: 'Instagram' },
      { id: 'mr4', text: 'How do you argue well? What does a healthy fight actually look like?', suggestedType: 'Blog Post', suggestedPlatform: 'Substack' },
      { id: 'mr5', text: 'What relationship myth did social media create that you had to unlearn?', suggestedType: 'Short-Form Video', suggestedPlatform: 'TikTok' },
      { id: 'mr6', text: 'How do you maintain your individual identity inside a partnership?', suggestedType: 'Long-Form Video', suggestedPlatform: 'YouTube' },
      { id: 'mr7', text: 'What small daily habit has had the biggest impact on your relationship?', suggestedType: 'Short-Form Video', suggestedPlatform: 'Instagram' },
      { id: 'mr8', text: 'How do you talk about money with your partner without it becoming a fight?', suggestedType: 'Blog Post', suggestedPlatform: 'LinkedIn' },
    ]
  },
  {
    id: 'financial-literacy',
    name: 'Financial Literacy',
    icon: 'DollarSign',
    prompts: [
      { id: 'fl1', text: 'What money lesson did you learn the hard way that you wish you knew at 18?', suggestedType: 'Short-Form Video', suggestedPlatform: 'TikTok' },
      { id: 'fl2', text: 'Why don\'t schools teach personal finance, and how did that affect you?', suggestedType: 'Long-Form Video', suggestedPlatform: 'YouTube' },
      { id: 'fl3', text: 'What\'s the difference between looking rich and actually building wealth?', suggestedType: 'Short-Form Video', suggestedPlatform: 'TikTok' },
      { id: 'fl4', text: 'How do you balance enjoying life now with saving for the future?', suggestedType: 'Blog Post', suggestedPlatform: 'Substack' },
      { id: 'fl5', text: 'What financial decision are you most proud of making?', suggestedType: 'Short-Form Video', suggestedPlatform: 'Instagram' },
      { id: 'fl6', text: 'Break down one investing concept in a way anyone could understand.', suggestedType: 'Long-Form Video', suggestedPlatform: 'YouTube' },
      { id: 'fl7', text: 'How does your cultural background shape your relationship with money?', suggestedType: 'Blog Post', suggestedPlatform: 'LinkedIn' },
      { id: 'fl8', text: 'What\'s one subscription or expense you cut that changed your finances?', suggestedType: 'Short-Form Video', suggestedPlatform: 'TikTok' },
    ]
  },
  {
    id: 'immigrant-experience',
    name: 'Immigrant Experience',
    icon: 'Globe',
    prompts: [
      { id: 'ie1', text: 'What does "home" mean when you belong to two places at once?', suggestedType: 'Long-Form Video', suggestedPlatform: 'YouTube' },
      { id: 'ie2', text: 'What part of your culture do you hold onto tightly, even when it\'s inconvenient?', suggestedType: 'Short-Form Video', suggestedPlatform: 'TikTok' },
      { id: 'ie3', text: 'How do you explain your background to people who\'ve never left their hometown?', suggestedType: 'Short-Form Video', suggestedPlatform: 'Instagram' },
      { id: 'ie4', text: 'What sacrifice did your parents make that you didn\'t understand until you were older?', suggestedType: 'Long-Form Video', suggestedPlatform: 'YouTube' },
      { id: 'ie5', text: 'How do you navigate code-switching between cultures?', suggestedType: 'Blog Post', suggestedPlatform: 'Substack' },
      { id: 'ie6', text: 'What food from your culture tells a story about where you come from?', suggestedType: 'Photography', suggestedPlatform: 'Instagram' },
      { id: 'ie7', text: 'What does the American Dream actually look like from the inside?', suggestedType: 'Blog Post', suggestedPlatform: 'LinkedIn' },
      { id: 'ie8', text: 'What\'s one tradition you want to pass down and one you want to leave behind?', suggestedType: 'Short-Form Video', suggestedPlatform: 'TikTok' },
    ]
  },
  {
    id: 'fulfillment-growth',
    name: 'Fulfillment & Growth',
    icon: 'Sprout',
    prompts: [
      { id: 'fg1', text: 'What are you optimizing for right now — money, meaning, freedom, or something else?', suggestedType: 'Long-Form Video', suggestedPlatform: 'YouTube' },
      { id: 'fg2', text: 'What habit did you build that genuinely changed your life?', suggestedType: 'Short-Form Video', suggestedPlatform: 'TikTok' },
      { id: 'fg3', text: 'When did you realize you were living someone else\'s dream instead of your own?', suggestedType: 'Blog Post', suggestedPlatform: 'Substack' },
      { id: 'fg4', text: 'What would you do with your life if money was completely irrelevant?', suggestedType: 'Short-Form Video', suggestedPlatform: 'Instagram' },
      { id: 'fg5', text: 'How do you stay motivated when progress feels invisible?', suggestedType: 'Short-Form Video', suggestedPlatform: 'TikTok' },
      { id: 'fg6', text: 'What\'s the difference between being busy and being productive?', suggestedType: 'Blog Post', suggestedPlatform: 'LinkedIn' },
      { id: 'fg7', text: 'What book or idea fundamentally shifted your worldview?', suggestedType: 'Long-Form Video', suggestedPlatform: 'YouTube' },
      { id: 'fg8', text: 'If your 80-year-old self could give you one piece of advice, what would it be?', suggestedType: 'Short-Form Video', suggestedPlatform: 'TikTok' },
    ]
  },
  {
    id: 'hot-takes-opinions',
    name: 'Hot Takes & Opinions',
    icon: 'Flame',
    prompts: [
      { id: 'ht1', text: 'What popular opinion do you think is completely wrong, and why?', suggestedType: 'Short-Form Video', suggestedPlatform: 'TikTok' },
      { id: 'ht2', text: 'Is hustle culture inspiring or is it just glorified burnout?', suggestedType: 'Long-Form Video', suggestedPlatform: 'YouTube' },
      { id: 'ht3', text: 'What trend are people too afraid to say is actually cringe?', suggestedType: 'Short-Form Video', suggestedPlatform: 'TikTok' },
      { id: 'ht4', text: 'Is social media making us more connected or more isolated?', suggestedType: 'Blog Post', suggestedPlatform: 'Substack' },
      { id: 'ht5', text: 'What industry is lying to consumers and getting away with it?', suggestedType: 'Long-Form Video', suggestedPlatform: 'YouTube' },
      { id: 'ht6', text: 'What advice that everyone gives is actually terrible?', suggestedType: 'Short-Form Video', suggestedPlatform: 'Instagram' },
      { id: 'ht7', text: 'Is college still worth it, or is it the biggest scam of our generation?', suggestedType: 'Blog Post', suggestedPlatform: 'LinkedIn' },
      { id: 'ht8', text: 'What hill will you absolutely die on, no matter what anyone says?', suggestedType: 'Short-Form Video', suggestedPlatform: 'TikTok' },
    ]
  },
];
