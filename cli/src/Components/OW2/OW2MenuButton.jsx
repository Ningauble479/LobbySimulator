import React from 'react';
import '../../Styles/OW2MenuButton.css';

const OW2MenuButton = ({ label, onClick }) => {
  return (
    <button className="buttonCont" onClick={onClick}>
      {label}
    </button>
  );
};

export default OW2MenuButton;
