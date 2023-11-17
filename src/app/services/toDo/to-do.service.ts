
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, exhaustMap, take } from 'rxjs';
import { ToDo } from 'src/app/shared/models/ToDo';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ToDoService {

  toDoChanged = new Subject<ToDo[]>();
  startedEditing = new Subject<number>();
  path = 'http://localhost:3000/api/todo';

  constructor(private http: HttpClient, private authService: AuthService) { }

  private toDo: ToDo[] = [
    { id: 1, toDo: 'fazer comida' },
    { id: 2, toDo: 'trabalhar na faculdade!' },
    { id: 3, toDo: 'comprar mota.' },
    { id: 4, toDo: 'fix toDo validation params' }
  ]

  getAll() {
    return this.http.get<ToDo[]>(this.path);
  }

  getToDo(id: number): ToDo {
    return this.toDo.filter(item => item.id === id)[0] || null;
  }

  addToDo(newToDo: string, user: string): void {
    let newId: number = this.toDo.length + 1; //alterar depois para contemplar o Id returnado pelo servidor
    this.toDo.push({ id: newId, toDo: newToDo });
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



  // fetchToDo() {

  //   return this.authService.user.pipe(take(1), exhaustMap(user => {
  //     return this.http
  //       .get<ToDo[]>(this.path)
  //   }),
  //   );

  //   //  .subscribe(res => console.log(res));
  //   // .pipe(
  //   //   map(toDos => {
  //   //     return toDos.map(toDo => {
  //   //       return {
  //   //         toDo
  //   //       }
  //   //     })
  //   //   })
  //   // )
  // }
}
