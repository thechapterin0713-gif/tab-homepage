import React from 'react';

const TABBrandCute = () => {
  const colors = {
    sky: '#7DD3FC',
    skyLight: '#E0F7FF',
    skyDark: '#0EA5E9',
    pink: '#FDA4AF',
    yellow: '#FDE047',
    mint: '#99F6E4',
    white: '#FFFFFF',
    dark: '#334155',
    cream: '#FEFCE8',
  };

  // Pixel-style letter component
  const PixelLetter = ({ letter, color, size = 48 }) => {
    const pixelSize = size / 8;
    
    const letterPatterns = {
      T: [
        [1,1,1,1,1],
        [0,0,1,0,0],
        [0,0,1,0,0],
        [0,0,1,0,0],
        [0,0,1,0,0],
      ],
      A: [
        [0,1,1,1,0],
        [1,0,0,0,1],
        [1,1,1,1,1],
        [1,0,0,0,1],
        [1,0,0,0,1],
      ],
      B: [
        [1,1,1,1,0],
        [1,0,0,0,1],
        [1,1,1,1,0],
        [1,0,0,0,1],
        [1,1,1,1,0],
      ],
    };

    const pattern = letterPatterns[letter] || [];
    
    return (
      <div style={{ display: 'inline-block', margin: '0 4px' }}>
        {pattern.map((row, y) => (
          <div key={y} style={{ display: 'flex' }}>
            {row.map((pixel, x) => (
              <div
                key={x}
                style={{
                  width: pixelSize,
                  height: pixelSize,
                  backgroundColor: pixel ? color : 'transparent',
                  borderRadius: pixel ? '2px' : 0,
                }}
              />
            ))}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div style={{
      fontFamily: "'Nunito', 'Noto Sans KR', sans-serif",
      background: `linear-gradient(180deg, ${colors.skyLight} 0%, ${colors.white} 50%, ${colors.cream} 100%)`,
      minHeight: '100vh',
      padding: '40px 20px',
    }}>
      {/* Floating decorations */}
      <div style={{ position: 'fixed', top: '10%', left: '5%', fontSize: '24px', opacity: 0.5 }}>✦</div>
      <div style={{ position: 'fixed', top: '20%', right: '8%', fontSize: '20px', opacity: 0.4 }}>☁️</div>
      <div style={{ position: 'fixed', bottom: '30%', left: '8%', fontSize: '18px', opacity: 0.4 }}>⭐</div>
      <div style={{ position: 'fixed', bottom: '15%', right: '5%', fontSize: '22px', opacity: 0.5 }}>♡</div>

      {/* Header */}
      <header style={{
        textAlign: 'center',
        marginBottom: '48px',
      }}>
        <div style={{
          display: 'inline-block',
          padding: '8px 20px',
          background: colors.white,
          borderRadius: '20px',
          border: `2px dashed ${colors.sky}`,
          marginBottom: '12px',
        }}>
          <span style={{
            fontSize: '12px',
            fontWeight: 700,
            color: colors.skyDark,
            letterSpacing: '2px',
          }}>✿ BRAND GUIDELINES ✿</span>
        </div>
        <h1 style={{
          fontSize: '20px',
          fontWeight: 800,
          color: colors.dark,
          margin: 0,
        }}>태오의 실행 비즈니스</h1>
      </header>

      {/* Main Logo Section */}
      <section style={{
        maxWidth: '600px',
        margin: '0 auto 48px',
        background: colors.white,
        borderRadius: '32px',
        padding: '48px',
        boxShadow: '0 8px 32px rgba(125, 211, 252, 0.2)',
        border: `3px solid ${colors.sky}`,
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Corner decorations */}
        <div style={{ position: 'absolute', top: '16px', left: '16px', fontSize: '16px' }}>⭐</div>
        <div style={{ position: 'absolute', top: '16px', right: '16px', fontSize: '16px' }}>⭐</div>
        <div style={{ position: 'absolute', bottom: '16px', left: '16px', fontSize: '16px' }}>✦</div>
        <div style={{ position: 'absolute', bottom: '16px', right: '16px', fontSize: '16px' }}>✦</div>

        <p style={{
          fontSize: '11px',
          fontWeight: 700,
          color: colors.skyDark,
          textAlign: 'center',
          marginBottom: '32px',
          letterSpacing: '2px',
        }}>PRIMARY LOGO</p>

        {/* Pixel Logo */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          marginBottom: '24px',
        }}>
          <PixelLetter letter="T" color={colors.skyDark} size={64} />
          <PixelLetter letter="A" color={colors.sky} size={64} />
          <PixelLetter letter="B" color={colors.skyDark} size={64} />
        </div>

        {/* Document icon style frame */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '24px',
        }}>
          <div style={{
            position: 'relative',
            background: colors.skyLight,
            border: `2px solid ${colors.dark}`,
            borderRadius: '4px',
            padding: '20px 32px 24px',
          }}>
            {/* Folded corner */}
            <div style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '16px',
              height: '16px',
              background: colors.white,
              borderLeft: `2px solid ${colors.dark}`,
              borderBottom: `2px solid ${colors.dark}`,
            }}/>
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}>
              <PixelLetter letter="T" color={colors.dark} size={32} />
              <PixelLetter letter="A" color={colors.skyDark} size={32} />
              <PixelLetter letter="B" color={colors.dark} size={32} />
            </div>
            
            {/* Underline */}
            <div style={{
              marginTop: '8px',
              height: '2px',
              background: colors.dark,
            }}/>
          </div>
        </div>

        <p style={{
          fontSize: '14px',
          fontWeight: 600,
          color: colors.dark,
          textAlign: 'center',
          marginBottom: '4px',
        }}>태오의 실행 비즈니스</p>
        <p style={{
          fontSize: '11px',
          color: colors.skyDark,
          textAlign: 'center',
          letterSpacing: '1px',
        }}>✧ Execution is Everything ✧</p>
      </section>

      {/* Logo Variations */}
      <section style={{
        maxWidth: '600px',
        margin: '0 auto 48px',
      }}>
        <h2 style={{
          fontSize: '14px',
          fontWeight: 800,
          color: colors.dark,
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}>
          <span>☆</span> 로고 변형 Logo Variations
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '16px',
        }}>
          {/* Light version */}
          <div style={{
            background: colors.white,
            borderRadius: '24px',
            padding: '32px 24px',
            textAlign: 'center',
            border: `2px solid ${colors.sky}`,
          }}>
            <p style={{
              fontSize: '10px',
              fontWeight: 700,
              color: colors.skyDark,
              marginBottom: '16px',
            }}>LIGHT ☀️</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '4px' }}>
              <PixelLetter letter="T" color={colors.dark} size={40} />
              <PixelLetter letter="A" color={colors.sky} size={40} />
              <PixelLetter letter="B" color={colors.dark} size={40} />
            </div>
          </div>

          {/* Dark version */}
          <div style={{
            background: colors.dark,
            borderRadius: '24px',
            padding: '32px 24px',
            textAlign: 'center',
          }}>
            <p style={{
              fontSize: '10px',
              fontWeight: 700,
              color: colors.sky,
              marginBottom: '16px',
            }}>DARK 🌙</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '4px' }}>
              <PixelLetter letter="T" color={colors.white} size={40} />
              <PixelLetter letter="A" color={colors.sky} size={40} />
              <PixelLetter letter="B" color={colors.white} size={40} />
            </div>
          </div>

          {/* Icon version */}
          <div style={{
            background: colors.skyLight,
            borderRadius: '24px',
            padding: '32px 24px',
            textAlign: 'center',
            border: `2px dashed ${colors.sky}`,
          }}>
            <p style={{
              fontSize: '10px',
              fontWeight: 700,
              color: colors.skyDark,
              marginBottom: '16px',
            }}>ICON 📱</p>
            <div style={{
              width: '56px',
              height: '56px',
              background: colors.white,
              borderRadius: '16px',
              border: `2px solid ${colors.dark}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto',
              boxShadow: `4px 4px 0 ${colors.sky}`,
            }}>
              <PixelLetter letter="T" color={colors.skyDark} size={32} />
            </div>
          </div>

          {/* Badge version */}
          <div style={{
            background: `linear-gradient(135deg, ${colors.sky} 0%, ${colors.skyDark} 100%)`,
            borderRadius: '24px',
            padding: '32px 24px',
            textAlign: 'center',
          }}>
            <p style={{
              fontSize: '10px',
              fontWeight: 700,
              color: colors.white,
              marginBottom: '16px',
            }}>BADGE ⭐</p>
            <div style={{
              width: '56px',
              height: '56px',
              background: colors.white,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto',
              border: `3px solid ${colors.skyLight}`,
            }}>
              <span style={{
                fontSize: '20px',
                fontWeight: 900,
                color: colors.skyDark,
              }}>T</span>
            </div>
          </div>
        </div>
      </section>

      {/* Color Palette */}
      <section style={{
        maxWidth: '600px',
        margin: '0 auto 48px',
      }}>
        <h2 style={{
          fontSize: '14px',
          fontWeight: 800,
          color: colors.dark,
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}>
          <span>🎨</span> 컬러 팔레트 Colors
        </h2>

        <div style={{
          background: colors.white,
          borderRadius: '24px',
          padding: '24px',
          border: `2px solid ${colors.sky}`,
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '12px',
          }}>
            {[
              { name: 'Sky', kr: '스카이', hex: '#7DD3FC', emoji: '☁️' },
              { name: 'Sky Dark', kr: '딥 스카이', hex: '#0EA5E9', emoji: '🌊' },
              { name: 'Sky Light', kr: '라이트', hex: '#E0F7FF', emoji: '✨' },
              { name: 'White', kr: '화이트', hex: '#FFFFFF', emoji: '🤍' },
              { name: 'Dark', kr: '다크', hex: '#334155', emoji: '🌙' },
              { name: 'Cream', kr: '크림', hex: '#FEFCE8', emoji: '🍦' },
            ].map((c, i) => (
              <div key={i} style={{
                background: c.hex,
                borderRadius: '16px',
                padding: '16px 12px',
                textAlign: 'center',
                border: c.hex === '#FFFFFF' ? `2px dashed ${colors.sky}` : 'none',
                boxShadow: c.hex !== '#FFFFFF' ? `3px 3px 0 rgba(0,0,0,0.1)` : 'none',
              }}>
                <div style={{ fontSize: '20px', marginBottom: '8px' }}>{c.emoji}</div>
                <p style={{
                  fontSize: '12px',
                  fontWeight: 700,
                  color: ['#FFFFFF', '#E0F7FF', '#FEFCE8', '#7DD3FC'].includes(c.hex) ? colors.dark : colors.white,
                  marginBottom: '2px',
                }}>{c.name}</p>
                <p style={{
                  fontSize: '10px',
                  color: ['#FFFFFF', '#E0F7FF', '#FEFCE8', '#7DD3FC'].includes(c.hex) ? colors.skyDark : colors.skyLight,
                }}>{c.hex}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Typography */}
      <section style={{
        maxWidth: '600px',
        margin: '0 auto 48px',
      }}>
        <h2 style={{
          fontSize: '14px',
          fontWeight: 800,
          color: colors.dark,
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}>
          <span>✏️</span> 타이포그래피 Typography
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '16px',
        }}>
          <div style={{
            background: colors.white,
            borderRadius: '24px',
            padding: '24px',
            border: `2px solid ${colors.sky}`,
            textAlign: 'center',
          }}>
            <p style={{
              fontSize: '10px',
              fontWeight: 700,
              color: colors.skyDark,
              marginBottom: '12px',
            }}>DISPLAY ⭐</p>
            <p style={{
              fontSize: '28px',
              fontWeight: 900,
              color: colors.dark,
              marginBottom: '8px',
              fontFamily: "'Nunito', sans-serif",
            }}>Nunito</p>
            <p style={{
              fontSize: '11px',
              color: colors.skyDark,
            }}>둥글둥글 귀여운 서체</p>
          </div>

          <div style={{
            background: colors.white,
            borderRadius: '24px',
            padding: '24px',
            border: `2px solid ${colors.sky}`,
            textAlign: 'center',
          }}>
            <p style={{
              fontSize: '10px',
              fontWeight: 700,
              color: colors.skyDark,
              marginBottom: '12px',
            }}>KOREAN 🇰🇷</p>
            <p style={{
              fontSize: '24px',
              fontWeight: 700,
              color: colors.dark,
              marginBottom: '8px',
            }}>노토 산스</p>
            <p style={{
              fontSize: '11px',
              color: colors.skyDark,
            }}>깔끔한 한글 서체</p>
          </div>
        </div>
      </section>

      {/* Brand Values */}
      <section style={{
        maxWidth: '600px',
        margin: '0 auto 48px',
      }}>
        <h2 style={{
          fontSize: '14px',
          fontWeight: 800,
          color: colors.dark,
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}>
          <span>💫</span> 브랜드 키워드 Brand Keywords
        </h2>

        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '12px',
          justifyContent: 'center',
        }}>
          {[
            { word: '실행', emoji: '🚀' },
            { word: '신뢰', emoji: '🤝' },
            { word: '성장', emoji: '🌱' },
            { word: '명확', emoji: '💎' },
            { word: '친근', emoji: '😊' },
            { word: '혁신', emoji: '✨' },
          ].map((item, i) => (
            <div key={i} style={{
              background: i === 0 ? colors.sky : colors.white,
              borderRadius: '20px',
              padding: '12px 20px',
              border: `2px solid ${colors.sky}`,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: `3px 3px 0 ${colors.skyLight}`,
            }}>
              <span style={{ fontSize: '16px' }}>{item.emoji}</span>
              <span style={{
                fontSize: '14px',
                fontWeight: 700,
                color: i === 0 ? colors.white : colors.dark,
              }}>{item.word}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Usage Guidelines */}
      <section style={{
        maxWidth: '600px',
        margin: '0 auto 48px',
      }}>
        <h2 style={{
          fontSize: '14px',
          fontWeight: 800,
          color: colors.dark,
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}>
          <span>📋</span> 사용 가이드라인 Guidelines
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '16px',
        }}>
          <div style={{
            background: colors.mint,
            borderRadius: '24px',
            padding: '24px',
            border: `2px solid ${colors.dark}`,
          }}>
            <p style={{
              fontSize: '12px',
              fontWeight: 800,
              color: colors.dark,
              marginBottom: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}>⭕ DO</p>
            <ul style={{
              fontSize: '12px',
              color: colors.dark,
              lineHeight: 1.8,
              paddingLeft: '16px',
              margin: 0,
            }}>
              <li>충분한 여백 확보</li>
              <li>지정된 컬러 사용</li>
              <li>비율 유지하기</li>
              <li>선명한 배경 위에</li>
            </ul>
          </div>

          <div style={{
            background: colors.pink,
            borderRadius: '24px',
            padding: '24px',
            border: `2px solid ${colors.dark}`,
          }}>
            <p style={{
              fontSize: '12px',
              fontWeight: 800,
              color: colors.dark,
              marginBottom: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}>❌ DON'T</p>
            <ul style={{
              fontSize: '12px',
              color: colors.dark,
              lineHeight: 1.8,
              paddingLeft: '16px',
              margin: 0,
            }}>
              <li>비율 늘리거나 줄이기</li>
              <li>다른 색상 사용</li>
              <li>로고 회전하기</li>
              <li>효과 추가하기</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        textAlign: 'center',
        padding: '32px 0',
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '4px',
          marginBottom: '12px',
        }}>
          <PixelLetter letter="T" color={colors.dark} size={24} />
          <PixelLetter letter="A" color={colors.sky} size={24} />
          <PixelLetter letter="B" color={colors.dark} size={24} />
        </div>
        <p style={{
          fontSize: '11px',
          color: colors.skyDark,
        }}>© 2025 태오의 실행 비즈니스 ♡</p>
      </footer>
    </div>
  );
};

export default TABBrandCute;
