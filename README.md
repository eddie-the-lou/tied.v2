# Connect - Social Networking Prototype

A demo prototype for a social networking app designed for ambitious people who want to connect based on compatibility, interests, and goals.

## 🎯 Purpose

This is a **clickable prototype** designed to test the user experience and collect feedback. It does not have a real backend or database - all data is mocked and runs in the browser.

## ✨ Features

### 1. **Onboarding Flow**
- Personality quiz with 8 questions
- Playful results report showing your personality type (Builder, Collaborator, Visionary, Analyst, or Connector)
- Interest selection for hobbies and vocational goals

### 2. **Invite Friends**
- Invite contacts to join the app
- Generate joint compatibility reports
- See personality and interest matches

### 3. **Search & Request**
- Search for connections (e.g., "sophomore gym buddy", "study partner")
- Simulated notification system
- Automatic compatibility matching after 2 hours (simulated)

### 4. **Compatibility Reports**
- Detailed compatibility scores (65-98%)
- Personality type matching
- Shared interests and goals
- Strengths and considerations

### 5. **Messaging**
- In-app messaging with matches
- Simulated responses for demo purposes
- Clean, modern chat interface

### 6. **Future Vision**
- Concept screen showing AI-powered instant matching
- Timeline and roadmap
- "Coming Soon" feature preview

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ installed
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173/`

### Build for Production

```bash
npm run build
```

### Deploy to GitHub Pages

The app is configured to deploy automatically via GitHub Actions when you push to the main branch.

**Live Demo:** `https://eddielou.github.io/tied.v2/`

**Manual deployment:**
```bash
npm run deploy
```

**First-time GitHub Pages setup:**
1. Push your code to main branch (if not already done)
2. Go to: https://github.com/eddielou/tied.v2/settings/pages
3. Under "Build and deployment" → "Source" dropdown
4. **CLICK the dropdown and SELECT "GitHub Actions"** (don't just look at it!)
5. Wait 30 seconds, then visit your site

**Important:** You MUST click and select "GitHub Actions" from the Source dropdown, or the site won't work. The workflow ran successfully, but GitHub Pages needs to be explicitly enabled by selecting this option.

**Note:** The app uses HashRouter (URLs will look like `/#/onboarding`) for GitHub Pages compatibility since GitHub Pages serves static files without server-side routing support.

## 🎨 Design

- **Clean & Minimal**: Modern social networking aesthetic
- **Bright Colors**: Friendly gradients (blue/purple theme)
- **Smooth Animations**: Framer Motion for polished transitions
- **Mobile-First**: Responsive design that works on all devices

## 📱 User Journey

1. **Enter your name** → Start onboarding
2. **Take the quiz** → 8 questions about your personality
3. **View results** → See your personality type and best matches
4. **Select interests** → Choose hobbies and vocational goals
5. **Home screen** → Access all features
6. **Invite friends** → Generate compatibility reports
7. **Search** → Find gym buddies, study partners, etc.
8. **View matches** → See compatibility scores and reports
9. **Message** → Chat with your matches
10. **Future vision** → Learn about upcoming AI features

## 🛠️ Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **React Router** - Navigation
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Lucide React** - Icons

## 📊 Mock Data

All data is stored in `/src/data/`:
- `quizQuestions.ts` - Personality quiz questions
- `personalityTypes.ts` - Personality descriptions and matches
- `mockUsers.ts` - Sample user profiles

## 🎯 Demo Notes

- No real backend or authentication
- All matches and conversations are simulated
- Compatibility reports are calculated using a mock algorithm
- Notifications and timing are simulated for demo purposes
- Best viewed on desktop or mobile browsers

## 📝 Feedback

This prototype is designed to collect feedback on:
- User flow and navigation
- Compatibility matching concept
- Quiz and personality reports
- Search and request feature
- Overall design and polish

## 🔮 Future Features (Not Implemented)

- AI-powered instant matching
- Real-time availability
- Advanced compatibility algorithms
- Profile customization
- Event planning and group activities

---

**Built for ES139 - Testing UX with ambitious students**