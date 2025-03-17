const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Örnek To-Do verileri
let todos = [
  { id: 1, text: 'Express projesini oluştur', completed: true },
  { id: 2, text: 'EJS template oluştur', completed: false },
  { id: 3, text: 'To-Do arayüzünü geliştir', completed: false }
];

// Ana sayfa rotası
app.get('/', (req, res) => {
  res.render('index', { todos });
});

// Yeni To-Do ekleme
app.post('/todos', (req, res) => {
  const newTodo = {
    id: Date.now(),
    text: req.body.text,
    completed: false
  };
  todos.push(newTodo);
  res.redirect('/');
});

// To-Do durumunu güncelleme
app.post('/todos/:id/toggle', (req, res) => {
  const id = parseInt(req.params.id);
  todos = todos.map(todo => 
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  );
  res.redirect('/');
});

// To-Do silme
app.post('/todos/:id/delete', (req, res) => {
  const id = parseInt(req.params.id);
  todos = todos.filter(todo => todo.id !== id);
  res.redirect('/');
});

// Sunucuyu başlat
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
}); 