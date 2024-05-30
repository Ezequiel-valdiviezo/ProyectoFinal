import react, { useState } from 'react'
import Login from './pages/Login'
import Register from './pages/Register'

function App() {
  const [showLogin, setShowLogin] = useState(true);

  const handleToggle = () => {
    setShowLogin(!showLogin);
  };

  return (
    <>
      {showLogin ? (
        <Login onToggle={handleToggle} />
      ) : (
        <Register onToggle={handleToggle} />
      )}
    </>
  )
}

export default App
