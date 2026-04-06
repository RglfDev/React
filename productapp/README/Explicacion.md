1. Generar los tipos de Producto en Product.ts.

2. Crear el componente de una fila de la talba para Product (ProductTableRow.ts):
    - Definir el tipo para las props de TableRowProps (Necesita un product, y dos callbacks: uno para editar y otro para borrar, los cuales necesitan recibir un product como parametro).
    - Creamos el ProductTableRow (Componente de una fila de la tabla) con los datos en cada <td>
    junto con un boton de Edit y otro de Delete. Estos llaman a la funcion callback correspondiente a cada uno de ellos, pasandole el product necesario

3. Creamos el ProductTable.tsx, el cual va a pintar la tabla completa con las filas pintadas en el archivo anterior. Ademas, sus props van a volver a tener los callbacks de Delete y Edit. No los va a usar, pero los va a tener para pasarselos a su padre (Abuelo (APP)) y que el los maneje:
    - Creamos el tipo con una coleccion de productos, y los callbacks que vaa pasar desde su hijo al abuelo.
    - Creamos el componente cons sus props.
    - Retornamos la tabla pintada completa.
    - Importante, en el body, hay que recorrer (.map) los productos, y por cada uno de ellos pintamos el componente ProductTableRow, pasandole los Props que ha definido el hijo(key, product,editCallback y DeleteCallback).

4. Creamos el componente ProductEditor.tsx, con un tipo que va a contener el producto, el callback para salvar ( con un producto como parametro para poder editarlo) y un boton de cancelar:
    - IMPORTANTE: el producto tendra que ser de tipo Partial<Product>. Partial sirve para recibir las propiedades de Product que nos hagan falta.
    - Creamos el componente ProductEditor, con sus Hooks, e inicializando el producto
    para que nada mas inicialice la vista muestre los valores del producto o "Vacio".
    - Creamos el manejador de cambios de los inputs del formulario (handleChange), el
    cual va a ser del tipo del evento Change(ev:ChangeEventzHTMLInputElement). Del elemento al que apunte(target) sacamos el name(como el id del elemento) y su value(el valor que contiene cada input(el texto)). Se encarga de mantener los campos previos, y de actualizar el campo editado a traves del "name" o ID.
    - Creamos el handleClick para el boton de guardar, el cual utiliza el callBack para enviar el Product ( esta guardado en el state(formData)) actualizado a su elemento padre.
    - Hacemos el renderizado o RETURN para pintar lo correspondiente.

5. Procedemos a crear el PADRE (Product Display) que va a englobar a los hijos de CrearProducto () y EditarProducto(ProductEditor.tsx).

    - Creamos el Props con el nombre, una coleccion de productos y los callback de save y delete unicamente de momento.
    - Creamos el componente con los props de antes
    - creamos un Hook para saber si se activa el Edit (boton) booleano
    - creamos un Hook para contener un producto o no (selectedProduct). Si contiene un
      Product, será que se procede a editar un producto, mientras que si es null, se procede a crear uno nuevo.
    - Creamos el metodo que se va a encargar de mostrar u ocultar el formulario de edición (startEditing), el cual recibe un parametro 
    - tambien un metodo que se encarga de guardar un producto, tanto si se edita como si se guarda.
    - Tambien un metodo para cancelar el editado o creacion del producto.
    - Y un metodo para crear el producto nuevo, inicializando un nuevo producto con valores por defecto para poder mostrarlos en los inputs.
    - Ahora tenemos que comprobar si la variable del editor esta en true y si hay un producto seleccionado. Si es que si, renderizamos el hijo (ProductEditor) que muestra el formulario.
    - Si no renderizamos el hijo de la tabla.

6. Hacemos el mismo proceso que llevamos hasta ahora para los Suppliers (ATENCION: hay que cambiar algunos atributos de los types, como por ejemplo city y Products[], junto con sus correspondientes ). Ver archivos. Los archivos no se comentan ya que son las mismas funcionalidades que en la carpeta Products.

7. Vamos a crear un nuevo Componente intermedio, que se va a situar entre App y Products-Suppliers. Para ello necesitamos un context. Se llamará Selector.tsx.
    - Creamos el tipo con un atributo "Child" de tipo ReactNode
    - Creamos el componente, el cual usa un children como props
    - Creamos un metodo manejador de la seleccion, la cual recibe como parametro un evento de tipo MouseEvent<ButtonElement>, creando una target que recojael target del evento lanzado, y se le cambia el estado con el nombre del elemento clickado(target.name).
    - Por ultimo renderizamos. Para ello, necesitamos recorrer los children para poder renderizar los botones:
        * Recogemos en una constante el elemento child como cualquier componente de React
        * recogemos en la variable name el nombre del child a traves de sus props
        * Renderizamos, mediante el recorrido de las childs con los maps.
