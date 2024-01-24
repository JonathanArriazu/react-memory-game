import React from 'react'

const Cards = () => {

  const images = [
    "/images/goku.png",
    "/images/finn.png",
    "/images/mario.png"
  ]

  const newImages = images.flatMap(item => [item, item])
                            .sort( () => Math.random() - 0.5) //Para ordenar de forma aleatoria

  return (
    <div className='cards'>
        <h2>Score: 100</h2>
        <ul>
          {newImages.map((item, index) => (
            <li key={index}>
              <div className="content">
                <div className='front'>
                  <img src={item} alt={item} />
                </div>
              </div>
            </li>
          ))}
        </ul>
    </div>
  )
}

export default Cards