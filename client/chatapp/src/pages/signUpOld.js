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
        <div className='flex items-center justify-center min-h-screen'>
            <div className='max-w-2xl w-full bg-red-100 p-8 rounded-lg'>
                <ToastContainer />
                <div className='text-center text-white mb-4 text-2xl'>
                    <h1>SignUp</h1>
                </div>
                <form onSubmit={signUser}>
                    <div className='flex flex-col items-center space-y-4 mt-8'>
                        <input type='text' placeholder='userName' name='userName' value={userInfo['userName']} onChange={updateFieldValue} className='p-2 rounded w-96'></input>
                        <input type='text' placeholder='firstName' name='firstName' value={userInfo['firstName']} onChange={updateFieldValue} className='p-2 rounded w-96'></input>
                        <input type='text' placeholder='lastName' name='lastName' value={userInfo['lastName']} onChange={updateFieldValue} className='p-2 rounded w-96'></input>
                        <input type='email' placeholder='emailId' name='emailId' value={userInfo['emailId']} onChange={updateFieldValue} className='p-2 rounded w-96'></input>
                        <input type='password' placeholder='password' name='password' value={userInfo['password']} onChange={updateFieldValue} className='p-2 rounded w-96'></input>
                        <input type='password' placeholder='Confirm Password' name='confirm_password' value={userInfo['confirm_password']} onChange={updateFieldValue} className='p-2 rounded w-96'></input>
                        <input type='radio' placeholder='gender' name='gender' value={userInfo['gender']} onChange={updateFieldValue} className='p-2 rounded w-96 text-white'></input>
                        <input type='number' placeholder='mobile' name='mobile' value={userInfo['mobile']} onChange={updateFieldValue} className='p-2 rounded w-96'></input>
                        <input type='text' placeholder='profilePic' name='profilePic' value={userInfo['profilePic']} onChange={updateFieldValue} className='p-2 rounded w-96'></input>
                    </div>
                        <button className='btn btn-outline btn-ghost space-y-4 mt-8'>SignUp</button>
                </form>
            </div>
            {/* <div className='formBody'>
                <ToastContainer position='top-center'></ToastContainer>
                <form onSubmit={signUser}>
                    <input type='text' placeholder='userName' name='userName' value={userInfo['userName']} onChange={updateFieldValue}></input>
                    <input type='text' placeholder='firstName' name='firstName' value={userInfo['firstName']} onChange={updateFieldValue}></input>
                    <input type='text' placeholder='lastName' name='lastName' value={userInfo['lastName']} onChange={updateFieldValue}></input>
                    <input type='email' placeholder='emailId' name='emailId' value={userInfo['emailId']} onChange={updateFieldValue}></input>
                    <input type='password' placeholder='password' name='password' value={userInfo['password']} onChange={updateFieldValue}></input>
                    <input type='password' placeholder='Confirm Password' name='confirm_password' value={userInfo['confirm_password']} onChange={updateFieldValue}></input>
                    <input type='radio' placeholder='gender' name='gender' value={userInfo['gender']} onChange={updateFieldValue}></input>
                    <input type='number' placeholder='mobile' name='mobile' value={userInfo['mobile']} onChange={updateFieldValue}></input>
                    <input type='text' placeholder='profilePic' name='profilePic' value={userInfo['profilePic']} onChange={updateFieldValue}></input>
                    <div>
                        <button className='signUpBtn'>SignUp</button>
                    </div>
                </form>
            </div> */}
            <div className='formFooter'>

            </div>
        </div>
    )
}

export default SignUp
