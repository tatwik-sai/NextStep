"use client"
import React, { useState, useMemo, useEffect } from 'react';

// --- MOCKED EXTERNAL DEPENDENCIES & DATA ---
const useUserStore = () => ({
    role: 'recruiter', 
    name: 'Sarah Chen, Recruiting Lead',
    email: 'sarah.chen@placement.edu',
});

// Mock Data for Applications (Pipeline)
const mockApplications = [
    { id: 1, candidate: 'Alex Johnson', jobId: 101, jobTitle: 'Frontend Dev Intern', company: 'Google', dateApplied: '2025-09-15', status: 'Pending Review', coverLetter: "Passionate about React; built a dynamic e-commerce site using Next.js and Tailwind. Ready to focus on scalable frontend solutions.", profileLink: "https://linkedin.com/in/alexj" },
    { id: 2, candidate: 'Maria Garcia', jobId: 102, jobTitle: 'Data Analyst Intern', company: 'Amazon', dateApplied: '2025-09-16', status: 'Pending Review', coverLetter: "Strong background in statistics and Python for data visualization. Eager to apply ML models to real-world datasets.", profileLink: "https://github.com/mariag" },
    { id: 3, candidate: 'John Doe', jobId: 101, jobTitle: 'Frontend Dev Intern', company: 'Google', dateApplied: '2025-09-15', status: 'Scheduled Interview', interviewTime: '2025-09-29T10:00:00Z', interviewType: 'Technical', coverLetter: "Coming from a C++ background, I've spent six months aggressively learning the modern JS ecosystem, focusing on React Hooks.", profileLink: "https://github.com/johndoe" },
    { id: 4, candidate: 'Samir Khan', jobId: 103, jobTitle: 'Cloud Security Intern', company: 'Microsoft', dateApplied: '2025-09-18', status: 'Rejected', coverLetter: "Hold CompTIA Security+ certification and have practical experience setting up secure VPCs in AWS.", profileLink: "https://linkedin.com/in/samirk" },
    { id: 5, candidate: 'Emily White', jobId: 102, jobTitle: 'Data Analyst Intern', company: 'Amazon', dateApplied: '2025-09-19', status: 'Pending Review', coverLetter: "I excel at translating complex quantitative findings into clear business narratives. Proficient in SQL and R.", profileLink: "https://linkedin.com/in/emilyw" },
];

// Mock Data for Active Interns (Management)
const mockInterns = [
    { id: 10, candidate: 'Jessica Lee', jobId: 104, jobTitle: 'Mobile UX/UI Designer', company: 'Apple', startDate: '2025-07-01', status: 'Active Internship', lastReview: '2025-08-30' },
    { id: 11, candidate: 'David Kim', jobId: 105, jobTitle: 'Embedded Systems Engineer', company: 'Tesla', startDate: '2025-08-15', status: 'Review Due', lastReview: 'N/A' },
    { id: 12, candidate: 'Nina Patel', jobId: 106, jobTitle: 'Marketing Content Specialist', company: 'Netflix', startDate: '2025-09-01', status: 'Active Internship', lastReview: 'N/A' },
];

// Updated mockJobs list reflecting external company placements
const mockJobs = [
    { jobId: 101, title: 'Frontend Dev Intern', company: 'Google' },
    { jobId: 102, title: 'Data Analyst Intern', company: 'Amazon' },
    { jobId: 103, title: 'Cloud Security Intern', company: 'Microsoft' },
    { jobId: 104, title: 'Mobile UX/UI Designer', company: 'Apple' },
    { jobId: 105, title: 'Embedded Systems Engineer', company: 'Tesla' },
    { jobId: 106, title: 'Marketing Content Specialist', company: 'Netflix' },
];


// --- Utility Functions ---

const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

const getStatusStyles = (status) => {
    switch (status) {
        case 'Approved':
        case 'Active Internship':
            return 'bg-green-100 text-green-800 border-green-300';
        case 'Rejected':
        case 'Internship Ended':
            return 'bg-red-100 text-red-800 border-red-300';
        case 'Scheduled Interview':
        case 'Review Due':
            return 'bg-blue-100 text-blue-800 border-blue-300';
        case 'Pending Review':
            return 'bg-yellow-100 text-yellow-800 border-yellow-300';
        default:
            return 'bg-gray-100 text-gray-800 border-gray-300';
    }
};

// Mock API client for demo actions
const apiClient = {
    updateStatus: async (id, newStatus, scheduledTime = null) => {
        await new Promise(resolve => setTimeout(resolve, 500));
        console.log(`[API MOCK] Updated App ID ${id} to status: ${newStatus}${scheduledTime ? ` at ${scheduledTime}` : ''}`);
        return { success: true };
    },
    logAction: async (id, actionType, notes) => {
        await new Promise(resolve => setTimeout(resolve, 500));
        console.log(`[API MOCK] Internship Action for ID ${id} (${actionType}): ${notes}`);
        return { success: true };
    }
};

// --- Sub-Components ---

const InfoCard = ({ title, value, children }) => (
    <div className="bg-white p-3 border border-gray-100 rounded-lg shadow-sm">
        <p className="text-xs font-semibold uppercase text-gray-500">{title}</p>
        {value && <p className="text-md font-medium text-gray-800 mt-1">{value}</p>}
        {children && <div className="mt-1">{children}</div>}
    </div>
);

const CandidateDetailsModal = ({ isOpen, onClose, application, onStatusUpdate }) => {

    const [isUpdating, setIsUpdating] = useState(false);
    const [scheduleTime, setScheduleTime] = useState('');
    const [action, setAction] = useState(null); // 'approve', 'reject', or 'schedule'
        if (!isOpen || !application) return null;

    const handleAction = async () => {
        if (!action) return;

        setIsUpdating(true);
        let newStatus = action === 'schedule' ? 'Scheduled Interview' : action === 'approve' ? 'Approved' : 'Rejected';
        let scheduled = action === 'schedule' ? scheduleTime : null;

        if (action === 'schedule' && !scheduleTime) {
            alert("Please select a time for the interview.");
            setIsUpdating(false);
            return;
        }

        try {
            await onStatusUpdate(application.id, newStatus, scheduled);
            onClose();
        } catch (error) {
            console.error("Failed to update status:", error);
        } finally {
            setIsUpdating(false);
        }
    };

    const StatusDisplay = () => (
        <span className={`px-3 py-1 inline-flex text-sm font-semibold rounded-full border ${getStatusStyles(application.status)}`}>
            {application.status}
            {application.status === 'Scheduled Interview' && application.interviewTime && (
                <span className="ml-2 text-xs">@ {new Date(application.interviewTime).toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit'})}</span>
            )}
        </span>
    );

    return (
        <div className="fixed inset-0 bg-black/80 bg-opacity-70 z-50 flex justify-center items-center p-4" onClick={onClose}>
            <div 
                className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto transform transition-all p-8"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-start border-b pb-3 mb-6">
                    <h2 className="text-3xl font-bold text-indigo-700">Review: {application.candidate}</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-3xl leading-none">&times;</button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                    <InfoCard title="Job Applied" value={application.jobTitle} />
                    <InfoCard title="Company" value={application.company} />
                    <InfoCard title="Applied Date" value={formatDate(application.dateApplied)} />
                    <InfoCard title="Current Status"><StatusDisplay /></InfoCard>
                </div>

                <div className="space-y-6">
                    {/* Cover Letter Section */}
                    <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                        <h3 className="text-xl font-bold text-indigo-800 mb-3">Cover Letter / Motivation</h3>
                        <p className="text-gray-700 whitespace-pre-wrap">{application.coverLetter}</p>
                    </div>

                    {/* Profile Link */}
                    <div className="pt-4 border-t border-gray-100">
                        <a 
                            href={ "/portal/candidate/user_33NigBBN7Krn0ywvGBgS2n7de26"} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center space-x-2 text-indigo-600 hover:text-indigo-800 font-medium transition duration-150"
                        >
                            <span>View Profile</span>
                        </a>
                    </div>

                    {/* Mentor Action Section */}
                    <div className="pt-6 border-t border-gray-100">
                        <h3 className="text-xl font-bold text-gray-800 mb-4">Mentor Action</h3>
                        <div className="flex flex-col space-y-3">
                            {/* Radio Buttons for Action Type */}
                            <div className="flex space-x-6">
                                <label className="flex items-center space-x-2">
                                    <input type="radio" name="action" value="approve" checked={action === 'approve'} onChange={() => setAction('approve')} className="h-4 w-4 text-green-600" />
                                    <span className="text-gray-700 font-medium">Approve (Shortlist)</span>
                                </label>
                                <label className="flex items-center space-x-2">
                                    <input type="radio" name="action" value="reject" checked={action === 'reject'} onChange={() => setAction('reject')} className="h-4 w-4 text-red-600" />
                                    <span className="text-gray-700 font-medium">Reject Application</span>
                                </label>
                                <label className="flex items-center space-x-2">
                                    <input type="radio" name="action" value="schedule" checked={action === 'schedule'} onChange={() => setAction('schedule')} className="h-4 w-4 text-blue-600" />
                                    <span className="text-gray-700 font-medium">Schedule Interview</span>
                                </label>
                            </div>
                            
                            {/* Schedule Time Picker (Only visible if 'schedule' is selected) */}
                            {action === 'schedule' && (
                                <div className="mt-3 flex items-center space-x-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                                    <label htmlFor="scheduleTime" className="font-medium text-gray-700">Select Date & Time:</label>
                                    <input
                                        id="scheduleTime"
                                        type="datetime-local"
                                        value={scheduleTime}
                                        onChange={(e) => setScheduleTime(e.target.value)}
                                        required
                                        className="p-2 border border-gray-300 rounded-lg"
                                    />
                                </div>
                            )}

                            {/* Execute Button */}
                            <button
                                onClick={handleAction}
                                disabled={!action || isUpdating || (action === 'schedule' && !scheduleTime)}
                                className="w-full mt-4 py-3 rounded-lg font-semibold transition duration-150 shadow-lg text-white 
                                    bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400"
                            >
                                {isUpdating ? 'Processing...' : `Execute Action: ${action ? action.toUpperCase() : 'Select Action'}`}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const InternshipActionModal = ({ isOpen, onClose, intern, onAction }) => {

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [notes, setNotes] = useState('');
    const [actionType, setActionType] = useState('review'); // 'review' or 'end'
        if (!isOpen || !intern) return null;

    const handleAction = async () => {
        setIsSubmitting(true);
        try {
            await onAction(intern.id, actionType, notes);
            onClose();
        } catch (error) {
            console.error("Failed to execute internship action:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/80 bg-opacity-70 z-50 flex justify-center items-center p-4" onClick={onClose}>
            <div 
                className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto transform transition-all p-8"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-start border-b pb-3 mb-6">
                    <h2 className="text-2xl font-bold text-purple-700">Action: {intern.candidate}</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-3xl leading-none">&times;</button>
                </div>

                <InfoCard title="Internship" value={`${intern.jobTitle} at ${intern.company}`} />
                <div className="grid grid-cols-2 gap-4 my-4">
                    <InfoCard title="Start Date" value={formatDate(intern.startDate)} />
                    <InfoCard title="Last Review" value={intern.lastReview ? formatDate(intern.lastReview) : 'None'} />
                </div>

                <div className="pt-4 border-t border-gray-100 space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800">Select Action</h3>
                    <div className="flex space-x-6">
                        <label className="flex items-center space-x-2">
                            <input type="radio" name="internAction" value="review" checked={actionType === 'review'} onChange={() => setActionType('review')} className="h-4 w-4 text-green-600" />
                            <span className="text-gray-700 font-medium">Log Feedback/Review</span>
                        </label>
                        <label className="flex items-center space-x-2">
                            <input type="radio" name="internAction" value="end" checked={actionType === 'end'} onChange={() => setActionType('end')} className="h-4 w-4 text-red-600" />
                            <span className="text-gray-700 font-medium">End Internship</span>
                        </label>
                    </div>

                    <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                        {actionType === 'review' ? 'Review/Feedback Notes (Mandatory)' : 'Reason for Ending Internship (Mandatory)'}
                    </label>
                    <textarea
                        id="notes"
                        rows="4"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder={actionType === 'review' ? "Enter detailed feedback on performance, areas of improvement, and next steps." : "Provide reasons for termination or successful completion."}
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                    ></textarea>

                    <button
                        onClick={handleAction}
                        disabled={isSubmitting || !notes.trim()}
                        className="w-full mt-4 py-3 rounded-lg font-semibold transition duration-150 shadow-lg text-white 
                            bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400"
                    >
                        {isSubmitting ? 'Submitting...' : `Confirm ${actionType === 'review' ? 'Review' : 'End Internship'}`}
                    </button>
                </div>
            </div>
        </div>
    );
};

// --- Main Dashboard Components ---

const ApplicationPipeline = ({ apps, onOpenReview, onStatusUpdate, allJobs }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [jobFilter, setJobFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');

    const allJobTitles = useMemo(() => [...new Set(allJobs.map(j => j.title))].sort(), [allJobs]);
    const allStatuses = useMemo(() => [...new Set(apps.map(a => a.status))].sort(), [apps]);

    const filteredApps = useMemo(() => {
        return apps.filter(app => {
            const matchesSearch = app.candidate.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesJob = jobFilter === '' || app.jobTitle === jobFilter;
            const matchesStatus = statusFilter === '' || app.status === statusFilter;
            return matchesSearch && matchesJob && matchesStatus;
        });
    }, [apps, searchTerm, jobFilter, statusFilter]);

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <input
                    type="text"
                    placeholder="Search candidate name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 md:col-span-2"
                />
                <select
                    value={jobFilter}
                    onChange={(e) => setJobFilter(e.target.value)}
                    className="p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                >
                    <option value="">Filter by Job (All)</option>
                    {allJobTitles.map(title => <option key={title} value={title}>{title}</option>)}
                </select>
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                >
                    <option value="">Filter by Status (All)</option>
                    {allStatuses.map(status => <option key={status} value={status}>{status}</option>)}
                </select>
            </div>

            <p className="text-gray-600 font-medium">Showing {filteredApps.length} results</p>

            {/* Application Table */}
            <div className="overflow-x-auto bg-white rounded-xl shadow-lg border border-gray-100">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Candidate</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job / Company</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Applied</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Review</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredApps.map((app) => (
                            <tr key={app.id} className="hover:bg-indigo-50 transition duration-100">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">{app.candidate}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-indigo-600">{app.jobTitle}</div>
                                    {/* <div className="text-xs text-gray-500">{app.company}</div> */}
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
                                        onClick={() => onOpenReview(app)}
                                        className="text-indigo-600 hover:text-indigo-900 font-semibold transition duration-150"
                                    >
                                        Review/Action
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const InternshipManagement = ({ interns, onOpenAction, allJobs }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [jobFilter, setJobFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    
    // Statuses specific to management
    const allStatuses = ['Active Internship', 'Review Due', 'Internship Ended'];
    const allJobTitles = useMemo(() => [...new Set(allJobs.map(j => j.title))].sort(), [allJobs]);


    const filteredInterns = useMemo(() => {
        return interns.filter(intern => {
            const matchesSearch = intern.candidate.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesJob = jobFilter === '' || intern.jobTitle === jobFilter;
            const matchesStatus = statusFilter === '' || intern.status === statusFilter;
            return matchesSearch && matchesJob && matchesStatus;
        });
    }, [interns, searchTerm, jobFilter, statusFilter]);

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <input
                    type="text"
                    placeholder="Search intern name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="p-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 md:col-span-2"
                />
                <select
                    value={jobFilter}
                    onChange={(e) => setJobFilter(e.target.value)}
                    className="p-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                >
                    <option value="">Filter by Job (All)</option>
                    {allJobTitles.map(title => <option key={title} value={title}>{title}</option>)}
                </select>
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="p-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                >
                    <option value="">Filter by Status (All)</option>
                    {allStatuses.map(status => <option key={status} value={status}>{status}</option>)}
                </select>
            </div>
            
            <p className="text-gray-600 font-medium">Showing {filteredInterns.length} results</p>

            {/* Interns Table */}
            <div className="overflow-x-auto bg-white rounded-xl shadow-lg border border-gray-100">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Candidate</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Internship Role</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Start Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredInterns.map((intern) => (
                            <tr key={intern.id} className="hover:bg-purple-50 transition duration-100">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">{intern.candidate}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-purple-600">{intern.jobTitle}</div>
                                    {/* <div className="text-xs text-gray-500">{intern.company}</div> */}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                                    <div className="text-sm text-gray-600">{formatDate(intern.startDate)}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border ${getStatusStyles(intern.status)}`}>
                                        {intern.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button 
                                        onClick={() => onOpenAction(intern)}
                                        className="text-purple-600 hover:text-purple-900 font-semibold transition duration-150"
                                    >
                                        Manage
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};


// --- Main App Component ---
const Postings = () => {
    const { name } = useUserStore();
    const [applications, setApplications] = useState(mockApplications);
    const [interns, setInterns] = useState(mockInterns);
    const [currentTab, setCurrentTab] = useState('pipeline'); // 'pipeline' or 'interns'

    // State for Modals
    const [selectedApplication, setSelectedApplication] = useState(null);
    const [isAppModalOpen, setIsAppModalOpen] = useState(false);
    const [selectedIntern, setSelectedIntern] = useState(null);
    const [isInternModalOpen, setIsInternModalOpen] = useState(false);
    

    // Handler for Application Pipeline actions (Approve, Reject, Schedule)
    const handleApplicationStatusUpdate = async (appId, newStatus, scheduledTime = null) => {
        const success = await apiClient.updateStatus(appId, newStatus, scheduledTime);
        
        if (success) {
            setApplications(prev => prev.map(app => {
                if (app.id === appId) {
                    return { ...app, status: newStatus, interviewTime: scheduledTime };
                }
                return app;
            }));
            if (newStatus === 'Approved') {
                 // In a real app, 'Approved' would usually mean moving them to the Interns list or a final stage list.
                 // For this demo, we just update the status.
                 alert(`Successfully approved ${applications.find(a => a.id === appId).candidate}.`);
            }
        }
    };
    
    const handleInternshipAction = async (internId, actionType, notes) => {
        const success = await apiClient.logAction(internId, actionType, notes);

        if (success) {
            setInterns(prev => prev.map(intern => {
                if (intern.id === internId) {
                    if (actionType === 'review') {
                        return { ...intern, status: 'Active Internship', lastReview: new Date().toISOString() };
                    } else if (actionType === 'end') {
                        return { ...intern, status: 'Internship Ended' };
                    }
                }
                return intern;
            }));
             alert(`Successfully completed action: ${actionType.toUpperCase()} for intern ID ${internId}.`);
        }
    };

    const handleOpenReview = (app) => {
        setSelectedApplication(app);
        setIsAppModalOpen(true);
    };

    const handleOpenInternAction = (intern) => {
        setSelectedIntern(intern);
        setIsInternModalOpen(true);
    };

    const TabButton = ({ id, name }) => (
        <button
            onClick={() => setCurrentTab(id)}
            className={`px-6 py-3 text-lg font-semibold transition-all duration-200 rounded-t-lg ${
                currentTab === id
                    ? 'bg-white text-indigo-700 shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
        >
            {name}
        </button>
    );

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <header className="bg-white shadow-md sticky top-0 z-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <h1 className="text-3xl font-extrabold text-gray-900 flex items-center">
                        Application Management
                    </h1>
                    <p className="text-md text-gray-500 mt-1">Manage and review job applications and internships.</p>
                </div>
            </header>


            <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
                
                {/* Tab Navigation */}
                <div className="flex space-x-2 border-b border-gray-300 mb-6">
                    <TabButton id="pipeline" name="Application Pipeline" />
                    <TabButton id="interns" name="Internship Management" />
                </div>

                {/* Tab Content */}
                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 min-h-[600px]">
                    {currentTab === 'pipeline' ? (
                        <ApplicationPipeline 
                            apps={applications} 
                            onOpenReview={handleOpenReview}
                            onStatusUpdate={handleApplicationStatusUpdate}
                            allJobs={mockJobs}
                        />
                    ) : (
                        <InternshipManagement 
                            interns={interns} 
                            onOpenAction={handleOpenInternAction}
                            allJobs={mockJobs}
                        />
                    )}
                </div>
            </main>

            {/* Modals */}
            <CandidateDetailsModal
                isOpen={isAppModalOpen}
                onClose={() => setIsAppModalOpen(false)}
                application={selectedApplication}
                onStatusUpdate={handleApplicationStatusUpdate}
            />
            
            <InternshipActionModal
                isOpen={isInternModalOpen}
                onClose={() => setIsInternModalOpen(false)}
                intern={selectedIntern}
                onAction={handleInternshipAction}
            />

        </div>
    );
};

export default Postings;
