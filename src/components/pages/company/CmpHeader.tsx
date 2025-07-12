import React from 'react';
interface HeaderProps {}
const pages = ["Vendor", "Company", "Logout"];
const settings = ["Profile", "Logout"];

const CmpHeader: React.FC<HeaderProps> = () => {
  return (
    <div>
      Header
    </div>
  );
};

export default CmpHeader;