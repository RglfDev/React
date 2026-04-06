import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { StudentProvider } from './context/StudentContext.tsx'
import { CourseProvider } from './context/CourseContext.tsx'
import 'bootstrap-icons/font/bootstrap-icons.css';

//Renderizamos la aplicación, envolviendo el App con los proveedores de contexto necesarios y el BrowserRouter para manejar las rutas.
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <CourseProvider>
        <StudentProvider>
          <App />
        </StudentProvider>
      </CourseProvider>
    </BrowserRouter>
  </StrictMode>,
)
