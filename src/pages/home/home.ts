import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { FirebaseListObservable } from 'angularfire2';
import { User } from '../../models/user.model';
import { UserService } from '../../providers/user/user';
import { AuthService } from '../../providers/auth/auth';
import { ChatService } from '../../providers/chat/chat';
import { Chat } from '../../models/chat.model';
import firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  users:FirebaseListObservable<User[]>;
  view:string = "chats";
  chats:FirebaseListObservable<Chat[]>;

  constructor(public navCtrl: NavController, public userService:UserService, public authService:AuthService, public chatService: ChatService) {}

  ionViewCanEnter():Promise<boolean>{
    return this.authService.authenticated;
  }

  ionViewDidLoad(){
    this.users = this.userService.users;
    this.chats = this.chatService.chats;
  }

  onChatCreate(user:User):void{
    this.userService.currentUser.first().subscribe((currentUser:User) => {
      this.chatService.getChat(currentUser.$key, user.$key).first().subscribe((chat:Chat) => {
        if(chat.hasOwnProperty("$value")){
          let timestamp:Object = firebase.database.ServerValue.TIMESTAMP;

          let chat1 = new Chat('', timestamp, user.name, '');
          this.chatService.create(chat1, currentUser.$key, user.$key);

          let chat2 = new Chat('', timestamp, user.name, '');
          this.chatService.create(chat2, user.$key, currentUser.$key);
        }
      })
    });
    this.navCtrl.push("ChatPage", {user: user});
  }

  onSignUp():void{
    this.navCtrl.push("SignupPage")
  }

  onChat(chat:Chat){
    let userId:string = chat.$key;

    this.userService.getUserById(userId).first().subscribe((user:User) => {
      this.navCtrl.push("ChatPage", {user: user});
    });
  }

  filterItems(event:any):void{
    let search:string = event.target.value;

    this.users = this.userService.users;
    this.chats = this.chatService.chats;

    if(search){
      switch(this.view){
        case 'chats':
          this.chats = <FirebaseListObservable<Chat[]>>this.chats.map((chats:Chat[]) => {
            return chats.filter((chat:Chat) => {
              return (chat.title.toLowerCase().indexOf(search.toLowerCase()) > -1);
            });
          });
        break;

        case 'users':
          this.users = <FirebaseListObservable<User[]>>this.users.map((users:User[]) => {
            return users.filter((user:User) => {
              return (user.name.toLowerCase().indexOf(search.toLowerCase()) > -1);
            });
          });
        break;
      }
    }
  }
}
