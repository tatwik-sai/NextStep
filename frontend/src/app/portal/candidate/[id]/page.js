"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { FiUser, FiStar, FiBriefcase, FiBookOpen, FiLink, FiUpload, FiMail, FiMapPin, FiExternalLink, FiDownload, FiAward, FiCode } from "react-icons/fi";
import { apiClient } from "@/lib/apiClient";
import { toast } from "sonner";
import { HOST } from "@/utils/constants";
import { Button } from "@/components/ui/button";

const CandidateProfileView = () => {
  const params = useParams();
  const [isLoaded, setIsLoaded] = useState(false);
  const [user, setUser] = useState(null);

  // State
  const [cgpa, setCgpa] = useState();
  const [skills, setSkills] = useState([]);
  const [description, setDescription] = useState("");
  const [portfolioUrl, setPortfolioUrl] = useState("");
  const [resume, setResume] = useState(null);
  const [experiences, setExperiences] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    async function fetchCandidateData() {
      try {
        const userResponse = await apiClient.get(`/users/${params.id}`);
        setUser(userResponse.data);
        console.log(userResponse.data);
        setIsLoaded(true);
        const response = await apiClient.get(`/candidates/${params.id}`);
        const data = response.data;
        console.log("Candidate data:", data);
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
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {isLoaded ? (
        <div className="max-w-7xl mx-auto p-6 space-y-8">
          {/* Hero Section */}
          <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 rounded-3xl overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
            <div className="relative p-6 md:p-8">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                  <img
                    src={user.imageUrl}
                    alt="Profile"
                    className="relative w-20 h-20 rounded-full object-cover border-3 border-white/20 shadow-2xl"
                  />
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 border-3 border-white rounded-full shadow-lg"></div>
                </div>
                <div className="flex-1 text-white">
                  <h1 className="text-xl md:text-2xl font-bold mb-2 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                    {user.firstName} {user.lastName}
                  </h1>
                  <div className="flex items-center gap-2 mb-4 text-blue-100">
                    <FiMail className="w-4 h-4" />
                    <span className="text-sm">{user.email}</span>
                  </div>
                  {cgpa && (
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex items-center bg-yellow-500/20 backdrop-blur-sm px-4 py-2 rounded-full border border-yellow-300/30">
                        <FiStar className="w-5 h-5 text-yellow-300 mr-2" />
                        <span className="text-white font-semibold">CGPA: {cgpa}</span>
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex gap-3">
                  {portfolioUrl && (
                    <Button
                      asChild
                      variant="outline"
                      className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
                    >
                      <a href={portfolioUrl} target="_blank" rel="noopener noreferrer">
                        <FiExternalLink className="w-4 h-4 mr-2" />
                        Portfolio
                      </a>
                    </Button>
                  )}
                  {resume && (
                    <Button
                      asChild
                      variant="outline"
                      className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
                    >
                      <a href={resume} target="_blank" rel="noopener noreferrer">
                        <FiDownload className="w-4 h-4 mr-2" />
                        Resume
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* About Section */}
              {description && (
                <div className="bg-white rounded-2xl shadow-xl border border-white/50 overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 border-b">
                    <h2 className="text-lg font-bold text-gray-900 flex items-center gap-3">
                      <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                        <FiUser className="w-3 h-3 text-white" />
                      </div>
                      About Me
                    </h2>
                  </div>
                  <div className="p-4">
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line text-sm">{description}</p>
                  </div>
                </div>
              )}

              {/* Experience Section */}
              <div className="bg-white rounded-2xl shadow-xl border border-white/50 overflow-hidden">
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 border-b">
                  <h2 className="text-lg font-bold text-gray-900 flex items-center gap-3">
                    <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                      <FiBriefcase className="w-3 h-3 text-white" />
                    </div>
                    Professional Experience
                  </h2>
                </div>
                <div className="p-4">
                  {experiences.length > 0 ? (
                    <div className="space-y-6">
                      {experiences.map((exp, idx) => (
                        <div key={idx} className="relative pl-8 pb-6 border-l-2 border-green-200 last:border-l-0 last:pb-0">
                          <div className="absolute -left-2 top-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-md"></div>
                          <div className="bg-gradient-to-r from-green-50 to-transparent p-4 rounded-xl border border-green-100">
                            <h3 className="text-base font-bold text-gray-900 mb-2">{exp.role || "N/A"}</h3>
                            <p className="text-green-600 font-semibold mb-2 text-sm">{exp.company || "N/A"}</p>
                            <p className="text-gray-600 flex items-center gap-2">
                              <FiMapPin className="w-4 h-4" />
                              {exp.duration || "N/A"}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <FiBriefcase className="w-6 h-6 text-gray-400" />
                      </div>
                      <p className="text-gray-500 text-sm">No professional experience added yet</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Projects Section */}
              <div className="bg-white rounded-2xl shadow-xl border border-white/50 overflow-hidden">
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 border-b">
                  <h2 className="text-lg font-bold text-gray-900 flex items-center gap-3">
                    <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                      <FiCode className="w-3 h-3 text-white" />
                    </div>
                    Projects
                  </h2>
                </div>
                <div className="p-4">
                  {projects.length > 0 ? (
                    <div className="grid gap-6">
                      {projects.map((proj, idx) => (
                        <div key={idx} className="group bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-100 hover:shadow-lg transition-all duration-300">
                          <div className="flex items-start justify-between mb-3">
                            <h3 className="text-base font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                              {proj.name || "Untitled Project"}
                            </h3>
                            {proj.link && (
                              <Button
                                asChild
                                variant="outline"
                                size="sm"
                                className="shrink-0 hover:bg-purple-500 hover:text-white border-purple-200"
                              >
                                <a href={proj.link} target="_blank" rel="noopener noreferrer">
                                  <FiExternalLink className="w-4 h-4" />
                                </a>
                              </Button>
                            )}
                          </div>
                          <p className="text-gray-700 leading-relaxed text-sm">{proj.description || "No description provided"}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <FiCode className="w-6 h-6 text-gray-400" />
                      </div>
                      <p className="text-gray-500 text-sm">No projects added yet</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              {/* Skills Section */}
              <div className="bg-white rounded-2xl shadow-xl border border-white/50 overflow-hidden">
                <div className="bg-gradient-to-r from-orange-50 to-red-50 p-4 border-b">
                  <h2 className="text-lg font-bold text-gray-900 flex items-center gap-3">
                    <div className="w-6 h-6 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                      <FiAward className="w-3 h-3 text-white" />
                    </div>
                    Skills & Expertise
                  </h2>
                </div>
                <div className="p-4">
                  {skills.length > 0 ? (
                    <div className="flex flex-wrap gap-3">
                      {skills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-gradient-to-r from-orange-100 to-red-100 text-orange-800 rounded-full text-xs font-medium border border-orange-200 hover:shadow-md transition-shadow"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2">
                        <FiAward className="w-5 h-5 text-gray-400" />
                      </div>
                      <p className="text-gray-500 text-sm">No skills added yet</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Resume Preview */}
              {resume && (
                <div className="bg-white rounded-2xl shadow-xl border border-white/50 overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 border-b">
                    <h2 className="text-lg font-bold text-gray-900 flex items-center gap-3">
                      <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
                        <FiUpload className="w-3 h-3 text-white" />
                      </div>
                      Resume
                    </h2>
                  </div>
                  <div className="p-4">
                    <div className="relative group">
                      <iframe
                        src={resume}
                        className="w-full h-64 border-2 border-gray-200 rounded-xl shadow-inner"
                        title="Resume Preview"
                      />
                      <div className="absolute top-4 right-4">
                        <Button
                          asChild
                          size="sm"
                          className="bg-black/80 hover:bg-black text-white shadow-lg"
                        >
                          <a href={resume} target="_blank" rel="noopener noreferrer">
                            <FiExternalLink className="w-4 h-4 mr-2" />
                            Open
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
          <div className="text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <FiUser className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-lg font-bold text-gray-900 mb-2">Loading Profile...</h2>
            <p className="text-gray-600">Please wait while we fetch the candidate information</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CandidateProfileView;
