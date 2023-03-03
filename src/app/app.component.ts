import { Component } from '@angular/core';
import { UserService } from './service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ClothesShop';
  userName:string="";
  constructor(private userService:UserService){
    this.userName=userService.getCurrentUser();
  }

}
