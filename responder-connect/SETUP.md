# Responder Connect - Setup Instructions

## Prerequisites

- Node.js 18+ and npm installed
- A Mapbox account (for map functionality)

## Installation

1. Install dependencies:
```bash
npm install --legacy-peer-deps
```

## Environment Configuration

1. Copy the example environment file:
```bash
cp .env.example .env
```

2. Get your Mapbox access token:
   - Go to https://account.mapbox.com/
   - Sign up or log in
   - Navigate to Access Tokens
   - Create a new token or use your default public token

3. Add your Mapbox token to `.env`:
```
NEXT_PUBLIC_MAPBOX_TOKEN=pk.eyJ1IjoidXNlcm5hbWUiLCJhIjoiY2x...
```

## Running the Application

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Building for Production

```bash
npm run build
npm start
```

## Notes

- If you don't add the Mapbox token, the app will still run but will show a placeholder map instead of an interactive map
- The application uses React 19.2.0, which may have peer dependency warnings with some packages. This is normal and has been handled with the `--legacy-peer-deps` flag

