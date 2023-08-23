import { Box, Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useTheme } from '../Context/ThemeContext';
import { auth } from '../firebaseConfig';
import { toast } from 'react-toastify';
import errorMapping from '../Utils/errorMapping';


const LoginForm = ({handleClosedModal}) => {
    const {theme} = useTheme();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleUserLogin = () => {
      if(!email || !password){
        toast.warning('Fill all Details...!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
          return
      }

      auth.signInWithEmailAndPassword(email, password).then((resolve) => {
        toast.success('Logged In...!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
          handleClosedModal()
      }).catch((error) => {
        toast.error(errorMapping[error.code] || 'Invalid Credentials...!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
      })
    }
  return (
    <div>
        <Box
           p={3}
           style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '25px'
           }}>
            <TextField
              variant='outlined'
              type='email'
              label='Enter Email'
              onChange={(event) => setEmail(event.target.value)}
              InputLabelProps={{
                style: {
                  color: theme.textcolor
                }
              }}
              InputProps={{
                style: {
                  color: theme.textcolor
                }
              }}/>
            <TextField 
              variant='outlined'
              type='password'
              label='Enter Password'
              onChange={(event) => setPassword(event.target.value)}
              InputLabelProps={{
                style: {
                  color: theme.textcolor
                }
              }}
              InputProps={{
                style: {
                  color: theme.textcolor
                }
              }}/>
            <Button 
            variant='conatined'
            size='large'style={{color: theme.background, backgroundColor: theme.textcolor}} onClick={handleUserLogin}>Login</Button>
        </Box>
    </div>
  )
}

export default LoginForm