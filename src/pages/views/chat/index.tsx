import React from 'react';
import InnerAppLayout from '../../../layout/inner-app-layout';
import ChatMenu from './ChatMenu';
import ChatContent from './ChatContent';

// interface ChatProps {}
function Index() {
  return (
    <div className='chat'>
      <InnerAppLayout
        sideContent={<ChatMenu />}
        mainContent={<ChatContent />}
        sideContentWidth={450}
        sideContentGutter={false}
        border
      />
    </div>
  );
}

export default Index;
