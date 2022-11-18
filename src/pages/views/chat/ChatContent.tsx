import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Conversation from './Conversation';

const ConversationEmpty = () => (
  <div className='chat-content-empty'>
    <div className='text-center'>
      <img src='/img/img-19.png' alt='Start a Conversation' />
      <h1 className='font-weight-light'>Start a conversation</h1>
    </div>
  </div>
);

function ChatContent() {
  return (
    <Routes>
      <Route path='/' element={<ConversationEmpty />} />
      <Route path=':id' element={<Conversation />} />
    </Routes>
  );
}

export default ChatContent;
