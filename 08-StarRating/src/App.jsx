import React, { useState } from 'react'
import Star from './Star'

function App () {
  const [onHover, setOnHover] = useState(-1)
  const [selectedStars, setSelectedStars] = useState(-1)
  const [totalStars, setTotalStars] = useState(5)
  return (
    <div>
      <h1>Star Rating</h1>
      <div className='container'>
        {Array.from({ length: totalStars }).map((i, index) => (
          <div
            key={index}
            onMouseEnter={() => {
              setOnHover(index)
            }}
            onMouseLeave={() => {
              setOnHover(-1)
            }}
            onClick={() => setSelectedStars(index)}
          >
            {onHover >= 0 ? (
              index <= onHover ? (
                <Star isFillled={true} />
              ) : (
                <Star isFillled={false} />
              )
            ) : index <= selectedStars ? (
              <Star isFillled={true} />
            ) : (
              <Star isFillled={false} />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
