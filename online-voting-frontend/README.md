# VotePlatform - Modern Online Voting Platform

A modern, responsive web application frontend for online voting built with React 18, TypeScript, and Tailwind CSS.

## Features

- 🎨 Clean, professional design with gradient backgrounds and smooth animations
- 🔐 Multiple authentication options (Email/Password, Google, LinkedIn)
- 📱 Fully responsive design (mobile-first approach)
- ✅ Form validation and error handling
- 🗳️ Voting dashboard with candidate cards
- 🔒 Secure voting with one-vote-per-user restriction
- ⚡ Built with Vite for fast development and builds

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **Lucide React** - Icons
- **Vite** - Build tool

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/          # React components
│   ├── Login.tsx       # Login/Signup screen
│   ├── ForgotPassword.tsx  # Password reset screen
│   ├── Dashboard.tsx   # Main voting dashboard
│   ├── Header.tsx      # App header component
│   └── CandidateCard.tsx  # Candidate card component
├── data/
│   └── mockData.ts     # Mock candidate data
├── types/
│   └── index.ts        # TypeScript type definitions
├── App.tsx             # Main app component with routing
├── main.tsx            # Entry point
└── index.css           # Global styles and Tailwind imports
```

## Design Specifications

### Colors
- Primary: Blue (#2563eb / #3b82f6)
- Secondary: LinkedIn Blue (#0A66C2)
- Success: Green (#22c55e / #16a34a)
- Background: Gradient from-blue-50 to-indigo-100

### Typography
- Font Family: Inter (system fallback)
- Headings: Bold, various sizes
- Body: Regular weight, gray-600

### Components
- Cards: rounded-2xl, shadow-lg/xl/2xl
- Buttons: rounded-full
- Spacing: Generous padding (p-6 sm:p-8)

## Mock Data

The application uses mock data for candidates. In a production environment, this would be replaced with API calls to your backend.

## Notes

- Authentication is mocked for demonstration purposes
- Voting functionality uses local state (no backend integration)
- Images are sourced from Unsplash
- Ready for backend API integration

## License

MIT

