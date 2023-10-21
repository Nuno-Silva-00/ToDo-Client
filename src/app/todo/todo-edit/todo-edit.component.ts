import { Component, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToDoService } from 'src/app/services/toDo/to-do.service';


@Component({
  selector: 'app-todo-edit',
  templateUrl: './todo-edit.component.html',
  styleUrls: ['./todo-edit.component.css'],
  // encapsulation: ViewEncapsulation.None,
})
export class TodoEditComponent {
  // @ViewChild('f') slForm: NgForm;

  editMode = false;

  constructor(private toDoService: ToDoService) { }
  onSubmit(form: NgForm) {
    const value = form.value;
    console.log(value);

  }
  addToDo(todo: string, user: string): void {
    this.toDoService.addToDo(todo, user);
    this.resetForm();
  }

  resetForm() {
    this.toDoService.resetForm();
    this.editMode = false;
  }
}
