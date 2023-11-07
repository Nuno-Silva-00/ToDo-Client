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
    { id: 1, user: 'ze', toDo: 'fazer comida' },
    { id: 2, user: 'kika', toDo: 'trabalhar na faculdade!' },
    { id: 3, user: 'rafa', toDo: 'comprar mota.' },
    { id: 4, user: 'app', toDo: 'fix toDo validation params' }
  ]

  getAll(): ToDo[] {
    return this.toDo.slice();
  }

  getToDo(id: number): ToDo {
    return this.toDo.filter(item => item.id === id)[0] || null;
  }

  addToDo(newToDo: string, user: string): void {
    let newId: number = this.toDo.length + 1; //alterar depois para contemplar o Id returnado pelo servidor
    this.toDo.push({ id: newId, toDo: newToDo, user: user });
    this.toDoChanged.next(this.toDo.slice());
  }

  deleteToDo(id: number): void {
    this.toDo = this.toDo.filter(item => item.id != id);
    this.toDoChanged.next(this.toDo.slice());
  }

  updateToDo(id: number, newToDo: string) {
    const Index = this.toDo.findIndex(item => item.id === id);
    this.toDo[Index] = { ...this.toDo[Index], toDo: newToDo };
    this.toDoChanged.next(this.toDo.slice());
  }
}
