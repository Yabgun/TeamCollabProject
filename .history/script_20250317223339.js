// DOM elementlerini seç
const todoInput = document.getElementById('todo-input');
const addButton = document.getElementById('add-button');
const todoList = document.getElementById('todo-list');

// Yerel depolamadan To-Do'ları yükle
let todos = JSON.parse(localStorage.getItem('todos')) || [];

// Sayfa yüklendiğinde To-Do'ları göster
document.addEventListener('DOMContentLoaded', () => {
    renderTodos();
});

// "Ekle" düğmesine tıklama olayını ekle
addButton.addEventListener('click', addTodo);

// Enter tuşuna basınca To-Do ekle
todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTodo();
    }
});

// Yeni To-Do ekle
function addTodo() {
    const todoText = todoInput.value.trim();
    
    if (todoText === '') return;
    
    const todo = {
        id: Date.now(),
        text: todoText,
        completed: false
    };
    
    todos.push(todo);
    saveTodos();
    renderTodos();
    
    todoInput.value = '';
}

// To-Do'ları render et
function renderTodos() {
    todoList.innerHTML = '';
    
    todos.forEach(todo => {
        const li = document.createElement('li');
        li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
        
        li.innerHTML = `
            <span>${todo.text}</span>
            <div class="todo-actions">
                <button class="complete-btn" data-id="${todo.id}">
                    ${todo.completed ? '✓' : '○'}
                </button>
                <button class="delete-btn" data-id="${todo.id}">🗑</button>
            </div>
        `;
        
        todoList.appendChild(li);
    });
    
    // Tamamla düğmelerine olay dinleyicileri ekle
    document.querySelectorAll('.complete-btn').forEach(btn => {
        btn.addEventListener('click', toggleTodo);
    });
    
    // Silme düğmelerine olay dinleyicileri ekle
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', deleteTodo);
    });
}

// To-Do durumunu değiştir (tamamlandı/tamamlanmadı)
function toggleTodo(e) {
    const id = Number(e.target.getAttribute('data-id'));
    
    todos = todos.map(todo => {
        if (todo.id === id) {
            return { ...todo, completed: !todo.completed };
        }
        return todo;
    });
    
    saveTodos();
    renderTodos();
}

// To-Do sil
function deleteTodo(e) {
    const id = Number(e.target.getAttribute('data-id'));
    
    todos = todos.filter(todo => todo.id !== id);
    
    saveTodos();
    renderTodos();
}

// To-Do'ları yerel depolamaya kaydet
function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
} 