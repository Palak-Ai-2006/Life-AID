import type { EmergencyRequest, ResponderInfo } from "./types"

export const mockEmergencyRequest: EmergencyRequest = {
  id: "1",
  title: "Cardiac Arrest - Assistance Needed",
  description:
    "Male patient, 58 years old, experiencing chest pain and difficulty breathing. Bystander performing CPR.",
  patientCondition: "Patient unconscious, CPR in progress. Possible myocardial infarction.",
  location: {
    address: "1234 Main Street, Downtown District",
    coordinates: {
      lat: 37.7749,
      lng: -122.4194,
    },
  },
  distance: 0.8,
  estimatedArrival: 4,
  urgencyLevel: "critical",
  caseType: "cardiac",
  timestamp: new Date(),
  expiresIn: 60,
}

export const mockResponderInfo: ResponderInfo = {
  id: "1",
  fullName: "Sarah Johnson",
  dateOfBirth: "1990-05-15",
  profileImage: "/professional-medical-responder-portrait.jpg",
  vehicle: {
    color: "Blue",
    model: "Honda Civic 2022",
    licensePlate: "ABC-1234",
  },
  driversLicense: {
    fileUrl: "/generic-identification-card.png",
    fileName: "drivers-license.pdf",
    expiryDate: "2028-05-15",
  },
  certifications: [
    {
      id: "1",
      type: "Emergency Medical Technician (EMT)",
      fileUrl: "/emt-certification-document.jpg",
      fileName: "emt-certification.pdf",
      issueDate: "2022-01-15",
      expiryDate: "2026-01-15",
    },
    {
      id: "2",
      type: "CPR & AED Certification",
      fileUrl: "/cpr-certification-document.jpg",
      fileName: "cpr-certification.pdf",
      issueDate: "2023-06-20",
      expiryDate: "2025-06-20",
    },
    {
      id: "3",
      type: "First Aid Certification",
      fileUrl: "/first-aid-certification.jpg",
      fileName: "first-aid-cert.pdf",
      issueDate: "2023-03-10",
      expiryDate: "2026-03-10",
    },
  ],
}

export const mockEmergencyRequests: EmergencyRequest[] = [
  {
    id: "1",
    title: "Cardiac Arrest - Assistance Needed",
    description:
      "Male patient, 58 years old, experiencing chest pain and difficulty breathing. Bystander performing CPR.",
    patientCondition: "Patient unconscious, CPR in progress. Possible myocardial infarction.",
    location: {
      address: "1234 Main Street, Downtown District",
      coordinates: {
        lat: 37.7749,
        lng: -122.4194,
      },
    },
    distance: 0.8,
    estimatedArrival: 4,
    urgencyLevel: "critical",
    caseType: "cardiac",
    timestamp: new Date(),
    expiresIn: 60,
  },
  {
    id: "2",
    title: "Motor Vehicle Accident - Multiple Injuries",
    description: "Two-car collision at intersection. Three patients with visible injuries, one trapped in vehicle.",
    patientCondition: "Multiple trauma patients, one with suspected spinal injury.",
    location: {
      address: "Oak Avenue & 5th Street Intersection",
      coordinates: {
        lat: 37.7849,
        lng: -122.4094,
      },
    },
    distance: 1.2,
    estimatedArrival: 6,
    urgencyLevel: "critical",
    caseType: "trauma",
    timestamp: new Date(Date.now() - 120000),
    expiresIn: 45,
  },
  {
    id: "3",
    title: "Severe Asthma Attack",
    description:
      "Female patient, 34 years old, experiencing severe breathing difficulty. Unable to speak full sentences.",
    patientCondition: "Acute respiratory distress, patient conscious but struggling to breathe.",
    location: {
      address: "789 Elm Street, Residential Area",
      coordinates: {
        lat: 37.7649,
        lng: -122.4294,
      },
    },
    distance: 1.5,
    estimatedArrival: 7,
    urgencyLevel: "high",
    caseType: "respiratory",
    timestamp: new Date(Date.now() - 180000),
    expiresIn: 0,
  },
  {
    id: "4",
    title: "Fall Injury - Elderly Patient",
    description: "Elderly male, 76 years old, fell down stairs. Possible hip fracture and head injury.",
    patientCondition: "Patient conscious, severe pain in hip area, minor head laceration.",
    location: {
      address: "456 Maple Drive, Senior Living Complex",
      coordinates: {
        lat: 37.7549,
        lng: -122.4394,
      },
    },
    distance: 2.1,
    estimatedArrival: 9,
    urgencyLevel: "high",
    caseType: "trauma",
    timestamp: new Date(Date.now() - 240000),
    expiresIn: 0,
  },
  {
    id: "5",
    title: "Allergic Reaction",
    description: "Young adult experiencing severe allergic reaction after bee sting. Swelling and hives present.",
    patientCondition: "Patient conscious, showing signs of anaphylaxis, has EpiPen available.",
    location: {
      address: "Central Park, Near Playground",
      coordinates: {
        lat: 37.7449,
        lng: -122.4494,
      },
    },
    distance: 2.8,
    estimatedArrival: 11,
    urgencyLevel: "moderate",
    caseType: "other",
    timestamp: new Date(Date.now() - 300000),
    expiresIn: 0,
  },
  {
    id: "6",
    title: "Chest Pain - Possible Heart Attack",
    description: "Male patient, 62 years old, severe chest pain radiating to left arm. Sweating and nausea.",
    patientCondition: "Patient conscious, classic MI symptoms, requesting immediate assistance.",
    location: {
      address: "2100 Business Plaza, Office Building",
      coordinates: {
        lat: 37.7349,
        lng: -122.4594,
      },
    },
    distance: 3.2,
    estimatedArrival: 13,
    urgencyLevel: "critical",
    caseType: "cardiac",
    timestamp: new Date(Date.now() - 60000),
    expiresIn: 75,
  },
]
