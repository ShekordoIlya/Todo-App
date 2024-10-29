const root = document.getElementById("root");
let todoArr = getTodoFromStorage();

document.addEventListener("DOMContentLoaded", () => {
  todoArr.forEach((element) => {
    createTodo(element);
  });
});

//container
const container = document.createElement("div");
container.className = "container";

//Header
const header = document.createElement("div");
header.className = "header";

//Delete all button
const deleteAllBtn = document.createElement("button");
const deleteAllBtnText = document.createTextNode("Delete All");
deleteAllBtn.id = "deleteAllBtn";
deleteAllBtn.append(deleteAllBtnText);

//Input field
const textInput = document.createElement("input");
textInput.value = "Enter todos...";
textInput.id = "textInput";

textInput.addEventListener("focus", (e) => {
  e.target.value = "";
});

//Button add
const addBtn = document.createElement("button");
addBtn.id = "addBtn";
const addBtnText = document.createTextNode("Add");
addBtn.append(addBtnText);

addBtn.addEventListener("click", addTodo);

//Todos wrapper
const todosWrapper = document.createElement("ul");
todosWrapper.id = "todosWrapper";

//Cards
function addTodo() {
  const card = {
    id: (Date.now() / 1000) * 1000,
    text: textInput.value,
    date: new Date().toLocaleDateString("ru-RU"),
    isChecked: false,
  };
  createTodo(card);
  todoArr.push(card);
  setTodoInStorage(todoArr);
  textInput.value = "";
}

function setTodoInStorage(todos) {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodoFromStorage() {
  if (localStorage.getItem("todos")) {
    return JSON.parse(localStorage.getItem("todos"));
  }
  return [];
}

function createTodo(card) {
  //Todo item
  const todo = document.createElement("li");
  todo.className = "todo";
  todo.id = "todo";

  //Checkbox todo
  const checkBoxTodo = document.createElement("input");
  checkBoxTodo.setAttribute("type", "checkbox");
  checkBoxTodo.id = "checkBoxTodo";
  checkBoxTodo.checked = card.isChecked;
  checkBoxTodo.addEventListener("change", () => {
    card.isChecked = checkBoxTodo.checked;
    setTodoInStorage(todoArr);
  });
  const p = document.createElement("p");
  const pText = document.createTextNode(card.text);
  p.append(pText);

  //Close button
  const closeButton = document.createElement("button");
  const closeButtonText = document.createTextNode("X");
  closeButton.className = "closeButton";
  closeButton.id = "closeButton";
  closeButton.append(closeButtonText);

  closeButton.addEventListener("click", (e) => {
    const index = todoArr.findIndex((item) => item.id === card.id);
    todoArr.splice(index, 1);
    e.currentTarget.closest(".todo").remove();
    setTodoInStorage(todoArr);
  });

  //Date
  const dateAddTodo = document.createElement("p");
  const dateAddTodoText = document.createTextNode(card.date);
  dateAddTodo.className = "date";
  dateAddTodo.append(dateAddTodoText);

  todosWrapper.append(todo);
  todo.append(checkBoxTodo, p, closeButton, dateAddTodo);
}

//Delete btn event
deleteAllBtn.addEventListener("click", () => {
  todoArr = [];
  setTodoInStorage(todoArr);
  document.getElementById("todosWrapper").innerHTML = "";
});

//Appends
header.append(deleteAllBtn, textInput, addBtn);
container.append(header, todosWrapper);
root.append(container);
