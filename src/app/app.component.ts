import { Component } from '@angular/core';
import { Platform, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StorageService } from '../services/storageService';
import { UserProvider } from '../providers/user/user';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:string;
  constructor(
              platform: Platform,
              statusBar: StatusBar,
              splashScreen: SplashScreen,
              storageService:StorageService,
              userProvider:UserProvider,
              ev:Events
             ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need
      statusBar.styleDefault();
      storageService.checkUserData().then(
        (val) => {
                  this.rootPage = 'TabsPage',
                  userProvider.setUser(val);
                  splashScreen.hide();
                 },
        (err) => {
                  this.rootPage = 'WelcomePage'
                  splashScreen.hide();
                },
      )
    });
  }
}
