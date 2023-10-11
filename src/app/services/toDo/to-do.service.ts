import { Injectable } from '@angular/core';
import { ToDo } from 'src/app/shared/models/ToDo';

@Injectable({
  providedIn: 'root'
})
export class ToDoService {

  constructor() { }

  // Create Fake Todos
  getAll(): ToDo[] {
    return [
      { id: 1, user: 'ze', todo: 'fazer comida' },
      { id: 2, user: 'kika', todo: 'trabalhar na faculdade!' },
      { id: 3, user: 'rafa', todo: 'comprar mota.' }
    ]
  }

}
