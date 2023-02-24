import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipesService {
  recipeChanged = new Subject<Recipe[]>();
  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'Palak Paneer',
  //     'Good for Veggies',
  //     'https://picturetherecipe.com/wp-content/uploads/2020/04/Palak-Paneer-PTR-Featured-1-395x500.jpg',
  //     [new Ingredient('Paneer', 1), new Ingredient('Palak', 1)]
  //   ),
  //   new Recipe(
  //     'Spicy Turkey',
  //     'Tasty birdy',
  //     'https://assets.epicurious.com/photos/62f16ed5fe4be95d5a460eed/4:6/w_3087,h_4631,c_limit/RoastChicken_RECIPE_080420_37993.jpg',
  //     [new Ingredient('Turkey', 1), new Ingredient('Spices', 1)]
  //   ),
  // ];

  private recipes: Recipe[] = [];

  constructor(private slService: ShoppingListService) {}

  getRecipes() {
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  getRecipe(index: number) {

    return this.recipes[index];
  }

  addRecipe(newRecipe: Recipe) {
    this.recipes.push(newRecipe);
    this.recipeChanged.next(this.recipes);
  }

  updateRecipe(id: number, newRecipe: Recipe) {
    this.recipes[id] = newRecipe;
    this.recipeChanged.next(this.recipes.slice());
  }

  deleteRecipe(id: number) {
    this.recipes.splice(id, 1);
    this.recipeChanged.next(this.recipes.slice());
  }

  updateAllRecipes(recipes: Recipe[]) {
    this.recipes = [];
    this.recipes = recipes;
    this.recipeChanged.next(this.recipes);
  }
}
