import { useEffect, useRef, useState } from 'react';
import './App.css';
import Cards from './components/Cards';
import Timer from './components/Timer';
import './index.css';
import Ranking from './components/Ranking';
import { supabase } from './helpers/supabaseClient';

function App() {

  const [start, setStart] = useState(false);
  const [save, setSave] = useState(false);
  const [name, setName] = useState('');
  const [warning, setWarning] = useState(false);
  const [duplicate, setDuplicate] = useState(false);
  
  const [level, setLevel] = useState(1);
  const score = useRef(0);

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

  const handleSave = async () => {
    if (name !== '') {      
      const error = await supabase
        .from('memory-ranking')
        .insert({ name: name, score: score.current })

      error.status === 409 ? setDuplicate(true) : window.location.reload();

      console.log(error)

      setWarning(false)
    } else {
      setWarning(true)
    }
  }

  useEffect(() => {
    if(!start) {
      document.body.style.backgroundImage = `url('${background}')`;
    }
  }, [background]);

  console.log('start:', start, '| save:', save)

  return (
    <div className="App">
      <div className='level-and-background'>
        <button onClick={changeBackground}>Cambiar fondo</button>
        <h2>Nivel {level}</h2>
      </div>
      <h1>Memory Game</h1>
      <Timer start={start} setStart={setStart} setSave={setSave}/>
      <div className='buttons'>
        {start ?
        <button onClick={() => window.location.reload()}>Reiniciar</button> :
        <button onClick={() => setStart(true)}>Comenzar</button>
        }
        {save &&
          <>
            <input 
              type="text" 
              onChange={e => setName(e.target.value)}
              className={`${warning ? 'warning' : ''}`} />
            <button onClick={handleSave}>Save</button>
          </>
        }
        { duplicate && <p className='error'>The name exist</p>}
      </div>
      <div className="ranking">
        <Ranking/>
      </div>
      <Cards start={start} score={score} level={level} setLevel={setLevel}/>
    </div>
  );
}

export default App;
