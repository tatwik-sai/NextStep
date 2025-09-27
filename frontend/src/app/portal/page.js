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
                if (!response.data.exists) {
                    setRole(response.data.role);
                    if (response.data.role === 'candidate') {
                        router.push('portal/candidate/profile');
                    } else if (response.data.role === 'employer') {
                        router.push('portal/employer/profile');
                    }
                }
            }
        }
        fetchData();
    }, [isLoaded, user])
    return (
        <div>Loading...</div>
    )
}

export default PortalPage