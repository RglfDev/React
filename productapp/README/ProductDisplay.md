# ProductDisplay

- Archivo: [src/Product/ProductDisplay.tsx](src/Product/ProductDisplay.tsx#L1-L85)
- Define el componente `ProductDisplay` que orquesta la visualización y edición de productos.
- Componente contenedor que gestiona los estados de visualización (tabla o editor) y coordina las acciones entre componentes hijos.

```tsx
type ProductDisplayProps = {
    name: "Products";
    products: Product[];
    saveCallback: (product: Product) => void;
    deleteCallback: (product: Product) => void;
}

export const ProductDisplay: React.FC<ProductDisplayProps> = ({
    name, products, saveCallback, deleteCallback
}) => {
    // ...
}
```

## Propiedades

- **`name: "Products"`**: Nombre del conjunto de productos (literal type).
- **`products: Product[]`**: Colección de productos a mostrar en la tabla.
- **`saveCallback`**: Callback para guardar un producto (nuevo o editado) que se propaga desde el componente padre.
- **`deleteCallback`**: Callback para eliminar un producto que se propaga desde el componente padre.

## Estados

### showEditor

- Controla la visibilidad del formulario de edición/creación.
- `true`: Muestra el `ProductEditor`.
- `false`: Muestra el `ProductTable`.

```tsx
const [showEditor, setShowEditor] = useState(false);
```

### selectedProduct

- Almacena el producto que se está editando o creando.
- `null`: No hay producto seleccionado, se muestra la tabla.
- `Product`: Contiene el producto a editar o un producto vacío para crear uno nuevo.

```tsx
const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
```

## Métodos

### startEditing

- Inicia el modo de edición para un producto existente.
- Recibe el producto a editar y actualiza los estados.

```tsx
const startEditing = (product: Product) => {
    setShowEditor(true);
    setSelectedProduct(product);
}
```

### saveProduct

- Guarda el producto (nuevo o editado).
- Invoca el `saveCallback` del padre con el producto.
- Resetea los estados para volver a la vista de tabla.

```tsx
const saveProduct = (product: Product) => {
    saveCallback(product);
    setShowEditor(false);
    setSelectedProduct(null);
}
```

### cancelEditing

- Cancela la operación de edición o creación.
- Resetea los estados sin guardar cambios.

```tsx
const cancelEditing = () => {
    setShowEditor(false);
    setSelectedProduct(null);
}
```

### createProduct

- Inicia el modo de creación de un nuevo producto.
- Crea un producto vacío con valores por defecto (id: 0).

```tsx
const createProduct = () => {
    setShowEditor(true);
    setSelectedProduct({
        id: 0,
        name: '',
        category: '',
        price: 0
    })
}
```

## Renderizado condicional

El componente usa renderizado condicional para mostrar el editor o la tabla según el estado:

### Modo Editor

Si `showEditor` es `true` y hay un `selectedProduct`:

```tsx
if (showEditor && selectedProduct) {
    return (
        <ProductEditor 
            key={selectedProduct.id || -1}
            product={selectedProduct}
            saveCallBack={saveProduct}
            cancelCallBack={cancelEditing}
        />
    );
}
```

- **`key`**: Usa el ID del producto (o -1 si es nuevo) para forzar el re-renderizado al cambiar de producto.
- Pasa el producto seleccionado y los callbacks de guardar/cancelar.

### Modo Tabla

Si no se cumple la condición anterior, muestra la tabla con el botón "New":

```tsx
return (
    <div className="m-2">
        <ProductTable
            products={products}
            editCallBack={startEditing}
            deleteCallBack={deleteCallback}
        />
        <div className="text-center">
            <button className="btn btn-primary m-1"
                onClick={createProduct}>
                New
            </button>
        </div>
    </div>
)
```

- Renderiza `ProductTable` con todos los productos y callbacks para editar/eliminar.
- Botón "New" que ejecuta `createProduct` para iniciar la creación de un nuevo producto.

## Flujo de uso

### Crear un producto:
1. Usuario hace clic en botón "New"
2. Se ejecuta `createProduct` → activa editor con producto vacío
3. Usuario completa el formulario y hace clic en "Save"
4. Se ejecuta `saveProduct` → llama al `saveCallback` del padre
5. Vuelve a la vista de tabla

### Editar un producto:
1. Usuario hace clic en botón "Edit" de una fila de la tabla
2. Se ejecuta `startEditing` → activa editor con el producto seleccionado
3. Usuario modifica el formulario y hace clic en "Save"
4. Se ejecuta `saveProduct` → llama al `saveCallback` del padre
5. Vuelve a la vista de tabla

### Cancelar:
- En cualquier momento, el usuario puede hacer clic en "Cancel"
- Se ejecuta `cancelEditing` → vuelve a la vista de tabla sin guardar
