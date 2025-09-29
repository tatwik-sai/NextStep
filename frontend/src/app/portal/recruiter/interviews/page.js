"use client"
import React, { useState, useMemo, useEffect } from 'react';

// --- MOCKED EXTERNAL DEPENDENCIES & DATA ---

// Mock User Store (Recruiter/Mentor)
const useUserStore = () => ({
    role: 'recruiter', 
    name: 'Sarah Chen, Recruiting Lead',
    email: 'sarah.chen@placement.edu',
});

// Mock Interview Data (Today is assumed to be September 28, 2025, for demonstration)
const mockInterviews = [
    { id: 1, candidate: 'Alex Johnson', jobId: 101, jobTitle: 'Frontend Dev Intern (Google)', company: 'Google', interviewer: 'Dev Team Lead', interviewTime: '2025-09-28T09:30:00Z', durationMinutes: 60, status: 'Scheduled', type: 'Technical', joinLink: 'https://meet.google.com/abc-defg-hij' },
    { id: 2, candidate: 'Maria Garcia', jobId: 102, jobTitle: 'Data Analyst Intern (Amazon)', company: 'Amazon', interviewer: 'Data Science Manager', interviewTime: '2025-09-28T11:00:00Z', durationMinutes: 45, status: 'Completed', type: 'Behavioral', joinLink: 'https://zoom.us/j/1234567890' },
    { id: 3, candidate: 'John Doe', jobId: 101, jobTitle: 'Frontend Dev Intern (Google)', company: 'Google', interviewer: 'Recruiting Coordinator', interviewTime: '2025-09-28T14:00:00Z', durationMinutes: 30, status: 'Scheduled', type: 'HR Screening', joinLink: 'https://meet.google.com/klm-nopq-rst' },
    { id: 4, candidate: 'Samir Khan', jobId: 103, jobTitle: 'Cloud Security Intern (Microsoft)', company: 'Microsoft', interviewer: 'Security Architect', interviewTime: '2025-09-28T15:15:00Z', durationMinutes: 30, status: 'Rescheduled', type: 'Technical', joinLink: 'https://teams.microsoft.com/l/meetup-join/...' },
    { id: 5, candidate: 'Emily White', jobId: 102, jobTitle: 'Data Analyst Intern (Amazon)', company: 'Amazon', interviewer: 'Data Science Manager', interviewTime: '2025-09-28T16:00:00Z', durationMinutes: 60, status: 'Scheduled', type: 'Technical', joinLink: 'https://zoom.us/j/9876543210' },
    // Example of a scheduled interview for tomorrow
    { id: 6, candidate: 'Jessica Lee', jobId: 104, jobTitle: 'Mobile UX/UI Design (Apple)', company: 'Apple', interviewer: 'Design Lead', interviewTime: '2025-09-29T10:30:00Z', durationMinutes: 45, status: 'Scheduled', type: 'Portfolio Review', joinLink: 'https://meet.google.com/uvw-xyza-bc' },
];

const mockJobs = [
    { jobId: 101, title: 'Frontend Dev Intern (Google)' },
    { jobId: 102, title: 'Data Analyst Intern (Amazon)' },
    { jobId: 103, title: 'Cloud Security Intern (Microsoft)' },
    { jobId: 104, title: 'Mobile UX/UI Design (Apple)' },
];

// Mock API client for demo actions
const apiClient = {
    fetchInterviews: async () => {
        await new Promise(resolve => setTimeout(resolve, 300));
        return { data: mockInterviews };
    },
    updateInterview: async (data) => {
        await new Promise(resolve => setTimeout(resolve, 500));
        console.log(`[API MOCK] Updated Interview ID ${data.id} to status: ${data.status}`);
        return { success: true };
    }
};

// --- Utility Functions ---

const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

const formatTime = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
};

const getStatusStyles = (status) => {
    switch (status) {
        case 'Scheduled':
            return 'bg-indigo-100 text-indigo-800 border-indigo-300';
        case 'Completed':
            return 'bg-green-100 text-green-800 border-green-300';
        case 'Cancelled':
            return 'bg-red-100 text-red-800 border-red-300';
        case 'Rescheduled':
            return 'bg-yellow-100 text-yellow-800 border-yellow-300';
        default:
            return 'bg-gray-100 text-gray-800 border-gray-300';
    }
};

// --- Sub-Components ---

const InterviewDetailsModal = ({ isOpen, onClose, interview, onStatusUpdate }) => {

    const [newStatus, setNewStatus] = useState(interview?.status);
    const [isUpdating, setIsUpdating] = useState(false);
        if (!isOpen || !interview) return null;

    const isJoinDisabled = ['Completed', 'Cancelled', 'Rescheduled'].includes(interview.status);

    const handleUpdate = async () => {
        setIsUpdating(true);
        try {
            await apiClient.updateInterview({ id: interview.id, status: newStatus });
            onStatusUpdate(interview.id, newStatus);
            onClose();
        } catch (error) {
            console.error("Failed to update interview status:", error);
            // Replaced alert() with a console error and prompt, as per instructions
            console.warn("Operation failed: Could not update status.");
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/80 bg-opacity-70 z-50 flex justify-center items-center p-4" onClick={onClose}>
            <div 
                className="bg-white rounded-xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto transform transition-all p-8"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-start border-b pb-3 mb-6">
                    <h2 className="text-2xl font-bold text-indigo-700">Interview Details</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-3xl leading-none">&times;</button>
                </div>

                {/* Join Button (Primary Action) */}
                <a 
                    href={interview.joinLink || '#'} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    onClick={(e) => {
                        if (isJoinDisabled) e.preventDefault();
                    }}
                    className={`w-full flex items-center justify-center space-x-2 py-3 mb-6 rounded-lg font-extrabold text-lg transition duration-150 shadow-md 
                               ${isJoinDisabled ? 'bg-gray-400 text-gray-700 cursor-not-allowed' : 'bg-green-600 text-white hover:bg-green-700'}`}
                >
                    <span>{isJoinDisabled ? `Meeting ${interview.status}` : 'Join Interview Now'}</span>
                </a>

                <div className="space-y-4">
                    <p><span className="font-semibold text-gray-700">Candidate:</span> {interview.candidate}</p>
                    <p><span className="font-semibold text-gray-700">Role:</span> {interview.jobTitle}</p>
                    <p><span className="font-semibold text-gray-700">Interviewer:</span> {interview.interviewer}</p>
                    <p><span className="font-semibold text-gray-700">Time:</span> {formatDate(interview.interviewTime)} at {formatTime(interview.interviewTime)} ({interview.durationMinutes} mins)</p>
                    <p><span className="font-semibold text-gray-700">Interview Type:</span> <span className="text-sm px-2 py-0.5 bg-gray-200 rounded-full">{interview.type}</span></p>
                    
                    <div className="pt-4 border-t border-gray-100">
                        <h3 className="text-xl font-bold text-gray-800 mb-3">Update Status</h3>
                        <div className="flex items-center space-x-3">
                            <select
                                value={newStatus}
                                onChange={(e) => setNewStatus(e.target.value)}
                                className="p-2 border border-gray-300 rounded-lg"
                            >
                                {['Scheduled', 'Completed', 'Cancelled', 'Rescheduled'].map(status => (
                                    <option key={status} value={status}>{status}</option>
                                ))}
                            </select>
                            <button
                                onClick={handleUpdate}
                                disabled={isUpdating || newStatus === interview.status}
                                className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition disabled:opacity-50"
                            >
                                {isUpdating ? 'Saving...' : 'Save Status'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const InterviewList = ({ interviews, onOpenDetails, allJobs }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [jobFilter, setJobFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');

    const allJobTitles = useMemo(() => [...new Set(allJobs.map(j => j.title))].sort(), [allJobs]);
    const allStatuses = useMemo(() => [...new Set(interviews.map(i => i.status))].sort(), [interviews]);

    const filteredInterviews = useMemo(() => {
        return interviews.filter(i => {
            const matchesSearch = i.candidate.toLowerCase().includes(searchTerm.toLowerCase()) || 
                                  i.interviewer.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesJob = jobFilter === '' || i.jobTitle === jobFilter;
            const matchesStatus = statusFilter === '' || i.status === statusFilter;
            return matchesSearch && matchesJob && matchesStatus;
        }).sort((a, b) => new Date(a.interviewTime) - new Date(b.interviewTime));
    }, [interviews, searchTerm, jobFilter, statusFilter]);

    return (
        <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">All Scheduled Interviews</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <input
                    type="text"
                    placeholder="Search candidate or interviewer..."
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

            <p className="text-gray-600 font-medium">Showing {filteredInterviews.length} results</p>

            <div className="overflow-x-auto bg-white rounded-xl shadow-lg border border-gray-100">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time / Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Candidate / Role</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Interviewer</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredInterviews.map((interview) => (
                            <tr key={interview.id} className="hover:bg-indigo-50 transition duration-100">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">{formatTime(interview.interviewTime)}</div>
                                    <div className="text-xs text-gray-500">{formatDate(interview.interviewTime)}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-indigo-600">{interview.candidate}</div>
                                    <div className="text-xs text-gray-500">{interview.jobTitle}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-600">{interview.interviewer}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border ${getStatusStyles(interview.status)}`}>
                                        {interview.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button 
                                        onClick={() => onOpenDetails(interview)}
                                        className="text-indigo-600 hover:text-indigo-900 font-semibold transition duration-150"
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

const InterviewTimetable = ({ interviews, onOpenDetails }) => {
    // Timetable configuration
    const startHour = 8; // 8:00 AM
    const endHour = 18;  // 6:00 PM (18:00)
    const totalSlots = endHour - startHour; // 10 hours

    // We use a mock date for "today" (Sept 28, 2025)
    const today = '2025-09-28';

    // Filter interviews scheduled for today
    const interviewsToday = useMemo(() => {
        return interviews.filter(i => i.interviewTime && i.interviewTime.startsWith(today));
    }, [interviews]);

    // Calculate positioning for each interview event
    const positionedInterviews = useMemo(() => {
        return interviewsToday.map(interview => {
            const time = new Date(interview.interviewTime);
            
            // Calculate minutes offset from startHour (8:00 AM)
            const interviewTimeUTC = new Date(interview.interviewTime);
            const startOfDayUTC = new Date(today + 'T08:00:00Z');
            
            const offsetMs = interviewTimeUTC.getTime() - startOfDayUTC.getTime();
            const offsetMinutes = offsetMs / (1000 * 60);

            // Total minutes in the schedule (10 hours * 60 mins = 600 minutes)
            const totalScheduleMinutes = totalSlots * 60;
            
            // Calculate top position percentage
            const top = (offsetMinutes / totalScheduleMinutes) * 100;
            
            // Calculate height percentage
            const height = (interview.durationMinutes / totalScheduleMinutes) * 100;

            return {
                ...interview,
                top: `${top}%`,
                height: `${height}%`,
            };
        }).filter(item => {
            // Filter out events that fall completely outside the 8 AM - 6 PM window
            const topVal = parseFloat(item.top);
            const heightVal = parseFloat(item.height);
            return topVal >= 0 && topVal + heightVal <= 100;
        });
    }, [interviewsToday, totalSlots]);


    // Generate time labels (8:00 AM, 9:00 AM, ..., 5:00 PM)
    const timeSlots = Array.from({ length: totalSlots + 1 }, (_, i) => {
        const hour = startHour + i;
        const displayHour = hour > 12 ? hour - 12 : hour;
        const ampm = hour >= 12 && hour < 24 ? (hour >= 12 && hour < 13 ? 'PM' : 'PM') : 'AM';
        return `${displayHour}:00 ${ampm}`;
    });

    return (
        <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-800">Todays Schedule ({formatDate(today)})</h3>
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                <div className="text-center p-4 bg-indigo-50 border border-indigo-200 rounded-lg mb-4">
                    <p className="text-xl font-bold text-indigo-700">
                        {interviewsToday.length} Interviews Scheduled Today
                    </p>
                </div>

                <div className="flex relative">
                    {/* Time Axis (Left Side) */}
                    <div className="w-1/6 pr-2 pt-2 flex flex-col justify-start">
                        {timeSlots.map((time, index) => (
                            <div key={index} className="h-[64px] text-right text-sm text-gray-500 font-medium">
                                {time}
                            </div>
                        ))}
                    </div>

                    {/* Timeline Grid (Right Side) */}
                    <div className="w-5/6 relative border-l border-gray-200">
                        {/* Hourly Lines (10 lines for 10 hours) */}
                        {Array.from({ length: totalSlots }, (_, i) => (
                            <div 
                                key={`line-${i}`}
                                className="absolute w-full border-b border-gray-200"
                                style={{ top: `${(i + 1) / totalSlots * 100}%`, height: '0' }}
                            ></div>
                        ))}

                        {/* Interview Events */}
                        <div className="relative h-[650px] px-2 pt-2 pb-5"> {/* Increased height and adjusted padding */}
                            {positionedInterviews.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => onOpenDetails(item)}
                                    style={{
                                        top: item.top,
                                        height: item.height,
                                        minHeight: '30px' // Ensure visibility for short events
                                    }}
                                    className={`absolute w-[95%] p-2 rounded-lg transition-all duration-100 shadow-md overflow-hidden text-left cursor-pointer
                                                bg-indigo-600 hover:bg-indigo-700 text-white border-4 border-white text-xs font-semibold`}
                                    title={`${item.candidate} - ${formatTime(item.interviewTime)}`}
                                >
                                    <div className="truncate text-sm font-bold">{item.candidate}</div>
                                    <div className="truncate text-xs">{item.jobTitle}</div>
                                    <div className="truncate text-xs font-normal opacity-90">{item.interviewer}</div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


// --- Main App Component ---
const Postings = () => {
    const { name } = useUserStore();
    const [interviews, setInterviews] = useState([]);
    const [currentTab, setCurrentTab] = useState('timetable'); // 'timetable' or 'list'

    // State for Modals
    const [selectedInterview, setSelectedInterview] = useState(null);
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    
    // Fetch interviews on mount
    useEffect(() => {
        const fetchInterviews = async () => {
            const response = await apiClient.fetchInterviews();
            setInterviews(response.data);
        };
        fetchInterviews();
    }, []);

    // Handler for updating status in state after API call
    const handleInterviewStatusUpdate = (id, newStatus) => {
        setInterviews(prev => prev.map(i => i.id === id ? { ...i, status: newStatus } : i));
    };

    const handleOpenDetails = (interview) => {
        setSelectedInterview(interview);
        setIsDetailsModalOpen(true);
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
                        Interview Management
                    </h1>
                    <p className="text-md text-gray-500 mt-1">Manage and review candidate interviews.</p>
                </div>
            </header>


            <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
                
                {/* Tab Navigation */}
                <div className="flex space-x-2 border-b border-gray-300 mb-6">
                    <TabButton id="timetable" name="Today's Timetable" />
                    <TabButton id="list" name="All Interviews List" />
                </div>

                {/* Tab Content */}
                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 min-h-[600px]">
                    {currentTab === 'timetable' ? (
                        <InterviewTimetable 
                            interviews={interviews} 
                            onOpenDetails={handleOpenDetails}
                        />
                    ) : (
                        <InterviewList 
                            interviews={interviews} 
                            onOpenDetails={handleOpenDetails}
                            allJobs={mockJobs}
                        />
                    )}
                </div>
            </main>

            {/* Modals */}
            <InterviewDetailsModal
                isOpen={isDetailsModalOpen}
                onClose={() => setIsDetailsModalOpen(false)}
                interview={selectedInterview}
                onStatusUpdate={handleInterviewStatusUpdate}
            />

        </div>
    );
};

export default Postings;
