import { SignIn } from "@clerk/nextjs";
import { ClerkLoaded, ClerkLoading } from '@clerk/nextjs'
import { SiNextra } from "react-icons/si";

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 32 32%27 width=%2732%27 height=%2732%27 fill=%27none%27 stroke=%27rgb(59 130 246 / 0.05)%27%3e%3cpath d=%27m0 .5 32 32M32 .5 0 32%27/%3e%3c/svg%3e')] opacity-50"></div>
      
      {/* Main Container */}
      <div className="relative z-10 w-full max-w-md">
        <ClerkLoaded>
          {/* Header Section */}
          <div className="text-center mb-8 ml-4">
            <div className="text-xl flex items-center justify-center gap-2 mb-4">
              <SiNextra className='text-4xl text-blue-600' />
              <h2 className=" font-bold text-3xl">Next<span className="text-blue-600 font-bold text-3xl">Step</span></h2>
            </div>
            

            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
            <p className="text-gray-600">Sign in to your NextStep account</p>
          </div>

          {/* Sign In Card */}
          <div className="p-8 pb-0">
            <div className="[&_.cl-rootBox]:w-full [&_.cl-card]:w-full [&_.cl-card]:shadow-none [&_.cl-card]:border-0 [&_.cl-card]:bg-transparent [&_.cl-headerTitle]:text-2xl [&_.cl-headerTitle]:font-semibold [&_.cl-headerTitle]:text-gray-900 [&_.cl-headerSubtitle]:text-gray-600 [&_.cl-socialButtonsBlockButton]:bg-white [&_.cl-socialButtonsBlockButton]:border-gray-200 [&_.cl-socialButtonsBlockButton]:hover:bg-gray-50 [&_.cl-formFieldInput]:border-gray-200 [&_.cl-formFieldInput]:focus:border-blue-500 [&_.cl-formFieldInput]:focus:ring-blue-500/20 [&_.cl-formButtonPrimary]:bg-gradient-to-r [&_.cl-formButtonPrimary]:from-blue-600 [&_.cl-formButtonPrimary]:to-blue-700 [&_.cl-formButtonPrimary]:hover:from-blue-700 [&_.cl-formButtonPrimary]:hover:to-blue-800 [&_.cl-formButtonPrimary]:border-0 [&_.cl-formButtonPrimary]:shadow-lg [&_.cl-formButtonPrimary]:hover:shadow-xl [&_.cl-formButtonPrimary]:transition-all [&_.cl-formButtonPrimary]:duration-200 [&_.cl-dividerLine]:bg-gray-200 [&_.cl-dividerText]:text-gray-500 [&_.cl-footerActionLink]:text-blue-600 [&_.cl-footerActionLink]:hover:text-blue-700">
              <SignIn />
            </div>
          </div>

          {/* Footer */}
          <div className="text-center">
            <p className="text-sm text-gray-500 mt-10">
              Secure sign-in powered by advanced encryption
            </p>
          </div>
        </ClerkLoaded>

        <ClerkLoading>
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 p-12">
            <div className="text-center">
              {/* Loading Icon */}
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl shadow-lg mb-6">
                <div className="w-8 h-8 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
              </div>
              
              {/* Loading Text */}
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Loading Sign In</h2>
              <p className="text-gray-600">Please wait while we prepare your secure login...</p>
              
              {/* Loading Progress Bar */}
              <div className="mt-6 w-full bg-gray-200 rounded-full h-2">
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 h-2 rounded-full animate-pulse" style={{width: '60%'}}></div>
              </div>
            </div>
          </div>
        </ClerkLoading>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-blue-200/30 rounded-full blur-xl"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-blue-300/20 rounded-full blur-2xl"></div>
      <div className="absolute top-1/2 left-0 w-16 h-16 bg-blue-400/20 rounded-full blur-lg transform -translate-y-1/2"></div>
    </div>
  )
}