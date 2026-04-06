import app from './app';
import mongoose from 'mongoose';

const PORT = 4000;

mongoose
    .connect('mongodb://127.0.0.1:27017/incidentes')
    .then(() => {
        console.log('MongoDB conectado');
        app.listen(PORT, () =>
            console.log(`Servidor corriendo en http://localhost:${PORT}`)
        );
    })
    .catch(console.error);
