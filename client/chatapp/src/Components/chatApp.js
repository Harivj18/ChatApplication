import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import './chatApp.css';
import io from 'socket.io-client';
import axios from "axios";

const socket = io('http://localhost:8000', { withCredentials: true });

const ChatApp = ({userInfo}) => {
    const location = useLocation();
    const [senderInfo, setSenderInfo] = useState('')
    const [message, setMessage] = useState('');
    const [sender, setSenderState] = useState(false);
    const [chatHistory, setChat] = useState([]);
    const chatHistoryUrl = `http://localhost:8000/chatApp/message/getMessages`
    // const { userInfo } = location.state || { "userInfo": { "userName": "", "roomId": "", "chatType": "" } };
    // console.log('userInfo', userInfo);
    
    useEffect(() => {
        if (senderInfo === '') {
            setSenderInfo(JSON.parse(localStorage.getItem('loggedUserInfo')));
        }
        if (userInfo.userName && userInfo.roomId) {
            fetchChat()     
            socket.emit('join_room', userInfo.roomId);
        }
        socket.on('connect', () => {
            console.log('Socket Connection Established to Server');
        });

        socket.on('response', (data) => {
            console.log('Received data:', data);
            // fetchChat()
            setChat((lastMessages) => ([...lastMessages, data]));
            console.log('chatHistory',chatHistory);
        });

        socket.on('disconnect', () => {
            console.log('Socket Disconnected From the Server');
        });

        return () => {
            socket.off('connect');
            socket.off('response');
            socket.off('disconnect');
        };
    }, [userInfo]);

    function fetchChat() {
        setChat([])
        axios.post(chatHistoryUrl, {
            roomId: userInfo.roomId, 
            receiverId : userInfo.userId,
            senderId: senderInfo['userId'],
            chatType: userInfo.chatType,
        }).then((res)=> {
            console.log('j',res);
            console.log('chatHistorychatHistory',chatHistory);
            if (res['data']?.['status'].toUpperCase() === 'SUCCESS') {
                if (res['data']?.['messages'].length > 0) {
                    if (res['data']['messages'][0]?.['messageId'].length > 0) {
                        for (let messageHistory of res['data']['messages'][0]['messageId']) {
                            if (res['data']['messages'][0]['messageId'].length > chatHistory.length) {    
                                setChat((lastMessages) => ([...lastMessages, messageHistory]))
                            } else if (chatHistory.length > 0 && chatHistory[0]['receiverId'] !== messageHistory['receiverId']) {
                                setChat((lastMessages) => ([...lastMessages, messageHistory]))
                            }
                        }
                    }
                } else {
                    setChat([])
                }
                console.log('final chatHistorychatHistory',chatHistory);
                
            }
        }).catch((err)=> {
            console.log('Error while fetching chatHistory',err);
        })
    }

    const TimeFormat = () => {
      let date = new Date();
      let hours = date.getHours();
      let minutes = date.getMinutes();
      let meridian = hours >= 12 ? "PM": "AM";
      hours = hours % 12;
      hours = hours ? hours : "12";
      minutes = minutes < 10 ? "0" + minutes : minutes
      let sentOn = hours + ":" + minutes + ` ${meridian}`
      console.log('Timing', hours + ":" + minutes + ` ${meridian}`);
      return sentOn
    }

    const sendMessage = () => {
        setSenderInfo(JSON.parse(localStorage.getItem('loggedUserInfo')));
        
        if (message !== "") {
        console.log('SenderInfo1',senderInfo['userId']);
            const messageData = { 
                roomId: userInfo.roomId, 
                message: message, 
                receiverName: userInfo.userName,
                receiverId : userInfo.userId,
                senderId: senderInfo['userId'],
                senderName: senderInfo['userName'],
                chatType: userInfo.chatType,
                sentOn: TimeFormat()
            };
            socket.emit('message', messageData);
            // fetchChat()
            setChat((lastMessages) => ([...lastMessages, messageData])); 
            setMessage('');
        }
    };

   return (
  <div className="w-2/3 mx-auto flex flex-col bg-white p-4 shadow-lg rounded-lg h-screen max-h-[91vh]">
    <div className="flex items-start justify-start mb-4">
    <img 
        src={userInfo.profilePicture || 'default-profile.png'} 
        alt="Profile" 
        className="w-10 h-10 rounded-full mr-3"
    />
    <h2 className="text-xl font-semibold">{userInfo.contactName}</h2>
</div>

    <div className="flex-grow h-0 bg-gray-200 rounded mb-4 p-4 overflow-y-scroll">
     <ul className="space-y-2">
    {chatHistory.map((msg, index) => (
        
        <li
            key={index}
            className={`flex ${
                Number(senderInfo['userId']) === msg.senderId
                    ? 'justify-end'
                    : 'justify-start'
            }`}
        >
            <div
                className={`p-3 rounded shadow-md ${
                    Number(senderInfo['userId']) === msg.senderId
                        ? 'bg-blue-500 text-white'
                        : 'bg-white'
                } break-words w-auto max-w-[75%]`}
            >
                <span>{msg.message}</span>
                <small className="block text-xs text-gray-300 mt-1 text-right">
                    {msg.sentOn}
                </small>
            </div>
        </li>
    ))}
</ul>

    </div>

    <div className="flex gap-2">
      <input
        type="text"
        className="flex-grow p-2 border rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
      />
      <button
        className="bg-blue-500 text-white px-5 py-2 rounded-r hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        type="button"
        onClick={sendMessage}
      >
        Send
      </button>
    </div>
  </div>
);

};

export default ChatApp;
