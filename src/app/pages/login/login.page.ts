import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { ITeamChat_ValidateUser_ViewModel } from 'src/app/models/authentication-models';
import { ITeamChat_User_RoleData_Grouped } from 'src/app/models/roles-models';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credentialsForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private storageService: StorageService
  ) { }

  async ngOnInit() {
    this.credentialsForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    const lastLogin = await this.storageService.getUser_LastLogin();
    if (lastLogin) {
      this.credentialsForm = this.fb.group({
        username: [lastLogin.username, [Validators.required]],
        password: [lastLogin.password, [Validators.required, Validators.minLength(6)]]
      });
    }
  }

  signIn() {
    const requestModel: ITeamChat_ValidateUser_ViewModel = {
      username: this.credentialsForm?.value.username,
      password: this.credentialsForm?.value.password
    };

    this.authenticationService.TeamChat_ValidateUser(requestModel)
      .pipe(
        tap((response: ITeamChat_User_RoleData_Grouped[]) => {
          debugger;
          if (response) {
            this.storageService.setUser_AvailableRoles(response);
            this.storageService.setUser_LastLogin({
              username: requestModel.username,
              password: requestModel.password
            });
            this.router.navigateByUrl('/roles', { replaceUrl: true });
          }
        })
      )
      .subscribe();
  }

}
