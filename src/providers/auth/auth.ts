import { Injectable } from '@angular/core';
import { AngularFireAuth, FirebaseAuthState } from 'angularfire2';
import { BaseService } from '../base/base';
import "rxjs/add/operator/first";

@Injectable()
export class AuthService extends BaseService{

  constructor(public auth: AngularFireAuth) {
    super();
  }

  createAuthUser(user:{email:string, password:string}):firebase.Promise<FirebaseAuthState>{
    return this.auth.createUser(user).catch(this.handlePromiseError);
  }

  signinWithEmail(user:{email:string, password:string}):firebase.Promise<boolean>{
    return this.auth.login(user).then((authState:FirebaseAuthState) => {
      return authState != null;
    }).catch(this.handlePromiseError);
  }

  logout():Promise<void>{
    return this.auth.logout();
  }

  get authenticated():Promise<boolean>{
    return new Promise((resolve, reject) => {
      this.auth.first().subscribe((authState:FirebaseAuthState) => {
        (authState) ? resolve(true) : reject(false);
      })
    })
  }
}
