import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ToDoComponent } from './todo/todo.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { NotesComponent } from './notes/notes.component';

const routes: Routes = [
  {
    path: '',
    component: ToDoComponent
  },
  {
    path: 'shopping-list',
    component: ShoppingListComponent
  },
  {
    path: 'notes',
    component: NotesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
