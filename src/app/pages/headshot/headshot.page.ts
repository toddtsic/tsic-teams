import { Component, OnInit } from '@angular/core';
import { CameraSource, Camera } from '@capacitor/camera';
import { ModalController, Platform } from '@ionic/angular';
import { tap } from 'rxjs/operators';
import { HeadshotService } from 'src/app/services/headshot.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-headshot',
  templateUrl: './headshot.page.html',
  styleUrls: ['./headshot.shell.scss', './headshot.page.scss'],
})
export class HeadshotPage implements OnInit {
  isIOS: boolean = false;
  userId: string = '';
  headshotUrl: string = '';

  userData: any;

  constructor(
    private storageService: StorageService,
    private headshotService: HeadshotService,
    private platform: Platform,
    private modalCtrl: ModalController
  ) {
  }

  async ngOnInit() {
    this.isIOS = this.platform.is('ios');
    this.userData = await this.storageService.getUser_AuthSettings();
    if (this.userData) {
      this.headshotUrl = this.userData.headshotUrl;
    }

    const cameraPermissionStatus = await Camera.checkPermissions();

    console.log('cameraPermissionStatus', cameraPermissionStatus);

    if (cameraPermissionStatus.camera !== 'granted' || cameraPermissionStatus.photos === 'granted'){
      const newCameraPermissionStatus = await Camera.requestPermissions();
      console.log('newCameraPermissionStatus', newCameraPermissionStatus);
    }

  }

  dismissModal() {
    this.modalCtrl.dismiss({ newHeadshotUrl: this.headshotUrl });
  }

  async updateHeadshot(how: string) {

    switch (how) {
      case 'fromCamera':
        const uploadCamera$ = await this.headshotService.updateHeadshot(this.userId, CameraSource.Camera);
        uploadCamera$
          .pipe(
            tap(async (resp) => {
              this.headshotUrl = resp.fileUrl;
              this.userData.headshotUrl = this.headshotUrl;
              await this.storageService.setUser_AuthSettings(this.userData);
              this.dismissModal();
            })
          )
          .subscribe();
        break;
      case 'fromGallery':
        const uploadGallery$ = await this.headshotService.updateHeadshot(this.userId, CameraSource.Photos);
        uploadGallery$
          .pipe(
            tap(async (resp) => {
              this.headshotUrl = resp.fileUrl;
              this.userData.headshotUrl = this.headshotUrl;
              await this.storageService.setUser_AuthSettings(this.userData);
              this.dismissModal();
            })
          )
          .subscribe();
        break;
      case 'delete':
        const delete$ = this.headshotService.removeHeadshot(this.userId);
        const timeStamp = (new Date()).getTime();
        await delete$
          .pipe(
            tap(async () => {
              this.headshotUrl = "/assets/images/anonymousperson.png";
              this.userData.headshotUrl = this.headshotUrl;
              await this.storageService.setUser_AuthSettings(this.userData);
              this.dismissModal();
            })
          )
          .subscribe();
        break;
    }

  }
}
