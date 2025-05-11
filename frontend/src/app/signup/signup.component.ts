import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";
import { Router } from "@angular/router";
import { AuthService } from "../auth.service";

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    RouterLinkActive,
    RouterLink
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  protected type: boolean = false;
  protected mail: string = "";
  protected password: string = "";
  protected confirmPassword: string = "";
  public message: string = "";

   constructor(private authService: AuthService, private router: Router) {}

  showPassword(){
    this.type = !this.type;
  }

 async signup() {
    if (this.password !== this.confirmPassword) {
      this.message = "Passwords do not match";
      return;
    }
    try {
      const res = await this.authService.signupWithEmailAndPassword(this.mail, this.password, this.confirmPassword);
      this.message = res.message;
      await this.router.navigate(['/signin']); 
    } catch (error) {
      this.message = (error as Error).message;
    }
  }

}
