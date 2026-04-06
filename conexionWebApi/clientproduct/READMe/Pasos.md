# 📚 Guía Completa para Crear una Aplicación React + WebAPI con TypeScript

## 📋 Tabla de Contenidos
1. [Introducción](#introducción)
2. [Configuración Inicial del Proyecto](#configuración-inicial-del-proyecto)
3. [Instalación de Dependencias](#instalación-de-dependencias)
4. [Estructura del Proyecto](#estructura-del-proyecto)
5. [Creación del Modelo de Datos](#creación-del-modelo-de-datos)
6. [Configuración del Servicio API](#configuración-del-servicio-api)
7. [Componente Principal - App](#componente-principal---app)
8. [Componente ProductsTable](#componente-productstable)
9. [Funcionalidades Avanzadas](#funcionalidades-avanzadas)
   - [Sistema de Modales](#sistema-de-modales)
   - [Buscador de Productos](#buscador-de-productos)
   - [Sistema de Paginación](#sistema-de-paginación)
10. [Punto de Entrada - main.tsx](#punto-de-entrada---maintsx)

---

## 📖 Introducción

Esta guía te ayudará a crear desde cero una aplicación completa de gestión de productos utilizando **React con TypeScript**, **Vite** como herramienta de construcción, **Bootstrap** y **Reactstrap** para los estilos, y **Axios** para la comunicación con una API REST.

El proyecto implementa un **CRUD completo** (Create, Read, Update, Delete) con características avanzadas como:
- ✅ Sistema de modales para crear/editar productos
- ✅ Buscador en tiempo real
- ✅ Paginación de resultados
- ✅ Confirmación de eliminación
- ✅ Indicador de carga

---

## 🚀 Configuración Inicial del Proyecto

### Paso 1: Crear el Proyecto con Vite

Abre tu terminal y ejecuta:

```bash
npm create vite@latest clientproduct -- --template react-ts
cd clientproduct
```

Este comando crea un proyecto React con TypeScript utilizando Vite como bundler.

---

## 📦 Instalación de Dependencias

### Paso 2: Instalar las Librerías Necesarias

Instala las siguientes dependencias que utilizaremos en el proyecto:

```bash
npm install axios bootstrap reactstrap
```

**Explicación de las librerías:**

- **axios**: Cliente HTTP para realizar peticiones a la API REST. Es más potente y flexible que `fetch`.
- **bootstrap**: Framework CSS para estilos responsivos y componentes prediseñados.
- **reactstrap**: Componentes de Bootstrap específicamente diseñados para React, que facilitan su uso con props y eventos.

**Nota importante**: Asegúrate de que también necesitas tener instalada una WebAPI en el backend. En este caso, se utiliza el proyecto `apiProducts` que debe estar corriendo en `https://localhost:44326/Products_DB`.

---

## 🗂️ Estructura del Proyecto

### Paso 3: Crear la Estructura de Carpetas

Crea la siguiente estructura dentro de la carpeta `src/`:

```
src/
├── models/           # Interfaces y tipos de TypeScript
│   └── Producto.ts
├── services/         # Configuración de servicios externos
│   └── api.ts
├── components/       # Componentes React
│   ├── ProductosTable.tsx
│   └── ProductModal.tsx
├── App.tsx          # Componente principal
├── main.tsx         # Punto de entrada
├── App.css          # Estilos del App
└── index.css        # Estilos globales
```

---

## 📄 Creación del Modelo de Datos

### Paso 4: Definir la Interfaz Producto

**Archivo Completo: `src/models/Producto.ts`**

```typescript
export interface Producto{
    id?:number;
    name:string;
    category: string;
    price:number;
}
```

### 📝 Explicación Detallada del Modelo

#### ¿Por qué usar `interface` en lugar de `type`?

```typescript
export interface Producto{
    id?:number;        // ← El signo ? indica que es OPCIONAL
    name:string;       // ← Campo obligatorio
    category: string;  // ← Campo obligatorio
    price:number;      // ← Campo obligatorio
}
```

**Desglose por campo:**

1. **`id?:number`**
   - El signo `?` indica que este campo es **opcional**
   - Es útil porque cuando creamos un producto nuevo, aún no tiene ID (lo asigna la base de datos)
   - Cuando editamos un producto existente, sí tendrá ID

2. **`name:string`**
   - Campo obligatorio que almacena el nombre del producto
   - Tipo `string` para texto

3. **`category:string`**
   - Categoría del producto (ej: "Electrónica", "Ropa", etc.)
   - También es un campo de texto obligatorio

4. **`price:number`**
   - Precio del producto
   - Tipo `number` para valores numéricos

**¿Por qué exportamos la interfaz?**
El `export` permite importar esta interfaz en otros archivos del proyecto, manteniendo la consistencia de tipos en toda la aplicación.

---

## 🌐 Configuración del Servicio API

### Paso 5: Configurar Axios para la Comunicación con la API

**Archivo Completo: `src/services/api.ts`**

```typescript
import axios from "axios";

export const api = axios.create({
    baseURL: 'https://localhost:44326/Products_DB',
    headers: {
        'Content-Type':'application/json'
    }
})
```

### 📝 Explicación Detallada del Servicio API

#### Importación de Axios

```typescript
import axios from "axios";
```

Importamos la librería `axios` para crear una instancia personalizada.

#### Creación de la Instancia de Axios

```typescript
export const api = axios.create({
    baseURL: 'https://localhost:44326/Products_DB',
    headers: {
        'Content-Type':'application/json'
    }
})
```

**Desglose de la configuración:**

1. **`axios.create()`**
   - Crea una instancia personalizada de axios con configuración predeterminada
   - Evita repetir la URL base en cada petición

2. **`baseURL: 'https://localhost:44326/Products_DB'`**
   - URL base de nuestra API REST
   - Todas las peticiones se concatenarán a esta URL
   - Ejemplo: `api.get("/")` llamará a `https://localhost:44326/Products_DB/`
   - Ejemplo: `api.get("/5")` llamará a `https://localhost:44326/Products_DB/5`

3. **`headers: { 'Content-Type':'application/json' }`**
   - Especifica que todas las peticiones enviarán y recibirán datos en formato JSON
   - El servidor sabrá cómo interpretar los datos enviados

**Ventajas de esta configuración:**
- ✅ No repetimos la URL base en cada petición
- ✅ Los headers se aplican automáticamente a todas las peticiones
- ✅ Código más limpio y mantenible
- ✅ Fácil cambiar la URL de producción/desarrollo en un solo lugar

---

## 🎨 Componente Principal - App

### Paso 6: Crear el Componente App

**Archivo Completo: `src/App.tsx`**

```tsx
import ProductosTable from "./components/ProductosTable"

function App() {
    return (
        <div className="container mt-4">
            <h1 className="text-primary"> Proyecto React+webAPI</h1>
            <ProductosTable/>
        </div>
    )
}

export default App
```

### 📝 Explicación Detallada del Componente App

#### Importación del Componente

```tsx
import ProductosTable from "./components/ProductosTable"
```

Importamos el componente que contendrá toda la lógica de la tabla de productos.

#### Estructura del Componente

```tsx
function App() {
    return (
        <div className="container mt-4">
            <h1 className="text-primary"> Proyecto React+webAPI</h1>
            <ProductosTable/>
        </div>
    )
}
```

**Desglose de elementos:**

1. **`<div className="container mt-4">`**
   - `container`: Clase de Bootstrap que centra el contenido con márgenes responsivos
   - `mt-4`: Margin top de 4 unidades (espaciado superior)

2. **`<h1 className="text-primary">`**
   - `text-primary`: Aplica el color primario de Bootstrap (azul por defecto)
   - Título principal de la aplicación

3. **`<ProductosTable/>`**
   - Renderiza el componente que contiene toda la funcionalidad CRUD
   - Es un componente hijo que maneja su propio estado

**Este componente es simple intencionalmente:**
- Actúa como contenedor principal
- Mantiene la estructura limpia
- Delega la lógica compleja al componente `ProductosTable`

---

## 🗃️ Componente ProductsTable

### Paso 7: Crear el Componente Principal de Gestión de Productos

Este es el componente más importante y complejo de la aplicación. Lo explicaremos por secciones.

**Archivo Completo: `src/components/ProductosTable.tsx`**

```tsx
import {
    Button,//el botón que añadirá la modal
    Modal,//La modal
    ModalBody,//El cuerpo del modal
    ModalHeader,//La cabecera del modal
    Form,
    FormGroup,
    Label,
    ModalFooter,
    Input
 
} from "reactstrap"
import type { Producto } from "../models/Producto"
import { useEffect, useState } from "react"
import { api } from "../services/api";
 
 
const emptyProduct: Producto = {
    name:"",
    category:"",
    price:0
}
 
function ProductsTable(){
 
    const [data, setData]=useState<Producto[]>([]);
    const [loading, setLodaing]=useState(false);
 
    const[modalEdit, setModalEdit]=useState(false);
    const[modalDelete, setModalDelete]=useState(false);
 
    const[selectedProduct, setSelectedProduct]=useState<Producto>(emptyProduct);
    const[search, setSearch]=useState("");
 
    const [currentPage, setCurrentPage]=useState(1);
    const itemsPerPage = 5;
   
    //Cargar Productos
    //Carga de datos desde la base de datos (Cargar los productos)
    const loadProcuts = async () => {
 
       setLodaing(true);
 
       try{
 
            const res = await api.get<Producto[]>("/");
 
            setData(res.data);
 
       }catch(err){
            console.error(`Error inesperado: ${err}`);
       } finally{
            setLodaing(false);
       }
    }
 
 
    /*
        Básicamente lo usamos para que cuando haya CUALQUIER tipo de cambio dentro de la vista,
        va a recuperar la lista de los productos actualizado
    */
    useEffect(()=>{
        loadProcuts();
    }, []);//Como no estamos esperando ningún cambio, se pone esto, es decir, cuando se haga el prev
 
    //Crear / Editar
    const saveProduct = async () => {
        try{
           
            if(selectedProduct.id){
                await api.put(`/${selectedProduct.id}`, selectedProduct);
            }else{
                await api.post(`/`, selectedProduct);
            }
 
            await loadProcuts();
            setModalEdit(false);
            setSelectedProduct(emptyProduct);
 
        }catch(err){
            console.error(`Error inesperado: ${err}`);
        }
    }
 
    //Borrar
    const deleteProduct = async () => {
        if(selectedProduct.id){
            try{
                await api.delete(`/${selectedProduct.id}`);
                await loadProcuts();
                setModalDelete(false);
                setSelectedProduct(emptyProduct);
 
            }catch(err){
                console.error(`Error inesperado: ${err}`);
            }
        }else{
            return;
        }
    }
 
    //Filtrado
    const filteredData = data.filter(p=>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase())  
    );
 
   
   
 
    //Paginación
    const totalPages = Math.ceil(filteredData.length/itemsPerPage);
    const startIndex = (currentPage-1) * itemsPerPage;//Para donde voy a empezar a pintar
    const paginatedData = filteredData.slice(startIndex, startIndex+itemsPerPage);
   
    const goToPage = (page:number) => {
 
        // Allow llegar tanto a la primera como a la última página
        if(page < 1 || page > totalPages){
            return;
        }
 
        setCurrentPage(page);
 
    }
 
 
    // Se utiliza el estado 'loading' para mostrar un indicador de carga si es necesario.
    if (loading) {
        return <div>Cargando...</div>;
    }
 
    return(
        <div className="App">
            <div className="d-flex mb-2 justify-content-between">
               
                <Button color="success" onClick={()=>{
                    setSelectedProduct(emptyProduct);
                    setModalEdit(true);
                }}>Add Product</Button>
 
                {/*Busqueda*/}
                <input
                    type="text"
                    placeholder="Search products..."
                    className="form-control"
                    value={search}
                    onChange={(e)=>{
                        setSearch(e.target.value);
                        setCurrentPage(1);
                    }}
                />
               
            </div>
 
            <table className="table table-stripped table-bordered">
                <thead>
                    <tr className="bg-info text-white text-center h4 p-2">
                        Products
                    </tr>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th className="text-end">Price</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedData.map(p=>(
                        <tr key={p.id}>
                            <td>{p.id}</td>
                            <td>{p.name}</td>
                            <td>{p.category}</td>
                            <td className="text-end">{p.price}</td>
                            <td>
                                <Button color="primary" size="sm" onClick={()=>{
                                    setSelectedProduct(p);
                                    setModalEdit(true);
                                }}>Edit</Button></td>
                            <td>
                                 <Button color="danger" size="sm" onClick={()=>{
                                    setSelectedProduct(p);
                                    setModalDelete(true);
                                }}>Delete</Button>    
                            </td>
                        </tr>
                    ))
 
                    }
                   
                </tbody>
            </table>
 
            <div>
                {/* Paginación */}
                <Button color="secondary" size="sm" disabled={currentPage === 1}
                    onClick={()=> {
                        goToPage(1);
                    }}>{"<--"}</Button>
 
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
                <Button
                        key={pageNum}
                        color={pageNum === currentPage ? "primary":"secondary"}
                        disabled={pageNum===currentPage}
                        size="sm"
                        onClick={()=>{
                            goToPage(pageNum);
                        }}
                >
                        {pageNum}
                </Button>
                ))}
 
                <Button color="secondary" size="sm" disabled={currentPage === totalPages}
                      onClick={()=> {
                        goToPage(totalPages);
                    }}>{"-->"}</Button>
            </div>
 
            <Modal isOpen={modalEdit} toggle={()=>setModalEdit(!modalEdit)}>
                <ModalHeader toggle={()=>setModalEdit(!modalEdit)}>{selectedProduct.id? "Edit Product" : "Add Product"}</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label>Name</Label>
                            <Input
                            value={selectedProduct.name}
                            onChange={e=>
                            setSelectedProduct({...selectedProduct, name:e.target.value})}/>
                        </FormGroup>

                        <FormGroup>
                            <Label>Category</Label>
                            <Input
                            value={selectedProduct.category}
                            onChange={e=>
                            setSelectedProduct({...selectedProduct, category:e.target.value})}/>
                        </FormGroup>

                        <FormGroup>
                            <Label>Price</Label>
                            <Input
                            value={selectedProduct.price}
                            onChange={e=>
                            setSelectedProduct({...selectedProduct, price:Number(e.target.value)})}/>
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={saveProduct}>
                        Save
                    </Button>
                    <Button color="secondary" onClick={()=>setModalEdit(false)}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
            <Modal isOpen={modalDelete} toggle={()=>setModalDelete(!modalDelete)}>
                <ModalHeader toggle={()=>setModalDelete(!modalDelete)}>Delete Product</ModalHeader>
                <ModalBody>
                    Are you sure you want to delete the product <strong>{selectedProduct.name}</strong>?
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={deleteProduct}>
                        Delete
                    </Button>
                    <Button color="secondary" onClick={()=>setModalDelete(false)}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
 
        </div>
 
       
    )
}
 
export default ProductsTable;
```

---

## 📝 Explicación Detallada del Componente ProductsTable

Ahora vamos a desglosar **cada parte** del componente para entender su funcionamiento.

### Sección 1: Importaciones

```tsx
import {
    Button,    // Botón interactivo de Reactstrap
    Modal,     // Contenedor del modal
    ModalBody, // Cuerpo del modal (contenido principal)
    ModalHeader, // Cabecera del modal (título y botón cerrar)
    Form,      // Contenedor del formulario
    FormGroup, // Agrupa un label con su input
    Label,     // Etiqueta del input
    ModalFooter, // Pie del modal (botones de acción)
    Input      // Campo de entrada de datos
} from "reactstrap"

import type { Producto } from "../models/Producto"  // Nuestra interfaz
import { useEffect, useState } from "react"         // Hooks de React
import { api } from "../services/api";              // Cliente API configurado
```

**Explicación:**
- Importamos todos los componentes de **Reactstrap** que necesitaremos para construir la interfaz
- Importamos la interfaz `Producto` con `type` (solo para tipos, no código ejecutable)
- Importamos `useState` para manejar el estado local del componente
- Importamos `useEffect` para ejecutar código cuando el componente se monta
- Importamos nuestra instancia configurada de `api` para hacer peticiones HTTP

---

### Sección 2: Objeto Producto Vacío

```tsx
const emptyProduct: Producto = {
    name:"",
    category:"",
    price:0
}
```

**¿Para qué sirve este objeto?**

Este objeto se usa para:
1. **Inicializar el formulario vacío** cuando queremos crear un producto nuevo
2. **Limpiar el formulario** después de guardar o cancelar
3. **Resetear el estado** del producto seleccionado

**Observa que:**
- No tiene `id` (porque es opcional y se asigna en la BD)
- Tiene valores por defecto válidos para cada campo
- Cumple con la interfaz `Producto`

---

### Sección 3: Estados del Componente (Hooks)

```tsx
function ProductsTable(){
 
    const [data, setData]=useState<Producto[]>([]);
    const [loading, setLodaing]=useState(false);
 
    const[modalEdit, setModalEdit]=useState(false);
    const[modalDelete, setModalDelete]=useState(false);
 
    const[selectedProduct, setSelectedProduct]=useState<Producto>(emptyProduct);
    const[search, setSearch]=useState("");
 
    const [currentPage, setCurrentPage]=useState(1);
    const itemsPerPage = 5;
```

**Explicación detallada de cada estado:**

#### 1. Estado de Datos

```tsx
const [data, setData]=useState<Producto[]>([]);
```

- **`data`**: Array que almacena todos los productos de la base de datos
- **`setData`**: Función para actualizar el array de productos
- **`<Producto[]>`**: TypeScript verifica que sea un array de productos
- **`[]`**: Se inicializa vacío (se llenará con la API)

#### 2. Estado de Carga

```tsx
const [loading, setLodaing]=useState(false);
```

- **`loading`**: Booleano que indica si está cargando datos
- **`setLodaing`**: Función para cambiar el estado de carga
- **Nota**: Hay un typo en el nombre (`setLodaing` en lugar de `setLoading`), pero funciona igual

**¿Para qué se usa?**
- Mostrar un mensaje "Cargando..." mientras se obtienen datos de la API
- Deshabilitar botones mientras se procesan acciones
- Mejorar la experiencia de usuario

#### 3. Estados de Modales

```tsx
const[modalEdit, setModalEdit]=useState(false);
const[modalDelete, setModalDelete]=useState(false);
```

- **`modalEdit`**: Controla si el modal de crear/editar está visible
- **`modalDelete`**: Controla si el modal de confirmación de borrado está visible
- Ambos inician en `false` (ocultos)

**¿Cómo funcionan?**
- Cuando `modalEdit` es `true` → se muestra el modal de edición
- Cuando `modalDelete` es `true` → se muestra el modal de confirmación

#### 4. Estado del Producto Seleccionado

```tsx
const[selectedProduct, setSelectedProduct]=useState<Producto>(emptyProduct);
```

- **`selectedProduct`**: Almacena el producto que estamos editando o borrando
- Se inicializa con `emptyProduct` (vacío)
- Se actualiza cuando:
  - Hacemos clic en "Add Product" (se limpia con `emptyProduct`)
  - Hacemos clic en "Edit" (se carga con los datos del producto)
  - Hacemos clic en "Delete" (se carga con los datos del producto a borrar)

#### 5. Estado de Búsqueda

```tsx
const[search, setSearch]=useState("");
```

- **`search`**: Almacena el texto que el usuario escribe en el buscador
- Se inicializa vacío
- Se actualiza en tiempo real con cada tecla presionada

#### 6. Estados de Paginación

```tsx
const [currentPage, setCurrentPage]=useState(1);
const itemsPerPage = 5;
```

- **`currentPage`**: Número de la página actual (inicia en 1)
- **`itemsPerPage`**: Constante que define cuántos productos mostrar por página
  - **No es un estado** porque nunca cambia
  - Se usa para calcular qué productos mostrar

---

### Sección 4: Función para Cargar Productos

```tsx
//Cargar Productos
//Carga de datos desde la base de datos (Cargar los productos)
const loadProcuts = async () => {

   setLodaing(true);  // ← Activamos el indicador de carga

   try{

        const res = await api.get<Producto[]>("/");  // ← Petición GET a la API

        setData(res.data);  // ← Guardamos los datos en el estado

   }catch(err){
        console.error(`Error inesperado: ${err}`);  // ← Manejamos errores
   } finally{
        setLodaing(false);  // ← Siempre desactivamos el indicador
   }
}
```

**Explicación paso a paso:**

#### 1. Definición de la función asíncrona

```tsx
const loadProcuts = async () => {
```

- Es `async` porque necesitamos esperar la respuesta de la API
- No recibe parámetros porque siempre carga todos los productos

#### 2. Activar indicador de carga

```tsx
setLodaing(true);
```

- Cambiamos `loading` a `true`
- Esto hará que se muestre "Cargando..." en la interfaz
- Importante hacerlo ANTES de la petición

#### 3. Realizar la petición HTTP

```tsx
try{
    const res = await api.get<Producto[]>("/");
    setData(res.data);
```

- **`await`**: Esperamos a que la petición termine
- **`api.get<Producto[]>("/")`**: 
  - Llamada GET a la ruta base de la API
  - `<Producto[]>` indica que esperamos un array de productos
  - `"/"` se concatena con la `baseURL` configurada en `api.ts`
  - URL completa: `https://localhost:44326/Products_DB/`
- **`res.data`**: Contiene el array de productos de la respuesta
- **`setData(res.data)`**: Actualizamos el estado con los productos obtenidos

#### 4. Manejo de errores

```tsx
}catch(err){
    console.error(`Error inesperado: ${err}`);
```

- Si hay cualquier error (red, servidor, etc.), lo capturamos
- Lo mostramos en la consola para debugging
- La aplicación no se rompe gracias al `try-catch`

#### 5. Bloque finally

```tsx
} finally{
    setLodaing(false);
}
```

- **`finally`** se ejecuta SIEMPRE, haya error o no
- Desactivamos el indicador de carga
- Asegura que la UI no quede bloqueada mostrando "Cargando..." eternamente

---

### Sección 5: Hook useEffect para Carga Inicial

```tsx
/*
    Básicamente lo usamos para que cuando haya CUALQUIER tipo de cambio dentro de la vista,
    va a recuperar la lista de los productos actualizado
*/
useEffect(()=>{
    loadProcuts();
}, []);
```

**Explicación:**

#### ¿Qué es useEffect?

`useEffect` es un hook que ejecuta código en momentos específicos del ciclo de vida del componente.

#### Sintaxis

```tsx
useEffect(() => {
    // Código a ejecutar
}, [dependencias]);
```

#### En nuestro caso:

```tsx
useEffect(()=>{
    loadProcuts();  // ← Cargamos los productos
}, []);  // ← Array vacío = solo se ejecuta UNA VEZ
```

**Desglose:**

1. **Primer parámetro**: Función que se ejecutará
   - En nuestro caso: `loadProcuts()`
   - Carga los productos desde la API

2. **Segundo parámetro**: Array de dependencias `[]`
   - **Array vacío `[]`** significa: "Ejecuta esto solo cuando el componente se monta"
   - Es como el `componentDidMount` de los componentes de clase
   - Solo se ejecuta **una vez** cuando la página carga

**¿Por qué es importante?**
- Sin esto, la tabla estaría vacía al cargar la página
- Automáticamente carga los datos cuando el usuario entra a la aplicación
- No necesitamos un botón "Cargar" manual

---

### Sección 6: Función Guardar Producto (Crear/Editar)

```tsx
//Crear / Editar
const saveProduct = async () => {
    try{
       
        if(selectedProduct.id){
            await api.put(`/${selectedProduct.id}`, selectedProduct);
        }else{
            await api.post(`/`, selectedProduct);
        }

        await loadProcuts();
        setModalEdit(false);
        setSelectedProduct(emptyProduct);

    }catch(err){
        console.error(`Error inesperado: ${err}`);
    }
}
```

**Explicación detallada:**

#### Decisión: ¿Crear o Editar?

```tsx
if(selectedProduct.id){
    await api.put(`/${selectedProduct.id}`, selectedProduct);
}else{
    await api.post(`/`, selectedProduct);
}
```

**Lógica:**

1. **Si `selectedProduct.id` existe** (producto existente):
   ```tsx
   await api.put(`/${selectedProduct.id}`, selectedProduct);
   ```
   - Usamos `PUT` para **actualizar**
   - URL: `https://localhost:44326/Products_DB/5` (si id=5)
   - Enviamos el objeto completo `selectedProduct`

2. **Si `selectedProduct.id` NO existe** (producto nuevo):
   ```tsx
   await api.post(`/`, selectedProduct);
   ```
   - Usamos `POST` para **crear**
   - URL: `https://localhost:44326/Products_DB/`
   - El servidor asignará el ID automáticamente

#### Acciones después de guardar

```tsx
await loadProcuts();          // ← Recargamos la lista completa
setModalEdit(false);          // ← Cerramos el modal
setSelectedProduct(emptyProduct); // ← Limpiamos el formulario
```

**¿Por qué recargar `loadProcuts()`?**
- Asegura que la tabla muestre los datos más recientes
- Si creamos un producto, aparecerá en la lista
- Si editamos un producto, se actualizará en la tabla

**¿Por qué limpiar con `emptyProduct`?**
- Previene que el formulario muestre datos antiguos la próxima vez
- Resetea el estado a su valor inicial

---

### Sección 7: Función Eliminar Producto

```tsx
//Borrar
const deleteProduct = async () => {
    if(selectedProduct.id){
        try{
            await api.delete(`/${selectedProduct.id}`);
            await loadProcuts();
            setModalDelete(false);
            setSelectedProduct(emptyProduct);

        }catch(err){
            console.error(`Error inesperado: ${err}`);
        }
    }else{
        return;
    }
}
```

**Explicación:**

#### Validación de seguridad

```tsx
if(selectedProduct.id){
    // ... código de borrado
}else{
    return;  // ← No hacer nada si no hay ID
}
```

**¿Por qué esta validación?**
- **Seguridad**: No podemos borrar un producto sin ID
- Previene errores en la API
- Si accidentalmente se llama sin producto seleccionado, no pasa nada

#### Petición DELETE

```tsx
await api.delete(`/${selectedProduct.id}`);
```

- **Método HTTP**: DELETE
- **URL completa**: `https://localhost:44326/Products_DB/5` (si id=5)
- La API elimina el producto de la base de datos

#### Actualización de la UI

```tsx
await loadProcuts();              // ← Recargamos la lista
setModalDelete(false);            // ← Cerramos el modal de confirmación
setSelectedProduct(emptyProduct); // ← Limpiamos la selección
```

**Flujo completo:**
1. Usuario hace clic en "Delete"
2. Se abre modal de confirmación
3. Usuario confirma
4. Se ejecuta `deleteProduct()`
5. Se elimina de la BD
6. Se recarga la lista (el producto ya no aparece)
7. Se cierra el modal
8. Se limpia la selección

---

### Sección 8: Sistema de Filtrado (Buscador)

```tsx
//Filtrado
const filteredData = data.filter(p=>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())  
);
```

**Explicación muy detallada:**

#### ¿Qué es `filter`?

`filter()` es un método de arrays que crea un nuevo array con todos los elementos que cumplan una condición.

#### Sintaxis general:

```tsx
const resultado = array.filter(elemento => {
    return condicion; // true o false
});
```

#### En nuestro caso:

```tsx
const filteredData = data.filter(p=>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())  
);
```

#### Desglose paso a paso:

1. **`data.filter(p => ...)`**
   - Recorre cada producto (`p`) del array `data`
   - `p` es la variable que representa cada producto en la iteración

2. **`p.name.toLowerCase()`**
   - Toma el nombre del producto
   - Lo convierte a minúsculas
   - Ejemplo: "Laptop" → "laptop"

3. **`.includes(search.toLowerCase())`**
   - Verifica si el nombre contiene el texto de búsqueda
   - También convierte la búsqueda a minúsculas
   - Ejemplo: si `search = "lap"`, buscará si "laptop" incluye "lap"

4. **Operador `||` (OR)**
   - Si el nombre contiene el texto **O** la categoría contiene el texto
   - Basta con que UNO de los dos cumpla la condición

5. **`p.category.toLowerCase().includes(search.toLowerCase())`**
   - Misma lógica pero para la categoría

#### Ejemplo práctico:

**Datos:**
```tsx
data = [
    { id: 1, name: "Laptop", category: "Electronics", price: 999 },
    { id: 2, name: "Mouse", category: "Electronics", price: 25 },
    { id: 3, name: "Shirt", category: "Clothing", price: 30 }
]
```

**Búsqueda:** `search = "elec"`

**Resultado:**
```tsx
filteredData = [
    { id: 1, name: "Laptop", category: "Electronics", price: 999 },
    { id: 2, name: "Mouse", category: "Electronics", price: 25 }
]
```

**¿Por qué?**
- "Laptop" no contiene "elec" en el nombre, pero "Electronics" sí contiene "elec"
- "Mouse" tampoco contiene "elec", pero "Electronics" sí
- "Shirt" no contiene "elec" ni en nombre ni en categoría

**Ventajas de usar `toLowerCase()`:**
- Búsqueda insensible a mayúsculas/minúsculas
- "Elec", "ELEC", "elec" funcionan igual

---

### Sección 9: Sistema de Paginación

Esta es una de las partes más complejas y útiles del componente.

```tsx
//Paginación
const totalPages = Math.ceil(filteredData.length/itemsPerPage);
const startIndex = (currentPage-1) * itemsPerPage;
const paginatedData = filteredData.slice(startIndex, startIndex+itemsPerPage);

const goToPage = (page:number) => {

    // Allow llegar tanto a la primera como a la última página
    if(page < 1 || page > totalPages){
        return;
    }

    setCurrentPage(page);

}
```

#### 📊 Cálculo del Total de Páginas

```tsx
const totalPages = Math.ceil(filteredData.length/itemsPerPage);
```

**Desglose:**

1. **`filteredData.length`**: Número total de productos filtrados
2. **`itemsPerPage`**: Productos por página (5 en nuestro caso)
3. **División**: `filteredData.length / itemsPerPage`
4. **`Math.ceil()`**: Redondea hacia arriba

**Ejemplo práctico:**

| Productos | Cálculo | Resultado |
|-----------|---------|-----------|
| 12 | ceil(12/5) = ceil(2.4) | 3 páginas |
| 5 | ceil(5/5) = ceil(1) | 1 página |
| 17 | ceil(17/5) = ceil(3.4) | 4 páginas |

**¿Por qué `ceil` (redondear hacia arriba)?**
- Si hay 12 productos y mostramos 5 por página:
  - Página 1: 5 productos
  - Página 2: 5 productos
  - Página 3: 2 productos
- Necesitamos 3 páginas, no 2.4 páginas

---

#### 📍 Cálculo del Índice Inicial

```tsx
const startIndex = (currentPage-1) * itemsPerPage;
```

**¿Qué hace?**
Calcula desde qué posición del array empezar a mostrar productos.

**Ejemplo:**

| Página | Cálculo | Índice Inicial |
|--------|---------|----------------|
| 1 | (1-1) × 5 = 0 | Empieza en 0 |
| 2 | (2-1) × 5 = 5 | Empieza en 5 |
| 3 | (3-1) × 5 = 10 | Empieza en 10 |

**Visualización con datos:**

```
Array completo: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

Página 1: índice 0-4  → [0, 1, 2, 3, 4]
Página 2: índice 5-9  → [5, 6, 7, 8, 9]
Página 3: índice 10-14 → [10, 11, 12]
```

---

#### ✂️ Extracción de Datos de la Página

```tsx
const paginatedData = filteredData.slice(startIndex, startIndex+itemsPerPage);
```

**¿Qué hace `slice`?**
Extrae una porción del array sin modificar el original.

**Sintaxis:**
```tsx
array.slice(inicio, fin)
```

**En nuestro caso:**
- **inicio**: `startIndex`
- **fin**: `startIndex + itemsPerPage`

**Ejemplo completo:**

```tsx
// Datos filtrados
filteredData = [
    { id: 1, name: "Laptop" },
    { id: 2, name: "Mouse" },
    { id: 3, name: "Keyboard" },
    { id: 4, name: "Monitor" },
    { id: 5, name: "Webcam" },
    { id: 6, name: "Headset" },
    { id: 7, name: "Microphone" }
]

// Página 1
currentPage = 1
startIndex = 0
paginatedData = filteredData.slice(0, 5)
// Resultado: [Laptop, Mouse, Keyboard, Monitor, Webcam]

// Página 2
currentPage = 2
startIndex = 5
paginatedData = filteredData.slice(5, 10)
// Resultado: [Headset, Microphone]
```

---

#### 🔘 Función de Navegación

```tsx
const goToPage = (page:number) => {

    // Allow llegar tanto a la primera como a la última página
    if(page < 1 || page > totalPages){
        return;
    }

    setCurrentPage(page);

}
```

**Validaciones de seguridad:**

```tsx
if(page < 1 || page > totalPages){
    return;  // No hacer nada
}
```

**Previene:**
- Ir a páginas negativas o cero
- Ir más allá de la última página
- Errores de visualización

**Ejemplo:**
- Si hay 3 páginas totales:
  - `goToPage(0)` → No hace nada
  - `goToPage(2)` → Va a la página 2
  - `goToPage(5)` → No hace nada

---

### Sección 10: Indicador de Carga

```tsx
// Se utiliza el estado 'loading' para mostrar un indicador de carga si es necesario.
if (loading) {
    return <div>Cargando...</div>;
}
```

**¿Cuándo se muestra?**
- Mientras `loading` sea `true`
- Durante la carga inicial de productos
- Mientras se procesa cualquier operación asíncrona

**¿Por qué es importante?**
- Feedback visual para el usuario
- Evita confusión (el usuario sabe que algo está pasando)
- Previene clics múltiples mientras se procesa algo

---

### Sección 11: Renderizado del Componente - Cabecera

```tsx
return(
    <div className="App">
        <div className="d-flex mb-2 justify-content-between">
           
            <Button color="success" onClick={()=>{
                setSelectedProduct(emptyProduct);
                setModalEdit(true);
            }}>Add Product</Button>

            {/*Busqueda*/}
            <input
                type="text"
                placeholder="Search products..."
                className="form-control"
                value={search}
                onChange={(e)=>{
                    setSearch(e.target.value);
                    setCurrentPage(1);
                }}
            />
           
        </div>
```

**Explicación de la barra superior:**

#### Contenedor Flex

```tsx
<div className="d-flex mb-2 justify-content-between">
```

- **`d-flex`**: Activa Flexbox (elementos en línea horizontal)
- **`mb-2`**: Margin bottom de 2 unidades
- **`justify-content-between`**: Espacio máximo entre elementos (uno a la izquierda, otro a la derecha)

#### Botón Add Product

```tsx
<Button color="success" onClick={()=>{
    setSelectedProduct(emptyProduct);
    setModalEdit(true);
}}>Add Product</Button>
```

**Acciones del onClick:**

1. **`setSelectedProduct(emptyProduct)`**
   - Limpia el formulario
   - Pone todos los campos vacíos
   - Prepara para crear un producto nuevo

2. **`setModalEdit(true)`**
   - Abre el modal de edición
   - Como el producto está vacío, mostrará "Add Product" en el título

#### Campo de Búsqueda

```tsx
<input
    type="text"
    placeholder="Search products..."
    className="form-control"
    value={search}
    onChange={(e)=>{
        setSearch(e.target.value);
        setCurrentPage(1);
    }}
/>
```

**Propiedades:**

1. **`value={search}`**
   - Input controlado por React
   - El valor siempre refleja el estado `search`
   - React controla completamente el input

2. **`onChange`**:
   ```tsx
   onChange={(e)=>{
       setSearch(e.target.value);  // ← Actualiza el texto de búsqueda
       setCurrentPage(1);           // ← Vuelve a la página 1
   }}
   ```

**¿Por qué `setCurrentPage(1)`?**
- Si estás en la página 3 y buscas algo nuevo
- Los resultados filtrados pueden ser menos
- Es mejor volver a la página 1 automáticamente
- Evita estar en una página vacía

---

### Sección 12: Renderizado - Tabla de Productos

```tsx
<table className="table table-stripped table-bordered">
    <thead>
        <tr className="bg-info text-white text-center h4 p-2">
            Products
        </tr>
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Category</th>
            <th className="text-end">Price</th>
            <th></th>
            <th></th>
        </tr>
    </thead>
    <tbody>
        {paginatedData.map(p=>(
            <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.name}</td>
                <td>{p.category}</td>
                <td className="text-end">{p.price}</td>
                <td>
                    <Button color="primary" size="sm" onClick={()=>{
                        setSelectedProduct(p);
                        setModalEdit(true);
                    }}>Edit</Button></td>
                <td>
                     <Button color="danger" size="sm" onClick={()=>{
                        setSelectedProduct(p);
                        setModalDelete(true);
                    }}>Delete</Button>    
                </td>
            </tr>
        ))

        }
       
    </tbody>
</table>
```

**Explicación de la tabla:**

#### Cabecera de la Tabla

```tsx
<thead>
    <tr className="bg-info text-white text-center h4 p-2">
        Products
    </tr>
    <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Category</th>
        <th className="text-end">Price</th>
        <th></th>
        <th></th>
    </tr>
</thead>
```

**Primera fila:**
- Título general "Products" con fondo azul

**Segunda fila:**
- Encabezados de las columnas
- Las dos últimas `<th>` están vacías (para los botones Edit/Delete)

#### Cuerpo de la Tabla

```tsx
<tbody>
    {paginatedData.map(p=>(
        <tr key={p.id}>
            ...
        </tr>
    ))}
</tbody>
```

**¿Qué hace `.map()`?**
- Recorre cada producto de `paginatedData`
- Crea una fila `<tr>` por cada producto
- `key={p.id}` es obligatorio en React para identificar elementos únicos

#### Botón Edit

```tsx
<Button color="primary" size="sm" onClick={()=>{
    setSelectedProduct(p);
    setModalEdit(true);
}}>Edit</Button>
```

**Acciones:**

1. **`setSelectedProduct(p)`**
   - Guarda el producto completo en el estado
   - El formulario se llenará con estos datos

2. **`setModalEdit(true)`**
   - Abre el modal
   - Como el producto tiene ID, mostrará "Edit Product" en el título

#### Botón Delete

```tsx
<Button color="danger" size="sm" onClick={()=>{
    setSelectedProduct(p);
    setModalDelete(true);
}}>Delete</Button>
```

**Acciones:**

1. **`setSelectedProduct(p)`**
   - Guarda el producto a eliminar

2. **`setModalDelete(true)`**
   - Abre el modal de confirmación
   - Mostrará el nombre del producto a borrar

---

## 🎯 Funcionalidades Avanzadas

Ahora vamos a profundizar en las tres funcionalidades más complejas del proyecto:

---

## 🔹 Sistema de Modales

Los modales son ventanas emergentes que aparecen sobre el contenido principal.

### Modal de Edición/Creación

```tsx
<Modal isOpen={modalEdit} toggle={()=>setModalEdit(!modalEdit)}>
    <ModalHeader toggle={()=>setModalEdit(!modalEdit)}>
        {selectedProduct.id? "Edit Product" : "Add Product"}
    </ModalHeader>
    <ModalBody>
        <Form>
            <FormGroup>
                <Label>Name</Label>
                <Input
                value={selectedProduct.name}
                onChange={e=>
                setSelectedProduct({...selectedProduct, name:e.target.value})}/>
            </FormGroup>

            <FormGroup>
                <Label>Category</Label>
                <Input
                value={selectedProduct.category}
                onChange={e=>
                setSelectedProduct({...selectedProduct, category:e.target.value})}/>
            </FormGroup>

            <FormGroup>
                <Label>Price</Label>
                <Input
                value={selectedProduct.price}
                onChange={e=>
                setSelectedProduct({...selectedProduct, price:Number(e.target.value)})}/>
            </FormGroup>
        </Form>
    </ModalBody>
    <ModalFooter>
        <Button color="primary" onClick={saveProduct}>
            Save
        </Button>
        <Button color="secondary" onClick={()=>setModalEdit(false)}>
            Cancel
        </Button>
    </ModalFooter>
</Modal>
```

**Explicación detallada:**

#### Propiedades del Modal

```tsx
<Modal isOpen={modalEdit} toggle={()=>setModalEdit(!modalEdit)}>
```

1. **`isOpen={modalEdit}`**
   - Controla la visibilidad del modal
   - Si `modalEdit` es `true` → modal visible
   - Si `modalEdit` es `false` → modal oculto

2. **`toggle={()=>setModalEdit(!modalEdit)}`**
   - Función que invierte el estado
   - Si está abierto, lo cierra
   - Si está cerrado, lo abre
   - Se ejecuta al hacer clic en:
     - El botón X de la cabecera
     - El fondo oscuro detrás del modal

#### Título Dinámico

```tsx
<ModalHeader toggle={()=>setModalEdit(!modalEdit)}>
    {selectedProduct.id? "Edit Product" : "Add Product"}
</ModalHeader>
```

**Lógica condicional:**
- **Si `selectedProduct.id` existe** → "Edit Product"
- **Si `selectedProduct.id` es undefined** → "Add Product"

**¿Por qué funciona?**
- Al crear un producto nuevo, usamos `emptyProduct` (sin ID)
- Al editar, el producto ya tiene ID de la base de datos

#### Inputs Controlados

```tsx
<Input
    value={selectedProduct.name}
    onChange={e=>
    setSelectedProduct({...selectedProduct, name:e.target.value})}/>
```

**Desglose del onChange:**

1. **`e.target.value`**
   - Captura el texto que el usuario escribe

2. **`{...selectedProduct, name:e.target.value}`**
   - **Spread operator** `...selectedProduct`: Copia todas las propiedades del producto
   - `, name:e.target.value`: Sobrescribe solo la propiedad `name`
   - El resto de propiedades (category, price, id) se mantienen

**Ejemplo:**

```tsx
// Estado inicial
selectedProduct = { id: 5, name: "Laptop", category: "Electronics", price: 999 }

// Usuario escribe "Gaming Laptop"
setSelectedProduct({
    ...selectedProduct,        // Copia: id:5, name:"Laptop", category:"Electronics", price:999
    name: "Gaming Laptop"      // Sobrescribe: name:"Gaming Laptop"
})

// Resultado final
selectedProduct = { id: 5, name: "Gaming Laptop", category: "Electronics", price: 999 }
```

#### Input del Precio

```tsx
<Input
    value={selectedProduct.price}
    onChange={e=>
    setSelectedProduct({...selectedProduct, price:Number(e.target.value)})}/>
```

**Diferencia importante:**
```tsx
price:Number(e.target.value)
```

- **`Number()`**: Convierte el string a número
- Los inputs HTML siempre devuelven strings
- Nuestra interfaz espera `price:number`

**Sin `Number()`:**
```tsx
price: "999"  // ❌ String (incorrecto)
```

**Con `Number()`:**
```tsx
price: 999    // ✅ Number (correcto)
```

#### Footer con Botones

```tsx
<ModalFooter>
    <Button color="primary" onClick={saveProduct}>
        Save
    </Button>
    <Button color="secondary" onClick={()=>setModalEdit(false)}>
        Cancel
    </Button>
</ModalFooter>
```

**Botón Save:**
- Llama a `saveProduct()`
- Decide automáticamente si crear o editar
- Cierra el modal al terminar (dentro de `saveProduct`)

**Botón Cancel:**
- Solo cierra el modal
- No guarda cambios
- No llama a la API

---

### Modal de Confirmación de Borrado

```tsx
<Modal isOpen={modalDelete} toggle={()=>setModalDelete(!modalDelete)}>
    <ModalHeader toggle={()=>setModalDelete(!modalDelete)}>Delete Product</ModalHeader>
    <ModalBody>
        Are you sure you want to delete the product <strong>{selectedProduct.name}</strong>?
    </ModalBody>
    <ModalFooter>
        <Button color="primary" onClick={deleteProduct}>
            Delete
        </Button>
        <Button color="secondary" onClick={()=>setModalDelete(false)}>
            Cancel
        </Button>
    </ModalFooter>
</Modal>
```

**¿Por qué un modal de confirmación?**
- Previene borrados accidentales
- Muestra el nombre del producto a borrar
- Da oportunidad de cancelar

**Flujo completo:**
1. Usuario hace clic en botón "Delete" de un producto
2. Se guarda el producto en `selectedProduct`
3. Se abre `modalDelete`
4. Usuario lee: "¿Seguro que quieres borrar **Laptop**?"
5. Opciones:
   - **Delete**: Ejecuta `deleteProduct()` → Borra de la BD → Cierra modal
   - **Cancel**: Solo cierra el modal → No borra nada

---

## 🔍 Buscador de Productos

Ya vimos la implementación, ahora veamos el **flujo completo** en acción:

### Flujo de Búsqueda Completo

```
1. Usuario escribe en el input
   ↓
2. Se ejecuta onChange
   ↓
3. setSearch(e.target.value)  → Actualiza el estado search
   ↓
4. setCurrentPage(1)           → Vuelve a la página 1
   ↓
5. React re-renderiza el componente
   ↓
6. Se recalcula filteredData con el nuevo valor de search
   ↓
7. Se recalcula paginatedData con los datos filtrados
   ↓
8. La tabla muestra los productos filtrados
```

### Ejemplo Práctico Paso a Paso

**Datos iniciales:**
```tsx
data = [
    { id: 1, name: "Laptop", category: "Electronics", price: 999 },
    { id: 2, name: "Gaming Mouse", category: "Electronics", price: 50 },
    { id: 3, name: "Office Chair", category: "Furniture", price: 200 },
    { id: 4, name: "Desk Lamp", category: "Furniture", price: 30 },
    { id: 5, name: "Keyboard", category: "Electronics", price: 80 }
]
```

**Usuario escribe: "elec"**

1. **Estado actualizado:**
   ```tsx
   search = "elec"
   currentPage = 1
   ```

2. **Filtrado:**
   ```tsx
   filteredData = data.filter(p=>
       p.name.toLowerCase().includes("elec") ||
       p.category.toLowerCase().includes("elec")
   )
   
   // Resultado:
   filteredData = [
       { id: 1, name: "Laptop", category: "Electronics", price: 999 },
       { id: 2, name: "Gaming Mouse", category: "Electronics", price: 50 },
       { id: 5, name: "Keyboard", category: "Electronics", price: 80 }
   ]
   ```

3. **Paginación:**
   ```tsx
   totalPages = Math.ceil(3/5) = 1
   startIndex = 0
   paginatedData = filteredData.slice(0, 5)
   
   // Todos los resultados caben en una página
   ```

4. **Tabla muestra:**
   - Laptop
   - Gaming Mouse
   - Keyboard

---

## 📄 Sistema de Paginación

La paginación es la funcionalidad más compleja. Veamos su renderizado:

### Renderizado de los Controles de Paginación

```tsx
<div>
    {/* Paginación */}
    <Button color="secondary" size="sm" disabled={currentPage === 1}
        onClick={()=> {
            goToPage(1);
        }}>{"<--"}</Button>

    {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
    <Button
            key={pageNum}
            color={pageNum === currentPage ? "primary":"secondary"}
            disabled={pageNum===currentPage}
            size="sm"
            onClick={()=>{
                goToPage(pageNum);
            }}
    >
            {pageNum}
    </Button>
    ))}

    <Button color="secondary" size="sm" disabled={currentPage === totalPages}
          onClick={()=> {
            goToPage(totalPages);
        }}>{"-->"}</Button>
</div>
```

**Explicación detallada:**

#### Botón "Ir al Inicio"

```tsx
<Button color="secondary" size="sm" disabled={currentPage === 1}
    onClick={()=> {
        goToPage(1);
    }}>{"<--"}</Button>
```

**Propiedades:**
- **`disabled={currentPage === 1}`**: Se deshabilita si ya estamos en la página 1
- **`onClick={()=> goToPage(1)}`**: Salta a la primera página

**Comportamiento:**
- Si estás en página 3, te lleva a página 1
- Si ya estás en página 1, el botón está deshabilitado (gris)

---

#### Botones Numéricos de Páginas

Esta es la parte más compleja y merece una explicación muy detallada:

```tsx
{Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
    <Button
        key={pageNum}
        color={pageNum === currentPage ? "primary":"secondary"}
        disabled={pageNum===currentPage}
        size="sm"
        onClick={()=>{
            goToPage(pageNum);
        }}
    >
        {pageNum}
    </Button>
))}
```

**Desglose paso a paso:**

##### 1. Creación del Array de Páginas

```tsx
Array.from({ length: totalPages }, (_, i) => i + 1)
```

**¿Qué hace `Array.from`?**
Crea un array a partir de un objeto iterable.

**Sintaxis:**
```tsx
Array.from(
    { length: N },        // Objeto con propiedad length
    (valor, índice) => { } // Función de mapeo
)
```

**En nuestro caso:**
```tsx
Array.from(
    { length: totalPages },  // Si totalPages=3, crea array de 3 elementos
    (_, i) => i + 1          // Transforma cada elemento
)
```

**Parámetros de la función:**
- **`_`**: Primer parámetro (el valor del elemento). Lo ignoramos con `_`
- **`i`**: Segundo parámetro (el índice): 0, 1, 2, 3...

**`=> i + 1`**: Devuelve el índice + 1

**Ejemplo:**

```tsx
// Si totalPages = 4

Array.from({ length: 4 }, (_, i) => i + 1)

// Iteraciones:
// i = 0 → devuelve 1
// i = 1 → devuelve 2
// i = 2 → devuelve 3
// i = 3 → devuelve 4

// Resultado: [1, 2, 3, 4]
```

**¿Por qué `i + 1` y no solo `i`?**
- Los índices empiezan en 0
- Las páginas empiezan en 1
- Queremos botones que digan "1", "2", "3", no "0", "1", "2"

---

##### 2. Mapeo a Botones

```tsx
.map(pageNum => (
    <Button ...>
        {pageNum}
    </Button>
))
```

**Por cada número de página, creamos un botón.**

**Ejemplo visual:**

```
Array [1, 2, 3, 4]
  ↓
Botones: [<Button>1</Button>] [<Button>2</Button>] [<Button>3</Button>] [<Button>4</Button>]
```

---

##### 3. Propiedades del Botón

```tsx
<Button
    key={pageNum}                                            // ← Identificador único
    color={pageNum === currentPage ? "primary":"secondary"}  // ← Color condicional
    disabled={pageNum===currentPage}                         // ← Deshabilitar actual
    size="sm"                                                // ← Tamaño pequeño
    onClick={()=>{goToPage(pageNum);}}                       // ← Navegar a página
>
    {pageNum}                                                // ← Número visible
</Button>
```

**1. `key={pageNum}`**
- React requiere keys únicas para listas
- Cada botón tiene un key diferente (1, 2, 3...)

**2. `color={pageNum === currentPage ? "primary":"secondary"}`**
- **Si es la página actual**: color azul (`primary`)
- **Si NO es la página actual**: color gris (`secondary`)
- Resalta visualmente la página actual

**3. `disabled={pageNum===currentPage}`**
- Deshabilita el botón de la página actual
- No tiene sentido hacer clic en la página donde ya estás

**4. `onClick={()=>{goToPage(pageNum);}}`**
- Al hacer clic, navega a esa página
- Actualiza `currentPage` con el número de página

---

##### Ejemplo Visual Completo

**Situación:**
- `totalPages = 5`
- `currentPage = 3`

**Resultado:**

```
[<--]  [1]  [2]  [3]  [4]  [5]  [-->]
              ⬆
       (botón azul y deshabilitado)
```

**Estados de los botones:**

| Botón | Color | Deshabilitado | Acción al clic |
|-------|-------|---------------|----------------|
| <-- | Gris | No | goToPage(1) |
| 1 | Gris | No | goToPage(1) |
| 2 | Gris | No | goToPage(2) |
| **3** | **Azul** | **Sí** | - |
| 4 | Gris | No | goToPage(4) |
| 5 | Gris | No | goToPage(5) |
| --> | Gris | No | goToPage(5) |

---

#### Botón "Ir al Final"

```tsx
<Button color="secondary" size="sm" disabled={currentPage === totalPages}
    onClick={()=> {
        goToPage(totalPages);
    }}>{"-->"}</Button>
```

**Similar al botón de inicio:**
- Salta a la última página
- Se deshabilita si ya estamos en la última página

---

### Flujo Completo de la Paginación

**Ejemplo con 12 productos:**

```tsx
// Estado inicial
data = [12 productos]
filteredData = [12 productos]  // Sin búsqueda, todos pasan
itemsPerPage = 5
totalPages = Math.ceil(12/5) = 3 páginas
currentPage = 1

// Página 1
startIndex = (1-1) * 5 = 0
paginatedData = filteredData.slice(0, 5)  // Productos 1-5
// Tabla muestra: Productos del índice 0 al 4

// Usuario hace clic en botón "2"
goToPage(2)
setCurrentPage(2)

// Página 2
startIndex = (2-1) * 5 = 5
paginatedData = filteredData.slice(5, 10)  // Productos 6-10
// Tabla muestra: Productos del índice 5 al 9

// Usuario hace clic en botón "3"
goToPage(3)
setCurrentPage(3)

// Página 3
startIndex = (3-1) * 5 = 10
paginatedData = filteredData.slice(10, 15)  // Productos 11-12
// Tabla muestra: Productos del índice 10 al 11 (solo 2 productos)
```

---

## 🎯 Punto de Entrada - main.tsx

### Paso Final: Configurar el Punto de Entrada

**Archivo Completo: `src/main.tsx`**

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

### 📝 Explicación Detallada

#### Importación de Bootstrap

```tsx
import 'bootstrap/dist/css/bootstrap.min.css'
```

**¡MUY IMPORTANTE!**
- Debe ir ANTES de importar cualquier componente
- Aplica los estilos de Bootstrap a toda la aplicación
- Sin esto, los componentes de Reactstrap no tendrán estilos

#### Creación del Root

```tsx
createRoot(document.getElementById('root')!)
```

- **`document.getElementById('root')`**: Busca el elemento con id="root" en `index.html`
- **`!`**: Operador de TypeScript que indica "estoy seguro de que existe"
- **`createRoot()`**: Crea el punto de entrada de React 18

#### Renderizado

```tsx
.render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

- **`<StrictMode>`**: Modo estricto que detecta problemas potenciales
- **`<App />`**: Nuestro componente principal

---

## 🎓 Resumen y Conclusiones

### Lo que hemos construido:

✅ **CRUD Completo**
- Create (POST)
- Read (GET)
- Update (PUT)
- Delete (DELETE)

✅ **Funcionalidades Avanzadas**
- Búsqueda en tiempo real
- Paginación de resultados
- Modales de confirmación
- Indicadores de carga

✅ **Mejores Prácticas**
- TypeScript para seguridad de tipos
- Componentes reutilizables
- Estado centralizado con hooks
- Manejo de errores con try-catch
- Validaciones de seguridad

---

## 📚 Conceptos Clave Aprendidos

### React Hooks
- **useState**: Manejo de estado local
- **useEffect**: Efectos secundarios y ciclo de vida

### Operaciones de Arrays
- **filter**: Filtrado de datos
- **map**: Transformación y renderizado de listas
- **slice**: Extracción de porciones de arrays

### Comunicación con API
- **GET**: Obtener datos
- **POST**: Crear recursos
- **PUT**: Actualizar recursos
- **DELETE**: Eliminar recursos

### TypeScript
- Interfaces para modelos de datos
- Tipado de estados y funciones
- Seguridad en tiempo de desarrollo

---

## 🚀 Próximos Pasos

**Mejoras sugeridas:**

1. **Validación de formularios**
   - Campos requeridos
   - Validación de precio positivo
   - Mensajes de error

2. **Notificaciones**
   - Toast messages al guardar/borrar
   - Alertas de error

3. **Ordenamiento**
   - Ordenar por nombre, precio, categoría
   - Ascendente/descendente

4. **Persistencia**
   - LocalStorage para preferencias
   - Recordar página actual

5. **Responsive**
   - Optimización móvil
   - Tabla responsive

---

## 🎯 Comandos para Ejecutar el Proyecto

```bash
# 1. Instalar dependencias
npm install

# 2. Ejecutar en modo desarrollo
npm run dev

# 3. Compilar para producción
npm run build

# 4. Vista previa de producción
npm run preview
```

---

## ✨ ¡Felicidades!

Has completado una aplicación React completa con TypeScript, conectada a una API REST, con funcionalidades avanzadas de búsqueda, paginación y modales.

Este proyecto es una base sólida para construir aplicaciones más complejas. ¡Sigue aprendiendo y mejorando! 🚀

---

**Última actualización:** Enero 2026  
**Versiones:** React 19.2.0 | TypeScript 5.9.3 | Vite 7.2.4