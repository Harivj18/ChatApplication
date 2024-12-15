import React from 'react'
import ContactHeader from './contactHeader';
import Chats from './chats';
import MessageBox from './MessageBox';

const Conversation = () => {
  return (
    <div>
        <div className='contactHeader'>
            <ContactHeader></ContactHeader>
        </div>
        <div className='chats'>
            <Chats></Chats>
        </div>
        <div className='sentMessage'>
            <MessageBox></MessageBox>
        </div>
    </div>
  )
}

export default Conversation;
