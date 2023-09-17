import { Component, ViewChild } from '@angular/core';
import { IonInfiniteScroll, ModalController } from '@ionic/angular';
import { take, tap } from 'rxjs/operators';
import { DEFAULT_PAGINGPARAMS_TEAMLINKS, TeamLinks_Request, TeamLink_AddRequest, TeamLink_ViewModel } from 'src/app/models/team-links';
import { StorageService } from 'src/app/services/storage.service';
import { Router } from '@angular/router';
import { ITeamChat_User_RoleData } from 'src/app/models/roles-models';
import { TeamLinksService } from 'src/app/services/team-links.service';
import { NewTeamLinkComponent } from 'src/app/components/new-team-link/new-team-link.component';
import { Browser } from '@capacitor/browser';

@Component({
  selector: 'app-team-links',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  scrollPageNumber: number;

  userData: ITeamChat_User_RoleData;

  items: TeamLink_ViewModel[] = [];

  constructor(
    private newModalCtrl: ModalController,
    private storageService: StorageService,
    private router: Router,
    public teamLinksService: TeamLinksService
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
      component: NewTeamLinkComponent,
      componentProps: {
        roleName: this.userData.roleName
      }
    });

    modal.onDidDismiss()
      .then((data: any) => {
        if (typeof data.data !== undefined) {
          const requestModel: TeamLink_AddRequest = {
            userId: this.userData.userId,
            teamId: this.userData.teamId,
            bAddAllTeams: data.data.bAllJobTeams,
            label: data.data.linkText,
            docUrl: data.data.linkUrl,
            roleName: this.userData.roleName,
            requestTimestampString: new Date().toLocaleString().replace(',', '')
          }
          this.teamLinksService.addTeamLink(requestModel)
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

  deleteLink(docId: string) {
    this.teamLinksService.deleteTeamLink(docId)
      .pipe(
        tap((tl) => {
          this.items = this.items
            .filter((tl) => {
              return tl.docId !== docId
            });
        })
      )
      .subscribe();
  }

  async gotoLink(docUrl:string) {
    await Browser.open({ url: docUrl });
  }

  getButtonColor(link: TeamLink_ViewModel) {
    let btnColor: string = 'tertiary';
    if (this.userData.userId === link.userId) {
      btnColor = 'success';
    } else if (link.jobId) {
      btnColor = 'primary';
    }

    return btnColor;
  }

  canDelete(link: TeamLink_ViewModel) {
    let canDelete = false;

    if (this.userData.userId === link.userId || this.userData.roleName === 'Director') {
      canDelete = true;
    }

    return canDelete;
  }

  doInfinite(event:any) {
    const requestModel: TeamLinks_Request = {
      roleName: this.userData.roleName,
      teamId: this.userData.teamId,
      pagingParams: {
        pageNumber: this.scrollPageNumber,
        rowsPerPage: DEFAULT_PAGINGPARAMS_TEAMLINKS.rowsPerPage
      }
    };

    this.teamLinksService.getTeamLinks(requestModel)
      .pipe(
        take(1),
        tap((data: TeamLink_ViewModel[]) => {
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
