export interface EmergencyRequest {
  id: string
  title: string
  description: string
  patientCondition: string
  location: {
    address: string
    coordinates: {
      lat: number
      lng: number
    }
  }
  distance: number
  estimatedArrival: number
  urgencyLevel: "critical" | "high" | "moderate"
  caseType: "cardiac" | "trauma" | "respiratory" | "other"
  timestamp: Date
  expiresIn: number
}

export interface ResponderInfo {
  id: string
  fullName: string
  dateOfBirth: string
  profileImage?: string
  vehicle: {
    color: string
    model: string
    licensePlate: string
  }
  driversLicense: {
    fileUrl: string
    fileName: string
    expiryDate: string
  }
  certifications: Certification[]
}

export interface Certification {
  id: string
  type: string
  fileUrl: string
  fileName: string
  issueDate: string
  expiryDate: string
}
