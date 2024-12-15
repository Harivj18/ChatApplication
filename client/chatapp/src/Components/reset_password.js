import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const ResetPassword = () => {
    const navigate = useNavigate();
    const apiUrl = `http://localhost:8000/chatApp/auth/reset-password`
    const [resetData, setResetData] = useState({
        "userName": "",
        "emailId": "",
        "mobileNumber": "",
        "resetToken": "715625f41e21b7fa652f53e74af27693c56cf387",
        "newPassword": "",
        "confirmPassword": ""
    })
    const updatePassword = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setResetData((existingValue) => {return {...existingValue, [name]: value}})
    }
    const resetPassword = async (e) => {
        e.preventDefault();
        if (resetData['newPassword'] !== "" && resetData['confirmPassword'] !== "") {
            await axios.post(apiUrl, resetData).then((res) => {
                if (res['status'] === 200) {
                    toast.success('Reset Password Successfull !!');
                    navigate('/home');
                }
            }).catch((err)=> {
                console.log('Error while Reseting password using axios',err);
                toast.error('Error on Reset Password')
            })
        }
    }
    return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
  <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
    <div className="text-center mb-6">
      <h1 className="text-2xl font-bold text-gray-800">Reset Password</h1>
    </div>
    <div className="space-y-4">
      {/* <ToastContainer position="top-center" /> */}
      <form onSubmit={resetPassword} className="space-y-4">
        <input
          type="password"
          placeholder="New Password"
          name="newPassword"
          value={resetData['newPassword']}
          onChange={updatePassword}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <input
          type="password"
          placeholder="Confirm Password"
          name="confirmPassword"
          value={resetData['confirmPassword']}
          onChange={updatePassword}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <div className="text-center">
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
           Reset Password
          </button>
        </div>
      </form>
    </div>
  </div>
        </div>

    )
}

export default ResetPassword;
