
// Aqui empieza el a�adido para el wholeform
import { useState, type ReactNode, useCallback, useMemo, type ChangeEvent } from 'react';
import { ValidateData, type ValidationRules, type FormData } from './Validation';
import React from 'react';
import { ValidationContext, type ValidationContextType } from './ValidationContext';

// Props del FormValidator
type FormValidatorProps<T extends { [field: string]: any }> = {
    data: T;
    rules: { [field in keyof T]?: any };
    submit: (data: T) => void;
    validateForm?: (data: T) => string[];
    children?: React.ReactNode;
};
export function FormValidator<T extends { [field: string]: any }>({
    data,
    rules,
    submit,
    validateForm,
    children
}: FormValidatorProps<T>) {
    const [dirty, setDirty] = useState<{ [field in keyof T]: boolean }>({} as any);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [fieldErrors, setFieldErrorsState] = useState<{ [field in keyof T | "form"]?: string[] }>({});
    // Calcula errores por campo cada vez que cambian data o rules
    const errors = useMemo(() => {
        const e = ValidateData(data, rules);
        // Validaci�n global del formulario
        if (formSubmitted && validateForm) {
            const globalErrors = validateForm(data);
            if (globalErrors.length > 0) {
                return { ...e, form: globalErrors };
            }
        }
        return e;
    }, [data, rules, formSubmitted, validateForm]);
    const formValid = Object.keys(errors).length === 0;
    // Funci�n para marcar un campo como "dirty"
    const setFieldDirty = useCallback((field: string, isDirty: boolean) => {
        setDirty(prev => ({ ...prev, [field]: isDirty }));
    }, []);
    // Funci�n para actualizar errores de un campo
    const setFieldErrors = useCallback((field: string, messages: string[]) => {
        setFieldErrorsState(prev => ({ ...prev, [field]: messages }));
    }, []);
    const handleChange = (ev: ChangeEvent<HTMLDivElement>) => {
        const target = ev.target as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
        const name = target.name;
        setFieldDirty(name, true);
    };
    const handleClick = () => {
        setFormSubmitted(true);
        if (formValid) {
            if (!validateForm) {
                submit(data);
                return;
            }
            const globalErrors = validateForm(data);
            if (globalErrors.length === 0) {
                submit(data);
            } else {
                setFieldErrors("form", globalErrors);
            }
        }
    };
    const getButtonClasses = () => (formSubmitted && !formValid ? "btn-danger" : "btn-primary");
    const getMessagesForField = (field: string) => {
        return (formSubmitted || !!dirty[field]) ? errors[field] || [] : [];
    };
    const contextValue: ValidationContextType = {
        errors,
        dirty,
        formSubmitted,
        getMessagesForField,
        setFieldErrors,
        setFieldDirty,
        setFormSubmitted
    };
    return (
        <>
            <ValidationContext.Provider value={contextValue}>
                <div onChangeCapture={handleChange}>{children}</div>
            </ValidationContext.Provider>
            <div className="text-center mt-2">
                <button
                    className={`btn ${getButtonClasses()}`}
                    onClick={handleClick}
                    disabled={formSubmitted && !formValid}
                >
                    Submit
                </button>
            </div>
        </>
    );
}