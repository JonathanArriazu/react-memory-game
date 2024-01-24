import { useState } from 'react';
import './App.css';
import Cards from './components/Cards';
import Timer from './components/Timer';

function App() {

  const [start, setStart] = useState(false);

  return (
    <div className="App">
      <h1>Memory Game</h1>
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
