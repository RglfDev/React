# ProductsAndSuppliers

- Archivo: [src/ProductsAndSuppliers.tsx](src/ProductsAndSuppliers.tsx#L1-L67)
- Componente raíz que gestiona el estado global de productos y proveedores (suppliers).
- Actúa como contenedor principal que orquesta la comunicación entre `ProductDisplay`, `SupplierDisplay` y el componente `Selector`.
- No recibe props y es el punto de entrada para toda la lógica de gestión de datos.

```tsx
export const ProductsAndSuppliers: React.FC = () => {
    // ...
}
```

## Importaciones

```tsx
import { use, useRef, useState } from "react";
import type { Product } from "./types/Product";
import type { Supplier } from "./types/Supplier";
import { ProductDisplay } from "./Product/ProductDisplay";
import { Selector } from "./Selector";
import { SupplierDisplay } from "./Supplier/SupplierDisplay";
```

- **`useState`, `useRef`**: Hooks de React para manejar estado y referencias mutables.
- **Types**: Importa las interfaces de `Product` y `Supplier`.
- **Componentes**: Importa `ProductDisplay`, `SupplierDisplay` y `Selector`.

## Estados

### products

- Almacena la colección de productos.
- Se inicializa con tres productos de ejemplo (Kayak, Lifejacket, Soccer Ball).
- Cada producto tiene `id`, `name`, `category` y `price`.

```tsx
const [products, setProducts] = useState<Product[]>([
    { id: 1, name: "Kayak", category: "Watersports", price: 275 },
    { id: 2, name: "Lifejacket", category: "Watersports", price: 48.95 },
    { id: 3, name: "Soccer Ball", category: "Soccer", price: 19.5 },
]);
```

### suppliers

- Almacena la colección de proveedores.
- Se inicializa con dos proveedores de ejemplo (Surf Dudes, Field Supplies).
- Cada proveedor tiene `id`, `name`, `city` y `products` (array de nombres de productos).

```tsx
const [suppliers, setSuppliers] = useState<Supplier[]>([
    { id: 1, name: "Surf Dudes", city: "San Jose", products: ["Kayak","Lifejacket"] },
    { id: 2, name: "Field Supplies", city: "New York", products: ["Soccer Ball"] },
]);
```

## Referencia - idCounter

- **`useRef`**: Mantiene un contador mutable que no causa re-renderizado.
- Se inicializa en `100` para que los nuevos elementos creados tengan IDs a partir de 100, evitando conflictos con los IDs iniciales (1, 2, 3).
- Se incrementa cada vez que se crea un nuevo producto o proveedor.

```tsx
const idCounter = useRef(100);
```

**Ventaja**: Los IDs nuevos no interfieren con los IDs existentes y son únicos.

## Métodos de gestión de datos

### saveData

- Método genérico que guarda un producto o proveedor (nuevo o editado).
- Recibe dos parámetros:
  - **`collection`**: Tipo de colección ("products" o "suppliers")
  - **`item`**: El producto o proveedor a guardar

```tsx
const saveData = (collection: "products" | "suppliers", item: Product | Supplier) => {
    if (item.id === 0) {
        // CREAR: Si el item tiene id === 0, es un nuevo elemento
        item.id = idCounter.current++;
        if (collection === "products") setProducts(prev => [...prev, item as Product]);
        else setSuppliers(prev=> [...prev, item as Supplier]);
    } else {
        // EDITAR: Si el item tiene un id > 0, es una edición
        if (collection === "products") {
            setProducts(prev=> prev.map(stored => stored.id === item.id ? item as Product : stored));
        } else {
            setSuppliers(prev=> prev.map(stored => stored.id === item.id ? item as Supplier : stored));
        }
    }
};
```

#### Flujo detallado:

1. **Crear nuevo** (`item.id === 0`):
   - Asigna un nuevo ID único del contador (`idCounter.current++`)
   - Añade el elemento a la colección usando spread operator (`[...prev, item]`)

2. **Editar existente** (`item.id > 0`):
   - Mapea la colección actual
   - Reemplaza el elemento con ID coincidente
   - Mantiene los otros elementos sin cambios

### deleteData

- Método genérico que elimina un producto o proveedor.
- Filtra la colección para remover el elemento con el ID coincidente.

```tsx
const deleteData = (collection: "products" | "suppliers", item: Product | Supplier) => {
    if (collection === "products") {
        setProducts(prev=> prev.filter(stored => stored.id !== item.id));
    } else {
        setSuppliers(prev=> prev.filter(stored => stored.id !== item.id));
    }
};
```

#### Flujo:
- Usa `filter()` para crear una nueva colección excluyendo el elemento con el ID coincidente
- La comparación `stored.id !== item.id` mantiene todos los elementos EXCEPTO el eliminado

## Renderizado

```tsx
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
```

### Estructura

- **`Selector`**: Componente contenedor que permite alternar entre vistas de Productos y Proveedores mediante botones.
- **`ProductDisplay`**: Componente que gestiona la visualización y edición de productos.
- **`SupplierDisplay`**: Componente que gestiona la visualización y edición de proveedores.

### Props específicas

#### ProductDisplay

```tsx
<ProductDisplay
    name="Products"                                    // Nombre mostrado en el Selector
    products={products}                               // Colección actual de productos
    saveCallback={p=>saveData("products", p)}         // Callback para guardar producto
    deleteCallback={p=>deleteData("products", p)}     // Callback para eliminar producto
/>
```

#### SupplierDisplay

```tsx
<SupplierDisplay
    name="Suppliers"                                  // Nombre mostrado en el Selector
    suppliers={suppliers}                             // Colección actual de proveedores
    saveCallback={s=>saveData("suppliers", s)}        // Callback para guardar proveedor
    deleteCallback={s=>deleteData("suppliers", s)}    // Callback para eliminar proveedor
/>
```

## Flujo de datos completo

### Crear un nuevo producto:

1. Usuario hace clic en "New" en `ProductDisplay`
2. `ProductDisplay` activa el editor con un producto vacío (id: 0)
3. Usuario completa el formulario y hace clic en "Save"
4. Se invoca `saveCallback` → `saveData("products", producto)`
5. `saveData` detecta `id === 0`, asigna nuevo ID (100, 101, ...)
6. Actualiza `products` con el nuevo elemento
7. `ProductDisplay` se re-renderiza con la colección actualizada

### Editar un producto existente:

1. Usuario hace clic en "Edit" en `ProductDisplay`
2. `ProductDisplay` activa el editor con el producto seleccionado
3. Usuario modifica los datos y hace clic en "Save"
4. Se invoca `saveCallback` → `saveData("products", producto_modificado)`
5. `saveData` detecta `id > 0`, mapea la colección y reemplaza el elemento
6. Actualiza `products` con el cambio
7. `ProductDisplay` se re-renderiza con la colección actualizada

### Eliminar un producto:

1. Usuario hace clic en "Delete" en `ProductDisplay`
2. Se invoca `deleteCallback` → `deleteData("products", producto)`
3. `deleteData` filtra la colección removiendo el elemento con el ID coincidente
4. Actualiza `products`
5. `ProductDisplay` se re-renderiza sin el elemento eliminado

El mismo flujo se aplica para Suppliers, pero usando `SupplierDisplay` en lugar de `ProductDisplay`.

## Ventajas de la arquitectura

- **Separación de responsabilidades**: `ProductsAndSuppliers` gestiona datos, `ProductDisplay`/`SupplierDisplay` gestiona UI
- **Reutilización de código**: `saveData` y `deleteData` son genéricas para ambas colecciones
- **IDs únicos**: `useRef` evita conflictos de IDs entre elementos nuevos y existentes
- **Escalabilidad**: Fácil agregar más colecciones (ej: Orders, Customers) sin cambiar la lógica general
