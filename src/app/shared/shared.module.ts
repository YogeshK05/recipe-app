import { NgModule } from "@angular/core";
import { DirectivesModule } from "./directives/directives.module";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { LoadingSpinnerComponent } from "../auth/loading-spinner/loading-spinner.component";

@NgModule({
  providers:[],
  declarations: [LoadingSpinnerComponent],
  imports: [DirectivesModule,CommonModule, FormsModule, ReactiveFormsModule, MatProgressSpinnerModule],
  exports: [DirectivesModule,CommonModule, FormsModule, ReactiveFormsModule, MatProgressSpinnerModule, LoadingSpinnerComponent],
})
export class SharedModule{}
