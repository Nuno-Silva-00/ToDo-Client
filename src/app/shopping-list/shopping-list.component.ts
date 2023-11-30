import { Component } from '@angular/core';
import { ShoppingListItem } from '../shared/models/ShoppingListItem';
import { Subscription } from 'rxjs';
import { ShoppingListService } from '../services/shoppingList/shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent {
  shoppingList: ShoppingListItem[] = [];
  private subscription!: Subscription;

  editMode = false;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.shoppingListService.getAll()
      .subscribe((items: ShoppingListItem[]) => {
        this.shoppingList = items;
      });

    this.subscription.add(
      this.shoppingListService.shoppingListChanged.subscribe((items: ShoppingListItem[]) => {
        this.shoppingList = items;
      }));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  deleteToDo(id: number): void {
    this.shoppingListService.deleteItem(id);
  }

  onEditToDo(id: number): void {
    this.shoppingListService.startedEditing.next(id);
  }

  onBlockDelete(block: boolean) {
    this.editMode = block;
  }
}
