import { EventEmitter, inject, Injectable } from '@angular/core';
import { Login, signUp } from '../models/SignUp';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  isLoginError = new EventEmitter<boolean>(false);
  http = inject(HttpClient)
  router = inject(Router);

  userSignUp (data : signUp) {
    // console.warn(data)
    return this.http.post("http://localhost:3000/users", data, {observe : "response"})
  }

  userLogin(data: Login) {
    this.http.get(`http://localhost:3000/users?email=${data.email}&password=${data.password}`,
      {observe : 'response'}
    ).subscribe((result:any)=>{
      if(result && result.body && result.body.length){
        localStorage.setItem('user', JSON.stringify(result.body));
        this.router.navigate(['/']);
        this.isLoginError.emit(false);
      } else {
        this.isLoginError.emit(true);
      }
    })

  }


}
