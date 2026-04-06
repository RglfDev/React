
 - Archivo: [src/Product/ProductTable.tsx](src/Product/ProductTable.tsx#L1-L45)
 - Define el componente `ProductTable` que recibe `products`, `editCallBack` y `deleteCallBack`.

```tsx
type ProductTableProps = {
	products: Product[];
	editCallBack: (product: Product) => void;
	deleteCallBack: (product: Product) => void;
}

export const ProductTable: React.FC<ProductTableProps> = ({
	products, editCallBack, deleteCallBack }) => {
	return (
		<table className="table table-striped">
			{/* ... */}
		</table>
	)
}
```

- La tabla incluye cabecera “Products” y columnas ID, Name, Category, Price y acciones (última columna vacía para botones de fila).

```tsx
<thead>
	<tr>
		<th colSpan={5} className="bg-primary text-white text-center h4 p-2">
			Products
		</th>
	</tr>
	<tr>
		<th>ID</th>
		<th>Name</th>
		<th>Category</th>
		<th className="text-right">Price</th>
		<th></th>
	Archivo: [src/Product/ProductTable.tsx](src/Product/ProductTable.tsx#L1-L45)

	- Propiedades que recibe el componente. como productos recibe una colección de estos mismos

	```tsx
	type ProductTableProps = {
	  products: Product[];
	  editCallBack: (product: Product) => void;
	  deleteCallBack: (product: Product) => void;
	}
	```

	- Declaración del componente y contenedor tabla con estilo Bootstrap.

	```tsx
	export const ProductTable: React.FC<ProductTableProps> = ({
	  products, editCallBack, deleteCallBack }) => {
	  return (
	    <table className="table table-striped">
	      {/* ... */}
	    </table>
	  )
	}
	```

	- Cabecera con título y columnas (la última se deja vacía para botones de acción).

	```tsx
	<thead>
	  <tr>
	    <th colSpan={5} className="bg-primary text-white text-center h4 p-2">
	      Products
	    </th>
	  </tr>
	  <tr>
	    <th>ID</th>
	    <th>Name</th>
	    <th>Category</th>
	    <th className="text-right">Price</th>
	    <th></th>
	  </tr>
	</thead>
	```

	- Renderizado de filas: se recorre `products` (contiene una coleccion de Products[]) y se delega cada fila a `ProductTableRow`, pasando también los callbacks para editar/eliminar.

	```tsx
	<tbody>
	  {products.map((p) => (
	    <ProductTableRow
	      key={p.id}
	      product={p}
	      editCallBack={editCallBack}
	      deleteCallBack={deleteCallBack}
	    />
	  ))}
	</tbody>
	```
