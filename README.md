
# 🐒 JUMANJI — The Board Game

*A game for those who seek to find a way to leave their world behind...*

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4-38BDF8?logo=tailwindcss&logoColor=white)

</div>

---
<img width="800" height="459" alt="Jumanji" src="https://github.com/user-attachments/assets/84393f81-3f3a-43d0-980a-3509ae0c402a" />
## 📖 About

**Jumanji** is a fully interactive, browser-based digital adaptation of the classic Jumanji board game. Built with React, TypeScript, and Vite, it brings the iconic jungle adventure to life with:

- 🎨 A beautifully hand-crafted SVG jungle game board
- 🎲 Animated dual-dice rolling with doubles mechanics
- 🔮 13 classic Jumanji riddles that appear in the mystical center mirror
- 🔊 Text-to-speech narration with a deep, ominous voice
- 🎉 Confetti celebration on winning
- 📦 An animated clamshell box-opening intro screen

The game supports **4 players** simultaneously on the same device:

| Token | Player |
|-------|--------|
| 🐒 | Monkey |
| 🐘 | Elephant |
| 🐊 | Crocodile |
| 🦏 | Rhino |

---

## 🎮 How to Play

1. **Open the box** — Click the Jumanji box on the intro screen to reveal the board.
2. **Begin the game** — Click **BEGIN GAME** to start. An introductory narration plays.
3. **Take turns** — The active player is highlighted. Click **ROLL DICE** on your turn.
4. **Read the riddle** — After moving, a Jumanji riddle appears in the glowing center mirror and is read aloud. Click **VIEW ANSWER** to reveal the answer.
5. **Acknowledge and continue** — Click **ACKNOWLEDGE** to pass the turn to the next player. Rolling doubles earns you an extra turn!
6. **Win the game** — The first player to land exactly on space **28** (the center) wins and triggers a confetti explosion. 🎉

### Key Rules

- If your roll would overshoot the final space, your token bounces back the excess steps.
- Riddles cycle through all 13 unique clues before repeating.
- Rolling doubles lets you roll again after acknowledging your riddle.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| [React 19](https://react.dev/) | UI framework |
| [TypeScript](https://www.typescriptlang.org/) | Type-safe JavaScript |
| [Vite 6](https://vite.dev/) | Build tool & dev server |
| [Tailwind CSS v4](https://tailwindcss.com/) | Utility-first styling |
| [Motion (Framer Motion)](https://motion.dev/) | Animations & transitions |
| [canvas-confetti](https://github.com/catdad/canvas-confetti) | Win celebration effect |
| [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API) | Text-to-speech narration |
| [Google Gemini AI](https://ai.google.dev/) | AI integration (via `@google/genai`) |

---

## 🚀 Running Locally

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- A [Google Gemini API key](https://aistudio.google.com/app/apikey)

### Steps

1. **Clone the repository**

   ```bash
   git clone https://github.com/laraibgul1119/Jumanji_Game.git
   cd Jumanji_Game
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**

   Copy the example env file and add your Gemini API key:

   ```bash
   cp .env.example .env.local
   ```

   Open `.env.local` and set your key:

   ```env
   GEMINI_API_KEY="your_gemini_api_key_here"
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000) to play!

---

## 📜 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start the development server on port 3000 |
| `npm run build` | Build the app for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run TypeScript type checks |
| `npm run clean` | Remove the `dist` build folder |

---

## 🌐 Live App

View the live app on AI Studio: [https://ai.studio/apps/48d853eb-d8b6-4e89-803d-6ac0cf27859e](https://ai.studio/apps/48d853eb-d8b6-4e89-803d-6ac0cf27859e)

---

## 📁 Project Structure

```
Jumanji_Game/
├── index.html              # App entry point
├── src/
│   ├── main.tsx            # React root mount
│   ├── App.tsx             # Main game logic & state
│   ├── constants.ts        # Board track points & riddles
│   ├── audio.ts            # Text-to-speech sound engine
│   ├── utils.ts            # Board position utilities
│   ├── index.css           # Global styles
│   └── components/
│       ├── Board.tsx       # SVG game board & player tokens
│       ├── Dice.tsx        # Animated dice component
│       └── LandingBox.tsx  # Animated intro clamshell screen
├── .env.example            # Environment variable template
├── vite.config.ts          # Vite configuration
└── tsconfig.json           # TypeScript configuration
```
