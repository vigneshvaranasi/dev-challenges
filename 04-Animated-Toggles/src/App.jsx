import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

function App () {
  const [selected, setSelected] = useState('Free')
  const [subSelected, setSubSelected] = useState('Monthly')

  return (
    <div className='text-md font-semibold'>
      <div className='md:w-1/3 bg-white relative mx-auto mt-10 border border-[#eee] rounded-full shadow-sm flex items-center h-14'>
        <motion.div
          className='absolute top-0.5 bottom-0.5 left-0.5 bg-black rounded-full w-1/2'
          animate={{ left: selected === 'Free' ? '1%' : '49%' }}
          transition={{ type: 'spring', stiffness: 500, damping: 50 }}
        />
        <p
          onClick={() => setSelected('Free')}
          className={`z-10 text-center ${
            selected === 'Free' ? 'text-white' : 'text-black'
          } cursor-pointer w-1/2 flex items-center justify-center`}
        >
          Free
        </p>

        <motion.div
          onClick={() => {
            setSelected('Premium')
            setSubSelected('Monthly')
          }}
          className={`flex flex-col w-1/2 text-center cursor-pointer py-2`}
          transition={{ type: 'spring', stiffness: 700, damping: 30 }}
        >
          <AnimatePresence>
            {selected !== 'Premium' && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.015 }}
              >
                Premium
              </motion.p>
            )}
          </AnimatePresence>
          <motion.div
            animate={{
              alignItems: 'center',
              zIndex: selected === 'Premium' ? 100 : 0
            }}
            transition={{
              type: 'spring',
              stiffness: 600,
              damping: 30
            }}
            className={`font-normal relative p-0 m-0 flex items-center justify-center ${
              selected === 'Premium' ? 'px-1' : 'px-0'
            }`}
          >
            {selected === 'Premium' && (
              <motion.div
                className='absolute top-0.5 bottom-0.5 -left-2 bg-white rounded-full w-1/2'
                initial={{ left: '1%' }}
                animate={{ left: subSelected === 'Monthly' ? '1%' : '49%' }}
                transition={{ type: 'spring', stiffness: 500, damping: 10 }}
              />
            )}
            <motion.p
              animate={{
                scale: selected === 'Premium' ? 1 : 0.98,
                justifyContent: 'space-between'
              }}
              transition={{ type: 'spring', stiffness: 600, damping: 30 }}
              className={`p-3 m-0 ${
                selected === 'Premium' ? 'text-black w-1/2 z-200' : 'text-black'
              }`}
            >
              Monthly
            </motion.p>
            {selected === 'Free' && <p>.</p>}
            <motion.p
              className={`p-0 m-0 ${
                selected === 'Premium'
                  ? 'text-white w-1/2 rounded-full'
                  : 'text-black'
              }`}
              animate={{
                scale: selected === 'Premium' ? 1.1 : 0.98
              }}
              transition={{ type: 'spring', stiffness: 600, damping: 30 }}
            >
              Annual
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default App
