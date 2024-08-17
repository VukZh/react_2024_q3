import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import FormWithReactHookForm from './components/formRHF/formWithReactHookForm.tsx';
import FormWithUncontrolledComponents from './components/formU/formWithUncontrolledComponents.tsx';
import NotFound from './components/notFound/notFound.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/uncontrolled',
    element: <FormWithUncontrolledComponents />,
  },
  {
    path: '/rhf',
    element: <FormWithReactHookForm />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
