const addBtn = document.querySelector('.add');
const input = document.querySelector('.input');
const listTodo = document.querySelector('.list-todo');

addBtn.addEventListener('click', () => {
	const text = input.value;
	if (text === '') {
		return;
	}

	saveTodo(text);

	input.value = '';
});

function saveTodo(text) {
	// Save todo to local storage
	const todo = { title: text, completed: false };
	const todoList = JSON.parse(localStorage.getItem('todoList')) || [];
	todoList.push(todo);
	localStorage.setItem('todoList', JSON.stringify(todoList));

	updateList();
}

function updateList() {
	let parent = document.querySelector('.list-todo ul');
	parent.innerHTML = '';

	const todoList = JSON.parse(localStorage.getItem('todoList')) || [];
	todoList.forEach((element, index) => {
		parent.appendChild(createTodoElement(element, index));
	});

	addListeners();
}

function createTodoElement(todo, index) {
	console.log(todo);
	const li = document.createElement('li');
	if (todo.completed) {
		li.classList.add('completed');
	}
	console.log(todo.completed);
	let checked = null;
	if (todo.completed) {
		checked = 'checked';
	}
	li.innerHTML =
		'<input type="checkbox" id="' +
		index +
		'" name="vehicle1" ' +
		checked +
		' value="Bike"><label for=' +
		index +
		'>' +
		todo.title +
		'</label> <span tabindex="0" class="material-symbols-outlined delete" data-index="' +
		index +
		'">delete</span>';

	return li;
}
function addListeners() {
	clearLister();
	const deleteBtns = document.querySelectorAll('.delete');
	deleteBtns.forEach((btn) => {
		btn.addEventListener('click', (e) => {
			console.log('delete button clicked');
			const index = e.target.getAttribute('data-index');
			deleteTodoItem(index);
		});
	});

	const checkboxes = document.querySelectorAll('input[type="checkbox"]');
	checkboxes.forEach((checkbox) => {
		checkbox.addEventListener('change', (e) => {
			console.log('checkbox clicked');
			const index = e.target.id;
			toggleCompleted(index, e.target.checked);
		});
	});
}

function toggleCompleted(index, val) {
	console.log('toggleCompleted', index, val);
	const todoList = JSON.parse(localStorage.getItem('todoList')) || [];
	if (todoList.length > 0) {
		todoList[index].completed = val;
		localStorage.setItem('todoList', JSON.stringify(todoList));
		updateList();
	}
}

function deleteTodoItem(index) {
	if (confirm('Are you sure you want to delete this todo?')) {
		const todoList = JSON.parse(localStorage.getItem('todoList')) || [];
		if (todoList.length > 0) {
			todoList.splice(index, 1);
			localStorage.setItem('todoList', JSON.stringify(todoList));
			updateList();
		}
	}
}

function clearLister() {
	const deleteBtns = document.querySelectorAll('.delete');
	deleteBtns.forEach((btn) => {
		btn.removeEventListener('click', () => {});
	});
}
updateList();
