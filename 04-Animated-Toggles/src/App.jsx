import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

function App () {
  const [selected, setSelected] = useState('Free')

  return (
    <div className='text-md font-semibold'>
      <div className='md:w-1/3 bg-white relative mx-auto mt-10 p-1 border border-[#eee] rounded-full shadow-sm flex items-center'>
        <motion.div
          className='absolute top-1 bottom-1 left-0 bg-black rounded-full w-1/2'
          animate={{ left: selected === 'Free' ? '1%' : '49%' }}
          transition={{ type: 'spring', stiffness: 500, damping: 50 }}
        />
        <p
          onClick={() => setSelected('Free')}
          className={`z-10 p-2 text-center ${
            selected === 'Free' ? 'text-white' : 'text-black'
          } cursor-pointer w-1/2`}
        >
          Free
        </p>

        <AnimatePresence mode='wait'>
          {selected === 'Free' ? (
            <motion.div
              key='free'
              className='flex flex-col w-1/2 text-center cursor-pointer'
            >
              <motion.p
                exit={{ opacity: 0 }}
                onClick={() => setSelected('Premium')}
              >
                Premium
              </motion.p>
              <motion.p
                exit={{ opacity: 0, scale: 1.2 }}
                className='font-normal'
                onClick={() => setSelected('Premium')}
              >
                
                <span>Monthly</span>
                <span className='mt-2 mx-1 font-bold'>.</span>
                <span>Annual</span>
                
              </motion.p>
            </motion.div>
          ) : (
            <motion.div
              key='premium'
              className='flex justify-between items-center relative w-1/2 rounded-full p-1 gap-1'
            >
              <motion.div
                initial={{ left: '0%' }}
                className='absolute top-1 bottom-1 bg-white rounded-full w-1/2'
                animate={{ left: selected === 'Premium' ? '0%' : '48%' }}
                transition={{ type: 'spring', stiffness: 500, damping: 50 }}
              />

              <motion.p
                onClick={() => setSelected('Premium')}
                className={`z-10 p-2 text-center ${
                  selected === 'Premium' ? 'text-black' : 'text-white'
                } cursor-pointer w-1/2`}
              >
                Monthly
              </motion.p>
              <p
                onClick={() => setSelected('Annual')}
                className={`z-10 p-2 text-center ${
                  selected === 'Annual' ? 'text-black' : 'text-white'
                } cursor-pointer w-1/2`}
              >
                Annual
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default App
