import { useUser } from '@clerk/nextjs';
import React from 'react'

const CandidateProfile = () => {
  const { isLoaded, user } = useUser();
  return (
    <div>
      Hello World
    </div>
  )
}

export default CandidateProfile