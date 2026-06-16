const express = require('express');
const app = express();
app.use(express.json());

let requests = [];

app.get('/', (req, res) => {
  res.send('Сервер работает');
});

// клиентская ссылка
app.get('/client/:id', (req, res) => {
  const item = requests.find(r => r.id == req.params.id);
  if (!item) return res.send('Заявка не найдена');

  res.send(`
    <h1>Ваша заявка</h1>
    <p>Цена: ${item.price} ₽</p>
    <p>Выгрузка: ${item.unload}</p>
    <p>Важно: проверьте, сможет ли фура подъехать</p>
  `);
});

// админ добавляет заявку
app.post('/add', (req, res) => {
  const id = Date.now();
  requests.push({
    id,
    price: req.body.price,
    unload: req.body.unload
  });
  res.send({ link: "/client/" + id });
});

app.listen(3000, () => console.log('Запуск'));
