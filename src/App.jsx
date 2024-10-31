// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App

// App.js
import { useEffect, useState } from 'react';
import './Apppp.css';

const playersData = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  name: `Player ${i + 1}`,
  avatar: `https://randomuser.me/api/portraits/men/${i + 1}.jpg`,
}));

const App = () => {
  const [players] = useState(playersData);
  const [activePlayerIndex, setActivePlayerIndex] = useState(0);
  const [kissCounter, setKissCounter] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [targetPlayerIndex, setTargetPlayerIndex] = useState(null);
  const [rotationAngle, setRotationAngle] = useState(0);

  const [circleRadius, setCircleRadius] = useState(200); // Начальный радиус

  // Обновляем радиус в зависимости от ширины экрана
  useEffect(() => {
    const updateRadius = () => {
      const minDimension = Math.min(window.innerWidth, window.innerHeight);
      console.log('w',window.innerWidth)
      setCircleRadius((minDimension * 0.6) / 2); // Радиус как 40% от меньшего размера экрана
    };

    updateRadius();
    window.addEventListener('resize', updateRadius);
    return () => window.removeEventListener('resize', updateRadius);
  }, []);

  // Запуск вращения бутылки и установка случайного игрока-цели
  const spinBottle = () => {
    setIsSpinning(true);
    const nextPlayerIndex = getRandomPlayerIndex(activePlayerIndex, players.length);
    setTargetPlayerIndex(nextPlayerIndex);

    const anglePerPlayer = 360 / players.length;
    const targetAngle = nextPlayerIndex * anglePerPlayer;
    const spins = 4 * 360; // Четыре полных оборота
    setRotationAngle(spins + targetAngle);

    setTimeout(() => {
      setIsSpinning(false);
      setKissCounter(prev => prev + 1);
      setActivePlayerIndex(nextPlayerIndex);
    }, 4000); // Время вращения бутылки
  };

  const getRandomPlayerIndex = (excludeIndex, maxPlayers) => {
    let index;
    do {
      index = Math.floor(Math.random() * maxPlayers);
    } while (index === excludeIndex);
    return index;
  };

  return (
    <div className="game-field">
      <div className="kiss-counter">Поцелуев: {kissCounter}</div>
      <div className="players-circle">
        {players.map((player, index) => {
          const angle = (360 / players.length) * index;
          const x = circleRadius * Math.cos((angle * Math.PI) / 180) - 40; // 200 - радиус круга
          const y = circleRadius * Math.sin((angle * Math.PI) / 180) - 40;

          return (
            <div
              key={player.id}
              className={`player-circle ${index === activePlayerIndex ? 'active' : ''} ${index === targetPlayerIndex ? 'target' : ''}`}
              style={{ transform: `translate(${x}px, ${y}px)` }}
            >
              <img src={player.avatar} alt={player.name} />
            </div>
          );
        })}
      </div>
      <div className="bottle-container">
        <div
          className="bottle"
          style={{
            transform: `rotate(${isSpinning ? rotationAngle : 0}deg)`,
            transition: isSpinning ? 'transform 4s ease-out' : 'none',
          }}
          onClick={spinBottle}
        ></div>
      </div>
    </div>
  );
};

export default App;

