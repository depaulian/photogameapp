import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PhotoDetailPage } from './photo-detail';

@NgModule({
  declarations: [
    PhotoDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(PhotoDetailPage),
  ],
})
export class PhotoDetailPageModule {}
