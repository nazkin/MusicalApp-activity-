import React from 'react';
import './Backdrop.css';
/**
* @author
* @function BackDrop
**/

const BackDrop = (props) => {
  return(
    <div onClick={props.closeDrawer} className="backdrop">
        
    </div>
   )

 }

export default BackDrop;