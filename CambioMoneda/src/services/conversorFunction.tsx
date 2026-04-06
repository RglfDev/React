import { useState, useEffect } from 'react';
import type { Currency, CurrencyTotal } from '../types/types';

const apiKey = import.meta.env.VITE_API_KEY;
const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest`;

//Creacion del Hook-Servicio que conecta con la api y recupera los valores necesarios para el cambio
export const useCurrency = ({ amount, baseCurrency, targetCurrency }: Currency): CurrencyTotal => {
    //Creamos los Hooks para el total del calculo y el elemento de carga(la bandera) 
    const [total, setTotal] = useState<number>(0); 
    const [loading, setLoading] = useState<boolean>(false);

    /*Con este useEffect controlo tres cosas:
        - El input del usuario
        - El spinner de entrada
        - El spinner de salida
        Si cualquiera de ellos cambia, la funcionalidad de dentro de este se vuelve a disparar
    */
    
        //Si la cantidad es menor o 0 no se ejecuta la API para no sobrecargar la app
    useEffect(() => {
        if (amount <= 0) {
            setTotal(0);
            return;
        }
        //Si las monedas son iguales, tampoco llamamos a la API, porque el resultado es el mismo.
        if (baseCurrency === targetCurrency) {
            setTotal(amount);
            return;
        }

        //Utilizo AbortController para evitar que, si el usuario escribe desmasiado rapido,
        //se disparen varias peticiones a la vez, haciendo que solo cuente la ultima
        const controller = new AbortController()

        //Metodo asincrono para ejecutar la llamada de la API
        const updateData = async () => {
            //Empezamos a cargar
            setLoading(true);
            try {
                //Llamada a la API a traves de las variables que contienen las "Variables de Entorno"
                //necesarias para construir la url.
                const response = await fetch(`${url}/${baseCurrency}`,
                {signal: controller.signal});
                //Guardamos la respuesta como siempre
                const data = await response.json();
                    //De todos los datos que devuelve la API, solo extraemos la que corresponde con la
                    //eleccion del usuario enel segundo selecctor
                    const rate = data.conversion_rates[targetCurrency];
                    setTotal(amount * rate);
                //En este catch se ignoran los errores de cancelacion al escribir rapido. Solo avisa de los errores de verdad.
            } catch (err) {
                    if(err instanceof Error && err.name !=="AbortError"){
                        console.error("Error to find", err.message)
                    }
                    //Por ultimo, finalizamos el proceso de carga
            } finally {
                setLoading(false);
            }
        };

        //ejecutamos el metodo de la llamada a la API
        updateData();

        //con este return, cancelamos cualquier peticion que se haya quedado en el aire cuando el usuario
        //vuelve a hacer otra peticion, creando un nuevo controlador con la nueva peticion (es como borrar y reiniciar)
        return() => controller.abort()
    }, [amount, baseCurrency, targetCurrency]);

    //devolvemos hacia APP el numero total y el estado de loading, para que App los implemente
    return { total, loading};
};