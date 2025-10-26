# 🚀 Unified ResponderConnect Application

## Overview

This is a fully integrated emergency response network application that combines **first responder registration**, **911 operator dashboards**, and **emergency management** into a single, cohesive system.

## Features

### 🔐 Authentication System
- **Landing Page**: Choose to sign in or sign up
- **Sign In**: Login with email and password
- **Sign Up**: Role-based registration
  - **First Responder**: Complete profile with certifications, vehicle details, and credentials
  - **911 Operator**: Simple registration with badge number

### 👥 Role-Based Access

#### First Responder Dashboard
- View active emergency requests
- Filter by urgency level (Critical, High, Moderate)
- Filter by case type (Cardiac, Trauma, Respiratory, Other)
- Sort by distance, urgency, or time
- Interactive map showing emergency locations
- Detailed emergency information
- Profile management with certifications

#### 911 Operator Dashboard  
- Create new emergency calls
- Monitor active emergencies
- View emergency statistics
- Dispatch responders
- Manage emergency requests
- Real-time updates

## Project Structure

```
responder-connect/
├── app/
│   ├── page.tsx                  # Landing/Auth page
│   ├── dashboard/                 # First Responder dashboard
│   ├── operator/
│   │   └── dashboard/            # Operator dashboard
│   ├── emergency/[id]/          # Emergency detail pages
│   └── responder-info/           # Profile page
├── components/
│   ├── auth/                     # Authentication components
│   ├── layout/                   # Shared layout components
│   ├── emergency-map.tsx         # Mapbox integration
│   └── ui/                       # UI components
└── lib/
    ├── auth.ts                   # Authentication logic
    ├── types.ts                   # Type definitions
    └── mock-data.ts               # Sample data
```

## How to Use

### Starting the Application

```bash
cd responder-connect
npm run dev
```

Open http://localhost:3000 in your browser.

### User Flow

#### 1. Landing Page
- Click "Sign Up" to create an account
- Or click "Sign In" if you already have an account

#### 2. Sign Up Flow

**For First Responders:**
1. Select "Sign Up as Responder"
2. Fill in personal information
3. Upload driver's license
4. Enter vehicle details (color, model, license plate)
5. Add certifications (BLS, CPR AED, ACLS, PALS)
6. Submit to complete registration
7. Redirected to Responder Dashboard

**For 911 Operators:**
1. Select "Sign Up as Operator"
2. Enter full name, email, password
3. Provide badge number
4. Submit to complete registration
5. Redirected to Operator Dashboard

#### 3. Sign In Flow
1. Enter email and password
2. Click "Sign In"
3. Automatically redirected to appropriate dashboard based on role

### Using the Dashboards

#### First Responder Dashboard
- **Filter Emergencies**: Use filters to find relevant calls
- **View Details**: Click on emergency cards to see full details
- **Map View**: Interactive maps show location and route
- **Navigation**: Use top navigation to access dashboard and profile

#### Operator Dashboard
- **Create Emergency**: Click "New Emergency Call" button
- **View Active Calls**: See all active emergency requests
- **Monitor**: Watch real-time updates on emergencies
- **Statistics**: View dashboard stats at the top

## File Integration

### Merged Components
- ✅ Authentication system from both projects
- ✅ First responder signup form (healthcare-signup)
- ✅ Emergency dashboard (responder-connect)
- ✅ Operator dashboard (new)
- ✅ Unified navigation
- ✅ Role-based routing
- ✅ Shared UI components

### New Features
- ✅ Role selector for signup
- ✅ Login form with email/password
- ✅ Authentication state management
- ✅ Protected routes
- ✅ Operator dashboard with emergency creation
- ✅ Unified navigation with logout
- ✅ Consistent styling across both dashboards

## User Accounts

### Test Accounts (After Signup)
- **Email**: Any email you choose
- **Password**: As set during signup
- **Role**: Determined by signup path

### Demo Data
- Mock emergency requests are available for testing
- Sample responder data for demonstration
- Emergency locations on map

## Mapbox Configuration

The application uses Mapbox for interactive maps.

**Configuration:**
- API key is already configured in `.env`
- Maps work in emergency detail pages
- Shows responder and emergency locations
- Interactive zoom/pan functionality

## UI Consistency

Both dashboards share:
- ✅ Same navigation bar
- ✅ Consistent color scheme
- ✅ Unified card components
- ✅ Matching button styles
- ✅ Shared typography
- ✅ Responsive design
- ✅ Dark mode support

## Development

### Technologies
- **Next.js 16**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **Mapbox GL**: Interactive maps
- **Radix UI**: Accessible components
- **Lucide Icons**: Icon system

### Dependencies
All dependencies are installed:
```bash
npm install --legacy-peer-deps
```

## Building for Production

```bash
npm run build
npm start
```

## Next Steps

1. Open http://localhost:3000
2. Sign up as either a First Responder or 911 Operator
3. Explore the respective dashboard
4. Test emergency creation (operator) or acceptance (responder)
5. View maps and location features

---

🎉 **The application is fully integrated and ready to use!**

