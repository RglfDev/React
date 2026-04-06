//Tipo para el service (El hook personalizado que he creado con el useEffect)
export type Currency = {
    amount: number; //cantidad
    baseCurrency: string; //mondea de origen (texto)
    targetCurrency: string; //moneda final (texto tambien)
};

//Tipo para el resultado de la conversion
export type CurrencyTotal = {
    total: number; //el calculo total
    loading: boolean; //bandera para saber si la API trabaja
};

//Tipo para los selectores
export type SelectProps = {
  label: string; //El label que se muestra
  value: string; //valor de cada selector
  onChange: (newValue: string) => void; //Callback para meter un valor de la variable "currenciesSelector en el seleector"
}

//variable de donde va a recoger los nombres el selector
export const currenciesSelection = ["EUR", "USD", "RUB"];