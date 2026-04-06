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
import type { Producto } from "../models/Producto";


type ProductModalProps ={
    isOpen:boolean;
    toggle:()=>void;
    product:Producto;
    onSave:(product:Producto)=>void;
    onDelete:(productId:number)=>void;
}

export default function ProductModal({isOpen, toggle, product, onSave, onChange, onDelete}) {
    return (
        <Modal isOpen={isOpen} toggle={toggle}>
            <ModalHeader toggle={toggle}>{product.id ? "Edit Product" : "Add Product"}
            </ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label>Name</Label>
                        <Input
                            value={product.name}
                            onChange={e => onChange({...product, name: e.target.value})}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>Category</Label>
                        <Input
                            value={product.category}
                            onChange={e => onChange({...product, category: e.target.value})}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>Price</Label>
                        <Input
                            value={product.price}
                            onChange={e => onChange({...product, price: e.target.value})}
                        />
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={() => onSave(product)}>
                    Save
                </Button>
                <Button color="secondary" onClick={toggle}>
                    Cancel
                </Button>
            </ModalFooter>
        </Modal>
    );
}
