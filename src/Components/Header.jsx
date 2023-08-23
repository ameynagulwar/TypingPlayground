import React from 'react'
import AccountCircle from './AccountCircle'
import { motion } from 'framer-motion'


    

const Header = () => {
  return (
    <div className='header'>
        <div className="logo">
           
            <motion.span id='Lh' initial={{x: -200}} animate={{x: 0}} transition={{duration: 1.5}}><i>T</i>P</motion.span>
            <motion.span initial={{opacity: 0, scale: 0}} animate={{opacity: 1, scale: 1}} transition={{duration: 1.5}}>TypingPlay<u>ground</u>.</motion.span>
        </div>
        <div className="icons">
            <AccountCircle/>
        </div>
    </div>
  )
}

export default Header