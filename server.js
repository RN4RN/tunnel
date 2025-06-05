const express = require('express');
const app = express();
app.use(express.json());

let datos = { ip: null, puerto: null };

app.post('/registro', (req, res) => {
  const { ip, puerto } = req.body;
  if (ip && puerto) {
    datos = { ip, puerto };
    res.send({ status: "OK", mensaje: "Registrado correctamente" });
  } else {
    res.status(400).send({ error: "Faltan datos" });
  }
});

app.get('/ip', (req, res) => {
  res.send(datos);
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Servidor en el puerto ${PORT}`));
