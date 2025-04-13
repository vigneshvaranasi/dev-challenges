import React from 'react'
import { useState } from 'react'
import closeImg from './assets/close.png'

function App () {
  const [allAvatars, setAllAvatars] = useState([])
  const [name, setName] = useState('')
  const [id, setId] = useState(1)
  let colors = [
    '#bedbff',
    '#b9f8cf',
    '#fff085',
    '#c6d2ff',
    '#ffc9c9',
    '#fccee8',
    '#96f7e4',
  ]

  function getRmdomColor () {
    const randomIndex = Math.floor(Math.random() * colors.length)
    return colors[randomIndex]
  }
  function addNewName () {
    if (name.length < 1) {
      return
    }
    let splitted = name.split(' ').filter(Boolean)
    let mono
    if (splitted.length > 1) {
      mono = splitted[0][0] + splitted[1][0]
    } else {
      mono = splitted[0][0] + splitted[0][1]
    }

    if (name.length === 1) {
      mono = splitted[0][0] + splitted[0][0]
    }

    const newAvatar = {
      id: id,
      monogram: mono.toUpperCase(),
      color: getRmdomColor()
    }
    setAllAvatars([...allAvatars, newAvatar])
    setName('')
    setId(id + 1)
  }
  function removeAvatar (id) {
    setAllAvatars(
      allAvatars.filter(av => {
        return av.id !== id
      })
    )
  }
  return (
    <div className='text-neutral-300'>
      <h1 className='text-center text-5xl pt-3 mb-4'>Monogram</h1>

      <div className='flex gap-2 justify-center text-lg pt-3 mx-3'>
        <input
          type='text'
          value={name}
          onChange={e => {
            setName(e.target.value)
          }}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              addNewName()
            }
          }}
          placeholder='Enter Name here...'
          className='w-full sm:w-1/4 rounded-lg p-1 px-2 bg-[#292929] outline-none focus:ring-0'
        />
        <button
          onClick={() => addNewName()}
          className='bg-blue-300 px-2 rounded-lg text-black'
        >
          Add
        </button>
      </div>

      <div className='w-full sm:w-2/4 flex flex-wrap mx-auto gap-4 mt-5 px-2 sm:p-0 text-black'>
        {allAvatars.map((av, index) => (
          <div
            key={index}
            style={{ backgroundColor: av.color }}
            className={`relative group font-var p-5 rounded-full w-12 h-12 text-lg flex justify-center items-center py-2 cursor-alias`}
          >
            <img
              onClick={() => removeAvatar(av.id)}
              src={closeImg}
              className='absolute -top-2.5 -right-2.5 w-5 h-5 sm:-top-1 sm:-right-2 sm:w-4 sm:h-4 cursor-pointer sm:opacity-0 sm:group-hover:opacity-100'
              alt=''
            />
            {av.monogram}
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
