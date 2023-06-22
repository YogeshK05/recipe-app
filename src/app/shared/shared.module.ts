import { NgModule } from "@angular/core";
import { DirectivesModule } from "./directives/directives.module";
import { DataStorageService } from "./data-storage.service";

@NgModule({
  declarations: [],
  providers:[DataStorageService],
  imports: [DirectivesModule,],
  exports: [],
})
export class SharedModule{}
