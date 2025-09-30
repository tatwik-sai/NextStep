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


            <nav className={`fixed top-0 w-full z-[1000] transition-all duration-300 backdrop-blur-[10px] border-b border-gray-200 ${scrolled ? 'bg-white/98 shadow-[0_2px_20px_rgba(0,0,0,0.1)]' : 'bg-white/95'}`}>
                <div className="max-w-[1200px] mx-auto px-5 flex justify-between items-center h-[70px] min-w-0">
                    <div className="flex items-center gap-3 min-w-0 flex-shrink-0">
                        <SiNextra className='text-3xl text-blue-600 transition-all duration-300 hover:scale-105' />
                        <h2 className="text-black font-bold text-2xl m-0 whitespace-nowrap min-w-0">Next<span className="text-blue-600">Step</span></h2>
                    </div>
                    <ul className={`${navMenuActive ? 'left-0' : 'left-[-100%]'} fixed top-[70px] md:static md:left-auto flex flex-col md:flex-row list-none items-center gap-8 md:gap-8 bg-white md:bg-transparent w-full md:w-auto text-center md:text-left transition-all duration-300 shadow-lg md:shadow-none p-8 md:p-0`}>
                        <li><a href="#home" onClick={(e) => handleNavClick(e, 'home')} className="no-underline text-gray-600 font-medium transition-all duration-300 relative hover:text-blue-600 after:content-[''] after:absolute after:bottom-[-5px] after:left-0 after:w-0 after:h-0.5 after:bg-blue-600 after:transition-all after:duration-300 hover:after:w-full">Home</a></li>
                        <li><a href="#features" onClick={(e) => handleNavClick(e, 'features')} className="no-underline text-gray-600 font-medium transition-all duration-300 relative hover:text-blue-600 after:content-[''] after:absolute after:bottom-[-5px] after:left-0 after:w-0 after:h-0.5 after:bg-blue-600 after:transition-all after:duration-300 hover:after:w-full">Features</a></li>
                        <li><a href="#how-it-works" onClick={(e) => handleNavClick(e, 'how-it-works')} className="no-underline text-gray-600 font-medium transition-all duration-300 relative hover:text-blue-600 after:content-[''] after:absolute after:bottom-[-5px] after:left-0 after:w-0 after:h-0.5 after:bg-blue-600 after:transition-all after:duration-300 hover:after:w-full">Process</a></li>
                        <li><a href="#contact" onClick={(e) => handleNavClick(e, 'contact')} className="no-underline text-gray-600 font-medium transition-all duration-300 relative hover:text-blue-600 after:content-[''] after:absolute after:bottom-[-5px] after:left-0 after:w-0 after:h-0.5 after:bg-blue-600 after:transition-all after:duration-300 hover:after:w-full">Contact</a></li>
                    </ul>
                    <div className="flex items-center ml-6">
                        <Button className="text-white p-2 w-20 hover:bg-blue-600 cursor-pointer duration-300 transition-colors"
                            onClick={() => RegisterAction()}>Register</Button>
                    </div>
                    <div className="flex md:hidden flex-col cursor-pointer text-2xl text-black" onClick={toggleNavMenu}>
                        <HiMenu />
                    </div>
                </div>
            </nav>

            <section id="home" className="pt-[120px] pb-20 bg-gradient-to-r from-white via-slate-50 to-gray-100 bg-fixed min-h-screen flex items-center relative overflow-hidden before:content-[''] before:absolute before:top-[-10%] before:left-[-10%] before:right-[-10%] before:bottom-[-10%] before:bg-gradient-to-r before:from-blue-100/8 before:via-blue-200/6 before:to-blue-50/5 before:pointer-events-none before:animate-[plasmaWaves_18s_ease-in-out_infinite] before:blur-[2px] before:z-[-1] after:content-[''] after:absolute after:top-[-30%] after:left-[-30%] after:w-[160%] after:h-[160%] after:bg-conic-gradient after:animate-[plasmaRotate_25s_linear_infinite] after:pointer-events-none after:rounded-full after:blur-[80px] after:opacity-60 after:z-[-1]" ref={sections.home}>
                <div className="max-w-[1200px] mx-auto px-5 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center relative z-[1]">
                    <div className="scroll-animate">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-[1.1] mb-6 tracking-[-0.02em] text-shadow-sm">Streamline Internships, <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 bg-clip-text text-transparent">Build Careers</span></h1>
                        <p className="text-xl text-gray-600 mb-8 leading-relaxed">Transform campus placements with our unified platform. Connect students, mentors, and recruiters through smart automation and data-driven insights.</p>
                        <div className="flex flex-wrap gap-4">
                            <a href="#features" onClick={(e) => handleNavClick(e, 'features')} className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold text-base rounded-xl shadow-md hover:shadow-xl hover:shadow-blue-500/40 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden before:content-[''] before:absolute before:top-0 before:left-[-100%] before:w-full before:h-full before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:transition-all before:duration-500 hover:before:left-[100%]">
                                Explore Features <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                            </a>
                            <a href="https://www.youtube.com/watch?v=192sZqp0feU" className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 text-gray-600 border-2 border-white/20 font-semibold text-base rounded-xl backdrop-blur-lg hover:bg-white/20 hover:border-blue-600 hover:text-blue-600 hover:-translate-y-0.5 transition-all duration-300">
                                See How It Works <FaPlay />
                            </a>
                        </div>
                    </div>
                    <div className="flex justify-center items-center relative">
                        <div className="relative w-full max-w-[400px]">
                            <div className="bg-white/98 backdrop-blur-lg border border-gray-200/40 rounded-[20px] p-8 mb-6 shadow-[0_8px_32px_rgba(0,0,0,0.08),0_4px_16px_rgba(0,0,0,0.04),0_0_0_1px_rgba(255,255,255,0.9)] transition-all duration-[400ms] relative z-[2] overflow-hidden before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-[3px] before:bg-gradient-to-r before:from-blue-600 before:to-blue-500 before:rounded-t-[20px] hover:shadow-[0_20px_40px_rgba(0,0,0,0.12),0_8px_24px_rgba(0,0,0,0.08)] hover:-translate-y-2 hover:scale-105 animate-[float_6s_ease-in-out_infinite]">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl flex items-center justify-center text-white shadow-[0_4px_12px_rgba(37,99,235,0.3)] transition-all duration-300 hover:scale-110 hover:rotate-[5deg] hover:shadow-[0_6px_16px_rgba(37,99,235,0.4)]">
                                        <FaUserGraduate />
                                    </div>
                                    <div className="font-bold text-gray-900 text-base tracking-[-0.01em]">Student Portal</div>
                                </div>
                                <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden mb-2">
                                    <div className="h-full bg-gradient-to-r from-blue-600 to-blue-500 rounded-full w-[85%] animate-[progressFill_2s_ease-out]"></div>
                                </div>
                                <span className="text-xs text-gray-600">Profile Complete</span>
                            </div>
                            <div className="bg-white/98 backdrop-blur-lg border border-gray-200/40 rounded-[20px] p-8 mb-6 shadow-[0_8px_32px_rgba(0,0,0,0.08),0_4px_16px_rgba(0,0,0,0.04),0_0_0_1px_rgba(255,255,255,0.9)] transition-all duration-[400ms] relative z-[2] overflow-hidden before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-[3px] before:bg-gradient-to-r before:from-blue-600 before:to-blue-500 before:rounded-t-[20px] hover:shadow-[0_20px_40px_rgba(0,0,0,0.12),0_8px_24px_rgba(0,0,0,0.08)] hover:-translate-y-2 hover:scale-105 animate-[float_6s_ease-in-out_infinite_2s] transform translate-x-5">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl flex items-center justify-center text-white shadow-[0_4px_12px_rgba(37,99,235,0.3)] transition-all duration-300 hover:scale-110 hover:rotate-[5deg] hover:shadow-[0_6px_16px_rgba(37,99,235,0.4)]">
                                        <FaBriefcase />
                                    </div>
                                    <div className="font-bold text-gray-900 text-base tracking-[-0.01em]">Job Matching</div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div className="p-2 px-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg text-xs transition-all duration-300">Frontend Developer</div>
                                    <div className="p-2 px-3 bg-gray-100 text-gray-600 rounded-lg text-xs transition-all duration-300">Data Analyst</div>
                                    <div className="p-2 px-3 bg-gray-100 text-gray-600 rounded-lg text-xs transition-all duration-300">UI/UX Designer</div>
                                </div>
                            </div>
                            <div className="bg-white/98 backdrop-blur-lg border border-gray-200/40 rounded-[20px] p-8 mb-6 shadow-[0_8px_32px_rgba(0,0,0,0.08),0_4px_16px_rgba(0,0,0,0.04),0_0_0_1px_rgba(255,255,255,0.9)] transition-all duration-[400ms] relative z-[2] overflow-hidden before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-[3px] before:bg-gradient-to-r before:from-blue-600 before:to-blue-500 before:rounded-t-[20px] hover:shadow-[0_20px_40px_rgba(0,0,0,0.12),0_8px_24px_rgba(0,0,0,0.08)] hover:-translate-y-2 hover:scale-105 animate-[float_6s_ease-in-out_infinite_4s] transform -translate-x-5">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl flex items-center justify-center text-white shadow-[0_4px_12px_rgba(37,99,235,0.3)] transition-all duration-300 hover:scale-110 hover:rotate-[5deg] hover:shadow-[0_6px_16px_rgba(37,99,235,0.4)]">
                                        <FaChartLine />
                                    </div>
                                    <div className="font-bold text-gray-900 text-base tracking-[-0.01em]">Analytics</div>
                                </div>
                                <div className="flex items-end justify-center gap-1 h-[50px] mb-3">
                                    <div className="w-2 bg-gradient-to-t from-blue-600 to-blue-500 rounded shadow-[0_2px_4px_rgba(37,99,235,0.2)] animate-[barGrow_1.5s_ease-out] h-[30px]"></div>
                                    <div className="w-2 bg-gradient-to-t from-blue-600 to-blue-500 rounded shadow-[0_2px_4px_rgba(37,99,235,0.2)] animate-[barGrow_1.5s_ease-out] h-[40px]"></div>
                                    <div className="w-2 bg-gradient-to-t from-blue-600 to-blue-500 rounded shadow-[0_2px_4px_rgba(37,99,235,0.2)] animate-[barGrow_1.5s_ease-out] h-[45px]"></div>
                                    <div className="w-2 bg-gradient-to-t from-blue-600 to-blue-500 rounded shadow-[0_2px_4px_rgba(37,99,235,0.2)] animate-[barGrow_1.5s_ease-out] h-[90px]"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="features" className="py-20 bg-white relative before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:bottom-0 before:bg-gradient-to-r before:from-blue-600/2 before:via-transparent before:to-blue-400/2 before:pointer-events-none" ref={sections.features}>
                <div className="max-w-[1200px] mx-auto px-5">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 bg-blue-600/10 border border-blue-600/20 rounded-full px-4 py-2 mb-4 text-sm font-medium text-blue-600 scroll-animate">
                            <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
                            <span>Features</span>
                        </div>
                        <h2 className="text-4xl font-bold text-black text-center mb-4 scroll-animate">Platform Features</h2>
                        <p className="text-xl text-gray-600 text-center mb-12 max-w-[600px] mx-auto scroll-animate">An integrated, role-based portal designed to simplify every step of the internship journey for students and campus staff.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-12">
                        <div className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl border border-gray-200 transition-all duration-300 text-center relative overflow-hidden before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-[3px] before:bg-gradient-to-r before:from-blue-600 before:to-blue-500 before:scale-x-0 before:transition-transform before:duration-300 hover:before:scale-x-100 hover:-translate-y-2 hover:shadow-xl hover:border-blue-600/30 scroll-animate">
                            <div className="w-15 h-15 bg-gradient-to-r from-blue-600 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white text-2xl transition-all duration-[400ms] hover:scale-110 hover:rotate-[5deg]"><FaUserPlus /></div>
                            <h3 className="text-xl font-semibold text-black mb-4">Student Registration</h3>
                            <p className="text-gray-600 leading-relaxed">Streamlined registration process for students with comprehensive profile creation.</p>
                            <div className="mt-6 pt-4 border-t border-gray-100">
                                <span className="inline-block bg-blue-600/10 text-blue-600 px-3 py-1 rounded-full text-xs font-medium font-mono">Registration</span>
                            </div>
                        </div>
                        <div className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl border border-gray-200 transition-all duration-300 text-center relative overflow-hidden before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-[3px] before:bg-gradient-to-r before:from-blue-600 before:to-blue-500 before:scale-x-0 before:transition-transform before:duration-300 hover:before:scale-x-100 hover:-translate-y-2 hover:shadow-xl hover:border-blue-600/30 scroll-animate">
                            <div className="w-15 h-15 bg-gradient-to-r from-blue-600 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white text-2xl transition-all duration-[400ms] hover:scale-110 hover:rotate-[5deg]"><FaBriefcase /></div>
                            <h3 className="text-xl font-semibold text-black mb-4">Job Postings</h3>
                            <p className="text-gray-600 leading-relaxed">Verified opportunities tagged by skills and department with real-time updates.</p>
                            <div className="mt-6 pt-4 border-t border-gray-100">
                                <span className="inline-block bg-blue-600/10 text-blue-600 px-3 py-1 rounded-full text-xs font-medium font-mono">Job Board</span>
                            </div>
                        </div>
                        <div className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl border border-gray-200 transition-all duration-300 text-center relative overflow-hidden before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-[3px] before:bg-gradient-to-r before:from-blue-600 before:to-blue-500 before:scale-x-0 before:transition-transform before:duration-300 hover:before:scale-x-100 hover:-translate-y-2 hover:shadow-xl hover:border-blue-600/30 scroll-animate">
                            <div className="w-15 h-15 bg-gradient-to-r from-blue-600 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white text-2xl transition-all duration-[400ms] hover:scale-110 hover:rotate-[5deg]"><FaCalendarCheck /></div>
                            <h3 className="text-xl font-semibold text-black mb-4">Interview Scheduling</h3>
                            <p className="text-gray-600 leading-relaxed">Automated interview scheduling with calendar integration and notifications.</p>
                            <div className="mt-6 pt-4 border-t border-gray-100">
                                <span className="inline-block bg-blue-600/10 text-blue-600 px-3 py-1 rounded-full text-xs font-medium font-mono">Scheduling</span>
                            </div>
                        </div>
                        <div className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl border border-gray-200 transition-all duration-300 text-center relative overflow-hidden before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-[3px] before:bg-gradient-to-r before:from-blue-600 before:to-blue-500 before:scale-x-0 before:transition-transform before:duration-300 hover:before:scale-x-100 hover:-translate-y-2 hover:shadow-xl hover:border-blue-600/30 scroll-animate">
                            <div className="w-15 h-15 bg-gradient-to-r from-blue-600 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white text-2xl transition-all duration-[400ms] hover:scale-110 hover:rotate-[5deg]"><FaChartBar /></div>
                            <h3 className="text-xl font-semibold text-black mb-4">Analytics Dashboard</h3>
                            <p className="text-gray-600 leading-relaxed">Comprehensive analytics and insights for placement tracking and performance.</p>
                            <div className="mt-6 pt-4 border-t border-gray-100">
                                <span className="inline-block bg-blue-600/10 text-blue-600 px-3 py-1 rounded-full text-xs font-medium font-mono">Analytics</span>
                            </div>
                        </div>
                        <div className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl border border-gray-200 transition-all duration-300 text-center relative overflow-hidden before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-[3px] before:bg-gradient-to-r before:from-blue-600 before:to-blue-500 before:scale-x-0 before:transition-transform before:duration-300 hover:before:scale-x-100 hover:-translate-y-2 hover:shadow-xl hover:border-blue-600/30 scroll-animate">
                            <div className="w-15 h-15 bg-gradient-to-r from-blue-600 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white text-2xl transition-all duration-[400ms] hover:scale-110 hover:rotate-[5deg]"><FaFileAlt /></div>
                            <h3 className="text-xl font-semibold text-black mb-4">Resume Builder</h3>
                            <p className="text-gray-600 leading-relaxed">AI-powered resume builder with templates and optimization suggestions.</p>
                            <div className="mt-6 pt-4 border-t border-gray-100">
                                <span className="inline-block bg-blue-600/10 text-blue-600 px-3 py-1 rounded-full text-xs font-medium font-mono">Resume Tools</span>
                            </div>
                        </div>
                        <div className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl border border-gray-200 transition-all duration-300 text-center relative overflow-hidden before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-[3px] before:bg-gradient-to-r before:from-blue-600 before:to-blue-500 before:scale-x-0 before:transition-transform before:duration-300 hover:before:scale-x-100 hover:-translate-y-2 hover:shadow-xl hover:border-blue-600/30 scroll-animate">
                            <div className="w-15 h-15 bg-gradient-to-r from-blue-600 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white text-2xl transition-all duration-[400ms] hover:scale-110 hover:rotate-[5deg]"><FaUsers /></div>
                            <h3 className="text-xl font-semibold text-black mb-4">Company Portal</h3>
                            <p className="text-gray-600 leading-relaxed">Dedicated portal for companies to manage postings and candidate interactions.</p>
                            <div className="mt-6 pt-4 border-t border-gray-100">
                                <span className="inline-block bg-blue-600/10 text-blue-600 px-3 py-1 rounded-full text-xs font-medium font-mono">Company Hub</span>
                            </div>
                        </div>
                        <div className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl border border-gray-200 transition-all duration-300 text-center relative overflow-hidden before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-[3px] before:bg-gradient-to-r before:from-blue-600 before:to-blue-500 before:scale-x-0 before:transition-transform before:duration-300 hover:before:scale-x-100 hover:-translate-y-2 hover:shadow-xl hover:border-blue-600/30 scroll-animate">
                            <div className="w-15 h-15 bg-gradient-to-r from-blue-600 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white text-2xl transition-all duration-[400ms] hover:scale-110 hover:rotate-[5deg]"><FaGraduationCap /></div>
                            <h3 className="text-xl font-semibold text-black mb-4">Skill Assessment</h3>
                            <p className="text-gray-600 leading-relaxed">Comprehensive skill evaluation and certification system for students.</p>
                            <div className="mt-6 pt-4 border-t border-gray-100">
                                <span className="inline-block bg-blue-600/10 text-blue-600 px-3 py-1 rounded-full text-xs font-medium font-mono">Assessment</span>
                            </div>
                        </div>
                        <div className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl border border-gray-200 transition-all duration-300 text-center relative overflow-hidden before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-[3px] before:bg-gradient-to-r before:from-blue-600 before:to-blue-500 before:scale-x-0 before:transition-transform before:duration-300 hover:before:scale-x-100 hover:-translate-y-2 hover:shadow-xl hover:border-blue-600/30 scroll-animate">
                            <div className="w-15 h-15 bg-gradient-to-r from-blue-600 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white text-2xl transition-all duration-[400ms] hover:scale-110 hover:rotate-[5deg]"><FaBell /></div>
                            <h3 className="text-xl font-semibold text-black mb-4">Notifications</h3>
                            <p className="text-gray-600 leading-relaxed">Real-time notifications for applications, interviews, and important updates.</p>
                            <div className="mt-6 pt-4 border-t border-gray-100">
                                <span className="inline-block bg-blue-600/10 text-blue-600 px-3 py-1 rounded-full text-xs font-medium font-mono">Alerts</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="how-it-works" className="py-20 bg-gray-50" ref={sections['how-it-works']}>
                <div className="max-w-[1200px] mx-auto px-5">
                    <h2 className="text-4xl font-bold text-black text-center mb-4 scroll-animate">How It Works</h2>
                    <p className="text-xl text-gray-600 text-center mb-12 max-w-[600px] mx-auto scroll-animate">Four simple steps from profile to placement.</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mt-12">
                        <div className="flex flex-col md:flex-row lg:flex-col items-center md:items-start lg:items-center gap-6 md:gap-6 lg:gap-4 scroll-animate">
                            <div className="w-12 h-12 md:w-12 md:h-12 lg:w-12 lg:h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">1</div>
                            <div className="text-center md:text-left lg:text-center">
                                <h3 className="text-xl font-semibold text-black mb-2">Create Profile</h3>
                                <p className="text-gray-600 leading-relaxed">Build your digital profile with skills, resume, and achievements.</p>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row lg:flex-col items-center md:items-start lg:items-center gap-6 md:gap-6 lg:gap-4 scroll-animate">
                            <div className="w-12 h-12 md:w-12 md:h-12 lg:w-12 lg:h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">2</div>
                            <div className="text-center md:text-left lg:text-center">
                                <h3 className="text-xl font-semibold text-black mb-2">Apply Smart</h3>
                                <p className="text-gray-600 leading-relaxed">Get personalized job matches and apply with one click.</p>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row lg:flex-col items-center md:items-start lg:items-center gap-6 md:gap-6 lg:gap-4 scroll-animate">
                            <div className="w-12 h-12 md:w-12 md:h-12 lg:w-12 lg:h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">3</div>
                            <div className="text-center md:text-left lg:text-center">
                                <h3 className="text-xl font-semibold text-black mb-2">Track Progress</h3>
                                <p className="text-gray-600 leading-relaxed">Monitor applications and schedule interviews seamlessly.</p>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row lg:flex-col items-center md:items-start lg:items-center gap-6 md:gap-6 lg:gap-4 scroll-animate">
                            <div className="w-12 h-12 md:w-12 md:h-12 lg:w-12 lg:h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">4</div>
                            <div className="text-center md:text-left lg:text-center">
                                <h3 className="text-xl font-semibold text-black mb-2">Get Certified</h3>
                                <p className="text-gray-600 leading-relaxed">Complete internships and receive verified certificates automatically.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white text-center">
                <div className="max-w-[1200px] mx-auto px-5">
                    <div>
                        <h2 className="text-4xl font-bold mb-4">Transform Your Campus Placements</h2>
                        <p className="text-xl mb-8 opacity-90">Ready to move from manual chaos to a streamlined, software-driven process? Discover how our platform can help.</p>
                        <div className="flex gap-4 justify-center flex-wrap">
                            <a href="#home" onClick={(e) => handleNavClick(e, 'home')} className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-600 font-semibold text-base rounded-xl shadow-md hover:bg-gray-100 transition-all duration-300">Get Started</a>
                            <a href="https://github.com/your-repo" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-transparent border-2 border-white text-white font-semibold text-base rounded-xl hover:bg-white hover:text-blue-600 transition-all duration-300">View on GitHub</a>
                        </div>
                    </div>
                </div>
            </section>

            <footer id="contact" className="bg-black text-white py-15 pb-5" ref={sections.contact}>
                <div className="max-w-[1200px] mx-auto px-5">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-8">
                        <div className="flex flex-col items-center md:items-start">
                            <div className='flex items-center gap-3 mb-4'>
                                <SiNextra className='text-3xl text-blue-600' />
                                <h3 className="text-2xl font-bold m-0">Next<span className="text-blue-600">Step</span></h3>
                            </div>
                            <p className="text-gray-300 leading-relaxed text-center md:text-left">A Smart India Hackathon 2025 Project by Team Code Crafters.</p>
                        </div>
                        <div className="grid grid-cols-3 gap-8">
                            <div>
                                <h4 className="font-semibold mb-4 text-white">Platform</h4>
                                <ul className="list-none">
                                    <li className="mb-2"><a href="#features" onClick={(e) => handleNavClick(e, 'features')} className="text-gray-300 no-underline transition-all duration-300 hover:text-blue-600">Features</a></li>
                                    <li className="mb-2"><a href="#how-it-works" onClick={(e) => handleNavClick(e, 'how-it-works')} className="text-gray-300 no-underline transition-all duration-300 hover:text-blue-600">Process</a></li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold mb-4 text-white">Roles</h4>
                                <ul className="list-none">
                                    <li className="mb-2 text-gray-300">Student</li>
                                    <li className="mb-2 text-gray-300">Mentor</li>
                                    <li className="mb-2 text-gray-300">Placement Cell</li>
                                    <li className="mb-2 text-gray-300">Recruiter</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold mb-4 text-white">Resources</h4>
                                <ul className="list-none">
                                    <li className="mb-2"><a href="https://sih.gov.in" target="_blank" rel="noopener noreferrer" className="text-gray-300 no-underline transition-all duration-300 hover:text-blue-600">SIH Website</a></li>
                                    <li className="mb-2"><a href="https://github.com/tatwik-sai/NextStep" target="_blank" rel="noopener noreferrer" className="text-gray-300 no-underline transition-all duration-300 hover:text-blue-600">GitHub Repository</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 pt-8 text-center text-gray-300 flex flex-col gap-4">
                        <div>
                            <span>Contact <a href="mailto:contact@nextstep.edu" className="text-blue-600 no-underline transition-all duration-300 hover:text-blue-400 hover:underline">contact@nextstep.edu</a></span>
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
