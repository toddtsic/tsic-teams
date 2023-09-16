import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { StorageService } from 'src/app/services/storage.service';
import { RosterService } from 'src/app/services/roster.service';
import { ITeamChat_User_RoleData } from 'src/app/models/roles-models';
import { ITeamRosterMobile_ViewModel, ITeamRosterPlayer_Mobile_ViewModel } from 'src/app/models/roster';

@Component({
  selector: 'app-roster',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
})
export class Tab1Page {

  userData: ITeamChat_User_RoleData;
  teamRoster: ITeamRosterMobile_ViewModel;
  teamRosterSubscription: Subscription;
  allEmails: string[] = [];
  allCellphones: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private storageService: StorageService,
    private modalCtrl: ModalController,
    private router: Router,
    private rosterService: RosterService
  ) { }

  async ionViewWillEnter() {
    this.userData = await this.storageService.getUser_AuthSettings();

    if (this.userData?.registrationId && this.userData?.roleName) {
      if (this.userData?.teamId && (this.userData.roleName == 'Director' || this.userData.roleName == 'Superuser')) {
        const api$ = this.rosterService.getTeamRosterByTeamId(this.userData.teamId)
          .pipe(
            take(1),
            tap((data: ITeamRosterMobile_ViewModel) => {
              this.buildEmailAndCellphoneLists(data);
              this.teamRoster = data;
            })
          )
          .subscribe();
        return api$;
      } else {
        const api$ = this.rosterService.getTeamRosterByRegistrationId(this.userData.registrationId)
          .pipe(
            take(1),
            tap((data: ITeamRosterMobile_ViewModel) => {
              this.buildEmailAndCellphoneLists(data);
              this.teamRoster = data;
            })
          )
          .subscribe();
        return api$;
      }
    } else {
      this.router.navigateByUrl('/login', { replaceUrl: true });
      return null;
    }

  }

  buildEmailAndCellphoneLists(data: ITeamRosterMobile_ViewModel) {
    const staffEmails = data.staff.filter(s => s.email != this.userData.email).map(s => s.email);
    const playerEmails = data.players.filter((p) => { p.email != this.userData.email }).map(p => p.email);
    const momEmails = data.players.map(p => p.momEmail);
    const dadEmails = data.players.map(p => p.dadEmail);

    const staffCellphones = data.staff.filter(s => s.cellphone != this.userData.cellphone).map(s => s.cellphone);
    const playerCellphones = data.players.filter((p) => { p.cellphone != this.userData.cellphone; }).map(p => p.cellphone);
    const momCellphones = data.players.map(p => p.momCellphone);
    const dadCellphones = data.players.map(p => p.dadCellphone);

    this.allEmails.push(...staffEmails);
    this.allEmails.push(...playerEmails);
    this.allEmails.push(...momEmails);
    this.allEmails.push(...dadEmails);

    this.allCellphones.push(...staffCellphones);
    this.allCellphones.push(...playerCellphones);
    this.allCellphones.push(...momCellphones);
    this.allCellphones.push(...dadCellphones);

    this.allEmails = this.allEmails.filter((x, i, a) => a.indexOf(x) == i);
    this.allCellphones = this.allCellphones.filter((x, i, a) => a.indexOf(x) == i);
  }

  async showDetails(playerRecord: ITeamRosterPlayer_Mobile_ViewModel) {
    // const modal = await this.modalCtrl.create({
    //   component: ContactInfoPage,
    //   componentProps: {
    //     'player': playerRecord
    //   }
    // });
    // return await modal.present();
  }

  async updateHeadshot(playerRecord: ITeamRosterPlayer_Mobile_ViewModel) {
    // if (this.userData.userId === playerRecord.userId) {
    //   const modal = await this.modalCtrl.create({
    //     component: HeadshotPage
    //   });
    //   modal.onDidDismiss()
    //     .then((data: any) => {
    //       const thisUserId = this.userData.userId;
    //       playerRecord.headshotUrl = data.data.newHeadshotUrl;
    //     });

    //   return await modal.present();
    // }
  }

  async openTeamLinks() {
    this.router.navigate(['team-links']);
  }

  async openTeamEvents() {
    this.router.navigate(['team-events']);
  }

  gotoEmail() {
    const hrefEmails = `mailto:${this.allEmails.join(',')}`;
    window.location.href = hrefEmails;
  }

  gotoSMS() {
    const hrefSMSs = `sms:${this.allCellphones.join(';')}`
    window.location.href = hrefSMSs;
  }

}
