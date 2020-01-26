import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AngularFireModule, FirebaseAppConfig, AuthProviders, AuthMethods } from 'angularfire2';

import { MyApp } from './app.component';
import { firebaseConf } from '../config';
import { UserService } from '../providers/user/user';
import { AuthService } from '../providers/auth/auth';
import { ChatService } from '../providers/chat/chat';
import { MessageService } from '../providers/message/message';
import { ComponentsModule } from '../components/components.module';

const firebaseAppConfig:FirebaseAppConfig = firebaseConf;

const firebaseAuthConfig = {
  provider:  AuthProviders.Custom,
  method: AuthMethods.Password
}

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseAppConfig, firebaseAuthConfig),
    ComponentsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserService,
    AuthService,
    ChatService,
    MessageService
  ]
})
export class AppModule {}
