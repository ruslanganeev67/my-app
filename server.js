const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Мой сервер</title>
      <meta charset="utf-8">
    </head>
    <body style="font-family: Arial; text-align:center; margin-top:80px; background:#111; color:white;">
      <h1>🚀 Сервер работает</h1>
      <p>API активен</p>
      <p>/add — добавить заявку</p>
      <p>/client/:id — посмотреть заявку</p>
    </body>
    </html>
  `);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Запуск на ' + PORT);
});
