import {
  Button, //el botón que añadirá la modal
  Modal, //La modal
  ModalBody, //El cuerpo del modal
  ModalHeader, //La cabecera del modal
  FormGroup,
  Label,
  ModalFooter,
  Input,
} from "reactstrap";
import type { Producto } from "../models/Producto";
import { useEffect, useState } from "react";
import { api } from "../services/api";
import { FormValidator } from "../validations/FormValidator";
import { ValidationMessage } from "../validations/ValidationMessage";

const emptyProduct: Producto = {
  name: "",
  category: "",
  price: 0,
};

function ProductsTable() {
  const [data, setData] = useState<Producto[]>([]);
  const [loading, setLodaing] = useState(false);

  const [modalEdit, setModalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);

  const [selectedProduct, setSelectedProduct] =
    useState<Producto>(emptyProduct);
  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [formData, setFormData] = useState({
    id: selectedProduct.id ? selectedProduct.id : 0,
    name: selectedProduct.name ? selectedProduct.name : "",
    category: selectedProduct.category ? selectedProduct.category : "",
    price: selectedProduct.price ? selectedProduct.price : 0,
    enableTerms: false,
  });

  const rules: { [key in keyof typeof formData]?: any } = {
    name: { required: true, minlength: 3 },
    category: { required: true, minlength: 3 },
    price: { required: true, minValue: 1 },
    enableTerms: { true: true },
  };

  //Cargar Productos
  //Carga de datos desde la base de datos (Cargar los productos)
  const loadProcuts = async () => {
    setLodaing(true);
    try {
      const res = await api.get<Producto[]>("/");

      setData(res.data);
    } catch (err) {
      console.error(`Error inesperado: ${err}`);
    } finally {
      setLodaing(false);
    }
  };

  useEffect(() => {
    loadProcuts();
  }, []);

  //Crear / Editar
  const saveProduct = async (dataToSave: Producto) => {
    try {
      if (selectedProduct.id && selectedProduct.id !== 0) {
        await api.put(`/${selectedProduct.id}`, dataToSave);
      } else {
        await api.post(`/`, dataToSave);
      }

      await loadProcuts();
      setModalEdit(false);
      setSelectedProduct(emptyProduct);
    } catch (err) {
      console.error(`Error inesperado: ${err}`);
    }
  };

  //Borrar
  const deleteProduct = async () => {
    if (selectedProduct.id && selectedProduct.id !== 0) {
      try {
        await api.delete(`/${selectedProduct.id}`);
        await loadProcuts();
        setModalDelete(false);
        setSelectedProduct(emptyProduct);
      } catch (err) {
        console.error(`Error inesperado: ${err}`);
      }
    } else {
      return;
    }
  };

  //Filtrado
  const filteredData = data.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase()),
  );

  //Paginación
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage; //Para donde voy a empezar a pintar
  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const goToPage = (page: number) => {
    // Allow llegar tanto a la primera como a la última página
    if (page < 1 || page > totalPages) {
      return;
    }

    setCurrentPage(page);
  };

  // Se utiliza el estado 'loading' para mostrar un indicador de carga si es necesario.
  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="App">
      <div className="d-flex mb-2 gap-2" style={{ width: "fit-content" }}>
        <Button
          color="success"
          onClick={() => {
            setSelectedProduct(emptyProduct);
            setFormData({
              id: 0,
              name: "",
              category: "",
              price: 0,
              enableTerms: false,
            });
            setModalEdit(true);
          }}
        >
          Add Product
        </Button>

        <input
          type="text"
          placeholder="Search products..."
          className="form-control"
          style={{ width: "200px" }}
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      <h5 className="text-center mb-2">Products</h5>

      <table className="table table-stripped table-bordered">
        <thead>
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
          {paginatedData.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>{p.category}</td>
              <td className="text-end">{p.price}</td>
              <td>
                <Button
                  color="primary"
                  size="sm"
                  onClick={() => {
                    setSelectedProduct(p);
                    setFormData({
                      id: p.id ? p.id : 0,
                      name: p.name,
                      category: p.category,
                      price: p.price,
                      enableTerms: false,
                    });
                    setModalEdit(true);
                  }}
                >
                  Edit
                </Button>
              </td>
              <td>
                <Button
                  color="danger"
                  size="sm"
                  onClick={() => {
                    setSelectedProduct(p);
                    setModalDelete(true);
                  }}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="d-flex justify-content-center gap-1 mt-2">
        {/* Paginación */}
        <Button
          color="secondary"
          size="sm"
          disabled={currentPage === 1}
          onClick={() => {
            goToPage(1);
          }}
        >
          {"<--"}
        </Button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
          <Button
            key={pageNum}
            color={pageNum === currentPage ? "primary" : "secondary"}
            disabled={pageNum === currentPage}
            size="sm"
            onClick={() => {
              goToPage(pageNum);
            }}
          >
            {pageNum}
          </Button>
        ))}

        <Button
          color="secondary"
          size="sm"
          disabled={currentPage === totalPages}
          onClick={() => {
            goToPage(totalPages);
          }}
        >
          {"-->"}
        </Button>
      </div>

      <Modal isOpen={modalEdit} toggle={() => setModalEdit(!modalEdit)}>
        <ModalHeader toggle={() => setModalEdit(!modalEdit)}>
          {selectedProduct.id ? "Edit Product" : "Add Product"}
        </ModalHeader>
        <ModalBody>
          <FormValidator data={formData} rules={rules} submit={saveProduct}>
            <FormGroup>
              <Label>Name</Label>
              <Input
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
              <ValidationMessage field="name" />
            </FormGroup>

            <FormGroup>
              <Label>Category</Label>
              <Input
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
              />
              <ValidationMessage field="category" />
            </FormGroup>

            <FormGroup>
              <Label>Price</Label>
              <Input
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: Number(e.target.value) })
                }
              />
              <ValidationMessage field="price" />
            </FormGroup>

            <FormGroup check>
              <Label check>
                <Input
                  type="checkbox"
                  checked={formData.enableTerms}
                  onChange={(e) =>
                    setFormData({ ...formData, enableTerms: e.target.checked })
                  }
                />{" "}
                Enable Terms Validation
              </Label>
              <ValidationMessage field="enableTerms" />
            </FormGroup>
            <ValidationMessage field="form" />
          </FormValidator>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={() => setModalEdit(false)}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
      <Modal isOpen={modalDelete} toggle={() => setModalDelete(!modalDelete)}>
        <ModalHeader toggle={() => setModalDelete(!modalDelete)}>
          Delete Product
        </ModalHeader>
        <ModalBody>
          Are you sure you want to delete the product{" "}
          <strong>{selectedProduct.name}</strong>?
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={deleteProduct}>
            Delete
          </Button>
          <Button color="secondary" onClick={() => setModalDelete(false)}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ProductsTable;
