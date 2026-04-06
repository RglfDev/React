import { Route, Routes } from "react-router-dom"
import NavBar from "./components/Navbar"
import Home from "./pages/Home"
import ProductList from "./pages/products/ProductList"
import ProductsForm from "./pages/products/ProductsForm"
import SupplierList from "./pages/suppliers/SupplierList"
import SuppliersForm from "./pages/suppliers/SuppliersForm"


function App() {  
  return (
    <>
      <NavBar/>
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/products" element={<ProductList/>}/>
          <Route path="/products/new" element={<ProductsForm/>}/>
          <Route path="/products/:id/edit" element={<ProductsForm/>}/>
          <Route path="/suppliers/" element={<SupplierList/>}/>
          <Route path="/suppliers/new" element={<SuppliersForm/>}/>
          <Route path="/suppliers/:id/edit" element={<SuppliersForm/>}/>
        </Routes>

      </div>
    </>
  )
}

export default App