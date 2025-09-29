"use client";
import { apiClient } from "@/lib/apiClient";
import { useUsersStore } from "@/store/slices/UsersSlice";
import { use, useEffect, useState } from "react";
import { toast, Toaster } from "sonner";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";



export default function UserManagement() {
  const { users, setUsers } = useUsersStore();
  const [editedRoles, setEditedRoles] = useState({});
  const [search, setSearch] = useState("");
  const router = useRouter();

  useEffect(() => {
    async function fetchUsers() {
      const users = await apiClient.get("/users");
      // only the users with role of non admin
      setUsers(users.data.filter((u) => u.role !== "admin"));
      console.log(users.data);
    }
    fetchUsers();
  }, []);

  const handleRoleChange = (id, newRole) => {
    setEditedRoles((prev) => ({ ...prev, [id]: newRole }));
  };

  const handleSave = async (id) => {
    const updatedUsers = users.map((u) =>
      u._id === id ? { ...u, role: editedRoles[id] || u.role } : u
    );
    setUsers(updatedUsers);
    try {
      await apiClient.put(`/users/${id}`, { role: editedRoles[id], previousRole: users.find(u => u._id === id).role });
      console.log("Saved user:", { role: editedRoles[id] });
    } catch (error) {
      toast.error("Failed to save user. Please try again.");
      console.error("Error saving user:", error);
    }
    setEditedRoles((prev) => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
  };

  const filteredUsers = users.filter(
    (u) =>
      u.firstName.toLowerCase().includes(search.toLowerCase()) ||
      (u.lastName?.toLowerCase() ?? "").includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  const getRoleBadgeColor = (role) => {
    const colors = {
      admin: "bg-red-100 text-red-800 border-red-200",
      candidate: "bg-blue-100 text-blue-800 border-blue-200",
      mentor: "bg-green-100 text-green-800 border-green-200",
      committee: "bg-purple-100 text-purple-800 border-purple-200",
      employer: "bg-orange-100 text-orange-800 border-orange-200",
      unassigned: "bg-gray-100 text-gray-600 border-gray-200"
    };
    return colors[role] || colors.unassigned;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <header className="bg-white shadow-md sticky top-0 z-20 mb-2">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <h1 className="text-3xl font-extrabold text-gray-900 flex items-center">
                        User Management
                    </h1>
                    <p className="text-md text-gray-500 mt-1">Manage and review user roles and permissions.</p>
                </div>
            </header>

      <div className="max-w-6xl mx-auto">
        
        {/* Search and Stats */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-2 mb-2">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-4">
            <div className="relative flex-1 max-w-4xl">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search by name or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
              />
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <span className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                Total Users: <span className="font-semibold ml-1">{filteredUsers.length}</span>
              </span>
            </div>
          </div>
        </div>

        {/* User Cards Grid */}
        <div className="grid gap-4">
          {filteredUsers.map((user) => (
            <div
              key={user._id}
              className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 p-6"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <img
                      src={user.imageUrl}
                      alt={user.firstName}
                      className="w-16 h-16 rounded-full object-cover border-2 border-gray-200 shadow-sm"
                    />
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-2 border-white rounded-full"></div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-1">
                      <h3 className="text-lg hover:text-blue-500 cursor-pointer font-semibold text-gray-900"
                      onClick={() => router.push(`/portal/candidate/${user._id}`)}>
                        {user.firstName} {user.lastName ?? ""}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getRoleBadgeColor(user.role)}`}>
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </span>
                    </div>
                    <p className="text-gray-600 flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                      </svg>
                      {user.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <select
                    value={editedRoles[user._id] ?? user.role}
                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 font-medium min-w-[140px]"
                  >
                    <option value="unassigned">Unassigned</option>
                    <option value="candidate">Candidate</option>
                    <option value="admin">Admin</option>
                    <option value="mentor">Mentor</option>
                    <option value="committee">Committee</option>
                    <option value="employer">Employer</option>
                  </select>

                  {editedRoles[user._id] && (
                    <Button
                      onClick={() => handleSave(user._id)}
                      size="sm"
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-md"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Save
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}

          {filteredUsers.length === 0 && (
            <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
              <p className="text-gray-600">Try adjusting your search criteria to find users.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
