import { Component, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ShoppingListService } from 'src/app/services/shoppingList/shopping-list.service';
import { ShoppingListItem } from 'src/app/shared/models/ShoppingListItem';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent {
  subscription!: Subscription;
  editMode = false;
  @Output() blockDelete = new EventEmitter<boolean>();
  editItemId!: number;
  editedItem!: ShoppingListItem;

  shoppingListForm = new FormGroup({
    item: new FormControl('', Validators.required),
    amount: new FormControl('', Validators.required)
  });

  constructor(private shoppingListService: ShoppingListService) { }

  onSubmit() {
    const item = this.shoppingListForm.get('item')!.value;
    const amount = this.shoppingListForm.get('amount')!.value;

    if (item === null || amount === null) {
      return;
    }

    if (this.editMode) {
      this.shoppingListService.updateItem(this.editItemId, item, +amount);
    } else {
      this.shoppingListService.addItem(item, +amount);
    }

    this.resetForm();
  }

  resetForm() {
    this.shoppingListForm.reset();

    this.shoppingListForm.markAsPristine();
    this.shoppingListForm.markAsUntouched();

    this.editMode = false;
    this.blockDelete.emit(false);
  }

  ngOnInit() {
    this.subscription = this.shoppingListService.startedEditing.subscribe((id: number) => {
      this.editItemId = id;
      this.editMode = true;
      this.blockDelete.emit(true);
      this.editedItem = this.shoppingListService.getToDo(id);
      this.shoppingListForm.setValue({
        item: this.editedItem.item,
        amount: this.editedItem.amount.toString()
      });
    });
  }
}