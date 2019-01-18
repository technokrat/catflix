import {Todo} from './todo';
import {HttpClient} from 'aurelia-fetch-client';
const API = 'https://api.media.ccc.de/public/conferences';

export class App {
  constructor() {
    this.heading = "Todos";
    this.todos = [];
    this.conferences = [];
    this.todoDescription = '';
    let client = new HttpClient();

    client.fetch(API)
    .then(response => response.json())
    .then(data => {
      console.log(data.conferences);
      this.conferences = data.conferences;
    });






  }

  addTodo() {
    if (this.todoDescription) {
      this.todos.push(new Todo(this.todoDescription));
      this.todoDescription = '';
    }
  }

  removeTodo(todo) {
    let index = this.todos.indexOf(todo);
    if (index !== -1) {
      this.todos.splice(index, 1);
    }
  }
}

