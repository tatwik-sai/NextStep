"use client"
import React, { useState, useMemo, useEffect } from 'react';

// --- MOCKED EXTERNAL DEPENDENCIES ---
// Mock apiClient is not strictly needed for fetching here, but kept for context awareness.
const apiClient = {
    // Mock post for future use
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

// --- MOCKED INTERVIEW DATA (for the applicant) ---
const mockInterviews = [
    // Note: All dates are set to UTC on 2025-09-28 to ensure they show up on the timetable grid, regardless of local timezone.
    { id: 1, jobTitle: 'Frontend Dev Internship', company: 'InnovateX', interviewer: 'John Smith', date: '2025-09-28T09:30:00Z', status: 'Scheduled', type: 'Technical', duration: 60, meetingLink: 'https://meet.google.com/abc-xyz-123' },
    { id: 2, jobTitle: 'Data Analyst Intern', company: 'DataStream', interviewer: 'Alice Johnson', date: '2025-09-28T11:00:00Z', status: 'Scheduled', type: 'HR Round', duration: 45, meetingLink: 'https://zoom.us/j/456789' },
    { id: 3, jobTitle: 'Cloud Security Intern', company: 'SecureCloud', interviewer: 'Bob Lee', date: '2025-09-28T14:00:00Z', status: 'Scheduled', type: 'Managerial', duration: 60, meetingLink: 'https://teams.microsoft.com/l/meetup/def-uvw-456' },
    // Duration set to 30 mins (ends 15:45Z) to separate it from Interview 5 (starts 16:00Z).
    // { id: 4, jobTitle: 'Embedded Systems Intern', company: 'RoboCorp', interviewer: 'Chris Evans', date: '2025-09-28T15:15:00Z', status: 'Scheduled', type: 'Technical', duration: 30, meetingLink: 'https://meet.google.com/ghi-opq-789' },
    // { id: 5, jobTitle: 'Marketing Content Intern', company: 'GrowthX', interviewer: 'Emily White', date: '2025-09-28T16:00:00Z', status: 'Scheduled', type: 'Portfolio Review', duration: 30, meetingLink: 'https://zoom.us/j/101112' },
    
    // Future interviews (will show in the list but not the 'Today' timetable)
    { id: 6, jobTitle: 'UX/UI Design Intern', company: 'DesignFlow', interviewer: 'Sarah Connor', date: '2025-10-02T10:00:00Z', status: 'Scheduled', type: 'Design Challenge', duration: 90, meetingLink: 'https://meet.google.com/jkl-rst-321' },
    { id: 7, jobTitle: 'Financial Analyst Intern', company: 'CapitalFlow', interviewer: 'Mike Ross', date: '2025-10-02T13:30:00Z', status: 'Pending', type: 'HR Round', duration: 30, meetingLink: null },
];

// --- Utility Functions ---

const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
};

const formatTime = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZone: 'UTC' });
};

const getStatusStyles = (status) => {
    switch (status) {
        case 'Scheduled':
            return 'bg-indigo-100 text-indigo-800 border-indigo-300';
        case 'Completed':
            return 'bg-green-100 text-green-800 border-green-300';
        case 'Cancelled':
            return 'bg-red-100 text-red-800 border-red-300';
        default:
            return 'bg-gray-100 text-gray-800 border-gray-300';
    }
};

const isToday = (dateString) => {
    if (!dateString) return false;
    const date = new Date(dateString);
    const today = new Date('2025-09-28T00:00:00Z'); // Fixed mock "today" date (UTC midnight)
    return date.getUTCFullYear() === today.getUTCFullYear() &&
           date.getUTCMonth() === today.getUTCMonth() &&
           date.getUTCDate() === today.getUTCDate();
};

// --- Sub-Components ---

// Detailed Interview Modal
const InterviewDetailsModal = ({ isOpen, onClose, interview }) => {
    if (!isOpen || !interview) return null;

    const [prepLoading, setPrepLoading] = useState(false);
    const [prepContent, setPrepContent] = useState(null);
    const [prepError, setPrepError] = useState(null);

    // Reset state when a new interview opens or modal closes
    useEffect(() => {
        if (isOpen) {
            setPrepContent(null);
            setPrepError(null);
        }
    }, [isOpen, interview]);

    const generateInterviewPrep = async () => {
        setPrepLoading(true);
        setPrepContent(null);
        setPrepError(null);

        const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY; 
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

        const prompt = `You are an expert interview coach. Generate exactly 3 insightful mock interview questions for a candidate interviewing for the following role:
        Job Title: ${interview.jobTitle}
        Company: ${interview.company}
        Interview Type: ${interview.type}
        
        Format the response as a simple, numbered list of questions.`;

        const payload = {
            contents: [{ parts: [{ text: prompt }] }],
            systemInstruction: {
                parts: [{ text: "You are an expert career coach helping a candidate prepare for an interview. Provide concise and relevant mock questions." }]
            },
        };

        let response;
        let retries = 0;
        const maxRetries = 3;
        const initialDelay = 1000;

        while (retries < maxRetries) {
            try {
                const delay = initialDelay * Math.pow(2, retries);
                if (retries > 0) await new Promise(res => setTimeout(res, delay));

                response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                if (response.status === 429) { // Too Many Requests
                    retries++;
                    continue;
                }
                
                if (!response.ok) {
                    throw new Error(`API call failed with status: ${response.status}`);
                }

                const result = await response.json();
                const text = result.candidates?.[0]?.content?.parts?.[0]?.text;
                
                if (text) {
                    setPrepContent(text);
                } else {
                    setPrepError("Could not generate content. Response was empty.");
                }
                break; // Exit loop on success
            } catch (error) {
                console.error("LLM Generation Error:", error);
                retries++;
                if (retries === maxRetries) {
                    setPrepError("Failed to connect to the interview coach service after multiple retries.");
                }
            }
        }
        setPrepLoading(false);
    };

    return (
        <div className="fixed inset-0 bg-black/80 bg-opacity-60 z-50 flex justify-center items-center p-4" onClick={onClose}>
            <div 
                className="bg-white rounded-xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto transform transition-all p-6"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-start border-b pb-3 mb-4">
                    <h2 className="text-2xl font-bold text-indigo-700">Interview Details</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-3xl leading-none">&times;</button>
                </div>

                <div className="space-y-4">
                    <DetailItem label="Job Title" value={interview.jobTitle} />
                    <DetailItem label="Company" value={interview.company} />
                    <DetailItem label="Interviewer" value={interview.interviewer} />
                    <DetailItem label="Type" value={interview.type} />
                    <DetailItem label="Duration" value={`${interview.duration} minutes`} />
                    <DetailItem label="Status">
                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border ${getStatusStyles(interview.status)}`}>
                            {interview.status}
                        </span>
                    </DetailItem>
                    
                    <div className="pt-4 border-t border-gray-100">
                        <DetailItem label="Date">
                            <span className="text-lg font-semibold text-gray-800">{formatDate(interview.date)}</span>
                        </DetailItem>
                        <DetailItem label="Time (UTC)">
                            <span className="text-lg font-semibold text-indigo-600">{formatTime(interview.date)}</span>
                        </DetailItem>
                    </div>

                    {interview.meetingLink && (
                        <div className="pt-4 border-t border-gray-100">
                            <a 
                                href={interview.meetingLink} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="w-full inline-block text-center bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition duration-150 shadow-md"
                            >
                                Join Interview Call (External Link)
                            </a>
                        </div>
                    )}
                    
                    {/* --- GEMINI AI INTEGRATION: INTERVIEW COACH --- */}
                    <div className="pt-6 border-t border-gray-100 space-y-3">
                        <h3 className="text-lg font-bold text-gray-800">Interview Prep Coach</h3>
                        
                        <button
                            onClick={generateInterviewPrep}
                            disabled={prepLoading}
                            className={`w-full py-2 rounded-lg font-semibold transition duration-150 shadow-md flex items-center justify-center space-x-2 ${
                                prepLoading 
                                    ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                                    : 'bg-indigo-600 text-white hover:bg-indigo-700'
                            }`}
                        >
                            {prepLoading ? (
                                <span className="animate-pulse">Loading Mock Questions...</span>
                            ) : (
                                <>
                                    <span>✨ Generate Mock Prep Questions</span>
                                </>
                            )}
                        </button>

                        {(prepContent || prepError) && (
                            <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg text-sm">
                                {prepError ? (
                                    <p className="text-red-600 font-medium">{prepError}</p>
                                ) : (
                                    <div className="prose max-w-none text-gray-700">
                                        <p className="font-semibold mb-2">Targeted Questions from the Coach:</p>
                                        <div dangerouslySetInnerHTML={{ __html: prepContent.replace(/\n/g, '<br/>') }} />
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const DetailItem = ({ label, value, children }) => (
    <div className="flex justify-between items-center py-2 border-b border-gray-50 last:border-b-0">
        <span className="text-sm font-medium text-gray-500">{label}</span>
        {value ? <span className="text-sm font-medium text-gray-800">{value}</span> : children}
    </div>
);


const InterviewTimetable = ({ interviews, onSelectInterview }) => {
    const todayInterviews = useMemo(() => {
        // Filter interviews scheduled for the mock "today" (2025-09-28 UTC)
        return interviews.filter(app => app.date && isToday(app.date));
    }, [interviews]);

    // Timetable settings (8 AM to 6 PM UTC)
    const startTimeHour = 8; // 8:00
    const endTimeHour = 18;  // 18:00 (6 PM)
    const totalMinutes = (endTimeHour - startTimeHour) * 60;

    // Grid row creation (one for every hour)
    const timeSlots = Array.from({ length: endTimeHour - startTimeHour }, (_, i) => {
        const hour = startTimeHour + i;
        const displayHour = hour > 12 ? hour - 12 : hour;
        const ampm = hour >= 12 ? 'PM' : 'AM';
        return `${displayHour}:00 ${ampm}`;
    });

    // Calculate position for an interview block
    const calculatePosition = (dateString, duration) => {
        const date = new Date(dateString);
        // Using UTC methods to calculate position relative to UTC-based grid
        const interviewUTCMinutes = date.getUTCHours() * 60 + date.getUTCMinutes();
        const startUTCMinutes = startTimeHour * 60;
        
        const offsetMinutes = interviewUTCMinutes - startUTCMinutes;

        if (offsetMinutes < 0 || offsetMinutes >= totalMinutes) {
            return { top: '0', height: '0', display: 'none' };
        }

        const topPercentage = (offsetMinutes / totalMinutes) * 100;
        const heightPercentage = (duration / totalMinutes) * 100;

        return {
            top: `${topPercentage}%`,
            height: `${heightPercentage}%`,
            display: 'block'
        };
    };

    return (
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Today's Schedule ({formatDate('2025-09-28T00:00:00Z')})</h3>
            
            <div className="relative flex border border-gray-200 rounded-lg">
                
                {/* Time Axis */}
                <div className="w-16 flex-shrink-0 text-sm font-medium text-gray-500 divide-y divide-gray-200">
                    {/* Increased h-[68px] for more space */}
                    {timeSlots.map((time, index) => (
                        <div key={index} className={`h-[68px] flex items-start pt-1.5 justify-center ${index === 0 ? 'rounded-tl-lg' : ''}`}>
                            {time}
                        </div>
                    ))}
                    {/* Increased h-[68px] for the final time marker */}
                    <div className="h-[68px] flex items-start pt-1.5 justify-center text-xs text-gray-400">6:00 PM</div>
                </div>

                {/* Grid and Events */}
                <div className="flex-1 relative border-l border-gray-200">
                    {/* Horizontal Grid Lines - Adjusted for h-[68px] time slots */}
                    {timeSlots.map((_, index) => (
                        <div key={index} className="absolute w-full border-b border-dashed border-gray-100" style={{ top: `${(index / timeSlots.length) * 100}%`, height: `${100 / timeSlots.length}%` }} />
                    ))}
                    
                    {/* Interview Events Container - py-2 creates more generous padding at top and bottom */}
                    <div className="absolute inset-0 py-2"> 
                        {todayInterviews.map(interview => {
                            const position = calculatePosition(interview.date, interview.duration);
                            return (
                                <button
                                    key={interview.id}
                                    onClick={() => onSelectInterview(interview)}
                                    style={position}
                                    className={`absolute w-[90%] rounded-lg p-2 text-left shadow-md transition-shadow duration-200 hover:shadow-lg overflow-hidden ${getStatusStyles('Scheduled')}`}
                                >
                                    <p className="text-sm font-semibold truncate">{interview.jobTitle}</p>
                                    <p className="text-xs text-indigo-700 truncate">{interview.company} ({interview.type})</p>
                                    <p className="text-xs font-medium mt-1">{formatTime(interview.date)} ({interview.duration} min)</p>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            <div className="mt-4 flex justify-between items-center text-sm text-gray-600">
                <span className="font-medium">All times are displayed in UTC.</span>
                <span className="font-bold text-indigo-700">{todayInterviews.length} Interviews Today</span>
            </div>
        </div>
    );
};


const Postings = () => { // Renamed to Postings to match export name
    const { name } = useUserStore();
    const [interviews, setInterviews] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedInterview, setSelectedInterview] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Mock Fetch Effect (Simulates API load)
    useEffect(() => {
        setIsLoading(true);
        // Simulate a real fetch delay before setting data
        const mockFetch = async () => {
            await new Promise(resolve => setTimeout(resolve, 700));
            setInterviews(mockInterviews); 
            setIsLoading(false);
        };
        mockFetch();
    }, []);

    const openDetailsModal = (interview) => {
        setSelectedInterview(interview);
        setIsModalOpen(true);
    };
    
    // Calculate total scheduled interviews for the header stat
    const totalScheduled = useMemo(() => interviews.filter(i => i.status === 'Scheduled').length, [interviews]);

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            
            <header className="bg-white shadow-md sticky top-0 z-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <h1 className="text-3xl font-extrabold text-gray-900 flex items-center">
                        Interview Schedule
                    </h1>
                    <p className="text-md text-gray-500 mt-1">Your personal timetable for all upcoming interviews.</p>
                </div>
            </header>

            <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
                
                {isLoading ? (
                    <div className="text-center p-10 text-lg font-medium text-indigo-600 bg-white rounded-xl shadow-lg">
                        Loading your interview schedule...
                    </div>
                ) : (
                    <>
                        <div className="flex justify-between items-center mb-6 p-4 bg-white rounded-xl shadow-lg border border-gray-100">
                            <h2 className="text-2xl font-bold text-gray-800">Your Scheduled Interviews</h2>
                            <div className="text-lg font-bold text-indigo-700">
                                {totalScheduled} Total Scheduled
                            </div>
                        </div>

                        {/* Timetable Grid View */}
                        <InterviewTimetable 
                            interviews={interviews} 
                            onSelectInterview={openDetailsModal} 
                        />
                    </>
                )}
            </main>

            {/* Interview Details Modal */}
            <InterviewDetailsModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                interview={selectedInterview}
            />
        </div>
    );
};

export default Postings;
