import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {firstValueFrom} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }


  async signinWithEmailAndPassword(email: string, password: string): Promise<any> {
    const payload = { email, password };

    try {
      const res = await firstValueFrom(
        this.http.post<any>('http://localhost:8000/login', payload)
      );
      return res;
    } catch (err: any) {
      if (err.status === 401) {
        throw new Error('Invalid credentials');
      } else {
        throw new Error(err.message || 'Login failed');
      }
    }
  }
}
