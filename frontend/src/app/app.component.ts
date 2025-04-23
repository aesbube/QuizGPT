import { Component } from '@angular/core';
import {SigninComponent} from "./signin/signin.component";
import {SignupComponent} from "./signup/signup.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ SigninComponent, SignupComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'QuizGPT';
}
