const express = require('express');
const app = express();

// важно для формы
app.use(express.urlencoded({ extended: true }));

let requests = [];

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Заявки</title>
      <meta charset="utf-8">
    </head>

    <body style="font-family:Arial; background:#111; color:white; text-align:center; padding-top:50px;">

      <h1>🚀 Создать заявку</h1>

      <form method="POST" action="/add">
        <input name="price" placeholder="Цена" style="padding:10px; margin:5px;"><br>
        <input name="unload" placeholder="Выгрузка" style="padding:10px; margin:5px;"><br>
        <button type="submit" style="padding:10px 20px;">Создать</button>
      </form>

    </body>
    </html>
  `);
});

// создание заявки
app.post('/add', (req, res) => {
  const id = Date.now();

  requests.push({
    id,
    price: req.body.price,
    unload: req.body.unload
  });

  res.send(`
    <h2>Заявка создана ✅</h2>
    <p>Ссылка: <a href="/client/${id}">Открыть заявку</a></p>
  `);
});

// просмотр заявки
app.get('/client/:id', (req, res) => {
  const item = requests.find(r => r.id == req.params.id);

  if (!item) return res.send('Заявка не найдена');

  res.send(`
    <h1>Ваша заявка</h1>
    <p>Цена: ${item.price}</p>
    <p>Выгрузка: ${item.unload}</p>
  `);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Запуск на ' + PORT);
});
