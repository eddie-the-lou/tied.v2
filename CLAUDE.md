# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A social networking prototype app called "Connect" for ambitious people to find connections based on personality compatibility, interests, and goals. This is a **clickable prototype** with no real backend - all data is mocked and runs in the browser.

## Development Commands

```bash
# Install dependencies
npm install

# Start development server (runs on http://localhost:5173/)
npm run dev

# Build for production
npm run build

# Lint code
npm run lint

# Preview production build
npm run preview

# Deploy to GitHub Pages (manual)
npm run deploy
```

## Tech Stack

- **React 18** + **TypeScript** + **Vite**
- **React Router** (using HashRouter for GitHub Pages)
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Lucide React** for icons

## Architecture

### State Management
Global state is managed via React Context in [src/context/AppContext.tsx](src/context/AppContext.tsx):
- `currentUser` - The user's profile, personality type, interests
- `searchRequests` - Active connection search requests
- `matches` - Compatibility matches found for the user
- `conversations` - Chat conversations with matches
- `notifications` - Notification counter

Access state with: `const { currentUser, updateUser, addMatch, ... } = useApp()`

### Core Type Definitions
See [src/types.ts](src/types.ts):
- **PersonalityType**: `builder | collaborator | visionary | analyst | connector`
- **HobbyCategory**: 8 categories (fitness, arts, music, sports, gaming, cooking, reading, travel)
- **VocationalGoal**: 5 goals (career-growth, academics, entrepreneurship, creative, social-impact)
- **User**, **Match**, **CompatibilityReport**, **SearchRequest**, **Conversation**, **Message**

### Routing Structure
All routes use hash routing (`/#/path`) for GitHub Pages compatibility:
- `/onboarding` - Name entry
- `/quiz` - 8-question personality quiz
- `/results` - Personality type results
- `/interests` - Hobby/goal selection
- `/home` - Main dashboard
- `/invite` - Invite friends
- `/search` - Search for connections
- `/matches` - View compatibility matches
- `/messages` - Chat with matches
- `/future` - Future vision/roadmap

### Compatibility Algorithm
[src/utils/compatibilityEngine.ts](src/utils/compatibilityEngine.ts) calculates match scores (65-98%):
- Base score: 70
- +15 if personalities are best matches, +5 if same type
- +5 per shared hobby
- +8 per shared vocational goal
- Generates strengths, considerations, and summary text

### Mock Data Location
- [src/data/quizQuestions.ts](src/data/quizQuestions.ts) - Personality quiz questions
- [src/data/personalityTypes.ts](src/data/personalityTypes.ts) - Personality descriptions and best matches
- [src/data/mockUsers.ts](src/data/mockUsers.ts) - Sample user profiles

## GitHub Pages Deployment

**Base path:** Configured in [vite.config.ts](vite.config.ts) as `/es139/`

**Live URL:** https://armandiorg.github.io/es139/

**Auto-deploy:** GitHub Actions workflow ([.github/workflows/deploy.yml](.github/workflows/deploy.yml)) triggers on push to main

**Important:** Uses HashRouter (not BrowserRouter) because GitHub Pages only serves static files. Do NOT add `basename` prop to HashRouter - it will break routing (see commit e3e1403).

**Manual first-time setup:** Enable GitHub Pages at repository settings → Pages → Source → select "GitHub Actions"

## Development Notes

- This is a **prototype/demo** - no real authentication, database, or backend
- All matches, conversations, and timing are simulated
- User avatars use DiceBear API (https://api.dicebear.com/7.x/avataaars/svg)
- The app is mobile-first and responsive
