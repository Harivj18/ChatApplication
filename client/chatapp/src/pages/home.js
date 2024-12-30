import React, { useContext, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import SideBar from '../Components/sideBar';
import ChatApp from '../Components/chatApp';
import SearchBar from '../Components/SearchBar';
import { AuthContext } from '../Components/AuthContext';
import axios from 'axios';
import Spinner from '../Components/Spinner';

const Homepage = () => {
  const location = useLocation();
  const { setIsAuthenticated } = useContext(AuthContext);
  const { userInfo } = location.state || { "userInfo": { "contactName": "", "userName": "", "userId": "", "roomId": "", "profilePicture": null ,"chatType": "" } };
  const apiUrl = `${process.env.REACT_APP_SERVER_URL}/chatApp/auth/logout`;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loaderMsg, setLoaderMsg] = useState('Logging Out ....')

  const logoutUser = async () => {
    setLoading(true);
    await axios.post(apiUrl)
      .then((logoutData) => {
        console.log('logoutData', logoutData);
        setTimeout(()=> {
          if (logoutData?.data?.status === 200) {
            setIsAuthenticated(false);
            localStorage.removeItem('loggedUserInfo');
            navigate('/login');
          } else {
            setIsAuthenticated(true);
            console.log('something wrong while logging out user session');
          }
        },1500)
      })
      .catch((err) => {
        setIsAuthenticated(true);
        console.log('Error while logging out user session', err);
      })
      .finally(() => {
        setTimeout(() => setLoading(false), 1500);
      });
  };

  if (loading) {
    return <Spinner loaderMsg={loaderMsg}></Spinner>
  }
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="flex items-center p-4 bg-white shadow-md">
        <h1 className="text-2xl font-bold">ChatApp</h1>
        <div className="ml-auto flex items-center space-x-4">
          <SearchBar />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={logoutUser}
          >
            Logout
          </button>
        </div>
      </header>

      <div className="flex-grow flex overflow-hidden h-[90vh]">
        <SideBar className="w-1/4 bg-gray-200 overflow-y-auto"></SideBar>
        <ChatApp userInfo={userInfo} className="flex-grow bg-white overflow-y-auto"></ChatApp>
      </div>
    </div>
  );
};

export default Homepage;
