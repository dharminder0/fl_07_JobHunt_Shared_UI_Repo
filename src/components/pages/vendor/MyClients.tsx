import React from 'react';

interface MyClients {}

const MyClients: React.FC<MyClients> = () => {
  return (
    <div className='flex h-full'>
      <div className="m-auto font-bold text-[25px]">Comming soon...</div>      
    </div>
  );
};

export default MyClients;