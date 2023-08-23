import { Box, Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useTheme } from '../Context/ThemeContext';
import { auth } from '../firebaseConfig';
import { toast } from 'react-toastify';
import errorMapping from '../Utils/errorMapping';

const SignUpForm = ({handleClosedModal}) => {
    const {theme} = useTheme();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cnfPassword, setCnfPassword] = useState('');
    
    const handleUserSubmit = () => {
      if(!email || !password || !cnfPassword){
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
      if(password !== cnfPassword){
        toast.warning('Password MisMatch...!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
        return;
      }
      
      auth.createUserWithEmailAndPassword(email, password).then((reslove) => {
        toast.success('User created...!', {
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
        toast.error(errorMapping[error.code] ||'Not able to create User, Please try Again...!', {
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
            <TextField 
              variant='outlined'
              type='password'
              label='Enter Confirm Password'
              onChange={(event) => setCnfPassword(event.target.value)}
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
            size='large' style={{color: theme.background, backgroundColor: theme.textcolor}} onClick={handleUserSubmit}>SignUp</Button>
        </Box>
    </div>
  )
}

export default SignUpForm