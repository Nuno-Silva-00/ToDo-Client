
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
    }).subscribe(response => {
      this.toDo.push(response);
      this.toDoChanged.next(this.toDo.slice());
    });
  }

  deleteToDo(id: number): void {
    this.http.delete(this.path + '/delete/' + id).subscribe(() => {
      this.toDo = this.toDo.filter(item => item.id !== id);
      this.toDoChanged.next(this.toDo.slice());
    });
  }

  updateToDo(id: number, newToDo: string) {
    const Index = this.toDo.findIndex(item => item.id === id);
    this.toDo[Index] = { ...this.toDo[Index], toDo: newToDo };
    this.toDoChanged.next(this.toDo.slice());
  }

  // private handleError(errorRes: HttpErrorResponse) {
  //   let errorMessage = 'An unknown error ocurred';
  //   if (!errorRes.error || !errorRes.error.message) {
  //     return throwError(() => errorMessage);
  //   }

  //   switch (errorRes.error.message) {
  //     case 'EMAIL_NOT_FOUND':
  //       errorMessage = 'Email not Found!';
  //       break;
  //     case 'WRONG_PASSWORD':
  //       errorMessage = 'Wrong Password!';
  //       break;
  //     case 'EMAIL_EXISTS':
  //       errorMessage = 'This Email already exists!';
  //       break;
  //   }
  //   return throwError(() => errorMessage);
  // }
}
