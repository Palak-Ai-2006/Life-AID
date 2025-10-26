"use client"

import { useState } from "react"
import { SignUpForm } from "@/components/sign-up-form"
import { InformationPage } from "@/components/information-page"

export type Certification = {
  id: string
  type: string
  file: File | null
  fileName: string
  issueDate: string
  expiryDate: string
}

export type UserData = {
  fullName: string
  dateOfBirth: string
  driverLicense: File | null
  driverLicensePreview: string
  carColor: string
  carModel: string
  licensePlate: string
  certifications: Certification[]
}

export default function Home() {
  const [isSignedUp, setIsSignedUp] = useState(false)
  const [userData, setUserData] = useState<UserData | null>(null)

  const handleSignUp = (data: UserData) => {
    setUserData(data)
    setIsSignedUp(true)
  }

  const handleLogOut = () => {
    setUserData(null)
    setIsSignedUp(false)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {!isSignedUp ? (
        <SignUpForm onSignUp={handleSignUp} />
      ) : (
        <InformationPage userData={userData!} onLogOut={handleLogOut} />
      )}
    </main>
  )
}
