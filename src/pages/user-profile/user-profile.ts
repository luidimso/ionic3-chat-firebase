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
  uploadProgress:number;
  private photo:File;

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

    if(this.photo){
      let uploadTesk = this.userService.uploadPhoto(this.photo, this.user.$key);
      uploadTesk.on('state_changed', (snapshot) => {
        this.uploadProgress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      }, (error:Error) => {

      }, () => {
        this.editUser(uploadTesk.snapshot.downloadURL);
      });
    } else {
      this.editUser();
    }
  }

  onPhoto(event):void{
    this.photo = event.target.files[0];
  }

  private editUser(photoUrl?:string){
    this.userService.edit({name: this.user.name, username: this.user.username, photo: photoUrl || this.user.photo || ''}).then(() => {
      this.canEdit = false;
      this.photo = undefined;
      this.uploadProgress = 0;
    });
  }
}
