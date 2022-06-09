import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService{
    recipeselected = new EventEmitter<Recipe>();

   private recipes: Recipe[] = [
        new Recipe(
            'Tasty Schnitzel' ,
         'A super Tasty Schnitzel - Just awesome! ',
         'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',
         [
             new Ingredient('Meet', 1),
             new Ingredient('French Fries', 20)
         ]),
        new Recipe('Another Test Recipe',
         'This is simply a test',
         'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',
         [
             new Ingredient('Buns', 2),
             new Ingredient('Meet',1)
         ])
      ];

      constructor(private slService: ShoppingListService){

      }

      getRecipes(){
          return this.recipes;
      }

      getrecipe(index){
          return this.recipes[index];
      }

      addIngredientsToShoppingList(ingredient : Ingredient[]){
        this.slService;
      }
}