import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import {ProductProvider } from './context/ProductContext.tsx'
import { SupplierProvider } from './context/SupplierContext.tsx'
import 'bootstrap/dist/css/bootstrap.min.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ProductProvider>
        <SupplierProvider>
        <App />
        </SupplierProvider>
      </ProductProvider>
    </BrowserRouter>
  </StrictMode>,
)
