// frontend/app/dashboard/page.tsx - Galactic Mission Control Dashboard

'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../layout';

// Mock Data Interfaces
interface InterventionModule {
    id: number;
    module_name: string;
    is_mastered: boolean;
}

interface AssessmentScore {
    risk_level: string;
    accuracy_percent: number;
    created_at: string;
}

// Circular Progress Component (Galactic Dark Mode)
const CircularProgress: React.FC<{ percentage: number, color: string, label: string }> = ({ percentage, color, label }) => {
    const radius = 50;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    return (
        <div style={{ textAlign: 'center' }}>
            <svg width="120" height="120" viewBox="0 0 120 120" style={{ filter: `drop-shadow(0 0 12px ${color}66)` }}>
                <circle
                    cx="60"
                    cy="60"
                    r={radius}
                    fill="transparent"
                    stroke="rgba(255, 255, 255, 0.08)"
                    strokeWidth="10"
                />
                <circle
                    cx="60"
                    cy="60"
                    r={radius}
                    fill="transparent"
                    stroke={color}
                    strokeWidth="10"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    style={{ transition: 'stroke-dashoffset 0.8s ease' }}
                    transform="rotate(-90 60 60)"
                />
                <text x="60" y="66" textAnchor="middle" fontSize="20" fontWeight="800" fill="#FFFFFF" fontFamily="Space Grotesk, sans-serif">
                    {percentage}%
                </text>
            </svg>
            <p style={{ marginTop: '8px', color: '#94A3B8', fontWeight: '600', fontSize: '0.9rem' }}>{label}</p>
        </div>
    );
};

export default function DashboardPage() {
    const { user, token } = useAuth();
    const [currentModule, setCurrentModule] = useState<InterventionModule | null>(null);
    const [latestScore, setLatestScore] = useState<AssessmentScore | null>(null);
    const [, setLoading] = useState(true);

    const lessonsCompleted = 6;
    const mockProgressPercentage = 75; 
    const isModuleMastered = false; 

    useEffect(() => {
        const fetchDashboardData = async () => {
            if (!token) {
                setLoading(false);
                return;
            }
            try {
                setCurrentModule({
                    id: 1,
                    module_name: "Blending 'C-A-T' Sounds",
                    is_mastered: false,
                });
                setLatestScore({
                    risk_level: "Moderate",
                    accuracy_percent: 68.5,
                    created_at: new Date().toISOString(),
                });
            } catch (error) {
                console.error("Dashboard fetch error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, [token]);

    const riskColor = latestScore?.risk_level === 'High' ? '#F43F5E' :
                     latestScore?.risk_level === 'Moderate' ? '#FBBF24' : 
                     '#34D399';

    const actionItems = [
        { title: "Phonics Adventures", description: "Start the next personalized lesson in your learning path.", icon: "📚", link: "/learn", color: "#38BDF8" },
        { title: "Smart Companion", description: "Get instant tutoring help or ask questions about dyslexia.", icon: "🤖", link: "/chat", color: "#C084FC" },
        { title: "Readiness Check", description: "Take a quick screening to measure visual & auditory improvements.", icon: "⭐", link: "/screening", color: "#FBBF24" },
        { title: "Phoneme Popper", description: "Pop high-speed phonetic sound bubbles in space.", icon: "🫧", link: "/assessment", color: "#F472B6" },
        { title: "Skill Quests", description: "Play adaptive typing arcade missions and track streaks.", icon: "⌨️", link: "/skill-quest", color: "#34D399" },
        { title: "Family Support Hub", description: "Connect with resources, parent guides, and specialists.", icon: "👨‍👩‍👧‍👦", link: "/support", color: "#818CF8" },
    ];

    return (
        <div className="dashboard-layout" style={{ maxWidth: '1200px', margin: '0 auto', padding: '10px 0 60px' }}>

            {/* --- 1. WELCOME BANNER (COSMIC COCKPIT) --- */}
            <div style={{
                background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.85) 0%, rgba(99, 102, 241, 0.75) 50%, rgba(244, 114, 182, 0.6) 100%)',
                padding: '44px 36px',
                borderRadius: '24px',
                color: 'white',
                marginBottom: '40px',
                boxShadow: '0 15px 45px rgba(124, 58, 237, 0.35)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div style={{ position: 'relative', zIndex: 2, maxWidth: '750px' }}>
                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '4px 12px',
                        borderRadius: '9999px',
                        background: 'rgba(0, 0, 0, 0.25)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        letterSpacing: '0.05em',
                        marginBottom: '15px'
                    }}>
                        <span>MISSION CONTROL ACTIVE</span>
                    </div>
                    <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.2rem)', margin: '0 0 10px 0', fontWeight: 900, letterSpacing: '-0.03em' }}>
                        Welcome back, {user?.first_name || 'Cadet'}! ✨
                    </h1>
                    <p style={{ fontSize: '1.15rem', margin: 0, opacity: 0.95, lineHeight: 1.5 }}>
                        Current Target Mission: <strong style={{ color: '#FDE047' }}>{currentModule?.module_name || 'Ready to Launch'}</strong>
                    </p>
                </div>

                <div style={{ 
                    position: 'absolute', 
                    right: '25px', 
                    top: '25px', 
                    fontSize: '6rem', 
                    opacity: 0.25, 
                    userSelect: 'none',
                    filter: 'drop-shadow(0 0 20px rgba(255, 255, 255, 0.5))' 
                }}>
                    🚀
                </div>
            </div>

            {/* --- 2. KEY METRICS SNAPSHOT --- */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2 style={{ fontSize: '1.8rem', fontWeight: 800, margin: 0 }}>Progress Snapshot</h2>
                <span style={{ color: '#94A3B8', fontSize: '0.9rem', fontFamily: 'JetBrains Mono, monospace' }}>TELEMETRY V2.0</span>
            </div>
            
            <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', 
                gap: '20px', 
                marginBottom: '50px' 
            }}>
                {/* Metric Card 1: Accuracy */}
                <div className="dashboard-card" style={{ padding: '28px', textAlign: 'center', borderTop: `4px solid ${riskColor}` }}>
                    <div style={{ fontSize: '3rem', fontWeight: 900, color: riskColor, fontFamily: 'Space Grotesk, sans-serif', filter: `drop-shadow(0 0 10px ${riskColor}88)` }}>
                        {latestScore ? latestScore.accuracy_percent : '--'}%
                    </div>
                    <p style={{ color: '#E2E8F0', fontWeight: '700', fontSize: '1rem', margin: '8px 0 4px' }}>Last Accuracy Score</p>
                    <p style={{ color: riskColor, fontWeight: '700', fontSize: '0.9rem', margin: 0 }}>Risk Profile: {latestScore?.risk_level || 'Calibrating'}</p>
                </div>

                {/* Metric Card 2: Current Module Progress */}
                <div className="dashboard-card" style={{ padding: '28px', display: 'flex', flexDirection: 'column', alignItems: 'center', borderTop: `4px solid #A855F7` }}>
                    <CircularProgress percentage={mockProgressPercentage} color="#A855F7" label="Module Mastery" />
                    <p style={{ color: '#D8B4FE', fontWeight: '700', fontSize: '0.95rem', marginTop: '10px', textAlign: 'center' }}>
                        {isModuleMastered ? 'Mastered!' : `${currentModule?.module_name || 'In Progress'}`}
                    </p>
                </div>
                
                {/* Metric Card 3: Lessons Completed */}
                <div className="dashboard-card" style={{ padding: '28px', textAlign: 'center', borderTop: `4px solid #34D399` }}>
                    <div style={{ fontSize: '3rem', fontWeight: 900, color: '#34D399', fontFamily: 'Space Grotesk, sans-serif', filter: 'drop-shadow(0 0 10px rgba(52, 211, 153, 0.5))' }}>
                        {lessonsCompleted}
                    </div>
                    <p style={{ color: '#E2E8F0', fontWeight: '700', fontSize: '1rem', margin: '8px 0 8px' }}>Missions Completed</p>
                    <Link href="/learn" style={{ color: '#34D399', textDecoration: 'none', fontWeight: 700, fontSize: '0.9rem' }}>
                        Explore Adventures →
                    </Link>
                </div>
            </div>
            
            {/* --- 3. QUICK ACTIONS GRID --- */}
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '25px' }}>Command Operations</h2>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '24px'
            }}>
                {actionItems.map(item => (
                    <Link href={item.link} key={item.title} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <div className="dashboard-card" style={{
                            padding: '30px',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            borderTop: `3px solid ${item.color}`
                        }}>
                            <div>
                                <div style={{
                                    width: '52px',
                                    height: '52px',
                                    borderRadius: '14px',
                                    background: `${item.color}22`,
                                    border: `1px solid ${item.color}55`,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '1.6rem',
                                    marginBottom: '18px',
                                    boxShadow: `0 0 15px ${item.color}33`
                                }}>
                                    {item.icon}
                                </div>
                                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, margin: '0 0 10px', color: '#FFFFFF' }}>{item.title}</h3>
                                <p style={{ color: '#94A3B8', fontSize: '0.95rem', lineHeight: 1.6, margin: 0 }}>{item.description}</p>
                            </div>
                            <div style={{
                                marginTop: '24px',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '8px',
                                color: item.color,
                                fontWeight: 800,
                                fontSize: '0.92rem'
                            }}>
                                Launch {item.title.split(' ')[0]} →
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

        </div>
    );
}