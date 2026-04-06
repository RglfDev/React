1. Crear la carpeta context con incidentContext.tsx
2. En este archivo de contexto, montamos unas Props para el contexto
    - Metemos todos los atributos necesarios para toda la app:
        * incidents: coleccion de incidencias
        * loading: booleano para el spinner;
        * error: strings
        * success: string para el mensage de exito
        * deleteId: string o nulo para guardar un id para borra el registro
        * setDeleteId para borrar con un id
        * loadIncidents: funcion vacia para cargar los datos
        * handleCreate: recibe formularios, y va a ser asincrona ya que el edit puede devolver datos
        * changeEstado: el id de la incidencia y el estado para cambiarlo
        * deleteIncident: funcion asincrona para borrar por id

3. Creamos el contexto del tipo o indefinido, inicializandolo a indefinido
4. Creamos una funcion en la que vamos a lanzar el contexto y el Provider
5. Creamos el contexto dentro de la funcion, inicializandolo con el context de antes
6. Si no hay context, error, si si...lo retornamos
7. Creamos unas Props para poder meter los children en el provider
8. Creamos el proveedor, con los children de Props, y vamos creando un hook para cada dato generado arriba del todo
9. Creamos una funcion para cargar las incidencias desde el backend, la cual va a empezar a hacer el loading y va a intentar cargar los datos. Si lo consigue, con setIncidents guarda lso datos traidos. Si no, lanza error y cierra el loading.
10. Creamos el handleCreate para manejar la apertura de formularios:
    - Lo primero de todo es limpiar el mensaje de error y de acierto
    - despues hacemos un try, en donde ponemos el spinner a cargar y creamos una llamada al metodo createIncident, el cual va a recibir los datos del formulario (form) de la API en una variable data. Si la respuesta no es satisfactoria, seteamos el error con el mensaje que devuelva la API. Si todo sale bien (else) setSuccess("Correcto"). Por ultimo cargamos las incidencias y finalizamos el spinner con 3 segundos.
    - En el catch, seteamos el error con el error que devuelva la respuesta del servidor.
11. Creamos el changeEstado(simplemente cambia el estado de una incidencia), el cual recibe el id y el estado. Funciona igual que el anterior, en el try, volvemos a cargar el spinner, llamamos al updateestado de la API, cargamos elementos otra vez y cerramos el spinner a los 3 segundos. En el catch, mostramos un mensaje de error y ponemos el estado de carga del spinner a false.
12. Creamos el deleteIncident = asunc () el cual va a borrar un elemento con el Hook del deleteId a traves del metodo de la API para borrar (necesita el id). El funcionamiento es igual que en el resto
13. Hacemos un useEffect para hacer la cargada de datos, para que se ponga en funcionamiento nada mas iniciar la app o cuando se necesite.
14. Renderizamos el provider pasandole todos los atributos y metodos que utilizamos en este componente como value y se lo pasamos a los children.
15. Creamos el componente App, en el cual vamos a definir una funcion App, la cual va a renderizar un nuevo componente Main envuelto en los proveedores de contexto.
16. A posteriori, en el mismo fichero, creamos el componente Main, donde vamos a renderizar todos y cada uno de los componentes creados anteriormente. 
    - Primero recogemos toooodos los atributos del context con desestructuracion.
    - despues empezamos con el renderizado.
17. Vamos a modificar el formulario. Para ello traemos el handleCreate del context. Creamos un hook form para manejar los datos del formulario y lo inicializamos con valores por defecto donde corresponda. Como vamos a manejar los errores tambien, creamos un Hook para los errores. 
    - Creamos un onSubmit, el cual va a generar el guardado de datos llamando al context