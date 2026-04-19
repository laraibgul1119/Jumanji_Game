import { useState } from 'react';
import { Board } from './components/Board';
import { Dice } from './components/Dice';
import { LandingBox } from './components/LandingBox';
import { MAX_POSITION, RIDDLES } from './constants';
import { soundEngine } from './audio';
import confetti from 'canvas-confetti';

type GameState = 'setup' | 'playing' | 'rolling' | 'animating_token' | 'reading' | 'showing_answer' | 'won';

export default function App() {
  const [showGame, setShowGame] = useState(false);
  const [players, setPlayers] = useState([
    { id: 'p1', name: 'Monkey', token: '🐒', color: '#2d5a27', position: 0 },
    { id: 'p2', name: 'Elephant', token: '🐘', color: '#6b6b6b', position: 0 },
    { id: 'p3', name: 'Crocodile', token: '🐊', color: '#1a1a1a', position: 0 },
    { id: 'p4', name: 'Rhino', token: '🦏', color: '#e0d8c8', position: 0 },
  ]);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [dice, setDice] = useState<[number, number]>([1, 1]);
  const [gameState, setGameState] = useState<GameState>('setup');
  const [centerMessage, setCenterMessage] = useState("");
  const [riddleAnswer, setRiddleAnswer] = useState("");
  const [extraTurn, setExtraTurn] = useState(false);
  const [usedRiddles, setUsedRiddles] = useState<number[]>([]);

  const startGame = () => {
    soundEngine.init();
    setPlayers(players.map(p => ({ ...p, position: 0 })));
    setCurrentPlayer(0);
    setUsedRiddles([]);
    setGameState('reading');
    const introMsg = "A game for those who seek to find a way to leave their world behind...";
    setCenterMessage(introMsg);
    soundEngine.speak(introMsg);
    setTimeout(() => {
        setGameState('playing');
        setCenterMessage("");
    }, 4000);
  };

  const rollDice = () => {
    if (gameState !== 'playing') return;

    soundEngine.init();
    setGameState('rolling');
    const d1 = Math.floor(Math.random() * 6) + 1;
    const d2 = Math.floor(Math.random() * 6) + 1;
    const total = d1 + d2;
    const isDouble = d1 === d2;
    setDice([d1, d2]);

    setTimeout(() => {
      let nextPos = players[currentPlayer].position + total;
      
      // Strict rule: bounce back if overshooting center
      if (nextPos > MAX_POSITION) {
        nextPos = MAX_POSITION - (nextPos - MAX_POSITION);
      }

      setPlayers(prev => prev.map((p, i) => i === currentPlayer ? { ...p, position: nextPos } : p));
      setGameState('animating_token');

      setTimeout(() => {
         if (nextPos === MAX_POSITION) {
            setGameState('won');
            setCenterMessage("JUMANJI!");
            soundEngine.speak("Jumanji!");
            confetti({
                particleCount: 200,
                spread: 120,
                origin: { y: 0.6 }
            });
         } else {
            let availableIndices = RIDDLES.map((_, i) => i).filter(i => !usedRiddles.includes(i));
            if (availableIndices.length === 0) {
               // Reshuffle / reset if we somehow run out of all unique riddles
               availableIndices = RIDDLES.map((_, i) => i);
               setUsedRiddles([]); 
            }
            
            const randomlySelectedIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
            setUsedRiddles(prev => [...prev, randomlySelectedIndex]);
            
            const r = RIDDLES[randomlySelectedIndex];
            setCenterMessage(r.text);
            soundEngine.speak(r.text);
            setRiddleAnswer(r.answer);
            setExtraTurn(isDouble);
            setGameState('reading');
         }
      }, 1200); // Wait for token move animation
    }, 1000); // Wait for dice roll animation
  };

  const continueGame = () => {
    setCenterMessage("");
    if (!extraTurn) {
        setCurrentPlayer(prev => (prev + 1) % players.length);
    }
    setExtraTurn(false);
    setGameState('playing');
  };

  return (
    <>
      <LandingBox onOpen={() => setShowGame(true)} />

      <div className="min-h-screen bg-[#1c1814] flex flex-col items-center justify-center p-4 font-sans text-[#e0d8c8]">
        
        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-serif font-bold text-[#bfae8e] tracking-[0.2em] mb-6 drop-shadow-[0_4px_6px_rgba(0,0,0,0.8)]" style={{ textShadow: '2px 2px 0 #1a0f08, -1px -1px 0 #4a3020' }}>
          JUMANJI
        </h1>

        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-12">
          
          {/* Main Board Area */}
          <div className="lg:col-span-2 relative aspect-square bg-[#221006] rounded-xl shadow-2xl overflow-hidden border-[16px] border-[#311b10]" style={{ boxShadow: '0 20px 40px rgba(0,0,0,0.8), inset 0 0 40px rgba(0,0,0,0.9)', backgroundImage: 'linear-gradient(45deg, #3d2314, #2b180d)' }}>
            <Board 
              players={players} 
              centerMessage={centerMessage} 
              gameState={gameState} 
              currentTurn={currentPlayer} 
            />
          </div>

          {/* UI Panel */}
          <div className="flex flex-col gap-6 bg-[#2a1b12] p-6 rounded-2xl border-4 border-[#3a2618] shadow-xl h-fit">
            
            <div className="text-center pb-4 border-b border-[#4a3020]">
              <h2 className="text-2xl font-serif text-[#bfae8e]">Adventurers</h2>
            </div>

            <div className="flex flex-col gap-4">
              {players.map((p, index) => (
                <div 
                  key={p.id} 
                  className={`flex items-center gap-4 p-3 rounded-lg border-2 transition-colors ${currentPlayer === index ? 'bg-[#3a2618] border-[#bfae8e]' : 'bg-[#1c1814] border-transparent'}`}
                >
                  <div className="text-3xl drop-shadow-md">{p.token}</div>
                  <div className="flex-1">
                      <div className="font-bold text-lg" style={{ color: currentPlayer === index ? '#fff' : '#bfae8e' }}>{p.name}</div>
                      <div className="text-xs text-[#a09075]">Space {p.position === 0 ? 'Home' : p.position}</div>
                  </div>
                  {currentPlayer === index && gameState === 'playing' && (
                    <div className="text-xs font-bold text-green-400 animate-pulse">YOUR TURN</div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-4 flex flex-col items-center gap-6">
              {gameState === 'setup' ? (
                 <button 
                   onClick={startGame}
                   className="w-full py-4 bg-[#bfae8e] hover:bg-[#d4c9b8] active:bg-[#a09075] text-[#1a0f08] font-bold font-serif text-xl rounded-lg transition-colors shadow-lg border-b-4 border-[#8b7d66]"
                 >
                   BEGIN GAME
                 </button>
              ) : (
                 <div className="flex flex-col items-center gap-6 w-full">
                   <div className="flex gap-4">
                      <Dice value={dice[0]} rolling={gameState === 'rolling'} />
                      <Dice value={dice[1]} rolling={gameState === 'rolling'} />
                   </div>
                   
                   {gameState === 'playing' && (
                      <button 
                          onClick={rollDice}
                          className="w-full py-3 bg-[#bfae8e] hover:bg-[#d4c9b8] active:bg-[#a09075] text-[#1a0f08] font-bold font-serif text-lg rounded-lg transition-colors shadow-lg border-b-4 border-[#8b7d66]"
                      >
                          ROLL DICE
                      </button>
                   )}

                   {gameState === 'reading' && centerMessage && (
                      <div className="w-full flex flex-col gap-3">
                          <button 
                              onClick={() => {
                                  setGameState('showing_answer');
                                  setCenterMessage(riddleAnswer);
                              }}
                              className="w-full py-3 bg-[#bfae8e] hover:bg-[#d4c9b8] active:bg-[#a09075] text-[#1a0f08] font-bold font-serif text-lg rounded-lg transition-colors shadow-lg border-b-4 border-[#8b7d66]"
                          >
                              VIEW ANSWER
                          </button>
                      </div>
                   )}

                   {gameState === 'showing_answer' && (
                      <div className="w-full flex flex-col gap-3">
                          {extraTurn && <div className="text-center font-bold text-green-400">Doubles! Take another turn.</div>}
                          <button 
                              onClick={continueGame}
                              className="w-full py-3 bg-green-800 hover:bg-green-700 active:bg-green-900 text-white font-bold font-serif text-lg rounded-lg transition-colors shadow-lg border-b-4 border-green-950"
                          >
                              ACKNOWLEDGE
                          </button>
                      </div>
                   )}

                   {gameState === 'won' && (
                      <button 
                          onClick={startGame}
                          className="w-full py-3 bg-yellow-600 hover:bg-yellow-500 active:bg-yellow-700 text-[#1a0f08] font-bold font-serif text-lg rounded-lg transition-colors shadow-lg border-b-4 border-yellow-800"
                      >
                          PLAY AGAIN
                      </button>
                   )}
                 </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
