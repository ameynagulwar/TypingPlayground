import React, { useState } from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { AppBar, Modal, Tab, Tabs } from '@mui/material';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import { useTheme } from '../Context/ThemeContext';
import {signInWithPopup, GoogleAuthProvider, FacebookAuthProvider, GithubAuthProvider} from 'firebase/auth';
import { toast } from 'react-toastify';
import errorMapping from '../Utils/errorMapping';
import { auth } from '../firebaseConfig';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuthState } from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router-dom';
import { Facebook } from '@mui/icons-material';

const AccountCircle = () => {

    const navigate = useNavigate();
    const [user] = useAuthState(auth)
    const {theme} = useTheme()
         
    const[open, setOpen] = useState(false)

    const[value, setValue] = useState(0);

    const handleOpenModal = () => {
      if(user){
        navigate('/User')
      }
      else{
        setOpen(true);
      }
    }

    const handleClosedModal = () => {
        setOpen(false);
    }

    const handleValueChange = (event, value) => {
        setValue(value);
    }
    
    const googleProvider = new GoogleAuthProvider();

    const handleSigUpWithGoogle = () => {
      signInWithPopup(auth, googleProvider).then((resolve) => {
        toast.success('Google login successful...!', {
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
        toast.error(errorMapping[error.code] ||'Not able to use Google Authentication...!', {
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

     const faceBookprovider = new FacebookAuthProvider()
      const handleSignUpWithFacebook = () => {
      signInWithPopup(auth, faceBookprovider).then((resolve) => {
        toast.success('Facebook login successful...!', {
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
        console.log(error)
        toast.error(errorMapping[error.code] ||'Not able to use Facebook Authentication...!', {
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

    const githubProvider = new GithubAuthProvider()
    const handleSignInWithGithub = () => {
      signInWithPopup(auth, githubProvider).then((resolve) => {
        toast.success('Github login successful...!', {
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
        console.log(error)
        toast.error(errorMapping[error.code] ||'Not able to use Github Authentication...!', {
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

    const logout = () => {
       auth.signOut().then((resolve) => {
        toast.success('Logged out...!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
       }).catch((error) => {
          toast.error('Not able to Logout...!', {
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
         <AccountCircleIcon onClick={handleOpenModal}/>
        {user && <LogoutIcon onClick={logout}/>}
         <Modal 
             open={open} 
             onClose={handleClosedModal}
             style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
             }}>
            <div style={{width: '400px', textAlign: 'center'}}>
                <AppBar position='static' style={{background: 'transparent'}}>
                     <Tabs
                     value={value}
                     onChange={handleValueChange}
                      variant='fullWidth'>
                         <Tab label='Login' style={{color: theme.textcolor}}></Tab>
                         <Tab label='SignUp' style={{color: theme.textcolor}}></Tab>
                     </Tabs>
                </AppBar>
                {value === 0 && <LoginForm handleClosedModal={handleClosedModal}/>}
                {value === 1 && <SignUpForm handleClosedModal={handleClosedModal}/>}
                <box id="box-icons">
                    <span>OR</span>
                    <div className='google-facebook-github-logos'>
                        <img className='signup-logo' src={require('./google.png')} onClick={handleSigUpWithGoogle}/>
                        <img className='signup-logo' src={require('./github-mark-white.png')} onClick={handleSignInWithGithub}/>
                        <img className='signup-logo' src={require('./facebook.png')} onClick={handleSignUpWithFacebook}/>
                    </div>
                </box>
            </div>
         </Modal>
    </div>
  )
}

export default AccountCircle