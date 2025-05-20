import express from "express";
import morgan  from 'morgan'

const app = express();

app.use(morgan("dev"));
app.use(express.json());


app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
});
