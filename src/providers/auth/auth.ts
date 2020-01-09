import { Injectable } from '@angular/core';
import { AngularFireAuth, FirebaseAuthState } from 'angularfire2';
import { BaseService } from '../base/base';

@Injectable()
export class AuthService extends BaseService{

  constructor(public auth: AngularFireAuth) {
    super();
  }

  createAuthUser(user:{email:string, password:string}):firebase.Promise<FirebaseAuthState>{
    return this.auth.createUser(user).catch(this.handlePromiseError);
  }
}
