import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-photo-detail',
  templateUrl: 'photo-detail.html',
})
export class PhotoDetailPage {
  photo;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.photo=navParams.get('photo');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PhotoDetailPage');
  }

}
