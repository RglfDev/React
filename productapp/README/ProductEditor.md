# ProductEditor

- Archivo: [src/Product/ProductEditor.tsx](src/Product/ProductEditor.tsx#L1-L86)
- Define el componente `ProductEditor` que recibe un producto parcial, un callback para guardar y otro para cancelar.

```tsx
type ProductEditorProps = {
    product: Partial<Product>;
    saveCallBack: (product: Product) => void;
    cancelCallBack: () => void;
}

export const ProductEditor: React.FC<ProductEditorProps> = ({
    product, saveCallBack, cancelCallBack }) => {
    // ...
}
```

## Propiedades

- **`product: Partial<Product>`**: Producto con propiedades opcionales. Si es un producto nuevo, vendrá vacío o con valores por defecto. Si es edición, contendrá los datos actuales.
- **`saveCallBack`**: Función que se ejecuta al guardar el producto (nuevo o editado).
- **`cancelCallBack`**: Función que se ejecuta al cancelar la operación.

## Estado del formulario

- Usa `useState` para mantener el estado del formulario con todos los campos del producto.
- Los valores iniciales se obtienen del prop `product` usando el operador nullish coalescing (`??`) para proporcionar valores por defecto.

```tsx
const [formData, setFormData] = useState<Product>({
    id: product.id ?? 0,
    name: product.name ?? '',
    category: product.category ?? '',
    price: product.price ?? 0
});
```

## Manejadores de eventos

### handleChange

- Manejador genérico para actualizar cualquier campo del formulario.
- Usa desestructuración para obtener `name` y `value` del input.
- Actualiza solo el campo modificado manteniendo el resto del estado intacto con el spread operator (`...prev`).

```tsx
const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = ev.target;
    setFormData(prev => ({
        ...prev,
        [name]: value
    }));
};
```

### handleClick

- Se ejecuta al hacer clic en el botón "Save".
- Invoca el callback `saveCallBack` pasándole el producto completo del formulario.

```tsx
const handleClick = () => {
    saveCallBack(formData);
}
```

## Renderizado

- Formulario con Bootstrap (`card`, `form-group`, `form-control`).
- **Campo ID**: Deshabilitado (`disabled`) ya que no se debe modificar manualmente.
- **Campos Name, Category y Price**: Editables con `onChange={handleChange}`.
- **Botones**:
  - "Save": Ejecuta `handleClick` para guardar.
  - "Cancel": Ejecuta directamente `cancelCallBack`.

```tsx
<div className="card p-3">
    <div className="form-group">
        <label>ID</label>
        <input type="number" className="form-control"
            name="id"
            value={formData.id} disabled />
    </div>
    {/* Campos Name, Category y Price con onChange */}
    <div className="mt-3 text-center">
        <button className="btn btn-primary mr-2"
            onClick={handleClick}>Save</button>
        <button className="btn btn-secondary"
            onClick={cancelCallBack}>Cancel</button>
    </div>
</div>
```

## Flujo de uso

1. El componente padre pasa un `product` (vacío para crear, con datos para editar).
2. El usuario modifica los campos del formulario.
3. Al hacer clic en "Save", se invoca `saveCallBack` con los datos del formulario.
4. Al hacer clic en "Cancel", se invoca `cancelCallBack` para abortar la operación.
