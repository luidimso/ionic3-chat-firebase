import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { User } from '../../models/user.model';
import { BaseService } from '../base/base';
import { Observable } from 'rxjs/Observable';
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";

@Injectable()
export class UserService extends BaseService{

  users:FirebaseListObservable<User[]>;

  constructor(public af: AngularFire) {
    super();
    this.users = this.af.database.list('/users');
  }

  create(user:User):firebase.Promise<void>{
    return this.af.database.object(`/users/${user.userId}`).set(user).catch(this.handlePromiseError);
  }

  userExists(username:string):Observable<boolean>{
    return this.af.database.list('/users', {
      query:{
        orderByChild: "username",
        equalTo: username
      }
    }).map((users:User[]) => {
      return users.length > 0;
    }).catch(this.handleObservableError);
  }
}
