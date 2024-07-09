import React, {useState} from "react";
import Header from "../components/Header";
import { Outlet } from 'react-router-dom';
import ColorCirculo from '../components/ColorCirculo'


function Index(){

    const [color, setColor] = useState('#4aa3db');
    const colors = ['#4aa3db', '#c767ca', '#b0c620', '#2b961d'];
    
    const handleColorChange = (selectedColor) => {
      setColor(selectedColor);
    };
    
    const bodyStyle = {
      backgroundColor: color,
      transition: 'background-color 0.5s'
    };
  
    return(
        <>
        <div style={bodyStyle}>
        <div className="text-end">
            {colors.map((color) => (
            <ColorCirculo key={color} color={color} onClick={handleColorChange} />
            ))}
        </div>
        <Header />
        </div>
        <Outlet />
        </>
    )
}

export default Index;