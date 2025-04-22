import React from 'react'
import { useState } from 'react'
import Profile from './components/Profile'
import Interests from './components/Interests'
import Settings from './components/Settings'

function App () {
  const [data, setData] = useState({
    name: '',
    email: '',
    age: 0,
    interests: [],
    notifications: false
  })
  const [error, setError] = useState({
    name: '',
    email: '',
    age: '',
    intrests: ''
  })
  const [tabSelected, settabSelected] = useState(0)
  const tabsData = [
    {
      name: 'Profile',
      component: Profile,
      validate: () => {
        let err = {}
        if (!data.name || data.name.length < 3) {
          err.name = 'Name Should have atleast 3 characters'
        }
        if (!data.email || data.email.length < 3) {
          err.email = 'Email Should have atleast 5 characters'
        }
        if (!data.age || data.age < 18) {
          err.age = 'Age is Not vaild'
        }
        setError(err)
        return err.name || err.age || err.email ? false : true
      }
    },
    {
      name: 'Interests',
      component: Interests,
      validate: () => {
        const err = {}
        if (data.interests.length == 0) {
          err.interests = 'Select atleast 1 Option'
        }
        setError(err)
        return err.interests ? false : true
      }
    },
    {
      name: 'Settings',
      component: Settings,
      validate: () => {
        return true
      }
    }
  ]
  const SelectedTab = tabsData[tabSelected].component
  return (
    <div>
      <div className='tabs-names'>
        {tabsData.map((tab, index) => {
          return (
            <div key={index}>
              <p
                onClick={() => {
                  if (tabsData[tabSelected].validate()) {
                    settabSelected(index)
                  }
                }}
                className='tabHeading'
                style={index === tabSelected ? { backgroundColor: '#fff' } : {}}
              >
                {tab.name}
              </p>
            </div>
          )
        })}
      </div>
      <div className='tab-data-container'>
        <SelectedTab
          data={data}
          setData={setData}
          error={error}
        />
      </div>
      {tabSelected > 0 && (
        <button
          onClick={() => settabSelected(prev => prev - 1)}
          className='btn'
        >
          Previous
        </button>
      )}
      {tabSelected < tabsData.length - 1 && (
        <button
          onClick={() => {
            if (tabsData[tabSelected].validate()) {
              settabSelected(prev => prev + 1)
            }
          }}
          className='btn'
        >
          Next
        </button>
      )}
      {tabSelected === tabsData.length - 1 && (
        <button
          onClick={() => {
            console.log('Form Submitted')
            console.log('data: ', data)
          }}
          className='btn'
        >
          Submit
        </button>
      )}
    </div>
  )
}

export default App
