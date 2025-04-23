import React, { useEffect, useState } from 'react'

function Progress ({ percentage }) {
  const [initialPercentage, setInitialPercentage] = useState(0)
  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialPercentage(percentage)
    }, 300)
    return () => clearTimeout(timer)
  },[percentage])
  return (
    <div
      className='bar-out'
      role='progressbar'
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={initialPercentage}
    >
      <div
        className='bar-in'
        style={{
          width: `${initialPercentage}%`,
          backgroundColor:
            percentage < 31 ? 'red' : percentage < 71 ? 'orange' : 'green'
        }}
      >
        <p className='percentage-txt'>{percentage}%</p>
      </div>
    </div>
  )
}

export default Progress
