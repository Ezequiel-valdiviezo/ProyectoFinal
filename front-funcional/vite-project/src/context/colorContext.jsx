// En ColorContext.jsx
import React, { createContext, useState, useContext } from 'react';

const ColorContext = createContext();

export const ColorProvider = ({ children }) => {
  const colors = ['#2E9BE0', '#D852CF', '#2b961d'];
  // const colors = ['#4aa3db', '#c767ca', '#b0c620', '#2b961d'];
  const [color, setColor] = useState(colors[0]); // Inicializamos con el primer color de la lista

  const handleColorChange = (selectedColor) => {
    setColor(selectedColor);
  };

  return (
    <ColorContext.Provider value={{ colors, color, handleColorChange }}>
      {children}
    </ColorContext.Provider>
  );
};

export const useColorContext = () => useContext(ColorContext);
