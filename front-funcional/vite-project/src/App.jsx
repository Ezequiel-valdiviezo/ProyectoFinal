import react, { useState } from 'react'
import Login from './pages/Login'
import Register from './pages/Register'

function App() {
  const [showLogin, setShowLogin] = useState(true);

  const handleCambio = () => {
    setShowLogin(!showLogin);
  };

  return (
    <>
      {showLogin ? (
        <Login onToggle={handleCambio} />
      ) : (
        <Register onToggle={handleCambio} />
      )}
    </>
  )
}

export default App
