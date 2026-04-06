1. Generamos el modelo de User en User.ts
2. Creamos el esquema de Usuario de mongoose, el cual va a tener:
    - name: String y requerido
    - email: String, requerido
    
    Tambien vamos a implementar un timestamps para identificar cada uno de ellos con su fecha de creacion. Por ultimo, exporta el modelo<IUser> con el nombre y el esquema.

3. Creamos las rutas de usuario en user.routes.ts. En el, vamos a obtener los usuarios y crear lso usuarios. Creamos la         variable Router, la cual nos va a dejar manejar las rutas.
    - Con el Router creado, creamos la ruta para obtener los usuarios con un get, y una funcion asincrona.
        * Buscamos TODOS los usuarios, aciendo un await y un find sobre el esquema o modelo de USER.
        * Devolvemos los usuarios en formato JSON.

        router.get('/', async(_req,res) => {
        const users = await User.find()
        res.json(users);
         })
    - Creamos ahora la ruta para crear usuarios:
        * De igual manera, creamos un metodo asincrono con req,res y guardamos el nuevo usuario a partir del body de la respuesta. Guardamos el usuario con .save() y mandamos una respuesta correcta y el json con user.
4. Creamos el app.ts, el punto de entrada del servidor:
    - Importamos express
    - Importamos las cors con use
    - Importamos el uso de json (use)
    - Creamos una ruta para definir la entrada de usuarios, poniendo la ruta, y apuntando al userRoutes.

5. Creamos el index.ts, el cual sera el servidor y contendra la conexion a la base de datos:
    - Creamos la conexion a mongoose, con la direccion a la base de datos.
    - Con promesas, si todo va bien, ponemos en escucha al servidor(listen), con el puerto y lanzando un mensaje de exito. Si no, mostramos mensaje de error con el .catch{}

6. Modificamos el scripts del package.json para apuntar al fichero de entrada scr/index.ts

--------
Proyecto FrontEnd
--------

Creamos un proyecto con create vite@latest frontend, npm install y bootstrap
Aqui vamos a crearnos un servicios de gestion de APIs para poder implementar la URL y atacar al servidor Express del proyecto Fullstack

1. api.ts: Va a definir la conexion a la API para obtener los datos:
    - Definimos una constante donde alojamos la URL de conexion
    - Creamos una interfaz para el usuario, donde podamos recoger el nombre, el id y el email
    - Creamos una funcion asincrona para hacer el GET (recoger todos los usuarios), con una promesa para hacer el fetch de la API y recuperar el resultado en json.
    - Creamos otra funcion para crear los usuarios (Post), en el que hacemos otro fetch, pasandole el cuerpo de la consulta con el metodo, las cabeceras y el cuerpo en string.

2. Pasamos a modelar el App:
    - Creamos el componente App, con el Hook para recoger los usuarios (users,setUsers) y lo inicializamos con una coleccion vacia de tipo User.
    - Otro Hook para el nombre del usuario (name,setName) y lo inicializamos en string vacio
    - Otro para el email con el mismo proposito.

    Creamos la funcion para cargar los usuarios, la cual va a ser asincrona y va a recoger los datos a traves de un await a la funcion getUsers() de el archivo API (el metodo del GET), y con los datos recogidos actualizamos el estado de Users con setUsers pasandole el data (los datos obtenidos).

    Tambien creamos la funcion handleSubmit, que va a manejar la creacion de usuarios cuando se haga click en el boton. Va a llamar, de forma asincrona al createUser del archivo API(ahi esta la ruta del POST), pasandole el nombre y el email. Por ultimo, ponemos los valores de nombre y email vacios con sus "set" y volvemos a cargar los usuarios con el metodo loadUsers().

    Hacemos un useEffect para que cargue el loadUsers al inicio de la aplicacion con una lista vacia (ya que al inicio la lista de usuarios esta vacia, por lo que arrancara segun se cree la lista vacia (al inicio )).

3. Pasamos al renderizado de la interfaz, metiendole un input y un boton para añadir usuarios, y un listado mapeando los usuarios y mostrando sus datos. 
    - En los inputs, le pasamos el valor correspondiente de cada hook (name, email), y un onChange donde un evento dispara los set de cada hook con el target.value.



4. Vamos a hacer lo mismo, pero con axios:
En la api.ts, se simplifica mucho mas la movida usando axios:

comparacion:
con fetch ->
        export const getUsers = async (): Promise<User[]> => {
     const res = await fetch(API_URL);
     return res.json();
 }

 export const createUser = async ( user:User) => {
     await fetch(API_URL, {
         method: 'POST',
         headers: {'Content-Type' : 'application/json'},
         body: JSON.stringify(user)
     });
 }

 con axios -> 
 export const getUsers = async (): Promise<User[]> => {
    const res = await axios.get<User[]>(API_URL);
    return res.data
}

export const createUser = async ( user:User) => {
    await axios.post(API_URL, user);
}

    Como se puede ver, el codigo se simplifica mucho, no teniendo que pasar ningun cuerpo json, solo la ruta y el tipo User[] en el get, y la ruta y el usuario creado en el post