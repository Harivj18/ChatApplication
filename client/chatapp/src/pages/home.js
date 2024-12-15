import React from 'react';
import { useLocation } from "react-router-dom";
import SideBar from '../Components/sideBar';
import Contacts from '../Components/Contacts';
import ChatApp from '../Components/chatApp';
import SearchBar from '../Components/SearchBar';
const Homepage = () => {
  const location = useLocation();
  const { userInfo } = location.state || { "userInfo": {"contactName": "", "userName": "", "userId": "","roomId": "", "chatType": "" } };
  return (
  <div className="min-h-screen bg-gray-100 flex flex-col">
    <header className="flex items-center p-4 bg-white shadow-md">
  <h1 className="text-2xl font-bold">ChatApp</h1>
  <div className="ml-auto flex items-center space-x-4">
    <SearchBar />
    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
      Logout
    </button>
  </div>
</header>


    <div className="flex-grow flex overflow-hidden h-[90vh]">
      <SideBar className="w-1/4 bg-gray-200 overflow-y-auto"></SideBar>
      <ChatApp userInfo = {userInfo} className="flex-grow bg-white overflow-y-auto"></ChatApp>
    </div>
  </div>
);

};

export default Homepage;
