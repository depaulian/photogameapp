import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController} from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { UsernameValidator } from '../../validators/username';
import { EmailValidator } from '../../validators/email';
import { AuthProvider } from '../../providers/auth/auth';
import { StorageService } from '../../services/storageService';
import { UserProvider } from '../../providers/user/user';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  logoImage:string;
  signUpForm: FormGroup;
  password:string;
  user;
  params;
  constructor(
              public navCtrl: NavController,
              public navParams: NavParams,
              private formBuilder: FormBuilder,
              public usernameValidator:UsernameValidator,
              public emailValidator:EmailValidator,
              private alertCtrl: AlertController,
              public loading: LoadingController,
              private authProvider:AuthProvider,
              private storageService:StorageService,
              private userProvider:UserProvider
            ) {
    this.logoImage  = 'assets/imgs/logo_greyscale.png';
    this.password   = "password";
    this.signUpForm = this.formBuilder.group({
                        username: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z]*')]), usernameValidator.checkUsername.bind(usernameValidator)],
                        email: ['', Validators.compose([Validators.required]), emailValidator.checkEmail.bind(emailValidator)],
                        password: ['', Validators.compose([Validators.minLength(6), Validators.required])],
                      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }
  togglePass(){
    if(this.password=='password'){
      this.password='text';
    }else{
      this.password='password';
    }
  }
  signIn(){
    this.navCtrl.push('LoginPage');
  }
  async ionViewCanLeave() {
    if(!this.signUpForm.valid && this.signUpForm.dirty){
      const shouldLeave = await this.confirmLeave();
      return shouldLeave;
    }else{
      return true;
    }
  }
  
  confirmLeave(): Promise<Boolean> {
    let resolveLeaving;
    const canLeave = new Promise<Boolean>(resolve => resolveLeaving = resolve);
    const alert = this.alertCtrl.create({
      title: 'Warning',
      message: 'You have unsaved changes. Do you want to abandon joining to PhotoGame? You are going to miss alot',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => resolveLeaving(false)
        },
        {
          text: 'Yes',
          handler: () => resolveLeaving(true)
        }
      ]
    });
    alert.present();
    return canLeave
  }

  signUp(){
    this.params = [];
    this.params.username  = this.signUpForm.value.username;
    this.params.email     = this.signUpForm.value.email;
    this.params.password  = this.signUpForm.value.password;

    let loader = this.loading.create({
      content: 'Setting up your account',
    });
    loader.present().then(() => {
        this.authProvider.signUp(this.params).subscribe(
          data => {
            loader.dismiss();
            if(data['status_code']==100){
              this.storageService.saveUserData(data);
              this.userProvider.setUser(data['user']);
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

}
