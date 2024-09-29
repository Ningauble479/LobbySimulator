import React, { useState } from 'react';
import  "../../Styles/SideBar.css";
import OW2MenuButton from './OW2MenuButton';


const SideBar = () => {
    let [options, setOptions] = useState(['...loading'])

  return (
    <div className="sidebar">
        <h2>Overwatch 2</h2>
        {options.map((option)=>{
            return(
                <div>
                    <OW2MenuButton label={"WORLD OF WARCRAFT"}/>
                </div>
            )
        })}
    </div>
  );
};

export default SideBar;
