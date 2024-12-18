import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import SideMenu from './SideMenu';


interface LayoutProps { }

const Layout: React.FC<LayoutProps> = () => {

  return (
    <div className="h-screen">
      <Header />
      <div className="h-[calc(100%-52px)] flex">
        <SideMenu />
        <div className="w-[calc(100%-180px)] h-full overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;