import { useState } from "react";
import type { Product } from "../types/Product";

/*Archivo para editar productos:
- Partial convierte todas las propiedades de Product en opcionales.
    Dependiendo de si vamos a rear o editar, recibira unas propiedades o todas de producto
- Necesita un callback para guardar el producto (ya sea nuevo o editado)
- Necesita un callback para cancelar la operacion de edicion/creacion
     */
type ProductEditorProps = {
    product:Partial<Product>;
    saveCallBack:(product:Product)=>void;
    cancelCallBack:()=>void;
}

export const ProductEditor:React.FC<ProductEditorProps>=({
    product, saveCallBack, cancelCallBack})=>{
    /*Hook para manejar el estado del formulario de un producto*/
    const[formData, setFormData] = useState<Product>({
        id: product.id ?? 0,
        name: product.name ?? '',
        category: product.category ?? '',
        price: product.price ?? 0
    });

    /*Manejador de cambios en los campos del formulario*/
    const handleChange=(ev:React.ChangeEvent<HTMLInputElement>)=>{
        const {name, value} = ev.target;
        /*A traves del la funcion del Hook, actualizamos el nuevo valor, manteniendo
        los campos anteriores(...prev), y actualizando SOLO el que se haya tocado, el cual
        identificamos a traves del [name] y le metemos el valor (:value) */
        setFormData(prev=>({
            ...prev,[name]:value
        })
    );
    };

    const handleClick = () => {
        saveCallBack(formData);
    }
    /*Renderizado de formulario para editar o crear un producto:
    Posee un formulario con los 4 campos necesarios para crear o editar el producto, y dos
    botones: Guardar y Cancelar.
    IMPORTANTE: El campo ID esta deshabilitado, ya que no se puede editar el ID de un producto, por lo que
    no necesita llamar al callback OnChange ya que no lo usa
    */
    return(
        <div className="card p-3">
            <div className="form-group">
                <label>ID</label>
                <input type="number" className="form-control"
                name="id"
                value={formData.id} disabled/>
            </div>
            <div className="form-group">
                <label>Name</label>
                <input type="text" className="form-control"
                name="name"
                value={formData.name}
                onChange={handleChange}/>
            </div>
            <div className="form-group">
                <label>Category</label>
                <input type="text" className="form-control"
                name="category"
                value={formData.category}
                onChange={handleChange}/>
            </div>
            <div className="form-group">
                <label>Price</label>
                <input type="number" className="form-control"
                name="price"
                value={formData.price}
                onChange={handleChange}/>
            </div>
            <div className="mt-3 text-center">
                <button className="btn btn-primary mr-2"
                onClick={handleClick}>Save</button>
                <button className="btn btn-secondary"
                onClick={cancelCallBack}>Cancel</button>
            </div>
        </div>
    )

}
