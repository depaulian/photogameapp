import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  user;
  constructor(public navCtrl: NavController, public navParams: NavParams, private userProvider:UserProvider) {
    this.user = this.userProvider.getUser();
  }

  ionViewDidLoad() {

  }

}
