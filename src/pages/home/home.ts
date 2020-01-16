import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { FirebaseListObservable } from 'angularfire2';
import { User } from '../../models/user.model';
import { UserService } from '../../providers/user/user';
import { AuthService } from '../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  users:FirebaseListObservable<User[]>;
  view:string = "chats";

  constructor(public navCtrl: NavController, public userService:UserService, public authService:AuthService) {}

  ionViewCanEnter():Promise<boolean>{
    return this.authService.authenticated;
  }

  ionViewDidLoad(){
    this.users = this.userService.users;
  }

  onChatCreate(user:User):void{
    this.navCtrl.push("ChatPage", {user: user});
  }

  onSignUp():void{
    this.navCtrl.push("SignupPage")
  }
}
