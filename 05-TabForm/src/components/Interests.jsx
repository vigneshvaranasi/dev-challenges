import React from 'react'

function Interests ({ data, setData,error }) {
  const { interests } = data
  const handleDataChange = (e) => {
    setData((prev) => ({
      ...prev,
      interests: e.target.checked
        ? [...prev.interests, e.target.name]
        : prev.interests.filter(i => i !== e.target.name)
    }))
  }
  return (
    <div className='form-container'>
      <div>
        <input
          onChange={handleDataChange}
          checked={interests.includes('coding')}
          name='coding'
          type='checkbox'
          id='coding'
        />
        <label htmlFor='coding'>Coding</label>
      </div>
      <div>
        <input
          onChange={handleDataChange}
          checked={interests.includes('cooking')}
          name='cooking'
          type='checkbox'
          id='cooking'
        />
        <label htmlFor='cooking'>Cooking</label>
      </div>
      <div>
        <input
          onChange={handleDataChange}
          checked={interests.includes('cricket')}
          name='cricket'
          type='checkbox'
          id='cricket'
        />
        <label htmlFor='cricket'>Cricket</label>
      </div>
      {
        error.interests && 
        <span className='err'>{error.interests}</span>
      }
    </div>
  )
}

export default Interests
