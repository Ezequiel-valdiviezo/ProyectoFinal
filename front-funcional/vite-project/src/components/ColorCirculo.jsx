import React from 'react';

const ColorCirculo = ({ color, onClick }) => {
  const circleStyle = {
    backgroundColor: color,
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    display: 'inline-block',
    cursor: 'pointer',
    border: 'solid 2px white'
    // margin: '5px',
  };

  return <div className='mx-1' style={circleStyle} onClick={() => onClick(color)} />;
};

export default ColorCirculo;
