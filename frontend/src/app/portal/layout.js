"use client"
import React, { useEffect } from 'react'
import { useAuth, useUser } from "@clerk/nextjs";
import { Button } from '@/components/ui/button';


const AppLayout = ({children}) => {
    const { signOut } = useAuth();
    const { isLoaded, user } = useUser();
    
    return (
        <div>
        <h1>App Layout</h1>
        {isLoaded && user ? <div>{user.firstName} {user.lastName}</div> : <div>Loading...</div>}
        <Button className="flex gap-3 items-center p-3 pb-8 w-full justify-start cursor-pointer" onClick={() => signOut()}>
                <span className="text-white text-md font-medium">Logout</span>
        </Button>
        {children}
        </div>
    )
}

export default AppLayout