import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { User } from '../models/user.model';
import { AuthService } from '../providers/auth/auth';
import { UserService } from '../providers/user/user';
import { FirebaseAuthState } from 'angularfire2';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = 'SigninPage';
  currentUser:User;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, authService: AuthService, userService: UserService) {
    authService.auth.subscribe((authState:FirebaseAuthState) => {
      if(authState){
        userService.currentUser.subscribe((user:User) => {
          this.currentUser = user;
        });
      }
    });

    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
