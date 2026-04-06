// Gestion de los mensajes de las validaciones a cada campo

import { useContext } from "react";
import { ValidationContext } from "./ValidationContext";


type ValidationMessageProps = {
    field: string;
}

export const ValidationMessage: React.FC<ValidationMessageProps> = ({ field }) => {
    const ctx = useContext(ValidationContext);
    if (!ctx) return null;

    const messages = ctx.getMessagesForField(field);

    if (messages.length === 0) return null;

    return (
        <>
            {messages.map((err, idx) => (
                <div
                    className="small bg-danger text-white mt-1 p-1"
                    key={idx} // mejor usar idxsi puede repetirse el mensaje
                >
                    {err}
                </div>
            ))}
        </>
    );

}