import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

const ForgotPassword = () => {
    let apiUrl = `http://localhost:8000/chatApp/auth/forgot-password`
    const [userInfo, setUserInfo] = useState({
        "userName": "",
        "emailId": "",
        "mobileNumber": "",
        "resetType": "MAIL",
        "resetOption": "TOKEN"
    })
    const forgotPwd = async (e) => {
        e.preventDefault();
        if (userInfo['userName'] !== '' && userInfo['emailId'] !== '' && userInfo['mobileNumber'] !== '') {
            axios.defaults.withCredentials = true;
            await axios.post(apiUrl, userInfo).then((res) => {
                if (res['data']['status'] === 200) {
                    toast.success('Password Reset Mail Sent')
                }
            }).catch((err)=> {
                console.log('Error while Forgot password',err);
                toast.error('Exception Occured while Forgot Password')
            })
        }
    }
    const updateLiveData = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setUserInfo((prevValue)=> {return {...prevValue, [name]: value}})
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
  <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
    <div className="text-center mb-6">
      <h1 className="text-2xl font-bold text-gray-800">Forgot Password</h1>
    </div>
    <div className="space-y-4">
      <ToastContainer position="top-center" />
      <form onSubmit={forgotPwd} className="space-y-4">
        <input
          type="text"
          placeholder="Username"
          name="userName"
          value={userInfo['userName']}
          onChange={updateLiveData}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <input
          type="email"
          placeholder="Email Address"
          name="emailId"
          value={userInfo['emailId']}
          onChange={updateLiveData}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <input
          type="number"
          placeholder="Mobile Number"
          name="mobileNumber"
          value={userInfo['mobileNumber']}
          onChange={updateLiveData}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <div className="text-center">
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Forgot Password
          </button>
        </div>
      </form>
    </div>
  </div>
        </div>

    )
}

export default ForgotPassword;
