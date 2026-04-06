import {suppliers as initialSuppliers} from '../data/suppliers';
import React, { useState } from 'react';
import type { Supplier } from '../types/Supplier';

type SupplierContextType = {
    suppliers: Supplier[];
    addSupplier: (s: Supplier) => void;
    updateSupplier: (s: Supplier) => void;
    deleteSupplier: (id: number) => void;
}

export const SupplierContext = React.createContext<SupplierContextType>(
    {} as SupplierContextType
);

export const SupplierProvider = ({children} : {children: React.ReactNode}) => {

    const [suppliers, setSuppliers] = useState<Supplier[]>(initialSuppliers);

    const addSupplier = (supplier: Supplier) =>{
        setSuppliers(prev=> [...prev,{...supplier, id:Date.now()}]);
    }

    const updateSupplier = (supplier: Supplier) =>{
        setSuppliers(prev => prev.map(s=>s.id === supplier.id ? supplier : s));
    }
    const deleteSupplier = (id : number) =>{
        setSuppliers(prev => prev.filter(s=> s.id !== id));
    }

    return (
        <SupplierContext.Provider value={{suppliers, addSupplier, updateSupplier, deleteSupplier}}>
            {children}
        </SupplierContext.Provider>
    );
}