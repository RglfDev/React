import { useEffect, useState } from "react";

export default function Spinner() {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setVisible(false), 3000);
        return () => clearTimeout(timer);
    }, []);

    if (!visible) return null;

    return <p>Cargando...</p>;
}