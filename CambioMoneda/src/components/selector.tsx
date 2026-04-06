import React from 'react';
import { currenciesSelection, type SelectProps } from '../types/types';


//Componente del selector que recibe sus propias Props
const Selector: React.FC<SelectProps> = ({ label, value, onChange }) => {
  return (
    <div className="col">
      <label className="form-label text-muted small text-uppercase fw-bold">{label}</label>
      <select 
        className="form-select shadow-sm" 
        value={value} 
        onChange={(e) => onChange(e.target.value)}
      >
        {/*Recorriendo la lista de monedas (textos) los vamos metiendo en las opciones del selector*/}
        {currenciesSelection.map(c => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>
    </div>
  );
};

export default Selector;