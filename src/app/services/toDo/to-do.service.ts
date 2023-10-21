import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ToDo } from 'src/app/shared/models/ToDo';

@Injectable({
  providedIn: 'root'
})
export class ToDoService {

  toDoChanged = new Subject<ToDo[]>();
  startedEditing = new Subject<number>();

  private toDo: ToDo[] = [
    { id: 1, user: 'ze', todo: 'fazer comida' },
    { id: 2, user: 'kika', todo: 'trabalhar na faculdade!' },
    { id: 3, user: 'rafa', todo: 'comprar mota.' }
  ]

  // Create Fake Todos
  getAll(): ToDo[] {
    return this.toDo.slice();
  }

  getToDo(id: number): ToDo {
    return this.toDo[id];
  }

  addToDo(todo: string, user: string): void {
    let newId: number = this.toDo.length; //alterar depois para contemplar o Id returnado pela bd
    this.toDo.push({ id: newId, user: user, todo: todo });
    this.toDoChanged.next(this.toDo.slice());
  }

  deleteToDo(id: number): void {
    this.toDo = this.toDo.filter(item => item.id != id);
  }
  
  resetForm(){}


}
