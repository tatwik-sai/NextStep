"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth, useUser } from "@clerk/nextjs";
import { SiNextra } from "react-icons/si";
import { RiCalendarScheduleFill } from "react-icons/ri";

// Example color theme (replace with your actual theme colors)
const SIDEBAR_BG = "bg-[#1a2236]"; // dark blue
const SIDEBAR_TEXT = "text-[#f5f6fa]"; // light gray
const SIDEBAR_ACTIVE = "bg-[#3a4a6b]"; // slightly lighter blue
const SIDEBAR_HOVER = "hover:bg-[#2a3350]";
const MAIN_BG = "bg-[#f5f6fa]"; // page background
import { FaUserLarge, FaClipboardList, FaUserCheck, FaBriefcase } from "react-icons/fa6";
const RecruiterLayout = ({ children }) => {
    const { signOut } = useAuth();
    const { isLoaded, user } = useUser();
    const menuItems = [
    { name: "Profile", path: "profile", icon: <FaUserLarge/> },
    { name: "Applications", path: "applications", icon: <FaClipboardList /> },
    { name: "Interviews", path: "interviews", icon:  <RiCalendarScheduleFill />},
    { name: "Postings", path: "postings", icon: <FaBriefcase /> },
  ];
    const pathname = usePathname();

    const currentPage =
        menuItems.find((item) => pathname.endsWith(item.path))?.name || "";

    return (
        <div className="flex h-screen">
            {/* Fixed Side Menu */}
            <div
                className={`w-64 ${SIDEBAR_BG} ${SIDEBAR_TEXT} flex flex-col shadow-lg z-20`}
                >
                    <div className="flex items-center text-2xl font-bold p-6 border-b border-[#232b43]">
                        <SiNextra />
                        <span className="ml-3">NextStep</span>
                    </div>
                <nav className="flex-1 p-4">
                            {menuItems.map((item) => {
                    const isActive = pathname.endsWith(item.path);
                    return (
                        <Link
                            key={item.name}
                            href={item.path}
                            className={` p-3 flex items-center rounded mb-2 ${SIDEBAR_HOVER} ${isActive
                                ? `${SIDEBAR_ACTIVE} font-semibold`
                                : ""
                                }`}
                        >
                            {item.icon} 
                            <span className="ml-2">{item.name}</span>

                        </Link>
                    );
                })}
                </nav>

                {/* Profile Section */}
                {isLoaded && user && (
                    <div className="border-t border-[#232b43] p-4 mt-auto">
                        <div className="flex items-center space-x-3">
                            <div className="relative">
                                <img
                                    src={user.imageUrl || "/api/placeholder/40/40"}
                                    alt="Profile"
                                    className="w-10 h-10 rounded-full object-cover border-2 border-[#232b43]"
                                />
                                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-[#1a2236] rounded-full"></div>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium truncate">
                                    {user.fullName || `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'User'}
                                </p>
                                <p className="text-xs text-gray-400 truncate">
                                    {user.primaryEmailAddress?.emailAddress || 'No email'}
                                </p>
                            </div>
                            <button
                                onClick={() => signOut()}
                                className="p-2 cursor-pointer rounded-md text-gray-400 hover:text-white hover:bg-[#2a3350] transition-colors"
                                title="Logout"
                            >
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Main Content */}
            <div
                className={` ${MAIN_BG} flex-1 overflow-y-auto min-h-screen `}
                style={{ minHeight: "100vh" }}
            >
                {children}
            </div>
        </div>
    );
};

export default RecruiterLayout;
