import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Events, ToastController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

import { Photo } from '../../models/photo/photo';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { AuthProvider } from '../../providers/auth/auth';
import { StorageService } from '../../services/storageService';
import { UserProvider } from '../../providers/user/user';
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
  user;
  constructor(
              public navCtrl: NavController,
              public navParams: NavParams,
              private camera: Camera,
              private modalCtrl: ModalController,
              private authProvider: AuthProvider,
              private storageService: StorageService,
              private toast: ToastController,
              private ev: Events,
              private userProvider:UserProvider
              ) {
              this.user = this.userProvider.getUser();
              console.log(this.user);
              this.ev.subscribe('Message!', message => {
                  const toast = this.toast.create({
                    message: message,
                    duration: 3000
                  });
                  toast.present();
                })
  }

  ionViewDidLoad() {
    this.params = [];
    this.params.limit = 20;
    this.params.offset = 0;
    this.params.sorting = 1;
    this.params.token = this.user.token;
    this.photos$ = this.authProvider.photos(this.params);
    this.storageService.getOfflinePhotos().then(
      (val)=>this.offline_photos = val,
      (err) => this.offline_photos = []
    );
  }

  getPhotos(sorting){
    this.params = [];
    this.params.limit = 20;
    this.params.offset = 0;
    this.params.sorting = sorting;
    this.params.token = this.user.token;
    this.photos$ = this.authProvider.photos(this.params);
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
  uploadPhoto(data){
    data.upload_status = 2;
    this.postPhoto(data).then(
      (val)=>{ 
              data.upload_status = 1;
              this.ev.publish('Message!', 'Photo successfully upladed to server');
             },
      (err)=>{ 
                data.upload_status = 0;
                this.ev.publish('Message!', 'An error occured while uploading the photo');
             }
    )
  }
  postPhoto(data): any {
    data.token = this.user.token;
    return new Promise((resolve, reject) => {
      this.authProvider.postPhoto(data).subscribe((res) => {
        if(res){
            resolve(null);
        }
        }, (err) => {
            reject({'serverError': true});
        }); 
    });
  }
}
