import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs';
import { User } from '../models/User';
import { UserService } from '../service/user.service';
import { PasswordValidator } from '../validators/password.validator';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signUpForm:FormGroup;
  submitted:boolean = false;
  constructor(private router: Router, private userService:UserService,private toastr: ToastrService,private formBuilder: FormBuilder){




  }
  ngOnInit(): void {

    this.signUpForm=this.formBuilder.group({
      userName:new FormControl('',Validators.required),
      password:new FormControl('',Validators.required),
      confirmPassword:new FormControl('',
      [Validators.required])
    },{validator:PasswordValidator('password','confirmPassword')})


  }
  signUp(user:User){
    this.submitted=true;

    if(this.signUpForm.valid){
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

    }else{
      this.toastr.error("Register Failed! Please try again");

    }


  }




}
