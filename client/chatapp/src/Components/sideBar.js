import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ChatApp from './chatApp';

const SideBar = () => {
  const [selectedContact, setSelectedContact] = useState(null);
  const [popupVisible, setPopupVisible] = useState(false);
  const [myContacts, setContacts] = useState([]);
  const [currentContact, setCurrentContacts] = useState([]);
  const navigate = useNavigate();
  const contactUrl = `http://localhost:8000/chatApp/contacts/getContacts`;

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get(contactUrl, { withCredentials: true });
        if (response.data.status.toUpperCase() === 'SUCCESS' && response.data.contacts.length > 0) {
          setContacts(response.data.contacts);
        }
      } catch (err) {
        console.error("Error while Fetching Contacts", err);
      }
    };

    fetchContacts();
  }, []);

  const createJoinRoom = () => {
    navigate('/createJoinRoom');
  };

  const handleProfileClick = (contact) => {
    setSelectedContact(contact);
    setPopupVisible(true);
  };

  const handleRowClick = (contact) => {
    console.log("Contact Details:", contact);
    console.log("currentContact Details:", currentContact);
    if (currentContact.length > 0) {
      if (currentContact[0]['userId'] !== contact['userId'] 
       && currentContact[0]['roomId'] !== contact['roomId']) {
        setCurrentContacts([contact])
        navigate('/home', {state: {"userInfo":contact}})
      }
    } else {
      setCurrentContacts([contact])
      navigate('/home', {state: {"userInfo":contact}})
    }
  };
  console.log('myContacts',myContacts);
  
 return (
  <div className="w-1/3 bg-gray-50 p-4 border-r shadow-lg flex flex-col relative">
    <h2 className="text-2xl font-bold mb-6 text-gray-700">Chats</h2>
    <ul className="flex-grow overflow-y-auto h-96 space-y-3 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
      {myContacts.length > 0 ? (
          myContacts.map((contact) => (
            <li
              key={contact.id}
              className="flex items-center p-3 bg-white rounded-lg shadow-sm hover:bg-gray-100 transition cursor-pointer"
              onClick={() => handleRowClick(contact)}
            >
              <img
                src={contact.profilePicture || "default-profile.png"}
                alt="Profile"
                className="w-16 h-16 rounded-full object-cover border border-gray-200 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  handleProfileClick(contact);
                }}
              />
              <div className="ml-4">
                <span
                  className="block text-lg font-semibold text-gray-800 cursor-pointer"
                >
                  {contact.contactName}
                </span>
                <span
                  className={`text-sm ${contact.isActive ? "text-green-500" : "text-gray-500"}`}
                >
                  {contact.isActive ? "Active" : "Offline"}
                </span>
              </div>
            </li>
          ))
        ) : (
          <li className="text-center text-gray-500">No Contacts to Display</li>
        )}
    </ul>
    <div className="absolute bottom-6 right-6">
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition"
        onClick={createJoinRoom}
      >
        New Chat
      </button>
    </div>

    {popupVisible && selectedContact && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white rounded-lg shadow-lg p-6 w-96 max-h-[85vh] overflow-auto">
          <div className="flex flex-col items-center">
            <img
              src={selectedContact.profilePicture || "default-profile.png"}
              alt="Profile"
              className="w-40 h-40 rounded-full object-cover border-4 border-gray-300"
            />
            <h3 className="text-2xl font-bold text-center mt-6">
              {selectedContact.contactName}
            </h3>
            <p
              className={`text-lg mt-2 ${
                selectedContact.isActive ? "text-green-500" : "text-gray-500"
              }`}
            >
              {selectedContact.isActive ? "Active" : "Offline"}
            </p>
            <p className="text-gray-500 mt-2">
              Contact ID: {selectedContact.userId}
            </p>
          </div>
          <button
            className="bg-red-500 text-white px-4 py-2 mt-6 w-full rounded hover:bg-red-600"
            onClick={() => setPopupVisible(false)}
          >
            Close
          </button>
        </div>
      </div>
    )}
  </div>
);
};

export default SideBar;
