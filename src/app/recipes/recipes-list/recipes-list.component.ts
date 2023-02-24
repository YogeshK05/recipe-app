import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css'],
})
export class RecipesListComponent implements OnInit, OnDestroy {
  recipesSubscription = new Subscription();

  recipes!: Recipe[];

  constructor(
    private recipeService: RecipesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnDestroy(): void {
    this.recipesSubscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();
    this.recipesSubscription = this.recipeService.recipeChanged.subscribe((newRecipes: Recipe[]) => {
      this.recipes = newRecipes;
    });
  }

  onNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}
