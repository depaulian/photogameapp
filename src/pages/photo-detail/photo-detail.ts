import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { UserProvider } from '../../providers/user/user';

@IonicPage()
@Component({
  selector: 'page-photo-detail',
  templateUrl: 'photo-detail.html',
})
export class PhotoDetailPage {
  photo;
  params;
  user;
  constructor(public navCtrl: NavController, public navParams: NavParams,private authProvider:AuthProvider,private userProvider:UserProvider, private toast:ToastController) {
    this.photo=navParams.get('photo');
    this.user = this.userProvider.getUser();
  }

  ionViewDidLoad() {
    this.params = [];
    this.params.photo_id = this.photo.id;
    this.params.user_id = this.user.id;
    this.params.token = this.user.token;
    this.postView(this.params).then(
      (val)=>{
        if(val==2){
          this.photo.views +=1 
        }
      },
      (err)=>{
        console.log('error updating view count');
      }
    )
  }

  postView(params){
    return new Promise((resolve, reject) => {
      this.authProvider.postView(this.params).subscribe((res) => {
        if(res){
            resolve(res['result']);
        }
        }, (err) => {
            reject({'serverError': true});
        }); 
    });
  }

  votePhoto(p,type){
    this.params = [];
    this.params.vote = type;
    this.params.photo_id = p.id;
    this.params.user_id = this.user.id;
    this.params.token = this.user.token;
    this.postVote(this.params).then(
      (val)=>{
        if(val==1){
          const toast = this.toast.create({
            message: 'You have already voted this photo',
            duration: 3000
          });
          toast.present();
        }else{
          if(type==1){
            this.photo.vote_up += 1;
          }else{
            this.photo.vote_down += 1;
          }
        }
      },
      (err)=>{
        const toast = this.toast.create({
          message: 'An error occured while casting your vote',
          duration: 3000
        });
        toast.present();
      }
    )
  }

  postVote(params){
    return new Promise((resolve, reject) => {
      this.authProvider.postVote(this.params).subscribe((res) => {
        if(res){
            resolve(res['result']);
        }
        }, (err) => {
            reject({'serverError': true});
        }); 
    });
  }

}
