// frontend/app/page.tsx - Galactic Mission Control Homepage

'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from './layout';

export default function HomePage() {
  const { isAuthenticated } = useAuth();

  const scrollToMissions = (e: React.MouseEvent) => {
    e.preventDefault();
    const elem = document.getElementById('missions-grid');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="hero-page-container">
      {/* --- HERO SECTION (MATCHING SCREENSHOT) --- */}
      <section className="hero-wrapper">
        {/* Top Mission Control Pill */}
        <div className="mission-badge">
          <span className="badge-dot"></span>
          <span>Mission Control v2.0 — Now Live</span>
        </div>

        {/* Massive Dual Title */}
        <h1 className="hero-title-main">Read Beyond</h1>
        <h2 className="hero-title-sub">DyslexiCore</h2>

        {/* Subtitle */}
        <p className="hero-subtitle">
          A gamified literacy engine that deploys interactive space missions to detect, understand, and strengthen every child&apos;s reading universe.
        </p>

        {/* Dual CTAs */}
        <div className="hero-cta-group">
          <Link href={isAuthenticated ? "/dashboard" : "/register"} className="btn-launch">
            LAUNCH CORE →
          </Link>
          <Link href={isAuthenticated ? "/dashboard" : "/login"} className="btn-login">
            Mission Login
          </Link>
        </div>

        {/* 4 Feature Pills Row */}
        <div className="pills-row">
          <div className="feature-pill">
            <span className="pill-dot-purple"></span>
            <span>Space-themed literacy games</span>
          </div>
          <div className="feature-pill">
            <span className="pill-icon-cyan">▲</span>
            <span>AI-powered diagnostics</span>
          </div>
          <div className="feature-pill">
            <span className="pill-dot-pink"></span>
            <span>Safe for ages 5–12</span>
          </div>
          <div className="feature-pill">
            <span className="pill-dot-green"></span>
            <span>Parent dashboard included</span>
          </div>
        </div>

        {/* Bottom Scroll Indicator */}
        <a href="#missions-grid" onClick={scrollToMissions} className="scroll-anchor">
          <span>How It Works</span>
          <span className="scroll-chevron">∨</span>
        </a>
      </section>

      {/* --- MISSIONS SHOWCASE (BELOW THE FOLD) --- */}
      <section id="missions-grid" style={{ paddingTop: '60px', paddingBottom: '80px' }}>
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <div className="mission-badge" style={{ marginBottom: '15px' }}>
            <span className="badge-dot" style={{ background: '#38BDF8', boxShadow: '0 0 8px #38BDF8' }}></span>
            <span>Core Exploration Protocols</span>
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, margin: '0 0 15px' }}>
            Interactive Diagnostic Space Missions
          </h2>
          <p style={{ maxWidth: '640px', margin: '0 auto', color: '#94A3B8', fontSize: '1.05rem' }}>
            Transforming dyslexia evaluation into engaging play. Each protocol measures reading phonetics, visual tracking speed, and vocabulary retention.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {/* Mission 1 */}
          <Link href="/screening" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="dashboard-card" style={{ padding: '32px', height: '100%', position: 'relative', overflow: 'hidden' }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '16px',
                background: 'rgba(56, 189, 248, 0.15)',
                border: '1px solid rgba(56, 189, 248, 0.35)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.75rem',
                marginBottom: '20px'
              }}>
                ⭐
              </div>
              <div style={{ color: '#38BDF8', fontSize: '0.8rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>
                Mission Protocol 01
              </div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, margin: '0 0 12px 0' }}>Star Tracker</h3>
              <p style={{ color: '#94A3B8', fontSize: '0.95rem', lineHeight: 1.6, margin: 0 }}>
                High-speed visual tracking calibration. Children catch celestial targets to measure saccadic eye movement, rapid naming, and visual focus.
              </p>
              <div style={{ marginTop: '24px', color: '#38BDF8', fontWeight: 700, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                Initiate Screening →
              </div>
            </div>
          </Link>

          {/* Mission 2 */}
          <Link href="/assessment" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="dashboard-card" style={{ padding: '32px', height: '100%', position: 'relative', overflow: 'hidden' }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '16px',
                background: 'rgba(168, 85, 247, 0.15)',
                border: '1px solid rgba(168, 85, 247, 0.35)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.75rem',
                marginBottom: '20px'
              }}>
                🫧
              </div>
              <div style={{ color: '#C084FC', fontSize: '0.8rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>
                Mission Protocol 02
              </div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, margin: '0 0 12px 0' }}>Phoneme Popper</h3>
              <p style={{ color: '#94A3B8', fontSize: '0.95rem', lineHeight: 1.6, margin: 0 }}>
                Auditory-visual sound matching game. Pop phonetic sound bubbles to assess phonological awareness and syllable recognition without anxiety.
              </p>
              <div style={{ marginTop: '24px', color: '#C084FC', fontWeight: 700, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                Play Assessment →
              </div>
            </div>
          </Link>

          {/* Mission 3 */}
          <Link href="/skill-quest" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="dashboard-card" style={{ padding: '32px', height: '100%', position: 'relative', overflow: 'hidden' }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '16px',
                background: 'rgba(244, 114, 182, 0.15)',
                border: '1px solid rgba(244, 114, 182, 0.35)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.75rem',
                marginBottom: '20px'
              }}>
                ⌨️
              </div>
              <div style={{ color: '#F472B6', fontSize: '0.8rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>
                Mission Protocol 03
              </div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, margin: '0 0 12px 0' }}>Skill Quests</h3>
              <p style={{ color: '#94A3B8', fontSize: '0.95rem', lineHeight: 1.6, margin: 0 }}>
                Interstellar typing & reading arcade. Reinforces letter-to-key muscle memory, phoneme blending, and spelling speed in real-time.
              </p>
              <div style={{ marginTop: '24px', color: '#F472B6', fontWeight: 700, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                Enter Skill Quest →
              </div>
            </div>
          </Link>

          {/* Mission 4 */}
          <Link href="/chat" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="dashboard-card" style={{ padding: '32px', height: '100%', position: 'relative', overflow: 'hidden' }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '16px',
                background: 'rgba(52, 211, 153, 0.15)',
                border: '1px solid rgba(52, 211, 153, 0.35)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.75rem',
                marginBottom: '20px'
              }}>
                🤖
              </div>
              <div style={{ color: '#34D399', fontSize: '0.8rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>
                Mission Protocol 04
              </div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, margin: '0 0 12px 0' }}>Smart Companion</h3>
              <p style={{ color: '#94A3B8', fontSize: '0.95rem', lineHeight: 1.6, margin: 0 }}>
                AI dyslexia tutor and co-pilot. Delivers positive reinforcement, audio breakdowns, phonetic tips, and adaptive story quests.
              </p>
              <div style={{ marginTop: '24px', color: '#34D399', fontWeight: 700, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                Talk with Companion →
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Floating Mascot Button */}
      <Link href="/chat" className="floating-mascot" title="Ask Smart Companion">
        🤖
      </Link>
    </div>
  );
}