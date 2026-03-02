import { useApp } from '../context/AppContext';
import './CatAvatar.css';

const MOOD_COLORS = {
  0: '#95a5a6', // Sad - gray
  1: '#bdc3c7', // Meh - light gray
  2: '#4ECDC4', // Happy - teal
  3: '#F4A261', // Thriving - amber
  4: '#FF6B6B', // On Fire - coral
};

export default function CatAvatar({ size = 200, showInfo = true }) {
  const { level, mood, moodName, levelName, catName } = useApp();

  const moodGlow = MOOD_COLORS[mood];
  const scale = size / 200;

  return (
    <div className="cat-avatar-wrapper" style={{ width: size, height: size + (showInfo ? 60 : 0) }}>
      <div className="cat-glow" style={{
        width: size * 0.8,
        height: size * 0.8,
        background: `radial-gradient(circle, ${moodGlow}40 0%, transparent 70%)`,
      }} />
      <svg
        viewBox="0 0 200 200"
        width={size}
        height={size}
        className={`cat-svg cat-level-${level} cat-mood-${mood}`}
      >
        <g className="cat-body-group">
          {/* Tail */}
          <path
            className="cat-tail"
            d={level >= 4
              ? "M 50 150 Q 20 130 15 100 Q 10 70 25 55 Q 35 45 40 55"
              : level >= 2
              ? "M 50 150 Q 25 140 20 115 Q 15 90 30 80"
              : "M 55 145 Q 35 140 30 125 Q 25 110 35 105"
            }
            fill="none"
            stroke="#E8834A"
            strokeWidth={level >= 3 ? "6" : "5"}
            strokeLinecap="round"
          />
          {level >= 4 && (
            <circle cx="40" cy="55" r="4" fill="#F4A261" className="cat-tail-tip" />
          )}

          {/* Body */}
          <ellipse
            className="cat-breathing"
            cx="100"
            cy={level >= 3 ? "138" : "142"}
            rx={level >= 3 ? "48" : level >= 1 ? "42" : "35"}
            ry={level >= 3 ? "38" : level >= 1 ? "33" : "28"}
            fill="#E8834A"
          />
          {/* Belly */}
          <ellipse
            cx="100"
            cy={level >= 3 ? "145" : "148"}
            rx={level >= 3 ? "30" : level >= 1 ? "25" : "20"}
            ry={level >= 3 ? "25" : level >= 1 ? "20" : "16"}
            fill="#F5C49C"
          />
          {/* Stripes */}
          {level >= 2 && (
            <g opacity="0.3">
              <path d={`M ${100 - 20} ${level >= 3 ? 118 : 122} Q 100 ${level >= 3 ? 114 : 118} ${100 + 20} ${level >= 3 ? 118 : 122}`} stroke="#C0692B" strokeWidth="2" fill="none" />
              <path d={`M ${100 - 25} ${level >= 3 ? 126 : 130} Q 100 ${level >= 3 ? 122 : 126} ${100 + 25} ${level >= 3 ? 126 : 130}`} stroke="#C0692B" strokeWidth="2" fill="none" />
              <path d={`M ${100 - 22} ${level >= 3 ? 134 : 138} Q 100 ${level >= 3 ? 130 : 134} ${100 + 22} ${level >= 3 ? 134 : 138}`} stroke="#C0692B" strokeWidth="2" fill="none" />
            </g>
          )}

          {/* Head */}
          <circle
            cx="100"
            cy={level >= 3 ? "88" : level >= 1 ? "95" : "100"}
            r={level >= 3 ? "38" : level >= 1 ? "33" : "28"}
            fill="#E8834A"
          />

          {/* Ears */}
          <polygon
            points={level >= 3
              ? "70,58 58,30 85,52"
              : level >= 1
              ? "74,68 65,45 88,63"
              : "78,78 72,60 90,73"
            }
            fill="#E8834A"
          />
          <polygon
            points={level >= 3
              ? "130,58 142,30 115,52"
              : level >= 1
              ? "126,68 135,45 112,63"
              : "122,78 128,60 110,73"
            }
            fill="#E8834A"
          />
          {/* Inner ears */}
          <polygon
            points={level >= 3
              ? "72,57 63,37 83,53"
              : level >= 1
              ? "76,67 69,50 87,63"
              : "80,77 75,64 89,73"
            }
            fill="#F5C49C"
          />
          <polygon
            points={level >= 3
              ? "128,57 137,37 117,53"
              : level >= 1
              ? "124,67 131,50 113,63"
              : "120,77 125,64 111,73"
            }
            fill="#F5C49C"
          />

          {/* Face - Cheeks */}
          <circle
            cx={level >= 3 ? "75" : level >= 1 ? "80" : "83"}
            cy={level >= 3 ? "97" : level >= 1 ? "102" : "106"}
            r={level >= 1 ? "5" : "4"}
            fill="#F5C49C"
            opacity="0.5"
          />
          <circle
            cx={level >= 3 ? "125" : level >= 1 ? "120" : "117"}
            cy={level >= 3 ? "97" : level >= 1 ? "102" : "106"}
            r={level >= 1 ? "5" : "4"}
            fill="#F5C49C"
            opacity="0.5"
          />

          {/* Eyes */}
          <g className="cat-eyes">
            <g className="cat-blink">
              {/* Left eye */}
              <ellipse
                cx={level >= 3 ? "85" : level >= 1 ? "87" : "90"}
                cy={level >= 3 ? "85" : level >= 1 ? "92" : "97"}
                rx={level >= 3 ? "7" : level >= 1 ? "6" : "5"}
                ry={level >= 3 ? "8" : level >= 1 ? "7" : "6"}
                fill="#4ECDC4"
              />
              <ellipse
                cx={level >= 3 ? "86" : level >= 1 ? "88" : "91"}
                cy={level >= 3 ? "84" : level >= 1 ? "91" : "96"}
                rx={level >= 3 ? "3.5" : "3"}
                ry={level >= 3 ? "4.5" : "4"}
                fill="#2C3E50"
              />
              <circle
                cx={level >= 3 ? "83" : level >= 1 ? "86" : "89"}
                cy={level >= 3 ? "82" : level >= 1 ? "89" : "94"}
                r="1.5"
                fill="white"
              />
              {/* Right eye */}
              <ellipse
                cx={level >= 3 ? "115" : level >= 1 ? "113" : "110"}
                cy={level >= 3 ? "85" : level >= 1 ? "92" : "97"}
                rx={level >= 3 ? "7" : level >= 1 ? "6" : "5"}
                ry={level >= 3 ? "8" : level >= 1 ? "7" : "6"}
                fill="#4ECDC4"
              />
              <ellipse
                cx={level >= 3 ? "116" : level >= 1 ? "114" : "111"}
                cy={level >= 3 ? "84" : level >= 1 ? "91" : "96"}
                rx={level >= 3 ? "3.5" : "3"}
                ry={level >= 3 ? "4.5" : "4"}
                fill="#2C3E50"
              />
              <circle
                cx={level >= 3 ? "113" : level >= 1 ? "112" : "109"}
                cy={level >= 3 ? "82" : level >= 1 ? "89" : "94"}
                r="1.5"
                fill="white"
              />
            </g>
          </g>

          {/* Nose */}
          <ellipse
            cx="100"
            cy={level >= 3 ? "95" : level >= 1 ? "100" : "104"}
            rx="3"
            ry="2"
            fill="#FF6B6B"
          />

          {/* Mouth */}
          <path
            d={level >= 3
              ? "M 95 98 Q 100 103 105 98"
              : level >= 1
              ? "M 96 103 Q 100 107 104 103"
              : "M 96 107 Q 100 110 104 107"
            }
            fill="none"
            stroke="#2C3E50"
            strokeWidth="1.2"
            strokeLinecap="round"
          />

          {/* Whiskers */}
          <g opacity="0.6" strokeWidth="0.8" stroke="#2C3E50">
            <line x1={level >= 3 ? "62" : "68"} y1={level >= 3 ? "90" : level >= 1 ? "98" : "102"} x2={level >= 3 ? "80" : level >= 1 ? "82" : "85"} y2={level >= 3 ? "93" : level >= 1 ? "100" : "104"} />
            <line x1={level >= 3 ? "60" : "66"} y1={level >= 3 ? "97" : level >= 1 ? "104" : "108"} x2={level >= 3 ? "80" : level >= 1 ? "82" : "85"} y2={level >= 3 ? "97" : level >= 1 ? "103" : "107"} />
            <line x1={level >= 3 ? "138" : "132"} y1={level >= 3 ? "90" : level >= 1 ? "98" : "102"} x2={level >= 3 ? "120" : level >= 1 ? "118" : "115"} y2={level >= 3 ? "93" : level >= 1 ? "100" : "104"} />
            <line x1={level >= 3 ? "140" : "134"} y1={level >= 3 ? "97" : level >= 1 ? "104" : "108"} x2={level >= 3 ? "120" : level >= 1 ? "118" : "115"} y2={level >= 3 ? "97" : level >= 1 ? "103" : "107"} />
          </g>

          {/* Paws */}
          <ellipse cx="75" cy={level >= 3 ? "172" : "170"} rx="12" ry="7" fill="#E8834A" />
          <ellipse cx="125" cy={level >= 3 ? "172" : "170"} rx="12" ry="7" fill="#E8834A" />
          <ellipse cx="75" cy={level >= 3 ? "172" : "170"} rx="7" ry="4" fill="#F5C49C" />
          <ellipse cx="125" cy={level >= 3 ? "172" : "170"} rx="7" ry="4" fill="#F5C49C" />

          {/* Level-specific accessories */}
          {level >= 2 && (
            /* Cool sunglasses for level 2 */
            <g opacity={level === 2 ? "1" : "0"}>
              <rect x="76" y="88" width="18" height="10" rx="3" fill="#2C3E50" />
              <rect x="106" y="88" width="18" height="10" rx="3" fill="#2C3E50" />
              <line x1="94" y1="93" x2="106" y2="93" stroke="#2C3E50" strokeWidth="2" />
              <line x1="76" y1="93" x2="68" y2="90" stroke="#2C3E50" strokeWidth="2" />
              <line x1="124" y1="93" x2="132" y2="90" stroke="#2C3E50" strokeWidth="2" />
            </g>
          )}

          {level >= 3 && level < 4 && (
            /* Wise cat - small scarf */
            <path d="M 68 110 Q 100 120 132 110 Q 130 118 100 125 Q 70 118 68 110" fill="#4ECDC4" opacity="0.8" />
          )}

          {level >= 4 && (
            /* Legendary crown */
            <g>
              <polygon points="78,52 82,35 90,45 100,28 110,45 118,35 122,52" fill="#F4A261" />
              <polygon points="78,52 82,35 90,45 100,28 110,45 118,35 122,52" fill="none" stroke="#E8834A" strokeWidth="1" />
              <circle cx="90" cy="44" r="2" fill="#FF6B6B" />
              <circle cx="100" cy="35" r="2.5" fill="#4ECDC4" />
              <circle cx="110" cy="44" r="2" fill="#FF6B6B" />
            </g>
          )}

          {/* On Fire mood - flame particles */}
          {mood >= 4 && (
            <g className="cat-fire-particles">
              <circle cx="60" cy="70" r="3" fill="#FF6B6B" className="fire-particle p1" />
              <circle cx="140" cy="75" r="2.5" fill="#F4A261" className="fire-particle p2" />
              <circle cx="55" cy="90" r="2" fill="#FF6B6B" className="fire-particle p3" />
              <circle cx="145" cy="85" r="3" fill="#F4A261" className="fire-particle p4" />
              <circle cx="100" cy="50" r="2" fill="#FF6B6B" className="fire-particle p5" />
            </g>
          )}

          {/* Sad mood - tear */}
          {mood === 0 && (
            <g className="cat-tear">
              <ellipse
                cx={level >= 3 ? "82" : level >= 1 ? "84" : "87"}
                cy={level >= 3 ? "95" : level >= 1 ? "100" : "104"}
                rx="1.5" ry="2.5"
                fill="#4ECDC4"
                opacity="0.7"
              />
            </g>
          )}
        </g>
      </svg>
      {showInfo && (
        <div className="cat-info">
          <span className="cat-name">{catName}</span>
          <span className={`cat-mood mood-${mood}`}>{moodName}</span>
        </div>
      )}
    </div>
  );
}
