import { useState } from 'react';
import './Grand.css';
import img from './assets/Kiss.png'
import kissSound from './assets/kiss-sound.mp3'
import bottleSound from './assets/spinning-sound.mp3'

const playersArray = [
  {
    id: 1,
    index: 'one'
  },
  {
    id: 2,
    index: 'two'
  },
  {
    id: 3,
    index: 'three'
  },
  {
    id: 4,
    index: 'four'
  },
  {
    id: 5,
    index: 'five'
  },
  {
    id: 6,
    index: 'six'
  },
  {
    id: 7,
    index: 'seven'
  },
  {
    id: 8,
    index: 'eight'
  },
  {
    id: 9,
    index: 'nine'
  },
  {
    id: 10,
    index: 'ten'
  }
]


const Grand = () => {
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
//   const [circleRadius, setCircleRadius] = useState(200);

//   useEffect(() => {
//     const updateRadius = () => {
//       const minDimension = Math.min(window.innerWidth, window.innerHeight);
//       setCircleRadius((minDimension * 0.6) / 2); 
//     };

//     updateRadius();
//     window.addEventListener('resize', updateRadius);
//     return () => window.removeEventListener('resize', updateRadius);
//   }, []);


  let kissAudio = new Audio(kissSound)
  let bottleAudio = new Audio(bottleSound)

  const startKiss = () => {
    kissAudio.play()
  }

  const startBottle = () => {
    bottleAudio.play()
  }

  if(isKissing) {
    startKiss()
  }

  if (isSpinning) {
    startBottle()
  }

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
      <div className="kiss-counter">Поцелуев: {kissCounter}</div>
      <div><img className={`kiss-image ${isKissing && 'kiss-visible'}`} src={img} alt="" /></div>
      {isCountdownActive && <div className="countdown">{countdown}</div>}
      <div className="players-circle">
          {players.map((player, index) => {
            // const angle = (360 / players.length) * index;
            // const x = circleRadius * Math.cos((angle * Math.PI) / 180) - 40;
            // const y = circleRadius * Math.sin((angle * Math.PI) / 180) - 40;
            return (   
              <div
                key={player.id}
                className={`player-circle ${player.index} ${index === activePlayerIndex ? 'active' : ''} ${index === targetPlayerIndex ? 'target' : ''} ${isKissing && (index === activePlayerIndex || index === targetPlayerIndex) ? 'kissing' : ''}`}
                // style={{ transform: `translate(${x}px, ${y}px)` }}
              >
                {/* <span>{player.id}{player.index}</span> */}
                <img src={`/public/${player.id}.png`} alt={player.id} />
              </div>
            );
          })}
      </div>
      <div className="bottle-container">
        <div
          className="bottle"
          style={{
            // transform: `rotate(${isSpinning ? rotationAngle : 0}deg)`,
            // transform: `rotate(${isSpinning ? rotationAngle : bottleAngle}deg)`,
            transform: `rotate(${isSpinning ? rotationAngle : bottleIndex}deg)`,
            transition: isSpinning ? 'transform 4s ease-out' : 'none',
          }}
          onClick={startSpin}
        ></div>
      </div>
    </div>
  );
};

export default Grand;