import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SellerService } from '../services/seller.service';
import { Router } from '@angular/router';
import { Login, signUp } from '../models/SignUp';

@Component({
  selector: 'app-seller-auth',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './seller-auth.component.html',
  styleUrl: './seller-auth.component.css',
})
export class SellerAuthComponent implements OnInit {
  username: string = '';
  password: string = '';
  email: string = '';
  showLogin = false;
  authError : string = ''

  seller = inject(SellerService);
  router = inject(Router);

  ngOnInit(): void {
    this.seller.reloadSeller();
  }

  signUp(data: signUp): void {
    // console.log(this.username)
    this.seller.userSignUp(data);
  }

  login(data: Login): void {
    this.authError = '';
    this.seller.userLogin(data);
    this.seller.isLoginError.subscribe((isError)=>{
      if(isError){
        this.authError = 'Email or Password is not correct, Please check'
      }
    })
  }

  openLogin(): void {
    this.showLogin = !this.showLogin;
  }
}
