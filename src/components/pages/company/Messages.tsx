import React from 'react';

interface MessagesProps {}

const Messages: React.FC<MessagesProps> = () => {
  return (
    <div className='flex h-full'>
      <div className="m-auto font-bold text-[25px]">Comming soon...</div>      
    </div>
  );
};

export default Messages;