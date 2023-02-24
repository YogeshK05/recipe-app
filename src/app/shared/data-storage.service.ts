import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { RecipesService } from '../recipes/recipes.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  myUrl =
    'https://recipe-app-20d0f-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json';
  recipes: Recipe[];
  constructor(
    private http: HttpClient,
    private recipeService: RecipesService
  ) {}

  storeData() {
    this.recipes = this.recipeService.getRecipes();
    this.http.put(this.myUrl, this.recipes).subscribe((response) => {
      console.log(response);
    });
  }

  fetchData() {
    this.http.get<Recipe[]>(this.myUrl).subscribe((response) => {
      console.log(response);

      this.recipeService.updateAllRecipes(response);
    });
  }
}
