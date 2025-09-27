import { SignUp } from "@clerk/nextjs";
import { ClerkLoaded, ClerkLoading } from '@clerk/nextjs'


export default function SignUpPage() {
  return (
    <>
    <ClerkLoaded>
      <SignUp/>
    </ClerkLoaded>
    <ClerkLoading>
      Loading...
    </ClerkLoading>
  </>
  )
}