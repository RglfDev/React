1. Instalar react-routing.

2. Crear la estructura de carpetas de la imagen del dia 19/01.

3. Types.ts: crear los tipos para Product y Supplier.

4. Creamos la fuente de datos para Product y Supplier en la carpeta Data, con archivos separados para cada uno.

5. Creamos la pagina Home.tsx con un div sencillo que muestra el titulo y una subcabecera
y lo exportamos.
    6. Vamos a usar la propiedad NavLink. Estos se suelen usar en barras de navegacion y navbars. Creamos el archivo Components/NavBar.tsx
    7. Creamos una etiqueta <nav> para la barra de navegacion, con diferentes secciones, junto con un Span general que va a mostrar un nombre en el navbar (className="navbar-brand").
    8. Creamos las secciones con "navbar-nav":
    - Dentro de el navBar, vamos a crear una etiqueta <NavLink> con el atributo "nav-link, y apuntaran con "to=""" hacia donde queramos que naveguen los diferentes links. Uno para Home, otro para Products y otro para Suppliers.
    - Exportamos el navBar.

9. Vamos a crear los contextos:
    - ProductContext.tsx: se va a encargar de gestionar los contextos de productos.
        * Creamos el tipo de este context, con una lista de Productos, y functionProps para las operaciones CRUD (addProduct, updateProduct y deleteProduct (este necesita un id))
        * Creamos el context con CreateContext, y le pasamos como parametro el valor que le va a llegar cuando creemos el contexto, el cual va a ser un objeto vacio de Product (ya que ahora esto solo va a ser un esqueleto que se va a usar a posetriori). Este valor va a ser de tipo ProductContextType, para que en un futuro, cuando se reciba el dato o el objeto, no de problemas.
        * Creamos el proveedor, el cual va a manejar una coleccion de children, que van a ser de tipo ReactNode. Aqui se van a manejar una lista de products, por lo que necesitamos una lista de productos y un hook que los inicializa y los maneje.
        * Importamos los data de products con un nombre diferente al principio del archivo para que no de problemas.
        * Inicializamos el hook con los data que acabamos de importar desde /data
        * Creamos un metodo para manejar el "añadir producto", que recibira un producto por parametro. Usaremos el metodo del Hook, declarando una variable de paso (prev), añadimos lo previo (...prev), mas un objeto que contenga todo el product recibido en los parametros (...product), junto con un ID al que le vamos a poner la fecha actual como id( ya que nunca va a ser repetida).
        * Creamos tambien el metodo para actualizar, en el que tenemos un estado previo, el cual recorremos con un map, para encontrar el producto que queramos lo buscamos por id. Si el id del iterador coincide con el id del del parametro, metemos el product, si no...mantenemos el del iterador (p).
        * Para borrar buscamos el id por parametro, y lo que haremos sera volver a generar la lista de productos, guardandola entera menos el producto con el id que recibe esta funcion. Con el filter, lo que hacemos es filtrar la lista apuntando al id del product que no queremos. Cuando hacemos esto, se genera la lista borrando el del id.
        * Por ultimo, retornamos el componente renderizado, Poniendolo como provider, y pasandole como valores todos los atributos del tipo de esta clase. Entre medias de estos ProductContext, metemos los children que van a manejar estos contextos.

        * Esta movida del context significa que vamos a poner a disposicion todos los datos y metodos creados aqui, para lso hijos que las quieran implementar.

10. Hacemos exactamente lo mismo hasta ahora para Suppliers.
11. Creamos la Page ProductsForm.tsx. Esta va a recibir los datos del contexto de Productos:
    - Creamos el Componente o pagina
    - Creamos, con desestructuracion, la variable products, addProduct, updateProducts y las sacamos, usando el contexto de ProductContext con "useContext(ProductContext)
    - Con useParams (hook), vamos a recuperar el id del parametro URL que nos va a traer la navegacion en la URL. Con esto, extraemos el id necesario de la URL. IMPORTANTE, es necesario que el parametro sea pasado como un objeto, y recuperado como tal {id}
    - Con useNavigate, podemos cambiar de pagina mediante codigo, sin usar ruteo. Este no tiene que ser un objeto, lo vamos usar para parametrizarlo.
    - Vamos a guardar en una variable la busqueda de ese producto por el id de la URL con filter
    - Creamos un hook para cada una de los atributos de product.
        * Para el name, creamos uno y lo inicialeizamos con el productToEdit(el producto recuperado a traves de la id del parametroURL).
        * Hacemos lo mismo para el resto.

    - Tenemos que manejar el evento de submiteo, por lo que mediante una funcion flecha que recibe como parametro un evento de tipo (FORMEVENT). Dependiendo de si recibimos ID o no por la URL, vamos a saber si se va a editar o crear un nuevo producto.
    Si tenemos id, llamamos a la funcion de editado, pasandole el objeto completo con los datos de los hooks de arriba, mas el id recuperado (hay que castearlo). Si no lo tenemos, llamamos al metodo de crear, y le pasamos el producto con los state de los hooks directamente sin id.
    - Por ultimo, navegariamos a Product con la variable que hemos creado (navigate("/Product"))
    - Ahora pasamos a crear el formulario, con el evento onSubmit(los formularios tienen este evento). Este evento llama al handleSubmit (el metodo de antes).
        * Creamos un input para cada elemento del Product, pasandole un className, un placeHolder, el value(el campo del product al que se refiere) y un evento onChange, el cual, mediante una funcion flecha con (e), va a llamar a la funcion que maneja el editado o el guardado.
        * Tambien creamos un boton de tipo submit para enviar el formulario, y un boton para cancelar tipo button, con un onClick que tenga una funcion flecha que navegue a la pagina anterior("/Product).
    - Por ultimo, exportamos el componente.
12. Creamos el archivo PrpoductList.tsx, que contendra la lista de productos existente hasta ahora. De primeras creamos el elemento, y recuperamos la lista de productos y el metodo para borrar un producto desde el CONTEXT.
    - Tambien creamos una variable para poder utilizar la navegacion (el hook de useNavigate()).
    - Pasamos al render (return):
        * Vamos a generar un boton para crear un nuevo Producto. Para ello, el boton va a tener un onClick que va a navegar a /products/new (new es el parametro) para que nos redirija a la pagina de creacion con el parametro new(se explica lo del parametro mas adelante)
        * Confeccionamos la lista, recorriendo la lista de products con un map, y creando un elemento <li> con su key. En su interior, le pasamos el nombre, junto con un div que contenga un boton para editarlo.
        Este boton va a in contenido dentro de una etiqueta LINK (de la libreria de routing), el cual va a navegar con "to" hacia /products/(el id como variable)/edit.
        * Por ultimo, creamos el boton de borrar, al que le pasamos en su onClick un window.confirm para asegurarnos que el usuario quiere borrar. Si quiere borrar, borramos con el metodo correspondiente pasandole el id del producto.
13. Configuramos el Routing en el main.tsx, envolviendo el App con la etiqueta de routing <BrowserRouter>. Haciendo esto ya podemos manejar el routing en toda la app. Aprovechamos tambien para meter los proveedores de contexto (ProductProvider y SupplierProvider).

14. Configuramos tambien el App, preparando todo lo creado para construir la interfaz de usuario.
    - Primero metemos el elemento creado NavBar
    - Despues vamos insertando el ruteo:
        * Se crea una etiqueta o componente <Route> con un path que lleva la ruta, y un "element" que apunta hacia el componente o "page" que hemos creado anteriormente.
        La cosa quedaria asi:
        return (
    <>
      <NavBar/>
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/products" element={<ProductList/>}/>
          <Route path="/products/new" element={<ProductsForm/>}/>
          <Route path="/products/:id/edit" element={<ProductsForm/>}/>
        </Routes>

      </div>
    </>
  )

  IMPORTANTE: faltaria hacer lo mismo para Supplier y meterlo en el routing.

