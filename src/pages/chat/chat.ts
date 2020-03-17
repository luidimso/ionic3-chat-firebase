import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import { AuthService } from '../../providers/auth/auth';
import { UserService } from '../../providers/user/user';
import { User } from '../../models/user.model';
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Message } from '../../models/message.model';
import { MessageService } from '../../providers/message/message';
import firebase from 'firebase';
import { Chat } from '../../models/chat.model';
import { ChatService } from '../../providers/chat/chat';

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
  private chat1:FirebaseObjectObservable<Chat>;
  private chat2:FirebaseObjectObservable<Chat>;
  @ViewChild(Content) content:Content;

  constructor(public navCtrl: NavController, public navParams: NavParams, public authService: AuthService, public userService: UserService, public messageService: MessageService, public chatService: ChatService) {
  }

  ionViewCanEnter():Promise<boolean>{
    return this.authService.authenticated;
  }

  ionViewDidLoad(){
    this.recipient = this.navParams.get("user");
    this.title = this.recipient.name;
    this.userService.currentUser.first().subscribe((currentUser:User) => {
      this.sender = currentUser;
      this.chat1 = this.chatService.getChat(this.sender.$key, this.recipient.$key);
      this.chat2 = this.chatService.getChat(this.recipient.$key, this.sender.$key);
      this.chat1.first().subscribe((chat:Chat) => {
        this.chatService.updatePhoto(this.chat1, chat.photo, this.recipient.photo);
      });

      let doSubscription = () => {
        this.messages.subscribe((messages:Message[]) => {
          this.scrollToBottom(0);
        });
      };

      this.messages = this.messageService.getMessages(this.sender.$key, this.recipient.$key);
      this.messages.first().subscribe((messages:Message[]) => {
        if(messages.length == 0){
          this.messages = this.messageService.getMessages(this.recipient.$key, this.sender.$key);
          doSubscription();
        } else {
          doSubscription();
        }
      });
    });
  }

  sendMessage(newMessage:string):void{
    if(newMessage){
      let timestamp:Object = firebase.database.ServerValue.TIMESTAMP;

      this.messageService.create(new Message(this.sender.$key, newMessage, timestamp), this.messages).then(() => {
        this.chat1.update({
          lastMessage: newMessage,
          timestamp: timestamp
        });

        this.chat2.update({
          lastMessage: newMessage,
          timestamp: timestamp
        });
      });
    }
  }

  private scrollToBottom(duration?:number):void{
    setTimeout(() => {
      if(this.content){
        this.content.scrollToBottom(duration || 300);
      }
    }, 50);
  }
}
