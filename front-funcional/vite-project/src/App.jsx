import React, { useState, useEffect } from 'react'
import Login from './pages/Login'
import Register from './pages/Register'
import Index from './pages/Index'
import Dashboard from './pages/Dashboard'
import Perfil from './pages/Perfil'
import Foro from './pages/Foro'
import Cursos from './pages/Cursos'
import { createBrowserRouter, RouterProvider, Navigate  } from 'react-router-dom'
import Recuerdos from './pages/Recuerdos'
import Anotador from './pages/Anotador'
import Medicos from './pages/Medicos'
import Admin from './pages/admin/Admin'
import AdminMedicos from './pages/admin/Medicos'
import AdminCursos from './pages/admin/Cursos'
import './App.css';
import Consultas from './pages/admin/Consultas'
import Usuarios from './pages/admin/Usuarios'
import RegistrosMedicos from './pages/RegistrosMedicos'
import ManejoCursos from './pages/admin/ManejoCursos'
import { ColorProvider } from './context/colorContext';
import Blog from './pages/admin/Blog'
import ManejoMedicos from './pages/admin/ManejoMedicos'
import MisPublicaciones from './pages/MisPublicaciones'

function PrivateRoute({ element, isAuthenticated }) {
  return isAuthenticated ? element : <Navigate to="/login" />;
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  
  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
  };

  // Importar las fuentes desde Google Fonts
  const link = document.createElement('link');
  link.href = 'https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@500;600;700&display=swap';
  link.rel = 'stylesheet';
  document.head.appendChild(link);

  const route = createBrowserRouter([
    // {
    //   path: '/',
    //   element: <Login onLogin={handleAuthSuccess}/>
    //  },
    {
      path: '/login',
      element: <Login onLogin={handleAuthSuccess}/>
     },
    {
      path: '/register',
      element: <Register onRegister={handleAuthSuccess}/>
     },
     {
       path: '/',
       element: <PrivateRoute element={<Index />} isAuthenticated={isAuthenticated} />,
       children:[
         {
           path: '/home',
           element: <Dashboard />
         },
         {
           path: '/perfil',
           element: <Perfil />
         },
         {
           path: '/foro',
           element: <Foro />
         },
         {
           path: '/cursos',
           element: <Cursos />
         },
         {
           path: '/albumRecuerdos',
           element: <Recuerdos />
         },
         {
           path: '/anotador',
           element: <Anotador />
         },
         {
           path: '/registrosMedicos',
           element: <RegistrosMedicos />
         },
         {
           path: '/medicos',
           element: <Medicos />
         },
         {
           path: '/foro/misPublicaciones',
           element: <MisPublicaciones />
         },
         {
           path: '/admin/panelAdmin',
           element: <Admin />
         },
         {
           path: '/admin/medicos',
           element: <AdminMedicos />
         },
         {
           path: '/admin/medicos/manejos',
           element: <ManejoMedicos />
         },
         {
           path: '/admin/cursos',
           element: <AdminCursos />
         },
         {
           path: '/admin/cursos/manejos',
           element: <ManejoCursos />
         },
         {
           path: '/admin/consultas',
           element: <Consultas />
         },
         {
           path: '/admin/blog',
           element: <Blog />
         },
         {
           path: '/admin/usuarios',
           element: <Usuarios />
         },
         {
          path: '*', // Coincide con cualquier URL no definida anteriormente
          element: <Navigate to="/login" replace /> // Redirige al inicio de sesión
        }
       ]
     }
   ])

  return (
    <>
    <ColorProvider>
      <RouterProvider router={route} />
    </ColorProvider>
    </>
  )
}

export default App
