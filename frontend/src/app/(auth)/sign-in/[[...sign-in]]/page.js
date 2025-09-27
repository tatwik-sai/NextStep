import { SignIn } from "@clerk/nextjs";
import { ClerkLoaded, ClerkLoading } from '@clerk/nextjs'


export default function SignInPage() {
  return (
    <>
    <ClerkLoaded>
      <SignIn/>
    </ClerkLoaded>
    <ClerkLoading>
      Loading...
    </ClerkLoading>
  </>
  )
}