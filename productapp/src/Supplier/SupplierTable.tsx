import type { Supplier } from "../types/Supplier";
import { SupplierTableRow } from "./SupplierTableRow";

type SupplierTableProps = {
    suppliers: Supplier[];
    editCallBack: (supplier: Supplier) => void;
    deleteCallBack: (supplier: Supplier) => void;
}

export const SupplierTable: React.FC<SupplierTableProps> = ({
    suppliers, editCallBack, deleteCallBack }) => {

        return(
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th colSpan={5}
                            className="bg-primary text-white text-center h4 p-2">Suppliers</th>
                        </tr>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>City</th>
                            <th className="text-right">Price</th>
                            <th></th>
                            </tr>
                    </thead>
                    <tbody>
                        {suppliers.map((s) => (
                            <SupplierTableRow key={s.id}
                                supplier={s}
                                editCallBack={editCallBack}
                                deleteCallBack={deleteCallBack} />
                        ))}
                    </tbody>
                </table>
            )

    }