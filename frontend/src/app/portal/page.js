"use client"
import { useUserStore } from "@/store/slices/UserSlice";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { apiClient } from '@/lib/apiClient';
import { useAuth, useUser } from "@clerk/nextjs";

const PortalPage = () => {
    const router = useRouter();
    const { role, setRole } = useUserStore();
    const { isLoaded, user } = useUser();

    useEffect(() => {
        async function fetchData() {
            if (isLoaded && user) {
                const response = await apiClient.get(`/users/${user.id}`);
                console.log(response.data);
                setRole(response.data.role);
                if (response.data.role === 'candidate') {
                    router.push('portal/candidate/profile');
                } else if (response.data.role === 'admin') {
                    router.push('portal/admin/users');
                } else if (response.data.role === 'committee') {
                    router.push('portal/committee/postings');
                }
            }
        }
        fetchData();
    }, [isLoaded, user])
    return (
        <div>
            No role was assigned to you contact the admin if you think this is a mistake.
        </div>
    )
}

export default PortalPage