import { Component, OnInit } from '@angular/core';
import { EventSettingsModel } from '@syncfusion/ej2-angular-schedule';
import { take, tap } from 'rxjs';
import { ITeamChat_User_RoleData } from 'src/app/models/roles-models';
import { SyncfusionCalEvent } from 'src/app/models/team-calendar';
import { StorageService } from 'src/app/services/storage.service';
import { TeamCalendarService } from 'src/app/services/team-calendar.service';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  userData: ITeamChat_User_RoleData;
  eventSettings:EventSettingsModel;
  constructor(
    private storageService: StorageService,
    public teamCalendarService: TeamCalendarService
  ) {
  }

  ngOnInit() {
  }

  async ionViewWillEnter() {
    this.userData = await this.storageService.getUser_AuthSettings();

    this.teamCalendarService.getTeamCalendarData(this.userData.teamId)
      .pipe(
        take(1),
        tap((data: SyncfusionCalEvent[]) => {
          console.log("data:", data);
          this.eventSettings= { dataSource: data};
        })
      )
      .subscribe();
  
  }
}
