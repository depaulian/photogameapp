import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { StorageService } from '../../services/storageService';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage {
  logoImage:string;
  logInForm: FormGroup;
  password:string;
  user;
  params;
  constructor(
              public navCtrl: NavController,
              public navParams: NavParams,
              private formBuilder: FormBuilder,
              private alertCtrl: AlertController,
              public loading: LoadingController,
              private authProvider:AuthProvider,
              private storageService:StorageService

             ) {
    this.logoImage = 'assets/imgs/logo_greyscale.png'
    this.password   = "password";
    this.logInForm = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z]*')])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])],
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  signIn(){
    this.params = [];
    this.params.username = this.logInForm.value.username;
    this.params.password = this.logInForm.value.password;

    let loader = this.loading.create({
      content: 'Signing you in...',
    });

    loader.present().then(() => {
        this.authProvider.signIn(this.params).subscribe(
          data => {
            loader.dismiss();
            if(data['status_code']==100){
              this.storageService.saveUserData(data);
              this.navCtrl.setRoot('TabsPage');
            }else{
              loader.dismiss();

              let alert = this.alertCtrl.create({
                title: 'Error',
                message: data['message'],
                buttons: [
                  {
                    text: 'Close',
                    role: 'cancel',
                    handler: () => {
                    }
                  },
                ]
              });
              alert.present();
            }
          },
          error => {
            loader.dismiss();

              let alert = this.alertCtrl.create({
              title: 'Error',
              message: 'An error occured while trying to connect to the server. Please ensure you have a working network connection.',
              buttons: [
                {
                  text: 'Close',
                  role: 'cancel',
                  handler: () => {
                  }
                },
              ]
            });
            alert.present();
          }
        );
  });
  }
  signUp(){
    this.navCtrl.push('RegisterPage');
  }
  togglePass(){
    if(this.password=='password'){
      this.password='text';
    }else{
      this.password='password';
    }
  }

}
