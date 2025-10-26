"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, User, Car, Award } from "lucide-react"
import type { UserData, Certification } from "@/app/page"

type SignUpFormProps = {
  onSignUp: (data: UserData) => void
}

export function SignUpForm({ onSignUp }: SignUpFormProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    dateOfBirth: "",
    carColor: "",
    carModel: "",
    licensePlate: "",
  })

  const [driverLicense, setDriverLicense] = useState<File | null>(null)
  const [driverLicensePreview, setDriverLicensePreview] = useState("")

  const [certifications, setCertifications] = useState<Certification[]>([
    { id: "1", type: "", file: null, fileName: "", issueDate: "", expiryDate: "" },
  ])

  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const handleDriverLicenseUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setDriverLicense(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setDriverLicensePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
      if (errors.driverLicense) {
        setErrors((prev) => ({ ...prev, driverLicense: "" }))
      }
    }
  }

  const handleCertificationChange = (id: string, field: keyof Certification, value: string | File) => {
    setCertifications((prev) =>
      prev.map((cert) => {
        if (cert.id === id) {
          if (field === "file" && value instanceof File) {
            return { ...cert, file: value, fileName: value.name }
          }
          return { ...cert, [field]: value }
        }
        return cert
      }),
    )
    if (errors[`cert-${id}-${field}`]) {
      setErrors((prev) => ({ ...prev, [`cert-${id}-${field}`]: "" }))
    }
  }

  const addCertification = () => {
    const newId = (certifications.length + 1).toString()
    setCertifications((prev) => [
      ...prev,
      { id: newId, type: "", file: null, fileName: "", issueDate: "", expiryDate: "" },
    ])
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required"
    if (!formData.dateOfBirth) newErrors.dateOfBirth = "Date of birth is required"
    if (!driverLicense) newErrors.driverLicense = "Driver license picture is required"
    if (!formData.carColor.trim()) newErrors.carColor = "Car color is required"
    if (!formData.carModel.trim()) newErrors.carModel = "Car model is required"
    if (!formData.licensePlate.trim()) newErrors.licensePlate = "License plate is required"

    certifications.forEach((cert) => {
      if (!cert.type) newErrors[`cert-${cert.id}-type`] = "Certification type is required"
      if (!cert.file) newErrors[`cert-${cert.id}-file`] = "Certification file is required"
      if (!cert.issueDate) newErrors[`cert-${cert.id}-issueDate`] = "Issue date is required"
      if (!cert.expiryDate) newErrors[`cert-${cert.id}-expiryDate`] = "Expiry date is required"
    })

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      onSignUp({
        ...formData,
        driverLicense,
        driverLicensePreview,
        certifications,
      })
    }
  }

  return (
    <div className="container max-w-4xl mx-auto px-4 py-8 md:py-12">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-3 text-balance">
          Healthcare Professional Registration
        </h1>
        <p className="text-lg text-slate-600">Complete your profile to get started</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-slate-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <User className="h-5 w-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-slate-900">Personal Information</CardTitle>
                <CardDescription>Your basic details</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-slate-700 font-medium">
                Full Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="fullName"
                value={formData.fullName}
                onChange={(e) => handleInputChange("fullName", e.target.value)}
                placeholder="John Doe"
                className={errors.fullName ? "border-red-500" : ""}
              />
              {errors.fullName && <p className="text-sm text-red-500">{errors.fullName}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="dateOfBirth" className="text-slate-700 font-medium">
                Date of Birth <span className="text-red-500">*</span>
              </Label>
              <Input
                id="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                className={errors.dateOfBirth ? "border-red-500" : ""}
              />
              {errors.dateOfBirth && <p className="text-sm text-red-500">{errors.dateOfBirth}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="driverLicense" className="text-slate-700 font-medium">
                Driver's License Picture <span className="text-red-500">*</span>
              </Label>
              <div className="flex items-center gap-3">
                <Input
                  id="driverLicense"
                  type="file"
                  accept="image/*"
                  onChange={handleDriverLicenseUpload}
                  className={`flex-1 ${errors.driverLicense ? "border-red-500" : ""}`}
                />
                {driverLicensePreview && (
                  <div className="relative h-12 w-12 rounded-lg overflow-hidden border-2 border-blue-200">
                    <img
                      src={driverLicensePreview || "/placeholder.svg"}
                      alt="License preview"
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
              </div>
              {errors.driverLicense && <p className="text-sm text-red-500">{errors.driverLicense}</p>}
            </div>
          </CardContent>
        </Card>

        {/* Car Details */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-slate-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-600 rounded-lg">
                <Car className="h-5 w-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-slate-900">Car Details</CardTitle>
                <CardDescription>Information about your vehicle</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="carColor" className="text-slate-700 font-medium">
                  Car Color <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="carColor"
                  value={formData.carColor}
                  onChange={(e) => handleInputChange("carColor", e.target.value)}
                  placeholder="Blue"
                  className={errors.carColor ? "border-red-500" : ""}
                />
                {errors.carColor && <p className="text-sm text-red-500">{errors.carColor}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="carModel" className="text-slate-700 font-medium">
                  Car Model <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="carModel"
                  value={formData.carModel}
                  onChange={(e) => handleInputChange("carModel", e.target.value)}
                  placeholder="Toyota Camry"
                  className={errors.carModel ? "border-red-500" : ""}
                />
                {errors.carModel && <p className="text-sm text-red-500">{errors.carModel}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="licensePlate" className="text-slate-700 font-medium">
                License Plate Number <span className="text-red-500">*</span>
              </Label>
              <Input
                id="licensePlate"
                value={formData.licensePlate}
                onChange={(e) => handleInputChange("licensePlate", e.target.value)}
                placeholder="ABC-1234"
                className={errors.licensePlate ? "border-red-500" : ""}
              />
              {errors.licensePlate && <p className="text-sm text-red-500">{errors.licensePlate}</p>}
            </div>
          </CardContent>
        </Card>

        {/* Certifications */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-slate-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-600 rounded-lg">
                  <Award className="h-5 w-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-slate-900">Certifications</CardTitle>
                  <CardDescription>Your professional credentials</CardDescription>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            {certifications.map((cert, index) => (
              <div key={cert.id} className="p-4 border border-slate-200 rounded-lg bg-slate-50/50 space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-slate-900">Certification {index + 1}</h4>
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`cert-type-${cert.id}`} className="text-slate-700 font-medium">
                    Certification Type <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={cert.type}
                    onValueChange={(value) => handleCertificationChange(cert.id, "type", value)}
                  >
                    <SelectTrigger className={errors[`cert-${cert.id}-type`] ? "border-red-500" : ""}>
                      <SelectValue placeholder="Select certification type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="BLS">Basic Life Support (BLS)</SelectItem>
                      <SelectItem value="CPR AED">CPR AED</SelectItem>
                      <SelectItem value="ACLS">Advanced Cardiovascular Life Support (ACLS)</SelectItem>
                      <SelectItem value="PALS">Pediatrics Advanced Life Support (PALS)</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors[`cert-${cert.id}-type`] && (
                    <p className="text-sm text-red-500">{errors[`cert-${cert.id}-type`]}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`cert-file-${cert.id}`} className="text-slate-700 font-medium">
                    Certification Upload <span className="text-red-500">*</span>
                  </Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id={`cert-file-${cert.id}`}
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) handleCertificationChange(cert.id, "file", file)
                      }}
                      className={`flex-1 ${errors[`cert-${cert.id}-file`] ? "border-red-500" : ""}`}
                    />
                    {cert.fileName && (
                      <span className="text-sm text-slate-600 truncate max-w-[150px]">{cert.fileName}</span>
                    )}
                  </div>
                  {errors[`cert-${cert.id}-file`] && (
                    <p className="text-sm text-red-500">{errors[`cert-${cert.id}-file`]}</p>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`cert-issue-${cert.id}`} className="text-slate-700 font-medium">
                      Issue Date <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id={`cert-issue-${cert.id}`}
                      type="date"
                      value={cert.issueDate}
                      onChange={(e) => handleCertificationChange(cert.id, "issueDate", e.target.value)}
                      className={errors[`cert-${cert.id}-issueDate`] ? "border-red-500" : ""}
                    />
                    {errors[`cert-${cert.id}-issueDate`] && (
                      <p className="text-sm text-red-500">{errors[`cert-${cert.id}-issueDate`]}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`cert-expiry-${cert.id}`} className="text-slate-700 font-medium">
                      Expiry Date <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id={`cert-expiry-${cert.id}`}
                      type="date"
                      value={cert.expiryDate}
                      onChange={(e) => handleCertificationChange(cert.id, "expiryDate", e.target.value)}
                      className={errors[`cert-${cert.id}-expiryDate`] ? "border-red-500" : ""}
                    />
                    {errors[`cert-${cert.id}-expiryDate`] && (
                      <p className="text-sm text-red-500">{errors[`cert-${cert.id}-expiryDate`]}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}

            <Button
              type="button"
              variant="outline"
              onClick={addCertification}
              className="w-full border-dashed border-2 border-blue-300 text-blue-700 hover:bg-blue-50 hover:text-blue-800 bg-transparent"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add More Certification
            </Button>
          </CardContent>
        </Card>

        <Button
          type="submit"
          size="lg"
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold shadow-lg"
        >
          Sign Up
        </Button>
      </form>
    </div>
  )
}
