import React from 'react'

const Contacts = () => {
  return (
    <div className="w-2/3 flex flex-col bg-white p-4">
          <h2 className="text-xl font-semibold mb-4">Chat</h2>
          <div className="flex-grow h-0 bg-gray-200 rounded mb-4 p-4 overflow-y-scroll">
            <div className="bg-white p-2 rounded mb-2">Message 1</div>
            <div className="bg-white p-2 rounded mb-2">Message 2</div>
            <div className="bg-white p-2 rounded mb-2">Message 3</div>
          </div>
          <div className="flex">
            <input
              type="text"
              className="flex-grow p-2 border rounded-l"
              placeholder="Type your message..."
            />
            <button className="bg-blue-500 text-white px-4 py-2 rounded-r">Send</button>
          </div>
    </div>
  )
}

export default Contacts
