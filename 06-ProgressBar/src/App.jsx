import React, { useEffect, useState } from 'react'
import Progress from './Progress'

function App () {
  const scores = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
  return (
    <div>
      <h1>Progress Bars</h1>
      {scores.map(sc => {
        return <Progress key={sc} percentage={sc} />
      })}
    </div>
  )
}

export default App
