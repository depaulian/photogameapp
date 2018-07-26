import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

import { Photo } from '../../models/photo/photo';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { AuthProvider } from '../../providers/auth/auth';
import { StorageService } from '../../services/storageService';
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  photos$: Observable<Array<Photo>>;
  offline_photos = [];
  category:string='recent';
  params;
  constructor(
              public navCtrl: NavController,
              public navParams: NavParams,
              private camera: Camera,
              private modalCtrl: ModalController,
              private authProvider: AuthProvider,
              private storageService: StorageService
              ) {

  }

  ionViewDidLoad() {
    this.params = [];
    this.params.limit = 10;
    this.params.count = 10;
    this.params.offset = 0;
    this.photos$ = this.authProvider.photos(this.params);
    this.storageService.getOfflinePhotos().then(
      (val)=>this.offline_photos = val,
      (err) => this.offline_photos = []
    );
  }

  viewPhoto(p){
    this.navCtrl.push('PhotoDetailPage',{photo:p});
  }
  takePhoto(){
      let modal = this.modalCtrl.create('CameraPage');
        modal.onDidDismiss(data => {
        if(data){
          console.log(data);
          this.offline_photos.push(data)
      }
     });
    modal.present();
  }

  postPhoto(data): any {
 
    return new Promise(resolve => {

            this.authProvider.postPhoto(data).subscribe((res) => {
            if(res){
                console.log(res['status'])
                resolve(null);
            }
            }, (err) => {
            resolve({'serverError': true});
            });   
    });
  }
}
