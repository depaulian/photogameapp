import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { UsernameValidator } from '../validators/username';
import { Camera } from '@ionic-native/camera';
import { CacheModule } from 'ionic-cache-observable';

//validators
import { EmailValidator } from '../validators/email';


//providers
import { AuthProvider } from '../providers/auth/auth';
import { StorageService } from '../services/storageService';
import { UserProvider } from '../providers/user/user';


@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    CacheModule,
    IonicModule.forRoot(MyApp,{tabsPlacement:'top'}),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    UsernameValidator,
    EmailValidator,
    StorageService,
    Camera,
    UserProvider
  ]
})
export class AppModule {}
