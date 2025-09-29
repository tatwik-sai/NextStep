"use client";
import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { FiUser, FiStar, FiBriefcase, FiBookOpen, FiLink, FiUpload, FiTrash2 } from "react-icons/fi";
import { apiClient } from "@/lib/apiClient";
import { toast } from "sonner";
import { HOST } from "@/utils/constants";

const CandidateProfile = () => {
  const { isLoaded, user } = useUser();

  // State
  const [cgpa, setCgpa] = useState();
  const [skills, setSkills] = useState([]);
  const [description, setDescription] = useState("");
  const [portfolioUrl, setPortfolioUrl] = useState("");
  const [resume, setResume] = useState(null);

  const [experiences, setExperiences] = useState([]);

  const [projects, setProjects] = useState([]);

  // Track changes for save button
  const [skillsChanged, setSkillsChanged] = useState(false);
  const [experiencesChanged, setExperiencesChanged] = useState(false);
  const [projectsChanged, setProjectsChanged] = useState(false);
  const [descriptionChanged, setDescriptionChanged] = useState(false);
  const [cgpaChanged, setCgpaChanged] = useState(false);
  const [portfolioChanged, setPortfolioChanged] = useState(false);

  useEffect(() => {
    if (isLoaded && user) {
      // Fetch candidate data from backend
      async function fetchCandidateData() {
        try {
          const response = await apiClient.get(`/candidates/${user.id}`);
          const data = response.data;
          console.log("Fetched candidate data:", data);
          setCgpa(data.cgpa || "");
          setSkills(data.skills || []);
          setDescription(data.description || "");
          setExperiences(data.experience || []);
          setProjects(data.projects || []);
          setPortfolioUrl(data.portfolioUrl || "");
          if (data.resumeUrl) {
            setResume(HOST + "/uploads/" + data.resumeUrl);
          }
        } catch (err) {
          console.error("Error fetching candidate data:", err);
          toast.error("Failed to fetch candidate data.");
        }
      }
      fetchCandidateData();
    }
  }, [isLoaded, user]);

  const handleResumeUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Preview locally
    setResume(URL.createObjectURL(file));

    // Prepare form data
    const formData = new FormData();
    formData.append("resume", file, `resume-${Date.now()}-${file.name}`);

    try {
      const response = await apiClient.post(`candidates/${user.id}/upload_resume`, formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });

      setResume(HOST + "/uploads/" + response.data.resumeUrl);
      console.log(HOST + "/uploads/" + response.data.resumeUrl);
      toast.success("Resume uploaded successfully!");
    } catch (err) {
      toast.error("Failed to upload resume.");
      console.error("Error uploading resume:", err);
    }
  };

  const addExperience = () => {
    setExperiences([...experiences, { company: "", role: "", duration: "" }]);
    setExperiencesChanged(true);
  };
  const addProject = () => {
    setProjects([...projects, { name: "", description: "", link: "" }]);
    setProjectsChanged(true);
  };
  const addSkill = () => {
    setSkills([...skills, ""]);
    setSkillsChanged(true);
  };

  const removeSkill = (idx) => {
    const newSkills = skills.filter((_, i) => i !== idx);
    setSkills(newSkills);
    setSkillsChanged(true);
  };

  const removeExperience = (idx) => {
    const newExp = experiences.filter((_, i) => i !== idx);
    setExperiences(newExp);
    setExperiencesChanged(true);
  };

  const removeProject = (idx) => {
    const newProj = projects.filter((_, i) => i !== idx);
    setProjects(newProj);
    setProjectsChanged(true);
  };

  const saveSection = async (section) => {
    switch (section) {
      case "Skills":
        console.log("Skills saved:", skills);
        await apiClient.put(`/candidates/${user.id}`, { skills });
        setSkillsChanged(false);
        break;
      case "Experiences":
        console.log("Experiences saved:", experiences);
        await apiClient.put(`/candidates/${user.id}`, { experience: experiences });
        setExperiencesChanged(false);
        break;
      case "Projects":
        console.log("Projects saved:", projects);
        await apiClient.put(`/candidates/${user.id}`, { projects });
        setProjectsChanged(false);
        break;
      case "About Me":
        console.log("Description saved:", description);
        await apiClient.put(`/candidates/${user.id}`, { description });
        setDescriptionChanged(false);
        break;
      case "CGPA":
        console.log("CGPA saved:", cgpa);
        await apiClient.put(`/candidates/${user.id}`, { cgpa });
        setCgpaChanged(false);
        break;
      case "Portfolio":
        console.log("Portfolio saved:", portfolioUrl);
        await apiClient.put(`/candidates/${user.id}`, { portfolioUrl });
        setPortfolioChanged(false);
        break;
      default:
        break;
    }
    alert(`${section} saved successfully!`);
  };


  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-6">
      
      {isLoaded && user ? (
        <>
          {/* Header */}
          <div className="flex items-center space-x-6 mb-8">
            <img
              src={user.imageUrl}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
            />
            <div>
              <h2 className="text-3xl font-bold flex items-center gap-2">
                <FiUser /> {user.firstName} {user.lastName}
              </h2>
              <p className="text-gray-500">{user.emailAddresses[0].emailAddress}</p>
            </div>
          </div>

          {/* CGPA */}
          <div className="mb-6">
            <h3 className="font-semibold text-xl flex items-center gap-2"><FiStar /> CGPA</h3>
            <div className="flex items-center gap-3 mt-2">
              <input
                type="number"
                step="0.01"
                className="p-2 border rounded w-32"
                value={cgpa}
                onChange={(e) => { setCgpa(e.target.value); setCgpaChanged(true); }}
              />
              {cgpaChanged && (
                <button
                  onClick={() => saveSection("CGPA")}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                  Save
                </button>
              )}
            </div>
          </div>

          {/* Skills */}
          <div className="mb-6">
            <h3 className="font-semibold text-xl flex items-center gap-2"><FiBookOpen /> Skills</h3>
            <div className="flex flex-wrap gap-2 mt-3 items-center">
              {skills.map((skill, idx) => (
                <div key={idx} className="flex items-center gap-1">
                  <input
                    type="text"
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                    value={skill}
                    onChange={(e) => { 
                      const newSkills = [...skills]; 
                      newSkills[idx] = e.target.value; 
                      setSkills(newSkills);
                      setSkillsChanged(true);
                    }}
                  />
                  <button onClick={() => removeSkill(idx)} className="text-red-500 hover:text-red-700">
                    <FiTrash2 />
                  </button>
                </div>
              ))}
              <button
                onClick={addSkill}
                className="bg-green-500 text-white px-3 py-1 rounded-full text-sm hover:bg-green-600"
              >
                + Add
              </button>
              {skillsChanged && (
                <button
                  onClick={() => saveSection("Skills")}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 ml-2"
                >
                  Save
                </button>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="font-semibold text-xl flex items-center gap-2"><FiBookOpen /> About Me</h3>
            <div className="flex flex-col md:flex-row gap-3 mt-2 items-start">
              <textarea
                className="p-3 border rounded w-full md:flex-1"
                rows={4}
                value={description}
                onChange={(e) => { setDescription(e.target.value); setDescriptionChanged(true); }}
              />
              {descriptionChanged && (
                <button
                  onClick={() => saveSection("About Me")}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                  Save
                </button>
              )}
            </div>
          </div>

          {/* Experiences */}
          <div className="mb-6">
            <h3 className="font-semibold text-xl flex items-center gap-2"><FiBriefcase /> Experiences</h3>
            <div className="space-y-4 mt-3">
              {experiences.map((exp, idx) => (
                <div key={idx} className="p-4 border rounded shadow-sm bg-gray-50 flex flex-col md:flex-row gap-4 relative">
                  <div className="flex-1">
                    <label className="text-sm font-medium text-gray-600">Company</label>
                    <input
                      type="text"
                      className="p-2 border rounded w-full mt-1"
                      value={exp.company}
                      onChange={(e) => { 
                        const newExp = [...experiences]; 
                        newExp[idx].company = e.target.value; 
                        setExperiences(newExp);
                        setExperiencesChanged(true);
                      }}
                    />
                  </div>
                  <div className="flex-1">
                    <label className="text-sm font-medium text-gray-600">Role</label>
                    <input
                      type="text"
                      className="p-2 border rounded w-full mt-1"
                      value={exp.role}
                      onChange={(e) => { 
                        const newExp = [...experiences]; 
                        newExp[idx].role = e.target.value; 
                        setExperiences(newExp);
                        setExperiencesChanged(true);
                      }}
                    />
                  </div>
                  <div className="flex-1">
                    <label className="text-sm font-medium text-gray-600">Time Span</label>
                    <input
                      type="text"
                      className="p-2 border rounded w-full mt-1"
                      value={exp.duration}
                      onChange={(e) => { 
                        const newExp = [...experiences]; 
                        newExp[idx].duration = e.target.value; 
                        setExperiences(newExp);
                        setExperiencesChanged(true);
                      }}
                    />
                  </div>
                  <button
                    onClick={() => removeExperience(idx)}
                    className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              ))}
              <div className="flex gap-3 mt-2">
                <button
                  onClick={addExperience}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  + Add Experience
                </button>
                {experiencesChanged && (
                  <button
                    onClick={() => saveSection("Experiences")}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Save
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Projects */}
          <div className="mb-6">
            <h3 className="font-semibold text-xl flex items-center gap-2"><FiBookOpen /> Projects</h3>
            <div className="space-y-4 mt-3">
              {projects.map((proj, idx) => (
                <div key={idx} className="p-4 border rounded shadow-sm bg-gray-50 flex flex-col md:flex-row gap-4 relative">
                  <div className="flex-1">
                    <label className="text-sm font-medium text-gray-600">Project Name</label>
                    <input
                      type="text"
                      className="p-2 border rounded w-full mt-1"
                      value={proj.name}
                      onChange={(e) => { 
                        const newProj = [...projects]; 
                        newProj[idx].name = e.target.value; 
                        setProjects(newProj);
                        setProjectsChanged(true);
                      }}
                    />
                  </div>
                  <div className="flex-1">
                    <label className="text-sm font-medium text-gray-600">Description</label>
                    <input
                      type="text"
                      className="p-2 border rounded w-full mt-1"
                      value={proj.description}
                      onChange={(e) => { 
                        const newProj = [...projects]; 
                        newProj[idx].description = e.target.value; 
                        setProjects(newProj);
                        setProjectsChanged(true);
                      }}
                    />
                  </div>
                  <div className="flex-1">
                    <label className="text-sm font-medium text-gray-600">Link</label>
                    <input
                      type="text"
                      className="p-2 border rounded w-full mt-1"
                      value={proj.link}
                      onChange={(e) => { 
                        const newProj = [...projects]; 
                        newProj[idx].link = e.target.value; 
                        setProjects(newProj);
                        setProjectsChanged(true);
                      }}
                    />
                  </div>
                  <button
                    onClick={() => removeProject(idx)}
                    className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              ))}
              <div className="flex gap-3 mt-2">
                <button
                  onClick={addProject}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  + Add Project
                </button>
                {projectsChanged && (
                  <button
                    onClick={() => saveSection("Projects")}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Save
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Resume & Portfolio */}
          <div className="mb-6">
            <h3 className="font-semibold text-xl flex items-center gap-2"><FiUpload /> Resume & Portfolio</h3>
            <div className="flex flex-col md:flex-row gap-4 mt-3">
              <div className="flex-1">
                <label className="text-sm font-medium text-gray-600">Upload Resume</label>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleResumeUpload}
                  className="p-2 border rounded w-full mt-1"
                />
              </div>
              <div className="flex-1">
                <label className="text-sm font-medium text-gray-600">Portfolio Link</label>
                <input
                  type="text"
                  placeholder="Portfolio Link"
                  className="p-2 border rounded w-full mt-1"
                  value={portfolioUrl}
                  onChange={(e) => { setPortfolioUrl(e.target.value); setPortfolioChanged(true); }}
                />
              </div>
              {portfolioChanged && (
                <button
                  onClick={() => saveSection("Portfolio")}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 self-start"
                >
                  Save
                </button>
              )}
            </div>
            {resume && (
              <div className="mt-4">
                <h4 className="font-medium mb-2">Resume Preview:</h4>
                <iframe
                  src={resume}
                  className="w-full h-190 border rounded"
                  title="Resume Preview"
                />
              </div>
            )}
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default CandidateProfile;
