import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'

function App () {
  const [originalCode, setOriginalCode] = useState('')
  const [modifiedCode, setModifiedCode] = useState('')
  const [diffOriginal, setDiffOriginal] = useState([])
  const [diffModified, setDiffModified] = useState([])
  const [maxLines, setMaxLines] = useState(0)
  const [totalChanges, setTotalChanges] = useState(0)
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    const original = localStorage.getItem('originalCode')
    const modified = localStorage.getItem('modifiedCode')
    const max = localStorage.getItem('maxLines')
    const changes = localStorage.getItem('totalChanges')
    const diffO = localStorage.getItem('diffOriginal')
    const diffM = localStorage.getItem('diffModified')
    const submitted = localStorage.getItem('isSubmitted')
  
    if (original) setOriginalCode(original)
    if (modified) setModifiedCode(modified)
    if (max) setMaxLines(Number(max))
    if (changes) setTotalChanges(Number(changes))
    if (diffO) setDiffOriginal(JSON.parse(diffO))
    if (diffM) setDiffModified(JSON.parse(diffM))
    if (submitted) setIsSubmitted(submitted === 'true')
  }, [])
  

  function compareCodes () {
    if (originalCode === '' && modifiedCode === '') {
      toast('Please enter some code.')
      setIsSubmitted(false)
      return
    }
    if (originalCode === modifiedCode) {
      toast('No changes')      
      localStorage.setItem('originalCode', originalCode)
      localStorage.setItem('modifiedCode', modifiedCode)
      localStorage.setItem('isSubmitted', false)
      setIsSubmitted(false)
      return
    }

    setIsSubmitted(true)
    const originalLines = originalCode.split('\n')
    const modifiedLines = modifiedCode.split('\n')
    const maxLinesCount = Math.max(originalLines.length, modifiedLines.length)
    setMaxLines(maxLinesCount)

    const dp = Array(originalLines.length + 1)
      .fill()
      .map(() => Array(modifiedLines.length + 1).fill(0))

    for (let i = 1; i <= originalLines.length; i++) {
      for (let j = 1; j <= modifiedLines.length; j++) {
        if (originalLines[i - 1] === modifiedLines[j - 1]) {
          dp[i][j] = dp[i - 1][j - 1] + 1
        } else {
          dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1])
        }
      }
    }

    let i = originalLines.length
    let j = modifiedLines.length
    let diffOriginalTemp = []
    let diffModifiedTemp = []
    let changes = 0

    while (i > 0 && j > 0) {
      if (originalLines[i - 1] === modifiedLines[j - 1]) {
        diffOriginalTemp.unshift({
          line: originalLines[i - 1],
          type: 'unchanged'
        })
        diffModifiedTemp.unshift({
          line: modifiedLines[j - 1],
          type: 'unchanged'
        })
        i--
        j--
      } else if (dp[i - 1][j] === dp[i][j - 1]) {
        diffOriginalTemp.unshift({
          line: originalLines[i - 1],
          type: 'changed',
          changedTo: modifiedLines[j - 1]
        })
        diffModifiedTemp.unshift({
          line: modifiedLines[j - 1],
          type: 'changed',
          changedFrom: originalLines[i - 1]
        })
        i--
        j--
        changes++
      } else if (dp[i - 1][j] > dp[i][j - 1]) {
        diffOriginalTemp.unshift({
          line: originalLines[i - 1],
          type: 'removed'
        })
        diffModifiedTemp.unshift({ line: '', type: 'added' })
        i--
        changes++
      } else {
        diffOriginalTemp.unshift({ line: '', type: 'removed' })
        diffModifiedTemp.unshift({ line: modifiedLines[j - 1], type: 'added' })
        j--
        changes++
      }
    }

    while (i > 0) {
      diffOriginalTemp.unshift({ line: originalLines[i - 1], type: 'removed' })
      diffModifiedTemp.unshift({ line: '', type: 'added' })
      i--
      changes++
    }

    while (j > 0) {
      diffOriginalTemp.unshift({ line: '', type: 'removed' })
      diffModifiedTemp.unshift({ line: modifiedLines[j - 1], type: 'added' })
      j--
      changes++
    }

    setDiffOriginal(diffOriginalTemp)
    setDiffModified(diffModifiedTemp)
    setTotalChanges(changes)

    localStorage.setItem('originalCode', originalCode)
    localStorage.setItem('modifiedCode', modifiedCode)
    localStorage.setItem('maxLines', maxLinesCount)
    localStorage.setItem('totalChanges', changes)
    localStorage.setItem('diffOriginal', JSON.stringify(diffOriginalTemp))
    localStorage.setItem('diffModified', JSON.stringify(diffModifiedTemp))
    localStorage.setItem('isSubmitted', true)
  }

  function clearState () {
    setOriginalCode('')
    setModifiedCode('')
    setDiffOriginal([])
    setDiffModified([])
    setMaxLines(0)
    setTotalChanges(0)
    setIsSubmitted(false)
    localStorage.clear()
  }

  function CopyToClipboard (codeData) {
    navigator.clipboard.writeText(codeData)
    toast('Block Copied');
  };
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
      <div className='flex mx-3 justify-end mt-4 gap-2 mb-2'>
        <button
          onClick={compareCodes}
          className='bg-[#151913] border border-[#2e2e2e] cursor-pointer p-2 rounded-lg hover:bg-[#1a1e18] transition-colors duration-200'
        >
          <span className='text-lg font-semibold text-[#e1e1e1]'>Compare</span>
        </button>
        <button
          onClick={clearState}
          className='bg-[#151913] border border-[#2e2e2e] cursor-pointer p-2 rounded-lg hover:bg-[#1a1e18] transition-colors duration-200'
        >
          <span className='text-lg font-semibold text-[#e1e1e1]'>Clear</span>
        </button>
      </div>

      {isSubmitted && (
        <div>
          <h1 className='mx-3 text-lg font-semibold'>Diff Result</h1>
          <div className='mx-3 flex gap-5 bg-[#0f1311] p-2 rounded-lg w-max'>
            <p>Lines: {maxLines}</p>
            <p>Changes: {totalChanges}</p>
          </div>

          <div className='m-3 flex gap-5'>
            <div className='flex flex-col gap-1 w-1/2 py-2 px-3 rounded-lg bg-[#1a1e1b] border border-[#2e2e2e] shadow-md overflow-auto max-h-[500px]'>
              {diffOriginal.length > 0 ? (
                diffOriginal.map((data, index) => (
                  <div
                    key={index}
                    className={`flex gap-3 group items-start rounded-md p-2 ${
                      data.type === 'added'
                        ? 'bg-[#033a16]'
                        : data.type === 'removed'
                        ? 'bg-[#3a0d0d]'
                        : data.type === 'changed'
                        ? 'bg-[#3a320a]'
                        : 'bg-[#0f1311] hover:bg-[#151a17]'
                    }`}
                  >
                    <div 
                      onClick={() => CopyToClipboard(data.line)}
                     className='min-w-[40px] cursor-pointer text-center text-sm text-[#7a7a7a] rounded-md py-1'>
                      {index + 1}
                    </div>
                    <span className='text-[#e1e1e1] break-words'>
                      {data.line}
                    </span>
                  </div>
                ))
              ) : (
                <div className='text-[#555] italic'>No code to display.</div>
              )}
            </div>
            <div className='flex flex-col gap-1 w-1/2 py-2 px-3 rounded-lg bg-[#1a1e1b] border border-[#2e2e2e] shadow-md overflow-auto max-h-[500px]'>
              {diffModified.length > 0 ? (
                diffModified.map((data, index) => (
                  <div
                    key={index}
                    className={`flex gap-3 group items-center rounded-md p-2 ${
                      data.type === 'added'
                        ? 'bg-[#033a16]'
                        : data.type === 'removed'
                        ? 'bg-[#3a0d0d]'
                        : data.type === 'changed'
                        ? 'bg-[#3a320a]'
                        : 'bg-[#0f1311] hover:bg-[#151a17]'
                    }`}
                  >
                    <div 
                    onClick={() => CopyToClipboard(data.line)}
                    className='min-w-[40px] text-center text-sm text-[#7a7a7a] rounded-md py-1'>
                      {index + 1}
                    </div>
                    <span className='text-[#e1e1e1] break-words'>
                      {data.line}
                    </span>
                  </div>
                ))
              ) : (
                <div className='text-[#555] italic'>No code to display.</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App