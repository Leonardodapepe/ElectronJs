const todoInput = document.getElementById('todo-input');
const addTodoButton = document.getElementById('add-todo');
const todoList = document.getElementById('todo-list');

let todos = [];

//load json stuff
async function loadTodos() {
  todos = await window.todoAPI.loadTodos(); 
  renderTodos(); 
}

//json save
function saveTodos() {
  window.todoAPI.saveTodos(todos); 
}

//renders stuff
function renderTodos() {
  todoList.innerHTML = ''; 
  todos.forEach((todo, index) => {
    const li = document.createElement('li');
    li.textContent = todo;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete'; 
    deleteButton.addEventListener('click', () => {
      todos.splice(index, 1); 
      renderTodos(); 
      saveTodos(); 
    });

    li.appendChild(deleteButton); //add delete button
    todoList.appendChild(li); //adds to list
  });
}
//robin hallgren
//new task
addTodoButton.addEventListener('click', () => {
  const task = todoInput.value.trim();
  if (task) {
    todos.push(task); 
    todoInput.value = ''; 
    renderTodos(); 
    saveTodos(); 
  }
});

loadTodos(); 