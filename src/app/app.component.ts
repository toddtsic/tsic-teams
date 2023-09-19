import { Component, OnInit } from '@angular/core';
import { StorageService } from './services/storage.service';
import { environment } from 'src/environments/environment';
import { Platform } from '@ionic/angular';
import { Capacitor } from '@capacitor/core';
import { App } from '@capacitor/app';
import { ActionPerformed, PushNotifications, PushNotificationSchema, Token } from '@capacitor/push-notifications';
import { SwapPhone_DeviceTokens_RequestModel } from './models/authentication-models';
import { ErrorsService } from './services/errors.service';
import { SplashScreen } from '@capacitor/splash-screen';

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
    private errorsService:ErrorsService,
    private storageService: StorageService, // must have to cause initialization of storageService
  ) {  
  }

  async ngOnInit(): Promise<void> {  
    this.isIOS = this.platform.is('ios');

    const capIsNative = Capacitor.isNativePlatform();
    if (capIsNative) {
      await SplashScreen.show();    

      const ai = await App.getInfo();
      this.appVersion = ai.version;

      this.initPushNotifications();

      await SplashScreen.hide();    
    }
  }

  initPushNotifications() {
    // Request permission to use push notifications
    // iOS will prompt user and return if they granted permission or not
    // Android will just grant without prompting
    PushNotifications.requestPermissions().then(result => {
      console.log("requestPermissions result", result);
      if (result.receive === 'granted') {
        // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.register()
          .then((res) => {
            this.addPushNotificationListeners();
          });
      } else {
        // Show some error
        console.log('no permission for push:', result);
      }
    });
  }

  addPushNotificationListeners(){
    PushNotifications.addListener(
      'registration',
      async (token: Token) => {
        const currentDeviceToken = await this.storageService.getDevice_PushNotification_Token();

        console.log('PushNotification.register token:', token);
        console.log('Device token from storage:', currentDeviceToken);

        if (currentDeviceToken && currentDeviceToken != token.value) {
          const requestModel: SwapPhone_DeviceTokens_RequestModel = {
            oldDeviceToken: currentDeviceToken,
            newDeviceToken: token.value
          }
          this.storageService.swapPhone_DeviceTokens(requestModel)
            .subscribe();
        };

        this.storageService.setDevice_PushNotification_Token(token.value);
      },
    );

    PushNotifications.addListener('registrationError', (error: any) => {
      alert('Error on push notification registration: ' + JSON.stringify(error));
    });

    PushNotifications.addListener(
      'pushNotificationReceived',
      async (notification: PushNotificationSchema) => {
        await this.processReceivedNotification(notification);
        // alert('Push received: ' + JSON.stringify(notification));
      },
    );

    PushNotifications.addListener(
      'pushNotificationActionPerformed',
      async (notification: ActionPerformed) => {
        // alert('Push action performed: ' + JSON.stringify(notification));
        await this.processReceivedNotification(notification.notification);
      },
    );
  }

  async processReceivedNotification(notification: PushNotificationSchema) {
    const data = notification.data;

    if (data?.jobName) {
      {
        const header = (this.isIOS) ? notification.data.aps.alert.title : notification.title;
        let body = (this.isIOS) ? notification.data.aps.alert.body : notification.body;
        if (data.teamName) {
          body = body;
        }

        this.errorsService.handleError(
          'success',
          header,
          5000,
          'bottom',
          {
            message: body
          }
        );
      }
    }
  }


}
