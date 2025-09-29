"use client"
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import React, { useState, useMemo, useEffect } from 'react';
import { CiSearch } from 'react-icons/ci';

// --- MOCKED EXTERNAL DEPENDENCIES (To address unresolved path errors and simulate backend) ---

// Mock Applications Data
const mockApplications = [
    { id: 101, postingId: 1, applicantName: 'Alice Johnson', jobTitle: 'Frontend Dev Internship', company: 'InnovateX', status: 'Pending Review', appliedDate: '2025-09-10', resumeLink: 'link/alice.pdf', coverLetter: 'I am highly proficient in React and Tailwind, matching all requirements. I am eager to contribute to InnovateX\'s mission.', applicantEmail: 'alice@mail.com' },
    { id: 102, postingId: 2, applicantName: 'Bob Smith', jobTitle: 'Data Analyst Intern', company: 'DataStream', status: 'Interview Scheduled', appliedDate: '2025-09-05', resumeLink: 'link/bob.pdf', coverLetter: 'Excellent Python/Pandas experience in my university research projects makes me an ideal candidate for DataStream.', applicantEmail: 'bob@mail.com' },
    { id: 103, postingId: 1, applicantName: 'Charlie Brown', jobTitle: 'Frontend Dev Internship', company: 'InnovateX', status: 'Rejected', appliedDate: '2025-09-01', resumeLink: 'link/charlie.pdf', coverLetter: 'I may lack Tailwind experience, but I am a fast learner and dedicated to mastering new CSS frameworks quickly.', applicantEmail: 'charlie@mail.com' },
    { id: 104, postingId: 6, applicantName: 'Diana Prince', jobTitle: 'Marketing Content Intern', company: 'GrowthX', status: 'Offer Extended', appliedDate: '2025-09-15', resumeLink: 'link/diana.pdf', coverLetter: 'My top-tier SEO portfolio speaks for itself. I believe my creative content strategy can significantly boost GrowthX\'s reach.', applicantEmail: 'diana@mail.com' },
    { id: 105, postingId: 3, applicantName: 'Eve Harrington', jobTitle: 'Cloud Security Intern', company: 'SecureCloud', status: 'Pending Review', appliedDate: '2025-09-18', resumeLink: 'link/eve.pdf', coverLetter: 'I have significant hands-on experience hardening Linux systems and managing cloud identity and access management.', applicantEmail: 'eve@mail.com' },
];
const allStatuses = [...new Set(mockApplications.map(a => a.status))];
const allApplicationJobs = [...new Set(mockApplications.map(a => a.jobTitle))];

// 1. Mock apiClient
const apiClient = {
    get: async (url) => {
        await new Promise(resolve => setTimeout(resolve, 300));
        
        if (url === '/applications/all') {
            return { data: mockApplications };
        }
        
        // Mock Internship Data
        const mockData = [
            { _id: 1, title: 'Frontend Dev Internship', company: 'InnovateX', location: 'Remote', stipend: 1000, duration: '6 Months', required_skills: ['React', 'JavaScript', 'Tailwind', 'UI/UX'], desc: 'Develop user-facing features and improve application performance using modern web technologies.' , posted_by: 'HR Team', company_mail: 'hr@innovatex.com' },
            { _id: 2, title: 'Data Analyst Intern', company: 'DataStream', location: 'San Francisco, CA', stipend: 1500, duration: '3 Months', required_skills: ['Python', 'Pandas', 'SQL', 'Visualization'], desc: 'Analyze large datasets and provide actionable insights to product teams for strategic decision-making.' , posted_by: 'Hiring Manager', company_mail: 'jobs@datastream.co' },
            { _id: 3, title: 'Cloud Security Intern', company: 'SecureCloud', location: 'New York, NY', stipend: 1800, duration: '12 Months', required_skills: ['AWS', 'Security', 'Linux', 'Networking'], desc: 'Audit and enhance cloud security protocols for mission-critical applications.' , posted_by: 'CISO Office', company_mail: 'security-hiring@securecloud.net' },
            { _id: 4, title: 'Mobile UX/UI Design Intern', company: 'DesignFlow', location: 'Los Angeles, CA', stipend: 950, duration: '6 Months', required_skills: ['Figma', 'Prototyping', 'UI/UX', 'Mobile'], desc: 'Design intuitive mobile interfaces and conduct user testing sessions for our flagship app.', posted_by: 'Design Lead', company_mail: 'design-jobs@designflow.io' },
            { _id: 5, title: 'Embedded Systems Intern', company: 'RoboCorp', location: 'Austin, TX', stipend: 1400, duration: '4 Months', required_skills: ['C++', 'Arduino', 'Robotics', 'Firmware'], desc: 'Assist in developing and testing firmware for next-generation robotic platforms.' , posted_by: 'Engineering Dept', company_mail: 'eng@robocorp.ai' },
            { _id: 6, title: 'Marketing Content Intern', company: 'GrowthX', location: 'Remote', stipend: 800, duration: '6 Months', required_skills: ['SEO', 'Content Creation', 'Social Media', 'Blogging'], desc: 'Create engaging marketing copy and manage content distribution across multiple channels.' , posted_by: 'Marketing Team', company_mail: 'marketing@growthx.net' },
        ];
        
        return { data: mockData };
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
const FilterIcon = () => <span className="text-xl">⚙️</span>;
const SearchIcon = () => <span className="text-xl">🔍</span>;
const LocationIcon = () => <span className="text-xl">📍</span>;
const MoneyIcon = () => <span className="text-xl">💰</span>;
const TimeIcon = () => <span className="text-xl">⏱️</span>;
const SkillIcon = () => <span className="text-xl">💡</span>;
const PlusIcon = () => <span className="text-4xl leading-none">+</span>;
const ApplicationIcon = () => <span className="text-xl">📋</span>;


// --- Detailed Dummy Data Structure (for Job Details Modal) ---
const getDummyDetails = (id) => {
    let details = {};
    // ... (Existing getDummyDetails logic, unchanged for brevity)
    // Default structure for unknown IDs
    details.responsibilities = [
        "Execute core tasks specific to the internship role.",
        "Collaborate with senior team members on project planning and execution.",
        "Document and report project progress weekly to the team lead.",
        "Participate in daily stand-ups and contribute actively to brainstorming sessions.",
    ];
    details.benefits = [
        "Competitive monthly stipend (as listed)",
        "Remote work flexibility (if applicable) or access to a modern office space.",
        "Full access to internal learning resources and training platforms.",
        "Direct mentorship from a dedicated senior team lead for career growth.",
        "Potential for full-time offer upon successful completion.",
    ];
    details.applicationRequirements = [
        "Updated Resume/CV (PDF preferred, max 2 pages)",
        "Compelling Cover Letter explaining your interest and qualifications for this specific role.",
        "Portfolio link or GitHub profile (required for development/design roles).",
        "Availability to commit to the full duration specified.",
    ];

    switch(id) {
        case 1: // Frontend Dev Internship (InnovateX)
            details.responsibilities = [
                "Develop and maintain user-facing features using **React** and Tailwind CSS.",
                "Implement state management solutions using modern React hooks.",
                "Ensure high performance and mobile responsiveness of the application.",
                "Collaborate with the UX team to translate wireframes into high-quality code."
            ];
            details.benefits = [
                "Direct mentorship from the Senior Frontend Architect.",
                "Annual $500 professional development budget.",
                "Flexible work schedule and work-from-home stipend.",
                "Free online course access (e.g., Udemy, Coursera)."
            ];
            break;
        case 2: // Data Analyst Intern (DataStream)
            details.responsibilities = [
                "Clean, transform, and analyze complex datasets using **Python** (Pandas) and SQL.",
                "Develop and maintain interactive dashboards using visualization tools (e.g., Tableau).",
                "Present actionable insights to leadership and product managers.",
                "Perform A/B testing analysis for marketing campaigns.",
            ];
            details.benefits = [
                "Exposure to industry-leading big data infrastructure.",
                "Dedicated training sessions on advanced statistical modeling.",
                "Mentorship with the Lead Data Scientist.",
                "Stipend coverage for relevant industry certifications.",
            ];
            break;
        case 3: // Cloud Security Intern (SecureCloud)
            details.responsibilities = [
                "Conduct penetration testing and vulnerability scans on **AWS** infrastructure.",
                "Implement security monitoring and alerting using SIEM tools.",
                "Assist in developing and enforcing Infrastructure as Code (IaC) security policies.",
                "Respond to security incidents under the guidance of the Security Operations team."
            ];
            break;
        case 4: // Mobile UX/UI Design Intern (DesignFlow)
            details.responsibilities = [
                "Produce high-fidelity mockups and interactive prototypes using **Figma**.",
                "Conduct remote and in-person usability tests with target users.",
                "Iterate on design based on qualitative and quantitative user feedback.",
                "Contribute to the refinement of the company's design system."
            ];
            break;
        case 5: // Embedded Systems Intern (RoboCorp)
            details.responsibilities = [
                "Develop and debug **C++** code for real-time operating systems.",
                "Set up and execute hardware-in-the-loop (HIL) testing.",
                "Assist in PCB design review and component selection.",
                "Calibrate sensors and actuators for robotic functions."
            ];
            break;
        case 6: // Marketing Content Intern (GrowthX)
            details.responsibilities = [
                "Create engaging marketing copy and manage content distribution across multiple channels.",
                "Execute **SEO** strategies, including keyword research and content optimization.",
                "Manage and monitor performance across all social media platforms.",
                "Write blog posts and white papers related to industry trends.",
            ];
            break;
    }
    return details;
};


// --- Mock Internship Data ---
const initialPostings = [];

// --- Main App Component ---
const Postings = () => {
  const [postings, setPostings] = useState(initialPostings);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    minStipend: 0,
    location: '',
    selectedSkills: [],
  });
  const {role} = useUserStore();
  
  // Changed initial state to 'applications' and removed setCurrentView from header
  const [currentView, setCurrentView] = useState('applications'); // 'postings' or 'applications'
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // State for Add Posting Modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); 
  
  // New state for Details/Application Modal
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedPosting, setSelectedPosting] = useState(null); 

  useEffect(() => {
    // Fetch postings from backend API on component mount
    const fetchPostings = async () => {
      try {
        const response = await apiClient.get('/internships/allPostings');
        setPostings(response.data);
      }
      catch (error) {
        // If API fails, it falls back to the mock data defined in apiClient.get
        console.error("Error fetching postings:", error);
      }
    };
    fetchPostings();
  }, []);

  // Dynamically calculate locations and skills based on current postings state
  const { allLocations, allSkills } = useMemo(() => {
    const locations = [...new Set(postings.map(p => p.location))].sort();
    const skills = [...new Set(postings.flatMap(p => p.required_skills))].sort().slice(0, 15);
    return { allLocations: locations, allSkills: skills };
  }, [postings]);


  // Function to add a new posting
  const handleAddPosting = async (newPostingData) => {
    
    const newPosting = {
      ...newPostingData,
      _id: Date.now(), // Unique ID based on timestamp (temporary until DB assigns one)
      stipend: Number(newPostingData.stipend),
      required_skills: newPostingData.required_skills.split(',').map(s => s.trim()).filter(s => s.length > 0),
    };

    try {
        // Post the new data via the mocked API client
        await apiClient.post('/internships/addPosting', newPosting);
        // Note: In a real app, you would refetch or use the API response's ID
        setPostings(prev => [newPosting, ...prev]);
        setIsAddModalOpen(false); // Close modal on success
    } catch(error) {
        console.error("Failed to add posting:", error);
        // Display user-friendly error (omitted for brevity)
    }
  };

  // Handler for opening the details modal
  const handleViewDetails = (posting) => {
    setSelectedPosting(posting);
    setIsDetailsModalOpen(true);
  };


  // Function to apply filtering logic
  const filteredPostings = useMemo(() => {
    return postings.filter(posting => {
      // 1. Search Filter (Title or Company)
      const matchesSearch = posting.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          posting.company.toLowerCase().includes(searchTerm.toLowerCase());

      if (!matchesSearch) return false;

      // 2. Stipend Filter
      const matchesStipend = posting.stipend >= filters.minStipend;
      if (!matchesStipend) return false;

      // 3. Location Filter
      const matchesLocation = filters.location === '' || posting.location === filters.location;
      if (!matchesLocation) return false;

      // 4. Skills Filter (must include ALL selected skills)
      const matchesSkills = filters.selectedSkills.every(skill =>
        posting.required_skills && posting.required_skills.includes(skill)
      );

      return matchesSkills;
    });
  }, [postings, searchTerm, filters]);

  // Handle filter changes
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  // Handle skill toggling
  const toggleSkill = (skill) => {
    setFilters(prev => {
      const isSelected = prev.selectedSkills.includes(skill);
      const newSkills = isSelected
        ? prev.selectedSkills.filter(s => s !== skill)
        : [...prev.selectedSkills, skill];
      return { ...prev, selectedSkills: newSkills };
    });
  };
  
  // Close sidebar on resize (for mobile view consistency)
  useEffect(() => {
    const handleResize = () => {
        if (window.innerWidth >= 1024) { // lg breakpoint
            setIsSidebarOpen(false);
        }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  // --- Sub-Components ---

  const PostingCard = ({ posting }) => (
    <div className="bg-white border border-gray-100 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 flex flex-col space-y-3">
      <div className="flex justify-between items-start">
        <h2 className="text-xl font-bold text-gray-800">{posting.title}</h2>
        <span className={`px-3 py-1 text-sm font-semibold rounded-full ${posting.location === 'Remote' ? 'bg-indigo-100 text-indigo-800' : 'bg-green-100 text-green-800'}`}>
          {posting.location === 'Remote' ? 'Remote' : 'On-site'}
        </span>
      </div>
      <p className="text-sm font-medium text-indigo-600">{posting.company}</p>
      <p className="text-gray-600 text-sm italic line-clamp-2">{posting.desc}</p>

      <div className="grid grid-cols-2 gap-y-2 pt-2 text-sm text-gray-700 border-t border-gray-100 mt-2">
        <div className="flex items-center space-x-2">
          <MoneyIcon />
          <span>${posting.stipend}/mo</span>
        </div>
        <div className="flex items-center space-x-2">
          <LocationIcon />
          <span>{posting.location}</span>
        </div>
        <div className="flex items-center space-x-2">
          <TimeIcon />
          <span>{posting.duration}</span>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-2 pt-3 border-t border-gray-100">
        {posting.required_skills && posting.required_skills.map(skill => (
          <span key={skill} className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full">
            {skill}
          </span>
        ))}
      </div>
      
      <button 
        onClick={() => handleViewDetails(posting)} // Updated to open details modal
        className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition duration-150"
      >
        View Details
      </button>
    </div>
  );

  const FilterSidebar = ({ isMobileOpen, onClose }) => (
    <div 
      className={`fixed lg:static inset-y-0 left-0 transform ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 ease-in-out w-64 bg-gray-50 p-6 space-y-8 lg:border-r lg:shadow-none shadow-xl z-30`}
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-gray-800 flex items-center">
          <FilterIcon /> Filters
        </h3>
        <button onClick={onClose} className="lg:hidden text-gray-500 hover:text-gray-800 text-2xl">
          &times;
        </button>
      </div>

      {/* Stipend Filter */}
      <div className="space-y-3 p-4 bg-white rounded-lg shadow-sm border border-gray-100">
        <label className="text-lg font-semibold text-gray-700 flex items-center space-x-2">
          <MoneyIcon /> <span>Min Stipend (USD)</span>
        </label>
        <input
          type="range"
          min="0"
          max="2000"
          step="100"
          value={filters.minStipend}
          onChange={(e) => handleFilterChange('minStipend', Number(e.target.value))}
          className="w-full h-2 bg-indigo-200 rounded-lg appearance-none cursor-pointer range-lg"
          style={{ '--tw-ring-color': '#4f46e5' }}
        />
        <p className="text-center font-bold text-indigo-600">${filters.minStipend}</p>
      </div>

      {/* Location Filter */}
      <div className="space-y-3 p-4 bg-white rounded-lg shadow-sm border border-gray-100">
        <label htmlFor="location-select" className="text-lg font-semibold text-gray-700 flex items-center space-x-2">
          <LocationIcon /> <span>Location</span>
        </label>
        <select
          id="location-select"
          value={filters.location}
          onChange={(e) => handleFilterChange('location', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
        >
          <option value="">All Locations</option>
          {allLocations.map(location => (
            <option key={location} value={location}>{location}</option>
          ))}
        </select>
      </div>

      {/* Skills Filter */}
      <div className="space-y-3 p-4 bg-white rounded-lg shadow-sm border border-gray-100">
        <p className="text-lg font-semibold text-gray-700 flex items-center space-x-2">
          <SkillIcon /> <span>Required Skills</span>
        </p>
        <div className="flex flex-wrap gap-2">
          {allSkills.map(skill => (
            <button
              key={skill}
              onClick={() => toggleSkill(skill)}
              className={`px-3 py-1 text-sm font-medium rounded-full transition-all duration-200 ${
                filters.selectedSkills.includes(skill)
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {skill}
            </button>
          ))}
        </div>
      </div>
      
      {/* Reset button for filters */}
      <button 
        onClick={() => setFilters({ minStipend: 0, location: '', selectedSkills: [] })}
        className="w-full py-2 bg-red-100 text-red-600 font-semibold rounded-lg hover:bg-red-200 transition duration-150"
      >
        Clear Filters
      </button>
    </div>
  );
  
  const AddPostingModal = ({ isOpen, onClose, onSubmit, locations }) => {
    // State for form inputs
    const [formData, setFormData] = useState({
      title: '',
      company: '',
      company_mail: '',
      location: locations[0] || 'Remote', // Pre-select first location or Remote
      stipend: 1000,
      duration: '6 Months',
      required_skills: '', // Comma-separated string
      desc: '',
      posted_by: 'You', // Default value
    });

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      onSubmit(formData);
      // Reset form fields
      setFormData({
        title: '',
        company: '',
        company_mail: '',
        location: locations[0] || 'Remote',
        stipend: 1000,
        duration: '6 Months',
        required_skills: '',
        desc: '',
        posted_by: 'You',
      });
    };

    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4" onClick={onClose}>
        <div 
          className="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto transform transition-all p-6"
          onClick={(e) => e.stopPropagation()} // Stop propagation to prevent closing when clicking inside
        >
          <div className="flex justify-between items-center border-b pb-3 mb-4">
            <h2 className="text-2xl font-bold text-indigo-700">Add New Posting</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-3xl leading-none">&times;</button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Title & Company */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text" name="title" placeholder="Job Title" required
                value={formData.title} onChange={handleChange}
                className="p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              />
              <input
                type="text" name="company" placeholder="Company Name" required
                value={formData.company} onChange={handleChange}
                className="p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            
            {/* Location & Duration */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <select
                    name="location" required
                    value={formData.location} onChange={handleChange}
                    className="p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                >
                    <option value="">Select Location</option>
                    {locations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
                    <option value="Remote">Remote</option> {/* Added explicit Remote option */}
                </select>
                <input
                    type="text" name="duration" placeholder="Duration (e.g., 6 Months)" required
                    value={formData.duration} onChange={handleChange}
                    className="p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                />
            </div>

            {/* Stipend */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Stipend (USD/mo)</label>
              <input
                type="number" name="stipend" placeholder="1000" required
                value={formData.stipend} onChange={handleChange}
                className="p-3 border border-gray-300 rounded-lg w-full focus:ring-indigo-500 focus:border-indigo-500"
                min="0"
              />
            </div>

            {/* Required Skills */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Required Skills (Comma-separated: React, Python, etc.)</label>
              <input
                type="text" name="required_skills" placeholder="e.g., Python, SQL, Excel" required
                value={formData.required_skills} onChange={handleChange}
                className="p-3 border border-gray-300 rounded-lg w-full focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* Company mail */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company Email</label>
              <input
                type="email" name="company_mail" placeholder="e.g., hr@company.com" required
                value={formData.company_mail} onChange={handleChange}
                className="p-3 border border-gray-300 rounded-lg w-full focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                name="desc" placeholder="Detailed job description..." required
                value={formData.desc} onChange={handleChange} rows="3"
                className="p-3 border border-gray-300 rounded-lg w-full focus:ring-indigo-500 focus:border-indigo-500"
              ></textarea>
            </div>
            
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-150 shadow-lg mt-6"
            >
              Add Posting
            </button>
          </form>
        </div>
      </div>
    );
  };

  const ApplicationForm = ({ posting, onClose }) => {
    // Assuming useUserStore provides the user's email; using a placeholder if not
    const { email: userStoreEmail } = useUserStore(); 
    
    const [name, setName] = useState('');
    const [userEmail, setUserEmail] = useState(userStoreEmail || '');
    const [resumeUrl, setResumeUrl] = useState('');
    const [coverLetterText, setCoverLetterText] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState({ type: '', text: '' });

    const handleSubmitApplication = async (e) => {
      e.preventDefault();
      setIsSubmitting(true);
      setSubmitMessage({ type: '', text: '' });

      const applicationData = {
        internshipId: posting._id,
        internshipTitle: posting.title,
        applicantName: name,
        applicantEmail: userEmail,
        resumeUrl,
        coverLetterText,
        applicationDate: new Date().toISOString(),
      };

      try {
        // Send application data to a new API endpoint via mocked client
        await apiClient.post('/applications/apply', applicationData);
        setSubmitMessage({ type: 'success', text: 'Application submitted successfully! Closing in 2 seconds...' });
        
        // Simulate redirect/closing after a delay
        setTimeout(() => {
          onClose();
        }, 2000); 

      } catch (error) {
        console.error("Error submitting application:", error);
        setSubmitMessage({ type: 'error', text: 'Failed to submit application. Please check console for details.' });
      } finally {
        setIsSubmitting(false);
      }
    };
    
    const MessageDisplay = () => {
        if (!submitMessage.text) return null;
        const color = submitMessage.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700';
        return (
            <div className={`p-3 rounded-lg font-medium mb-4 ${color}`}>
                {submitMessage.text}
            </div>
        );
    };

    return (
      <form onSubmit={handleSubmitApplication} className="space-y-4">
        <MessageDisplay />
        
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input
            type="text" value={name} onChange={(e) => setName(e.target.value)} required
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="John Doe"
          />
        </div>
        
        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} required
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="john.doe@example.com"
          />
        </div>

        {/* Resume URL (simplified submission) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Resume/CV Link (e.g., Google Drive/Dropbox)</label>
          <input
            type="url" value={resumeUrl} onChange={(e) => setResumeUrl(e.target.value)} required
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="https://drive.google.com/my-resume"
          />
        </div>

        {/* Cover Letter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Cover Letter Text (Max 500 characters)</label>
          <textarea
            value={coverLetterText} onChange={(e) => setCoverLetterText(e.target.value)}
            maxLength={500} rows="4"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 resize-none"
            placeholder="Why are you a good fit for this role? (Max 500 chars)"
          />
          <p className="text-right text-xs text-gray-500">{coverLetterText.length}/500</p>
        </div>

        {/* Submission Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition duration-150 shadow-lg mt-6 disabled:opacity-50"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Application'}
        </button>
      </form>
    );
  };
  
  const PostingDetailsModal = ({ isOpen, onClose, posting }) => {
    const [activeTab, setActiveTab] = useState('overview');
    
    // Reset tab when a new posting is selected/modal opens
    useEffect(() => {
        if (isOpen) {
            setActiveTab('overview');
        }
    }, [isOpen, posting]);
    

    // Get detailed dummy info for the selected posting
    const details = useMemo(() => getDummyDetails(posting?._id), [posting?._id]); 
    if (!isOpen || !posting) return null;
    const tabs = [
      { id: 'overview', name: 'Overview' },
      { id: 'company', name: 'Details' },
      { id: 'apply', name: 'Apply Now' },
    ];

    const TabButton = ({ id, name }) => (
      <button
        onClick={() => setActiveTab(id)}
        className={`px-4 py-2 text-base font-semibold transition-all duration-200 ${
          activeTab === id
            ? 'border-b-4 border-indigo-600 text-indigo-700'
            : 'text-gray-600 hover:text-indigo-500'
        }`}
      >
        {name}
      </button>
    );

    const TabContent = () => {
      switch (activeTab) {
        case 'overview':
          return (
            <div className="space-y-6 p-6">
                <p className="text-gray-700 text-lg">{posting.desc}</p>
                <div className="border-t pt-4">
                  <h3 className="text-xl font-bold text-gray-800 border-b pb-2 mb-3">Key Responsibilities</h3>
                  <ul className="list-disc pl-5 space-y-2 text-gray-600">
                      {details.responsibilities.map((r, i) => <li key={i}>{r}</li>)}
                  </ul>
                </div>
                <div className="border-t pt-4">
                  <h3 className="text-xl font-bold text-gray-800 border-b pb-2 mb-3">What Youll Gain</h3>
                  <ul className="list-disc pl-5 space-y-2 text-gray-600">
                      {details.benefits.map((b, i) => <li key={i}>{b}</li>)}
                  </ul>
                </div>
            </div>
          );
        case 'company':
          return (
            <div className="space-y-6 p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
                    <p className="font-semibold">Posted By: <span className="font-normal">{posting.posted_by}</span></p>
                    <p className="font-semibold">Contact Email: <span className="font-normal text-indigo-500">{posting.company_mail || 'N/A'}</span></p>
                </div>
                
                <div className="border-t pt-4">
                  <h3 className="text-xl font-bold text-gray-800 border-b pb-2 mb-3">Required Qualifications</h3>
                  <div className="flex flex-wrap gap-2 pt-2">
                      {posting.required_skills && posting.required_skills.map(skill => (
                          <span key={skill} className="px-3 py-1 text-sm font-medium bg-indigo-100 text-indigo-600 rounded-full">
                              {skill}
                          </span>
                      ))}
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h3 className="text-xl font-bold text-gray-800 border-b pb-2 mb-3">Application Checklist</h3>
                  <ul className="list-disc pl-5 space-y-2 text-gray-600">
                      {details.applicationRequirements.map((r, i) => <li key={i}>{r}</li>)}
                  </ul>
                </div>
            </div>
          );
        case 'apply':
          return (
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Complete Your Application</h3>
              <ApplicationForm posting={posting} onClose={onClose} />
            </div>
          );
        default:
          return null;
      }
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4" onClick={onClose}>
        <div 
          className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto transform transition-all"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header */}
          <div className="sticky top-0 bg-white p-6 border-b z-10 rounded-t-xl">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <h2 className="text-3xl font-extrabold text-gray-900">{posting.title}</h2>
                <p className="text-lg font-medium text-indigo-600">{posting.company}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-600 pt-1">
                    <span className="flex items-center space-x-1"><LocationIcon /> <span>{posting.location}</span></span>
                    <span className="flex items-center space-x-1"><MoneyIcon /> <span>${posting.stipend}/mo</span></span>
                    <span className="flex items-center space-x-1"><TimeIcon /> <span>{posting.duration}</span></span>
                </div>
              </div>
              <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-3xl leading-none ml-4">&times;</button>
            </div>
            
            {/* Tabs */}
            <div className="flex border-b border-gray-200 mt-4 -mb-6">
              {tabs.map(tab => <TabButton key={tab.id} id={tab.id} name={tab.name} />)}
            </div>
          </div>
          
          {/* Modal Body */}
          <div className="pb-6">
            <TabContent />
          </div>
        </div>
      </div>
    );
  };

  // --- New Application Dashboard Components ---

  const ApplicationDetailsModal = ({ isOpen, onClose, application }) => {
    const router = useRouter();
    if (!isOpen || !application) return null;

    const getStatusColor = (status) => {
        switch(status) {
            case 'Offer Extended': return 'bg-green-100 text-green-800 border-green-300';
            case 'Interview Scheduled': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
            case 'Rejected': return 'bg-red-100 text-red-800 border-red-300';
            case 'Pending Review': default: return 'bg-blue-100 text-blue-800 border-blue-300';
        }
    };

    return (
        <div className="fixed inset-0 bg-black/80 bg-opacity-60 z-50 flex justify-center items-center p-4" onClick={onClose}>
            <div 
                className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto transform transition-all p-6"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-start border-b pb-4 mb-4">
                    <h2 className="text-2xl font-bold text-indigo-700">Application Review</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-3xl leading-none">&times;</button>
                </div>

                <div className="space-y-4">
                    <h3 className="text-xl font-bold text-gray-800">{application.jobTitle} at {application.company}</h3>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <p className="font-semibold">Applicant: <span className="font-normal">{application.applicantName}</span></p>
                        <p className="font-semibold">Applied On: <span className="font-normal">{application.appliedDate}</span></p>
                        <p className="font-semibold">Email: <span className="font-normal text-indigo-500">{application.applicantEmail}</span></p>
                        
                    </div>
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
                    <div className="pt-4 border-t">
                        <p className="font-semibold text-gray-700 mb-2">Current Status:</p>
                        <span className={`px-4 py-2 text-md font-semibold rounded-lg border ${getStatusColor(application.status)}`}>
                            {application.status}
                        </span>
                    </div>

                    <div className="pt-4 border-t">
                        <h4 className="text-lg font-bold text-gray-800 mb-2">Cover Letter / Notes:</h4>
                        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 text-gray-700 italic">
                            {application.coverLetter || 'No cover letter provided.'}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
  };


  const ApplicationsDashboard = () => {
    const [applications, setApplications] = useState([]);
    const [appSearchTerm, setAppSearchTerm] = useState('');
    const [appFilters, setAppFilters] = useState({
        status: '',
        jobTitle: '',
    });
    const [isAppDetailsModalOpen, setIsAppDetailsModalOpen] = useState(false);
    const [selectedApplication, setSelectedApplication] = useState(null);

    // 1. Fetch Applications Data
    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const response = await apiClient.get('/applications/all');
                setApplications(response.data);
            } catch (error) {
                console.error("Error fetching applications:", error);
            }
        };
        fetchApplications();
    }, []);

    // 2. Filtering Logic
    const filteredApplications = useMemo(() => {
        return applications.filter(app => {
            // Search filter (Name or Company)
            const matchesSearch = app.applicantName.toLowerCase().includes(appSearchTerm.toLowerCase()) ||
                                app.company.toLowerCase().includes(appSearchTerm.toLowerCase());
            if (!matchesSearch) return false;

            // Status filter
            const matchesStatus = appFilters.status === '' || app.status === appFilters.status;
            if (!matchesStatus) return false;

            // Job Title filter
            const matchesJob = appFilters.jobTitle === '' || app.jobTitle === appFilters.jobTitle;
            if (!matchesJob) return false;

            return true;
        });
    }, [applications, appSearchTerm, appFilters]);
    
    // 3. Status Color Utility
    const getStatusPill = (status) => {
        let colorClass = '';
        switch(status) {
            case 'Offer Extended': colorClass = 'bg-green-500 text-white'; break;
            case 'Interview Scheduled': colorClass = 'bg-yellow-500 text-gray-800'; break;
            case 'Rejected': colorClass = 'bg-red-500 text-white'; break;
            case 'Pending Review': default: colorClass = 'bg-indigo-500 text-white'; break;
        }
        return (
            <span className={`px-3 py-1 text-xs font-semibold rounded-full ${colorClass}`}>
                {status}
            </span>
        );
    };

    // 4. Handlers
    const handleFilterChange = (key, value) => {
        setAppFilters(prev => ({ ...prev, [key]: value }));
    };

    const handleViewApplication = (application) => {
        setSelectedApplication(application);
        setIsAppDetailsModalOpen(true);
    };

    return (
        <div className="w-full space-y-6">
            <h2 className="text-3xl font-bold text-gray-800">Applications Dashboard</h2>

            {/* Application Search and Filters */}
            <div className="p-4 bg-white rounded-xl shadow-lg border border-gray-100 space-y-4">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search applicant name or company..."
                        value={appSearchTerm}
                        onChange={(e) => setAppSearchTerm(e.target.value)}
                        className="w-full p-4 pl-12 text-lg border border-gray-300 rounded-xl focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                    />
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                        <CiSearch className='text-2xl'/>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Status Filter */}
                    <select
                        value={appFilters.status}
                        onChange={(e) => handleFilterChange('status', e.target.value)}
                        className="p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                    >
                        <option value="">All Statuses</option>
                        {allStatuses.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>

                    {/* Job Title Filter */}
                    <select
                        value={appFilters.jobTitle}
                        onChange={(e) => handleFilterChange('jobTitle', e.target.value)}
                        className="p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                    >
                        <option value="">All Jobs</option>
                        {allApplicationJobs.map(j => <option key={j} value={j}>{j}</option>)}
                    </select>

                    {/* Clear Filters */}
                    <button 
                        onClick={() => { setAppFilters({ status: '', jobTitle: '' }); setAppSearchTerm(''); }}
                        className="py-2 bg-red-100 text-red-600 font-semibold rounded-lg hover:bg-red-200 transition duration-150"
                    >
                        Clear Filters
                    </button>
                </div>
            </div>

            <h3 className="text-xl font-bold text-gray-800">
                Showing {filteredApplications.length} Applications
            </h3>
            
            {/* Applications Table */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-x-auto">
                {filteredApplications.length > 0 ? (
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applicant</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job / Company</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applied On</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredApplications.map(app => (
                                <tr key={app.id} className="hover:bg-gray-50 transition duration-150">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{app.applicantName}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                        <p className="font-semibold">{app.jobTitle}</p>
                                        <p className="text-xs text-indigo-500">{app.company}</p>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {getStatusPill(app.status)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{app.appliedDate}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button 
                                            onClick={() => handleViewApplication(app)}
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
                        <p className="text-xl font-medium">No applications match your current filters.</p>
                    </div>
                )}
            </div>

            {/* Details Modal */}
            <ApplicationDetailsModal
                isOpen={isAppDetailsModalOpen}
                onClose={() => setIsAppDetailsModalOpen(false)}
                application={selectedApplication}
            />
        </div>
    );
  };

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
      <div className="flex max-w-7xl mx-auto">
        
        {/* Mobile Overlay (Retained but not functional since sidebar is removed) */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden" 
            onClick={() => setIsSidebarOpen(false)}
          ></div>
        )}

        {/* Filter Sidebar (Removed conditional rendering, but kept component definition) */}
        {/* Removed FilterSidebar from rendering */}
        

        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          
          {/* Always render Applications Dashboard */}
          <ApplicationsDashboard />

        </main>
      </div>

      {/* Floating Action Button (FAB) - REMOVED */}

      {/* The Add Posting Modal (Kept definition but not reachable) */}
      <AddPostingModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddPosting}
        locations={allLocations}
      />

      {/* The Details/Application Modal (Kept definition but not reachable) */}
      <PostingDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        posting={selectedPosting}
      />

    </div>
  );
};

export default Postings;
