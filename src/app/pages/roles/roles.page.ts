import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ITeamChat_GetTokenForUserRegistration_Request_ViewModel, ITeamChat_GetTokenForUserRegistration_Response_ViewModel } from 'src/app/models/authentication-models';
import { ITeamChat_User_RoleData_Grouped } from 'src/app/models/roles';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.page.html',
  styleUrls: ['./roles.page.scss', './roles.shell.scss'],
})
export class RolesPage implements OnInit {
  @Input() listRoles: ITeamChat_User_RoleData_Grouped[]

  availableRoles = new BehaviorSubject<ITeamChat_User_RoleData_Grouped[]>([]);
  availableRoles$: Observable<ITeamChat_User_RoleData_Grouped[]> = this.availableRoles.asObservable();
  pushToken: string;

  constructor(
    private storageService: StorageService,
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  async ngOnInit(): Promise<void> {
    this.pushToken = await this.storageService.getDevice_PushNotification_Token();
  }

  async ionViewWillEnter() {
    const listRoles = await this.storageService.getUser_AvailableRoles();
    this.availableRoles.next(listRoles);
  }

  roleClicked(role:any) {
    const requestModel: ITeamChat_GetTokenForUserRegistration_Request_ViewModel = {
      registrationId: role.registrationId,
      pushToken: this.pushToken
    }

    this.authenticationService.TeamChat_GetTokenForUserRegistration(requestModel)
      .pipe(
        tap((response: ITeamChat_GetTokenForUserRegistration_Response_ViewModel) => {
          if (response?.token) {
            role.token = response.token;
            role.headshotUrl = response.headshotUrl;
            this.storageService.setUser_AuthSettings(role);
            this.router.navigate(['tabs']);
          }
        })
      )
      .subscribe();
  }

  signOut() {
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }

}
