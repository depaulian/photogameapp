import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, App, ToastController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { StorageService } from '../../services/storageService';
import { AuthProvider } from '../../providers/auth/auth';


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  user;
  constructor(
              public navCtrl: NavController,
              public navParams: NavParams,
              private userProvider:UserProvider,
              private alertCtrl:AlertController,
              private storageService:StorageService,
              private app: App,
              private toast: ToastController,
              private authProvider: AuthProvider,
            ) {
    this.user = this.userProvider.getUser();
  }

  promptLogout(){
    let alert = this.alertCtrl.create({
      title: 'Alert',
      message: 'Do you want to log out?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.logout();
          }
        }
      ]
    });
    alert.present();
  }
  logout(){
    this.storageService.removeData().then(
      (val)=>{
              this.authProvider.clearCache();
              this.app.getRootNav().setRoot('WelcomePage');
             },
      (err)=>{const toast = this.toast.create({
        message: 'Could not log you out ',
        duration: 3000
      });
      toast.present();}
    )
  }

}
