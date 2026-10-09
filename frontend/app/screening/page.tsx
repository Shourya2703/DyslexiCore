// frontend/app/screening/page.tsx - Star Tracker Visual Calibration Mission

'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DyslexiCoreStarGame() {
    const router = useRouter();
    const [step, setStep] = useState(0); 
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(15); 
    const [starPos, setStarPos] = useState({ top: 50, left: 50 });
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        let starInterval: NodeJS.Timeout;

        if (step === 1 && timeLeft > 0) {
            timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
            
            starInterval = setInterval(() => {
                setStarPos({ 
                    top: Math.random() * 60 + 20, 
                    left: Math.random() * 70 + 15 
                });
            }, 1400);

        } else if (timeLeft === 0 && step === 1) {
            setStep(2);
        }

        return () => {
            clearInterval(timer);
            clearInterval(starInterval);
        };
    }, [step, timeLeft]);

    const handleStarHit = (e: React.MouseEvent) => {
        e.stopPropagation();
        setScore(prev => prev + 1);
        setStarPos({ 
            top: Math.random() * 60 + 20, 
            left: Math.random() * 70 + 15 
        });
    };

    const handleFinish = async () => {
        setIsSaving(true);
        setTimeout(() => {
            router.push('/dashboard');
        }, 600);
    };

    return (
        <div style={{ 
            minHeight: '80vh', 
            background: 'radial-gradient(circle at center, rgba(30, 27, 75, 0.45) 0%, rgba(6, 7, 19, 0.95) 100%)', 
            borderRadius: '24px',
            border: '1px solid rgba(168, 85, 247, 0.3)',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8), 0 0 30px rgba(124, 58, 237, 0.2)',
            color: 'white', 
            position: 'relative', 
            overflow: 'hidden', 
            userSelect: 'none'
        }}>
            
            {/* HUD */}
            {step === 1 && (
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
                    zIndex: 100
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 800 }}>
                        <span>⭐</span>
                        <span>Star Tracker Visual Calibration</span>
                    </div>
                    <div style={{ display: 'flex', gap: '20px', fontFamily: 'Space Grotesk, sans-serif' }}>
                        <span style={{ color: '#FBBF24', fontWeight: 800 }}>Stars: {score}</span>
                        <span style={{ color: '#38BDF8', fontWeight: 800 }}>Time Left: {timeLeft}s</span>
                    </div>
                </div>
            )}

            {/* START SCREEN */}
            {step === 0 && (
                <div style={modalStyle}>
                    <div style={{ fontSize: '3.5rem', marginBottom: '15px' }}>⭐</div>
                    <h1 style={{ color: '#FFFFFF', fontSize: '2.4rem', fontWeight: 800, margin: '0 0 10px' }}>
                        Star Tracker Mission
                    </h1>
                    <p style={{ color: '#94A3B8', fontSize: '1.05rem', lineHeight: 1.6, margin: '0 auto 25px', maxWidth: '380px' }}>
                        Calibrate your visual focus and tracking agility by catching luminous stars as they teleport across the galaxy.
                    </p>
                    <button onClick={() => setStep(1)} className="btn-launch" style={{ padding: '16px 40px', fontSize: '1.1rem' }}>
                        LAUNCH MISSION →
                    </button>
                </div>
            )}

            {/* THE GAME AREA */}
            {step === 1 && (
                <div 
                    onClick={handleStarHit}
                    style={{ 
                        position: 'absolute', 
                        top: `${starPos.top}%`, 
                        left: `${starPos.left}%`,
                        transform: 'translate(-50%, -50%)',
                        fontSize: '5.5rem', 
                        cursor: 'pointer', 
                        transition: 'all 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                        filter: 'drop-shadow(0 0 25px rgba(251, 191, 36, 0.95))',
                        zIndex: 10
                    }}
                >
                    ⭐
                </div>
            )}

            {/* RESULTS SCREEN */}
            {step === 2 && (
                <div style={modalStyle}>
                    <div style={{ fontSize: '3.5rem', marginBottom: '15px' }}>🌟</div>
                    <h2 style={{ color: '#34D399', fontSize: '2.4rem', fontWeight: 800, margin: '0 0 10px' }}>
                        Mission Complete!
                    </h2>
                    <div style={{
                        margin: '25px auto',
                        padding: '24px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        borderRadius: '20px',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        maxWidth: '320px'
                    }}>
                        <div style={{ fontSize: '3rem', fontWeight: 900, color: '#FBBF24', fontFamily: 'Space Grotesk, sans-serif' }}>{score}</div>
                        <p style={{ color: '#CBD5E1', margin: '6px 0 0', fontWeight: 600 }}>Celestial Targets Captured</p>
                        <p style={{ fontSize: '0.85rem', color: '#94A3B8', marginTop: '10px' }}>
                            Visual tracking reflex latency calibrated.
                        </p>
                    </div>
                    <button onClick={handleFinish} className="btn-launch" style={{ padding: '16px 36px' }}>
                        {isSaving ? "Syncing Telemetry..." : "Return to Mission Control →"}
                    </button>
                </div>
            )}
        </div>
    );
}

const modalStyle: React.CSSProperties = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
    background: 'rgba(18, 20, 44, 0.92)',
    padding: '48px 36px',
    borderRadius: '28px',
    border: '1px solid rgba(168, 85, 247, 0.4)',
    width: '90%',
    maxWidth: '460px',
    boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8), 0 0 35px rgba(124, 58, 237, 0.35)',
    backdropFilter: 'blur(20px)',
    zIndex: 30
};