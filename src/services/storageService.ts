import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

 
@Injectable()
export class StorageService {
 
  constructor(public storage:Storage ){
 
  }
 
  saveUserData(data) {
    this.storage.set('photogameapp',{user:data['user']});
  }

  checkUserData(){
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.storage.get('photogameapp').then(val => {
              if(val){
                resolve(val.user);
              }else{
                reject('error');
              }   
          });
      }, 1000);
    });
  }

  savePhotoOffline(photo){
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.storage.get('photogameapp').then(val => {
              if(val){
                if(!val.photos){
                  val.photos = [];
                }
                val.photos.push(photo);
                this.storage.set('photogameapp', {photos:val.photos});
                resolve(photo);
              }else{
                reject('error');
              }   
          });
      }, 1000);
    });
  }

  getOfflinePhotos(){
    return new Promise<any[]>((resolve, reject) => {
      setTimeout(() => {
        this.storage.get('photogameapp').then(val => {
              if(val.photos){
                console.log(val.photos)
                resolve(val.photos);
              }else{
                console.log('asdasdas')
                reject('error');
              }   
          });
      }, 1000);
    });
  }
 
}