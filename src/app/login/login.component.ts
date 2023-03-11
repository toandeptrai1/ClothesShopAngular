import { User } from './../models/User';
import {ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private router: Router,private activateRoute: ActivatedRoute,private toastr:ToastrService
    ,private userService: UserService,private storage:LocalStorageService){
    this.loginForm = new FormGroup({
      userName:new FormControl('',Validators.required),
      password:new FormControl('',Validators.required)
    });
  }
  ngOnInit(): void {
    this.activateRoute.queryParams.subscribe(params => {
      if(params['registered']!==undefined&&params['registered']==='true'){
        this.toastr.success('Sign Up Successfully!');
      }
    })


  }

  login(user:User){
    this.userService.login(user).subscribe(user => {
      if(user){

        this.router.navigate(["/home"]);

        this.toastr.success('Login Successfully!');
      }else{
        this.toastr.error('Login Failed!');
      }


    }

    )


  }


}
