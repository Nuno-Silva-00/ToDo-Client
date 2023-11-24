
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Subscription, exhaustMap, take, tap } from 'rxjs';
import { ToDo } from 'src/app/shared/models/ToDo';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';

@Injectable({
  providedIn: 'root'
})
export class ToDoService {

  toDoChanged = new Subject<ToDo[]>();
  startedEditing = new Subject<number>();
  path = 'http://localhost:3000/api/todo';

  constructor(private http: HttpClient, private authService: AuthService) { }

  private toDo: ToDo[] = []

  getAll() {
    return this.http.get<ToDo[]>(this.path).pipe(tap((resData: ToDo[]) => {
      this.toDo = resData
    }));
  }

  getToDo(id: number): ToDo {
    return this.toDo.filter(item => item.id === id)[0] || null;
  }

  addToDo(newToDo: string): void {
    this.http.post<ToDo>(this.path + '/create', {
      todo: newToDo
    }).subscribe(
      {
        next: (response) => {
          this.toDo.push(response);
          this.toDoChanged.next(this.toDo.slice());
        },
        error: (e) => {
          console.log('An Error occurred ', e.message);
        },
        complete: () => { console.info('To Do Created'); }
      }
    );
  }

  deleteToDo(id: number): void {
    this.http.delete(this.path + '/delete/' + id).subscribe(
      {
        next: (response) => {
          const index = this.toDo.findIndex(todo => todo.id === id);
          this.toDo.splice(index, 1);
          this.toDoChanged.next(this.toDo.slice());
        },
        error: (e) => {
          console.log('An Error occurred ', e.message);
        },
        complete: () => console.info('To Do Deleted')
      }
    );

  }

  async updateToDo(id: number, newToDo: string) {
    this.http.patch(this.path + '/update', { id: id, toDo: newToDo }).subscribe(
      {
        next: (response) => {
          const Index = this.toDo.findIndex(item => item.id === id);
          this.toDo[Index] = { id: this.toDo[Index].id, toDo: newToDo };
          this.toDoChanged.next(this.toDo.slice());
        },
        error: (e) => {
          console.log('An Error occurred ', e.message);
        },
        complete: () => console.info('To Do Updated')
      }
    );
  }
}