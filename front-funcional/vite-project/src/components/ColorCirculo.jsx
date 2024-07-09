import React from 'react';

const ColorCirculo = ({ color, onClick }) => {
  const circleStyle = {
    backgroundColor: color,
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    display: 'inline-block',
    cursor: 'pointer',
    margin: '5px'
  };

  return <div style={circleStyle} onClick={() => onClick(color)} />;
};

export default ColorCirculo;
