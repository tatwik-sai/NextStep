// "use client"
// import { useUserStore } from "@/store/slices/UserSlice";
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";
// import { apiClient } from '@/lib/apiClient';
// import { useAuth, useUser } from "@clerk/nextjs";
// import { Button } from "@/components/ui/button";
// import { SiNextra } from "react-icons/si";

// const PortalPage = () => {
//     const router = useRouter();
//     const { signOut } = useAuth();
//     const { role, setRole } = useUserStore();
//     const { isLoaded, user } = useUser();

//     useEffect(() => {
//         async function fetchData() {
//             if (isLoaded && user) {
//                 const response = await apiClient.get(`/users/${user.id}`);
//                 console.log(response.data);
//                 setRole(response.data.role);
//                 if (response.data.role === 'candidate') {
//                     router.push('portal/candidate/profile');
//                 } else if (response.data.role === 'admin') {
//                     router.push('portal/admin/users');
//                 } else if (response.data.role === 'committee') {
//                     router.push('portal/committee/postings');
//                 }
//             }
//         }
//         fetchData();
//     }, [isLoaded, user])
//     return (
//         <div>
//             <div className="text-xl flex items-center justify-center gap-2 mb-4">
//                 <SiNextra className='text-4xl text-blue-600' />
//                 <h2 className=" font-bold text-3xl">Next<span className="text-blue-600 font-bold text-3xl">Step</span></h2>
//             </div>
//             <Button className="flex gap-3 items-center p-3 pb-8 w-full justify-start cursor-pointer" onClick={() => signOut()}>
//                     <span className="text-white text-md font-medium">Logout</span>
//             </Button>
//             No role was assigned to you contact the admin if you think this is a mistake.
//         </div>
//     )
// }

// export default PortalPage

"use client"
import { useUserStore } from "@/store/slices/UserSlice";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { apiClient } from '@/lib/apiClient';
import { useAuth, useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import {
    SiNextra,
} from "react-icons/si";
import {
    FaUserShield,
    FaExclamationTriangle,
    FaSignOutAlt,
    FaSpinner,
    FaEnvelope,
    FaUserCog,
    FaHome
} from "react-icons/fa";

const PortalPage = () => {
    const router = useRouter();
    const { signOut } = useAuth();
    const { role, setRole } = useUserStore();
    const { isLoaded, user } = useUser();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function fetchData() {
            if (isLoaded && user) {
                try {
                    setLoading(true);
                    const response = await apiClient.get(`/users/${user.id}`);
                    console.log(response.data);
                    setRole(response.data.role);

                    // Add a small delay for better UX
                    setTimeout(() => {
                        if (response.data.role === 'candidate') {
                            router.push('portal/candidate/profile');
                        } else if (response.data.role === 'admin') {
                            router.push('portal/admin/users');
                        } else if (response.data.role === 'committee') {
                            router.push('portal/committee/postings');
                        } else if (response.data.role === 'employer') {
                            router.push('portal/recruiter/applications');
                        } else if (response.data.role === 'mentor') {
                            router.push('portal/mentor/applications');
                        }
                        else {
                            setLoading(false);
                        }
                    }, 1500);
                } catch (err) {
                    console.error('Error fetching user data:', err);
                    setError(true);
                    setLoading(false);
                }
            }
        }
        fetchData();
    }, [isLoaded, user, router, setRole])

    async function makeAdmin() {
        try {
            const response = await apiClient.put(`/users/${user.id}`, { role: 'admin' });
            console.log(response.data);
            setRole('admin');
            router.push('portal/admin/users');
        } catch (err) {
            console.error('Error making admin:', err);
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center p-4">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 32 32%27 width=%2732%27 height=%2732%27 fill=%27none%27 stroke=%27rgb(59 130 246 / 0.05)%27%3e%3cpath d=%27m0 .5 32 32M32 .5 0 32%27/%3e%3c/svg%3e')] opacity-50"></div>

                <div className="relative z-10 bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 p-12 text-center max-w-md w-full">
                    {/* Loading Animation */}
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl shadow-lg mb-6">
                        <FaSpinner className="w-8 h-8 text-white animate-spin" />
                    </div>

                    {/* Brand */}
                    <div className="flex items-center justify-center gap-2 mb-6">
                        <SiNextra className='text-3xl text-blue-600' />
                        <h2 className="font-bold text-2xl">Next<span className="text-blue-600 font-bold">Step</span></h2>
                    </div>

                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Setting Up Your Portal</h3>
                    <p className="text-gray-600 mb-6">Please wait while we configure your dashboard...</p>

                    {/* Loading Progress Bar */}
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                        <div className="bg-gradient-to-r from-blue-600 to-blue-700 h-2 rounded-full animate-pulse" style={{ width: '70%' }}></div>
                    </div>

                    <p className="text-sm text-gray-500">This may take a few moments...</p>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-10 left-10 w-20 h-20 bg-blue-200/30 rounded-full blur-xl"></div>
                <div className="absolute bottom-10 right-10 w-32 h-32 bg-blue-300/20 rounded-full blur-2xl"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center p-4">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 32 32%27 width=%2732%27 height=%2732%27 fill=%27none%27 stroke=%27rgb(59 130 246 / 0.05)%27%3e%3cpath d=%27m0 .5 32 32M32 .5 0 32%27/%3e%3c/svg%3e')] opacity-50"></div>

            <div className="relative z-10 max-w-md w-full">
                {/* Main Card */}
                <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 p-8 text-center">
                    {/* Alert Icon */}
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl shadow-lg mb-6">
                        <FaExclamationTriangle className="w-8 h-8 text-white" />
                    </div>

                    {/* Brand */}
                    <div className="flex items-center justify-center gap-2 mb-6">
                        <SiNextra className='text-3xl text-blue-600' />
                        <h2 className="font-bold text-2xl">Next<span className="text-blue-600 font-bold">Step</span></h2>
                    </div>

                    <Button
                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg shadow-md transition"
                        onClick={() => {
                            makeAdmin();
                        }}
                    >
                        Make Admin
                    </Button>
                    <p className="text-sm text-gray">Just for testing</p>

                    {/* Error Message */}
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Access Restricted</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                        No role has been assigned to your account yet. Please contact the administrator to get access to your dashboard.
                    </p>

                    {/* User Info */}
                    {user && (
                        <div className="bg-gray-50/80 rounded-2xl p-4 mb-6 text-left">
                            <div className="flex items-center gap-3 mb-2">
                                <img
                                    src={user.imageUrl}
                                    alt={user.fullName}
                                    className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
                                />
                                <div>
                                    <p className="font-semibold text-gray-900 text-sm">{user.fullName}</p>
                                    <p className="text-gray-600 text-xs">{user.primaryEmailAddress?.emailAddress}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                                <FaUserShield className="w-3 h-3" />
                                <span>Status: Pending Role Assignment</span>
                            </div>
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="space-y-3">
                        {/* Contact Admin Button */}
                        <Button
                            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                            onClick={() => {
                                // You can replace this with actual admin contact logic
                                window.open('mailto:admin@nextstep.edu?subject=Role Assignment Request&body=Hello, I need a role assigned to my account.', '_blank');
                            }}
                        >
                            <FaEnvelope className="w-4 h-4 mr-2" />
                            Contact Administrator
                        </Button>

                        {/* Secondary Actions */}
                        <div className="flex gap-3">
                            <Button
                                variant="outline"
                                className="flex-1 border-gray-300 text-gray-600 hover:bg-gray-50 py-2 px-4 rounded-xl transition-all duration-200"
                                onClick={() => router.push('/')}
                            >
                                <FaHome className="w-4 h-4 mr-2" />
                                Home
                            </Button>

                            <Button
                                variant="outline"
                                className="flex-1 border-red-300 text-red-600 hover:bg-red-50 py-2 px-4 rounded-xl transition-all duration-200"
                                onClick={() => signOut()}
                            >
                                <FaSignOutAlt className="w-4 h-4 mr-2" />
                                Logout
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Help Text */}
                <div className="text-center mt-6">
                    <p className="text-sm text-gray-500">
                        Need immediate help? Contact support at{' '}
                        <a
                            href="mailto:support@nextstep.edu"
                            className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                        >
                            support@nextstep.edu
                        </a>
                    </p>
                </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-10 left-10 w-20 h-20 bg-blue-200/30 rounded-full blur-xl"></div>
            <div className="absolute bottom-10 right-10 w-32 h-32 bg-blue-300/20 rounded-full blur-2xl"></div>
            <div className="absolute top-1/2 left-0 w-16 h-16 bg-blue-400/20 rounded-full blur-lg transform -translate-y-1/2"></div>
        </div>
    )
}

export default PortalPage