import React, { useState } from 'react'

function App () {
  const [originalCode, setOriginalCode] = useState('')
  const [modifiedCode, setModifiedCode] = useState('')
  const [diffOriginal, setDiffOriginal] = useState('')
  const [diffModified, setDiffModified] = useState('')
  const [maxLines,setMaxLines] = useState(0)
  const [totalChanges,setTotalChanges] = useState(0)

  function compareCodes () {
    const originalLines = originalCode.split('\n')
    console.log('originalLines: ', originalLines)
    const modifiedLines = modifiedCode.split('\n')
    console.log('modifiedLines: ', modifiedLines)
    setDiffOriginal(originalLines)
    setDiffModified(modifiedLines)
  }
  return (
    <div>
      <h1 className='text-5xl text-center mt-5 mb-5'>CodeDiff</h1>
      <div className='flex m-3 gap-5'>
        <div className='flex flex-col gap-2 w-1/2'>
          <h1 className='text-lg font-semibold'>Original Text</h1>
          <textarea
            className='inconsolata-font p-2 rounded-lg font-monospace bg-[#191919] outline-none focus:ring-0 resize-none'
            rows={20}
            value={originalCode}
            onChange={e => setOriginalCode(e.target.value)}
            placeholder='Enter original code here...'
            spellCheck='false'
            autoComplete='off'
            autoCorrect='off'
            autoCapitalize='off'
            autoFocus
          ></textarea>
        </div>
        <div className='flex flex-col gap-2 w-1/2'>
          <h1 className='text-lg font-semibold'>Modified Text</h1>
          <textarea
            className='inconsolata-font p-2 rounded-lg font-monospace bg-[#191919] outline-none focus:ring-0 resize-none'
            rows={20}
            value={modifiedCode}
            onChange={e => setModifiedCode(e.target.value)}
            placeholder='Enter modified code here...'
            spellCheck='false'
            autoComplete='off'
            autoCorrect='off'
            autoCapitalize='off'
          ></textarea>
        </div>
      </div>
      <div className='flex justify-center mt-4 gap-3 mb-2'>
        <button
          onClick={compareCodes}
          className='bg-[#151913] border border-[#2e2e2e] cursor-pointer p-2 rounded-lg hover:bg-[#1a1e18] transition-colors duration-200'
        >
          <span className='text-lg font-semibold text-[#e1e1e1]'>Compare</span>
        </button>
      </div>

      <h1 className='mx-3 text-lg font-semibold'>Diff Result</h1>
      <div className='mx-3 flex gap-5 bg-[#0f1311] p-2 rounded-lg w-max'>
        <p>Lines: {maxLines}</p>
        <p>Changes: {totalChanges}</p>
      </div>

      <div className='m-3 flex gap-5'>
        <div className='flex flex-col gap-1 w-1/2 py-2 px-3 rounded-lg bg-[#1a1e1b] border border-[#2e2e2e] shadow-md overflow-auto max-h-[500px]'>
          {diffOriginal.length > 0 ? (
            diffOriginal.map((line, index) => (
              <div
                key={index}
                className='flex gap-3 items-start bg-[#0f1311] hover:bg-[#151a17] rounded-md p-2'
              >
                <div className='text-center text-sm text-[#7a7a7a] rounded-md py-1'>
                  {index + 1}
                </div>
                <span className='text-[#e1e1e1] break-words'>{line}</span>
              </div>
            ))
          ) : (
            <div className='text-[#555] italic'>No code to display.</div>
          )}
        </div>
        <div className='flex flex-col gap-1 w-1/2 py-2 px-3 rounded-lg bg-[#1a1e1b] border border-[#2e2e2e] shadow-md overflow-auto max-h-[500px]'>
          {diffModified.length > 0 ? (
            diffModified.map((line, index) => (
              <div
                key={index}
                className='flex gap-3 items-start bg-[#0f1311] hover:bg-[#151a17] rounded-md p-2'
              >
                <div className='min-w-[40px] text-center text-sm text-[#7a7a7a] rounded-md py-1'>
                  {index + 1}
                </div>
                <span className='text-[#e1e1e1] break-words'>{line}</span>
              </div>
            ))
          ) : (
            <div className='text-[#555] italic'>No code to display.</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App

// to do
// diff logic
// add diff highlight
