import { Injectable } from '@angular/core';
import { FirebaseListObservable, AngularFire } from 'angularfire2';
import { Message } from '../../models/message.model';
import { BaseService } from '../base/base';

@Injectable()
export class MessageService extends BaseService{

  constructor(public af:AngularFire) {
    super();
  }

  getMessages(userId1:string, userId2:string):FirebaseListObservable<Message[]>{
    return <FirebaseListObservable<Message[]>>this.af.database.list(`/messages/${userId1}-${userId2}`, {
      query:{
        orderByChild: 'timestamp'
      }
    }).catch(this.handleObservableError);
  }

  create(message:Message, listMessage:FirebaseListObservable<Message[]>):firebase.Promise<void>{
    return listMessage.push(message).catch(this.handlePromiseError);
  }
}
