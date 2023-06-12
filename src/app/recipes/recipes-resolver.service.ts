import { Injectable } from "@angular/core";
import { DataStorageService } from "../shared/data-storage.service";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Recipe } from "./recipe.model";
import { RecipesService } from "./recipes.service";

@Injectable({ providedIn: 'root' })
export class RecipesResolverService implements Resolve<Recipe[]>{

  constructor(private dataStorage: DataStorageService, private recipeService: RecipesService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const recipes = this.recipeService.getRecipes()

    if (recipes.length === 0) {
      return this.dataStorage.fetchData();
    } else {
      return recipes;
    }
  }
}
