import { Routes } from '@angular/router';
import { MainComponent } from "./main/main.component";
import { UpgradePlanComponent } from "./plan/plan.component";
import { SigninComponent } from "./signin/signin.component";
import { SignupComponent } from "./signup/signup.component";

export const routes: Routes = [
  {path: 'signin', component: SigninComponent},
  {path: 'register', component: SignupComponent},
  {path: 'plan', component: UpgradePlanComponent},
  { path: '', component: MainComponent},
  { path: '**', redirectTo: '/' },
];
