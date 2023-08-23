import React from 'react'
import { useTestMode } from '../Context/TestModeContext'

const UpperMenu = ({countDown}) => {

 const {setTestTime} = useTestMode()

 const updateTimer = (event) => {
  setTestTime(Number(event.target.id))
 }
  return (
    <div className='upper-menu'>
      <div className='counter' id='count'>
        {countDown}
      </div>
      <div className='test-modes'>
           <div className="modes" id={15} onClick={updateTimer}>15s</div>
           <div className="modes" id={30} onClick={updateTimer}>30s</div>
           <div className="modes" id={60} onClick={updateTimer}>60s</div>
      </div>
    </div>
  )
}

export default UpperMenu