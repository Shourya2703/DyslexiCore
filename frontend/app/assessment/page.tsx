// frontend/app/assessment/page.tsx - Phoneme Popper Galactic Mission

'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function AssessmentGame() {
  const router = useRouter();

  const [gameState, setGameState] = useState<'idle' | 'playing' | 'finished'>('idle');
  const [score, setScore] = useState(0);
  const [misses, setMisses] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15); 
  const [currentTarget, setCurrentTarget] = useState({ x: 50, y: 50, char: 'ba' });
  
  const chars = ['ba', 'da', 'pa', 'ma', 'ka', 'ta', 'la', 'sa'];
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && gameState === 'playing') {
      finishGame();
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameState, timeLeft]);

  const startGame = () => {
    setScore(0);
    setMisses(0);
    setTimeLeft(15);
    setGameState('playing');
    spawnTarget();
  };

  const spawnTarget = () => {
    setCurrentTarget({
      x: Math.random() * 70 + 15,
      y: Math.random() * 65 + 15,
      char: chars[Math.floor(Math.random() * chars.length)],
    });
  };

  const handleHit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setScore(s => s + 1);
    spawnTarget();
  };

  const handleMiss = () => {
    if (gameState === 'playing') setMisses(m => m + 1);
  };

  const finishGame = () => {
    setGameState('finished');
  };

  const totalAttempts = score + misses;
  const accuracy = totalAttempts > 0 ? (score / totalAttempts) * 100 : 100;

  return (
    <div 
      onClick={handleMiss}
      style={{
        position: 'relative',
        width: '100%',
        height: '80vh',
        minHeight: '580px',
        background: 'radial-gradient(circle at center, rgba(30, 27, 75, 0.45) 0%, rgba(6, 7, 19, 0.95) 100%)',
        borderRadius: '24px',
        overflow: 'hidden',
        border: '1px solid rgba(168, 85, 247, 0.3)',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8), 0 0 30px rgba(124, 58, 237, 0.2)',
        cursor: gameState === 'playing' ? 'crosshair' : 'default',
        userSelect: 'none'
      }}
    >
      {/* High-Tech Cockpit HUD */}
      <div style={{
        position: 'absolute',
        top: '20px',
        left: '20px',
        right: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 24px',
        background: 'rgba(18, 20, 44, 0.75)',
        backdropFilter: 'blur(16px)',
        borderRadius: '9999px',
        border: '1px solid rgba(168, 85, 247, 0.25)',
        zIndex: 20
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '1.2rem' }}>🫧</span>
          <span style={{ fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.01em' }}>Phoneme Popper Protocol</span>
        </div>
        <div style={{ display: 'flex', gap: '20px', fontFamily: 'Space Grotesk, sans-serif' }}>
          <span style={{ color: '#38BDF8', fontWeight: 800, fontSize: '1.05rem' }}>Targets: {score}</span>
          <span style={{ color: '#F472B6', fontWeight: 800, fontSize: '1.05rem' }}>Time: {timeLeft}s</span>
        </div>
      </div>

      {/* 1. START MODAL */}
      {gameState === 'idle' && (
        <div style={modalBoxStyle}>
          <div style={{ fontSize: '3.5rem', marginBottom: '15px' }}>🫧</div>
          <h1 style={{ color: '#FFFFFF', fontSize: '2.4rem', fontWeight: 800, margin: '0 0 10px' }}>Phoneme Popper</h1>
          <p style={{ color: '#94A3B8', fontSize: '1.1rem', maxWidth: '400px', margin: '0 auto 25px', lineHeight: 1.6 }}>
            Tap the floating phonetic sound bubbles as quickly as you can before they drift into hyperspace!
          </p>
          <button onClick={startGame} className="btn-launch" style={{ padding: '16px 40px', fontSize: '1.1rem' }}>
            START MISSION →
          </button>
        </div>
      )}

      {/* 2. PLAYING - THE NEON BUBBLE */}
      {gameState === 'playing' && (
        <div 
          onClick={handleHit}
          style={{
            position: 'absolute',
            left: `${currentTarget.x}%`,
            top: `${currentTarget.y}%`,
            transform: 'translate(-50%, -50%)',
            width: '110px',
            height: '110px',
            borderRadius: '50%',
            background: 'radial-gradient(circle at 35% 35%, rgba(192, 132, 252, 0.35) 0%, rgba(99, 102, 241, 0.2) 60%, rgba(56, 189, 248, 0.3) 100%)',
            border: '2px solid rgba(192, 132, 252, 0.75)',
            boxShadow: '0 0 25px rgba(168, 85, 247, 0.65), inset 0 0 20px rgba(255, 255, 255, 0.4)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF',
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: '32px',
            fontWeight: 900,
            cursor: 'pointer',
            transition: 'all 0.15s ease-out',
            zIndex: 10,
            textShadow: '0 0 12px rgba(255, 255, 255, 0.8)'
          }}
        >
          {currentTarget.char}
          {/* Bubble light glare */}
          <div style={{
            position: 'absolute',
            top: '18%',
            left: '20%',
            width: '24px',
            height: '14px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.65)',
            transform: 'rotate(-30deg)'
          }} />
        </div>
      )}

      {/* 3. FINISHED MODAL */}
      {gameState === 'finished' && (
        <div style={modalBoxStyle}>
          <div style={{ fontSize: '3.5rem', marginBottom: '15px' }}>🏆</div>
          <h1 style={{ color: '#34D399', fontSize: '2.4rem', fontWeight: 800, margin: '0 0 10px' }}>Mission Complete!</h1>
          <p style={{ color: '#94A3B8', fontSize: '1.05rem', margin: '0 0 25px' }}>
            Telemetry analyzed and synced with your flight record.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '15px',
            margin: '0 auto 30px',
            maxWidth: '340px'
          }}>
            <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '16px', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <div style={{ fontSize: '2rem', fontWeight: 900, color: '#38BDF8', fontFamily: 'Space Grotesk, sans-serif' }}>{score}</div>
              <div style={{ color: '#94A3B8', fontSize: '0.85rem', fontWeight: 600 }}>Popped</div>
            </div>
            <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '16px', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <div style={{ fontSize: '2rem', fontWeight: 900, color: '#34D399', fontFamily: 'Space Grotesk, sans-serif' }}>{accuracy.toFixed(0)}%</div>
              <div style={{ color: '#94A3B8', fontSize: '0.85rem', fontWeight: 600 }}>Accuracy</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
            <button onClick={startGame} className="btn-login" style={{ padding: '14px 28px' }}>
              Play Again
            </button>
            <button onClick={() => router.push('/dashboard')} className="btn-launch" style={{ padding: '14px 28px' }}>
              Dashboard →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const modalBoxStyle: React.CSSProperties = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  textAlign: 'center',
  background: 'rgba(18, 20, 44, 0.92)',
  padding: '48px 36px',
  borderRadius: '28px',
  border: '1px solid rgba(168, 85, 247, 0.4)',
  boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8), 0 0 35px rgba(124, 58, 237, 0.35)',
  backdropFilter: 'blur(20px)',
  width: '90%',
  maxWidth: '480px',
  zIndex: 30
};