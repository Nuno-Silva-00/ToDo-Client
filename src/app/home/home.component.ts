import { Component } from '@angular/core';
import { ToDo } from '../shared/models/ToDo';
import { ToDoService } from '../services/toDo/to-do.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  toDos!: ToDo[];
  constructor(private toDoService: ToDoService){

  }
  ngOnInit(){
    this.toDos= this.toDoService.getAll();
    console.log(this.toDos);
    
  }
}
