import { useState } from "react";
import type { Product } from "../types/Product";
import { ProductEditor } from "./ProductEditor";
import { ProductTable } from "./ProductTable";

/* Componente que va a manejar a los hijos de editar y crear, por lo que necesita todas las props
que neceistan sus hijos, ademas de un name y una coleccion de productos para poder editar o crear y añadirlos */
type ProductDisplayProps = {
    name:"Products";
    products:Product[];
    saveCallback:(product:Product)=>void;
    deleteCallback:(product:Product)=>void;
}

export const ProductDisplay:React.FC<ProductDisplayProps>=({
    products, saveCallback, deleteCallback
})=>{
    /*Hook para manejar si se muestra u oculta el formulario de edicion*/
    const [showEditor, setShowEditor] = useState(false);

    /*Este hook se encarga de pintar o no la tabla, dependiendo de si el State
    contiene un producto o no. Si no contiene un producto, pintara la tabla,
    pero si tiene un producto, significará que se esta editando o creando un producto,
    por lo que podrá irse al modo edicion */
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

    /*Metodo que se encarga de poner un formulario y de meterle un producto o NADA.
    Si es null, significara que se va a crear un nuevo producto, si tiene un producto,
    se editara ese producto */
    const startEditing = (product:Product) => {
        setShowEditor(true);
        setSelectedProduct(product);
    }

    /*Metodo que se encarga de guardar el producto, ya sea nuevo o editado */
    const saveProduct = (product:Product) => {
        saveCallback(product);
        setShowEditor(false);
        setSelectedProduct(null);
    }

    /*Metodo que se encarga de cancelar la edicion o creacion de un producto */
    const cancelEditing = () => {
        setShowEditor(false);
        setSelectedProduct(null);
    }

    /*Metodo que se encarga de iniciar la creacion de un nuevo producto */
    const createProduct = () => {
        setShowEditor(true);
        setSelectedProduct({
            id: 0,
            name: '',
            category: '',
            price: 0
        })
    }

    /* Si showEditor es true y hay un producto seleccionado, mostramos el editor */
    if(showEditor && selectedProduct){
        return (
            <ProductEditor 
            key={selectedProduct.id || -1}
            product={selectedProduct}
            saveCallBack={saveProduct}
            cancelCallBack={cancelEditing}
            />
        );
    }
    /* Si cualquiera de las dos opciones anteriores no se cumple, se renderiza la tabla */
        return(
            <div className="m-2">
                <ProductTable
                products={products}
                editCallBack={startEditing}
                deleteCallBack={deleteCallback}
                />
                <div className="text-center">
                    <button className="btn btn-primary m-1"
                    onClick={createProduct}>
                        New
                    </button>
                </div>
            </div>
        )
}