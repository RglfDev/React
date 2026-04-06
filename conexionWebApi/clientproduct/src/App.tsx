import ProductosTable from "./components/ProductosTable"

function App() {
    return (
        <div className="container mt-4">
            <h1 className="text-primary">  React+webAPI</h1>
            <h2 className="text-secondary">Product Manager</h2>
            <br/>
            <ProductosTable/>
        </div>
    )
}

export default App