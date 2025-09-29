"use client"

import React, { useState, useMemo } from 'react';

// --- MOCKED DATA FOR DASHBOARDS ---
const mockPlacementData = {
    totalCandidates: 850,
    placed: 680,
    unplaced: 170
};

const mockInternshipData = {
    totalInternships: 450,
    ppoOffered: 120,
    ppoAccepted: 95
};

const mockPackageData = {
    averagePackage: 15.2, // in LPA
    medianPackage: 12.0, // in LPA
    highestPackage: 48.0, // in LPA
    internationalOffers: 8
};

const mockCandidateSkills = [
    { skill: 'Python/ML', count: 450, color: 'bg-green-500', max: 500 },
    { skill: 'React/JS', count: 320, color: 'bg-indigo-500', max: 500 },
    { skill: 'Data Science', count: 210, color: 'bg-blue-500', max: 500 },
    { skill: 'Finance/Biz', count: 180, color: 'bg-yellow-500', max: 500 },
    { skill: 'C++/Embedded', count: 90, color: 'bg-red-500', max: 500 },
];

// Utility function to format numbers
const formatNumber = (num) => num.toLocaleString('en-US');

// --- Visualization Components ---

const PieChartMock = ({ placed, unplaced }) => {
    const total = placed + unplaced;
    const placedPercentage = Math.round((placed / total) * 100);
    const unplacedPercentage = 100 - placedPercentage;

    // Tailwind-friendly conic gradient for pie chart visualization
    const placedColor = '#4f46e5'; // Indigo-600
    const unplacedColor = '#d1d5db'; // Gray-300
    const gradient = `conic-gradient(
        ${placedColor} 0% ${placedPercentage}%,
        ${unplacedColor} ${placedPercentage}% 100%
    )`;

    return (
        <div className="relative w-full h-full flex items-center justify-center">
            <div 
                className="w-32 h-32 rounded-full shadow-inner" 
                style={{ background: gradient }}
            ></div>
            <div className="absolute text-center">
                <p className="text-2xl font-bold text-gray-800">{placedPercentage}%</p>
                <p className="text-xs text-gray-500">Placed</p>
            </div>
        </div>
    );
};

const PlacementStatsCard = () => {
    const { totalCandidates, placed, unplaced } = mockPlacementData;
    const placedPercentage = Math.round((placed / totalCandidates) * 100);

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 h-full flex flex-col">
            <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Placement Status (Total Candidates)</h3>
            <div className="flex flex-col md:flex-row items-center justify-around flex-grow space-y-4 md:space-y-0">
                <div className="flex-shrink-0">
                    <PieChartMock placed={placed} unplaced={unplaced} />
                </div>
                <div className="space-y-3 w-full md:w-auto text-center md:text-left">
                    <StatBox label="Total Candidates" value={formatNumber(totalCandidates)} color="indigo" />
                    <StatBox label="Candidates Placed" value={formatNumber(placed)} color="green" />
                    <StatBox label="Candidates Seeking" value={formatNumber(unplaced)} color="gray" />
                </div>
            </div>
            <p className="text-sm mt-4 text-center text-gray-600 font-medium">
                Goal: Achieve 100% placement for the graduating cohort.
            </p>
        </div>
    );
};

const PPOConversionCard = () => {
    const { totalInternships, ppoOffered, ppoAccepted } = mockInternshipData;
    const offerRate = Math.round((ppoOffered / totalInternships) * 100);
    const acceptanceRate = Math.round((ppoAccepted / ppoOffered) * 100);

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 h-full">
            <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">PPO (Internship Conversion)</h3>
            <div className="grid grid-cols-2 gap-4">
                <MetricPill label="Total Internships" value={formatNumber(totalInternships)} icon="💼" color="indigo" />
                <MetricPill label="PPO Offer Rate" value={`${offerRate}%`} icon="💌" color="pink" />
                <MetricPill label="PPO Offers Made" value={formatNumber(ppoOffered)} icon="🏆" color="green" />
                <MetricPill label="Offer Acceptance Rate" value={`${acceptanceRate}%`} icon="✅" color="teal" />
            </div>

            <div className="mt-6">
                <h4 className="font-semibold text-gray-700 mb-2">Offer Acceptance Trend (Mock Bar)</h4>
                <div className="h-24 flex items-end space-x-2 border-l border-b pb-1 pl-1">
                    <BarMock height="70%" label="Q1" color="bg-teal-500" />
                    <BarMock height="55%" label="Q2" color="bg-teal-500" />
                    <BarMock height="85%" label="Q3" color="bg-teal-600" />
                    <BarMock height="95%" label="Q4" color="bg-teal-700" />
                </div>
            </div>
        </div>
    );
};

const PackageStatsCard = () => {
    const { averagePackage, medianPackage, highestPackage, internationalOffers } = mockPackageData;
    
    // Package scale for visualization (assuming max is around 50 LPA)
    const maxLPA = 50; 

    const getBarHeight = (value) => `${(value / maxLPA) * 100}%`;

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 h-full flex flex-col">
            <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Students vs. Package (CTC)</h3>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
                <MetricPill label="Average CTC (LPA)" value={`${averagePackage} L`} icon="💰" color="purple" />
                <MetricPill label="Median CTC (LPA)" value={`${medianPackage} L`} icon="⚖️" color="cyan" />
            </div>

            <div className="flex-grow">
                <h4 className="font-semibold text-gray-700 mb-2">CTC Distribution (Mock Bar Graph)</h4>
                <div className="h-40 flex items-end space-x-6 border-l border-b pb-1 pl-1">
                    <div className="flex flex-col items-center h-full justify-end">
                        <div 
                            className={`w-10 rounded-t-lg transition-all duration-700 bg-purple-600`}
                            style={{ height: getBarHeight(highestPackage) }}
                        ></div>
                        <span className="text-xs text-gray-500 mt-1 font-medium">Highest: {highestPackage}L</span>
                    </div>
                    <div className="flex flex-col items-center h-full justify-end">
                        <div 
                            className={`w-10 rounded-t-lg transition-all duration-700 bg-cyan-600`}
                            style={{ height: getBarHeight(averagePackage) }}
                        ></div>
                        <span className="text-xs text-gray-500 mt-1 font-medium">Average: {averagePackage}L</span>
                    </div>
                    <div className="flex flex-col items-center h-full justify-end">
                        <div 
                            className={`w-10 rounded-t-lg transition-all duration-700 bg-cyan-500`}
                            style={{ height: getBarHeight(medianPackage) }}
                        ></div>
                        <span className="text-xs text-gray-500 mt-1 font-medium">Median: {medianPackage}L</span>
                    </div>
                </div>
            </div>

            <p className="text-sm mt-4 text-center text-gray-600 font-medium border-t pt-3">
                {internationalOffers} International Offers secured this year.
            </p>
        </div>
    );
};

const CandidateBreakdownCard = () => (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
        <h3 className="text-xl font-bold text-gray-800 mb-6 border-b pb-2">Top Candidate Skill Distribution</h3>
        <div className="space-y-4">
            {mockCandidateSkills.map((item, index) => (
                <div key={index}>
                    <div className="flex justify-between text-sm font-medium text-gray-700 mb-1">
                        <span>{item.skill}</span>
                        <span>{formatNumber(item.count)} Candidates</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                            className={`h-2.5 rounded-full ${item.color}`}
                            style={{ width: `${(item.count / item.max) * 100}%` }}
                        ></div>
                    </div>
                </div>
            ))}
        </div>
        <p className="text-sm mt-6 text-gray-500 italic">
            Visualizing the most common skills found in the active candidate pool.
        </p>
    </div>
);


// --- Helper Components ---

const StatBox = ({ label, value, color }) => (
    <div className="flex justify-between items-center space-x-4 border-l-4 border-gray-200 pl-3">
        <p className="text-sm text-gray-500">{label}</p>
        <p className={`text-2xl font-extrabold text-${color}-600`}>{value}</p>
    </div>
);

const MetricPill = ({ label, value, icon, color }) => (
    <div className={`p-4 rounded-xl shadow-sm border border-gray-100 bg-${color}-50 flex items-center space-x-3`}>
        <div className={`text-2xl p-2 rounded-full bg-${color}-200`}>
            {icon}
        </div>
        <div>
            <p className="text-xs font-medium text-gray-500">{label}</p>
            <p className="text-lg font-bold text-gray-800">{value}</p>
        </div>
    </div>
);

const BarMock = ({ height, label, color }) => (
    <div className="flex flex-col items-center justify-end h-full">
        <div 
            className={`w-6 rounded-t-lg transition-all duration-700 ${color}`}
            style={{ height: height }}
        ></div>
        <span className="text-xs text-gray-500 mt-1">{label}</span>
    </div>
);


// --- Main Dashboard Component ---
const Postings = () => {
    // Mock user store remains, but the role isn't actively used for conditional rendering here
    const useUserStore = () => ({ role: 'recruiter' });
    const { role } = useUserStore();

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            
            <header className="bg-white shadow-md sticky top-0 z-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <h1 className="text-3xl font-extrabold text-gray-900 flex items-center">
                        Placement Dashboard
                    </h1>
                    <p className="text-md text-gray-500 mt-1">Monitor and manage job postings and candidate applications.</p>
                </div>
            </header>

            <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
                
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                    {/* Metric 1: Placed vs. Unplaced (2/3 width) */}
                    <div className="lg:col-span-2">
                        <PlacementStatsCard />
                    </div>

                    {/* Metric 2: PPO Conversion (1/3 width) */}
                    <PPOConversionCard />
                </div>
                
                <h2 className="text-2xl font-bold text-gray-800 mb-6 mt-12">Candidate, Compensation, and Resource Analysis</h2>

                {/* Updated to a 2-column grid to fit the remaining two cards evenly */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Metric 3: Skill Breakdown */}
                    <CandidateBreakdownCard />

                    {/* NEW Metric: Placement Packages */}
                    <PackageStatsCard />
                </div>
                
            </main>
        </div>
    );
};

export default Postings;
