import { useState } from "react";
import type { Supplier } from "../types/Supplier";

type SupplierEditorProps = {
    supplier: Partial<Supplier>;
    saveCallBack: (supplier: Supplier) => void;
    cancelCallBack: () => void;
}

export const SupplierEditor: React.FC<SupplierEditorProps> = ({
    supplier, saveCallBack, cancelCallBack }) => {

        const[formData, setFormData] = useState<Supplier>({
                id: supplier.id ?? 0,
                name: supplier.name ?? '',
                city: supplier.city ?? '',
                products: supplier.products ?? []
            });
        

        const handleChange=(ev:React.ChangeEvent<HTMLInputElement>)=>{
        const {name, value} = ev.target;
        setFormData(prev=>({
            ...prev,[name]:
            name === "products" ? value.split(',').map(item => item.trim()) : value
        }))
    };

        const handleClick = () => {
        saveCallBack(formData);
    }
    
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
                <label>City</label>
                <input type="text" className="form-control"
                name="city"
                value={formData.city}
                onChange={handleChange}/>
            </div>
            <div className="form-group">
                <label>Products</label>
                <input type="text" className="form-control"
                name="products"
                value={formData.products}
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