# LifeAID - Emergency Response Network

A comprehensive emergency response platform that connects certified first responders with nearby emergencies, featuring real-time AI-powered call transcription and processing.

## 🚀 Features

### Core Functionality
- **Dual Dashboard System**: Separate interfaces for 911 operators and first responders
- **Real-time Emergency Management**: Live emergency call tracking and dispatch
- **Interactive Maps**: Mapbox integration for location visualization and routing
- **Emergency Call Recording**: Live audio recording with Web Speech API transcription
- **AI-Powered Processing**: Gemini AI integration for automatic call summarization and data extraction

### AI Integration
- **Live Speech Transcription**: Real-time audio-to-text conversion using Web Speech API
- **Intelligent Summarization**: Gemini AI processes transcribed calls to extract:
  - Emergency type classification (cardiac, trauma, respiratory, other)
  - Urgency level assessment (critical, high, moderate)
  - Location extraction and validation
  - Patient condition analysis
  - Caller information parsing

### User Roles
- **911 Operators**: Dispatch management, call recording, emergency tracking
- **First Responders**: Emergency acceptance, navigation, status updates

## 🛠️ Technology Stack

- **Frontend**: Next.js 16 with React 18
- **Styling**: Tailwind CSS with Radix UI components
- **Maps**: Mapbox GL JS
- **AI Processing**: Google Gemini API
- **Speech Recognition**: Web Speech API
- **Authentication**: Local storage-based demo system
- **Deployment**: Docker-ready with Nginx configuration

## 📁 Project Structure

```
LifeAID/
├── healthcare-signup/          # Healthcare provider registration app
├── responder-connect/          # Main emergency response platform
│   ├── app/                   # Next.js app router pages
│   ├── components/           # React components
│   ├── lib/                  # Utilities and services
│   └── public/               # Static assets
├── docker-compose.yml         # Multi-service deployment
├── nginx.conf                # Reverse proxy configuration
└── deploy.sh                 # Deployment script
```

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- npm or pnpm
- Mapbox API key
- Gemini API key (optional, falls back to demo mode)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Palak-Ai-2006/Life-AID.git
   cd Life-AID
   ```

2. **Install dependencies for both projects**
   ```bash
   # Healthcare signup
   cd healthcare-signup
   npm install
   cd ..

   # Responder connect
   cd responder-connect
   npm install
   cd ..
   ```

3. **Configure environment variables**
   
   Create `.env` files in both project directories:
   
   **healthcare-signup/.env**:
   ```
   NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token_here
   ```
   
   **responder-connect/.env**:
   ```
   NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token_here
   NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Run the applications**
   ```bash
   # Healthcare signup (port 3000)
   cd healthcare-signup
   npm run dev

   # Responder connect (port 3002)
   cd responder-connect
   npm run dev
   ```

## 🎯 Demo Mode

The application includes a comprehensive demo mode with:
- Pre-configured demo users (operators and responders)
- Mock emergency data
- Simulated AI processing
- Interactive role switching

### Demo Users
- **Operator**: `operator@demo.com` / `demo123`
- **Responder**: `responder@demo.com` / `demo123`

## 🤖 AI Integration

### Gemini API Setup
1. Get your API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Add it to your `.env` file as `NEXT_PUBLIC_GEMINI_API_KEY`
3. The system will automatically switch from demo mode to real AI processing

### Speech Recognition
- Uses browser's built-in Web Speech API
- Supports real-time transcription
- Works in Chrome, Edge, and Safari
- No additional API keys required

## 🗺️ Map Integration

### Mapbox Setup
1. Create a Mapbox account at [mapbox.com](https://mapbox.com)
2. Get your access token
3. Add it to your `.env` file as `NEXT_PUBLIC_MAPBOX_TOKEN`

## 🐳 Docker Deployment

### Self-hosted with Docker
```bash
# Build and run all services
docker-compose up -d

# Access the application
# Healthcare: http://localhost/healthcare
# Responder: http://localhost/responder
```

### Domain Configuration
The project is configured for deployment at `lifeaid.tech`:
- Healthcare app: `https://lifeaid.tech/healthcare`
- Responder app: `https://lifeaid.tech/responder`

## 📱 Usage

### For 911 Operators
1. Navigate to the operator dashboard
2. Click "Record Call" to start live transcription
3. Speak an emergency scenario
4. Watch AI process and summarize the call
5. Dispatch responders to emergencies

### For First Responders
1. View available emergencies on the dashboard
2. Click "Accept" to take on an emergency
3. Navigate to the emergency location using the integrated map
4. Update status and communicate with dispatch

## 🔧 Development

### Key Components
- **EmergencyCallRecorder**: Handles live audio recording and transcription
- **GeminiAPI**: Processes transcribed text with AI
- **EmergencyMap**: Interactive map with routing
- **EmergencyCard**: Emergency display and management

### API Integration
- **Gemini API**: Text processing and summarization
- **Mapbox API**: Maps and geocoding
- **Web Speech API**: Browser-based transcription

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📞 Support

For support and questions, please open an issue on GitHub or contact the development team.

---

**LifeAID** - Connecting emergency responders with those who need help most. 🚑⚡
# Life-AID
