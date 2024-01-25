import { useEffect, useState } from 'react';
import './App.css';
import Cards from './components/Cards';
import Timer from './components/Timer';
import './index.css';

function App() {

  const [start, setStart] = useState(false);
  const [background, setBackground] = useState('/images/background2.jpg');

  const changeBackground = () => {
    if(!start){
    setBackground((prevBackground) =>
      prevBackground === '/images/background2.jpg'
        ? '/images/background1.jpg'
        : '/images/background2.jpg'
    );
    }
  };

  useEffect(() => {
    if(!start) {
      document.body.style.backgroundImage = `url('${background}')`;
    }
  }, [background]);

  return (
    <div className="App">
      <h1>Memory Game</h1>
      <button onClick={changeBackground}>Cambiar fondo</button>
      <Timer start={start} setStart={setStart}/>
      <div className='buttons'>
        {start ? 
        <button onClick={() => window.location.reload()}>Reiniciar</button> :
        <button onClick={() => setStart(true)}>Comenzar</button>
        }
      </div>
      <Cards start={start}/>
    </div>
  );
}

export default App;
