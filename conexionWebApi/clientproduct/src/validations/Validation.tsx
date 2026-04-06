// Gestiona las reglas de validaci�n

import validator from "validator";


export type FieldRule = {
    required?: boolean;
    minlength?: number;
    alpha?: boolean;
    email?: boolean;
    equals?: string;
    true?: boolean;
    minValue?: number;
};

export type ValidationRules = {
    [field: string]: FieldRule;
};

export type FormData = {
    [field: string]: string | boolean;
};

export type ValidationErrors = {
    [field: string]: string[];
};

export function ValidateData(data: FormData, rules: ValidationRules): ValidationErrors {
    const errors: ValidationErrors = {};

    Object.keys(rules).forEach(field => {
        const fieldRules = rules[field];
        const value = data[field];
        const fieldErrors: string[] = [];

        // Comprobar que el campo cumple con las reglas de validacion
        if (fieldRules.true) {
            if (value !== true) {
                fieldErrors.push("Must be checked");                
            }
        }
        else {
            // Campo Required
            const strVal = String(value ?? "");

            if (fieldRules.required && validator.isEmpty(strVal)) {
                fieldErrors.push("Value required");
            }

            if (!validator.isEmpty(strVal)) {
                // Longitud minima
                if (fieldRules.minlength && !validator.isLength(strVal, { min: fieldRules.minlength })) {
                    fieldErrors.push(`Enter at least ${fieldRules.minlength} characters`);
                };
                // Comprobar que son letras
                if (fieldRules.alpha && !validator.isAlpha(strVal)) {
                    fieldErrors.push(`Enter only letters`);
                };
                // Comprobar email
                if (fieldRules.email && !validator.isEmail(strVal)) {
                    fieldErrors.push("Enter a valid email address");
                };
                // Comprobar campos de repetici�n (confirmar email, confirmal contrase�a, etc)
                const equalsField = rules[field].equals; // temporal
                if (equalsField) {
                    const otherValue = data[equalsField];
                    if (otherValue !== undefined && String(otherValue) !== String(data[field])) {
                        fieldErrors.push("Values don't match");
                    }
                };

                if (fieldRules.minValue !== undefined) {
    // Convertimos a número para comparar, si no es un número válido validator.isNumeric ayuda
    const numValue = parseFloat(strVal);
    
    if (isNaN(numValue) || numValue < fieldRules.minValue) {
        fieldErrors.push(`Value must be at least ${fieldRules.minValue}`);
    }
}
            }
        }

        if (fieldErrors.length > 0) {
            errors[field] = fieldErrors;
        }
    });

    return errors;
}