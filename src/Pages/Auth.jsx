import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FloatingLabel, Form } from 'react-bootstrap'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { adminLoginAPI } from '../Services/AllApi';

function Auth({ insideRegister }) {
  const navigate = useNavigate()

  const [userName, setUserName] = useState('');

  //state to store user creating datas
  const [userInputs, setUserInputs] = useState({
    username: "", email: "", password: "", photo: ''
  })
  // console.log(userInputs);
  // /validation logic
  const validateEmail = (email) => {
    // Basic email validation
    return /\S+@\S+\.\S+/.test(email);
  };
  const validatePassword = (password) => {
    // password must be 6 characters
    return password.length >= 6;
  }
  const validateUsername = (username) => {
    return username.trim() !== ''
  }
  const validatePhoto = (photo) => {
    return photo.trim() !== ''
  }

  //   google auth
  const login = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const res = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: {
            Authorization: `Bearer ${response.access_token}`
          },

        })
        const { name } = res.data;
        setUserName(name);
        sessionStorage.setItem('name', JSON.stringify(res.data.name))


        console.log("Hello", res);
        navigate('/home')
      } catch (err) {
        console.log(err);
      }
    }
  });

  const handleGoogleSignIn = (event) => {
    event.preventDefault(); // Prevent default form submission
    login(); // Trigger Google Sign-In
  };

  const handleLogin = (e) => {
    e.preventDefault()
    const { email, password } = userInputs
    if (validateEmail(email) && validatePassword(password)) {
      // toast.success('Login success')
      navigate('/home')
    } else {
      // toast.error('Please fill the form')
      navigate('/home')
    }
  }

  // register
  const handleRegister = (e) => {
    e.preventDefault()
    const { email, password, username, photo } = userInputs
    if (validateEmail(email) && validatePassword(password) && validateUsername(username) && validatePhoto(photo)) {
      // toast.success('reg success')
      navigate('/home')
    } else {
      // toast.error('Please fill the form')
      navigate('/home')
    }
  }
  // cancel
  const handleCancel = () => {
    navigate('/')
  }
  const adminLogin = async (e) => {
    e.preventDefault()
    if (userInputs.email && userInputs.password) {
      // api call
      try {
        const result = await adminLoginAPI(userInputs)
        if (result.status == 200) {
          sessionStorage.setItem("existingUser", JSON.stringify(result.data.existingUser.email))
          toast.success(`welcome ${result.data.existingUser.email}`)
          setUserInputs({ email: "", password: "" })
          setTimeout(() => {
            navigate('/admindashboard')
          }, 2000)

        } else {
          toast.error(result.response.data)
        }
      }
      catch (err) {
        console.log(err);
      }
    }
    else {
      toast.warning('Please fill the form')
    }
  }


  return (
    <>
      <div style={{ width: '100%', height: '100vh' }} className='d-flex justify-content-center align-items-center'>
        <div className="container w-75">
          <div className="card shadow p-5">
            <div className="row align-items-center">
              <div className="col-lg-6">
                <img className='w-100' src="https://cdn.dribbble.com/users/806947/screenshots/4698193/drink_coffee-resize.gif" alt="Auth" style={{ borderRadius: '20%' }} />
              </div>
              <div className="col-lg-6">
                <h3 className="fw-bolder mt-2 text-primary">
                  Sign {insideRegister ? 'up' : 'in'} to your Account
                </h3>
                <Form>
                  {/* for new registers we use props  */}
                  {
                    insideRegister &&
                    <>
                      <FloatingLabel
                        controlId="floatingInputName"
                        label="Username"
                        className="mb-3"
                      >
                        <Form.Control value={userInputs.username}
                          onChange={e => setUserInputs({ ...userInputs, username: e.target.value })}
                          type="text"
                          placeholder="Username"
                          isInvalid={!validateUsername(userInputs.username)}
                        />
                      </FloatingLabel>

                      <FloatingLabel
                        controlId="floatingInputName"
                        label="Photo"
                        className="mb-3"
                      >
                        <Form.Control value={userInputs.photo}
                          onChange={e => setUserInputs({ ...userInputs, photo: e.target.value })}
                          type="text"
                          placeholder="Photo"
                          isInvalid={!validatePhoto(userInputs.photo)}
                        />
                      </FloatingLabel>
                    </>

                  }
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Email address"
                    className="mb-3"
                  >
                    <Form.Control value={userInputs.email}
                      onChange={e => setUserInputs({ ...userInputs, email: e.target.value })}
                      type="email"
                      placeholder="name@example.com"
                      isInvalid={!validateEmail(userInputs.email)}
                    />
                    <Form.Control.Feedback type="invalid">Please enter a valid email address.</Form.Control.Feedback>
                  </FloatingLabel>
                  <FloatingLabel controlId="floatingPassword" label="Password">
                    <Form.Control value={userInputs.password}
                      onChange={e => setUserInputs({ ...userInputs, password: e.target.value })}
                      type="password"
                      placeholder="Password"
                      isInvalid={!validatePassword(userInputs.password)}
                    />
                    <Form.Control.Feedback type="invalid">Password must be 6 characters.</Form.Control.Feedback>
                  </FloatingLabel>

                  {
                    insideRegister ?
                      <div className='mt-3'>
                        <div className='d-flex justify-content-center'>
                          <button onClick={handleRegister} className='btn btn-primary mb-2 me-3'>REGISTER</button>
                          <button onClick={handleCancel} className='btn btn-primary mb-2'>CANCEL</button>
                        </div>

                        <p>Already have an account? Click here to <Link to={'/login'}>Login</Link></p>
                        <Button variant="primary" onClick={handleGoogleSignIn}>Sign in with Google
                          <img src="https://i.postimg.cc/7hTSYK3b/g-removebg-preview.png" alt="" style={{ width: '30px', height: '30px' }} className='ms-3' />
                        </Button>
                      </div>
                      :
                      <div className='mt-3'>
                        <div className='d-flex justify-content-center'>
                          <button onClick={handleLogin} className='btn btn-primary mb-2 me-2'>USER LOGIN</button>
                          <button onClick={adminLogin} className='btn btn-primary mb-2 me-2'>ADMIN LOGIN</button>
                          <button onClick={handleCancel} className='btn btn-primary mb-2 Me-2'>CANCEL</button>
                        </div>

                        <p>New User? Click here to <Link to={'/register'}>Register</Link></p>
                        <div className='d-flex m-3 p-3'>
                          <input type="checkbox" style={{ marginRight: '5px' }} /><label style={{ marginRight: '95px' }}>Remember me</label>
                          <Link to="/forgot-password">Forgot password?</Link>
                        </div>
                        <Button variant="primary" onClick={handleGoogleSignIn}>Sign in with Google
                          <img src="https://i.postimg.cc/7hTSYK3b/g-removebg-preview.png" alt="" style={{ width: '30px', height: '30px' }} className='ms-3' /></Button>
                      </div>
                  }
                </Form>
                {userName && <h1 className="mt-3 text-center text-danger">Welcome, {userName}!</h1>}
                {/* {userName && <Home userName={userName} />} Pass userName as prop */}

              </div>
            </div>
          </div>
        </div>
        <ToastContainer position='top-center' theme='colored' autoClose={3000} />
      </div>
    </>
  )
}

export default Auth