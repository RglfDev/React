// Contexto de la validación

import { createContext, useState, type ReactNode, use, useCallback } from "react";


export type ValidationContextType = {
    errors: { [field: string]: string[] };
    dirty: { [field: string]: boolean };
    formSubmitted: boolean;
    getMessagesForField: (field: string) => string[];
    setFieldDirty: (field: string, isDirty: boolean) => void;
    setFieldErrors: (field: string, messages: string[]) => void;
    setFormSubmitted: (submitted: boolean) => void;
}

export const ValidationContext = createContext<ValidationContextType>({
    errors: {},
    dirty: {},
    formSubmitted: false,
    getMessagesForField: () => [],
    setFieldDirty: () => { },
    setFieldErrors: () => { },
    setFormSubmitted: () => { }

});

type ValidationProviderProps = {
    children: ReactNode
}

export const ValidationProvider: React.FC<ValidationProviderProps> = ({ children }) => {
    const [errors, setErrors] = useState<{ [field: string]: string[] }>({});
    const [dirty, setDirty] = useState<{ [field: string]: boolean }>({});
    const [formSubmitted, setFormSubmittedState] = useState(false);

    const getMessagesForField = useCallback(
        (field: string) => errors[field] || [], [errors]
    );

    const setFieldDirty = (field: string, isDirty: boolean) => {
        setDirty(prev => ({ ...prev, [field]: isDirty }));
    };

    const setFieldErrors = (field: string, messages: string[]) => {
        setErrors(prev => ({ ...prev, [field]: messages }));
    };

    const setFormSubmitted = (submitted: boolean) => {
        setFormSubmittedState(submitted);
    };

    return (
        <ValidationContext.Provider
            value={
                { errors, dirty, formSubmitted, getMessagesForField, setFieldErrors, setFieldDirty, setFormSubmitted }
            }
        >
            {children}
        </ValidationContext.Provider>
    )

}