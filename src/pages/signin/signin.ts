import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  signinForm:FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public authService: AuthService, public loadingCtrl: LoadingController, public alertCtrl: AlertController) {
    let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    this.signinForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', Validators.compose([Validators.required, Validators.pattern(emailRegex)])]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SigninPage');
  }

  onSubmit():void{
    let loading:Loading = this.showLoading();

    this.authService.signinWithEmail(this.signinForm.value).then((isLogged:boolean) => {
      if(isLogged){
        loading.dismiss();
        this.navCtrl.setRoot("HomePage");
      }
    }).catch((error:any) => {
      loading.dismiss();
      this.showAlert(error);
    });
  }

  onSignUp():void{
    this.navCtrl.push("SignupPage")
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
