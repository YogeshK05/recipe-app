import { NgModule } from "@angular/core";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipesDetailsComponent } from "./recipes-details/recipes-details.component";
import { RecipesItemComponent } from "./recipes-list/recipes-item/recipes-item.component";
import { RecipesListComponent } from "./recipes-list/recipes-list.component";
import { RecipesComponent } from "./recipes.component";
import { RouterModule } from "@angular/router";
import { RecipesRoutingModule } from "./recipes-routing.module";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [
    RecipesComponent,
    RecipesListComponent,
    RecipesItemComponent,
    RecipesDetailsComponent,
    RecipeStartComponent,
    RecipeEditComponent,
  ],
  imports: [ SharedModule, RouterModule, RecipesRoutingModule],
  // You need to export the components which are declared in this module and are being used outside of the module.
  // But in this case, we are importing recipes module as a whole in app module, which means all the components inside
  // it are also getting imported in app module and hence, bolow exports are not required.
  exports: [
  //   RecipesComponent,
  //   RecipesListComponent,
  //   RecipesItemComponent,
  //   RecipesDetailsComponent,
  //   RecipeStartComponent,
  //   RecipeEditComponent,
  ],
})
export class RecipesModule { }
