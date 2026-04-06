import type { Supplier } from "../types/Supplier";

export type SupplierTableRowProps = {
    supplier: Supplier;
    editCallBack: (supplier: Supplier) => void;
    deleteCallBack: (supplier: Supplier) => void;
}

export const SupplierTableRow: React.FC<SupplierTableRowProps> = ({
    supplier, editCallBack, deleteCallBack }) => {
        return (
            <tr key={supplier.id}>
                <td>{supplier.id}</td>
                <td>{supplier.name}</td>
                <td>{supplier.city}</td>
                <td className="text-right">{supplier.products.join(", ")}</td>
                <td>
                    <button className="btn btn-sm btn-primary mr-2"
                        onClick={() => editCallBack(supplier)}>
                        Edit
                    </button>
                    <button className="btn btn-sm btn-danger"
                        onClick={() => deleteCallBack(supplier)}>
                        Delete
                    </button>
                </td>
            </tr>
        )
    }