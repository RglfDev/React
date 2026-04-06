/*Este archivo pinta la tabla completa, implementando los ProductTableRows */

import type { Product } from "../types/Product";
import { ProductTableRow } from "./ProductTableRow";

/*Tipo para las props de la tabla de productos
- necesita la lista de productos y dos callbacks para editar y eliminar un producto.
No va utilizar los callbacks, simplemente los posee para pasarselos a APP y que este las utilice
*/
type ProductTableProps = {
    products: Product[];
    editCallBack: (product: Product) => void;
    deleteCallBack: (product: Product) => void;
}
/* Componente que representa la tabla completa de productos */
export const ProductTable: React.FC<ProductTableProps> = ({
    products, editCallBack, deleteCallBack }) => {
   
        return(
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th colSpan={5}
                        className="bg-primary text-white text-center h4 p-2">Products</th>
                    </tr>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th className="text-right">Price</th>
                        <th></th>
                        </tr>
                </thead>
                <tbody>
                    {products.map((p) => (
                        <ProductTableRow key={p.id}
                            product={p}
                            editCallBack={editCallBack}
                            deleteCallBack={deleteCallBack} />
                    ))}
                </tbody>
            </table>
        )
    }
