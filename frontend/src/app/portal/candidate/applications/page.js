"use client"
import React, { useState, useMemo, useEffect } from 'react';
import { CiSearch } from 'react-icons/ci';

// --- MOCKED EXTERNAL DEPENDENCIES ---
// Mock apiClient is not strictly needed for fetching here, but kept for context awareness.
const apiClient = {
    // Mock post for future use if user adds a feature like withdrawing application
    post: async (url, data) => {
        await new Promise(resolve => setTimeout(resolve, 300));
        console.log(`[Mock API] POST to ${url} with data:`, data);
        return { status: 200 };
    }
};

// Mock useUserStore for an 'applicant' profile
const useUserStore = () => ({
    role: 'applicant',
    applicantId: 'CANDIDATE-001',
    name: 'Jane Doe',
});

// --- MOCKED CANDIDATE APPLICATION DATA ---
const mockApplications = [
    { id: 101, jobTitle: 'Frontend Dev Internship', company: 'InnovateX', applicationDate: '2025-08-15', status: 'Interview Scheduled', interviewDate: '2025-09-28T14:00:00Z', location: 'Remote', stipend: 1000 },
    { id: 102, jobTitle: 'Data Analyst Intern', company: 'DataStream', applicationDate: '2025-08-10', status: 'Under Review', interviewDate: null, location: 'San Francisco, CA', stipend: 1500 },
    { id: 103, jobTitle: 'Cloud Security Intern', company: 'SecureCloud', applicationDate: '2025-08-01', status: 'Rejected', interviewDate: null, location: 'New York, NY', stipend: 1800 },
    { id: 104, jobTitle: 'Mobile UX/UI Design Intern', company: 'DesignFlow', applicationDate: '2025-07-25', status: 'Application Submitted', interviewDate: null, location: 'Los Angeles, CA', stipend: 950 },
    { id: 105, jobTitle: 'Embedded Systems Intern', company: 'RoboCorp', applicationDate: '2025-07-20', status: 'Interview Scheduled', interviewDate: '2025-10-05T09:00:00Z', location: 'Austin, TX', stipend: 1400 },
    { id: 106, jobTitle: 'Marketing Content Intern', company: 'GrowthX', applicationDate: '2025-07-18', status: 'Under Review', interviewDate: null, location: 'Remote', stipend: 800 },
];

const allStatuses = [...new Set(mockApplications.map(a => a.status))];
const allCompanies = [...new Set(mockApplications.map(a => a.company))];

// --- Utility Functions ---

const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
};

const formatInterviewTime = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    // Note: Using 'UTC' to display the time as stored in mock data
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZone: 'UTC', timeZoneName: 'short' });
};

const getStatusStyles = (status) => {
    switch (status) {
        case 'Interview Scheduled':
            return 'bg-indigo-100 text-indigo-800 border-indigo-300';
        case 'Under Review':
            return 'bg-yellow-100 text-yellow-800 border-yellow-300';
        case 'Rejected':
            return 'bg-red-100 text-red-800 border-red-300';
        case 'Application Submitted':
            return 'bg-blue-100 text-blue-800 border-blue-300';
        default:
            return 'bg-gray-100 text-gray-800 border-gray-300';
    }
};

// --- Main Component ---
const Postings = () => { // Renamed from CandidateApplicationDashboard to Postings
    const { name } = useUserStore();
    const [applications, setApplications] = useState(mockApplications);
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
        status: '',
        company: '',
    });
    const [isLoading, setIsLoading] = useState(false);

    // Mock Fetch Effect (Simulates API load)
    useEffect(() => {
        setIsLoading(true);
        // Simulate a real fetch delay before setting data (currently uses mockApplications)
        const mockFetch = async () => {
            await new Promise(resolve => setTimeout(resolve, 700));
            // In a real app, this would be: const response = await apiClient.get(`/candidate/applications`);
            setApplications(mockApplications); 
            setIsLoading(false);
        };
        mockFetch();
    }, []);

    // Memoized filtering logic
    const filteredApplications = useMemo(() => {
        const lowerSearchTerm = searchTerm.toLowerCase();

        return applications.filter(app => {
            // 1. Search Filter (Job Title or Company)
            const matchesSearch = app.jobTitle.toLowerCase().includes(lowerSearchTerm) ||
                                  app.company.toLowerCase().includes(lowerSearchTerm);

            if (!matchesSearch) return false;

            // 2. Status Filter
            const matchesStatus = filters.status === '' || app.status === filters.status;
            if (!matchesStatus) return false;

            // 3. Company Filter
            const matchesCompany = filters.company === '' || app.company === filters.company;
            
            return matchesCompany;
        });
    }, [applications, searchTerm, filters]);

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    // --- Sub-Components ---

    const ApplicationTable = () => {
        if (isLoading) {
            return (
                <div className="text-center p-10 text-lg font-medium text-indigo-600 bg-white rounded-xl shadow-lg">
                    Loading applications...
                </div>
            );
        }

        if (filteredApplications.length === 0) {
            return (
                <div className="text-center p-10 bg-white rounded-xl shadow-lg">
                    <p className="text-xl text-gray-600 font-medium">No applications match your search or filters.</p>
                    <p className="text-sm text-gray-400 mt-2">Try clearing your filters or applying for more jobs!</p>
                </div>
            );
        }

        return (
            <div className="overflow-x-auto bg-white rounded-xl shadow-lg border border-gray-100">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job / Company</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Stipend</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Applied</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Interview Date</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredApplications.map(app => (
                            <tr key={app.id} className="hover:bg-indigo-50 transition duration-150">
                                {/* Job / Company */}
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-semibold text-gray-900">{app.jobTitle}</div>
                                    <div className="text-xs text-indigo-600">{app.company} ({app.location})</div>
                                </td>
                                
                                {/* Stipend */}
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden sm:table-cell">
                                    ${app.stipend}/mo
                                </td>

                                {/* Date Applied */}
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {formatDate(app.applicationDate)}
                                </td>
                                
                                {/* Status */}
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border ${getStatusStyles(app.status)}`}>
                                        {app.status}
                                    </span>
                                </td>
                                
                                {/* Interview Date/Time */}
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-700 hidden md:table-cell">
                                    {app.interviewDate ? (
                                        <div className="flex flex-col">
                                            <span>{formatDate(app.interviewDate)}</span>
                                            <span className="text-xs text-gray-500">{formatInterviewTime(app.interviewDate)}</span>
                                        </div>
                                    ) : (
                                        'No Interview'
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            
            <header className="bg-white shadow-md sticky top-0 z-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <h1 className="text-3xl font-extrabold text-gray-900 flex items-center">
                        My Job Applications
                    </h1>
                    <p className="text-md text-gray-500 mt-1">Track the status and interview schedule for all your submitted applications.</p>
                </div>
            </header>

            <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
                
                {/* Search Bar */}
                <div className="mb-6 p-4 bg-white rounded-xl shadow-lg border border-gray-100">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search by Job Title or Company..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full p-4 pl-12 text-lg border border-gray-300 rounded-xl focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                        />
                        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl">
                        <CiSearch className="text-2xl" />
                        </span>
                    </div>
                </div>

                {/* Filters and Stats */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                    <div className="flex flex-wrap gap-4">
                        
                        {/* Status Filter */}
                        <select
                            value={filters.status}
                            onChange={(e) => handleFilterChange('status', e.target.value)}
                            className="p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition"
                        >
                            <option value="">All Statuses</option>
                            {allStatuses.map(status => (
                                <option key={status} value={status}>{status}</option>
                            ))}
                        </select>

                        {/* Company Filter */}
                        <select
                            value={filters.company}
                            onChange={(e) => handleFilterChange('company', e.target.value)}
                            className="p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition"
                        >
                            <option value="">All Companies</option>
                            {allCompanies.map(company => (
                                <option key={company} value={company}>{company}</option>
                            ))}
                        </select>

                        {/* Clear Filters Button */}
                        <button 
                            onClick={() => { setSearchTerm(''); setFilters({ status: '', company: '' }); }}
                            className="p-3 bg-red-50 text-red-600 rounded-lg font-medium hover:bg-red-100 transition"
                        >
                            Clear Filters
                        </button>
                    </div>

                    <div className="text-lg font-bold text-gray-700">
                        {filteredApplications.length} of {applications.length} Applications
                    </div>
                </div>

                {/* Application Table */}
                <ApplicationTable />
                
            </main>
        </div>
    );
};

export default Postings;
