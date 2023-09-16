import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor() {}

  async ngOnInit(): Promise<void> {
    // this.ios = this.config.get('mode') === 'ios';
    // this.jobId = await this._myStorageService.getJobId();
    // this.jobName = await this._myStorageService.getJobName();
    // this.customerName = this.jobName.split(':')[0];
    // this.jobNameShort = this.jobName.split(':')[1];
    // this.jobLogoUrl = await this._myStorageService.getJobLogoUrl();

    // fired only once
    console.log("tab2: ngOnInit()");
  }

  async ionViewWillEnter() {
    // this.userPreferences = await this._myStorageService.getUserEventSchedulePreferences();
    // this.brackets = this._route.snapshot.data.resolverData;
    // if (!this.brackets || this.brackets.length === 0){
    //   this.showNoBracketsAlert();
    // }

    // fires each time tab clicked
    console.log("tab2: ionViewWillEnter()");
  }  
}
