const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let items = [
    { id: 1, name: 'Ноутбук', price: 75000 },
    { id: 2, name: 'Мышь', price: 1500 },
    { id: 3, name: 'Клавиатура', price: 3000 }
];


app.get('/items', (req, res) => {
    res.json(items); 
});

app.get('/items/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const item = items.find(i => i.id === id);
    if (!item) {
        return res.status(404).json({ error: 'Товар не найден' });
    }
    res.json(item);
});

app.post('/items', (req, res) => {
    const { name, price } = req.body;
    if (!name || price === undefined) {
        return res.status(400).json({ error: 'Не указаны название или цена' });
    }
    const newItem = {
        id: Date.now(),
        name,
        price
    };
    items.push(newItem);
    res.status(201).json(newItem);
});

app.patch('/items/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const item = items.find(i => i.id === id);
    if (!item) {
        return res.status(404).json({ error: 'Товар не найден' });
    }
    const { name, price } = req.body;
    if (name !== undefined) item.name = name;
    if (price !== undefined) item.price = price;
    res.json(item);
});

app.delete('/items/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const initialLength = items.length;
    items = items.filter(i => i.id !== id);
    if (items.length === initialLength) {
        return res.status(404).json({ error: 'Товар не найден' });
    }
    res.status(204).send();
});


app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});
