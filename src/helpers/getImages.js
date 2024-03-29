//Función para duplicar cada imagen y almacenarlas en un array dentro de una constante

export const getImages = (size) => { //size determina cuantas imagenes va a mostrar en el juego

    const images = [
        "/images/darth-vader.png",
        "/images/deadpool.png",
        "/images/finn.png",
        "/images/goku.png",
        "/images/iron-man.png",
        "/images/jake.png",
        "/images/mario.png",
        "/images/morty-smith.png",
        "/images/rick-sanchez.png",
        "/images/walter-white.png"
      ]

      //Seleccionamos el numero de imagen segun el nivel (por cada nivel se suman 2 pares de imagenes nuevos)
      const newImages = images.slice(0, size);
    
      return newImages.flatMap(item => [`1|${item}`, `2|${item}`])
                                .sort( () => Math.random() - 0.5) //Para ordenar de forma aleatoria
    
}