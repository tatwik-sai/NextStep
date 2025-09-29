// import { useEffect, useState } from "react";
// import { Button } from "@/components/ui/button"
// import { useRouter } from "next/navigation";

// export default function HeroPage() {
//   const { isSignedIn, userId } = useAuth();
//   const router = useRouter();
//   const [theme, setTheme] = useState("light");

//   useEffect(() => {
//     document.documentElement.classList.remove("light", "dark", "blue");
//     document.documentElement.classList.add(theme);
//   }, [theme]);

//   async function RegisterAction() {
//     if (isSignedIn) {
//       router.push("/portal");
//     } else {
//       router.push("/sign-in?redirect_url=/portal");
//     }
//   }

//   return (
//     <div className="flex gap-2 mt-4">

//       <Button variant="outline" className="cursor-pointer" onClick={ () => {RegisterAction()}}>Register</Button>
//       <button
//         className="px-3 py-1 rounded bg-primary text-background"
//         onClick={() => setTheme("light")}
//       >
//         Light
//       </button>
//       <button
//         className="px-3 py-1 rounded bg-primary text-background"
//         onClick={() => setTheme("dark")}
//       >
//         Dark
//       </button>
//       <button
//         className="px-3 py-1 rounded bg-primary text-background"
//         onClick={() => setTheme("blue")}
//       >
//         Blue
//       </button>

//       <div className="bg-background text-foreground min-h-screen flex flex-col items-center justify-center">
//         <h1 className="text-4xl font-bold text-primary">Theme Switching</h1>
//         <p className="mt-2">This text changes when you switch themes.</p>
//       </div>
//     </div>
//   );
// }


"use client";

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useAuth } from "@clerk/nextjs";
import React, { useState, useEffect, useRef } from 'react';
import { 
  FaUserGraduate, 
  FaBriefcase, 
  FaChartLine, 
  FaUserPlus, 
  FaCalendarCheck, 
  FaChartBar, 
  FaFileAlt, 
  FaUsers, 
  FaGraduationCap, 
  FaBell, 
  FaArrowRight, 
  FaPlay, 
  FaGithub,
  FaEnvelope
} from 'react-icons/fa';
import { HiMenu } from 'react-icons/hi';
import { SiNextra } from 'react-icons/si';

// Combined and converted JSX component
const App = () => {
  const router = useRouter();
  const { isSignedIn, userId } = useAuth();
  const [navMenuActive, setNavMenuActive] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Refs for elements that need direct interaction
  const sections = {
    home: useRef(null),
    features: useRef(null),
    'how-it-works': useRef(null),
    contact: useRef(null),
  };

  // Mobile navigation functionality
  const toggleNavMenu = () => {
    setNavMenuActive(!navMenuActive);
  };
  
  const closeNavMenu = () => {
      setNavMenuActive(false);
  }

  // Smooth scrolling
  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    closeNavMenu();
    if (sections[targetId] && sections[targetId].current) {
        sections[targetId].current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const elements = document.querySelectorAll('.scroll-animate');
    elements.forEach((el) => observer.observe(el));

    return () => elements.forEach((el) => observer.unobserve(el));
  }, []);

  async function RegisterAction() {
    if (isSignedIn) {
      router.push("/portal");
    } else {
      router.push("/sign-in?redirect_url=/portal");
    }
  }

  return (
    <>
      <style>{`
        /* Reset and Base Styles */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        :root {
            --primary-blue: #2563eb;
            --dark-blue: #1e40af;
            --light-blue: #3b82f6;
            --accent-blue: #60a5fa;
            --white: #ffffff;
            --black: #000000;
            --gray-50: #f9fafb;
            --gray-100: #f3f4f6;
            --gray-200: #e5e7eb;
            --gray-300: #d1d5db;
            --gray-600: #4b5563;
            --gray-800: #1f2937;
            --gray-900: #111827;
            --font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            --font-mono: 'JetBrains Mono', 'Fira Code', monospace;
            --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            --transition-bounce: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
            --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
            --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
            --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
            --shadow-glow: 0 0 20px rgba(37, 99, 235, 0.3);
            --gradient-primary: linear-gradient(135deg, var(--primary-blue), var(--light-blue));
            --gradient-accent: linear-gradient(135deg, var(--accent-blue), var(--primary-blue));
            --backdrop-blur: blur(12px);
        }

        body {
            font-family: var(--font-family);
            line-height: 1.6;
            color: var(--gray-800);
            background-color: var(--white);
            overflow-x: hidden;
            transition: margin-left 0.3s ease;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
        }

        
        /* Navigation */
        .navbar {
            position: fixed;
            top: 0;
            width: 100%;
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            border-bottom: 1px solid var(--gray-200);
            z-index: 1000;
            transition: var(--transition);
        }

        .navbar.scrolled {
             background: rgba(255, 255, 255, 0.98);
             box-shadow: 0 2px 20px rgba(0,0,0,0.1);
        }

        .nav-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 70px;
            min-width: 0;
        }
        
        .nav-logo {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            min-width: 0;
            flex-shrink: 0;
        }
        
        .logo {
            display: flex;
            align-items: center;
        }

        .logo-icon {
            display: flex;
            align-items: center;
            justify-content: center;
            transition: var(--transition);
        }

        .logo-icon:hover {
            transform: scale(1.05);
        }

        .nav-logo h2 {
            color: var(--black);
            font-weight: 700;
            font-size: 1.5rem;
            margin: 0;
            white-space: nowrap;
            min-width: 0;
        }

        .nav-logo .highlight {
            color: var(--primary-blue);
        }

        .nav-menu {
            display: flex;
            list-style: none;
            align-items: center;
            gap: 2rem;
        }

        .nav-menu a {
            text-decoration: none;
            color: var(--gray-600);
            font-weight: 500;
            transition: var(--transition);
            position: relative;
        }
        .nav-menu a:hover {
            color: var(--primary-blue);
        }

        .nav-menu a::after {
            content: '';
            position: absolute;
            bottom: -5px;
            left: 0;
            width: 0;
            height: 2px;
            background: var(--primary-blue);
            transition: var(--transition);
        }

        .hamburger {
            display: none;
            flex-direction: column;
            cursor: pointer;
            font-size: 24px;
            color: var(--black);
        }

        .hamburger span {
            width: 25px;
            height: 3px;
            background: var(--black);
            margin: 3px 0;
            transition: var(--transition);
        }
        
        /* Nav Actions */
        .nav-actions {
            display: flex;
            align-items: center;
            margin-left: 1.5rem;
        }
        
        .btn-register {
            background: rgba(255, 255, 255, 0.1);
            color: white;
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 8px;
            padding: 0.65rem 1.5rem;
            font-weight: 500;
            font-size: 0.95rem;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            text-decoration: none;
            white-space: nowrap;
            backdrop-filter: blur(8px);
            position: relative;
            overflow: hidden;
            z-index: 1;
        }
        
        .btn-register::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(135deg, rgba(59, 130, 246, 0.8), rgba(37, 99, 235, 0.9));
            z-index: -1;
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        .btn-register:hover::before {
            opacity: 1;
        }
        
        .btn-register:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 20px rgba(37, 99, 235, 0.3);
            border-color: rgba(255, 255, 255, 0.3);
        }
        
        .btn-register:active {
            transform: translateY(0);
            box-shadow: 0 2px 10px rgba(37, 99, 235, 0.2);
        }
        
        @media (max-width: 768px) {
            .nav-actions {
                margin: 1rem 0 0;
                width: 100%;
            }
            
            .btn-register {
                width: 100%;
                text-align: center;
                padding: 0.75rem 1.5rem;
            }
        }
        
        /* Hero Section */
        .hero {
            padding: 120px 0 80px;
            background: 
                radial-gradient(ellipse at center, #ffffff 0%, #f8fafc 30%, #f1f5f9 70%, #e2e8f0 100%),
                radial-gradient(ellipse at top, rgba(37, 99, 235, 0.03) 0%, transparent 50%),
                radial-gradient(ellipse at bottom, rgba(59, 130, 246, 0.02) 0%, transparent 50%);
            background-attachment: fixed;
            min-height: 100vh;
            display: flex;
            align-items: center;
            position: relative;
            overflow: hidden;
        }
        
        .hero::before {
            content: '';
            position: absolute;
            top: -10%; left: -10%; right: -10%; bottom: -10%;
            background: 
                radial-gradient(ellipse 800px 400px at 20% 30%, rgba(147, 197, 253, 0.08) 0%, transparent 50%),
                radial-gradient(ellipse 600px 300px at 80% 70%, rgba(191, 219, 254, 0.06) 0%, transparent 50%),
                radial-gradient(ellipse 400px 200px at 60% 20%, rgba(219, 234, 254, 0.05) 0%, transparent 50%),
                radial-gradient(ellipse 500px 250px at 30% 80%, rgba(239, 246, 255, 0.04) 0%, transparent 50%);
            pointer-events: none;
            animation: plasmaWaves 18s ease-in-out infinite;
            filter: blur(2px);
            z-index: -1;
        }

        .hero::after {
            content: '';
            position: absolute;
            top: -30%; left: -30%;
            width: 160%; height: 160%;
            background: conic-gradient(from 0deg at 50% 50%, 
                rgba(219, 234, 254, 0.06) 0deg, 
                rgba(191, 219, 254, 0.08) 60deg,
                rgba(147, 197, 253, 0.05) 120deg,
                rgba(239, 246, 255, 0.07) 180deg,
                rgba(191, 219, 254, 0.04) 240deg,
                rgba(147, 197, 253, 0.06) 300deg,
                rgba(219, 234, 254, 0.06) 360deg
            );
            animation: plasmaRotate 25s linear infinite;
            pointer-events: none;
            border-radius: 50%;
            filter: blur(80px);
            opacity: 0.6;
            z-index: -1;
        }

        @keyframes plasmaWaves {
            0%, 100% { transform: translate(0, 0) scale(1) rotate(0deg); opacity: 1; }
            25% { transform: translate(20px, -15px) scale(1.05) rotate(1deg); opacity: 0.8; }
            50% { transform: translate(-15px, 10px) scale(0.95) rotate(-1deg); opacity: 1; }
            75% { transform: translate(10px, -20px) scale(1.02) rotate(0.5deg); opacity: 0.9; }
        }

        @keyframes plasmaRotate {
            0% { transform: rotate(0deg) scale(1); }
            33% { transform: rotate(120deg) scale(1.1); }
            66% { transform: rotate(240deg) scale(0.9); }
            100% { transform: rotate(360deg) scale(1); }
        }

        .hero-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: clamp(2rem, 5vw, 4rem);
            align-items: center;
            position: relative;
            z-index: 1;
        }
        
        .hero-badge {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            background: rgba(37, 99, 235, 0.1);
            border: 1px solid rgba(37, 99, 235, 0.2);
            border-radius: 50px;
            padding: 0.5rem 1rem;
            margin-bottom: 1.5rem;
            font-size: 0.875rem;
            font-weight: 500;
            color: var(--primary-blue);
            backdrop-filter: var(--backdrop-blur);
        }

        .badge-icon {
            font-size: 1rem;
        }

        .hero-title {
            font-size: clamp(2rem, 5vw, 3.5rem);
            font-weight: 800;
            color: var(--gray-900);
            line-height: 1.1;
            margin-bottom: 1.5rem;
            letter-spacing: -0.02em;
            text-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }

        .hero-title .highlight {
            color: var(--primary-blue);
        }

        .gradient-text {
            background: linear-gradient(135deg, #2563eb 0%, #3b82f6 30%, #60a5fa 60%, #93c5fd 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            text-shadow: none;
        }

        .hero-description {
            font-size: 1.25rem;
            color: var(--gray-600);
            margin-bottom: 2rem;
            line-height: 1.6;
            text-shadow: none;
        }

        .hero-buttons {
            display: flex;
            gap: 1rem;
            flex-wrap: wrap;
        }
        
        .btn {
            padding: 12px 24px;
            border-radius: 12px;
            font-weight: 600;
            font-size: 1rem;
            cursor: pointer;
            transition: var(--transition-bounce);
            border: none;
            display: inline-flex;
            align-items: center;
            gap: 8px;
            text-decoration: none;
            position: relative;
            overflow: hidden;
        }
        
        .btn:before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
            transition: left 0.5s;
        }

        .btn:hover:before {
            left: 100%;
        }

        .btn svg {
            transition: transform 0.3s ease;
        }

        .btn:hover svg {
            transform: translateX(4px);
        }

        .btn-primary {
            background: var(--gradient-primary);
            color: var(--white);
            box-shadow: var(--shadow-md);
        }

        .btn-primary:hover {
            transform: translateY(-3px);
            box-shadow: var(--shadow-xl), var(--shadow-glow);
        }

        .btn-glow {
            box-shadow: 0 4px 15px rgba(37, 99, 235, 0.4);
        }
        
        .btn-glow:hover {
            box-shadow: 0 8px 25px rgba(37, 99, 235, 0.6);
        }
        
        .btn-secondary {
            background: rgba(255, 255, 255, 0.1);
            color: var(--gray-600);
            border: 2px solid rgba(255, 255, 255, 0.2);
            backdrop-filter: var(--backdrop-blur);
        }

        .btn-secondary:hover {
            background: rgba(255, 255, 255, 0.2);
            border-color: var(--primary-blue);
            color: var(--primary-blue);
            transform: translateY(-2px);
        }

        .btn-glass {
            backdrop-filter: var(--backdrop-blur);
            border: 1px solid rgba(255, 255, 255, 0.3);
        }

        .btn-outline {
            background: transparent;
            color: var(--primary-blue);
            border: 2px solid var(--primary-blue);
        }
        
        .btn-outline:hover {
            background: var(--primary-blue);
            color: var(--white);
        }
        
        /* Hero Visual */
        .hero-visual {
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
        }

        .hero-card-stack {
            position: relative;
            width: 100%;
            max-width: 400px;
        }

        .hero-card {
            background: rgba(255, 255, 255, 0.98);
            backdrop-filter: var(--backdrop-blur);
            border: 1px solid rgba(226, 232, 240, 0.4);
            border-radius: 20px;
            padding: 2rem;
            margin-bottom: 1.5rem;
            box-shadow: 
                0 8px 32px rgba(0, 0, 0, 0.08),
                0 4px 16px rgba(0, 0, 0, 0.04),
                0 0 0 1px rgba(255,255,255,0.9),
                inset 0 1px 0 rgba(255,255,255,0.95);
            transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            position: relative;
            z-index: 2;
            overflow: hidden;
        }

        .hero-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 3px;
            background: var(--gradient-primary);
            border-radius: 20px 20px 0 0;
        }

        .hero-card:hover {
            transform: translateY(-8px) scale(1.02);
            box-shadow: 
                0 20px 40px rgba(0, 0, 0, 0.12),
                0 8px 24px rgba(0, 0, 0, 0.08),
                0 0 0 1px rgba(37, 99, 235, 0.1);
        }

        .card-1 { animation: float 6s ease-in-out infinite; }
        .card-2 { animation: float 6s ease-in-out infinite 2s; transform: translateX(20px); }
        .card-3 { animation: float 6s ease-in-out infinite 4s; transform: translateX(-20px); }

        .card-header {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            margin-bottom: 1rem;
        }

        .card-icon {
            width: 40px;
            height: 40px;
            background: var(--gradient-primary);
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--white);
            font-size: 1rem;
            box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
            transition: all 0.3s ease;
        }

        .hero-card:hover .card-icon {
            transform: scale(1.1) rotate(5deg);
            box-shadow: 0 6px 16px rgba(37, 99, 235, 0.4);
        }

        .card-title {
            font-weight: 700;
            color: var(--gray-900);
            font-size: 1rem;
            letter-spacing: -0.01em;
        }

        .progress-bar {
            width: 100%;
            height: 6px;
            background: var(--gray-200);
            border-radius: 3px;
            overflow: hidden;
            margin-bottom: 0.5rem;
        }

        .progress-fill {
            height: 100%;
            background: var(--gradient-primary);
            border-radius: 3px;
            animation: progressFill 2s ease-out;
        }
        
        .progress-text {
            font-size: 0.75rem;
            color: var(--gray-600);
        }
        
        .match-items {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
        }
        
        .match-item {
            padding: 0.5rem 0.75rem;
            background: var(--gray-100);
            border-radius: 8px;
            font-size: 0.75rem;
            color: var(--gray-600);
            transition: var(--transition);
        }
        
        .match-item.active {
            background: var(--gradient-primary);
            color: var(--white);
        }
        
        .chart-bars {
            display: flex;
            align-items: flex-end;
            justify-content: center;
            gap: 0.25rem;
            height: 50px;
            margin-bottom: 0.75rem;
        }
        
        .bar {
            width: 8px;
            background: linear-gradient(180deg, var(--primary-blue) 0%, var(--light-blue) 50%, rgba(255,255,255,0.9) 100%);
            border-radius: 4px;
            animation: barGrow 1.5s ease-out;
            box-shadow: 0 2px 4px rgba(37, 99, 235, 0.2);
        }
        
        .chart-label {
            text-align: center;
            font-size: 0.75rem;
            color: var(--gray-600);
            font-weight: 500;
        }
        @keyframes barGrow {
            from { height: 0; }
        }
        @keyframes cardFloat {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
        }
        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
        }
        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
        }
        
        /* Section Headers */
        .section-header {
            text-align: center;
            margin-bottom: 4rem;
        }
        
        .section-badge {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            background: rgba(37, 99, 235, 0.1);
            border: 1px solid rgba(37, 99, 235, 0.2);
            border-radius: 50px;
            padding: 0.5rem 1rem;
            margin-bottom: 1rem;
            font-size: 0.875rem;
            font-weight: 500;
            color: var(--primary-blue);
        }
        
        .badge-dot {
            width: 8px;
            height: 8px;
            background: var(--primary-blue);
            border-radius: 50%;
            animation: pulse 2s ease-in-out infinite;
        }
        
        /* Features Section */
        .features {
            padding: 80px 0;
            background: var(--white);
            position: relative;
        }

        .features::before {
            content: '';
            position: absolute;
            top: 0; left: 0; right: 0; bottom: 0;
            background:
                radial-gradient(circle at 10% 20%, rgba(37, 99, 235, 0.02) 0, transparent 50%),
                radial-gradient(circle at 90% 80%, rgba(96, 165, 250, 0.02) 0, transparent 50%);
            pointer-events: none;
        }
        
        .section-title {
            font-size: 2.5rem;
            font-weight: 700;
            color: var(--black);
            text-align: center;
            margin-bottom: 1rem;
        }
        
        .section-subtitle {
            font-size: 1.25rem;
            color: var(--gray-600);
            text-align: center;
            margin-bottom: 3rem;
            max-width: 600px;
            margin-left: auto;
            margin-right: auto;
        }

        .features-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
            margin-top: 3rem;
        }
        
        .feature-card {
            background: var(--white);
            padding: 2rem;
            border-radius: 16px;
            border: 1px solid var(--gray-200);
            transition: var(--transition);
            text-align: center;
            position: relative;
            overflow: hidden;
        }
        
        .feature-card:before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 3px;
            background: var(--gradient-primary);
            transform: scaleX(0);
            transition: transform 0.3s ease;
        }
        
        .feature-card:hover:before {
            transform: scaleX(1);
        }

        .feature-card:hover {
            transform: translateY(-8px);
            box-shadow: var(--shadow-xl);
            border-color: rgba(37, 99, 235, 0.3);
        }
        
        .modern-card {
            backdrop-filter: var(--backdrop-blur);
            background: rgba(255, 255, 255, 0.8);
        }

        .feature-icon {
            width: 60px;
            height: 60px;
            border-radius: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 1.5rem;
            color: var(--white);
            font-size: 1.5rem;
            transition: var(--transition-bounce);
        }
        
        .gradient-bg {
            background: var(--gradient-primary);
        }

        .feature-card:hover .feature-icon {
            transform: scale(1.1) rotate(5deg);
        }

        .card-footer {
            margin-top: 1.5rem;
            padding-top: 1rem;
            border-top: 1px solid var(--gray-100);
        }

        .feature-tag {
            display: inline-block;
            background: rgba(37, 99, 235, 0.1);
            color: var(--primary-blue);
            padding: 0.25rem 0.75rem;
            border-radius: 50px;
            font-size: 0.75rem;
            font-weight: 500;
            font-family: var(--font-mono);
        }
        
        .feature-card h3 {
            font-size: 1.25rem;
            font-weight: 600;
            color: var(--black);
            margin-bottom: 1rem;
        }
        
        .feature-card p {
            color: var(--gray-600);
            line-height: 1.6;
        }
        
        /* How It Works Section */
        .how-it-works {
            padding: 80px 0;
            background: var(--gray-50);
        }
        
        .steps-container {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 3rem;
            margin-top: 3rem;
        }
        
        .step {
            display: flex;
            align-items: flex-start;
            gap: 1.5rem;
        }
        
        .step-number {
            width: 50px;
            height: 50px;
            background: var(--primary-blue);
            color: var(--white);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            font-size: 1.25rem;
            flex-shrink: 0;
        }

        .step-content h3 {
            font-size: 1.25rem;
            font-weight: 600;
            color: var(--black);
            margin-bottom: 0.5rem;
        }
        
        .step-content p {
            color: var(--gray-600);
            line-height: 1.6;
        }
        
        /* CTA Section */
        .cta {
            padding: 80px 0;
            background: linear-gradient(135deg, var(--primary-blue), var(--dark-blue));
            color: var(--white);
            text-align: center;
        }

        .cta-content h2 {
            font-size: 2.5rem;
            font-weight: 700;
            margin-bottom: 1rem;
        }

        .cta-content p {
            font-size: 1.25rem;
            margin-bottom: 2rem;
            opacity: 0.9;
        }

        .cta-buttons {
            display: flex;
            gap: 1rem;
            justify-content: center;
            flex-wrap: wrap;
        }
        
        .cta .btn-primary {
            background: var(--white);
            color: var(--primary-blue);
        }
        .cta .btn-primary:hover {
            background: var(--gray-100);
        }

        .cta .btn-outline {
            border-color: var(--white);
            color: var(--white);
        }
        .cta .btn-outline:hover {
            background: var(--white);
            color: var(--primary-blue);
        }

        /* Footer */
        .footer {
            background: var(--black);
            color: var(--white);
            padding: 60px 0 20px;
        }

        .footer-content {
            display: grid;
            grid-template-columns: 1fr 2fr;
            gap: 3rem;
            margin-bottom: 2rem;
        }
        
        .footer-logo {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            margin-bottom: 1rem;
        }

        .footer-brand h3 {
            font-size: 1.5rem;
            font-weight: 700;
            margin: 0;
        }

        .footer-brand .highlight {
            color: var(--primary-blue);
        }

        .footer-brand p {
            color: var(--gray-300);
            line-height: 1.6;
        }
        
        .footer-links {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 2rem;
        }

        .footer-column h4 {
            font-weight: 600;
            margin-bottom: 1rem;
            color: var(--white);
        }
        
        .footer-column ul {
            list-style: none;
        }

        .footer-column ul li {
            margin-bottom: 0.5rem;
        }

        .footer-column ul li a {
            color: var(--gray-300);
            text-decoration: none;
            transition: var(--transition);
        }
        
        .footer-column ul li a:hover {
            color: var(--primary-blue);
        }

        .footer-bottom {
            border-top: 1px solid var(--gray-800);
            padding-top: 2rem;
            text-align: center;
            color: var(--gray-300);
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }
        
        .footer-contact a {
            color: var(--primary-blue);
            text-decoration: none;
            transition: var(--transition);
        }
        .footer-contact a:hover {
            color: var(--light-blue);
            text-decoration: underline;
        }
        @media (max-width: 768px) {
            .footer-bottom {
                gap: 0.75rem;
            }
        }
        
        /* Responsive Design */
        /* Large tablets and small desktops */
        @media (max-width: 1024px) {
            .hero-container {
                gap: 3rem;
            }
            .hero-title {
                font-size: 3rem;
            }
            .features-grid {
                grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                gap: 1.5rem;
            }
            .steps-container {
                grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                gap: 2rem;
            }
        }
        
        /* Tablets */
        @media (max-width: 768px) {
            .hamburger {
                display: flex;
            }
            .nav-menu {
                position: fixed;
                left: -100%;
                top: 70px;
                flex-direction: column;
                background-color: var(--white);
                width: 100%;
                text-align: center;
                transition: var(--transition);
                box-shadow: var(--shadow-lg);
                padding: 2rem 0;
            }
            .nav-menu.active {
                left: 0;
            }
            .hero {
                padding: 100px 0 60px;
            }
            .hero-container {
                grid-template-columns: 1fr;
                gap: 2rem;
                text-align: center;
            }
            .hero-title {
                font-size: 2.5rem;
                margin-bottom: 1rem;
            }
            .hero-description {
                font-size: 1.1rem;
                margin-bottom: 1.5rem;
            }
            .hero-buttons {
                justify-content: center;
                flex-direction: column;
                align-items: center;
                gap: 0.75rem;
            }
            .btn {
                width: 100%;
                max-width: 280px;
                justify-content: center;
            }
            .features-grid {
                grid-template-columns: 1fr;
                gap: 1.5rem;
            }
            .steps-container {
                grid-template-columns: 1fr;
                gap: 1.5rem;
            }
            .step {
                flex-direction: column;
                text-align: center;
                gap: 1rem;
            }
            .footer-content {
                grid-template-columns: 1fr;
                gap: 2rem;
                text-align: center;
            }
            .footer-links {
                grid-template-columns: repeat(3, 1fr);
                gap: 1.5rem;
            }
            .cta-content h2 {
                font-size: 2rem;
            }
            .section-title {
                font-size: 2rem;
            }
            .hero-card-stack {
                max-width: 100%;
                margin-top: 2rem;
            }
            .card-2, .card-3 {
                transform: none;
            }
            .hero-card {
                margin-bottom: 0.75rem;
            }
        }
        
        /* Mobile devices */
        @media (max-width: 480px) {
            .container {
                padding: 0 15px;
            }
            .hero {
                padding: 80px 0 40px;
            }
            .hero-container {
                padding: 0 15px;
                gap: 1.5rem;
            }
            .hero-title {
                font-size: 2rem;
                line-height: 1.2;
            }
            .hero-description {
                font-size: 1rem;
                margin-bottom: 1.5rem;
            }
            .hero-buttons {
                flex-direction: column;
                align-items: center;
                gap: 0.75rem;
            }
            .btn {
                width: 100%;
                max-width: 250px;
                justify-content: center;
                padding: 10px 20px;
                font-size: 0.9rem;
            }
            .hero-card {
                padding: 1rem;
                margin-bottom: 0.5rem;
            }
            .hero-card-stack {
                margin-top: 1.5rem;
            }
            .section-title {
                font-size: 1.75rem;
            }
            .section-subtitle {
                font-size: 1rem;
            }
            .feature-card {
                padding: 1.5rem;
            }
            .step {
                gap: 0.75rem;
            }
            .step-number {
                width: 40px;
                height: 40px;
                font-size: 1rem;
            }
            .footer-links {
                grid-template-columns: 1fr;
                gap: 1rem;
            }
            .cta-content h2 {
                font-size: 1.75rem;
            }
            .cta-content p {
                font-size: 1rem;
            }
        }
        
        /* Extra small devices */
        @media (max-width: 360px) {
            .nav-container {
                padding: 0 15px;
            }
            .nav-logo {
                gap: 0.5rem;
            }
            .nav-logo h2 {
                font-size: 1.25rem;
            }
            .logo-icon svg {
                width: 24px;
                height: 24px;
            }
            .hero-title {
                font-size: 1.75rem;
            }
            .btn {
                padding: 8px 16px;
                font-size: 0.85rem;
            }
            .feature-card {
                padding: 1.25rem;
            }
            .hero-card {
                padding: 0.75rem;
            }
        }
        
        /* Very small devices */
        @media (max-width: 320px) {
            .nav-container {
                padding: 0 10px;
            }
            .nav-logo {
                gap: 0.4rem;
            }
            .nav-logo h2 {
                font-size: 1.1rem;
            }
            .logo-icon svg {
                width: 20px;
                height: 20px;
            }
        }
        
        /* Smooth scrolling */
        html {
            scroll-behavior: smooth;
        }

        /* Loading animations */
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .fade-in-up {
            animation: fadeInUp 0.6s ease-out;
        }

        /* Scroll animations */
        .scroll-animate {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease-out;
        }

        .scroll-animate.animate {
            opacity: 1;
            transform: translateY(0);
        }
      `}</style>
      
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
            <div className="nav-logo ">
                {/* <div className="logo">
                    <div className="logo-icon">
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="32" height="32" rx="8" fill="url(#gradient)"/>
                            <path d="M8 12L16 8L24 12V20C24 22.2091 22.2091 24 20 24H12C9.79086 24 8 22.2091 8 20V12Z" fill="white"/>
                            <path d="M12 16L16 14L20 16V20H12V16Z" fill="#2563eb"/>
                            <defs>
                                <linearGradient id="gradient" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="#2563eb"/>
                                    <stop offset="1" stopColor="#3b82f6"/>
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
                </div> */}
                <SiNextra className='text-3xl text-blue-600' />
                <h2>Next<span className="highlight">Step</span></h2>
            </div>
            <ul className={`nav-menu ${navMenuActive ? 'active' : ''}`}>
                <li><a href="#home" onClick={(e) => handleNavClick(e, 'home')}>Home</a></li>
                <li><a href="#features" onClick={(e) => handleNavClick(e, 'features')}>Features</a></li>
                <li><a href="#how-it-works" onClick={(e) => handleNavClick(e, 'how-it-works')}>Process</a></li>
                <li><a href="#contact" onClick={(e) => handleNavClick(e, 'contact')}>Contact</a></li>
            </ul>
            <div className="nav-actions">
                <Button className="text-white p-2 w-20 hover:bg-blue-600 cursor-pointer duration-300 transition-colors"
                onClick={() => RegisterAction()}>Register</Button>
            </div>
            <div className="hamburger" onClick={toggleNavMenu}>
                <HiMenu />
            </div>
        </div>
      </nav>

      <section id="home" className="hero" ref={sections.home}>
        <div className="hero-container">
            <div className="hero-content scroll-animate">
                <h1 className="hero-title">Streamline Internships, <span className="highlight gradient-text">Build Careers</span></h1>
                <p className="hero-description">Transform campus placements with our unified platform. Connect students, mentors, and recruiters through smart automation and data-driven insights.</p>
                <div className="hero-buttons">
                    <a href="#features" className="btn btn-primary btn-glow" onClick={(e) => handleNavClick(e, 'features')}>Explore Features <FaArrowRight /></a>
                    <a href="#how-it-works" className="btn btn-secondary btn-glass" onClick={(e) => handleNavClick(e, 'how-it-works')}>See How It Works <FaPlay /></a>
                </div>
            </div>
            <div className="hero-visual">
                <div className="hero-card-stack">
                    <div className="hero-card card-1">
                        <div className="card-header">
                            <div className="card-icon"><FaUserGraduate /></div>
                            <div className="card-title">Student Portal</div>
                        </div>
                        <div className="card-content">
                            <div className="progress-bar">
                                <div className="progress-fill" style={{width: '85%'}}></div>
                            </div>
                            <span className="progress-text">Profile Complete</span>
                        </div>
                    </div>
                    <div className="hero-card card-2">
                        <div className="card-header">
                            <div className="card-icon"><FaBriefcase /></div>
                            <div className="card-title">Job Matching</div>
                        </div>
                        <div className="card-content">
                            <div className="match-items">
                                <div className="match-item active">Frontend Developer</div>
                                <div className="match-item">Data Analyst</div>
                                <div className="match-item">UI/UX Designer</div>
                            </div>
                        </div>
                    </div>
                    <div className="hero-card card-3">
                        <div className="card-header">
                            <div className="card-icon"><FaChartLine /></div>
                            <div className="card-title">Analytics</div>
                        </div>
                        <div className="card-content">
                            <div className="chart-bars">
                                <div className="bar" style={{height: '30px'}}></div>
                                <div className="bar" style={{height: '40px'}}></div>
                                <div className="bar" style={{height: '45px'}}></div>
                                <div className="bar" style={{height: '90px'}}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      <section id="features" className="features" ref={sections.features}>
        <div className="container">
            <div className="section-header">
                <div className="section-badge scroll-animate"><span className="badge-dot"></span> <span>Features</span></div>
                <h2 className="section-title scroll-animate">Platform Features</h2>
                <p className="section-subtitle scroll-animate">An integrated, role-based portal designed to simplify every step of the internship journey for students and campus staff.</p>
            </div>
            <div className="features-grid">
                <div className="feature-card modern-card scroll-animate">
                    <div className="feature-icon gradient-bg"><FaUserPlus /></div>
                    <h3>Student Registration</h3>
                    <p>Streamlined registration process for students with comprehensive profile creation.</p>
                    <div className="card-footer">
                        <span className="feature-tag">Registration</span>
                    </div>
                </div>
                <div className="feature-card modern-card scroll-animate">
                    <div className="feature-icon gradient-bg"><FaBriefcase /></div>
                    <h3>Job Postings</h3>
                    <p>Verified opportunities tagged by skills and department with real-time updates.</p>
                    <div className="card-footer">
                        <span className="feature-tag">Job Board</span>
                    </div>
                </div>
                <div className="feature-card modern-card scroll-animate">
                    <div className="feature-icon gradient-bg"><FaCalendarCheck /></div>
                    <h3>Interview Scheduling</h3>
                    <p>Automated interview scheduling with calendar integration and notifications.</p>
                    <div className="card-footer">
                        <span className="feature-tag">Scheduling</span>
                    </div>
                </div>
                <div className="feature-card modern-card scroll-animate">
                    <div className="feature-icon gradient-bg"><FaChartBar /></div>
                    <h3>Analytics Dashboard</h3>
                    <p>Comprehensive analytics and insights for placement tracking and performance.</p>
                    <div className="card-footer">
                        <span className="feature-tag">Analytics</span>
                    </div>
                </div>
                <div className="feature-card modern-card scroll-animate">
                    <div className="feature-icon gradient-bg"><FaFileAlt /></div>
                    <h3>Resume Builder</h3>
                    <p>AI-powered resume builder with templates and optimization suggestions.</p>
                    <div className="card-footer">
                        <span className="feature-tag">Resume Tools</span>
                    </div>
                </div>
                <div className="feature-card modern-card scroll-animate">
                    <div className="feature-icon gradient-bg"><FaUsers /></div>
                    <h3>Company Portal</h3>
                    <p>Dedicated portal for companies to manage postings and candidate interactions.</p>
                    <div className="card-footer">
                        <span className="feature-tag">Company Hub</span>
                    </div>
                </div>
                <div className="feature-card modern-card scroll-animate">
                    <div className="feature-icon gradient-bg"><FaGraduationCap /></div>
                    <h3>Skill Assessment</h3>
                    <p>Comprehensive skill evaluation and certification system for students.</p>
                    <div className="card-footer">
                        <span className="feature-tag">Assessment</span>
                    </div>
                </div>
                <div className="feature-card modern-card scroll-animate">
                    <div className="feature-icon gradient-bg"><FaBell /></div>
                    <h3>Notifications</h3>
                    <p>Real-time notifications for applications, interviews, and important updates.</p>
                    <div className="card-footer">
                        <span className="feature-tag">Alerts</span>
                    </div>
                </div>
            </div>
        </div>
      </section>

      <section id="how-it-works" className="how-it-works" ref={sections['how-it-works']}>
        <div className="container">
            <h2 className="section-title scroll-animate">How It Works</h2>
            <p className="section-subtitle scroll-animate">Four simple steps from profile to placement.</p>
            <div className="steps-container">
                <div className="step scroll-animate">
                    <div className="step-number">1</div>
                    <div className="step-content">
                        <h3>Create Profile</h3>
                        <p>Build your digital profile with skills, resume, and achievements.</p>
                    </div>
                </div>
                <div className="step scroll-animate">
                    <div className="step-number">2</div>
                    <div className="step-content">
                        <h3>Apply Smart</h3>
                        <p>Get personalized job matches and apply with one click.</p>
                    </div>
                </div>
                <div className="step scroll-animate">
                    <div className="step-number">3</div>
                    <div className="step-content">
                        <h3>Track Progress</h3>
                        <p>Monitor applications and schedule interviews seamlessly.</p>
                    </div>
                </div>
                <div className="step scroll-animate">
                    <div className="step-number">4</div>
                    <div className="step-content">
                        <h3>Get Certified</h3>
                        <p>Complete internships and receive verified certificates automatically.</p>
                    </div>
                </div>
            </div>
        </div>
      </section>

      <section className="cta">
        <div className="container">
            <div className="cta-content">
                <h2>Transform Your Campus Placements</h2>
                <p>Ready to move from manual chaos to a streamlined, software-driven process? Discover how our platform can help.</p>
                <div className="cta-buttons">
                    <a href="#home" className="btn btn-primary" onClick={(e) => handleNavClick(e, 'home')}>Get Started</a>
                    <a href="https://github.com/your-repo" className="btn btn-outline" target="_blank" rel="noopener noreferrer">View on GitHub</a>
                </div>
            </div>
        </div>
      </section>

      <footer id="contact" className="footer" ref={sections.contact}>
        <div className="container">
            <div className="footer-content">
                <div className="footer-brand flex-col items-center">
                    <div className='flex items-center gap-2'>
                      <SiNextra className='text-3xl text-blue-600' />
                      <h3>Next<span className="highlight">Step</span></h3>
                    </div>
                    <p>A Smart India Hackathon 2025 Project by Team Code Crafters.</p>
                </div>
                <div className="footer-links">
                    <div className="footer-column">
                        <h4>Platform</h4>
                        <ul>
                            <li><a href="#features" onClick={(e) => handleNavClick(e, 'features')}>Features</a></li>
                            <li><a href="#how-it-works" onClick={(e) => handleNavClick(e, 'how-it-works')}>Process</a></li>
                        </ul>
                    </div>
                    <div className="footer-column">
                        <h4>Roles</h4>
                        <ul>
                            <li>Student</li>
                            <li>Mentor</li>
                            <li>Placement Cell</li>
                            <li>Recruiter</li>
                        </ul>
                    </div>
                    <div className="footer-column">
                        <h4>Resources</h4>
                        <ul>
                            <li><a href="https://sih.gov.in" target="_blank" rel="noopener noreferrer">SIH Website</a></li>
                            <li><a href="https://github.com/tatwik-sai/NextStep" target="_blank" rel="noopener noreferrer"> GitHub Repository</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <div className="footer-contact">
                    <span>Contact <a href="mailto:contact@nextstep.edu">contact@nextstep.edu</a></span>
                </div>
                <div>
                    &copy; 2025 NextStep. All rights reserved.
                </div>
            </div>
        </div>
      </footer>
    </>
  );
};

export default App;
