"use client";
import { apiClient } from '@/lib/apiClient';
import { useUserStore } from '@/store/slices/UserSlice';
import React, { useState, useMemo, useEffect } from 'react';

// --- Icon Imports (using simple text/emoji for maximal compatibility) ---
const FilterIcon = () => <span className="text-xl">⚙️</span>;
const SearchIcon = () => <span className="text-xl">🔍</span>;
const LocationIcon = () => <span className="text-xl">📍</span>;
const MoneyIcon = () => <span className="text-xl">💰</span>;
const TimeIcon = () => <span className="text-xl">⏱️</span>;
const SkillIcon = () => <span className="text-xl">💡</span>;
const PlusIcon = () => <span className="text-4xl leading-none">+</span>;


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
  // const {}
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // New state for dialog

  useEffect(() => {
    // Fetch postings from backend API on component mount
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
      _id: Date.now(), // Unique ID based on timestamp
      // Ensure stipend is a number and skills is an array, then add the new posting
      stipend: Number(newPostingData.stipend),
      required_skills: newPostingData.required_skills.split(',').map(s => s.trim()).filter(s => s.length > 0),
      company_mail: newPostingData.company_mail,
    };
    console.log("Adding new posting:", newPosting);
    await apiClient.post('/internships/addPosting', newPosting);
    setPostings(prev => [newPosting, ...prev]);
    setIsModalOpen(false); // Close modal on submit
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
        posting.required_skills.includes(skill)
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
        {posting.required_skills.map(skill => (
          <span key={skill} className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full">
            {skill}
          </span>
        ))}
      </div>
      
      <button className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition duration-150">
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
                    <option value="New Location">-- Add New Location --</option>
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

  return (
    <div className="min-h-screen bg-gray-50 font-sans">

      <div className="flex max-w-7xl mx-auto">
        
        {/* Mobile Overlay */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden" 
            onClick={() => setIsSidebarOpen(false)}
          ></div>
        )}

        {/* Filter Sidebar (Desktop and Mobile) */}
        <FilterSidebar 
          isMobileOpen={isSidebarOpen} 
          onClose={() => setIsSidebarOpen(false)} 
        />

        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          
          {/* Search Bar */}
          <div className="mb-8 p-4 bg-white rounded-xl shadow-lg border border-gray-100">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by title, company..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-4 pl-12 text-lg border border-gray-300 rounded-xl focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
              />
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                <SearchIcon />
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Showing {filteredPostings.length} results
          </h2>

          {/* Postings Grid */}
          {filteredPostings.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredPostings.map(posting => (
                <PostingCard key={posting._id} posting={posting} />
              ))}
            </div>
          ) : (
            <div className="text-center p-10 bg-white rounded-xl shadow-lg">
              <p className="text-xl text-gray-600 font-medium">No internships match your current filters. Try adjusting your search or stipend range.</p>
            </div>
          )}
        </main>
      </div>

      {/* Floating Action Button (FAB) */}
      <button
          onClick={() => setIsModalOpen(true)}
          className="fixed bottom-6 right-6 lg:bottom-10 lg:right-10 w-14 h-14 bg-indigo-600 text-white rounded-full shadow-xl hover:bg-indigo-700 transition duration-300 flex items-center justify-center text-3xl z-40"
          title="Add New Posting"
      >
          <PlusIcon />
      </button>

      {/* The Modal */}
      <AddPostingModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddPosting}
        locations={allLocations}
      />

    </div>
  );
};

export default Postings;
