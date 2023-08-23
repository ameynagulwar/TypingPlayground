import React, { useState } from 'react'
import Select from 'react-select'
import { themeOptions } from '../Utils/themeOptions'
import { useTheme } from '../Context/ThemeContext'
import { GitHub, LinkedIn } from '@mui/icons-material';

const Footer = () => {

 
    // function for handling the theme
     const {setTheme,theme} = useTheme();
     const handleChange = (event) => {
         setTheme(event.value);
         localStorage.setItem("theme", JSON.stringify(event.value))
     }

  return (
    <div className='footer'>
        <div className="link">
            <a href='https://github.com/ameynagulwar?tab=repositories'><GitHub/></a>
            <a href='https://www.linkedin.com/in/amey-nagulwar-ab35911ba/'><LinkedIn/></a>
        </div>
        <div className="themeButton">
           <Select
              onChange={handleChange}
              options={themeOptions}
              menuPlacement='top'
              defaultValue={{label : theme.label, value: theme}}
              styles={{
                control: styles => ({...styles, backgroundColor: theme.background}),
                menu: styles => ({...styles, backgroundColor: theme.background}),
                option: (styles, {isFocused}) => {
                      return {
                        ...styles,
                        backgroundColor: (!isFocused)? theme.background : theme.textcolor,
                        color: (!isFocused)? theme.textcolor : theme.background,
                        cursor: 'pointer'
                      }
                }
              }}
          />
        </div>

    </div>
  )
}

export default Footer