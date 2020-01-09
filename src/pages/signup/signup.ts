import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Loading, LoadingController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../providers/user/user';
import { AuthService } from '../../providers/auth/auth';
import { FirebaseAuthState } from 'angularfire2';
import "rxjs/add/operator/first"

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  signupForm:FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public userService: UserService, public alertCtrl: AlertController, public authService: AuthService, public loadingCtrl:LoadingController) {
    let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    this.signupForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', Validators.compose([Validators.required, Validators.pattern(emailRegex)])]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  onSubmit():void {
    let loading:Loading = this.showLoading();
    let formUser = this.signupForm.value;
    let username:string = formUser.username;

    this.userService.userExists(username).first().subscribe((userExists:boolean) => {
      if(!userExists){
        this.authService.createAuthUser({
          email: formUser.email,
          password: formUser.password
        }).then((authState:FirebaseAuthState) => {
          delete formUser.password;
          formUser.userId = authState.auth.uid;

          this.userService.create(formUser).then(() => {
            this.navCtrl.setRoot("HomePage");
            loading.dismiss();
          }).catch((error:any) => {
            loading.dismiss();
            this.showAlert(error);
          })
        }).catch((error:any) => {
          loading.dismiss();
          this.showAlert(error);
        });
      } else {
        loading.dismiss();
        this.showAlert("This username is already been used.");
      }
    })
  }

  private showLoading():Loading{
    let loading:Loading = this.loadingCtrl.create({
      content: "Pleace wait..."
    });

    loading.present();
    return loading;
  }

  private showAlert(message:string):void{
    this.alertCtrl.create({
      message: message,
      buttons:["OK"]
    }).present();
  }
}
