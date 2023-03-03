import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs';
import { User } from '../models/User';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signUpForm:FormGroup;
  constructor(private router: Router, private userService:UserService,private toastr: ToastrService){
    this.signUpForm=new FormGroup({
      userName:new FormControl('',Validators.required),
      password:new FormControl('',Validators.required),
      confirmPassword:new FormControl('',Validators.required)
    })

  }
  ngOnInit(): void {


  }
  signUp(user:User){

    this.userService.signup(user).pipe(
      catchError(() => {
          this.toastr.error("Register Failed! Please try again");
          throw new Error('login faild!')
      })
    ).subscribe(
      (user)=>{this.router.navigate(['/login'],{queryParams:{registered: 'true'}});},
    ),
    ()=>{
      this.toastr.error("Register Failed! Please try again");
    }

  }




}
