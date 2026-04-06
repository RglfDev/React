import { useState } from "react";
import type { Supplier } from "../types/Supplier";
import { SupplierEditor } from "./SupplierEditor";
import { SupplierTable } from "./SupplierTable";

type SupplierDisplayProps = {
    name:"Suppliers";
    suppliers:Supplier[];
    saveCallback:(supplier:Supplier)=>void;
    deleteCallback:(supplier:Supplier)=>void;
}

export const SupplierDisplay:React.FC<SupplierDisplayProps>=({name,
    suppliers, saveCallback, deleteCallback
})=>{{

    const [showEditor, setShowEditor] = useState(false);
    const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null)
    const startEditing = (supplier:Supplier) => {
        setShowEditor(true);
        setSelectedSupplier(supplier);
    }

    const saveSupplier = (supplier:Supplier) => {
        saveCallback(supplier);
        setShowEditor(false);
        setSelectedSupplier(null);
    }

    const cancelEditing = () => {
        setShowEditor(false);
        setSelectedSupplier(null);
    }

    const createSupplier = () => {
        setShowEditor(true);
        setSelectedSupplier({
            id: 0,
            name: '',
            city: '',
            products: []
        })
    }
    if(showEditor && selectedSupplier){
        return (
            <SupplierEditor
            key={selectedSupplier.id || -1}
            supplier={selectedSupplier}
            saveCallBack={saveSupplier}
            cancelCallBack={cancelEditing}
            />
        )
    }

    return(
                <div className="m-2">
                    <SupplierTable
                    suppliers={suppliers}
                    editCallBack={startEditing}
                    deleteCallBack={deleteCallback}
                    />
                    <div className="text-center">
                        <button className="btn btn-primary m-1"
                        onClick={createSupplier}>
                            New
                        </button>
                    </div>
                </div>
            );
        }
    }
