import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { User } from 'firebase';

@Injectable()
export class UserService {

  constructor(public af: AngularFire) {
    console.log('Hello UserProvider Provider');
  }

  create(user:User):firebase.Promise<void>{
    return this.af.database.list('/users').push(user);
  }
}
