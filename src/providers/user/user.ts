import { Injectable, Inject } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable, FirebaseAuthState, FirebaseApp } from 'angularfire2';
import { User } from '../../models/user.model';
import { BaseService } from '../base/base';
import { Observable } from 'rxjs/Observable';
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";

@Injectable()
export class UserService extends BaseService{
  users:FirebaseListObservable<User[]>;
  currentUser:FirebaseObjectObservable<User>;

  constructor(public af: AngularFire, @Inject(FirebaseApp) public firebaseApp: any) {
    super();
    this.listenAuthState();
  }

  create(user:User, userId:string):firebase.Promise<void>{
    return this.af.database.object(`/users/${userId}`).set(user).catch(this.handlePromiseError);
  }

  edit(user:{name:string, username:string, photo:string}):firebase.Promise<void>{
    return this.currentUser.update(user).catch(this.handlePromiseError);
  }

  userExists(username:string):Observable<boolean>{
    return this.af.database.list('/users', { // To verify if username already exists
      query:{
        orderByChild: "username",
        equalTo: username
      }
    }).map((users:User[]) => {
      return users.length > 0;
    }).catch(this.handleObservableError);
  }

  private listenAuthState():void{
    this.af.auth.subscribe((authState:FirebaseAuthState) => {
      if(authState){
        this.currentUser = this.af.database.object(`/users/${authState.auth.uid}`);
        this.setUsers(authState.auth.uid);
      }
    })
  }

  private setUsers(currentUserId:string):void{
    this.users = <FirebaseListObservable<User[]>>this.af.database.list('/users', {
      query: {
        orderByChild: 'name'
      }
    }).map((users:User[]) => {
      return users.filter((user:User) => user.$key !== currentUserId);
    })
  }

  getUserById(userId:string):FirebaseObjectObservable<User>{
    return <FirebaseObjectObservable<User>>this.af.database.object(`/users/${userId}`).catch(this.handleObservableError);
  }

  uploadPhoto(file:File, userId:string):firebase.storage.UploadTask {
    return this.firebaseApp.storage().ref().child(`/users/${userId}`).put(file);
  }
}
