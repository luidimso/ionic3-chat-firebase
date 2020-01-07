import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { FirebaseListObservable } from 'angularfire2';
import { User } from '../../models/user.model';
import { UserService } from '../../providers/user/user';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  users:FirebaseListObservable<User[]>;

  constructor(public navCtrl: NavController, public userService:UserService) {}

  ionViewDidLoad(){
    this.users = this.userService.users;
  }

  onChatCreate(user:User):void{

  }

  onSignUp():void{
    this.navCtrl.push("SignupPage")
  }
}
