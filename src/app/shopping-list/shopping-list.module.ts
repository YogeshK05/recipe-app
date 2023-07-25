import { NgModule } from "@angular/core";
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { ShoppingListComponent } from "./shopping-list.component";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [
    ShoppingListComponent,
    ShoppingEditComponent,
  ],
  imports: [SharedModule, RouterModule.forChild([{ path: '', component: ShoppingListComponent },])],
  exports: [],
})
export class ShoppingListModule { }
