import React from 'react'

function Profile ({ data, setData, error }) {
  const handleDataChange = (e,item) => {
    setData((prev)=>({
        ...prev,
        [item]:e.target.value
    }))
  }
  return (
    <div className='form-container'>
      <div>
        <label htmlFor='name'>Name:</label>
        <input
          value={data.name}
          onChange={(e)=>handleDataChange(e,"name")}
          type='text'
          id='name'
        />
      </div>
      {
        error.name && 
        <span className='err'>{error.name}</span>
      }
      <div>
        <label htmlFor='email'>Email:</label>
        <input
          onChange={(e)=>handleDataChange(e,"email")}
          value={data.email}
          type='email'
          id='email'
        />
      </div>
      {
        error.email && 
        <span className='err'>{error.email}</span>
      }
      <div>
        <label htmlFor='age'>Age:</label>
        <input
          onChange={(e)=>handleDataChange(e,"age")}
          value={data.age}
          type='number'
          id='age'
        />
      </div>
      {
        error.age && 
        <span className='err'>{error.age}</span>
      }
    </div>
  )
}

export default Profile
