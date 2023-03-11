import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { User } from '../models/User';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user$:Observable<User>;
  constructor(private userService: UserService){


  }
  ngOnInit(): void {
    this.user$=this.userService.user;

  }

}
