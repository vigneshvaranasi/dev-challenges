import React, { useEffect, useState } from 'react'
import pic1 from './assets/1.jpg'
import pic2 from './assets/2.jpg'
import pic3 from './assets/3.jpg'
import pic4 from './assets/4.jpg'
import pic5 from './assets/5.jpg'
import pic6 from './assets/6.jpg'
import pic7 from './assets/7.jpg'
import arrow from './assets/arrow.svg'

function App () {
  const [currentImage, setCurrentImage] = useState(0)
  const allImages = [pic1, pic2, pic3, pic4, pic5, pic6, pic7]
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    if (hovered) return
    const imageAuto = setTimeout(() => {
      nextImage()
    }, 3000)
    return () => {
      clearTimeout(imageAuto)
    }
  }, [currentImage, hovered])

  function nextImage () {
    setCurrentImage(prev => (prev + 1) % allImages.length)
  }
  function prevImage () {
    setCurrentImage(prev => (prev - 1 + allImages.length) % allImages.length)
  }
  const handleTouchStart = () => {
    setHovered(false)
  }
  return (
    <div>
      <h1>Carousel</h1>
      <p style={{ fontSize: '1.2rem' }}>
        <span>Wallpaper:</span>
        <span style={{ paddingRight: '3px',paddingLeft:"3px" }}>{currentImage + 1}</span>/
        <span style={{ paddingLeft: '3px' }}>{allImages.length}</span>
      </p>
      <div className='container'>
        <div className='carousel'>
        <img className='btn prev' onClick={prevImage} src={arrow} alt="" />
          {allImages.map((i, index) => {
            return (
              <img
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                onTouchStart={handleTouchStart}
                style={{ display: currentImage == index ? 'block' : 'none' }}
                className='image'
                key={i}
                src={i}
                alt=''
              />
            )
          })}
          <img className='btn next' onClick={nextImage} src={arrow} alt="" />
        </div>
      </div>
      <div className='nav-circles'>
        {allImages.map((i, index) => {
          return (
            <div
              key={index}
              onClick={() => setCurrentImage(index)}
              style={{ backgroundColor: index == currentImage && '#fff' }}
              className='circle'
            ></div>
          )
        })}
      </div>
    </div>
  )
}

export default App
