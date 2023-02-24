import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients!: Ingredient[];
  private igChangeSub!: Subscription;

  constructor(private slService: ShoppingListService) {}

  showIngredient(ing: Ingredient) {
    this.ingredients.push(new Ingredient(ing.name, ing.amount));
  }

  ngOnInit(): void {
    this.ingredients = this.slService.getIngredients();
    this.slService.ingreadientsChanged.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      }
    );
  }

  onEditItem(index: number){
    this.slService.startedEditing.next(index);
  }
  ngOnDestroy(){
    this.igChangeSub?.unsubscribe();
  }

}
