import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StorageService } from '../services/storageService';
import { UserProvider } from '../providers/user/user';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:string;
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,storageService:StorageService,userProvider:UserProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need
      storageService.checkUserData().then(
        (val) => {
                  this.rootPage = 'TabsPage',
                  userProvider.setUser(val);
                 },
        (err) => this.rootPage = 'WelcomePage',
      )
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
