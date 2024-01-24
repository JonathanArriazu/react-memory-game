import React, { useEffect, useState } from 'react'
import { getImages } from '../helpers/getImages'

//Para 1er nivel son 3 imagenes
let size = 3;

const Cards = () => {

  const [images, setImages] = useState(getImages(size));
  const [selected, setSelected] = useState([]);
  const [opened, setOpened] = useState([]);

  //Funcion para almacenar 2 items seleccionados
  const handleClick = (item) => {
    if(selected.length < 2){
      setSelected(selected => selected.concat(item))
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
      size = size + 2;
      clearArrays();
      setImages(getImages(size))
    }
  }, [opened])

  const clearArrays = () => {
    setSelected([]);
    setOpened([]);
  }  
  
  
  let include = false;


  return (
    <div className='cards'>
        <h2>Score: 100</h2>
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