import { useState } from 'react';
import './App.css';
import CountDown from './components/CountDown';
import KissImage from './components/KissImage';
import KissCounter from './components/KissCounter';
import Players from './components/Players';
import Bottle from './components/Bottle';
import { playersArray } from './db/playersArray.js'

const App = () => {
  const [players] = useState(playersArray);
  const [activePlayerIndex, setActivePlayerIndex] = useState(0);
  const [kissCounter, setKissCounter] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [targetPlayerIndex, setTargetPlayerIndex] = useState(null);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [countdown, setCountdown] = useState(3);
  const [isCountdownActive, setIsCountdownActive] = useState(false);
  const [isKissing, setIsKissing] = useState(false);
  const [bottleIndex, setBottleIndex] = useState(0)

  const startSpin = () => {
      setIsCountdownActive(true);
      setCountdown(3);

      const countdownInterval = setInterval(() => {
          setCountdown(prev => {
              if (prev === 1) {
                clearInterval(countdownInterval);
                spinBottle();
                setIsCountdownActive(false);
                return 4;
              }
            return prev - 1;
          });
      }, 1000);
  };

  const getRandomPlayerIndex = (excludeIndex, maxPlayers) => {
      let index;
        do {
          index = Math.floor(Math.random() * maxPlayers);
        } while (index === excludeIndex);
        return index;
  };

  const spinBottle = () => {
      setIsSpinning(true);
      const nextPlayerIndex = getRandomPlayerIndex(activePlayerIndex, players.length);
      const anglePerPlayer = 360 / players.length;
      const targetAngle = nextPlayerIndex * anglePerPlayer;

      const spins = 4 * 360;
      setBottleIndex(nextPlayerIndex * 36)
      setRotationAngle(spins + targetAngle);
    
      setTimeout(() => {
          setIsSpinning(false);
        
          setKissCounter(prev => prev + 1);
          
          setIsKissing(true);
          setTargetPlayerIndex(nextPlayerIndex);
          
          const spins = 4 * 360;
          setRotationAngle(spins + bottleIndex);
          
          setTimeout(() => {
              setActivePlayerIndex(nextPlayerIndex);
              setIsKissing(false);
          }, 2000);
      }, 4000);
  };

  

  return (
    <div className="game-field">
      <KissCounter kissCounter={kissCounter}/>

      <KissImage isKissing={isKissing}/>

      {isCountdownActive && <CountDown countdown={countdown}/>}

      <Players 
      activePlayerIndex={activePlayerIndex}
      targetPlayerIndex={targetPlayerIndex}
      isKissing={isKissing}
      />

      <Bottle
        isSpinning={isSpinning}
        rotationAngle={rotationAngle}
        bottleIndex={bottleIndex}
        startSpin={startSpin}
      />
    </div>
  );
};

export default App;