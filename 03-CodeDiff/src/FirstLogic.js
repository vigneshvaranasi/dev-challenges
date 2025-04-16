function compareCodes () {
  const originalLines = originalCode.split('\n')
  const modifiedLines = modifiedCode.split('\n')
  const maxLinesCount = Math.max(originalLines.length, modifiedLines.length)
  setMaxLines(maxLinesCount)
  let changes = 0
  let diffOriginalTemp = []
  let diffModifiedTemp = []

  for (let i = 0; i < maxLinesCount; i++) {
    const originalLine = originalLines[i] || ''
    const modifiedLine = modifiedLines[i] || ''

    if (originalLine === modifiedLine) {
      diffOriginalTemp.push({ line: originalLine, type: 'unchanged' })
      diffModifiedTemp.push({ line: modifiedLine, type: 'unchanged' })
    } else {
      diffOriginalTemp.push({ line: originalLine, type: 'removed' })
      diffModifiedTemp.push({ line: modifiedLine, type: 'added' })
      changes++
    }
  }

  console.log('originalLines: ', originalLines)
  console.log('modifiedLines: ', modifiedLines)
  setDiffOriginal(diffOriginalTemp)
  setDiffModified(diffModifiedTemp)
  setTotalChanges(changes)
}
/* 
this logic is comparing line by line at the same index

issue:
if you delete a line in the middle, all upcoming lines shift, 
and it thinks everything after that is different even if it's same

to solve this we used
LCS: compute the longest common subsequence of lines
Mark removed, added, and unchanged properly based on that
*/