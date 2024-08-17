import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import FormWithReactHookForm from "./components/formWithReactHookForm.tsx";
import FormWithUncontrolledComponents from "./components/formWithUncontrolledComponents.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/uncontrolled",
    element: <FormWithReactHookForm />,
  },
  {
    path: "/rhf",
    element: <FormWithUncontrolledComponents />,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
