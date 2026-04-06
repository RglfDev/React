# Flujo de Trabajo y Arquitectura de la Aplicación

## 📋 Índice
1. [Descripción General](#descripción-general)
2. [Flujo de Trabajo](#flujo-de-trabajo)
3. [Árbol de Componentes](#árbol-de-componentes)
4. [Resumen de Componentes y Archivos](#resumen-de-componentes-y-archivos)

---

## Descripción General

**ProductApp** es una aplicación React que permite gestionar un catálogo de productos y proveedores. Proporciona funcionalidades para:
- Ver un listado de productos y proveedores
- Crear nuevos productos/proveedores
- Editar productos/proveedores existentes
- Eliminar productos/proveedores del catálogo

La aplicación utiliza una interfaz de navegación mediante pestañas para alternar entre la vista de productos y proveedores.

---

## Flujo de Trabajo

```
1. INICIO DE LA APLICACIÓN
   ↓
   main.tsx → Renderiza React en el DOM con StrictMode
   ↓
   App.tsx → Componente raíz que envuelve ProductsAndSuppliers
   ↓
   ProductsAndSuppliers.tsx → Gestiona el estado global (productos y proveedores)
   ↓
   Selector.tsx → Controla la navegación entre pestañas (Products/Suppliers)
   ↓
   ProductDisplay.tsx / SupplierDisplay.tsx → Pantalla activa


2. VISUALIZACIÓN DE DATOS (Estado inicial)
   ↓
   ProductDisplay/SupplierDisplay
   ↓
   ProductTable/SupplierTable → Muestra la lista en formato tabla
   ↓
   ProductTableRow/SupplierTableRow → Cada fila con botones de Editar/Eliminar


3. CREAR NUEVO ELEMENTO
   Usuario hace clic en botón "New"
   ↓
   ProductDisplay/SupplierDisplay → Activa showEditor = true
   ↓
   setSelectedProduct/setSelectedSupplier = { id: 0, ...campos vacíos }
   ↓
   ProductEditor/SupplierEditor → Muestra formulario vacío
   ↓
   Usuario completa el formulario
   ↓
   Click en "Save"
   ↓
   saveCallback enviada a ProductsAndSuppliers
   ↓
   saveData() → Asigna nuevo ID (desde idCounter = 100)
   ↓
   setProducts/setSuppliers → Actualiza estado
   ↓
   Vuelve a ProductDisplay/SupplierDisplay (showEditor = false)


4. EDITAR ELEMENTO EXISTENTE
   Usuario hace clic en botón "Edit" en una fila
   ↓
   ProductTableRow/SupplierTableRow → Invoca editCallBack con el elemento
   ↓
   ProductDisplay/SupplierDisplay → startEditing(elemento)
   ↓
   setSelectedProduct/setSelectedSupplier = elemento
   ↓
   ProductEditor/SupplierEditor → Muestra formulario prellenado
   ↓
   Usuario modifica datos
   ↓
   Click en "Save"
   ↓
   saveCallback enviada a ProductsAndSuppliers
   ↓
   saveData() → Como id !== 0, actualiza elemento existente
   ↓
   setProducts/setSuppliers → Reemplaza elemento antiguo
   ↓
   Vuelve a ProductDisplay/SupplierDisplay


5. ELIMINAR ELEMENTO
   Usuario hace clic en botón "Delete" en una fila
   ↓
   ProductTableRow/SupplierTableRow → Invoca deleteCallBack con el elemento
   ↓
   ProductDisplay/SupplierDisplay → Pasa a ProductsAndSuppliers
   ↓
   deleteData() → Filtra el elemento de la lista
   ↓
   setProducts/setSuppliers → Remueve elemento
   ↓
   Tabla se actualiza automáticamente


6. CAMBIAR ENTRE PESTAÑAS
   Usuario hace clic en botón "Products" o "Suppliers"
   ↓
   Selector.tsx → handleSelection() actualiza state selection
   ↓
   Se renderiza el componente hijo correspondiente
   ↓
   Selector filtra y muestra solo el componente seleccionado
```

---

## Árbol de Componentes

```
App
 └── ProductsAndSuppliers (Contenedor principal, maneja estado global)
      └── Selector (Router visual - alterna entre vistas)
           ├── ProductDisplay
           │    ├── ProductTable (cuando showEditor = false)
           │    │    └── ProductTableRow (x N)
           │    │         ├── Botón Edit
           │    │         └── Botón Delete
           │    │
           │    └── ProductEditor (cuando showEditor = true)
           │         ├── Input ID (deshabilitado)
           │         ├── Input Name
           │         ├── Input Category
           │         ├── Input Price
           │         ├── Botón Save
           │         └── Botón Cancel
           │
           └── SupplierDisplay
                ├── SupplierTable (cuando showEditor = false)
                │    └── SupplierTableRow (x N)
                │         ├── Botón Edit
                │         └── Botón Delete
                │
                └── SupplierEditor (cuando showEditor = true)
                     ├── Input ID (deshabilitado)
                     ├── Input Name
                     ├── Input City
                     ├── Input Products
                     ├── Botón Save
                     └── Botón Cancel
```

### Explicación del Árbol

- **App**: Componente raíz
- **ProductsAndSuppliers**: Gestiona todo el estado (productos, proveedores, ID counter)
- **Selector**: Componente de navegación que muestra/oculta ProductDisplay y SupplierDisplay
- **ProductDisplay/SupplierDisplay**: Controlan la lógica de mostrar tabla o editor
- **ProductTable/SupplierTable**: Componentes de presentación que renderizan la tabla
- **ProductTableRow/SupplierTableRow**: Filas individuales con acciones
- **ProductEditor/SupplierEditor**: Formularios para crear/editar elementos

---

## Resumen de Componentes y Archivos

### 📁 Estructura de Carpetas

#### Raíz del Proyecto
```
index.html          - Punto de entrada HTML
package.json        - Dependencias y configuración del proyecto
vite.config.ts      - Configuración de Vite
tsconfig.json       - Configuración de TypeScript
eslint.config.js    - Configuración de ESLint
```

---

### 🔧 Archivos Principales

#### [src/main.tsx](../src/main.tsx)
- **Responsabilidad**: Punto de entrada de la aplicación
- **Qué hace**: 
  - Importa React y ReactDOM
  - Carga Bootstrap CSS
  - Renderiza el componente `App` en el elemento con id `root`
  - Envuelve la aplicación en `StrictMode` para detectar problemas en desarrollo

#### [src/App.tsx](../src/App.tsx)
- **Responsabilidad**: Componente raíz
- **Qué hace**:
  - Contenedor simple que renderiza `ProductsAndSuppliers`
  - Punto de referencia central de la aplicación

#### [src/ProductsAndSuppliers.tsx](../src/ProductsAndSuppliers.tsx)
- **Responsabilidad**: Contenedor inteligente / Gestor de estado global
- **Qué hace**:
  - Gestiona el estado de productos y proveedores
  - Inicializa datos de ejemplo
  - Mantiene un contador de IDs (`useRef`) para asignar IDs únicos a nuevos elementos (comenzando en 100)
  - Proporciona callbacks para guardar y eliminar elementos
  - Maneja operaciones CRUD:
    - **Save**: Si `id === 0` es nuevo (asigna ID y añade), si no es existente (actualiza)
    - **Delete**: Filtra el elemento de la lista
  - Renderiza el `Selector` como contenedor de las dos pantallas

#### [src/Selector.tsx](../src/Selector.tsx)
- **Responsabilidad**: Router visual / Componente de navegación
- **Qué hace**:
  - Recibe dos children: `ProductDisplay` y `SupplierDisplay`
  - Crea botones para cambiar entre vistas
  - Mantiene estado de cuál vista está activa
  - Renderiza solo el componente hijo que coincida con la selección
  - Estructura: panel izquierdo con botones + panel derecho con contenido

---

### 📦 Componentes de Productos

#### [src/Product/ProductDisplay.tsx](../src/Product/ProductDisplay.tsx)
- **Responsabilidad**: Contenedor inteligente para productos
- **Qué hace**:
  - Controla si se muestra la tabla o el editor
  - Gestiona el producto seleccionado para edición
  - Proporciona callbacks a ProductTable:
    - `startEditing()`: Inicia edición de producto existente
    - `createProduct()`: Inicia creación de nuevo producto (id = 0)
    - `cancelEditing()`: Cancela operación
    - `saveProduct()`: Guarda y retorna a la tabla
  - Renderiza condicional: `ProductEditor` o `ProductTable`

#### [src/Product/ProductTable.tsx](../src/Product/ProductTable.tsx)
- **Responsabilidad**: Componente presentacional de tabla
- **Qué hace**:
  - Recibe lista de productos y callbacks
  - Renderiza estructura HTML de tabla
  - Mapea cada producto a un `ProductTableRow`
  - Pasa callbacks a cada fila

#### [src/Product/ProductTableRow.tsx](../src/Product/ProductTableRow.tsx)
- **Responsabilidad**: Componente de fila individual
- **Qué hace**:
  - Renderiza una fila de tabla con datos del producto
  - Proporciona botones "Edit" y "Delete"
  - Al hacer click, invoca los callbacks correspondientes

#### [src/Product/ProductEditor.tsx](../src/Product/ProductEditor.tsx)
- **Responsabilidad**: Formulario para crear/editar productos
- **Qué hace**:
  - Recibe un producto (parcial o completo)
  - Inicializa el estado del formulario con datos del producto
  - Maneja cambios en los inputs (name, category, price)
  - El campo ID está deshabilitado (no se puede editar)
  - Botón "Save": Invoca `saveCallBack` con los datos
  - Botón "Cancel": Invoca `cancelCallBack` para descartar cambios

---

### 📦 Componentes de Proveedores

#### [src/Supplier/SupplierDisplay.tsx](../src/Supplier/SupplierDisplay.tsx)
- **Responsabilidad**: Contenedor inteligente para proveedores
- **Qué hace**:
  - Lógica idéntica a `ProductDisplay` pero para proveedores
  - Controla visualización de tabla o editor
  - Gestiona proveedores seleccionados
  - Proporciona callbacks a SupplierTable
  - Renderiza condicional: `SupplierEditor` o `SupplierTable`

#### [src/Supplier/SupplierTable.tsx](../src/Supplier/SupplierTable.tsx)
- **Responsabilidad**: Componente presentacional de tabla
- **Qué hace**:
  - Recibe lista de proveedores y callbacks
  - Renderiza estructura HTML de tabla
  - Mapea cada proveedor a un `SupplierTableRow`

#### [src/Supplier/SupplierTableRow.tsx](../src/Supplier/SupplierTableRow.tsx)
- **Responsabilidad**: Componente de fila individual
- **Qué hace**:
  - Renderiza una fila de tabla con datos del proveedor
  - Botones "Edit" y "Delete"
  - Invoca callbacks al hacer click

#### [src/Supplier/SupplierEditor.tsx](../src/Supplier/SupplierEditor.tsx)
- **Responsabilidad**: Formulario para crear/editar proveedores
- **Qué hace**:
  - Recibe un proveedor (parcial o completo)
  - Inicializa estado del formulario (id, name, city, products)
  - ID deshabilitado
  - Maneja cambios en los inputs
  - Botón "Save" y "Cancel"

---

### 🔤 Tipos de Datos

#### [src/types/Product.ts](../src/types/Product.ts)
```typescript
export type Product = {
    id?: number;           // ID único (opcional, se asigna al crear)
    name: string;          // Nombre del producto
    category: string;      // Categoría (ej: "Watersports", "Soccer")
    price: number;         // Precio del producto
}
```

#### [src/types/Supplier.ts](../src/types/Supplier.ts)
```typescript
export type Supplier = {
    id?: number;           // ID único (opcional, se asigna al crear)
    name: string;          // Nombre del proveedor
    city: string;          // Ciudad donde opera
    products: string[];    // Array de nombres de productos que provee
}
```

---

### 🎨 Estilos

#### [src/App.css](../src/App.css)
- Estilos personalizados de la aplicación

#### [src/index.css](../src/index.css)
- Estilos globales

---

## 🔄 Patrón de Datos (Props Drilling)

La aplicación utiliza **Props Drilling** para pasar datos y callbacks:

1. `ProductsAndSuppliers` → proporciona `products`, `saveCallback`, `deleteCallback`
2. `ProductDisplay/SupplierDisplay` → recibe datos y callbacks
3. `ProductTable/SupplierTable` → recibe datos y callbacks
4. `ProductTableRow/SupplierTableRow` → recibe datos y callbacks

Los callbacks suben por la cadena:
- Usuario hace click → TableRow invoca callback → Display invoca callback → ProductsAndSuppliers actualiza estado

---

## 🚀 Flujo de Ejecución Detallado

### Crear Producto
```
1. Usuario hace click en "New" (ProductDisplay)
2. createProduct() → setSelectedProduct({ id: 0, ... })
3. showEditor = true → Renderiza ProductEditor
4. Usuario rellena formulario
5. Click "Save" → saveProduct(formData)
6. saveCallback llamada → ProductsAndSuppliers.saveData("products", product)
7. product.id === 0 → idCounter++ (100, 101, 102...)
8. setProducts([...prevProducts, newProduct])
9. showEditor = false → Vuelve a ProductDisplay con ProductTable
10. Tabla se actualiza con nuevo producto
```

### Editar Producto
```
1. Usuario hace click en "Edit" en ProductTableRow
2. editCallBack(producto) → ProductDisplay.startEditing(producto)
3. setSelectedProduct(producto)
4. showEditor = true → Renderiza ProductEditor con datos
5. Usuario modifica datos en formulario
6. Click "Save" → saveProduct(formData)
7. saveCallback → ProductsAndSuppliers.saveData("products", product)
8. product.id !== 0 → map() reemplaza producto con mismo id
9. setProducts(updatedList)
10. showEditor = false → Vuelve a ProductDisplay con ProductTable actualizada
```

### Eliminar Producto
```
1. Usuario hace click en "Delete" en ProductTableRow
2. deleteCallBack(producto) → ProductDisplay → ProductsAndSuppliers.deleteData()
3. filter() elimina producto con ese id
4. setProducts(filteredList)
5. Tabla se re-renderiza sin el producto eliminado
```

---

## 📊 Estado Global (ProductsAndSuppliers)

```typescript
// Estado de productos
const [products, setProducts] = useState<Product[]>([
    { id: 1, name: "Kayak", category: "Watersports", price: 275 },
    { id: 2, name: "Lifejacket", category: "Watersports", price: 48.95 },
    { id: 3, name: "Soccer Ball", category: "Soccer", price: 19.5 },
]);

// Estado de proveedores
const [suppliers, setSuppliers] = useState<Supplier[]>([
    { id: 1, name: "Surf Dudes", city: "San Jose", products: ["Kayak", "Lifejacket"] },
    { id: 2, name: "Field Supplies", city: "New York", products: ["Soccer Ball"] },
]);

// Contador de IDs para nuevos elementos
const idCounter = useRef(100);
```

---

## 🎯 Puntos Clave

1. **Props Drilling**: Los callbacks viajan de componentes hijos a padres para actualizar estado
2. **Condicional Rendering**: ProductDisplay muestra tabla u editor según `showEditor`
3. **useRef para IDs**: Mantiene un contador único que no causa re-renders
4. **Datos de Ejemplo**: La app incluye 3 productos y 2 proveedores iniciales
5. **Validación de IDs**: 
   - `id === 0` → Elemento nuevo, asigna ID y añade
   - `id !== 0` → Elemento existente, actualiza
6. **Bootstrap para estilos**: Usa clases Bootstrap para UI consistente

---

## 🔗 Interconexiones Entre Componentes

```
main.tsx
   ↓
App.tsx
   ↓
ProductsAndSuppliers.tsx (ESTADO GLOBAL)
   ├─ [saveData / deleteData callbacks]
   │
   └─ Selector.tsx
      ├─ [selection state]
      │
      ├─ ProductDisplay.tsx
      │  ├─ [showEditor, selectedProduct state]
      │  ├─ [startEditing, createProduct, cancelEditing]
      │  │
      │  ├─ ProductTable.tsx
      │  │  └─ ProductTableRow.tsx (x N)
      │  │     └─ [editCallBack, deleteCallBack]
      │  │
      │  └─ ProductEditor.tsx
      │     └─ [saveCallBack, cancelCallBack]
      │
      └─ SupplierDisplay.tsx
         ├─ [showEditor, selectedSupplier state]
         ├─ [startEditing, createSupplier, cancelEditing]
         │
         ├─ SupplierTable.tsx
         │  └─ SupplierTableRow.tsx (x N)
         │     └─ [editCallBack, deleteCallBack]
         │
         └─ SupplierEditor.tsx
            └─ [saveCallBack, cancelCallBack]
```

---

## 📝 Notas de Desarrollo

- La aplicación es **reactiva**: Cambios en estado se reflejan inmediatamente en UI
- Los **IDs se asignan automáticamente** a partir de 100
- La **eliminación es inmediata**, no requiere confirmación
- Los estilos vienen de **Bootstrap**, haciendo la UI responsiva
- Tipado completo con **TypeScript** para mayor seguridad
- Manejo de estado mediante **React Hooks** (useState, useRef, useCallback implícito)
