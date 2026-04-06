# Pasos para aplicar las validaciones en este proyecto

A continuación tienes una guía detallada (basada en `READMe/Validacion.md`) de cómo se aplican las validaciones en este proyecto. Incluye referencias a los archivos concretos y fragmentos de código tal cual están en el repositorio.

---

## 1) Inicializa el estado del formulario

En el archivo [src/components/ProductosTable.tsx](src/components/ProductosTable.tsx) define el `formData` con valores iniciales (se limpian al crear y se rellenan al editar):

```tsx
const [formData, setFormData] = useState({
  id: selectedProduct.id ? selectedProduct.id : 0,
  name: selectedProduct.name ? selectedProduct.name : "",
  category: selectedProduct.category ? selectedProduct.category : "",
  price: selectedProduct.price ? selectedProduct.price : 0,
  enableTerms: false,
});
```

> Nota: el `id` se incluye para que, si existe, se envíe en la edición; si no, la API puede auto-generarlo.

---

## 2) Define las reglas de validación

En el mismo archivo [src/components/ProductosTable.tsx](src/components/ProductosTable.tsx) declara las reglas asociadas a cada campo. Usamos la regla `true` para obligar a marcar el checkbox.

```tsx
const rules: { [key in keyof typeof formData]?: any } = {
  name: { required: true, minlength: 3 },
  category: { required: true, minlength: 3 },
  price: { required: true, minValue: 1 },
  enableTerms: { true: true },
};
```

---

## 3) Añade o modifica reglas globales

Si necesitas reglas nuevas, edita [src/validations/Validation.tsx](src/validations/Validation.tsx):

- Declara la regla en `FieldRule`.
- Implementa la lógica y mensaje de error dentro del bucle que recorre `rules`.

Ejemplo de la regla existente para checkboxes (`true`):

```tsx
if (fieldRules.true) {
  if (value !== true) {
    fieldErrors.push("Must be checked");
  }
}
```

---

## 4) Asegura el guardado de productos

Sigue la firma de `saveProduct` en [src/components/ProductosTable.tsx](src/components/ProductosTable.tsx):

```tsx
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
```

---

## 5) Envuelve el formulario con `FormValidator`

Sustituye la etiqueta `Form` por `FormValidator` y pasa las props necesarias en [src/components/ProductosTable.tsx](src/components/ProductosTable.tsx):

```tsx
<FormValidator data={formData} rules={rules} submit={saveProduct}>
  {/* ...FormGroups... */}
</FormValidator>
```

### Botón Submit y `handleClick` en [src/validations/FormValidator.tsx](src/validations/FormValidator.tsx)

El guardado de datos pasa por el botón `Submit` que dibuja `FormValidator`. No pintes un botón adicional en el modal: este botón ya valida y llama a `submit` (que es `saveProduct`).

```tsx
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
...
<button
  className={`btn ${getButtonClasses()}`}
  onClick={handleClick}
  disabled={formSubmitted && !formValid}
>
  Submit
</button>
```

---

## 6) Resetea el formulario al crear

En el botón "Add Product" de [src/components/ProductosTable.tsx](src/components/ProductosTable.tsx), limpia tanto `selectedProduct` como `formData`:

```tsx
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
```

---

## 7) Precarga datos al editar

En el botón "Edit" de la tabla en [src/components/ProductosTable.tsx](src/components/ProductosTable.tsx), carga el producto seleccionado en `formData` para que el modal muestre sus valores:

```tsx
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
```

---

## 8) Añade los campos y mensajes en el modal

Dentro del `FormValidator` en [src/components/ProductosTable.tsx](src/components/ProductosTable.tsx), cada campo debe tener su `ValidationMessage`.

- Campo de texto (ej. `name`):

```tsx
<FormGroup>
  <Label>Name</Label>
  <Input
    value={formData.name}
    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
  />
  <ValidationMessage field="name" />
</FormGroup>
```

- Checkbox requerido:

```tsx
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
```

- Mensaje global (si usas validación del formulario completo):

```tsx
<ValidationMessage field="form" />
```

---

## 9) Resumen de flujo

1. El usuario abre el modal (crear o editar) → `formData` se rellena o se limpia según corresponda.
2. En Submit, `FormValidator` valida campo a campo según `rules` y, si todo es válido, llama a `saveProduct`.
3. `saveProduct` decide POST o PUT según haya `id`, refresca la tabla y cierra el modal.

---

## 10) Dónde ajustar mensajes o lógica

- Mensajes y reglas personalizadas: [src/validations/Validation.tsx](src/validations/Validation.tsx)
- Lógica del submit y modal: [src/components/ProductosTable.tsx](src/components/ProductosTable.tsx)
- Componentes de mensaje: [src/validations/ValidationMessage.tsx](src/validations/ValidationMessage.tsx) (ya usados en los campos)
- Mensajes globales adicionales: [src/validations/WholeFormValidation.tsx](src/validations/WholeFormValidation.tsx) (en este proyecto no se añadieron nuevos mensajes globales)

Con estos pasos tienes una referencia completa y visual para mantener o extender las validaciones en el proyecto, siguiendo la estructura definida en `Validacion.md`.
