# ProductTableRow Component

## 📍 Ubicación
`src/Product/ProductTableRow.tsx`

## 🎯 Responsabilidad
Componente presentacional que renderiza una **fila individual** en la tabla de productos con datos del producto y botones de acción.

## 📝 Descripción
`ProductTableRow` es un componente funcional que representa una fila (`<tr>`) de la tabla HTML de productos. Es responsable de:
- Mostrar los datos de un producto en formato de fila de tabla
- Proporcionar botones para editar y eliminar el producto
- Invocar callbacks cuando el usuario interactúa con los botones

## 💼 Props

```typescript
type ProductTableRowProps = {
    product: Product;                              // Objeto del producto a mostrar
    editCallBack: (product: Product) => void;     // Callback al hacer click en Edit
    deleteCallBack: (product: Product) => void;   // Callback al hacer click en Delete
}
```

### Parámetros

| Prop | Tipo | Descripción |
|------|------|-------------|
| `product` | `Product` | Objeto con los datos del producto: id, name, category, price |
| `editCallBack` | `Function` | Función que se ejecuta al hacer click en el botón "Edit" |
| `deleteCallBack` | `Function` | Función que se ejecuta al hacer click en el botón "Delete" |

## 🔄 Flujo de Datos

```
ProductTable (padre)
    ↓
    ProductTableRow (hijo)
    ├─ Recibe: product, editCallBack, deleteCallBack
    ├─ Renderiza: fila HTML con datos
    └─ Usuario interactúa:
         ├─ Click Edit → editCallBack(product) → ProductDisplay.startEditing()
         └─ Click Delete → deleteCallback(product) → ProductDisplay → ProductsAndSuppliers.deleteData()
```

## 📊 Estructura del Componente

```tsx
export const ProductTableRow: React.FC<ProductTableRowProps> = ({
    product, 
    editCallBack, 
    deleteCallBack 
}) => {
    return (
        <tr key={product.id}>
            {/* Renderiza cada propiedad del producto en celdas */}
            <td>{product.id}</td>
            <td>{product.name}</td>
            <td>{product.category}</td>
            <td className="text-right">${Number(product.price).toFixed(2)}</td>
            
            {/* Botones de acción */}
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
```

## 🎨 Renderizado HTML

Para un producto como:
```json
{
    "id": 1,
    "name": "Kayak",
    "category": "Watersports",
    "price": 275
}
```

Se genera:
```html
<tr key="1">
    <td>1</td>
    <td>Kayak</td>
    <td>Watersports</td>
    <td class="text-right">$275.00</td>
    <td>
        <button class="btn btn-sm btn-primary mr-2">Edit</button>
        <button class="btn btn-sm btn-danger">Delete</button>
    </td>
</tr>
```

## 🔘 Botones y Acciones

### Botón "Edit"
- **Clase CSS**: `btn btn-sm btn-primary mr-2`
- **Evento**: `onClick={() => editCallBack(product)}`
- **Acción**: Invoca el callback de edición pasando el producto actual
- **Resultado**: En ProductDisplay activa el editor con los datos del producto

### Botón "Delete"
- **Clase CSS**: `btn btn-sm btn-danger`
- **Evento**: `onClick={() => deleteCallBack(product)}`
- **Acción**: Invoca el callback de eliminación pasando el producto actual
- **Resultado**: En ProductDisplay elimina el producto del estado

## 💡 Puntos Clave

1. **Componente Presentacional**: Solo renderiza datos, no maneja lógica
2. **Sin Estado Interno**: No usa `useState` ni hooks
3. **Reutilizable**: Se mapea N veces en ProductTable (una para cada producto)
4. **Props Drilling**: Recibe callbacks que ascienden a componentes superiores
5. **Formato de Precio**: Usa `toFixed(2)` para mostrar siempre 2 decimales
6. **Key Única**: Usa `product.id` como key para optimizar renderizado

## 🔗 Relaciones con Otros Componentes

```
ProductsAndSuppliers (estado global)
    ↓
ProductDisplay (contenedor inteligente)
    ↓
ProductTable (contenedor presentacional)
    ↓
ProductTableRow (fila individual) ← ESTE COMPONENTE
    ↓
Callbacks → suben de nuevo a ProductDisplay y ProductsAndSuppliers
```

## 📤 Flujo de Callbacks

### Editar Producto
```
Usuario click Edit
    ↓
onClick={() => editCallBack(product)}
    ↓
Pasa a ProductDisplay.startEditing(product)
    ↓
ProductDisplay activa editor con datos del producto
```

### Eliminar Producto
```
Usuario click Delete
    ↓
onClick={() => deleteCallBack(product)}
    ↓
Pasa a ProductDisplay → ProductsAndSuppliers.deleteData()
    ↓
ProductsAndSuppliers filtra y elimina el producto
```

## 🎯 Casos de Uso

1. **Mostrar un producto en la tabla**: El componente renderiza automáticamente cada campo
2. **Editar un producto**: El usuario hace click en "Edit" y se activa el formulario de edición
3. **Eliminar un producto**: El usuario hace click en "Delete" y se elimina inmediatamente

## 🔍 Ejemplo de Uso

```tsx
// En ProductTable.tsx
{products.map((p) => (
    <ProductTableRow 
        key={p.id}
        product={p}
        editCallBack={editCallBack}        // Viene de ProductDisplay
        deleteCallBack={deleteCallBack}    // Viene de ProductDisplay
    />
))}
```

## 🎨 Estilos Bootstrap Utilizados

| Clase | Propósito |
|-------|-----------|
| `btn` | Estilo base de botón |
| `btn-sm` | Botón pequeño |
| `btn-primary` | Botón azul (Edit) |
| `btn-danger` | Botón rojo (Delete) |
| `mr-2` | Margen derecho de 2 espacios |
| `text-right` | Alinea el precio a la derecha |

## ⚠️ Consideraciones

- **Sin confirmación de eliminación**: La eliminación es inmediata sin diálogo de confirmación
- **Precio formateado**: Siempre muestra 2 decimales (ej: $275.00)
- **Callbacks requeridos**: Sin callbacks, los botones no funcionarán
- **Producto requerido**: Sin objeto producto, no hay datos para mostrar

## 📋 Resumen

`ProductTableRow` es un componente presentacional simple que:
- ✅ Renderiza una fila HTML con datos del producto
- ✅ Muestra 4 columnas: ID, Name, Category, Price
- ✅ Proporciona botones Edit y Delete
- ✅ Invoca callbacks cuando el usuario interactúa
- ✅ Usa Bootstrap para estilos
- ✅ Formatea el precio a 2 decimales
- ✅ Es escalable y reutilizable
