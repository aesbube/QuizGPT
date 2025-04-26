import { Component } from '@angular/core';
import {SigninComponent} from "./signin/signin.component";
import {SignupComponent} from "./signup/signup.component";
import {NavbarComponent} from "./navbar/navbar.component";
import {MainComponent} from "./main/main.component";
import { UpgradePlanComponent } from "./plan/plan.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SigninComponent, SignupComponent, MainComponent, UpgradePlanComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'QuizGPT';
}
