import { Component } from '@angular/core';
import { IonicPage,ViewController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Photo } from '../../models/photo/photo';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { StorageService } from '../../services/storageService';
import { UserProvider } from '../../providers/user/user';

@IonicPage()
@Component({
  selector: 'page-camera',
  templateUrl: 'camera.html',
})
export class CameraPage {
  cameraForm: FormGroup;
  categories:Array<{id:number,name:string}>;
  image:string = 'assets/imgs/camera.png';
  photo;
  constructor(
              private formBuilder: FormBuilder,
              private viewCtrl: ViewController,
              private camera: Camera,
              private storageService:StorageService,
              private userProvider:UserProvider
              ) {
    this.cameraForm = this.formBuilder.group({
      caption: ['', Validators.required],
      description: [''],
      category : [''],
      location : [''],
    });
    this.categories = [{id:1, name:'People'},{id:2,name:'Nature'},{id:3,name:'City Life'},{id:4,name:'Love'},{id:5,name:'Sports'},{id:6,name:'Family'}]
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CameraPage');
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }

  photoFromCamera(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      saveToPhotoAlbum:true
    }

    this.takePhoto(options);
  }

  async takePhoto(options:CameraOptions){
    try{
      const result = await this.camera.getPicture(options);
      this.image = `data:image/jpeg;base64,${result}`;
    }
    catch(e)
    {
      this.image = 'assets/imgs/camera.png';
      console.error(e);
    }

  }

  postphoto(){
    this.photo = [];
    this.photo.category = this.cameraForm.value.category;
    this.photo.description = this.cameraForm.value.description;
    this.photo.category = this.cameraForm.value.category;
    this.photo.location = this.cameraForm.value.location;
    this.photo.owner = this.userProvider.getUser();
    this.photo.timestamp = new Date();
    this.photo.image = this.image;
    this.storageService.savePhotoOffline(this.photo).then(
      (val)=>this.viewCtrl.dismiss(val),
      (err) => console.error(err)
    )
  }

}
