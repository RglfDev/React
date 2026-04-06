1. Instalamos las librerias necesarias para este proyecto, las cuales son:
    -
    -
    -

2. Necesitamos una solucion de tipo WebApi ( en este caso el proyecto de apiProdtucts situado en esta carpeta tambien).

3. Creamos un App sencillo de momento con este codigo:
function App() {
    return (
        <div className="container mt-4">
            <h1 className="text-primary"> Proyecto React+webAPI</h1>
        </div>
    )
}

export default App

4. Creamos la carpeta services y configuramos el archivo api.ts, que contendra la cadena de conexion y el headers: que va a tneer de tipo Content-type': application/json'

5. Creamos el modelo Producto.ts, el cual va a tener interfaces en vez de Types, con los atributos id, nombre, category, price.

6. Creamos la carpeta components para alojar los componentes. El primero va a ser productosTable.tsx.

7. ProductosTable.tsx: 
    - Traemos los elementos u objetos necesarios de la libreria "React-Strap", importandolos. Son objetos de bootstrap.
    - Para poder manejar estos elementos, necesitamos definir un objeto "vacio" de tipo Product, con sus valores vacios.
    - Empezamos a crear el componente ProductosTable. Vamos a introducir aqui un paginador, un "Cargar Productos", una seccion de creacion y edicion de productos, y otra para borrar. Tambien alojara un buscador:

8. Creamos un hook para alojar y manejar los datos de la conexion, los cuales inicializamos como una coleccion de PRoductos vacio.

9. Creamos un Hook para el loading (para saber si carga o no carga)

10. Otro Hook para el modal de edicion, el cual va a tener dos posibilidades (mostrarse o esconderse), por lo que sera booleano en false.

11. Otro Hook para el modalDelete exactamente igual al anterior.

12. Tambien un modal para guardar el Producto que se va a rellenar con datos, de tipo producto y el cual se va a inicializar con emptyProduct.

13. Otro para la busqueda, el cual se inicializa con un string vacio.

14. Otro para el paginador, el cual va a manejar y saber en la pagina que nos encontramos.

15. Una variable ItemPage para definir cuantos elementos ponemos por pagina. Seran 5.

16. Ahora pasamos a crear el metodo asincrono que nos va a traer los datos de la base de datos:
    - Cuando inicialicemos el metodo, el setLoading(encargado de la carga) pasara a ser true para indicar conesta bandera que se esta cargando.
    - En un try, hacemos la recuperacion de los datos al servicio API, al get, indicandole el tipo de datos de retorno y la ruta (/).
                const res = await api.get<Producto[]>('/')
                setData(res.data)
    - Con el setData, ya guardamos los datos en nuestro local.
    - Definimos el catch con un error y fuera.
    - Creamos un useEffect, el cual vaa actuar cuando se lance la carga de base de datos. PAra ello, el useEffect se va a lanzar cada vez que se lance el metodo loadPRoducts y va a guardar en un array vacio.

17. Pasamos a componer los metodos de crear y editar (saveProduct):

18. Tambien creamos el metodo de eliminar.

19. y una variable parra el buscador

20. Reservamos un espacion para la Paginacion

21. Creamos el renderizado con el return:
    - Creando primero el input y el button para la busqueda
    - Tambien una tabla donde se reflejaran todos los productos, con espacio para los botones de   editar y borrar.
    - Por ultimo, reservamos un espacio para la modal y para el paginador

22. Comenzamos a rellenar los datos de la clase:
    - Creamos la logica para la funcion de sasveProduct, la cual creara o editara segun tenga o no id. Si tiene id, haremos un put a la API, pasandole el id en la url, y el producto (prop del hook). Si no, sera un put, por lo que la ruta ira solo con '/', y le pasamos el objeto o prop igualmente. Por ultimo, volvemos a ejecutar la funcion de carga de datos y ocultamos la modal del formulario (setModalEdit(false)) y limpiar el formulario.

23. Pasamos al deleteProduct. Haremos lo de siempre:
    - Si no hay id, nada
    - Si lo hay, borramos en la API
    - Recargamos los productos
    - Ocultamos el modal de borrado
    - Y vaciamos el formulario

24. Pasamos a la funcion de filtrado:
    - Sobre los datos (data) hacemos un filter, en el que si el nombre del producto de la base de datos es igual a lo que el usuario mete en el campo, lo metemos en la lista. Si la variable de iteracion en minuscula incluye la busqueda en minusculas, padentro.

                const filterData = data.filter(p=>{
                    p.name.toLowerCase().includes(search.toLowerCase()) ||
                    p.category.toLowerCase().includes(search.toLowerCase())
                })

25. Ahora la paginacion:
    - definimos una constante para el numero total de paginas, en el cual redondeamos lo que tenemos en la lista filtrada del buscador entre el numero total de paginas.
    - Tambien una variable para saber donde se va a iniciar a pintar los botones (startIndex)
    - Una variable (paginatedData) para sacar el trozo de datos de la coleccion filtrada que se van a mostrar en la lista.
    - Otro para activa.
    -El metodo goToPage va a recibir la pagina a la que tiene que irse.

26. Empezamos con los elementos de la interface:
    - Creamos el elemento de busqueda pasandole los parametros que necesita. IMPORTANTE: en el onChange, cambiamos el valor de busqueda con el target.value, y cambiamos la pagina inicial a 1.

27. Vamos a añadir ahora los atributos de los botones. La particularidad del addProduct (boton) es que en su onClick, va a limpiar el formulario y mostrar la modal del formulario.

28. Pasamos a la tabla. Mapeamos el paginatedData(lo que va a entrar en cada pagina), para pintar los datos en cada celda de la tabla.
    - Los atributos de los botones van a ser iguales, el onClick va a llamara al modal, y metemos en producto en el formulario. (Al de editar llamamos a su formulario, y al delete el suyo)

29. Pasamos a renderizar el paginador. Esta es chunga:
    - Esto debes explicarlo minuciosamente @Gemini:
        {Array.from({length: totalPages}, (_, i) => i + 1).map(page => (
                    <Button
                    key={page}
                    color={page === currentPage ? 'primary' : 'secondary'
                    }
                    onClick={() => goToPage(page)}
                    >
                        {page}
                    </Button>
                ))}

        * Cogemos la longitud del total pages, y para cada uno de ellos congemos el index y le vamos sumando 1. Por cada elemento, pintamos un boton, en el que va a tener una key, un color (que dependiendo de si es la pagina actual va a ser de un color y si no de otro), y un evento onClick.

        * Tambien creamos un boton para el primer elemento de la lista y otro para el ultimo. El primer elemento va a apuntar a la pagina 1 (goToPage(1)), y el ultimo al totalPages.

        * Renderizamos todo el componente, metiendolo en el APP.
    - Nos metemos con las propiedades del modal, pasandole la variable "isOpen" en el que va a comprobar si el modal esta abierto el modal, y con un evento toggle le damos la vuelta a setModalEdit para que si esta cerrado abra, y si esta abierto cierre.
    - En la cabecera del modal pintamos un titulo u otro dependiendo de si tiene el producto un ID o no.
    - En el body, empezamos a meter los inputs (mirar bien los eventos de cada uno).
    - En el Footer, pintamos dos botones para Guardar o Cancelar. Si le damos a guardar, el onClick llama al metodo de guardar. Si no, cierra el formulario con el functionProp(false).

    - Hacemos lo mismo para el modal de delete, pero esta vez no hace falta hacer ningun formulario, simplemente apuntamos los toggle y onClick a los eventos de Deleteado y mostramos un mensaje con dos botones, uno de borrado y otro de cancelado.


    ---------------------------------------------------------------------------
    ---------------------------------------------------------------------------
    Hasta aqui la primera parte del aplicativo, se ha hecho todo en bloque para entenderlo mas rapdio, aunque no sea funcional. Cuando se haga esta conversion de markdown para el resumen, debe especificarse que hasta aqui, es la primera parte, poniendo toda la App completa que esta comentada en el propio App.tsx al final del todo.

    30. Empezamos a crear los props del ProductModal, para poder crear el elemento. Estos van a ser:
        - isOpen: para saber si esta abierto o no,
        - toggle () =>, funcion callback para cerrar o abrir
        - product: para el producto a editar o borrar
        - onSave: con un producto como parametro de tipo void
        - onDelete: funcion para borrar por id
        - onChange: funcion para cambiar el producto

    







