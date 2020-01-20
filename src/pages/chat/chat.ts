import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../providers/auth/auth';
import { UserService } from '../../providers/user/user';
import { User } from '../../models/user.model';
import { FirebaseListObservable } from 'angularfire2';
import { Message } from '../../models/message.model';
import { MessageService } from '../../providers/message/message';

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {
  messages:FirebaseListObservable<Message[]>;
  title:string;
  sender:User;
  recipient:User;

  constructor(public navCtrl: NavController, public navParams: NavParams, public authService: AuthService, public userService: UserService, public messageService: MessageService) {
  }

  ionViewCanEnter():Promise<boolean>{
    return this.authService.authenticated;
  }

  ionViewDidLoad(){
    this.recipient = this.navParams.get("user");
    this.title = this.recipient.name;
    this.userService.currentUser.first().subscribe((currentUser:User) => {
      this.sender = currentUser;
      this.messages = this.messageService.getMessages(this.sender.$key, this.recipient.$key);
      this.messages.first().subscribe((messages:Message[]) => {
        if(messages.length == 0){
          this.messages = this.messageService.getMessages(this.recipient.$key, this.sender.$key);
        }
      });
    });
  }

  sendMessage(newMessage:string):void{
    this.messages.push(newMessage);
  }
}
