import { Component } from '@angular/core';
import { ToDo } from '../shared/models/ToDo';
import { ToDoService } from '../services/toDo/to-do.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})

export class ToDoComponent {
  toDos!: ToDo[];
  private subscription!: Subscription;

  constructor(private toDoService: ToDoService) { }


  ngOnInit() {
    this.toDos = this.toDoService.getAll();
    this.subscription = this.toDoService.toDoChanged.subscribe((toDos: ToDo[]) => {
      this.toDos = toDos;
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  deleteToDo(id: number): void {
    this.toDoService.deleteToDo(id);
  }

  onEditToDo(id: number): void {
    this.toDoService.startedEditing.next(id);
  }

}
