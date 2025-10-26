// Demo mode configuration
export const DEMO_MODE = true // Set to true for presentation

// Demo users that are automatically logged in
export const DEMO_USERS = {
  responder: {
    id: "demo-responder-1",
    email: "responder@demo.com",
    fullName: "Sarah Johnson",
    role: "responder",
    dateOfBirth: "1990-05-15",
    vehicle: {
      color: "Blue",
      model: "Ford Explorer",
      licensePlate: "CA-ABC-1234"
    },
    certifications: [
      {
        id: "1",
        type: "ACLS",
        fileUrl: "/professional-medical-responder-portrait.jpg",
        fileName: "acls-cert.pdf",
        issueDate: "2024-01-15",
        expiryDate: "2026-01-15"
      },
      {
        id: "2",
        type: "BLS",
        fileUrl: "/first-aid-certification.jpg",
        fileName: "bls-cert.pdf",
        issueDate: "2024-03-10",
        expiryDate: "2026-03-10"
      }
    ]
  },
  operator: {
    id: "demo-operator-1",
    email: "operator@demo.com",
    fullName: "Michael Chen",
    role: "operator",
    badgeNumber: "OP-12345"
  }
}

// Auto-login demo users
if (typeof window !== "undefined" && DEMO_MODE) {
  // Store demo users in localStorage
  if (!localStorage.getItem("demoInitialized")) {
    localStorage.setItem("users", JSON.stringify([{
      ...DEMO_USERS.responder,
      password: "demo123"
    }, {
      ...DEMO_USERS.operator,
      password: "demo123"
    }]))
    localStorage.setItem("demoInitialized", "true")
  }
}

