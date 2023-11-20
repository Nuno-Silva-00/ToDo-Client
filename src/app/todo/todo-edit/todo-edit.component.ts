import { Component, ViewChild, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ToDoService } from 'src/app/services/toDo/to-do.service';
import { ToDo } from 'src/app/shared/models/ToDo';


@Component({
  selector: 'app-todo-edit',
  templateUrl: './todo-edit.component.html',
  styleUrls: ['./todo-edit.component.css']
})
export class TodoEditComponent {
  //still need to double check the form validation
  @ViewChild('f') toDoForm!: NgForm;
  subscription!: Subscription;
  editMode = false;
  @Output() blockDelete = new EventEmitter<boolean>();
  editItemId!: number;
  editedToDo!: ToDo;

  constructor(private toDoService: ToDoService) { }

  onSubmit(form: NgForm) {
    const value = form.value;

    if (this.editMode) {
      this.toDoService.updateToDo(this.editItemId, value.toDo);
    } else {
      this.toDoService.addToDo(value.toDo);
    }

    this.resetForm();
  }

  resetForm() {
    this.toDoForm.resetForm();
    this.editMode = false;
    this.blockDelete.emit(false);
  }

  ngOnInit() {
    this.subscription = this.toDoService.startedEditing.subscribe((id: number) => {
      this.editItemId = id;
      this.editMode = true;
      this.blockDelete.emit(true);
      this.editedToDo = this.toDoService.getToDo(id);
      this.toDoForm.setValue({
        toDo: this.editedToDo.toDo
      })
    })
  }
}
