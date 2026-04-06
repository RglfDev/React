# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs["recommended-typescript"],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

# Guía para Implementar Validaciones en Formularios

Esta guía te ayudará a implementar validaciones en tus formularios utilizando el sistema de validación que has creado. A continuación, se describen los pasos para aplicar validaciones individuales por campo y una validación global al pulsar el botón de enviar.

## 1. Estructura del Formulario

Asegúrate de que tu formulario esté estructurado correctamente. Aquí hay un ejemplo básico:

```tsx
import React, { useState } from "react";
import { FormValidator } from "./validations/FormValidator";

const MyForm = () => {
  const [formData, setFormData] = useState({
    field1: "",
    field2: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validación global
    const validationErrors = FormValidator.validate(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      // Procesar el formulario
      console.log("Formulario enviado:", formData);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Campo 1:</label>
        <input
          type="text"
          name="field1"
          value={formData.field1}
          onChange={handleChange}
        />
        {errors.field1 && <span>{errors.field1}</span>}
      </div>
      <div>
        <label>Campo 2:</label>
        <input
          type="text"
          name="field2"
          value={formData.field2}
          onChange={handleChange}
        />
        {errors.field2 && <span>{errors.field2}</span>}
      </div>
      <button type="submit">Enviar</button>
    </form>
  );
};

export default MyForm;
```

## 2. Validaciones Individuales por Campo

Para aplicar validaciones individuales, puedes utilizar el método `validateField` de tu `FormValidator`. Aquí hay un ejemplo:

```tsx
const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData({ ...formData, [name]: value });

  // Validación individual
  const error = FormValidator.validateField(name, value);
  setErrors({ ...errors, [name]: error });
};
```

## 3. Validación Global al Pulsar el Botón Submit

La validación global se realiza en el método `handleSubmit`, como se mostró en el ejemplo del formulario. Asegúrate de que todas las validaciones se realicen antes de procesar el formulario.

## 4. Ejemplo de `FormValidator`

Asegúrate de que tu `FormValidator` tenga métodos como `validate` y `validateField` para manejar las validaciones:

```tsx
class FormValidator {
  static validate(formData) {
    const errors = {};
    if (!formData.field1) {
      errors.field1 = "Campo 1 es requerido";
    }
    if (!formData.field2) {
      errors.field2 = "Campo 2 es requerido";
    }
    return errors;
  }

  static validateField(name, value) {
    if (!value) {
      return `${name} es requerido`;
    }
    return "";
  }
}
```

## Conclusión

Siguiendo estos pasos, podrás implementar validaciones efectivas en tus formularios. Asegúrate de personalizar los mensajes de error y las reglas de validación según tus necesidades específicas.
