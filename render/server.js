const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json());

app.get('/tunel', (req, res) => {
  try {
    const data = fs.readFileSync('tunnel.json', 'utf8');
    res.type('json').send(data);
  } catch (e) {
    res.status(500).send({ error: 'No se pudo leer el túnel' });
  }
});

app.post('/tunel', (req, res) => {
  const { host, port, key } = req.body;

  if (key !== 'mi_clave_supersecreta') {
    return res.status(403).send({ error: 'Clave incorrecta' });
  }

  if (!host || !port) {
    return res.status(400).send({ error: 'Falta host o port' });
  }

  fs.writeFileSync('tunnel.json', JSON.stringify({ host, port }, null, 2));
  res.send({ ok: true });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Servidor en el puerto ${port}`));
