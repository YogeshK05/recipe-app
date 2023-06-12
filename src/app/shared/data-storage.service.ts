import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { RecipesService } from '../recipes/recipes.service';
import { AuthService } from '../auth/auth.service';
import { exhaustMap, map, take, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  myUrl =
    // 'https://recipe-app-20d0f-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json';
    'https://recipe-app-6d143-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json';
  recipes: Recipe[];

  constructor(
    private http: HttpClient,
    private recipeService: RecipesService,
    private authService: AuthService
  ) { }

  storeData() {
    this.recipes = this.recipeService.getRecipes();
    this.http.put(this.myUrl, this.recipes).subscribe((response) => {
      console.log(response);
    });
  }

  fetchData() {

    return this.http.get<Recipe[]>(this.myUrl).pipe(
      map(recipes => {
        return recipes.map(recipe => {
          return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] }
        })
      }),
      tap(recipes => {
        this.recipeService.updateAllRecipes(recipes);
      }))
  }
}
