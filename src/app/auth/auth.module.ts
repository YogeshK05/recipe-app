import { NgModule } from "@angular/core";
import { AuthErrorComponent } from "./auth-error/auth-error.component";
import { SharedModule } from "../shared/shared.module";
import { RouterModule } from "@angular/router";
import { AuthComponent } from "./auth.component";

@NgModule({
  declarations: [AuthComponent, AuthErrorComponent],
  imports: [SharedModule, RouterModule.forChild([{ path: '', component: AuthComponent }])],
  exports: [AuthComponent, AuthErrorComponent, RouterModule],
})
export class AuthModule{}
