import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../providers/auth/auth';
import { UserService } from '../../providers/user/user';
import { User } from '../../models/user.model';

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {
  messages:string[] = [];
  title:string;
  sender:User;
  recipient:User;

  constructor(public navCtrl: NavController, public navParams: NavParams, public authService: AuthService, public userService: UserService) {
  }

  ionViewCanEnter():Promise<boolean>{
    return this.authService.authenticated;
  }

  ionViewDidLoad(){
    this.recipient = this.navParams.get("user");
    this.title = this.recipient.name;
    this.userService.currentUser.first().subscribe((currentUser:User) => {
      this.sender = currentUser;
    })
  }

  sendMessage(newMessage:string):void{
    this.messages.push(newMessage);
  }
}
