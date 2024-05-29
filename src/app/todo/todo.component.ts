import { Component, OnInit } from '@angular/core';
import { Todo } from './todo.module'; // импортируем модель задачи



@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})

export class TodoComponent implements OnInit {

  todos: Todo[] = []; // массив для хранения задач
  newTodo: Todo = { // новая задача для добавления
    id: 0,
    title: '',
    description: '',
    completed: false
  };

  
  constructor() { }

  ngOnInit() {
    this.loadTodos();
  }
  addTodo() {
    if (this.newTodo.title.trim()) {
      this.newTodo.id = Date.now(); // Generate a unique ID
      this.todos.push({ ...this.newTodo });
      this.newTodo = { id: 0, title: '', description: '', completed: false };
      this.saveTodos();
    }
  }
  deleteTodo(index: number) {
    this.todos.splice(index, 1);
    this.saveTodos();
  }
  
  updateTodoCompletion(index: number) {
   // this.todos[index].completed = !this.todos[index].completed;
    this.saveTodos();
    console.log(this.todos[index]);
    
  }

  saveTodos() {
    window.localStorage.setItem('todos', JSON.stringify(this.todos));
  }


  loadTodos() {
    const savedTodos = window.localStorage.getItem('todos');
    if (savedTodos) {
      this.todos = JSON.parse(savedTodos);
    }
  }
}
