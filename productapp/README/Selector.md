# Selector

- Archivo: [src/Selector.tsx](src/Selector.tsx#L1-L54)
- Define el componente `Selector`, un componente padre que actúa como contenedor y gestor de navegación entre múltiples componentes hijos (ej: Product y Supplier).
- Implementa un sistema de selección mediante botones que permite alternar entre vistas.

```tsx
type SelectorProps = {
    children: React.ReactNode;
}

export const Selector: React.FC<SelectorProps> = ({ children }) => {
    // ...
}
```

## Propiedades

- **`children: React.ReactNode`**: Componentes hijos que serán mostrados según la selección del usuario. Cada hijo debe tener una propiedad `name` para identificarlo.

## Estados

### selection

- Almacena el nombre del componente hijo seleccionado actualmente.
- Se inicializa con el nombre del primer hijo.

```tsx
const [selection, setSelection] = React.useState(firstChildren?.props.name || '');
```

## Métodos

### handleSelection

- Manejador de eventos que se ejecuta al hacer clic en un botón de selección.
- Extrae el nombre del botón clickeado (`target.name`) y actualiza el estado `selection`.

```tsx
const handleSelection = (ev: React.MouseEvent<HTMLButtonElement>) => {
    const target = ev.target as HTMLButtonElement;
    setSelection(target.name);
}
```

## Renderizado

El componente usa una estructura de dos columnas (con Bootstrap):

### Columna izquierda - Botones de selección

- Ancho: 2 columnas (`col-2`)
- Mapea todos los componentes hijos y genera un botón para cada uno.
- El nombre del botón (`name`) se extrae de `childElement.props.name`.
- Estilos dinámicos:
  - `btn-primary active` si el botón corresponds al `selection` actual
  - `btn-secondary` si no está seleccionado

```tsx
<div className="col-2 p-3 bg-light">
    {React.Children.map(children, (child) => {
        const childElement = child as ReactElement<any>;
        const name = childElement.props.name;
        return (
            <button
                name={name}
                onClick={handleSelection}
                className={`btn btn-block btn-lg m-2
                 ${selection === name ? 'btn-primary active' : 'btn-secondary'}`}>
                {name}
            </button>
        );
    })}
</div>
```

### Columna derecha - Contenido

- Filtra los hijos para mostrar solo el que coincida con el `selection` actual.
- Solo un componente es visible en cada momento.

```tsx
<div>
    {React.Children.toArray(children).filter((child) => {
        const childElement = child as ReactElement<any>;
        return childElement.props.name === selection;
    })}
</div>
```

## Flujo de uso

1. El `Selector` recibe múltiples componentes hijos como `children` (ej: `<ProductDisplay />` y `<SupplierDisplay />`).
2. Cada hijo debe tener una propiedad `name` (ej: `name="Products"`, `name="Suppliers"`).
3. Se renderiza una columna izquierda con botones, uno por cada hijo.
4. Se renderiza una columna derecha con el contenido del hijo seleccionado.
5. Al hacer clic en un botón, se actualiza `selection` y se muestra el correspondiente componente hijo.
6. Los botones se resaltan dinámicamente según la selección actual.

## Ejemplo de uso

```tsx
<Selector>
    <ProductDisplay name="Products" products={products} />
    <SupplierDisplay name="Suppliers" suppliers={suppliers} />
</Selector>
```

Esto genera:
- Una columna izquierda con botones "Products" y "Suppliers"
- Una columna derecha que muestra el contenido del seleccionado (inicialmente "Products")
