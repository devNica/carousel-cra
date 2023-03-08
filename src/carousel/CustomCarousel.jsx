import { useCallback, useEffect, useState } from "react"
import './carousel.css'


const CustomCarousel = ({
    data = [],
    imageWidth = 400,
    containerWidth = 1200
}) => {

    const [witdhSpaceBtwImages, setWidthSpaceBtwImages] = useState(0)
    const [currentOffset, setCurrentOffset] = useState(0)
    const [relativeWidth, setRelativeWidth] = useState(containerWidth)
    const [offsetRatio, setOffesetRatio] = useState(0)
    const [currentImageIndex, setCurrentImageIndex] = useState(0)

    const isOven = data.length % 2 === 0 ? true : false

    const renderData = data.map((image, index) => (
        <img src={image.url} alt="" className='img' key={index} style={{ width: `${imageWidth}px`, "marginRight": `${witdhSpaceBtwImages}px` }} />
    ))


    const calRelativeWidthAndSpaceBtwImages = useCallback(() => {

        if (isOven) {

            // establecer el indice de la imagen de referencia
            setCurrentImageIndex(0)

            //calcular el espacio entre imagenes
            const spaceBtwImages = (containerWidth - 2 * imageWidth) / 3
            setWidthSpaceBtwImages(spaceBtwImages)

            //calcular el ancho relativo del componente que envuelve a todas las imagenes
            const relativeWidth = (imageWidth * (data.length + 2)) / 3 + containerWidth * (data.length - 1) / 3
            setRelativeWidth(relativeWidth)

        } else {

            // establecer el indice de la imagen de referencia
            setCurrentImageIndex(0)

            //calcular el espacio entre imagenes
            const spaceBtwImages = (((1 / 2) * containerWidth) - (imageWidth * (7 / 6)))
            setWidthSpaceBtwImages(spaceBtwImages)

            //calcular el ancho relativo del componente que envuelve a todas las imagenes
            const relativeWidth = (imageWidth * (data.length + 2)) / 3 + containerWidth * (data.length - 1) / 3
            setRelativeWidth(relativeWidth)
        }
    }, [containerWidth, data.length, imageWidth, isOven])

    const calInitialPositions = useCallback(() => {
        if (isOven) {
            // calculara la proporcion entre el contenerdor padre y el contenedor relativo
            const ratio = containerWidth / relativeWidth * 100
            // calcular el desplazamiento porcentual de la imagen a su posicion inicial respecto al contenedor relativo
            const posAdj = (witdhSpaceBtwImages / (containerWidth + 4)) * ratio
            setCurrentOffset(posAdj)

            //calcular radio de desplazamiento por movimiento
            const offsetR = (1 - witdhSpaceBtwImages / containerWidth) * ratio
            setOffesetRatio(offsetR)

        } else {
            // calculara la proporcion entre el contenerdor padre y el contenedor relativo
            const ratio = containerWidth / relativeWidth * 100
            // calcular el desplazamiento porcentual de la imagen a su posicion inicial respecto al contenedor relativo
            const posAdj = -(witdhSpaceBtwImages / (containerWidth - 4)) * ratio
            setCurrentOffset(posAdj)

            //calcular radio de desplazamiento por movimiento
            const d = ((2 / 3) * (containerWidth - imageWidth)) 
            const offset = (d/containerWidth)* ratio
            setOffesetRatio(offset)

        }
    }, [containerWidth, imageWidth, isOven, relativeWidth, witdhSpaceBtwImages])


    useEffect(() => {
        calRelativeWidthAndSpaceBtwImages()
        calInitialPositions()

    }, [calInitialPositions, calRelativeWidthAndSpaceBtwImages])


    const handleMoveImage = e => {
        const pressed = e.target.name
        console.log('preseed: ', pressed)
        if (isOven) {
            
            //actualizar posicion cuando el grupo de elementos son pares
            if (pressed === 'left' && currentImageIndex <= data.length / 2) {
                //verifica la direccion del movimiento y que el indice actual sea menor que 
                // el numero la mitad del numero de elementos
                const offset = currentOffset - offsetRatio
                setCurrentOffset(offset)
                setCurrentImageIndex(currentImageIndex + 2)
            } else if (pressed === 'rigth' && currentImageIndex > 0) {
                const offset = currentOffset + offsetRatio
                setCurrentOffset(offset)
                setCurrentImageIndex(currentImageIndex - 2)
            }

        } else {
            if (pressed === 'left' && currentImageIndex <= (data.length / 2) + 1 ) {
                const offset = currentOffset - offsetRatio
                setCurrentOffset(offset)
                setCurrentImageIndex(currentImageIndex + 1)
            } else if (pressed === 'rigth' && currentImageIndex >= 0) {
                const offset = currentOffset + offsetRatio
                setCurrentOffset(offset)
                setCurrentImageIndex(currentImageIndex - 1)
            }
        }
    }

    return (
        <div className="carousel">
            <div className="child-container" style={{ width: `${relativeWidth}px`, transform: `translateX(${currentOffset}%)` }}>
                {renderData}
            </div>
            <div className="controls">
                <button className='move-right' name='rigth' onClick={handleMoveImage}>{'>'}</button>
                <button className='move-left' name='left' onClick={handleMoveImage}>{'<'}</button>
            </div>
        </div>
    )
}


export default CustomCarousel