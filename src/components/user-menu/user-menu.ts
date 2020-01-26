import { Component, Input } from '@angular/core';
import { BaseComponent } from '../base/base';
import { AlertController, App, MenuController } from 'ionic-angular';
import { AuthService } from '../../providers/auth/auth';
import { User } from '../../models/user.model';

@Component({
  selector: 'user-menu',
  templateUrl: 'user-menu.html'
})
export class UserMenuComponent extends BaseComponent{
  @Input('user') currentUser:User;

  constructor(public alertCtrl:AlertController, public authService:AuthService, public app:App, public menuCtrl:MenuController) {
    super(alertCtrl, authService, app, menuCtrl);
  }

  onProfile():void{

  }
}
