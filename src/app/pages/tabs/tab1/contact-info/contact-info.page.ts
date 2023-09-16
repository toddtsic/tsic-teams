import { Component, OnInit } from '@angular/core';
import { ModalController, Platform, ToastController } from '@ionic/angular';
import { ITeamRosterPlayer_Mobile_ViewModel } from 'src/app/models/roster';

@Component({
  selector: 'app-contact-info',
  templateUrl: './contact-info.page.html',
  styleUrls: ['./contact-info.shell.scss', './contact-info.page.scss'],
})
export class ContactInfoPage implements OnInit {
  player: ITeamRosterPlayer_Mobile_ViewModel;

  constructor(
    private platform: Platform,
    private toastCtrl: ToastController,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
  }

  cancelModal() {
    this.modalCtrl.dismiss();
  }

}
