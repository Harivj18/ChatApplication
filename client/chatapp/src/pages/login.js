import React, { useContext, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { AuthProvider } from '../Components/AuthContext';

const Login = () => {
    const navigate = useNavigate()
    // const {setIsAuthenticated} = useContext(AuthProvider);
    let apiUrl = `http://localhost:8000/chatApp/auth/login`
    const [userInfo, setUserInfo] = useState({
        "userName": "",
        "password": ""
    })
    const createAccount = () => {
      navigate('/signup')
    }
    const googleAccount = () => {
      window.open('http://localhost:8000/auth/google',"_self")
    }
    const githubAccount = () => {
      window.open('http://localhost:8000/github/auth',"_self");
    }
    async function loginData(e) {
        e.preventDefault()
        // const options = {
        //     "headers": {
        //         "Content-Type": "application/json"
        //     },
        //     "body": JSON.stringify(userInfo)
        // }
        axios.defaults.withCredentials = true;
        if (userInfo['userName'] !== '' && userInfo['password'] !== '') {
            await axios.post(apiUrl, userInfo)
            .then((res)=> {
                console.log('res',res);
                if (res['data'] && res['data']['status']=== 200) {
                    toast.success('User Login Successful')
                    setTimeout(()=> {
                        // setIsAuthenticated(true)
                        localStorage.setItem('loggedUserInfo', JSON.stringify({userName: userInfo['userName'], userId: 123}))
                        navigate('/home')
                    },1000)
                } else {
                    // setIsAuthenticated(false)
                    toast.error('Invalid User/ Credentials')
                }
            }).catch((err) => {
                // setIsAuthenticated(false)
                console.log('Login.js: loginData => Error in Login Page',err);
            })
        }
    }
    const updateInfo = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setUserInfo((prevData) => {return {...prevData, [name]:value}})
    }
    return (
       <div className="flex items-center justify-center min-h-screen bg-gray-100">
  <div className="w-full max-w-xl bg-white shadow-lg p-8 rounded-lg">
          {/* <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={{ zIndex: 9999 }}
      /> */}

    <div className="text-center text-gray-800 mb-6">
      <h1 className="text-3xl font-semibold">Login</h1>
    </div>
    <form onSubmit={loginData}>
      <div className="flex flex-col items-center space-y-4">
        <input
          type="text"
          placeholder="Username"
          name="userName"
          value={userInfo['userName']}
          onChange={updateInfo}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={userInfo['password']}
          onChange={updateInfo}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mt-6">
        <button
          type="submit"
          className="w-full px-4 py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Login
        </button>
      </div>
      <div className="mt-6 text-center">
        <button onClick={createAccount} className="text-blue-500 hover:underline">
          Create an Account
        </button>
      </div>
        <div className="mt-4 text-center">
            <a href="/forgot-password" className="text-blue-500 hover:underline">
              Forgot Password?
            </a>
          </div>
      <div className="mt-6 mx-4">
        <button
          onClick={googleAccount}
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-md flex items-center justify-center space-x-2 hover:bg-blue-600"
        >
          <svg
            className="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            fill="currentColor"
          >
            <path d="M24 9.5a13.5 13.5 0 0 1 9.48 3.79l5.6-5.6A21.5 21.5 0 1 0 24 45a21.45 21.45 0 0 0 15.06-6.25l-5.97-5.97A13.47 13.47 0 0 1 24 38a13.5 13.5 0 0 1 0-27z" />
          </svg>
          <span>Sign in with Google</span>
        </button>
      </div>
      <div className="mt-6 mx-4">
        <button
          onClick={githubAccount}
          className="w-full bg-gray-800 text-white px-4 py-2 rounded-md flex items-center justify-center space-x-2 hover:bg-gray-900"
        >
          <svg
            className="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 2a10 10 0 0 0-3.17 19.48c.5.09.68-.21.68-.48v-2c-2.76.6-3.34-1.33-3.34-1.33-.45-1.15-1.12-1.46-1.12-1.46-.91-.62.07-.61.07-.61 1 .07 1.53 1.07 1.53 1.07.9 1.55 2.35 1.1 2.92.84.09-.65.36-1.1.65-1.35-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.99 1.03-2.7-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.4 9.4 0 0 1 12 6.7a9.38 9.38 0 0 1 2.5.34c1.91-1.28 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.71 1.03 1.61 1.03 2.7 0 3.85-2.35 4.68-4.59 4.92.37.32.7.96.7 1.94v2.88c0 .28.18.59.69.49A10.02 10.02 0 0 0 12 2z" />
          </svg>
          <span>Sign in with GitHub</span>
        </button>
      </div>
    </form>
  </div>
</div>


    )

    
    
}


export default Login;
