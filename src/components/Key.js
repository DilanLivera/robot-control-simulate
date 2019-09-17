import React from 'react';

function Key({ icon, onClick }) {
  return (
    <span className="Key">
      <i className={ icon } onClick={ onClick } ></i>
    </span>    
  );
}

export default Key;