import { useState } from 'react';
import './App.css';
import { useCurrency } from './services/conversorFunction';
import Selector from './components/selector';

//Componente APP
const App = () => {
  //Hook para la cantidad(empieza en 0)
  const [amount, setAmount] = useState<number>(0);
  //Hook para la moneda de origen (empieza en Euros)
  const [fromCurrency, setFromCurrency] = useState<string>('EUR');
  //Hook para la moneda de destino (Empieza en Dolares)
  const [toCurrency, setToCurrency] = useState<string>('USD');

  //recogemos del Hook-servicio los valores que necesita para reconocer los cambios y lanzarse
  //los cuales son la cantidad inicial, la moneda de inicio y la de fin (estas dos ultimas les metemos 
  //lso valores de los estados actuales)
  const { total, loading } = useCurrency({ 
    amount, 
    baseCurrency: fromCurrency, 
    targetCurrency: toCurrency 
  });

 return (
    <div className="main-wrapper">
      {/* Con esto se gestiona el cambio de fondo de las banderas en css
        Tanto la bandera de entrada como la de salida
      */}
      <div className="flag-background-container">
        <div className={`flag-half flag-left flag-${fromCurrency}`}></div>
        <div className={`flag-half flag-right flag-${toCurrency}`}></div>
      </div>

      <div className="container mt-5 position-relative">
        <div className="row justify-content-center w-100 m-0">
          <div className="col-md-5">
            <div className="card shadow-lg border border-5 border-primary">
              <div className="card-header bg-primary text-white text-center py-3">
                <h3 className="mb-0">CURRENCY CONVERTER</h3>
              </div>
              
              <div className="card-body p-4">
                <div className="mb-4">
                  <label className="form-label fw-bold text-muted small">QUANTITY</label>
                  {/*Input para el valor inicial del usuario. Posee el valor sel state (Hook)
                  y llama a la funcion para actualizar el valor de dicho state(la del Hook) mediante
                  el onChange*/}
                  <input 
                    type="number" 
                    className="form-control form-control-lg bg-light" 
                    placeholder="0.00"
                    value={amount === 0 ? "" : amount}
                    onChange={(e) => setAmount(Number(e.target.value))} 
                  />
                </div>

                <div className="row g-2 mb-4 align-items-end">
                  <Selector
                    label="FROM" 
                    value={fromCurrency} 
                    onChange={setFromCurrency} 
                  />

                  <div className="col-auto pb-2 text-center">
                    <span className="text-primary fw-bold">➔</span>
                  </div>
                  {/*Componente selector al que le pasamos el valor del label, el valor de
                  su selector actual (en este caso el final), y la funcion del hook para cambiar
                  las monedas en las options */}
                  <Selector 
                    label="TO" 
                    value={toCurrency} 
                    onChange={setToCurrency} 
                  />
                </div>

                <div className="bg-light p-3 rounded-3 text-center border">
                  {loading ? (
                    <div className="spinner-border spinner-border-sm text-primary" role="status"></div>
                  ) : (
                    <div>
                      <span className="text-muted d-block small mb-1 text-uppercase">TOTAL APROX</span>
                      <h2 className="text-primary mb-0 fw-bold">
                        {/*Mediante las siguientes lineas de codigo formateamos el total,
                        mostrando tambien el simbolo correspondiente(o la nomenclatura) que 
                        corresponda a dicha moneda */}
                        {new Intl.NumberFormat('es-ES', { 
                          style: 'currency', 
                          currency: toCurrency 
                        }).format(total)}
                      </h2>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;