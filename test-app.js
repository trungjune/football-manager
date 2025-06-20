const express = require('express');
const app = express();
const port = 3001;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/api/docs', (req, res) => {
  res.send('API Documentation');
});

app.listen(port, () => {
  console.log(`Test app listening at http://localhost:${port}`);
}); 