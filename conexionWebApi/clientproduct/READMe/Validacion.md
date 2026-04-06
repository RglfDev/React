1.  Crear el Hook para el formData en cada archivo de formulario, inicializandolo con un ternario. Si tiene nombre, el nombre y si no vacio. Asi con todos. Tambien es necesario crear una regla para el checkBox, inicializandola siempre en false. ES IMPORTANTE TAMBIEN METERLE EL ID. AUNQUE LO METAMOS NO PASA NADA, SI ES = LA BASE DE DATOS LE AUTOIMPLEMENTARA UNO:

    const [formData, setFormData] = useState({
    id: selectedProduct.id ? selectedProduct.id : 0,
    name: selectedProduct.name ? selectedProduct.name : '',
    category: selectedProduct.category ? selectedProduct.category : '',
    price: selectedProduct.price ? selectedProduct.price : 0,
    enableTerms: false
    });

2.  Crear las reglas que va a contener nuestro formulario. En este caso:
    - El name sera required, y minlength 3
    - el category sera igual
    - el price sera required y con minValue de 1.
    - Hemos metido un checkBox tambien para los terminos

3.  Si queremos añadir reglas nuevas, simplemente tendremos que irnos al archivo Validation.tsx, y añadirlas en la constante FielRule, poniendo su nombre y el tipo (para el checkbox ya existia, por lo que usaremos la regla del "true"). tambien debemos definir el mensaje de error y cuando se va a lanzar en la parte de los "ifs" del mismo archivo.

4.  Modificamos la funcion saveData para que reciba un objeto de tipo Producto como parametro.
    - Si el producto tiene ID y no es 0, pasamos la ruta de edit
    - Si el producto no tiene id hacemos un post.

5.  En el formulario, cambiamos la etiqueta FORM por la de FORMVALIDATOR, ingresandole como valores los sigueitens PROPS para que se los pase a su hijo FORMVALIDATION:
    - data={formData}
    - rules={rules}
    - submit={saveProduct} (la funcion de guardado o editado)

    El propio FormValidator, maneja el submiteo comprobando lo errores, y pintando el boton de submit, por lo que OJO: NO ES NECESARIO PINTAR UN BOTON PARA GUARDAR, EL PROPIO FORMVALIDATOR YA LO IMPLEMENTA.

6.  Habra que modificar el boton de Crear un nuevo producto, para que cuando vacie el selectedProduct (emptyProduct), tambien vacie los datos del formData de este modo, y que asi el formulario se presente vacio:

        <div className="App">
            <div className="d-flex mb-2 justify-content-between">

                <Button color="success" onClick={()=>{
                    setSelectedProduct(emptyProduct);
                    setFormData({
                        id:0,
                        name: '',
                        category: '',
                        price: 0,
                        enableTerms: false
                    });
                    setModalEdit(true);
                }}>Add Product</Button>

7.  Tambien hay que modificar el boton de edit de la tabla, para que presente todos los datos que posea el objeto eleccionado de este modo:
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
    setFormData({
    id: p.id ? p.id : 0,
    name: p.name,
    category: p.category,
    price: p.price,
    enableTerms: false
    });
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

8.  Dentro de cada FormGroup, creamos el elemento correspondiente a lo que queramos meter en el formulario con sus propiedades necesarias para funcionar. Por ejemplo:
    - En los inputs (en este caso el name):
      <FormGroup>
      <Label>Name</Label>
      <Input
      value={formData.name}
      onChange={e=>
      setFormData({ ...formData, name: e.target.value })} />
      <ValidationMessage field="name" />
      </FormGroup>
    - En el checkBox:
      <FormGroup check>
      <Label check>
      <Input
      type="checkbox"
      checked={formData.enableTerms}
      onChange={e=>
      setFormData({ ...formData, enableTerms: e.target.checked })} />
      {' '}Enable Terms Validation
      </Label>
      <ValidationMessage field="enableTerms" />
      </FormGroup>
    - Para la validacion global ( la del formulario entero) habra que poner tambien un ValidationMessage al final de todos los elementos:
      <ValidationMessage field="form" />
