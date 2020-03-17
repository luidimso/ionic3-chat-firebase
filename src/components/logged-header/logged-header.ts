import { Component, Input } from '@angular/core';
import { BaseComponent } from '../base/base';
import { AlertController, App, MenuController } from 'ionic-angular';
import { AuthService } from '../../providers/auth/auth';
import { User } from 'firebase';

@Component({
  selector: 'logged-header',
  templateUrl: 'logged-header.html'
})
export class LoggedHeaderComponent extends BaseComponent{

  @Input() title:string;
  @Input() user:User;

  constructor(public alertCtrl:AlertController, public authService:AuthService, public app:App, public menuCtrl:MenuController) {
    super(alertCtrl, authService, app, menuCtrl);
  }

}
