import type { Product } from "../types/Product";

/* Tipo para las props de producto: necesita dos callbacks y un product*/
type ProductTableRowProps = {
    product: Product;
    editCallBack: (product: Product) => void;
    deleteCallBack: (product: Product) => void;
}

/* Componente que representa una fila en la tabla de productos. Necesita recibir sus Props*/
export const ProductTableRow : React.FC<ProductTableRowProps> = ({
     product, editCallBack, deleteCallBack }) => {
        /*Retornamos la fila para renderizarla
        Cada fila tiene los datos del producto y dos botones para editar y eliminar, los cuales
        llaman a los callbacks pasados en las props con el producto actual como argumento.
        */
        return (
            <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td className="text-right">${Number(product.price).toFixed(2)}</td>
                <td>
                    <button className="btn btn-sm btn-primary mr-2"
                        onClick={() => editCallBack(product)}>
                        Edit
                    </button>
                    <button className="btn btn-sm btn-danger"
                        onClick={() => deleteCallBack(product)}>
                        Delete
                    </button>
                </td>
            </tr>
        )
     }