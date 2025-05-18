import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { firstValueFrom } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  async signinWithEmailAndPassword(email: string, password: string): Promise<any> {
    const payload = { email, password };
    try {
      const res = await firstValueFrom(
        this.http.post<any>('http://localhost:8001/login', payload)
      );
      console.log(res, payload);
      return res;
    } catch (err: any) {
      const errorMessage = err.status === 401 ? 'Invalid credentials' : 'Login failed';
      throw new Error(errorMessage);
    }
  }

  async signupWithEmailAndPassword(email: string, password: string, confirm_password: string): Promise<any> {
    const payload = { email, password, confirm_password };
    try {
      const res = await firstValueFrom(
        this.http.post<any>('http://localhost:8001/register', payload)
      );
      console.log(res, payload);
      return res;
    } catch (err: any) {
      const errorMessage =
        err.status === 400 ? (err.error.detail || 'Bad request') :
        err.status === 409 ? 'Email already registered' :
        'Registration failed';
      throw new Error(errorMessage);
    }
  }
}
