import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../providers/auth/auth';
import { User } from '../../models/user.model';
import { UserService } from '../../providers/user/user';

@IonicPage()
@Component({
  selector: 'page-user-profile',
  templateUrl: 'user-profile.html',
})
export class UserProfilePage {
  user:User;
  canEdit:boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public authService: AuthService, public userService: UserService) {
  }

  ionViewCanEnter():Promise<boolean>{
    return this.authService.authenticated;
  }

  ionViewDidLoad(){
    this.userService.currentUser.subscribe((user:User) => {
      this.user = user;
    });
  }

  onSubmit(event:Event){
    event.preventDefault();
    this.editUser();
  }

  private editUser(photoUrl?:string){
    this.userService.edit({name: this.user.name, username: this.user.username, photo: photoUrl || this.user.photo || ''}).then(() => {
      this.canEdit = false;
    });
  }
}
