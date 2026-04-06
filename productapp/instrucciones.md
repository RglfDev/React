# Guía paso a paso: Product & Supplier App

Esta guía muestra cómo se montó el proyecto y cómo funciona cada archivo. Para cada fichero:
- Primero se explica brevemente qué hace.
- Después se muestra el código completo sin comentarios añadidos.
- Finalmente se detalla el código con fragmentos y explicación línea por línea.

---

## 1) Preparación del proyecto

1) Crear proyecto Vite (React + TS):
```bash
npm create vite@latest productapp -- --template react-ts
cd productapp
npm install
```
2) Añadir Bootstrap:
```bash
npm install bootstrap
```
3) Organizar carpetas: src/Product, src/Supplier, src/types.
4) Arrancar para probar: `npm run dev`.

---

## 2) Archivos fuente y explicación detallada

### [src/main.tsx](src/main.tsx)
Qué hace: monta la app React en el DOM y carga estilos globales de Bootstrap.

Código completo:
```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import 'bootstrap/dist/css/bootstrap.min.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```
Explicación:
- Imports base:
  ```tsx
  import { StrictMode } from 'react'
  import { createRoot } from 'react-dom/client'
  ```
  `StrictMode` activa chequeos de desarrollo; `createRoot` crea el ancla de React.
- Carga componente raíz y CSS de Bootstrap:
  ```tsx
  import App from './App.tsx'
  import 'bootstrap/dist/css/bootstrap.min.css'
  ```
- Montaje en el elemento `root` del HTML:
  ```tsx
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
  ```
  Obtiene el nodo `#root`, crea el root React y renderiza `App` bajo `StrictMode`.

### [src/App.tsx](src/App.tsx)
Qué hace: componente raíz que solo delega en `ProductsAndSuppliers`.

Código completo:
```tsx
import { ProductsAndSuppliers } from "./ProductsAndSuppliers";

const App : React.FC = () => {
    return (
        <div className="App">
            <ProductsAndSuppliers/>
        </div>
    );
}
export default App;
```
Explicación:
- Importa el contenedor principal:
  ```tsx
  import { ProductsAndSuppliers } from "./ProductsAndSuppliers";
  ```
- Define `App` y renderiza el contenedor:
  ```tsx
  const App : React.FC = () => {
      return (
          <div className="App">
              <ProductsAndSuppliers/>
          </div>
      );
  }
  export default App;
  ```
  `App` envuelve la vista principal dentro de un `div` para posibles estilos globales.

### [src/types/Product.ts](src/types/Product.ts)
Qué hace: define el tipo de un producto.

Código completo:
```ts
export type Product = {
    id? : number;
    name: string;
    category : string;
    price : number;
}
```
Explicación:
- Tipo `Product` con campos `id` opcional y los datos `name`, `category`, `price` obligatorios.

### [src/types/Supplier.ts](src/types/Supplier.ts)
Qué hace: define el tipo de un proveedor.

Código completo:
```ts
export type Supplier = {
    id?: number;
    name: string;
    city:string;
    products: string[];
}
```
Explicación:
- Tipo `Supplier` con `id` opcional, `name`, `city` y una lista de nombres de `products`.

### [src/ProductsAndSuppliers.tsx](src/ProductsAndSuppliers.tsx)
Qué hace: contenedor que centraliza el estado de productos/proveedores, asigna IDs, y pasa callbacks a las vistas.

Código completo:
```tsx
import { use, useRef, useState } from "react";
import type { Product } from "./types/Product";
import type { Supplier } from "./types/Supplier";
import { ProductDisplay } from "./Product/ProductDisplay";
import { Selector } from "./Selector";
import { SupplierDisplay } from "./Supplier/SupplierDisplay";

export const ProductsAndSuppliers: React.FC = () => {
    const[products, setProducts] = useState<Product[]>([
        { id: 1, name: "Kayak", category: "Watersports", price: 275 },
        { id: 2, name: "Lifejacket", category: "Watersports", price: 48.95 },
        { id: 3, name: "Soccer Ball", category: "Soccer", price: 19.5 },
    ]);

    const[suppliers, setSuppliers] = useState<Supplier[]>([
        { id: 1, name: "Surf Dudes", city: "San Jose", products: ["Kayak","Lifejacket"] },
        { id: 2, name: "Field Supplies", city: "New York", products: ["Soccer Ball"] },
    ]);

    const idCounter = useRef(100);

    const saveData = (collection: "products" | "suppliers", item: Product | Supplier) => {
        if (item.id === 0) {
            item.id = idCounter.current++;
            if (collection === "products") setProducts(prev => [...prev, item as Product]);
            else setSuppliers(prev=> [...prev, item as Supplier]);
        } else {
            if (collection === "products") {
                setProducts(prev=> prev.map(stored => stored.id === item.id ? item as Product : stored));
            } else {
                setSuppliers(prev=> prev.map(stored => stored.id === item.id ? item as Supplier : stored));
            }
        }
    };
const deleteData = (collection: "products" | "suppliers", item: Product | Supplier) => {
        if (collection === "products") {
            setProducts(prev=> prev.filter(stored => stored.id !== item.id));
        } else {
            setSuppliers(prev=> prev.filter(stored => stored.id !== item.id));
        }
    };

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

}
```
Explicación detallada:
- Estados iniciales con datos de ejemplo:
  ```tsx
  const[products, setProducts] = useState<Product[]>([ ... ]);
  const[suppliers, setSuppliers] = useState<Supplier[]>([ ... ]);
  ```
  Se guardan listas independientes para cada dominio.
- Contador de IDs únicos:
  ```tsx
  const idCounter = useRef(100);
  ```
  `useRef` mantiene el valor entre renders; arranca en 100 para nuevos registros.
- Guardar (crear/actualizar):
  ```tsx
  const saveData = (collection, item) => {
    if (item.id === 0) {
      item.id = idCounter.current++;
      collection === "products"
        ? setProducts(prev => [...prev, item as Product])
        : setSuppliers(prev => [...prev, item as Supplier]);
    } else {
      collection === "products"
        ? setProducts(prev => prev.map(stored => stored.id === item.id ? item as Product : stored))
        : setSuppliers(prev => prev.map(stored => stored.id === item.id ? item as Supplier : stored));
    }
  };
  ```
  Si `id === 0`, crea y asigna id; si no, reemplaza por coincidencia de id.
- Eliminar por id:
  ```tsx
  const deleteData = (collection, item) => {
    collection === "products"
      ? setProducts(prev => prev.filter(stored => stored.id !== item.id))
      : setSuppliers(prev => prev.filter(stored => stored.id !== item.id));
  };
  ```
- Render con el selector y vistas específicas:
  ```tsx
  <Selector>
    <ProductDisplay ... />
    <SupplierDisplay ... />
  </Selector>
  ```
  Pasa datos y callbacks para que cada vista gestione sus formularios y tablas.

### [src/Selector.tsx](src/Selector.tsx)
Qué hace: muestra botones para cambiar entre las vistas hijas y renderiza solo la seleccionada.

Código completo:
```tsx
import type { ReactElement } from "react";
import React from "react";

type SelectorProps = {
    children: React.ReactNode;
}

export const Selector: React.FC<SelectorProps> = ({ children }) => {
    const firstChildren = React.Children.toArray(children)[0] as ReactElement<any>;
    const [selection, setSelection] = React.useState(firstChildren?.props.name || '');

    const handleSelection = (ev: React.MouseEvent<HTMLButtonElement>) => {
        const target = ev.target as HTMLButtonElement;
        setSelection(target.name);
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-2 p-3 bg-light">
                    {React.Children.map(children, (child) => {
                        const childElement = child as ReactElement<any>;
                        const name= childElement.props.name;
                        return (
                            <button
                            name={name}
                            onClick={handleSelection}
                            className={`btn btn-block btn-lg m-2
                             ${selection === name ? 'btn-primary active' : 'btn-secondary'}`}>
                                {name}
                            </button>
                        );
                    }
                    
                    )}
                </div>
                    <div>
                        
                        {React.Children.toArray(children).filter((child) => {
                            const childElement = child as ReactElement<any>;
                            return childElement.props.name === selection;
                        }
                    )}
                    </div>
                    </div>

            </div>
    )      
};
```
Explicación detallada:
- Estado inicial basado en el primer hijo:
  ```tsx
  const firstChildren = React.Children.toArray(children)[0] as ReactElement<any>;
  const [selection, setSelection] = React.useState(firstChildren?.props.name || '');
  ```
  Usa la prop `name` del primer child para seleccionar vista inicial.
- Handler de clic en botón:
  ```tsx
  const handleSelection = (ev) => {
    const target = ev.target as HTMLButtonElement;
    setSelection(target.name);
  }
  ```
- Render de botones y contenido activo:
  ```tsx
  {React.Children.map(children, (child) => { ...button... })}
  {React.Children.toArray(children).filter((child) => child.props.name === selection)}
  ```
  La izquierda crea un botón por child; la derecha filtra y muestra solo el seleccionado.

### [src/Product/ProductDisplay.tsx](src/Product/ProductDisplay.tsx)
Qué hace: decide si mostrar la tabla de productos o el editor, y orquesta los callbacks.

Código completo:
```tsx
import { useState } from "react";
import type { Product } from "../types/Product";
import { ProductEditor } from "./ProductEditor";
import { ProductTable } from "./ProductTable";

type ProductDisplayProps = {
    name:"Products";
    products:Product[];
    saveCallback:(product:Product)=>void;
    deleteCallback:(product:Product)=>void;
}

export const ProductDisplay:React.FC<ProductDisplayProps>=(
    { products, saveCallback, deleteCallback }
)=>{
    const [showEditor, setShowEditor] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

    const startEditing = (product:Product) => {
        setShowEditor(true);
        setSelectedProduct(product);
    }

    const saveProduct = (product:Product) => {
        saveCallback(product);
        setShowEditor(false);
        setSelectedProduct(null);
    }

    const cancelEditing = () => {
        setShowEditor(false);
        setSelectedProduct(null);
    }

    const createProduct = () => {
        setShowEditor(true);
        setSelectedProduct({
            id: 0,
            name: '',
            category: '',
            price: 0
        })
    }

    if(showEditor && selectedProduct){
        return (
            <ProductEditor 
            key={selectedProduct.id || -1}
            product={selectedProduct}
            saveCallBack={saveProduct}
            cancelCallBack={cancelEditing}
            />
        );
    }
        return(
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
}
```
Explicación detallada:
- Estados de la vista:
  ```tsx
  const [showEditor, setShowEditor] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  ```
  Controlan si se ve tabla o formulario y qué producto se edita.
- Entrar en modo edición:
  ```tsx
  const startEditing = (product) => {
    setShowEditor(true);
    setSelectedProduct(product);
  }
  ```
- Guardar y salir al listado:
  ```tsx
  const saveProduct = (product) => {
    saveCallback(product);
    setShowEditor(false);
    setSelectedProduct(null);
  }
  ```
- Cancelar sin cambios:
  ```tsx
  const cancelEditing = () => {
    setShowEditor(false);
    setSelectedProduct(null);
  }
  ```
- Crear nuevo con `id: 0` (indicador de alta):
  ```tsx
  const createProduct = () => {
    setShowEditor(true);
    setSelectedProduct({ id: 0, name: '', category: '', price: 0 })
  }
  ```
- Render condicional editor/tabla:
  ```tsx
  if (showEditor && selectedProduct) { return <ProductEditor .../>; }
  return <ProductTable ... />
  ```

### [src/Product/ProductEditor.tsx](src/Product/ProductEditor.tsx)
Qué hace: formulario controlado para crear/editar productos.

Código completo:
```tsx
import { useState } from "react";
import type { Product } from "../types/Product";

type ProductEditorProps = {
    product:Partial<Product>;
    saveCallBack:(product:Product)=>void;
    cancelCallBack:()=>void;
}

export const ProductEditor:React.FC<ProductEditorProps>=(
    { product, saveCallBack, cancelCallBack })=>{
    const[formData, setFormData] = useState<Product>({
        id: product.id ?? 0,
        name: product.name ?? '',
        category: product.category ?? '',
        price: product.price ?? 0
    });

    const handleChange=(ev:React.ChangeEvent<HTMLInputElement>)=>{
        const {name, value} = ev.target;
        setFormData(prev=>(
            {
            ...prev,[name]:value
        })
    );
    };

    const handleClick = () => {
        saveCallBack(formData);
    }
    return(
        <div className="card p-3">
            <div className="form-group">
                <label>ID</label>
                <input type="number" className="form-control"
                name="id"
                value={formData.id} disabled/>
            </div>
            <div className="form-group">
                <label>Name</label>
                <input type="text" className="form-control"
                name="name"
                value={formData.name}
                onChange={handleChange}/>
            </div>
            <div className="form-group">
                <label>Category</label>
                <input type="text" className="form-control"
                name="category"
                value={formData.category}
                onChange={handleChange}/>
            </div>
            <div className="form-group">
                <label>Price</label>
                <input type="number" className="form-control"
                name="price"
                value={formData.price}
                onChange={handleChange}/>
            </div>
            <div className="mt-3 text-center">
                <button className="btn btn-primary mr-2"
                onClick={handleClick}>Save</button>
                <button className="btn btn-secondary"
                onClick={cancelCallBack}>Cancel</button>
            </div>
        </div>
    )

}
```
Explicación detallada:
- Estado inicial del formulario:
  ```tsx
  const [formData, setFormData] = useState<Product>({
    id: product.id ?? 0,
    name: product.name ?? '',
    category: product.category ?? '',
    price: product.price ?? 0
  });
  ```
- Actualizar un campo en cambio de input:
  ```tsx
  const handleChange = (ev) => {
    const { name, value } = ev.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  ```
- Guardar y delegar al padre:
  ```tsx
  const handleClick = () => { saveCallBack(formData); }
  ```
- Render del formulario con ID deshabilitado y botones Save/Cancel conectados a callbacks.

### [src/Product/ProductTable.tsx](src/Product/ProductTable.tsx)
Qué hace: tabla completa de productos con acciones por fila.

Código completo:
```tsx
import type { Product } from "../types/Product";
import { ProductTableRow } from "./ProductTableRow";

type ProductTableProps = {
    products: Product[];
    editCallBack: (product: Product) => void;
    deleteCallBack: (product: Product) => void;
}
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
```
Explicación detallada:
- Props que recibe la tabla:
  ```tsx
  type ProductTableProps = { products: Product[]; editCallBack: (...); deleteCallBack: (...); }
  ```
- Render básico:
  ```tsx
  <table className="table table-striped">
    <thead>...</thead>
    <tbody>
      {products.map(p => <ProductTableRow ... />)}
    </tbody>
  </table>
  ```
  Cabecera fija y filas generadas mediante `map`, delegando acciones a `ProductTableRow`.

### [src/Product/ProductTableRow.tsx](src/Product/ProductTableRow.tsx)
Qué hace: fila individual de la tabla de productos con acciones de editar y eliminar.

Código completo:
```tsx
import type { Product } from "../types/Product";

type ProductTableRowProps = {
    product: Product;
    editCallBack: (product: Product) => void;
    deleteCallBack: (product: Product) => void;
}

export const ProductTableRow : React.FC<ProductTableRowProps> = ({
     product, editCallBack, deleteCallBack }) => {
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
```
Explicación detallada:
- Props y datos renderizados:
  ```tsx
  <tr>
    <td>{product.id}</td>
    <td>{product.name}</td>
    <td>{product.category}</td>
    <td className="text-right">${Number(product.price).toFixed(2)}</td>
  </tr>
  ```
- Acciones:
  ```tsx
  <button onClick={() => editCallBack(product)}>Edit</button>
  <button onClick={() => deleteCallBack(product)}>Delete</button>
  ```
  Llaman al padre con el producto actual.

### [src/Supplier/SupplierDisplay.tsx](src/Supplier/SupplierDisplay.tsx)
Qué hace: análogo a `ProductDisplay` pero para proveedores; conmuta entre tabla y editor.

Código completo:
```tsx
import { useState } from "react";
import type { Supplier } from "../types/Supplier";
import { SupplierEditor } from "./SupplierEditor";
import { SupplierTable } from "./SupplierTable";

type SupplierDisplayProps = {
    name:"Suppliers";
    suppliers:Supplier[];
    saveCallback:(supplier:Supplier)=>void;
    deleteCallback:(supplier:Supplier)=>void;
}

export const SupplierDisplay:React.FC<SupplierDisplayProps>=({name,
    suppliers, saveCallback, deleteCallback
})=>{{

    const [showEditor, setShowEditor] = useState(false);
    const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null)
    const startEditing = (supplier:Supplier) => {
        setShowEditor(true);
        setSelectedSupplier(supplier);
    }

    const saveSupplier = (supplier:Supplier) => {
        saveCallback(supplier);
        setShowEditor(false);
        setSelectedSupplier(null);
    }

    const cancelEditing = () => {
        setShowEditor(false);
        setSelectedSupplier(null);
    }

    const createSupplier = () => {
        setShowEditor(true);
        setSelectedSupplier({
            id: 0,
            name: '',
            city: '',
            products: []
        })
    }
    if(showEditor && selectedSupplier){
        return (
            <SupplierEditor
            key={selectedSupplier.id || -1}
            supplier={selectedSupplier}
            saveCallBack={saveSupplier}
            cancelCallBack={cancelEditing}
            />
        )
    }

    return(
                <div className="m-2">
                    <SupplierTable
                    suppliers={suppliers}
                    editCallBack={startEditing}
                    deleteCallBack={deleteCallback}
                    />
                    <div className="text-center">
                        <button className="btn btn-primary m-1"
                        onClick={createSupplier}>
                            New
                        </button>
                    </div>
                </div>
            );
        }
    }
```
Explicación detallada:
- Estados y selección de proveedor activo:
  ```tsx
  const [showEditor, setShowEditor] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null)
  ```
- Entrar en edición o creación (id 0):
  ```tsx
  const startEditing = (supplier) => { setShowEditor(true); setSelectedSupplier(supplier); }
  const createSupplier = () => { setShowEditor(true); setSelectedSupplier({ id:0, name:'', city:'', products:[] }) }
  ```
- Guardar/cancelar y cerrar editor:
  ```tsx
  const saveSupplier = (supplier) => { saveCallback(supplier); setShowEditor(false); setSelectedSupplier(null); }
  const cancelEditing = () => { setShowEditor(false); setSelectedSupplier(null); }
  ```
- Render condicional igual que en productos (editor vs tabla).

### [src/Supplier/SupplierEditor.tsx](src/Supplier/SupplierEditor.tsx)
Qué hace: formulario controlado para crear/editar proveedores.

Código completo:
```tsx
import { useState } from "react";
import type { Supplier } from "../types/Supplier";

type SupplierEditorProps = {
    supplier: Partial<Supplier>;
    saveCallBack: (supplier: Supplier) => void;
    cancelCallBack: () => void;
}

export const SupplierEditor: React.FC<SupplierEditorProps> = ({
    supplier, saveCallBack, cancelCallBack }) => {

        const[formData, setFormData] = useState<Supplier>({
                id: supplier.id ?? 0,
                name: supplier.name ?? '',
                city: supplier.city ?? '',
                products: supplier.products ?? []
            });
        

        const handleChange=(ev:React.ChangeEvent<HTMLInputElement>)=>{
        const {name, value} = ev.target;
        setFormData(prev=>(
            {
            ...prev,[name]:
            name === "products" ? value.split(',').map(item => item.trim()) : value
        }))
    };

        const handleClick = () => {
        saveCallBack(formData);
    }
    
    return(
        <div className="card p-3">
            <div className="form-group">
                <label>ID</label>
                <input type="number" className="form-control"
                name="id"
                value={formData.id} disabled/>
            </div>
            <div className="form-group">
                <label>Name</label>
                <input type="text" className="form-control"
                name="name"
                value={formData.name}
                onChange={handleChange}/>
            </div>
            <div className="form-group">
                <label>City</label>
                <input type="text" className="form-control"
                name="city"
                value={formData.city}
                onChange={handleChange}/>
            </div>
            <div className="form-group">
                <label>Products"
                <input type="text" className="form-control"
                name="products"
                value={formData.products}
                onChange={handleChange}/>
            </div>
            <div className="mt-3 text-center">
                <button className="btn btn-primary mr-2"
                onClick={handleClick}>Save</button>
                <button className="btn btn-secondary"
                onClick={cancelCallBack}>Cancel</button>
            </div>
        </div>
    )
}
```
Explicación detallada:
- Estado del formulario con fallback:
  ```tsx
  const [formData, setFormData] = useState<Supplier>({
    id: supplier.id ?? 0,
    name: supplier.name ?? '',
    city: supplier.city ?? '',
    products: supplier.products ?? []
  });
  ```
- Conversión especial para productos (string -> array):
  ```tsx
  const handleChange = (ev) => {
    const { name, value } = ev.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "products" ? value.split(',').map(item => item.trim()) : value
    }))
  }
  ```
- Guardar con callback superior:
  ```tsx
  const handleClick = () => { saveCallBack(formData); }
  ```

### [src/Supplier/SupplierTable.tsx](src/Supplier/SupplierTable.tsx)
Qué hace: tabla completa de proveedores.

Código completo:
```tsx
import type { Supplier } from "../types/Supplier";
import { SupplierTableRow } from "./SupplierTableRow";

type SupplierTableProps = {
    suppliers: Supplier[];
    editCallBack: (supplier: Supplier) => void;
    deleteCallBack: (supplier: Supplier) => void;
}

export const SupplierTable: React.FC<SupplierTableProps> = ({
    suppliers, editCallBack, deleteCallBack }) => {

        return(
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th colSpan={5}
                            className="bg-primary text-white text-center h4 p-2">Suppliers</th>
                        </tr>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>City</th>
                            <th className="text-right">Price</th>
                            <th></th>
                            </tr>
                    </thead>
                    <tbody>
                        {suppliers.map((s) => (
                            <SupplierTableRow key={s.id}
                                supplier={s}
                                editCallBack={editCallBack}
                                deleteCallBack={deleteCallBack} />
                        ))}
                    </tbody>
                </table>
            )

    }
```
Explicación detallada:
- Estructura casi idéntica a la tabla de productos, cambiando los datos y callbacks a proveedores.
- Genera una fila por elemento de `suppliers` delegando en `SupplierTableRow`.

### [src/Supplier/SupplierTableRow.tsx](src/Supplier/SupplierTableRow.tsx)
Qué hace: fila individual de proveedor con acciones.

Código completo:
```tsx
import type { Supplier } from "../types/Supplier";

export type SupplierTableRowProps = {
    supplier: Supplier;
    editCallBack: (supplier: Supplier) => void;
    deleteCallBack: (supplier: Supplier) => void;
}

export const SupplierTableRow: React.FC<SupplierTableRowProps> = ({
    supplier, editCallBack, deleteCallBack }) => {
        return (
            <tr key={supplier.id}>
                <td>{supplier.id}</td>
                <td>{supplier.name}</td>
                <td>{supplier.city}</td>
                <td className="text-right">{supplier.products.join(", ")}</td>
                <td>
                    <button className="btn btn-sm btn-primary mr-2"
                        onClick={() => editCallBack(supplier)}>
                        Edit
                    </button>
                    <button className="btn btn-sm btn-danger"
                        onClick={() => deleteCallBack(supplier)}>
                        Delete
                    </button>
                </td>
            </tr>
        )
    }
```
Explicación detallada:
- Render de campos y acciones:
  ```tsx
  <td>{supplier.products.join(", ")}</td>
  <button onClick={() => editCallBack(supplier)}>Edit</button>
  <button onClick={() => deleteCallBack(supplier)}>Delete</button>
  ```
  Muestra productos separados por comas y expone las acciones al padre.

---

## 3) Cómo funciona el sistema `ProductsAndSuppliers`

- **Estado centralizado** en [src/ProductsAndSuppliers.tsx](src/ProductsAndSuppliers.tsx): mantiene listas de productos/proveedores y el `idCounter` para IDs nuevos.
- **Callbacks de dominio**: `saveData` decide alta/edición según `id === 0`; `deleteData` elimina por id; ambos se pasan a los displays.
- **Selector de vistas** en [src/Selector.tsx](src/Selector.tsx): crea botones usando la prop `name` de cada child y solo renderiza el seleccionado.
- **Patrón Display + Table + Editor**: cada dominio usa un `Display` que alterna entre tabla y formulario controlado; las tablas disparan `edit/delete`, los editores disparan `save/cancel`.
- **Propagación al contenedor**: `save/delete` suben hasta `ProductsAndSuppliers`, que actualiza estado y re-renderiza.
- **Integración en App**: `App` solo pinta `<ProductsAndSuppliers />`; `main.tsx` monta `App` y aplica Bootstrap.

---

## 4) Resumen rápido del flujo

1) `main.tsx` monta `App` y carga Bootstrap.
2) `App` muestra `ProductsAndSuppliers`.
3) `ProductsAndSuppliers` inicializa datos y define `saveData`/`deleteData` + `idCounter`.
4) `Selector` genera botones “Products” y “Suppliers” y solo muestra el hijo activo.
5) Cada `Display` conmuta tabla/editor según su estado local.
6) Tablas disparan `edit/delete`; editores disparan `save/cancel`; el contenedor actualiza estado y refresca la UI.
