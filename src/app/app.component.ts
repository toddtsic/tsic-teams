import { Component, OnInit } from '@angular/core';
import { StorageService } from './services/storage.service';
import { environment } from 'src/environments/environment';
import { Platform } from '@ionic/angular';
import { Capacitor } from '@capacitor/core';
import { App } from '@capacitor/app';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{
  appVersion: string;
  isIOS = false;
  tsicMenuLinks = [
    {
      title: 'Logout/Login',
      url: '/login',
      icon: 'log-in'
    },
    {
      title: 'Switch to Different Team',
      url: '/roles',
      icon: 'cog'
    }
  ];

  constructor(
    private platform: Platform,
    private storageService: StorageService, // must have to cause initialization of storageService
  ) {  
  }

  async ngOnInit(): Promise<void> {
    if (environment.production) {
      const ai = await App.getInfo();
      this.appVersion = ai.version;
    }

    this.isIOS = this.platform.is('ios');

    this.platform.ready()
      .then(async (val) => {


        const thisPlatform = Capacitor.getPlatform();
        if (thisPlatform !== 'web') {
          // this.initPushNotifications();
        }
      });
  }

}
