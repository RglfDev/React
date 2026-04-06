import { useState, useEffect } from "react";


//Este hook utiliza un tipo generico T para permitir almacenar cualquier tipo de dato en el LocalStorage.
//Este hook la verdad es que me ha resultado bastante utiel e interesante, y tambien sencillo de aplicar.
export function useLocalStorage<T>(key: string, initialValue: T) {
    //Aqui permitimos pasar una funcion al state de cualquier tipo T, para que se ejecute solo una vez al inicializar el hook.
    const [value, setValue] = useState<T>(() => {
        //Buscamos en el navegador si ya existe algo guardado con ese nombre (key)
        const storedValue = localStorage.getItem(key);
        if (storedValue) {
            try {
                //Recuperamos lo guardado y lo parseamos de JSON a su tipo original para poder tratarlo.
                return JSON.parse(storedValue) as T;
            } catch {
                //Si los datos estan corruptos o mal formados, simplemente cargamos los datos iniciales para no romper.
                return initialValue;
            }
        }
        return initialValue;
    });

    //Cada vez que el valor cambie, lo guardamos en el LocalStorage convirtiendolo a JSON. 
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue] as const;
}
