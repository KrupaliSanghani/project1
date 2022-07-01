import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListComponent } from '../shopping-list.component';
import { ShoppingListService } from '../shopping-list.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
// import { EventEmitter } from 'stream';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  subscription: Subscription
  @ViewChild('f') slForm: FormControl;
  // @ViewChild('nameInput', {static: false}) nameInputRef: ElementRef;
  // @ViewChild('amountInput', {static: false}) amountInputRef: ElementRef;
  signupForm: FormGroup;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;


  constructor(private slService: ShoppingListService) { }

  ngOnInit(): void {

    this.subscription = this.slService.startedEditing.subscribe(
      (index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.slService.getIngredient(index);
        this.signupForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount

        })
      }
    );

    console.log(this.editedItem);
    // console.log(this.editedItem.amount);

    // name = new FormControl('');
    this.signupForm = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'amount': new FormControl(null, [Validators.required, Validators.pattern('^[0-9]+[0-9]$')]),
      // 'email': new FormControl(null, [Validators.required, Validators.email]),
      // 'gender': new FormControl('female')
    });


  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSubmit() {

    console.log(this.signupForm.value);
    // const ingName = this.nameInputRef.nativeElement.value;
    // const ingAmount = this.amountInputRef.nativeElement.value;
    // const newIngredient = new Ingredient(ingName, ingAmount);
    const newIngredient = new Ingredient(this.signupForm.value.name, this.signupForm.value.amount);
    if (this.editMode) {
      this.slService.updateIngredient(this.editedItemIndex, newIngredient);
    } else {
      this.slService.addIngredient(newIngredient);
    }
    this.editMode = false;
    this.signupForm.reset();
    // this.signupForm.reset(this.signupForm.value.amount);
  }

  onClear() {
    // this.editMode = false;
    this.signupForm.reset();
    this.editMode = false;
  }


  onDelete() {
    this.slService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }
}
