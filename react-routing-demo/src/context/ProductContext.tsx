import React, { useState } from "react";
import type { Product } from "../types/Product";
import {products as initialProducts} from "../data/products";

type ProductContextType = {
    products : Product[];
    addProduct: (p: Product) => void;
    updateProduct: (p: Product) => void;
    deleteProduct: (id: number) => void;
}

export const ProductContext = React.createContext<ProductContextType>(
    {} as ProductContextType
)

export const ProductProvider = ({children} : {children: React.ReactNode}) => {
    const [products, setProducts] = useState<Product[]>(initialProducts);

    const addProduct = (product: Product) => {
        setProducts(prev => [...prev, {...product, id: Date.now()}]);
    }

    const updateProduct = (product: Product) => {
        setProducts(prev => prev.map(p => p.id === product.id ? product : p));
    }

    const deleteProduct = (id: number) => {
        setProducts(prev => prev.filter(p => p.id !== id));
    }

    return (
        <ProductContext.Provider value={{products, addProduct, updateProduct, deleteProduct}}>
            {children}
        </ProductContext.Provider>
    );

}