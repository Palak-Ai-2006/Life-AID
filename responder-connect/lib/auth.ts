// Simple auth state management
export interface User {
  id: string
  email: string
  fullName: string
  role: "responder" | "operator"
  dateOfBirth?: string
  vehicle?: {
    color: string
    model: string
    licensePlate: string
  }
  certifications?: Array<{
    id: string
    type: string
    fileUrl: string
    fileName: string
    issueDate: string
    expiryDate: string
  }>
}

// Helper function to check if we're in browser environment
const isBrowser = typeof window !== 'undefined'

// Simple localStorage-based auth (for demo purposes)
export const auth = {
  currentUser: null as User | null,

  login(email: string, password: string): boolean {
    if (!isBrowser) return false
    
    const users = JSON.parse(localStorage.getItem("users") || "[]")
    const user = users.find((u: any) => u.email === email)
    
    if (user && user.password === password) {
      delete user.password
      this.currentUser = user
      localStorage.setItem("currentUser", JSON.stringify(user))
      return true
    }
    return false
  },

  signup(userData: any): boolean {
    if (!isBrowser) return false
    
    const users = JSON.parse(localStorage.getItem("users") || "[]")
    
    if (users.find((u: any) => u.email === userData.email)) {
      return false // Email already exists
    }

    const newUser: User = {
      id: Date.now().toString(),
      email: userData.email || "",
      fullName: userData.fullName,
      role: userData.role,
      dateOfBirth: userData.dateOfBirth,
      vehicle: userData.vehicle,
      certifications: userData.certifications,
    }

    users.push({ ...userData, id: newUser.id })
    localStorage.setItem("users", JSON.stringify(users))
    
    delete newUser.vehicle // Don't store in currentUser initially
    delete newUser.certifications
    this.currentUser = newUser
    localStorage.setItem("currentUser", JSON.stringify(newUser))
    
    return true
  },

  logout() {
    this.currentUser = null
    if (isBrowser) {
      localStorage.removeItem("currentUser")
    }
  },

  getCurrentUser(): User | null {
    if (this.currentUser) {
      return this.currentUser
    }
    if (!isBrowser) return null
    
    const stored = localStorage.getItem("currentUser")
    if (stored) {
      this.currentUser = JSON.parse(stored)
      return this.currentUser
    }
    return null
  },

  isAuthenticated(): boolean {
    return this.getCurrentUser() !== null
  }
}

