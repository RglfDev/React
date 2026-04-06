# App

- Archivo: [src/App.tsx](src/App.tsx#L1-L10)
- Componente raíz de la aplicación React.
- Componente funcional que actúa como punto de entrada principal de la aplicación.
- Renderiza el componente `ProductsAndSuppliers` dentro de un contenedor div.

```tsx
const App: React.FC = () => {
    return (
        <div className="App">
            <ProductsAndSuppliers />
        </div>
    );
}
export default App;
```

## Estructura

### Importaciones

```tsx
import { ProductsAndSuppliers } from "./ProductsAndSuppliers";
```

- Importa el componente `ProductsAndSuppliers`, que es el componente principal de la aplicación que gestiona toda la lógica de productos y proveedores.

### Componente App

```tsx
const App: React.FC = () => {
    return (
        <div className="App">
            <ProductsAndSuppliers />
        </div>
    );
}
```

- **Tipo**: `React.FC` (Functional Component) sin props.
- **JSX**: Estructura simple que envuelve `ProductsAndSuppliers` en un `<div>` con clase "App".
- La clase "App" es utilizada para estilos CSS globales aplicados en [src/App.css](src/App.css).

### Exportación

```tsx
export default App;
```

- Exporta el componente como default export, permitiendo que sea importado en [src/main.tsx](src/main.tsx) como punto de entrada de la aplicación.

## Relación con otros componentes

```
App
└── ProductsAndSuppliers
    ├── Selector
    │   ├── ProductDisplay
    │   │   ├── ProductTable
    │   │   └── ProductEditor
    │   └── SupplierDisplay
    │       ├── SupplierTable
    │       └── SupplierEditor
```

## Propósito

- **Punto de entrada**: Es el componente raíz que se monta en el DOM (en [src/main.tsx](src/main.tsx)).
- **Contenedor simple**: Su única responsabilidad es renderizar el componente principal `ProductsAndSuppliers`.
- **Escalabilidad**: Estructura preparada para agregar más componentes hermanos o contextos globales en el futuro si es necesario.

## Ciclo de vida

1. **Montaje inicial**: React carga `App` en el DOM.
2. **Renderización**: Se renderiza el contenedor y el componente hijo `ProductsAndSuppliers`.
3. **Propagación**: `ProductsAndSuppliers` gestiona todos los estados y lógica de la aplicación.
4. **Eventos**: Los cambios de estado en componentes hijos causan re-renderizaciones que se reflejan automáticamente en `App`.

## Estilos

- La clase "App" se puede utilizar en [src/App.css](src/App.css) para aplicar estilos globales:

```css
.App {
    /* Estilos globales de la aplicación */
}
```
