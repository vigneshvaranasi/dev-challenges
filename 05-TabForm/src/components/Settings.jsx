import React from 'react'

function Settings ({ data, setData }) {
  const { notifications } = data
  const handleDataChange = e => {
    setData(prev => ({
      ...prev,
      notifications: e.target.value === 'true'
    }))
  }

  return (
    <div>
      <p>Notifications</p>
      <input
        checked={notifications == true}
        onChange={handleDataChange}
        name='notifications'
        id='yes'
        type='radio'
        value='true'
      />
      <label htmlFor='yes'>Yes</label>
      <input
        checked={notifications == false}
        onChange={handleDataChange}
        name='notifications'
        id='no'
        type='radio'
        value='false'
      />
      <label htmlFor='no'>No</label>
    </div>
  )
}

export default Settings
