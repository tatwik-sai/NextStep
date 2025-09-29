import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner"
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Next Step",
  description: "An Internship and Placement management portal.",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {children}
          <Toaster  position="top-right" visibleToasts={1}
          toastOptions={{
              style: {
                background: '#1F1F23',
                border: '1px solid #ffffff1a',
                borderRadius: '8px',
                padding: '16px',
                color: '#ffffff',
              },
          }}
          />
        </body>
      </html>
    </ClerkProvider>
  );
}
// "use client";
// import React, { useState, useEffect, useRef } from 'react';

// // Combined and converted JSX component
// const App = () => {
//   const [navMenuActive, setNavMenuActive] = useState(false);
//   const [scrolled, setScrolled] = useState(false);

//   // Refs for elements that need direct interaction
//   const sections = {
//     home: useRef(null),
//     features: useRef(null),
//     'how-it-works': useRef(null),
//     contact: useRef(null),
//   };


//   // Mobile navigation functionality
//   const toggleNavMenu = () => {
//     setNavMenuActive(!navMenuActive);
//   };
  
//   const closeNavMenu = () => {
//       setNavMenuActive(false);
//   }

//   // Smooth scrolling
//   const handleNavClick = (e, targetId) => {
//     e.preventDefault();
//     closeNavMenu();
//     if (sections[targetId] && sections[targetId].current) {
//         sections[targetId].current.scrollIntoView({ behavior: 'smooth', block: 'start' });
//     }
//   };

//   // Handle scroll effects
//   useEffect(() => {
//     let lastScrollY = window.scrollY;
//     let ticking = false;
    
//     const handleScroll = () => {
//       lastScrollY = window.scrollY;
      
//       if (!ticking) {
//         window.requestAnimationFrame(() => {
//           setScrolled(lastScrollY > 50);
//           ticking = false;
//         });
        
//         ticking = true;
//       }
//     };

//     // Add scroll event listener
//     window.addEventListener('scroll', handleScroll, { passive: true });
    
//     // Cleanup
//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, []);
  
//   // Close mobile menu when resizing to desktop
//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth >= 1024) {
//         setNavMenuActive(false);
//         document.body.style.overflow = '';
//       }
//     };
    
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);


  
//   // Scroll animations
//   useEffect(() => {
//     const observer = new IntersectionObserver(
//         (entries) => {
//             entries.forEach((entry) => {
//                 if (entry.isIntersecting) {
//                     entry.target.classList.add('animate');
//                     observer.unobserve(entry.target);
//                 }
//             });
//         },
//         { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
//     );

//     const elements = document.querySelectorAll('.scroll-animate');
//     elements.forEach((el) => observer.observe(el));

//     return () => elements.forEach((el) => observer.unobserve(el));
//   }, []);


//   // Toggle mobile menu
//   const toggleMobileMenu = () => {
//     setNavMenuActive(!navMenuActive);
//     document.body.style.overflow = !navMenuActive ? 'hidden' : '';
//   };

//   // Close mobile menu when clicking on a link
//   const closeMobileMenu = () => {
//     setNavMenuActive(false);
//     document.body.style.overflow = '';
//   };

//   return (
//     <>
//       {/* Navigation */}
//       <header className={`navbar ${scrolled ? 'scrolled' : ''} ${navMenuActive ? 'menu-open' : ''}`}>
//         <div className="nav-container">
//           <a href="#" className="nav-logo" onClick={(e) => {
//             e.preventDefault();
//             handleNavClick(e, 'home');
//           }}>
//             <div className="logo">
//               <div className="logo-icon">
//                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                   <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
//                   <polyline points="9 22 9 12 15 12 15 22"></polyline>
//                 </svg>
//               </div>
//             </div>
//             <h2>Your<span className="highlight">Brand</span></h2>
//           </a>
          
//           <nav className="nav-menu">
//             <a href="#" onClick={(e) => handleNavClick(e, 'home')} className={window.location.hash === '#home' ? 'active' : ''}>
//               Home
//             </a>
//             <a href="#features" onClick={(e) => handleNavClick(e, 'features')} className={window.location.hash === '#features' ? 'active' : ''}>
//               Features
//             </a>
//             <a href="#how-it-works" onClick={(e) => handleNavClick(e, 'how-it-works')} className={window.location.hash === '#how-it-works' ? 'active' : ''}>
//               How It Works
//             </a>
//             <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')} className={window.location.hash === '#contact' ? 'active' : ''}>
//               Contact
//             </a>
//           </nav>
          
//           <div className="nav-buttons" style={{ display: 'flex', gap: '12px' }}>
//             <a href="#" className="btn btn-outline" onClick={(e) => handleNavClick(e, 'login')}>
//               Log In
//             </a>
//             <a href="#" className="btn btn-primary" onClick={(e) => handleNavClick(e, 'signup')}>
//               Sign Up
//             </a>
//             <a 
//               href="#" 
//               className="btn btn-primary" 
//               onClick={(e) => handleNavClick(e, 'register')}
//               style={{ 
//                 background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
//                 boxShadow: '0 4px 15px rgba(37, 99, 235, 0.4)',
//                 color: 'white',
//                 padding: '0.5rem 1.25rem',
//                 borderRadius: '0.5rem',
//                 textDecoration: 'none',
//                 display: 'inline-flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 fontWeight: 600,
//                 lineHeight: '1.5',
//                 cursor: 'pointer',
//                 border: 'none',
//                 outline: 'none',
//                 position: 'relative',
//                 overflow: 'hidden',
//                 zIndex: '1',
//                 opacity: '1',
//                 transform: 'scale(1)',
//                 transition: 'none'
//               }}
//             >
//               Register
//             </a>
//           </div>
          
//           <button 
//             className="mobile-menu-btn" 
//             onClick={toggleMobileMenu}
//             aria-label={navMenuActive ? 'Close menu' : 'Open menu'}
//           >
//             {navMenuActive ? (
//               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                 <line x1="18" y1="6" x2="6" y2="18"></line>
//                 <line x1="6" y1="6" x2="18" y2="18"></line>
//               </svg>
//             ) : (
//               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                 <line x1="3" y1="12" x2="21" y2="12"></line>
//                 <line x1="3" y1="6" x2="21" y2="6"></line>
//                 <line x1="3" y1="18" x2="21" y2="18"></line>
//               </svg>
//             )}
//           </button>
//         </div>
//       </header>
      
//       {/* Mobile Menu */}
//       <div className={`mobile-menu ${navMenuActive ? 'active' : ''}`}>
//         <nav>
//           <a 
//             href="#" 
//             onClick={(e) => {
//               handleNavClick(e, 'home');
//               closeMobileMenu();
//             }}
//             className={window.location.hash === '#home' ? 'active' : ''}
//           >
//             Home
//           </a>
//           <a 
//             href="#features" 
//             onClick={(e) => {
//               handleNavClick(e, 'features');
//               closeMobileMenu();
//             }}
//             className={window.location.hash === '#features' ? 'active' : ''}
//           >
//             Features
//           </a>
//           <a 
//             href="#how-it-works" 
//             onClick={(e) => {
//               handleNavClick(e, 'how-it-works');
//               closeMobileMenu();
//             }}
//             className={window.location.hash === '#how-it-works' ? 'active' : ''}
//           >
//             How It Works
//           </a>
//           <a 
//             href="#contact" 
//             onClick={(e) => {
//               handleNavClick(e, 'contact');
//               closeMobileMenu();
//             }}
//             className={window.location.hash === '#contact' ? 'active' : ''}
//           >
//             Contact
//           </a>
          
//           <div className="mobile-menu-buttons">
//             <a 
//               href="#" 
//               className="btn btn-outline" 
//               onClick={(e) => {
//                 handleNavClick(e, 'login');
//                 closeMobileMenu();
//               }}
//             >
//               Log In
//             </a>
//             <a 
//               href="#" 
//               className="btn btn-primary" 
//               onClick={(e) => {
//                 handleNavClick(e, 'signup');
//                 closeMobileMenu();
//               }}
//             >
//               Sign Up
//             </a>
//             <a 
//               href="#" 
//               className="btn btn-primary btn-glow" 
//               onClick={(e) => {
//                 handleNavClick(e, 'register');
//                 closeMobileMenu();
//               }}
//               style={{ 
//                 background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
//                 boxShadow: '0 4px 15px rgba(37, 99, 235, 0.4)'
//               }}
//             >
//               Register
//             </a>
//           </div>
//         </nav>
//       </div>
      
//       {/* Backdrop */}
//       <div 
//         className={`backdrop ${navMenuActive ? 'active' : ''}`} 
//         onClick={closeMobileMenu}
//       />
      
//       <style jsx global>{`
//         /* Reset and Base Styles */
//         * {
//             padding: 0;
//             box-sizing: border-box;
//         }

//         :root {
//             /* Color Palette */
//             --primary-blue: #2563eb;
//             --light-blue: #3b82f6;
//             --accent-blue: #1d4ed8;
//             --dark-blue: #1e40af;
//             --white: #ffffff;
//             --off-white: #f8fafc;
//             --gray-50: #f8fafc;
//             --gray-100: #f1f5f9;
//             --gray-200: #e2e8f0;
//             --gray-300: #cbd5e1;
//             --gray-400: #94a3b8;
//             --gray-500: #64748b;
//             --gray-600: #475569;
//             --gray-700: #334155;
//             --gray-800: #1e293b;
//             --gray-900: #0f172a;
//             --black: #020617;
            
//             /* Success/Error States */
//             --success: #10b981;
//             --error: #ef4444;
//             --warning: #f59e0b;
            
//             /* Typography */
//             --font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
//             --font-mono: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
//             --text-xs: 0.75rem;
//             --text-sm: 0.875rem;
//             --text-base: 1rem;
//             --text-lg: 1.125rem;
//             --text-xl: 1.25rem;
//             --text-2xl: 1.5rem;
//             --text-3xl: 1.875rem;
//             --text-4xl: 2.25rem;
//             --text-5xl: 3rem;
//             --text-6xl: 3.75rem;
            
//             /* Spacing */
//             --space-1: 0.25rem;
//             --space-2: 0.5rem;
//             --space-3: 0.75rem;
//             --space-4: 1rem;
//             --space-5: 1.25rem;
//             --space-6: 1.5rem;
//             --space-8: 2rem;
//             --space-10: 2.5rem;
//             --space-12: 3rem;
//             --space-16: 4rem;
//             --space-20: 5rem;
//             --space-24: 6rem;
//             --space-32: 8rem;
//             --space-40: 10rem;
//             --space-48: 12rem;
//             --space-56: 14rem;
//             --space-64: 16rem;
            
//             /* Border Radius */
//             --radius-sm: 0.125rem;
//             --radius: 0.25rem;
//             --radius-md: 0.375rem;
//             --radius-lg: 0.5rem;
//             --radius-xl: 0.75rem;
//             --radius-2xl: 1rem;
//             --radius-3xl: 1.5rem;
//             --radius-full: 9999px;
            
//             /* Shadows */
//             --shadow-xs: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
//             --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
//             --shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
//             --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
//             --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
//             --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
//             --shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
//             --shadow-inner: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06);
//             --shadow-outline: 0 0 0 3px rgba(66, 153, 225, 0.5);
//             --shadow-glow: 0 0 15px rgba(59, 130, 246, 0.4);
            
//             /* Gradients */
//             --gradient-primary: linear-gradient(135deg, var(--primary-blue), var(--light-blue));
//             --gradient-accent: linear-gradient(135deg, var(--accent-blue), var(--primary-blue));
//             --gradient-subtle: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(37, 99, 235, 0.1));
            
//             /* Transitions */
//             --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
//             --transition-slow: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
//             --transition-fast: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
            
//             /* Z-index */
//             --z-0: 0;
//             --z-10: 10;
//             --z-20: 20;
//             --z-30: 30;
//             --z-40: 40;
//             --z-50: 50;
//             --z-auto: auto;
            
//             /* Layout */
//             --max-w-screen-sm: 640px;
//             --max-w-screen-md: 768px;
//             --max-w-screen-lg: 1024px;
//             --max-w-screen-xl: 1280px;
//             --max-w-screen-2xl: 1536px;
            
//             /* Misc */
//             --backdrop-blur: blur(12px);
//             --backdrop-saturate: saturate(180%);
//             --backdrop-brightness: 1;
//             --backdrop-contrast: 1;
//             --backdrop-grayscale: 0;
//             --backdrop-hue-rotate: 0;
//             --backdrop-invert: 0;
//             --backdrop-opacity: 1;
//             --backdrop-sepia: 0;
//         }

//         /* Base Styles */
//         *, *::before, *::after {
//             box-sizing: border-box;
//             margin: 0;
//             padding: 0;
//         }

//         html {
//             -webkit-font-smoothing: antialiased;
//             -moz-osx-font-smoothing: grayscale;
//             text-rendering: optimizeLegibility;
//             scroll-behavior: smooth;
//             height: 100%;
//         }

//         body {
//             font-family: var(--font-family);
//             line-height: 1.6;
//             color: var(--gray-800);
//             background-color: var(--white);
//             overflow-x: hidden;
//             transition: var(--transition);
//             min-height: 100%;
//             display: flex;
//             flex-direction: column;
//         }

//         /* Container */
//         .container {
//             width: 100%;
//             max-width: var(--max-w-screen-xl);
//             margin: 0 auto;
//             padding: 0 var(--space-6);
//         }
        
//         @media (min-width: 640px) {
//             .container {
//                 padding: 0 var(--space-8);
//             }
//         }
        
//         @media (min-width: 1024px) {
//             .container {
//                 padding: 0 var(--space-12);
//             }
//         }

        
//         /* Navigation */
//         .navbar {
//             position: fixed;
//             top: 0;
//             left: 0;
//             right: 0;
//             width: 100%;
//             background: rgba(255, 255, 255, 0.95);
//             backdrop-filter: var(--backdrop-blur);
//             -webkit-backdrop-filter: var(--backdrop-blur);
//             border-bottom: 1px solid var(--gray-100);
//             z-index: var(--z-50);
//             transition: var(--transition);
//             will-change: transform, background, box-shadow;
//         }

//         .navbar.scrolled {
//             background: rgba(255, 255, 255, 0.98);
//             box-shadow: var(--shadow-sm);
//             transform: translateY(0);
//         }
        
//         .navbar.hidden {
//             transform: translateY(-100%);
//         }

//         .nav-container {
//             display: flex;
//             justify-content: space-between;
//             align-items: center;
//             height: 5rem;
//             position: relative;
//             width: 100%;
//             margin: 0 auto;
//             padding: 0 var(--space-6);
//         }
        
//         @media (min-width: 1024px) {
//             .nav-container {
//                 padding: 0 var(--space-8);
//             }
//         }
        
//         /* Logo */
//         .nav-logo {
//             display: flex;
//             align-items: center;
//             gap: var(--space-3);
//             min-width: 0;
//             flex-shrink: 0;
//             text-decoration: none;
//             transition: var(--transition);
//         }
        
//         .nav-logo:hover {
//             opacity: 0.9;
//         }
        
//         .logo {
//             display: flex;
//             align-items: center;
//             height: 2.5rem;
//             width: auto;
//         }
        
//         .logo-icon {
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             transition: var(--transition);
//             height: 2.5rem;
//             width: 2.5rem;
//             border-radius: var(--radius-lg);
//             background: var(--gradient-primary);
//             color: white;
//             font-size: 1.25rem;
//             font-weight: 700;
//         }

//         .logo-icon:hover {
//             transform: translateY(-2px);
//             box-shadow: var(--shadow-md);
//         }

//         .nav-logo h2 {
//             color: var(--gray-900);
//             font-weight: 700;
//             font-size: 1.5rem;
//             line-height: 1.2;
//             margin: 0;
//             white-space: nowrap;
//             min-width: 0;
//             letter-spacing: -0.025em;
//         }

//         .nav-logo .highlight {
//             background: var(--gradient-primary);
//             -webkit-background-clip: text;
//             background-clip: text;
//             -webkit-text-fill-color: transparent;
//             position: relative;
//             display: inline-block;
//         }

//         /* Navigation Menu */
//         .nav-menu {
//             display: none;
//             list-style: none;
//             align-items: center;
//             gap: var(--space-8);
//             margin: 0;
//             padding: 0;
//         }
        
//         @media (min-width: 1024px) {
//             .nav-menu {
//                 display: flex;
//             }
//         }

//         .nav-menu a {
//             text-decoration: none;
//             color: var(--gray-600);
//             font-weight: 500;
//             font-size: var(--text-sm);
//             letter-spacing: 0.01em;
//             transition: var(--transition);
//             position: relative;
//             padding: var(--space-2) 0;
//             white-space: nowrap;
//         }
        
//         .nav-menu a::after {
//             content: '';
//             position: absolute;
//             bottom: 0;
//             left: 0;
//             width: 0;
//             height: 2px;
//             background: var(--gradient-primary);
//             transition: var(--transition);
//             border-radius: var(--radius-full);
//         }
        
//         .nav-menu a:hover,
//         .nav-menu a:focus,
//         .nav-menu a.active {
//             color: var(--primary-blue);
//         }
        
//         .nav-menu a:hover::after,
//         .nav-menu a:focus::after,
//         .nav-menu a.active::after {
//             width: 100%;
//         }

//         .nav-menu a:hover {
//             color: var(--primary-blue);
//         }

//         /* Navigation Buttons */
//         .nav-buttons {
//             display: flex;
//             align-items: center;
//             gap: var(--space-4);
//         }
        
//         .btn {
//             display: inline-flex;
//             align-items: center;
//             justify-content: center;
//             padding: 0.5rem 1.25rem;
//             border-radius: var(--radius-md);
//             font-weight: 500;
//             font-size: var(--text-sm);
//             line-height: 1.5;
//             transition: var(--transition);
//             cursor: pointer;
//             text-decoration: none;
//             border: 1px solid transparent;
//         }
        
//         .btn-primary {
//             background: var(--gradient-primary);
//             color: white;
//             box-shadow: var(--shadow-sm);
//         }
        
//         .btn-primary:hover {
//             transform: translateY(-1px);
//             box-shadow: var(--shadow-md);
//         }
        
//         .btn-outline {
//             background: transparent;
//             border: 1px solid var(--gray-300);
//             color: var(--gray-700);
//         }
        
//         .btn-outline:hover {
//             background: var(--gray-50);
//             border-color: var(--gray-400);
//         }
        
//         /* Mobile Menu Button */
//         .mobile-menu-btn {
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             width: 2.5rem;
//             height: 2.5rem;
//             border-radius: var(--radius-md);
//             background: transparent;
//             border: 1px solid var(--gray-200);
//             color: var(--gray-600);
//             cursor: pointer;
//             transition: var(--transition);
//             z-index: var(--z-50);
//         }
        
//         .mobile-menu-btn:hover {
//             background: var(--gray-50);
//             border-color: var(--gray-300);
//         }
        
//         @media (min-width: 1024px) {
//             .mobile-menu-btn {
//                 display: none;
//             }
//         }
        
//         /* Mobile Menu */
//         .mobile-menu {
//             position: fixed;
//             top: 0;
//             right: 0;
//             bottom: 0;
//             width: 80%;
//             max-width: 24rem;
//             background: var(--white);
//             box-shadow: -4px 0 20px rgba(0, 0, 0, 0.1);
//             z-index: var(--z-40);
//             transform: translateX(100%);
//             transition: transform 0.3s ease-in-out;
//             padding: 5rem 1.5rem 2rem;
//             display: flex;
//             flex-direction: column;
//             gap: 1.5rem;
//             overflow-y: auto;
//         }
        
//         .mobile-menu.active {
//             transform: translateX(0);
//         }
        
//         .mobile-menu a {
//             display: block;
//             padding: 0.75rem 0;
//             color: var(--gray-700);
//             text-decoration: none;
//             font-weight: 500;
//             border-bottom: 1px solid var(--gray-100);
//             transition: var(--transition);
//         }
        
//         .mobile-menu a:hover,
//         .mobile-menu a:focus {
//             color: var(--primary-blue);
//             padding-left: 0.5rem;
//         }
        
//         .mobile-menu-buttons {
//             display: flex;
//             flex-direction: column;
//             gap: 0.75rem;
//             margin-top: 1rem;
//         }
        
//         .mobile-menu-buttons .btn {
//             width: 100%;
//             justify-content: center;
//         }
        
//         /* Backdrop */
//         .backdrop {
//             position: fixed;
//             top: 0;
//             left: 0;
//             right: 0;
//             bottom: 0;
//             background: rgba(0, 0, 0, 0.5);
//             z-index: var(--z-30);
//             opacity: 0;
//             visibility: hidden;
//             transition: var(--transition);
//             backdrop-filter: blur(4px);
//         }
        
//         .backdrop.active {
//             opacity: 1;
//             visibility: visible;
//         }
//             left: 0;
//             width: 0;
//             height: 2px;
//             background: var(--primary-blue);
//             transition: var(--transition);
//         }

//         .nav-menu a:hover::after {
//             width: 100%;
//         }

//         .hamburger {
//             display: none;
//             flex-direction: column;
//             cursor: pointer;
//         }

//         .hamburger span {
//             width: 25px;
//             height: 3px;
//             background: var(--black);
//             margin: 3px 0;
//             transition: var(--transition);
//         }
        
//         /* Hero Section */
//         .hero {
//             padding: 120px 0 80px;
//             background: 
//                 radial-gradient(ellipse at center, #ffffff 0%, #f8fafc 30%, #f1f5f9 70%, #e2e8f0 100%),
//                 radial-gradient(ellipse at top, rgba(37, 99, 235, 0.03) 0%, transparent 50%),
//                 radial-gradient(ellipse at bottom, rgba(59, 130, 246, 0.02) 0%, transparent 50%);
//             background-attachment: fixed;
//             min-height: 100vh;
//             display: flex;
//             align-items: center;
//             position: relative;
//             overflow: hidden;
//         }
        
//         .hero::before {
//             content: '';
//             position: absolute;
//             top: -10%; left: -10%; right: -10%; bottom: -10%;
//             background: 
//                 radial-gradient(ellipse 800px 400px at 20% 30%, rgba(147, 197, 253, 0.08) 0%, transparent 50%),
//                 radial-gradient(ellipse 600px 300px at 80% 70%, rgba(191, 219, 254, 0.06) 0%, transparent 50%),
//                 radial-gradient(ellipse 400px 200px at 60% 20%, rgba(219, 234, 254, 0.05) 0%, transparent 50%),
//                 radial-gradient(ellipse 500px 250px at 30% 80%, rgba(239, 246, 255, 0.04) 0%, transparent 50%);
//             pointer-events: none;
//             animation: plasmaWaves 18s ease-in-out infinite;
//             filter: blur(2px);
//             z-index: -1;
//         }

//         .hero::after {
//             content: '';
//             position: absolute;
//             top: -30%; left: -30%;
//             width: 160%; height: 160%;
//             background: conic-gradient(from 0deg at 50% 50%, 
//                 rgba(219, 234, 254, 0.06) 0deg, 
//                 rgba(191, 219, 254, 0.08) 60deg,
//                 rgba(147, 197, 253, 0.05) 120deg,
//                 rgba(239, 246, 255, 0.07) 180deg,
//                 rgba(191, 219, 254, 0.04) 240deg,
//                 rgba(147, 197, 253, 0.06) 300deg,
//                 rgba(219, 234, 254, 0.06) 360deg
//             );
//             animation: plasmaRotate 25s linear infinite;
//             pointer-events: none;
//             border-radius: 50%;
//             filter: blur(80px);
//             opacity: 0.6;
//             z-index: -1;
//         }

//         @keyframes plasmaWaves {
//             0%, 100% { transform: translate(0, 0) scale(1) rotate(0deg); opacity: 1; }
//             25% { transform: translate(20px, -15px) scale(1.05) rotate(1deg); opacity: 0.8; }
//             50% { transform: translate(-15px, 10px) scale(0.95) rotate(-1deg); opacity: 1; }
//             75% { transform: translate(10px, -20px) scale(1.02) rotate(0.5deg); opacity: 0.9; }
//         }

//         @keyframes plasmaRotate {
//             0% { transform: rotate(0deg) scale(1); }
//             33% { transform: rotate(120deg) scale(1.1); }
//             66% { transform: rotate(240deg) scale(0.9); }
//             100% { transform: rotate(360deg) scale(1); }
//         }

//         .hero-container {
//             max-width: 1200px;
//             margin: 0 auto;
//             padding: 0 20px;
//             display: grid;
//             grid-template-columns: 1fr 1fr;
//             gap: clamp(2rem, 5vw, 4rem);
//             align-items: center;
//             position: relative;
//             z-index: 1;
//         }
        
//         .hero-badge {
//             display: inline-flex;
//             align-items: center;
//             gap: 0.5rem;
//             background: rgba(37, 99, 235, 0.1);
//             border: 1px solid rgba(37, 99, 235, 0.2);
//             border-radius: 50px;
//             padding: 0.5rem 1rem;
//             margin-bottom: 1.5rem;
//             font-size: 0.875rem;
//             font-weight: 500;
//             color: var(--primary-blue);
//             backdrop-filter: var(--backdrop-blur);
//         }

//         .badge-icon {
//             font-size: 1rem;
//         }

//         .hero-title {
//             font-size: clamp(2rem, 5vw, 3.5rem);
//             font-weight: 800;
//             color: var(--gray-900);
//             line-height: 1.1;
//             margin-bottom: 1.5rem;
//             letter-spacing: -0.02em;
//             text-shadow: 0 1px 3px rgba(0,0,0,0.1);
//         }

//         .hero-title .highlight {
//             color: var(--primary-blue);
//         }

//         .gradient-text {
//             background: linear-gradient(135deg, #2563eb 0%, #3b82f6 30%, #60a5fa 60%, #93c5fd 100%);
//             -webkit-background-clip: text;
//             -webkit-text-fill-color: transparent;
//             background-clip: text;
//             text-shadow: none;
//         }

//         .hero-description {
//             font-size: 1.25rem;
//             color: var(--gray-600);
//             margin-bottom: 2rem;
//             line-height: 1.6;
//             text-shadow: none;
//         }

//         .hero-buttons {
//             display: flex;
//             gap: 1rem;
//             flex-wrap: wrap;
//         }
        
//         .btn {
//             padding: 12px 24px;
//             border-radius: 12px;
//             font-weight: 600;
//             font-size: 1rem;
//             cursor: pointer;
//             transition: var(--transition-bounce);
//             border: none;
//             display: inline-flex;
//             align-items: center;
//             gap: 8px;
//             text-decoration: none;
//             position: relative;
//             overflow: hidden;
//         }
        
//         .btn:before {
//             content: '';
//             position: absolute;
//             top: 0;
//             left: -100%;
//             width: 100%;
//             height: 100%;
//             background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
//             transition: left 0.5s;
//         }

//         .btn:hover:before {
//             left: 100%;
//         }

//         .btn i {
//             transition: transform 0.3s ease;
//         }

//         .btn:hover i {
//             transform: translateX(4px);
//         }

//         .btn-primary {
//             background: var(--gradient-primary);
//             color: var(--white);
//             box-shadow: var(--shadow-md);
//         }

//         .btn-primary:hover {
//             transform: translateY(-3px);
//             box-shadow: var(--shadow-xl), var(--shadow-glow);
//         }

//         .btn-glow {
//             box-shadow: 0 4px 15px rgba(37, 99, 235, 0.4);
//         }
        
//         .btn-glow:hover {
//             box-shadow: 0 8px 25px rgba(37, 99, 235, 0.6);
//         }
        
//         .btn-secondary {
//             background: rgba(255, 255, 255, 0.1);
//             color: var(--gray-600);
//             border: 2px solid rgba(255, 255, 255, 0.2);
//             backdrop-filter: var(--backdrop-blur);
//         }

//         .btn-secondary:hover {
//             background: rgba(255, 255, 255, 0.2);
//             border-color: var(--primary-blue);
//             color: var(--primary-blue);
//             transform: translateY(-2px);
//         }

//         .btn-glass {
//             backdrop-filter: var(--backdrop-blur);
//             border: 1px solid rgba(255, 255, 255, 0.3);
//         }

//         .btn-outline {
//             background: transparent;
//             color: var(--primary-blue);
//             border: 2px solid var(--primary-blue);
//         }
        
//         .btn-outline:hover {
//             background: var(--primary-blue);
//             color: var(--white);
//         }
        
//         /* Hero Visual */
//         .hero-visual {
//             display: flex;
//             justify-content: center;
//             align-items: center;
//             position: relative;
//         }

//         .hero-card-stack {
//             position: relative;
//             width: 100%;
//             max-width: 400px;
//         }

//         .hero-card {
//             background: rgba(255, 255, 255, 0.98);
//             backdrop-filter: var(--backdrop-blur);
//             border: 1px solid rgba(226, 232, 240, 0.4);
//             border-radius: 20px;
//             padding: 2rem;
//             margin-bottom: 1.5rem;
//             box-shadow: 
//                 0 8px 32px rgba(0, 0, 0, 0.08),
//                 0 4px 16px rgba(0, 0, 0, 0.04),
//                 0 0 0 1px rgba(255,255,255,0.9),
//                 inset 0 1px 0 rgba(255,255,255,0.95);
//             transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
//             position: relative;
//             z-index: 2;
//             overflow: hidden;
//         }

//         .hero-card::before {
//             content: '';
//             position: absolute;
//             top: 0;
//             left: 0;
//             right: 0;
//             height: 3px;
//             background: var(--gradient-primary);
//             border-radius: 20px 20px 0 0;
//         }

//         .hero-card:hover {
//             transform: translateY(-8px) scale(1.02);
//             box-shadow: 
//                 0 20px 40px rgba(0, 0, 0, 0.12),
//                 0 8px 24px rgba(0, 0, 0, 0.08),
//                 0 0 0 1px rgba(37, 99, 235, 0.1);
//         }

//         .card-1 { animation: float 6s ease-in-out infinite; }
//         .card-2 { animation: float 6s ease-in-out infinite 2s; transform: translateX(20px); }
//         .card-3 { animation: float 6s ease-in-out infinite 4s; transform: translateX(-20px); }

//         .card-header {
//             display: flex;
//             align-items: center;
//             gap: 0.75rem;
//             margin-bottom: 1rem;
//         }

//         .card-icon {
//             width: 40px;
//             height: 40px;
//             background: var(--gradient-primary);
//             border-radius: 12px;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             color: var(--white);
//             font-size: 1rem;
//             box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
//             transition: all 0.3s ease;
//         }

//         .hero-card:hover .card-icon {
//             transform: scale(1.1) rotate(5deg);
//             box-shadow: 0 6px 16px rgba(37, 99, 235, 0.4);
//         }

//         .card-title {
//             font-weight: 700;
//             color: var(--gray-900);
//             font-size: 1rem;
//             letter-spacing: -0.01em;
//         }

//         .progress-bar {
//             width: 100%;
//             height: 6px;
//             background: var(--gray-200);
//             border-radius: 3px;
//             overflow: hidden;
//             margin-bottom: 0.5rem;
//         }

//         .progress-fill {
//             height: 100%;
//             background: var(--gradient-primary);
//             border-radius: 3px;
//             animation: progressFill 2s ease-out;
//         }
        
//         .progress-text {
//             font-size: 0.75rem;
//             color: var(--gray-600);
//         }
        
//         .match-items {
//             display: flex;
//             flex-direction: column;
//             gap: 0.5rem;
//         }
        
//         .match-item {
//             padding: 0.5rem 0.75rem;
//             background: var(--gray-100);
//             border-radius: 8px;
//             font-size: 0.75rem;
//             color: var(--gray-600);
//             transition: var(--transition);
//         }
        
//         .match-item.active {
//             background: var(--gradient-primary);
//             color: var(--white);
//         }
        
//         .chart-bars {
//             display: flex;
//             align-items: flex-end;
//             gap: 0.5rem;
//             height: 40px;
//         }
        
//         .bar {
//             flex: 1;
//             background: var(--gradient-primary);
//             border-radius: 2px;
//             animation: barGrow 1.5s ease-out;
//         }
        
//         @keyframes progressFill {
//             from { width: 0; }
//             to { width: 85%; }
//         }
//         @keyframes barGrow {
//             from { height: 0; }
//         }
//         @keyframes cardFloat {
//             0%, 100% { transform: translateY(0px); }
//             50% { transform: translateY(-10px); }
//         }
//         @keyframes float {
//             0%, 100% { transform: translateY(0px); }
//             50% { transform: translateY(-20px); }
//         }
//         @keyframes pulse {
//             0%, 100% { opacity: 1; }
//             50% { opacity: 0.5; }
//         }
        
//         /* Section Headers */
//         .section-header {
//             text-align: center;
//             margin-bottom: 4rem;
//         }
        
//         .section-badge {
//             display: inline-flex;
//             align-items: center;
//             gap: 0.5rem;
//             background: rgba(37, 99, 235, 0.1);
//             border: 1px solid rgba(37, 99, 235, 0.2);
//             border-radius: 50px;
//             padding: 0.5rem 1rem;
//             margin-bottom: 1rem;
//             font-size: 0.875rem;
//             font-weight: 500;
//             color: var(--primary-blue);
//         }
        
//         .badge-dot {
//             width: 8px;
//             height: 8px;
//             background: var(--primary-blue);
//             border-radius: 50%;
//             animation: pulse 2s ease-in-out infinite;
//         }
        
//         /* Features Section */
//         .features {
//             padding: 80px 0;
//             background: var(--white);
//             position: relative;
//         }

//         .features::before {
//             content: '';
//             position: absolute;
//             top: 0; left: 0; right: 0; bottom: 0;
//             background:
//                 radial-gradient(circle at 10% 20%, rgba(37, 99, 235, 0.02) 0, transparent 50%),
//                 radial-gradient(circle at 90% 80%, rgba(96, 165, 250, 0.02) 0, transparent 50%);
//             pointer-events: none;
//         }
        
//         .section-title {
//             font-size: 2.5rem;
//             font-weight: 700;
//             color: var(--black);
//             text-align: center;
//             margin-bottom: 1rem;
//         }
        
//         .section-subtitle {
//             font-size: 1.25rem;
//             color: var(--gray-600);
//             text-align: center;
//             margin-bottom: 3rem;
//             max-width: 600px;
//             margin-left: auto;
//             margin-right: auto;
//         }

//         .features-grid {
//             display: grid;
//             grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
//             gap: 2rem;
//             margin-top: 3rem;
//         }
        
//         .feature-card {
//             background: var(--white);
//             padding: 2rem;
//             border-radius: 16px;
//             border: 1px solid var(--gray-200);
//             transition: var(--transition);
//             text-align: center;
//             position: relative;
//             overflow: hidden;
//         }
        
//         .feature-card:before {
//             content: '';
//             position: absolute;
//             top: 0;
//             left: 0;
//             right: 0;
//             height: 3px;
//             background: var(--gradient-primary);
//             transform: scaleX(0);
//             transition: transform 0.3s ease;
//         }
        
//         .feature-card:hover:before {
//             transform: scaleX(1);
//         }

//         .feature-card:hover {
//             transform: translateY(-8px);
//             box-shadow: var(--shadow-xl);
//             border-color: rgba(37, 99, 235, 0.3);
//         }
        
//         .modern-card {
//             backdrop-filter: var(--backdrop-blur);
//             background: rgba(255, 255, 255, 0.8);
//         }

//         .feature-icon {
//             width: 60px;
//             height: 60px;
//             border-radius: 16px;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             margin: 0 auto 1.5rem;
//             color: var(--white);
//             font-size: 1.5rem;
//             transition: var(--transition-bounce);
//         }
        
//         .gradient-bg {
//             background: var(--gradient-primary);
//         }

//         .feature-card:hover .feature-icon {
//             transform: scale(1.1) rotate(5deg);
//         }

//         .card-footer {
//             margin-top: 1.5rem;
//             padding-top: 1rem;
//             border-top: 1px solid var(--gray-100);
//         }

//         .feature-tag {
//             display: inline-block;
//             background: rgba(37, 99, 235, 0.1);
//             color: var(--primary-blue);
//             padding: 0.25rem 0.75rem;
//             border-radius: 50px;
//             font-size: 0.75rem;
//             font-weight: 500;
//             font-family: var(--font-mono);
//         }
        
//         .feature-card h3 {
//             font-size: 1.25rem;
//             font-weight: 600;
//             color: var(--black);
//             margin-bottom: 1rem;
//         }
        
//         .feature-card p {
//             color: var(--gray-600);
//             line-height: 1.6;
//         }
        
//         /* How It Works Section */
//         .how-it-works {
//             padding: 80px 0;
//             background: var(--gray-50);
//         }
        
//         .steps-container {
//             display: grid;
//             grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
//             gap: 3rem;
//             margin-top: 3rem;
//         }
        
//         .step {
//             display: flex;
//             align-items: flex-start;
//             gap: 1.5rem;
//         }
        
//         .step-number {
//             width: 50px;
//             height: 50px;
//             background: var(--primary-blue);
//             color: var(--white);
//             border-radius: 50%;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             font-weight: 700;
//             font-size: 1.25rem;
//             flex-shrink: 0;
//         }

//         .step-content h3 {
//             font-size: 1.25rem;
//             font-weight: 600;
//             color: var(--black);
//             margin-bottom: 0.5rem;
//         }
        
//         .step-content p {
//             color: var(--gray-600);
//             line-height: 1.6;
//         }
        
//         /* CTA Section */
//         .cta {
//             padding: 80px 0;
//             background: linear-gradient(135deg, var(--primary-blue), var(--dark-blue));
//             color: var(--white);
//             text-align: center;
//         }

//         .cta-content h2 {
//             font-size: 2.5rem;
//             font-weight: 700;
//             margin-bottom: 1rem;
//         }

//         .cta-content p {
//             font-size: 1.25rem;
//             margin-bottom: 2rem;
//             opacity: 0.9;
//         }

//         .cta-buttons {
//             display: flex;
//             gap: 1rem;
//             justify-content: center;
//             flex-wrap: wrap;
//         }
        
//         .cta .btn-primary {
//             background: var(--white);
//             color: var(--primary-blue);
//         }
//         .cta .btn-primary:hover {
//             background: var(--gray-100);
//         }

//         .cta .btn-outline {
//             border-color: var(--white);
//             color: var(--white);
//         }
//         .cta .btn-outline:hover {
//             background: var(--white);
//             color: var(--primary-blue);
//         }

//         /* Footer */
//         .footer {
//             background: var(--black);
//             color: var(--white);
//             padding: 60px 0 20px;
//         }

//         .footer-content {
//             display: grid;
//             grid-template-columns: 1fr 2fr;
//             gap: 3rem;
//             margin-bottom: 2rem;
//         }
        
//         .footer-logo {
//             display: flex;
//             align-items: center;
//             gap: 0.75rem;
//             margin-bottom: 1rem;
//         }

//         .footer-brand h3 {
//             font-size: 1.5rem;
//             font-weight: 700;
//             margin: 0;
//         }

//         .footer-brand .highlight {
//             color: var(--primary-blue);
//         }

//         .footer-brand p {
//             color: var(--gray-300);
//             line-height: 1.6;
//         }
        
//         .footer-links {
//             display: grid;
//             grid-template-columns: repeat(3, 1fr);
//             gap: 2rem;
//         }

//         .footer-column h4 {
//             font-weight: 600;
//             margin-bottom: 1rem;
//             color: var(--white);
//         }
        
//         .footer-column ul {
//             list-style: none;
//         }

//         .footer-column ul li {
//             margin-bottom: 0.5rem;
//         }

//         .footer-column ul li a {
//             color: var(--gray-300);
//             text-decoration: none;
//             transition: var(--transition);
//         }
        
//         .footer-column ul li a:hover {
//             color: var(--primary-blue);
//         }

//         .footer-bottom {
//             border-top: 1px solid var(--gray-800);
//             padding-top: 2rem;
//             text-align: center;
//             color: var(--gray-300);
//             display: flex;
//             flex-direction: column;
//             gap: 1rem;
//         }
        
//         .footer-contact a {
//             color: var(--primary-blue);
//             text-decoration: none;
//             transition: var(--transition);
//         }
//         .footer-contact a:hover {
//             color: var(--light-blue);
//             text-decoration: underline;
//         }
//         @media (max-width: 768px) {
//             .footer-bottom {
//                 gap: 0.75rem;
//             }
//         }
        
//         /* Responsive Design */
//         /* Large tablets and small desktops */
//         @media (max-width: 1024px) {
//             .hero-container {
//                 gap: 3rem;
//             }
//             .hero-title {
//                 font-size: 3rem;
//             }
//             .features-grid {
//                 grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
//                 gap: 1.5rem;
//             }
//             .steps-container {
//                 grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
//                 gap: 2rem;
//             }
//         }
        
//         /* Tablets */
//         @media (max-width: 768px) {
//             .hamburger {
//                 display: flex;
//             }
//             .nav-menu {
//                 position: fixed;
//                 left: -100%;
//                 top: 70px;
//                 flex-direction: column;
//                 background-color: var(--white);
//                 width: 100%;
//                 text-align: center;
//                 transition: var(--transition);
//                 box-shadow: var(--shadow-lg);
//                 padding: 2rem 0;
//             }
//             .nav-menu.active {
//                 left: 0;
//             }
//             .hero {
//                 padding: 100px 0 60px;
//             }
//             .hero-container {
//                 grid-template-columns: 1fr;
//                 gap: 2rem;
//                 text-align: center;
//             }
//             .hero-title {
//                 font-size: 2.5rem;
//                 margin-bottom: 1rem;
//             }
//             .hero-description {
//                 font-size: 1.1rem;
//                 margin-bottom: 1.5rem;
//             }
//             .hero-buttons {
//                 justify-content: center;
//                 flex-direction: column;
//                 align-items: center;
//                 gap: 0.75rem;
//             }
//             .btn {
//                 width: 100%;
//                 max-width: 280px;
//                 justify-content: center;
//             }
//             .features-grid {
//                 grid-template-columns: 1fr;
//                 gap: 1.5rem;
//             }
//             .steps-container {
//                 grid-template-columns: 1fr;
//                 gap: 1.5rem;
//             }
//             .step {
//                 flex-direction: column;
//                 text-align: center;
//                 gap: 1rem;
//             }
//             .footer-content {
//                 grid-template-columns: 1fr;
//                 gap: 2rem;
//                 text-align: center;
//             }
//             .footer-links {
//                 grid-template-columns: repeat(3, 1fr);
//                 gap: 1.5rem;
//             }
//             .cta-content h2 {
//                 font-size: 2rem;
//             }
//             .section-title {
//                 font-size: 2rem;
//             }
//             .hero-card-stack {
//                 max-width: 100%;
//                 margin-top: 2rem;
//             }
//             .card-2, .card-3 {
//                 transform: none;
//             }
//             .hero-card {
//                 margin-bottom: 0.75rem;
//             }
//         }
        
//         /* Mobile devices */
//         @media (max-width: 480px) {
//             .container {
//                 padding: 0 15px;
//             }
//             .hero {
//                 padding: 80px 0 40px;
//             }
//             .hero-container {
//                 padding: 0 15px;
//                 gap: 1.5rem;
//             }
//             .hero-title {
//                 font-size: 2rem;
//                 line-height: 1.2;
//             }
//             .hero-description {
//                 font-size: 1rem;
//                 margin-bottom: 1.5rem;
//             }
//             .hero-buttons {
//                 flex-direction: column;
//                 align-items: center;
//                 gap: 0.75rem;
//             }
//             .btn {
//                 width: 100%;
//                 max-width: 250px;
//                 justify-content: center;
//                 padding: 10px 20px;
//                 font-size: 0.9rem;
//             }
//             .hero-card {
//                 padding: 1rem;
//                 margin-bottom: 0.5rem;
//             }
//             .hero-card-stack {
//                 margin-top: 1.5rem;
//             }
//             .section-title {
//                 font-size: 1.75rem;
//             }
//             .section-subtitle {
//                 font-size: 1rem;
//             }
//             .feature-card {
//                 padding: 1.5rem;
//             }
//             .step {
//                 gap: 0.75rem;
//             }
//             .step-number {
//                 width: 40px;
//                 height: 40px;
//                 font-size: 1rem;
//             }
//             .footer-links {
//                 grid-template-columns: 1fr;
//                 gap: 1rem;
//             }
//             .cta-content h2 {
//                 font-size: 1.75rem;
//             }
//             .cta-content p {
//                 font-size: 1rem;
//             }
//         }
        
//         /* Extra small devices */
//         @media (max-width: 360px) {
//             .nav-container {
//                 padding: 0 15px;
//             }
//             .hero-title {
//                 font-size: 1.75rem;
//             }
//             .btn {
//                 padding: 8px 16px;
//                 font-size: 0.85rem;
//             }
//             .feature-card {
//                 padding: 1.25rem;
//             }
//             .hero-card {
//                 padding: 0.75rem;
//             }
//         }
        
//         /* Very small devices */
//         @media (max-width: 320px) {
//             .nav-container {
//                 padding: 0 10px;
//             }
//             .nav-logo {
//                 gap: 0.4rem;
//             }
//             .nav-logo h2 {
//                 font-size: 1.1rem;
//             }
//             .logo-icon svg {
//                 width: 20px;
//                 height: 20px;
//             }
//         }
        
//         /* Smooth scrolling */
//         html {
//             scroll-behavior: smooth;
//         }

//         /* Loading animations */
//         @keyframes fadeInUp {
//             from {
//                 opacity: 0;
//                 transform: translateY(30px);
//             }
//             to {
//                 opacity: 1;
//                 transform: translateY(0);
//             }
//         }
        
//         .fade-in-up {
//             animation: fadeInUp 0.6s ease-out;
//         }

//         /* Scroll animations */
//         .scroll-animate {
//             opacity: 0;
//             transform: translateY(30px);
//             transition: all 0.6s ease-out;
//         }

//         .scroll-animate.animate {
//             opacity: 1;
//             transform: translateY(0);
//         }
//     `}</style>
      

//       <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
//         <div className="nav-container">
//             <div className="nav-logo">
//                 <div className="logo">
//                     <div className="logo-icon">
//                         <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
//                             <rect width="32" height="32" rx="8" fill="url(#gradient)"/>
//                             <path d="M8 12L16 8L24 12V20C24 22.2091 22.2091 24 20 24H12C9.79086 24 8 22.2091 8 20V12Z" fill="white"/>
//                             <path d="M12 16L16 14L20 16V20H12V16Z" fill="#2563eb"/>
//                             <defs>
//                                 <linearGradient id="gradient" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
//                                     <stop stopColor="#2563eb"/>
//                                     <stop offset="1" stopColor="#3b82f6"/>
//                                 </linearGradient>
//                             </defs>
//                         </svg>
//                     </div>
//                 </div>
//                 <h2>Next<span className="highlight">Step</span></h2>
//             </div>
//             <ul className={`nav-menu ${navMenuActive ? 'active' : ''}`}>
//                 <li><a href="#home" onClick={(e) => handleNavClick(e, 'home')}>Home</a></li>
//                 <li><a href="#features" onClick={(e) => handleNavClick(e, 'features')}>Features</a></li>
//                 <li><a href="#how-it-works" onClick={(e) => handleNavClick(e, 'how-it-works')}>Process</a></li>
//                 <li><a href="#contact" onClick={(e) => handleNavClick(e, 'contact')}>Contact</a></li>
//             </ul>
//             <div className="hamburger" onClick={toggleNavMenu}>
//                 <span></span>
//                 <span></span>
//                 <span></span>
//                 <span></span>
//             </div>
//         </div>
//       </nav>

//       <section id="home" className="hero" ref={sections.home}>
//         <div className="hero-container">
//             <div className="hero-content scroll-animate">
//                 <h1 className="hero-title">Streamline Internships, <span className="highlight gradient-text">Build Careers</span></h1>
//                 <p className="hero-description">Transform campus placements with our unified platform. Connect students, mentors, and recruiters through smart automation and data-driven insights.</p>
//                 <div className="hero-buttons">
//                     <a href="#features" className="btn btn-primary btn-glow" onClick={(e) => handleNavClick(e, 'features')}>Explore Features <i className="fas fa-arrow-right"></i></a>
//                     <a href="#how-it-works" className="btn btn-secondary btn-glass" onClick={(e) => handleNavClick(e, 'how-it-works')}>See How It Works <i className="fas fa-play"></i></a>
//                 </div>
//             </div>
//             <div className="hero-visual">
//                 <div className="hero-card-stack">
//                     <div className="hero-card card-1">
//                         <div className="card-header">
//                             <div className="card-icon"><i className="fas fa-user-graduate"></i></div>
//                             <div className="card-title">Student Portal</div>
//                         </div>
//                         <div className="card-content">
//                             <div className="progress-bar">
//                                 <div className="progress-fill" style={{width: '85%'}}></div>
//                             </div>
//                             <span className="progress-text">Profile Complete</span>
//                         </div>
//                     </div>
//                     <div className="hero-card card-2">
//                         <div className="card-header">
//                             <div className="card-icon"><i className="fas fa-briefcase"></i></div>
//                             <div className="card-title">Job Matching</div>
//                         </div>
//                         <div className="card-content">
//                             <div className="match-items">
//                                 <div className="match-item active">Frontend Developer</div>
//                                 <div className="match-item">Data Analyst</div>
//                                 <div className="match-item">UI/UX Designer</div>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="hero-card card-3">
//                         <div className="card-header">
//                             <div className="card-icon"><i className="fas fa-chart-line"></i></div>
//                             <div className="card-title">Analytics</div>
//                         </div>
//                         <div className="card-content">
//                             <div className="chart-bars">
//                                 <div className="bar" style={{height: '60px'}}></div>
//                                 <div className="bar" style={{height: '80px'}}></div>
//                                 <div className="bar" style={{height: '45px'}}></div>
//                                 <div className="bar" style={{height: '90px'}}></div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//       </section>

//       <section id="features" className="features" ref={sections.features}>
//         <div className="container">
//             <div className="section-header">
//                 <div className="section-badge scroll-animate"><span className="badge-dot"></span> <span>Features</span></div>
//                 <h2 className="section-title scroll-animate">Platform Features</h2>
//                 <p className="section-subtitle scroll-animate">An integrated, role-based portal designed to simplify every step of the internship journey for students and campus staff.</p>
//             </div>
//             <div className="features-grid">
//                 <div className="feature-card modern-card scroll-animate">
//                     <div className="feature-icon gradient-bg"><i className="fas fa-user-plus"></i></div>
//                     <h3>Student Registration</h3>
//                     <p>Streamlined registration process for students with comprehensive profile creation.</p>
//                     <div className="card-footer">
//                         <span className="feature-tag">Registration</span>
//                     </div>
//                 </div>
//                 <div className="feature-card modern-card scroll-animate">
//                     <div className="feature-icon gradient-bg"><i className="fas fa-briefcase"></i></div>
//                     <h3>Job Postings</h3>
//                     <p>Verified opportunities tagged by skills and department with real-time updates.</p>
//                     <div className="card-footer">
//                         <span className="feature-tag">Job Board</span>
//                     </div>
//                 </div>
//                 <div className="feature-card modern-card scroll-animate">
//                     <div className="feature-icon gradient-bg"><i className="fas fa-calendar-check"></i></div>
//                     <h3>Interview Scheduling</h3>
//                     <p>Automated interview scheduling with calendar integration and notifications.</p>
//                     <div className="card-footer">
//                         <span className="feature-tag">Scheduling</span>
//                     </div>
//                 </div>
//                 <div className="feature-card modern-card scroll-animate">
//                     <div className="feature-icon gradient-bg"><i className="fas fa-chart-bar"></i></div>
//                     <h3>Analytics Dashboard</h3>
//                     <p>Comprehensive analytics and insights for placement tracking and performance.</p>
//                     <div className="card-footer">
//                         <span className="feature-tag">Analytics</span>
//                     </div>
//                 </div>
//                 <div className="feature-card modern-card scroll-animate">
//                     <div className="feature-icon gradient-bg"><i className="fas fa-file-alt"></i></div>
//                     <h3>Resume Builder</h3>
//                     <p>AI-powered resume builder with templates and optimization suggestions.</p>
//                     <div className="card-footer">
//                         <span className="feature-tag">Resume Tools</span>
//                     </div>
//                 </div>
//                 <div className="feature-card modern-card scroll-animate">
//                     <div className="feature-icon gradient-bg"><i className="fas fa-users"></i></div>
//                     <h3>Company Portal</h3>
//                     <p>Dedicated portal for companies to manage postings and candidate interactions.</p>
//                     <div className="card-footer">
//                         <span className="feature-tag">Company Hub</span>
//                     </div>
//                 </div>
//                 <div className="feature-card modern-card scroll-animate">
//                     <div className="feature-icon gradient-bg"><i className="fas fa-graduation-cap"></i></div>
//                     <h3>Skill Assessment</h3>
//                     <p>Comprehensive skill evaluation and certification system for students.</p>
//                     <div className="card-footer">
//                         <span className="feature-tag">Assessment</span>
//                     </div>
//                 </div>
//                 <div className="feature-card modern-card scroll-animate">
//                     <div className="feature-icon gradient-bg"><i className="fas fa-bell"></i></div>
//                     <h3>Notifications</h3>
//                     <p>Real-time notifications for applications, interviews, and important updates.</p>
//                     <div className="card-footer">
//                         <span className="feature-tag">Alerts</span>
//                     </div>
//                 </div>
//             </div>
//         </div>
//       </section>

//       <section id="how-it-works" className="how-it-works" ref={sections['how-it-works']}>
//         <div className="container">
//             <h2 className="section-title scroll-animate">How It Works</h2>
//             <p className="section-subtitle scroll-animate">Four simple steps from profile to placement.</p>
//             <div className="steps-container">
//                 <div className="step scroll-animate">
//                     <div className="step-number">1</div>
//                     <div className="step-content">
//                         <h3>Create Profile</h3>
//                         <p>Build your digital profile with skills, resume, and achievements.</p>
//                     </div>
//                 </div>
//                 <div className="step scroll-animate">
//                     <div className="step-number">2</div>
//                     <div className="step-content">
//                         <h3>Apply Smart</h3>
//                         <p>Get personalized job matches and apply with one click.</p>
//                     </div>
//                 </div>
//                 <div className="step scroll-animate">
//                     <div className="step-number">3</div>
//                     <div className="step-content">
//                         <h3>Track Progress</h3>
//                         <p>Monitor applications and schedule interviews seamlessly.</p>
//                     </div>
//                 </div>
//                 <div className="step scroll-animate">
//                     <div className="step-number">4</div>
//                     <div className="step-content">
//                         <h3>Get Certified</h3>
//                         <p>Complete internships and receive verified certificates automatically.</p>
//                     </div>
//                 </div>
//             </div>
//         </div>
//       </section>

//       <section className="cta">
//         <div className="container">
//             <div className="cta-content">
//                 <h2>Transform Your Campus Placements</h2>
//                 <p>Ready to move from manual chaos to a streamlined, software-driven process? Discover how our platform can help.</p>
//                 <div className="cta-buttons">
//                     <a href="#home" className="btn btn-primary" onClick={(e) => handleNavClick(e, 'home')}>Get Started</a>
//                     <a href="https://github.com/your-repo" className="btn btn-outline" target="_blank" rel="noopener noreferrer">View on GitHub</a>
//                 </div>
//             </div>
//         </div>
//       </section>

//       <footer id="contact" className="footer" ref={sections.contact}>
//         <div className="container">
//             <div className="footer-content">
//                 <div className="footer-brand">
//                     <div className="footer-logo">
//                         <div className="logo-icon">
//                             <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                 <rect width="32" height="32" rx="8" fill="url(#footerGradient)"/>
//                                 <path d="M8 12L16 8L24 12V20C24 22.2091 22.2091 24 20 24H12C9.79086 24 8 22.2091 8 20V12Z" fill="white"/>
//                                 <path d="M12 16L16 14L20 16V20H12V16Z" fill="#2563eb"/>
//                                 <defs>
//                                     <linearGradient id="footerGradient" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
//                                         <stop stopColor="#2563eb"/>
//                                         <stop offset="1" stopColor="#3b82f6"/>
//                                     </linearGradient>
//                                 </defs>
//                             </svg>
//                         </div>
//                     </div>
//                     <h3>Next<span className="highlight">Step</span></h3>
//                     <p>A Smart India Hackathon 2025 Project by Team Your Team Name.</p>
//                 </div>
//                 <div className="footer-links">
//                     <div className="footer-column">
//                         <h4>Platform</h4>
//                         <ul>
//                             <li><a href="#features" onClick={(e) => handleNavClick(e, 'features')}>Features</a></li>
//                             <li><a href="#how-it-works" onClick={(e) => handleNavClick(e, 'how-it-works')}>Process</a></li>
//                         </ul>
//                     </div>
//                     <div className="footer-column">
//                         <h4>Roles</h4>
//                         <ul>
//                             <li>Student</li>
//                             <li>Mentor</li>
//                             <li>Placement Cell</li>
//                             <li>Recruiter</li>
//                         </ul>
//                     </div>
//                     <div className="footer-column">
//                         <h4>Resources</h4>
//                         <ul>
//                             <li><a href="https://sih.gov.in" target="_blank" rel="noopener noreferrer">SIH Website</a></li>
//                             <li><a href="https://github.com/your-repo" target="_blank" rel="noopener noreferrer"><i className="fab fa-github"></i> GitHub Repository</a></li>
//                             <li><a href="#contact" onClick={(e) => handleNavClick(e, 'contact')}>Documentation</a></li>
//                             <li><a href="#contact" onClick={(e) => handleNavClick(e, 'contact')}>API Reference</a></li>
//                         </ul>
//                     </div>
//                 </div>
//             </div>
//             <div className="footer-bottom">
//                 <div className="footer-contact">
//                     <span>Contact <a href="mailto:contact@nextstep.edu">contact@nextstep.edu</a></span>
//                 </div>
//                 <div>
//                     &copy; 2025 NextStep. All rights reserved.
//                 </div>
//             </div>
//         </div>
//       </footer>
//     </>
//   );
// };

// export default App;
