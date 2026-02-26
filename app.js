const express = require('express');
const app = express();
const port = 3000;

// Middleware для парсинга JSON (обязательно для работы с req.body)
app.use(express.json());

// Временное хранилище данных (в реальном проекте здесь была бы база данных)
let items = [
    { id: 1, name: 'Ноутбук', price: 75000 },
    { id: 2, name: 'Мышь', price: 1500 },
    { id: 3, name: 'Клавиатура', price: 3000 }
];

// ---------------------- CRUD операции ----------------------

// GET /items – получить все товары
app.get('/items', (req, res) => {
    res.json(items); // отправляем массив в формате JSON
});

// GET /items/:id – получить один товар по id
app.get('/items/:id', (req, res) => {
    const id = parseInt(req.params.id); // id из URL (строка) преобразуем в число
    const item = items.find(i => i.id === id);
    if (!item) {
        return res.status(404).json({ error: 'Товар не найден' });
    }
    res.json(item);
});

// POST /items – добавить новый товар
app.post('/items', (req, res) => {
    const { name, price } = req.body; // данные из тела запроса
    if (!name || price === undefined) {
        return res.status(400).json({ error: 'Не указаны название или цена' });
    }
    const newItem = {
        id: Date.now(), // простой способ генерации уникального id (на основе текущего времени)
        name,
        price
    };
    items.push(newItem);
    res.status(201).json(newItem); // 201 = Created
});

// PATCH /items/:id – обновить существующий товар (частично)
app.patch('/items/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const item = items.find(i => i.id === id);
    if (!item) {
        return res.status(404).json({ error: 'Товар не найден' });
    }
    const { name, price } = req.body;
    if (name !== undefined) item.name = name;
    if (price !== undefined) item.price = price;
    res.json(item); // возвращаем обновлённый объект
});

// DELETE /items/:id – удалить товар
app.delete('/items/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const initialLength = items.length;
    items = items.filter(i => i.id !== id); // фильтруем, исключая удаляемый
    if (items.length === initialLength) {
        return res.status(404).json({ error: 'Товар не найден' });
    }
    res.status(204).send(); // 204 No Content – стандартный ответ на успешное удаление без тела
});

// -----------------------------------------------------------

// Запуск сервера
app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});