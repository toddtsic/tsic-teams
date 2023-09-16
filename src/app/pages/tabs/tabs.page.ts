import { Component, OnInit } from '@angular/core';
import { ITeamChat_User_RoleData } from 'src/app/models/roles-models';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {
  userData: ITeamChat_User_RoleData;

  constructor(private storageService:StorageService) {}
  
  async ngOnInit() {
    this.userData = await this.storageService.getUser_AuthSettings();
  }
}
