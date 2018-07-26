import { Component } from '@angular/core';
import {  IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {
  logoImage:string;
  welcomeImage:string;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.logoImage = 'assets/imgs/logo.png'
    this.welcomeImage = 'assets/imgs/welcome.png'
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');
  }
  signIn(){
    this.navCtrl.push('LoginPage');
  }
  signUp(){
    this.navCtrl.push('RegisterPage');
  }

}
