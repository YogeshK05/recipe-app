import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipes-details',
  templateUrl: './recipes-details.component.html',
  styleUrls: ['./recipes-details.component.css'],
})
export class RecipesDetailsComponent implements OnInit {
  showRecipe: Recipe;
  id!: number;

  constructor(
    private recipesService: RecipesService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    // this.route.params.subscribe((params: Params) => {
    //   this.id = +params['id'];
    //   console.log(this.id);
    //   this.showRecipe = this.recipesService.getRecipe(this.id);
    //   console.log(this.showRecipe.imagePath);
    // });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      // console.log(this.id);
      this.showRecipe = this.recipesService.getRecipe(this.id);

      // console.log(this.showRecipe);
      // console.log(this.showRecipe.imagePath);
    });
  }

  onAddToShoppingList() {
    this.recipesService.addIngredientsToShoppingList(
      this.showRecipe.ingredients
    );
  }

  onRecipeEdit() {
    this.router.navigate(['edit'], { relativeTo: this.route });
    // Alternative Way To Navigate
    // this.router.navigate(['../', this.id, 'edit'], { relativeTo: this.route });
  }

  onDelete() {
    this.recipesService.deleteRecipe(this.route.params['id']);
    this.router.navigate(['recipes']);
  }
}
