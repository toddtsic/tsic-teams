import { Component, ViewChild } from '@angular/core';
import { IonInfiniteScroll, ModalController } from '@ionic/angular';
import { take, tap } from 'rxjs/operators';
import { ITeamChat_User_RoleData } from 'src/app/models/roles';
import { StorageService } from 'src/app/services/storage.service';
import { DEFAULT_PAGINGPARAMS_TEAMPUSHES, TeamPushes_Request, TeamPush_AddRequest, TeamPush_ViewModel } from 'src/app/models/team-pushes';
import { TeamPushesService } from 'src/app/services/team-pushes.service';
import { NewTeamPushComponent } from '../../new-team-push/new-team-push.component';

@Component({
  selector: 'app-team-pushes',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  scrollPageNumber: number;

  userData: ITeamChat_User_RoleData;

  items: TeamPush_ViewModel[] = [];

  constructor(
    private newModalCtrl: ModalController,
    private storageService: StorageService,
    public teamPushesService: TeamPushesService
  ) {
  }

  async ionViewWillEnter() {
    this.userData = await this.storageService.getUser_AuthSettings();
    this.items = [];
    this.scrollPageNumber = 1;
    this.doInfinite(null);
  }

  async openModal() {
    const modal = await this.newModalCtrl.create({
      component: NewTeamPushComponent,
      componentProps: {
        roleName: this.userData.roleName
      }
    });

    modal.onDidDismiss()
      .then((data: any) => {
        if (typeof data.data !== undefined) {
          const requestModel: TeamPush_AddRequest = {
            userId: this.userData.userId,
            teamId: this.userData.teamId,
            bAddAllTeams: data.data.bAllJobTeams,
            pushText: data.data.pushText,
            roleName: this.userData.roleName,
            requestTimestampString: new Date().toLocaleString().replace(',', '')
          }
          this.teamPushesService.addTeamPush(requestModel)
            .pipe(
              tap((tl) => {
                this.items.unshift(tl);
              })
            )
            .subscribe();
        }
      });

    modal.present();
  }

  getPushColor(push: TeamPush_ViewModel) {
    let btnColor: string = 'tertiary';
    if (this.userData.userId === push.userId) {
      btnColor = 'success';
    } else if (!push.teamId) {
      btnColor = 'primary';
    }

    return btnColor;
  }

  doInfinite(event:any) {
    const requestModel: TeamPushes_Request = {
      roleName: this.userData.roleName,
      teamId: this.userData.teamId,
      pagingParams: {
        pageNumber: this.scrollPageNumber,
        rowsPerPage: DEFAULT_PAGINGPARAMS_TEAMPUSHES.rowsPerPage
      }
    };

    this.teamPushesService.getTeamPushes(requestModel)
      .pipe(
        take(1),
        tap((data: TeamPush_ViewModel[]) => {
          for (let i = 0; i < data.length; i++) {
            this.items.push(data[i]);
          }

          this.infiniteScroll.complete();

          this.scrollPageNumber++;

          if (data.length === 0 || (data.length < requestModel.pagingParams.rowsPerPage)) {
            this.infiniteScroll.disabled = true;
          }

        })
      )
      .subscribe();
  }

}
