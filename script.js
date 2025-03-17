
const todoInput = document.getElementById('todo-input');
const addButton = document.getElementById('add-button');
const todoList = document.getElementById('todo-list');


let todos = JSON.parse(localStorage.getItem('todos')) || [];


document.addEventListener('DOMContentLoaded', () => {
    renderTodos();
});


addButton.addEventListener('click', addTodo);


todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTodo();
    }
});


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
    
    
    document.querySelectorAll('.complete-btn').forEach(btn => {
        btn.addEventListener('click', toggleTodo);
    });
    
    
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', deleteTodo);
    });
}


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


function deleteTodo(e) {
    const id = Number(e.target.getAttribute('data-id'));
    
    todos = todos.filter(todo => todo.id !== id);
    
    saveTodos();
    renderTodos();
}


function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
} 