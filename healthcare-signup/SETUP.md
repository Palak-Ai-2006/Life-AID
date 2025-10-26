# Healthcare Signup - Setup Instructions

## Prerequisites

- Node.js 18+ and npm installed

## Installation

1. Install dependencies:
```bash
npm install --legacy-peer-deps
```

## Environment Configuration

This project doesn't require any environment variables. If you add features that need API keys in the future, you can add them to a `.env` file.

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

- The application uses React 19.2.0, which may have peer dependency warnings with some packages. This is normal and has been handled with the `--legacy-peer-deps` flag

