import react, { useState } from 'react'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'

function App() {
  const [showLogin, setShowLogin] = useState(true);
  const [home, setHome] = useState(false);

  const handleCambio = () => {
    setShowLogin(!showLogin);
    // setHome(!home);
  };

  // if(home){
  //   return <Home />;
  // }
  const handleAuthSuccess = () => {
    setHome(true);
  };

  if (home) {
    return <Home />;
  }

  return (
    <>
      {/* {showLogin ? (
        <Login onToggle={handleCambio} onLogin={handleAuthSuccess}/>
      ) : (
        <Register onToggle={handleCambio} onRegister={handleAuthSuccess}/>
      )} */}

      <Home />
    </>
  )
}

export default App
