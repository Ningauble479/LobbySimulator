import React from 'react';
import AccountBar from './AccountBar';
import AdBar from './AdBar';

const Background = () => {
  return (
    <div className="background">
      <AccountBar />
      <AdBar />
      {/* Additional background elements can be added here */}
    </div>
  );
};

export default Background;
