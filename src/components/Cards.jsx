import React, { useEffect, useState } from 'react'
import { getImages } from '../helpers/getImages'

//Para 1er nivel son 3 imagenes
let size = 3;

//Variable para calcular score
let clicks = 0;

const Cards = ({start, score, level, setLevel}) => {

  const sound = "/sound/sucess.mp3"

  const [images, setImages] = useState(getImages(size));
  const [selected, setSelected] = useState([]);
  const [opened, setOpened] = useState([]);

  /* const score = useRef(0); */
  /* const [score, setScore] = useState(0) */

  //Funcion para almacenar 2 items seleccionados
  const handleClick = (item) => {
    if(start){
      clicks = clicks + 1;
      if(selected.length < 2){
        setSelected(selected => selected.concat(item))
      }    
    }
  }

  //useEffect a la escucha de "selected": cuando selected tiene 2 imagenes, chequea sin ambas son iguales y en ese caso las almacena en "opened", para luego hacer un clear a "selected"
  useEffect(() => {
     if(selected.length === 2) {
        if(selected[0].split('|')[1] === selected[1].split('|')[1] ) {
          setOpened(opened => opened.concat(selected))
        }
        setTimeout(() => setSelected([]), 500);
     }
  }, [selected])

  //useEffect a la escucha de "opened": cuando opened tiene la misma cantidad que images, aumenta de nivel (añadiendo 2 pares de imagenes mas a size), limpia selected y opened y vuelve a traer todas las imagenes necesarias para el siguiente nivel
  useEffect(() => {
    if(opened.length === images.length) {
      calculateScore(); //Calculamos el score
      size = size + 2;
      clearArrays();
      new Audio(sound).play();
      setImages(getImages(size))
      setLevel(level + 1)
    }
  }, [opened])

  const clearArrays = () => {
    setSelected([]);
    setOpened([]);
  }  

  const calculateScore = () => {
    const passLevel = size *10;
    const cards = size * 2;

    let total = score.current;
    
    if (clicks === cards) {
      total = total + (cards*2) + passLevel; //Para primer nivel => 42
    } else if (clicks > cards && clicks < cards+5) {
      total = total + cards + passLevel; //Para primer nivel => 36
    } else if (clicks > cards && clicks < cards+10){
      total = total + (cards/2) + passLevel; //Para primer nivel => 33
    } else {
      total = total + Math.round(cards/3) + passLevel; //Para primer nivel => 32
    }
    clicks = 0;
    /* setScore(total) */
    score.current = total;
  }
  
  
  let include = false;


  return (
    <div className='cards'>        
        <h2>Score: {score.current}</h2>
        <ul>
          {images.map((item, index) => (
            <li key={index} onClick={() => handleClick(item)}>
              <div className="content">
                {/* Creo un include para manejar cambio de clases en base a una condicion */}
                {include = selected.includes(item) || opened.includes(item)}
                <div className={`front ${include ? 'flip-front' : ''}`}>
                  <img src="/images/question.png" alt={item} />
                </div>
                <div className={`back ${include ? 'flip-back' : ''}`}>
                  <img src={item.split('|')[1]} alt={item} />
                </div>
              </div>
            </li>
          ))}
        </ul>
    </div>
  )
}

export default Cards