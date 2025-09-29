"use client"
import React, { useState, useMemo, useEffect } from 'react';
import { CiSearch } from 'react-icons/ci';

// --- MOCKED EXTERNAL DEPENDENCIES (To address unresolved path errors and simulate backend) ---

// Mock Interview Data (Note: Dates are set relative to a mock current date of 2025-09-28)
const mockInterviews = [
    { id: 201, applicantName: 'Alice Johnson', jobTitle: 'Frontend Dev Internship', company: 'InnovateX', interviewer: 'Emily Chen', status: 'Scheduled', scheduledTime: '2025-09-28T11:00:00Z' }, 
    { id: 202, applicantName: 'Bob Smith', jobTitle: 'Data Analyst Intern', company: 'DataStream', interviewer: 'David Lee', status: 'Completed - Hired', scheduledTime: '2025-09-27T14:30:00Z' },
    { id: 203, applicantName: 'Eve Harrington', jobTitle: 'Cloud Security Intern', company: 'SecureCloud', interviewer: 'Sarah Kim', status: 'Scheduled', scheduledTime: '2025-09-29T09:00:00Z' }, 
    { id: 204, applicantName: 'Diana Prince', jobTitle: 'Marketing Content Intern', company: 'GrowthX', interviewer: 'Mike Ross', status: 'Scheduled', scheduledTime: '2025-09-28T14:00:00Z' }, 
    { id: 205, applicantName: 'Frank Taylor', jobTitle: 'Embedded Systems Intern', company: 'RoboCorp', interviewer: 'Mike Ross', status: 'Cancelled', scheduledTime: '2025-10-01T10:00:00Z' },
    { id: 206, applicantName: 'Grace Hopper', jobTitle: 'Data Analyst Intern', company: 'DataStream', interviewer: 'David Lee', status: 'Scheduled', scheduledTime: '2025-09-28T16:00:00Z' }, 
    // --- NEW INTERVIEWS FOR TODAY (2025-09-28) ---
    { id: 207, applicantName: 'Carla Ruiz', jobTitle: 'Data Science Internship', company: 'AI Labs', interviewer: 'Dr. V. Sharma', status: 'Scheduled', scheduledTime: '2025-09-28T09:30:00Z' },
    { id: 208, applicantName: 'Tom Hiddleston', jobTitle: 'UX Designer Internship', company: 'DesignCo', interviewer: 'Laura Bell', status: 'Scheduled', scheduledTime: '2025-09-28T15:15:00Z' },
];
const allInterviewStatuses = [...new Set(mockInterviews.map(i => i.status))];
const allInterviewers = [...new Set(mockInterviews.map(i => i.interviewer))];

// Date Utility function for display
const formatDate = (dateString, type = 'date') => {
    const options = type === 'time' 
        ? { hour: '2-digit', minute: '2-digit', hour12: true }
        : { year: 'numeric', month: 'short', day: 'numeric' };
    try {
        // When showing time, we show the local time derived from the UTC string.
        return new Date(dateString).toLocaleDateString('en-US', options);
    } catch {
        return 'N/A';
    }
};

const isSameDay = (d1, d2) => {
    return d1.getFullYear() === d2.getFullYear() &&
           d1.getMonth() === d2.getMonth() &&
           d1.getDate() === d2.getDate();
};

// 1. Mock apiClient
const apiClient = {
    get: async (url) => {
        // Reduced delay slightly to speed up loading
        await new Promise(resolve => setTimeout(resolve, 150)); 
        
        if (url === '/interviews/all') {
             return { data: mockInterviews };
        }
        
        // Mock Internship Data (Minimal, unused but required for previous structure integrity)
        return { data: [] };
    },
    post: async (url, data) => {
        await new Promise(resolve => setTimeout(resolve, 500));
        console.log(`[Mock API] POST to ${url} with data:`, data);
        return { status: 201, data: { success: true, message: "Created successfully" } };
    }
};

// 2. Mock useUserStore
const useUserStore = () => ({
    // Set role to 'recruiter' 
    role: 'recruiter', 
    email: 'placement.committee@example.com',
});

// --- Icon Imports (using simple text/emoji for maximal compatibility) ---
const SearchIcon = () => <span className="text-xl">🔍</span>;
const InterviewIcon = () => <span className="text-xl">📅</span>;
const TimeIcon = () => <span className="text-xl">⏱️</span>;


// --- Main App Component ---
const Postings = () => {
  // Keeping minimal state required for structure
  const [postings, setPostings] = useState([]);
  const {role} = useUserStore();
  
  useEffect(() => {
    // Keeping this effect but the data is unused in this version
    const fetchPostings = async () => {
      try {
        const response = await apiClient.get('/internships/allPostings');
        setPostings(response.data);
      }
      catch (error) {
        console.error("Error fetching postings:", error);
      }
    };
    fetchPostings();
  }, []);

  // --- Interview Dashboard Components ---
  
  const InterviewDetailsModal = ({ isOpen, onClose, interview }) => {
    if (!isOpen || !interview) return null;

    const getStatusColor = (status) => {
        switch(status) {
            case 'Completed - Hired': return 'bg-green-100 text-green-800 border-green-300';
            case 'Completed - Rejected': return 'bg-red-100 text-red-800 border-red-300';
            case 'Scheduled': default: return 'bg-indigo-100 text-indigo-800 border-indigo-300';
        }
    };

    return (
        <div className="fixed inset-0 bg-black/80 bg-opacity-60 z-50 flex justify-center items-center p-4" onClick={onClose}>
            <div 
                className="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto transform transition-all p-6"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-start border-b pb-4 mb-4">
                    <h2 className="text-2xl font-bold text-indigo-700">Interview Details</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-3xl leading-none">&times;</button>
                </div>

                <div className="space-y-4">
                    <h3 className="text-xl font-bold text-gray-800">{interview.jobTitle} at {interview.company}</h3>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <p className="font-semibold">Candidate: <span className="font-normal">{interview.applicantName}</span></p>
                        <p className="font-semibold">Interviewer: <span className="font-normal">{interview.interviewer}</span></p>
                        <p className="font-semibold">Date: <span className="font-normal">{formatDate(interview.scheduledTime, 'date')}</span></p>
                        <p className="font-semibold">Time: <span className="font-normal">{formatDate(interview.scheduledTime, 'time')}</span></p>
                    </div>

                    <div className="pt-4 border-t">
                        <p className="font-semibold text-gray-700 mb-2">Interview Status:</p>
                        <span className={`px-4 py-2 text-md font-semibold rounded-lg border ${getStatusColor(interview.status)}`}>
                            {interview.status}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
  };

  const InterviewTimetable = ({ todayInterviews, handleViewInterview }) => {
    const today = new Date('2025-09-28'); // Using mock date for consistent display
    const todayInterviewsCount = todayInterviews.length;
    
    // Define the schedule hours for the grid (8 AM to 6 PM)
    const startHour = 8;
    const endHour = 18; // 6 PM
    const totalHours = endHour - startHour;
    const hours = Array.from({ length: totalHours }, (_, i) => startHour + i);

    const getStatusColor = (status) => {
        switch(status) {
            case 'Completed - Hired': 
            case 'Completed - Pending': return 'bg-green-200 border-green-400 text-green-800';
            case 'Cancelled': return 'bg-red-200 border-red-400 text-red-800';
            case 'Scheduled': default: return 'bg-indigo-200 border-indigo-400 text-indigo-800';
        }
    };

    return (
        <div className="space-y-8">
            <div className="p-6 bg-indigo-600 rounded-xl shadow-lg text-white max-w-sm">
                <h3 className="text-2xl font-extrabold mb-2">Interviews Today</h3>
                <p className="text-5xl font-bold">{todayInterviewsCount}</p>
                <p className="text-sm mt-1 opacity-80">As of {formatDate(today.toISOString(), 'date')}</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Today's Schedule</h3>

                <div className="grid grid-cols-[50px_1fr] gap-x-2 relative min-h-[500px]">
                    {/* Time Labels Column */}
                    <div className="col-span-1 text-xs font-medium text-gray-500 divide-y divide-gray-200">
                        {hours.map((h) => (
                            <div key={h} className="h-12 pt-0.5 text-right pr-2">
                                {h % 12 || 12}:00 {h < 12 ? 'AM' : 'PM'}
                            </div>
                        ))}
                    </div>
                    
                    {/* Schedule Grid Area (Background for interviews) */}
                    <div className="col-span-1 relative divide-y divide-gray-200">
                        {/* Empty grid cells for visual height (10 blocks of 1 hour) */}
                        {hours.map((h) => (
                            <div key={`bg-${h}`} className="h-12 w-full"></div> 
                        ))}
                    </div>
                    
                    {/* Interview Blocks (Absolute Positioning over the grid) */}
                    {todayInterviews.map((interview) => {
                        const interviewTime = new Date(interview.scheduledTime);
                        // FIX: Use getUTCHours() and getUTCMinutes() to ensure consistent time positioning 
                        // based on the 'Z' (UTC) suffix in the mock data, avoiding local timezone shifts.
                        const startMinutes = (interviewTime.getUTCHours() * 60) + interviewTime.getUTCMinutes();
                        
                        const referenceMinutes = startHour * 60;
                        const totalMinutesSpan = totalHours * 60;
                        
                        const startOffsetMinutes = startMinutes - referenceMinutes; 
                        
                        const topPercentage = (startOffsetMinutes / totalMinutesSpan) * 100;
                        
                        // Assuming 45 minutes duration for visual height
                        const durationMinutes = 45; 
                        const heightPercentage = (durationMinutes / totalMinutesSpan) * 100;

                        if (startOffsetMinutes < 0 || startMinutes > (endHour * 60)) return null;

                        return (
                            <div 
                                key={interview.id} 
                                className={`absolute right-0 p-1.5 rounded-lg text-xs shadow-md cursor-pointer transition transform hover:scale-[1.02] border-l-4 w-[98%] ${getStatusColor(interview.status)}`}
                                style={{ top: `${topPercentage}%`, height: `${heightPercentage}%`, zIndex: 10 }} 
                                onClick={() => handleViewInterview(interview)}
                            >
                                <p className="font-bold truncate">{formatDate(interview.scheduledTime, 'time')} - {interview.applicantName}</p>
                                <p className="text-gray-700 truncate">{interview.jobTitle}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
  };
  
  const InterviewList = ({ interviews, handleViewInterview }) => {
    const [listSearchTerm, setListSearchTerm] = useState('');
    const [listFilters, setListFilters] = useState({
        status: '',
        interviewer: '',
    });

    const filteredList = useMemo(() => {
        return interviews.filter(interview => {
            const matchesSearch = interview.applicantName.toLowerCase().includes(listSearchTerm.toLowerCase()) ||
                                  interview.jobTitle.toLowerCase().includes(listSearchTerm.toLowerCase());
            if (!matchesSearch) return false;

            const matchesStatus = listFilters.status === '' || interview.status === listFilters.status;
            if (!matchesStatus) return false;

            const matchesInterviewer = listFilters.interviewer === '' || interview.interviewer === listFilters.interviewer;
            return matchesInterviewer;
        });
    }, [interviews, listSearchTerm, listFilters]);

    const getStatusPill = (status) => {
        let colorClass = '';
        switch(status) {
            case 'Completed - Hired': colorClass = 'bg-green-500 text-white'; break;
            case 'Completed - Pending': colorClass = 'bg-yellow-500 text-gray-800'; break;
            case 'Cancelled': colorClass = 'bg-red-500 text-white'; break;
            case 'Scheduled': default: colorClass = 'bg-indigo-500 text-white'; break;
        }
        return (
            <span className={`px-3 py-1 text-xs font-semibold rounded-full ${colorClass}`}>
                {status}
            </span>
        );
    };

    return (
        <div className="space-y-6">
             {/* Search and Filters */}
            <div className="p-4 bg-white rounded-xl shadow-lg border border-gray-100 space-y-4">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search candidate or job title..."
                        value={listSearchTerm}
                        onChange={(e) => setListSearchTerm(e.target.value)}
                        className="w-full p-4 pl-12 text-lg border border-gray-300 rounded-xl focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                    />
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                        <CiSearch className='text-2xl'/>
                    </div>
                </div>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Status Filter */}
                    <select
                        value={listFilters.status}
                        onChange={(e) => setListFilters(prev => ({ ...prev, status: e.target.value }))}
                        className="p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                    >
                        <option value="">All Statuses</option>
                        {allInterviewStatuses.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>

                    {/* Interviewer Filter */}
                    <select
                        value={listFilters.interviewer}
                        onChange={(e) => setListFilters(prev => ({ ...prev, interviewer: e.target.value }))}
                        className="p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                    >
                        <option value="">All Interviewers</option>
                        {allInterviewers.map(i => <option key={i} value={i}>{i}</option>)}
                    </select>

                    {/* Clear Filters */}
                    <button 
                        onClick={() => { setListFilters({ status: '', interviewer: '' }); setListSearchTerm(''); }}
                        className="py-2 bg-red-100 text-red-600 font-semibold rounded-lg hover:bg-red-200 transition duration-150"
                    >
                        Clear Filters
                    </button>
                </div>
            </div>

            <h3 className="text-xl font-bold text-gray-800">
                Showing {filteredList.length} Interview Schedules
            </h3>
            
            {/* Interviews Table */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-x-auto">
                {filteredList.length > 0 ? (
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Candidate / Job</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Interviewer</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Schedule</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredList.map(interview => (
                                <tr key={interview.id} className="hover:bg-gray-50 transition duration-150">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                        <p className="font-semibold text-gray-900">{interview.applicantName}</p>
                                        <p className="text-xs text-indigo-500">{interview.jobTitle}</p>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{interview.interviewer}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                        {formatDate(interview.scheduledTime, 'date')} at {formatDate(interview.scheduledTime, 'time')}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {getStatusPill(interview.status)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button 
                                            onClick={() => handleViewInterview(interview)}
                                            className="text-indigo-600 hover:text-indigo-900 font-semibold p-2 rounded-lg transition"
                                        >
                                            View Details
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="text-center p-10 text-gray-600">
                        <p className="text-xl font-medium">No interviews match your current criteria.</p>
                    </div>
                )}
            </div>
        </div>
    );
  };

  const InterviewsDashboard = () => {
    const [interviews, setInterviews] = useState([]);
    const [activeTab, setActiveTab] = useState('timetable'); // <-- Changed default to 'timetable'
    const [isInterviewModalOpen, setIsInterviewModalOpen] = useState(false);
    const [selectedInterview, setSelectedInterview] = useState(null);
    const [isLoading, setIsLoading] = useState(false); // <-- New Loading State
    const today = useMemo(() => new Date('2025-09-28'), []); // Mocking today's date for consistent timetable

    // 1. Fetch Interviews Data
    useEffect(() => {
        const fetchInterviews = async () => {
            setIsLoading(true); // <-- Set Loading
            try {
                const response = await apiClient.get('/interviews/all');
                setInterviews(response.data);
            } catch (error) {
                console.error("Error fetching interviews:", error);
            } finally {
                setIsLoading(false); // <-- Clear Loading
            }
        };
        fetchInterviews();
    }, []);

    const todayInterviews = useMemo(() => {
        return interviews
            .filter(i => isSameDay(new Date(i.scheduledTime), today))
            .sort((a, b) => new Date(a.scheduledTime) - new Date(b.scheduledTime));
    }, [interviews, today]);

    const handleViewInterview = (interview) => {
        setSelectedInterview(interview);
        setIsInterviewModalOpen(true);
    };

    const TabButton = ({ id, name }) => (
        <button
          onClick={() => setActiveTab(id)}
          className={`px-4 py-2 text-base font-semibold transition-all duration-200 rounded-t-lg ${
            activeTab === id
              ? 'bg-white text-indigo-700 shadow-md border-t border-x'
              : 'text-gray-600 hover:text-indigo-500 hover:bg-gray-100'
          }`}
        >
          {name}
        </button>
    );
    
    // --- Render Logic ---
    let content;
    
    if (isLoading) {
        content = (
            <div className="text-center p-20">
                <div className="animate-spin rounded-full h-10 w-10 border-4 border-indigo-500 border-t-transparent mx-auto mb-4"></div>
                <p className="text-xl text-indigo-600 font-medium">Loading interview schedules...</p>
            </div>
        );
    } else {
        content = (
            <>
                {/* Tab Navigation */}
                <div className="flex border-b border-gray-200 space-x-2">
                    <TabButton id="list" name="Interview List" />
                    <TabButton id="timetable" name="Timetable View" />
                </div>
    
                <div className="pt-4">
                    {activeTab === 'list' && (
                        <InterviewList interviews={interviews} handleViewInterview={handleViewInterview} />
                    )}
                    {activeTab === 'timetable' && (
                        <InterviewTimetable todayInterviews={todayInterviews} handleViewInterview={handleViewInterview} />
                    )}
                </div>
            </>
        );
    }

    return (
        <div className="space-y-6">
            
            {content}

            <InterviewDetailsModal
                isOpen={isInterviewModalOpen}
                onClose={() => setIsInterviewModalOpen(false)}
                interview={selectedInterview}
            />
        </div>
    );
  };


  return (
    <div className="min-h-screen bg-gray-50 font-sans">
        <header className="bg-white shadow-md sticky top-0 z-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <h1 className="text-3xl font-extrabold text-gray-900 flex items-center">
                        Interview Tracking
                    </h1>
                    <p className="text-md text-gray-500 mt-1">Manage and track all interview schedules and candidate progress.</p>
                </div>
            </header>
      <div className="flex max-w-7xl mx-auto">
        
        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          
          {/* Always render Interviews Dashboard */}
          <InterviewsDashboard />

        </main>
      </div>
    </div>
  );
};

export default Postings;
