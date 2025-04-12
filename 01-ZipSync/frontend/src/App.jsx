import React, { useEffect, useState } from 'react'

function App() {
  const [allData, setAllData] = useState([])
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadStatus, setUploadStatus] = useState('')
  const [isUploading, setIsUploading] = useState(false)

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:5000/data')
      const data = await response.json()
      if (data.error) {
        console.error(data.message)
        return
      }
      setAllData(data.data)
    } catch (error) {
      console.error('Failed to fetch data:', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  async function insertData(name, mobile) {
    if (!name || !mobile) {
      alert('Please enter both name and mobile number')
      return
    }
    
    if (!/^\d{10}$/.test(mobile)) {
      alert('Mobile number must be 10 digits')
      return
    }

    try {
      const response = await fetch('http://localhost:5000/newData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, mobile })
      })
      const data = await response.json()
      if (data.error) {
        alert(data.message)
        return
      }
      fetchData()
    } catch (error) {
      console.error('Failed to insert data:', error)
      alert('Failed to insert data')
    }
  }

  async function deleteData(id) {   
    try {
      const response = await fetch(`http://localhost:5000/deleteData/${id}`, {
        method: 'DELETE'
      })
      const data = await response.json()
      if (data.error) {
        alert(data.message)
        return
      }
      setAllData(allData.filter(item => item.id !== id))
    } catch (error) {
      console.error('Failed to delete data:', error)
      alert('Failed to delete data')
    }
  }

  async function addZipFile(file) {
    if (!file) return
    
    setIsUploading(true)
    setUploadStatus('Preparing upload...')
    setUploadProgress(0)
    
    try {
      const formData = new FormData()
      formData.append('zipfile', file)
      
      const xhr = new XMLHttpRequest()
      xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable) {
          const percentComplete = Math.round((event.loaded / event.total) * 100)
          setUploadProgress(percentComplete)
          setUploadStatus(`Uploading... ${percentComplete}%`)
        }
      })
      
      xhr.open('POST', 'http://localhost:5000/upload')
      
      xhr.onload = () => {
        if (xhr.status === 200) {
          const response = JSON.parse(xhr.responseText)
          if (response.error) {
            setUploadStatus(`Error: ${response.message}`)
          } else {
            setUploadStatus(`Success! Updated ${response.updatedCount} profile pictures.`)
            fetchData()
          }
        } else {
          setUploadStatus(`Error: ${xhr.statusText}`)
        }
        setIsUploading(false)
      }
      
      xhr.onerror = () => {
        setUploadStatus('Error during upload')
        setIsUploading(false)
      }
      
      xhr.send(formData)
    } catch (error) {
      console.error('Upload failed:', error)
      setUploadStatus('Upload failed')
      setIsUploading(false)
    }
  }

  return (
    <div className='bg-black min-h-screen py-10 px-4'>
      <h1 className='text-center text-5xl text-neutral-300 mb-10'>ZipSync</h1>

      <div className='text-center mb-12'>
        <label
          htmlFor='zipfile'
          className='bg-neutral-800 px-6 py-3 rounded-lg text-neutral-300 cursor-pointer hover:bg-neutral-700 transition duration-300'
        >
          {isUploading ? 'Processing...' : 'Select .zip File'}
        </label>
        <input
          type='file'
          name='zipfile'
          accept='.zip'
          className='hidden'
          id='zipfile'
          disabled={isUploading}
          onChange={(e) => {
            if (e.target.files.length > 0) {
              addZipFile(e.target.files[0])
            }
          }}
        />
        
        {isUploading && (
          <div className='mt-4 w-full max-w-md mx-auto'>
            <div className='w-full bg-gray-700 rounded-full h-2.5'>
              <div 
                className='bg-blue-500 h-2.5 rounded-full' 
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          </div>
        )}
        <p className='text-neutral-300 mt-4'>{uploadStatus}</p>
      </div>

      <div className='bg-[#343434] p-6 rounded-lg w-full max-w-md mx-auto'>
        <h2 className='text-2xl text-neutral-300 mb-4'>Insert Data</h2>
        <div className='flex flex-col gap-2'>
          <label className='text-neutral-300' htmlFor='name'>
            Name
          </label>
          <input
            type='text'
            className='border border-white rounded-md px-3 py-0.5 text-neutral-300 bg-transparent'
            id='name'
          />
          <label className='text-neutral-300' htmlFor='phone'>
            Mobile (10 digits)
          </label>
          <input
            type='text'
            className='border border-white rounded-md px-3 py-0.5 text-neutral-300 bg-transparent'
            id='phone'
            maxLength="10"
          />
          <button 
            onClick={() => {
              const name = document.getElementById('name').value
              const phone = document.getElementById('phone').value
              insertData(name, phone)
            }}
            className='bg-[#4c4c4c] px-6 py-3 rounded-lg text-neutral-300 cursor-pointer hover:bg-neutral-700 transition duration-300 mt-4'
          >
            Submit
          </button>
        </div>
      </div>

      <div className='bg-[#343434] p-6 mt-10 rounded-lg w-full max-w-md mx-auto'>
        <h2 className='text-2xl text-neutral-300 mb-4'>Data In DB</h2>
        {allData.length === 0 ? (
          <p className='text-neutral-300'>No Data Found</p>
        ) : (
          <div className='overflow-x-auto'>
            <table className='min-w-full'>
              <thead>
                <tr>
                  <th className='text-left text-neutral-300 p-2'>Name</th>
                  <th className='text-left text-neutral-300 p-2'>Phone</th>
                  <th className='text-left text-neutral-300 p-2'>Profile</th>
                  <th className='text-left text-neutral-300 p-2'>Action</th>
                </tr>
              </thead>
              <tbody>
                {allData.map(item => (
                  <tr key={item.id} className='border-t border-neutral-600'>
                    <td className='text-neutral-300 p-2'>{item.name}</td>
                    <td className='text-neutral-300 p-2'>{item.mobile}</td>
                    <td className='text-neutral-300 p-2'>
                      {item.profilepic ? (
                        <div className='flex items-center'>
                          <img 
                            onClick={() => window.open(`http://localhost:5000/uploads/${item.profilepic}`, '_blank')}
                            src={`http://localhost:5000/uploads/${item.profilepic}`} 
                            alt="Profile" 
                            className='w-10 h-10 rounded-full object-cover cursor-pointer'
                          />
                          {/* <span className='ml-2'>{item.profilepic.split('/').pop()}</span> */}
                        </div>
                      ) : (
                        'No Profile Pic'
                      )}
                    </td>
                    <td className='p-2'>
                      <button
                        onClick={() => deleteData(item.id)}
                        className='text-red-400 cursor-pointer hover:underline transition duration-300'
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default App