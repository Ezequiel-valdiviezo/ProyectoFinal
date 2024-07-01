// import React, { useState } from 'react'
// import Login from './pages/Login'
// import Register from './pages/Register'
// import Index from './pages/Index'
// import Dashboard from './pages/Dashboard'
// import Perfil from './pages/Perfil'
// import Foro from './pages/Foro'
// import Cursos from './pages/Cursos'
// import { createBrowserRouter, RouterProvider, Navigate  } from 'react-router-dom'

// function PrivateRoute({ element, isAuthenticated }) {
//   return isAuthenticated ? element : <Navigate to="/login" />;
// }

// function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   const handleAuthSuccess = () => {
//     setIsAuthenticated(true);
//   };

//   const route = createBrowserRouter([
//     {
//       path: '/',
//       element: <Login onLogin={handleAuthSuccess}/>
//      },
//     {
//       path: '/login',
//       element: <Login onLogin={handleAuthSuccess}/>
//      },
//     {
//       path: '/register',
//       element: <Register />
//      },
//      {
//        path: '/',
//        element: <PrivateRoute element={<Index />} isAuthenticated={isAuthenticated} />,
//        children:[
//          {
//            path: '/home',
//            element: <Dashboard />
//          },
//          {
//            path: '/perfil',
//            element: <Perfil />
//          },
//          {
//            path: '/foro',
//            element: <Foro />
//          },
//          {
//            path: '/cursos',
//            element: <Cursos />
//          },
//        ]
//      }
//    ])

//   return (
//     <>
//       <RouterProvider router={route} />
//     </>
//   )
// }

// export default App


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
import './App.css';

function PrivateRoute({ element, isAuthenticated }) {
  return isAuthenticated ? element : <Navigate to="/login" />;
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
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
           path: '/medicos',
           element: <Medicos />
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
      <RouterProvider router={route} />
    </>
  )
}

export default App
