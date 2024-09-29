import React from 'react';

const AccountBar = () => {
  return (
    <div className="account-bar">
      <img src="user-avatar.png" alt="User Avatar" className="user-avatar" />
      <div className="user-info">
        <h3 className="user-name">Username</h3>
        <p className="user-level">Level: 30</p>
      </div>
    </div>
  );
};

export default AccountBar;
