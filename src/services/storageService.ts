import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

 
@Injectable()
export class StorageService {
 
  constructor(public storage:Storage){
 
  }
 
  saveUserData(data) {
    this.storage.set('photogameapp',{user:data['user']});
  }
  removeData(){
    return new Promise((resolve) => {
      this.storage.remove('photogameapp')
      .then(()=> {
          resolve()
      });
    });
  }

  checkUserData(){
    return new Promise((resolve, reject) => {
        this.storage.get('photogameapp').then(val => {
              if(val){
                resolve(val.user);
              }else{
                reject('error');
              }   
          });
    });
  }

  savePhotoOffline(photo){
    return new Promise((resolve, reject) => {
        this.storage.get('photogameapp').then(val => {
              if(val){
                if(!val.photos){
                  val.photos = [];
                }
                val.photos.push(photo);
                this.storage.set('photogameapp', {user:val.user,photos:val.photos});
                resolve(photo);
              }else{
                reject('error');
              }   
          });
    });
  }

  getOfflinePhotos(){
    return new Promise<any[]>((resolve, reject) => {
        this.storage.get('photogameapp').then(val => {
              if(val.photos){
                resolve(val.photos);
              }else{
                reject('error');
              }   
          });
    });
  }
 
}