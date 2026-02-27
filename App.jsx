import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Tailwind from 'tailwindcss/tailwind.css';
import { Lucide } from 'lucide-react';

// Role-based components
import Secretaria from './views/Secretaria';
import Protocolo from './views/Protocolo';
import Tecnico from './views/Tecnico';
import Prensa from './views/Prensa';

// Main app component
const App = () => {
  // Define routes
  const router = createBrowserRouter([
    {
      path: '/secretaria',
      element: <Secretaria />,
    },
    {
      path: '/protocolo',
      element: <Protocolo />,
    },
    {
      path: '/tecnico',
      element: <Tecnico />,
    },
    {
      path: '/prensa',
      element: <Prensa />,
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
