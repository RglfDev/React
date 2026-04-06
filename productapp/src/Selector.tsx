/*Archivo PADRE de Product y Supplier, el cual va a manejar a cual tiene que redirigirse */

import type { ReactElement } from "react";
import React from "react";

/* Tipo del SelectorProps, el cual va a tener su children con el tipo de estos */
type SelectorProps = {
    children: React.ReactNode;
}

/*Creacion del componente Selector, el cual recibe los Children como props*/
export const Selector: React.FC<SelectorProps> = ({ children }) => {
    const firstChildren = React.Children.toArray(children)[0] as ReactElement<any>;
    /*Esta Hook recoge el nombre del children ("Supplier o Product") para saber con que 
    elemento se va a trabajar*/
    const [selection, setSelection] = React.useState(firstChildren?.props.name || '');

    const handleSelection = (ev: React.MouseEvent<HTMLButtonElement>) => {
        const target = ev.target as HTMLButtonElement;
        setSelection(target.name);
    }

    /*Renderizamos el componente Selector, reservando primero:
        - Un espacio para los botones de selección 
        - Un espacio para el contenido seleccionado */
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
