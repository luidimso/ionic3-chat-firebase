import { Injectable } from '@angular/core';
import "rxjs/add/operator/map";
import { BaseService } from '../base/base';
import { Chat } from '../../models/chat.model';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable, FirebaseAuthState } from 'angularfire2';

@Injectable()
export class ChatService extends BaseService{
  chats:FirebaseListObservable<Chat[]>

  constructor(public af: AngularFire) {
    super();
    this.setChats();
  }

  create(chat:Chat, userId1:string, userId2:string):firebase.Promise<void>{
    return this.af.database.object(`/chats/${userId1}/${userId2}`).set(chat).catch(this.handlePromiseError);
  }

  getChat(userId1:string, userId2:string):FirebaseObjectObservable<Chat>{
    return <FirebaseObjectObservable<Chat>>this.af.database.object(`/chats/${userId1}/${userId2}`).catch(this.handleObservableError);
  }

  private setChats():void{
    this.af.auth.subscribe((authState:FirebaseAuthState) => {
      if(authState){
        this.chats = <FirebaseListObservable<Chat[]>>this.af.database.list(`/chats/${authState.auth.uid}`, {
          query: {
            orderByChild: 'timestamp'
          }
        }).map((chats:Chat[]) => {
          return chats.reverse();
        }).catch(this.handleObservableError);
      }
    })
  }
}
