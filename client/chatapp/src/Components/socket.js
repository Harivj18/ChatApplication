import React from "react";
import './socket.css';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ChatApp from "./chatApp";
import axios from "axios";


const SocketConnection = () => {
    const [userInfo, setuserInfo] = useState({"contactName": "","userName": "", "profilePicture": null,"roomId": "", "userId": "","chatType": "privateChat"});
    const [message, setMessage] = useState('');
    const [image, setImage] = useState(null);
    const navigate = useNavigate();
    // axios.defaults.withCredentials = true;
    const apiUrl = `http://localhost:8000/chatApp/contacts/saveContact`

    const joinChatRoom = async (e) => {
        // e.preventDefault();
        axios.defaults.withCredentials = true;
        if (userInfo['contactName'] !== ""  && userInfo['userName'] !== "" && userInfo['roomId'] !== "") {
            console.log('userInfo', userInfo);
            await axios.post(apiUrl,userInfo).then((res)=> {
              console.log('rrrrrrrrrrrrr',res['data']);
              
              if (res['data']['status'].toUpperCase() === 'SUCCESS') {
                // alert('Contact Saved Successfully')
                navigate('/home', {state: {userInfo}})
              } else {
                alert('Existing Contact');
                // e.preventDefault();
              }
            }).catch((err)=> {
              console.log('Error while saving the contact',err);
              alert('Something Wrong Happened')  
            })
        } else {
            alert('Enter Valid User/Room Id')
        }
    }

    const uploadImage = async (e) => {
      try {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onloadend = () => {
            setuserInfo((currentData) => ({...currentData,'profilePicture':reader.result}))
            console.log('img',userInfo);
            
          };
        }
      } catch (error) {
        console.log('Error while uploading image',error);
        
      }
    }

    const updateValue = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setuserInfo((prevData)=>({...prevData, [name]: value}));
    }

   return (
  <div className="container mx-auto flex flex-col items-center justify-center h-screen bg-gray-100">
    <form 
      className="bg-white p-8 rounded-lg shadow-md w-full max-w-md space-y-6"
      onSubmit={(e) => {
        e.preventDefault()
        joinChatRoom();
      }}
    >
      <h2 className="text-3xl font-bold text-center text-gray-800">   
        {userInfo.chatType === "privateChat" ? 'Add New Contact' : "Create Group"}
      </h2>

      <input 
        type="text" 
        name="contactName" 
        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
        placeholder="Contact Name" 
        onChange={updateValue} 
        value={userInfo.contactName} 
      />

      <input 
        type="file" 
        onChange={uploadImage} 
      />
      
      <input 
        type="text" 
        name="userName" 
        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
        placeholder="Username" 
        onChange={updateValue} 
        value={userInfo.userName} 
      />

      <input 
        type="number" 
        name="userId" 
        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
        placeholder="User Id" 
        onChange={updateValue} 
        value={userInfo.userId} 
      />
      
      <input 
        type="number" 
        name="roomId" 
        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
        placeholder="Chat Id" 
        onChange={updateValue} 
        value={userInfo.roomId} 
      />


      
      <select 
        name="chatType" 
        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
        onChange={updateValue} 
        value={userInfo.chatType}>
        <option value="" disabled>Select Chat Type</option>
        <option value="privateChat">Private Chat</option>
        <option value="groupChat">Group Chat</option>
      </select>
      
      <button 
        type="submit" 
        className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
        {userInfo.chatType === "privateChat" ? 'Create Contact' : "Create Group"}
      </button>
    </form>
  </div>
);

//  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//           <div className="bg-white rounded-lg shadow-lg p-6 w-96 max-h-[85vh] overflow-auto">
//             <h3 className="text-2xl font-bold text-center mb-6">Start a New Chat</h3>
//             {/* Add input fields or other components here for starting a new chat */}
//             <div className="mb-4">
//               <input
//                 type="text"
//                 placeholder="Enter contact name"
//                 className="w-full p-2 border rounded-lg"
//               />
//             </div>
//             <div className="mb-6">
//               <input
//                 type="text"
//                 placeholder="Enter message"
//                 className="w-full p-2 border rounded-lg"
//               />
//             </div>
//             <button
//               className="bg-blue-500 text-white px-4 py-2 mt-4 w-full rounded hover:bg-blue-600"
//               onClick={() => {
//                 createJoinRoom(); // Trigger the logic to create or join a room
//                 setNewChatVisible(false); // Close the modal
//               }}
//             >
//               Start Chat
//             </button>
//             <button
//               className="bg-gray-500 text-white px-4 py-2 mt-2 w-full rounded hover:bg-gray-600"
//               onClick={handleCloseNewChat}
//             >
//               Close
//             </button>
//           </div>
//         </div>


}

export default SocketConnection;