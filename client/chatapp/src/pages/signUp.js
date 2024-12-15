import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const navigate = useNavigate()
    let apiUrl = `http://localhost:8000/chatApp/auth/signup`
    const [userInfo, setUserInfo] = useState({
        "userName": "",
        "firstName": "",
        "lastName": "",
        "emailId": "",
        "password": "",
        "confirm_password": "",
        "gender": "",
        "mobile": "",
        "profilePic": "",
    })
    const signUser = async (e) => {
        e.preventDefault();
        if (userInfo['userName'] !== '' && userInfo['emailId'] !== '' && userInfo['password'] !== '') {
            console.log('aaaa',userInfo);
            const options = {
                'headers': {
                    'Content-Type': 'application/json'
                },
                'body': JSON.stringify(userInfo)
            }
            axios.defaults.withCredentials = true;
            await axios.post(apiUrl, userInfo).then((res)=> {
                console.log('signupress',res);
                if (res['data']['status'] === 200) {
                    toast.success('User Created Successfully');
                    setTimeout(() => {
                        navigate('/login')
                    }, 5000);
                } else {
                    toast.error('User Creation Failed');
                    console.log('signUp.js: signUser => User Creation Failed',res['data']['message']);
                }
            }).catch((err)=> {
                console.log('signUp.js: signUser => Exception occured while creating user',err);
            })
        }
    }
    const updateFieldValue = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setUserInfo((currentVal) => {return {...currentVal, [name]: value}})
    }
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
  <div className="w-full max-w-2xl bg-white shadow-lg p-8 rounded-lg">
    <ToastContainer />
    <div className="text-center text-gray-800 mb-6">
      <h1 className="text-3xl font-semibold">Sign Up</h1>
    </div>
    <form onSubmit={signUser}>
      <div className="flex flex-col items-center space-y-4">
        <input
          type="text"
          placeholder="Username"
          name="userName"
          value={userInfo['userName']}
          onChange={updateFieldValue}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="First Name"
          name="firstName"
          value={userInfo['firstName']}
          onChange={updateFieldValue}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Last Name"
          name="lastName"
          value={userInfo['lastName']}
          onChange={updateFieldValue}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="email"
          placeholder="Email Address"
          name="emailId"
          value={userInfo['emailId']}
          onChange={updateFieldValue}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={userInfo['password']}
          onChange={updateFieldValue}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          placeholder="Confirm Password"
          name="confirm_password"
          value={userInfo['confirm_password']}
          onChange={updateFieldValue}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
         <div className="flex space-x-4">
              <label className="flex items-center space-x-2">
                <input type="radio" name="gender" value="Male" className="form-radio" />
                <span>Male</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="radio" name="gender" value="Female" className="form-radio" />
                <span>Female</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="radio" name="gender" value="Other" className="form-radio" />
                <span>Other</span>
              </label>
            </div>
        <input
          type="text"
          placeholder="Gender"
          name="gender"
          value={userInfo['gender']}
          onChange={updateFieldValue}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          placeholder="Mobile Number"
          name="mobile"
          value={userInfo['mobile']}
          onChange={updateFieldValue}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Profile Pic URL"
          name="profilePic"
          value={userInfo['profilePic']}
          onChange={updateFieldValue}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mt-6 text-center">
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Sign Up
        </button>
      </div>
    </form>
  </div>
</div>

    )
}

export default SignUp
