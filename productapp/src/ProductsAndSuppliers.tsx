import { use, useRef, useState } from "react";
import type { Product } from "./types/Product";
import type { Supplier } from "./types/Supplier";
import { ProductDisplay } from "./Product/ProductDisplay";
import { Selector } from "./Selector";
import { SupplierDisplay } from "./Supplier/SupplierDisplay";


export const ProductsAndSuppliers: React.FC = () => {
    const[products, setProducts] = useState<Product[]>([
        { id: 1, name: "Kayak", category: "Watersports", price: 275 },
        { id: 2, name: "Lifejacket", category: "Watersports", price: 48.95 },
        { id: 3, name: "Soccer Ball", category: "Soccer", price: 19.5 },
    ]);

    const[suppliers, setSuppliers] = useState<Supplier[]>([
        { id: 1, name: "Surf Dudes", city: "San Jose", products: ["Kayak","Lifejacket"] },
        { id: 2, name: "Field Supplies", city: "New York", products: ["Soccer Ball"] },
    ]);

    /*useRef para mantener un contador de IDs único para nuevos productos y proveedores.
    Por lo que cuando se cree el primer nuevo producto o nuevo Supplier sera el id=100*/
    const idCounter = useRef(100);

    const saveData = (collection: "products" | "suppliers", item: Product | Supplier) => {
        if (item.id === 0) {
            item.id = idCounter.current++;
            if (collection === "products") setProducts(prev => [...prev, item as Product]);
            else setSuppliers(prev=> [...prev, item as Supplier]);
        } else {
            if (collection === "products") {
                setProducts(prev=> prev.map(stored => stored.id === item.id ? item as Product : stored));
            } else {
                setSuppliers(prev=> prev.map(stored => stored.id === item.id ? item as Supplier : stored));
            }
        }
    };
const deleteData = (collection: "products" | "suppliers", item: Product | Supplier) => {
        if (collection === "products") {
            setProducts(prev=> prev.filter(stored => stored.id !== item.id));
        } else {
            setSuppliers(prev=> prev.filter(stored => stored.id !== item.id));
        }
    };

    return(
        <div>
            <Selector>
                <ProductDisplay
                name="Products"
                products={products}
                saveCallback={p=>saveData("products", p)}
                deleteCallback={p=>deleteData("products", p)}
                />
                <SupplierDisplay
                name="Suppliers"
                suppliers={suppliers}
                saveCallback={s=>saveData("suppliers", s)}
                deleteCallback={s=>deleteData("suppliers", s)}
                />
            </Selector>
        </div>
    );

}

