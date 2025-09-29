"use client"
import React, { useState, useMemo, useEffect } from 'react';
import { CiSearch } from "react-icons/ci";


// --- MOCKED EXTERNAL DEPENDENCIES ---
// Mock apiClient for API calls
const apiClient = {
    // Simulates fetching applications
    get: async (url) => {
        await new Promise(resolve => setTimeout(resolve, 500));
        // Mock data structure
        const mockApps = [
            { id: 1, candidate: 'Alex Johnson', jobId: 101, jobTitle: 'Frontend Dev Internship', company: 'InnovateX', dateApplied: '2025-09-15T10:00:00Z', status: 'Pending Review', coverLetter: "I am deeply passionate about React and UI/UX design. My recent project, a dynamic e-commerce site built with Next.js and Tailwind, demonstrates my commitment to clean, responsive interfaces. I believe my skills are a perfect fit for InnovateX's focus on scalable frontend solutions.", resumeLink: "http://link.to/alex_resume.pdf" },
            { id: 2, candidate: 'Maria Garcia', jobId: 102, jobTitle: 'Data Analyst Intern', company: 'DataStream', dateApplied: '2025-09-16T11:30:00Z', status: 'Rejected', coverLetter: "My background in statistics and my experience using Python for data visualization align directly with DataStream's analytical needs. I am eager to apply machine learning models to real-world datasets.", resumeLink: "http://link.to/maria_resume.pdf" },
            { id: 3, candidate: 'John Doe', jobId: 101, jobTitle: 'Frontend Dev Internship', company: 'InnovateX', dateApplied: '2025-09-15T14:45:00Z', status: 'Approved', coverLetter: "While I come from a C++ background, I've spent the last six months aggressively learning the modern JS ecosystem, focusing heavily on React Hooks and state management. I'm ready for the challenge.", resumeLink: "http://link.to/john_resume.pdf" },
            { id: 4, candidate: 'Samir Khan', jobId: 103, jobTitle: 'Cloud Security Intern', company: 'SecureCloud', dateApplied: '2025-09-18T09:15:00Z', status: 'Pending Review', coverLetter: "I hold the CompTIA Security+ certification and have practical experience setting up secure VPCs in AWS. My primary goal is to contribute to SecureCloud's risk assessment team immediately.", resumeLink: "http://link.to/samir_resume.pdf" },
            { id: 5, candidate: 'Emily White', jobId: 102, jobTitle: 'Data Analyst Intern', company: 'DataStream', dateApplied: '2025-09-19T13:20:00Z', status: 'Pending Review', coverLetter: "I excel at translating complex quantitative findings into clear business narratives. I am proficient in SQL and R and am looking for an opportunity to grow in a fast-paced environment.", resumeLink: "http://link.to/emily_resume.pdf" },
        ];
        return { data: mockApps };
    },
    // Simulates updating application status
    post: async (url, data) => {
        await new Promise(resolve => setTimeout(resolve, 300));
        console.log(`[Mock API] Status update for App ID ${data.id}: ${data.newStatus}`);
        return { status: 200, data: { success: true } };
    }
};

// Mock useUserStore for a 'mentor' profile
const useUserStore = () => ({
    role: 'mentor',
    name: 'Dr. Evelyn Reed',
});

// --- Utility Functions ---

const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

const getStatusStyles = (status) => {
    switch (status) {
        case 'Approved':
            return 'bg-green-100 text-green-800 border-green-300';
        case 'Rejected':
            return 'bg-red-100 text-red-800 border-red-300';
        case 'Pending Review':
            return 'bg-yellow-100 text-yellow-800 border-yellow-300';
        default:
            return 'bg-gray-100 text-gray-800 border-gray-300';
    }
};

// --- Sub-Components ---

const ReviewModal = ({ isOpen, onClose, application, onStatusUpdate }) => {

    const [isUpdating, setIsUpdating] = useState(false);
    if (!isOpen || !application) return null;

    const handleAction = async (newStatus) => {
        setIsUpdating(true);
        // Simulate API call
        await onStatusUpdate(application.id, newStatus);
        setIsUpdating(false);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/80 bg-opacity-70 z-50 flex justify-center items-center p-4" onClick={onClose}>
            <div 
                className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto transform transition-all p-6"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-start border-b border-black/30 pb-3 mb-4">
                    <h2 className="text-2xl font-bold text-indigo-700">Review: {application.candidate}</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-3xl leading-none">&times;</button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <InfoCard title="Job Applied" value={`${application.jobTitle} at ${application.company}`} />
                    <InfoCard title="Date Applied" value={formatDate(application.dateApplied)} />
                    <InfoCard title="Current Status">
                        <span className={`px-3 py-1 inline-flex text-sm font-semibold rounded-full border ${getStatusStyles(application.status)}`}>
                            {application.status}
                        </span>
                    </InfoCard>
                </div>

                <div className="space-y-6">
                    {/* Cover Letter Section */}
                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <h3 className="text-xl font-bold text-gray-800 mb-2">Cover Letter</h3>
                        <p className="text-gray-700 whitespace-pre-wrap">{application.coverLetter}</p>
                    </div>

                    {/* Resume/Attachment Link */}
                    <div className="pt-4 border-t border-gray-100">
                        <a 
                            href={ "/portal/candidate/user_33NigBBN7Krn0ywvGBgS2n7de26"} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center space-x-2 text-indigo-600 hover:text-indigo-800 font-medium transition duration-150"
                        >
                            <span>View Profile</span>
                            <span className="text-lg">📄</span>
                        </a>
                    </div>

                    {/* Mentor Action Section */}
                    <div className="pt-6 border-t border-gray-100 flex justify-end space-x-4">
                        <button
                            onClick={() => handleAction('Rejected')}
                            disabled={isUpdating}
                            className="px-4 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition duration-150 disabled:bg-gray-400"
                        >
                            {isUpdating && application.status !== 'Rejected' ? 'Rejecting...' : 'Reject Application'}
                        </button>
                        <button
                            onClick={() => handleAction('Approved')}
                            disabled={isUpdating}
                            className="px-4 py-2 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition duration-150 disabled:bg-gray-400"
                        >
                            {isUpdating && application.status !== 'Approved' ? 'Approving...' : 'Approve Application'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const InfoCard = ({ title, value, children }) => (
    <div className="bg-white p-3 border border-gray-100 rounded-lg shadow-sm">
        <p className="text-xs font-semibold uppercase text-gray-500">{title}</p>
        {value && <p className="text-md font-medium text-gray-800 mt-1">{value}</p>}
        {children && <div className="mt-1">{children}</div>}
    </div>
);


// --- Main Component ---
const Postings = () => {
    const { name } = useUserStore();
    const [applications, setApplications] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedApplication, setSelectedApplication] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Initial Filter State (Reads from mock URL parameter)
    // Simulating the effect of a URL like '?jobId=101'
    const mockURLParams = new URLSearchParams('?jobId=');
    const initialJobId = mockURLParams.get('jobId');

    const [filters, setFilters] = useState({
        jobTitle: '',
        status: '',
    });

    // Effect to fetch data and apply URL filter on mount
    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const response = await apiClient.get('/applications/all');
                const fetchedApps = response.data;
                setApplications(fetchedApps);
                
                // --- URL Parameter Logic ---
                if (initialJobId) {
                    // Find the title for the initial jobId to pre-select the filter dropdown
                    const job = fetchedApps.find(app => String(app.jobId) === initialJobId);
                    if (job) {
                        setFilters(prev => ({ ...prev, jobTitle: job.jobTitle }));
                    }
                }
            } catch (error) {
                console.error("Error fetching applications:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchApplications();
    }, [initialJobId]);
    
    // Dynamically calculate filter options
    const { allJobTitles, allStatuses } = useMemo(() => {
        const jobTitles = [...new Set(applications.map(a => a.jobTitle))].sort();
        const statuses = [...new Set(applications.map(a => a.status))].sort();
        return { allJobTitles: jobTitles, allStatuses: statuses };
    }, [applications]);

    // Function to handle status update
    const handleStatusUpdate = async (appId, newStatus) => {
        try {
            await apiClient.post('/applications/updateStatus', { id: appId, newStatus });
            // Update local state to reflect the change
            setApplications(prev => prev.map(app => 
                app.id === appId ? { ...app, status: newStatus } : app
            ));
        } catch (error) {
            console.error("Failed to update status:", error);
        }
    };

    // Filtered Applications Logic
    const filteredApplications = useMemo(() => {
        return applications.filter(app => {
            // 1. Search Filter (Candidate Name)
            const matchesSearch = app.candidate.toLowerCase().includes(searchTerm.toLowerCase());
            if (!matchesSearch) return false;

            // 2. Job Title Filter
            const matchesJob = filters.jobTitle === '' || app.jobTitle === filters.jobTitle;
            if (!matchesJob) return false;

            // 3. Status Filter
            const matchesStatus = filters.status === '' || app.status === filters.status;
            if (!matchesStatus) return false;

            return true;
        });
    }, [applications, searchTerm, filters]);

    const handleOpenReview = (application) => {
        setSelectedApplication(application);
        setIsModalOpen(true);
    };

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    const clearFilters = () => {
        setFilters({ jobTitle: '', status: '' });
        setSearchTerm('');
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex justify-center items-center">
                <p className="text-xl font-medium text-indigo-600">Loading Applications for Mentor Dashboard...</p>
            </div>
        );
    }
    
    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            
            <header className="bg-white shadow-md sticky top-0 z-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <h1 className="text-3xl font-extrabold text-gray-900 flex items-center">
                        Application Review Hub
                    </h1>
                    <p className="text-md text-gray-500 mt-1">Review and manage candidate submissions for approval or rejection.</p>
                </div>
            </header>

            <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
                <div className="mb-6 p-4 bg-white rounded-xl shadow-lg border border-gray-100">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search candidate name..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full p-3 pl-12 text-lg border border-gray-300 rounded-xl focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                        />
                        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg">
                            <CiSearch className='text-2xl'/>
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    {/* Job Title Filter */}
                    <select
                        value={filters.jobTitle}
                        onChange={(e) => handleFilterChange('jobTitle', e.target.value)}
                        className="p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 col-span-2"
                    >
                        <option value="">Filter by Job Title (All)</option>
                        {allJobTitles.map(title => (
                            <option key={title} value={title}>{title}</option>
                        ))}
                    </select>

                    {/* Status Filter */}
                    <select
                        value={filters.status}
                        onChange={(e) => handleFilterChange('status', e.target.value)}
                        className="p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                    >
                        <option value="">Filter by Status (All)</option>
                        {allStatuses.map(status => (
                            <option key={status} value={status}>{status}</option>
                        ))}
                    </select>

                    {/* Clear Filters Button */}
                    <button 
                        onClick={clearFilters}
                        className="p-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition duration-150"
                    >
                        Clear Filters
                    </button>
                </div>
                
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    Showing {filteredApplications.length} Applications
                </h2>

                {filteredApplications.length === 0 ? (
                    <div className="text-center p-10 bg-white rounded-xl shadow-lg">
                        <p className="text-xl text-gray-600 font-medium">No applications match your current criteria.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto bg-white rounded-xl shadow-lg border border-gray-100">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Candidate</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job / Company</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Applied Date</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredApplications.map((app) => (
                                    <tr key={app.id} className="hover:bg-indigo-50 transition duration-100">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">{app.candidate}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-indigo-600">{app.jobTitle}</div>
                                            <div className="text-xs text-gray-500">{app.company}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                                            <div className="text-sm text-gray-600">{formatDate(app.dateApplied)}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border ${getStatusStyles(app.status)}`}>
                                                {app.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button 
                                                onClick={() => handleOpenReview(app)}
                                                className="text-indigo-600 hover:text-indigo-900 font-semibold transition duration-150"
                                            >
                                                Review
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </main>

            {/* Application Review Modal */}
            <ReviewModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                application={selectedApplication}
                onStatusUpdate={handleStatusUpdate}
            />
        </div>
    );
};

export default Postings;
