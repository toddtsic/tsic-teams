import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Firebase_SetDeviceJob_RequestModel, ITeamChat_GetTokenForUserRegistration_Request_ViewModel, ITeamChat_ValidateUser_ViewModel } from "../models/authentication-models";
import { Observable, catchError, shareReplay, tap } from "rxjs";
import { environment } from 'src/environments/environment';
import { ITeamChat_User_RoleData } from "../models/roles-models";
import { StorageService } from "./storage.service";


@Injectable({ providedIn: 'root' })
export class AuthenticationService {

    constructor(
        private http: HttpClient,
        private _storageService: StorageService
    ) {
    }

    TeamChat_ValidateUser(postModel: ITeamChat_ValidateUser_ViewModel): Observable<any> {
        const url = `${environment.apiUrl}/api/ChatAuth/TeamChat_ValidateUser`;
        return this.http.post<any>(url, postModel)
          .pipe(
            shareReplay(),
          );
      }
    
      TeamChat_GetTokenForUserRegistration(postModel: ITeamChat_GetTokenForUserRegistration_Request_ViewModel): Observable<any> {
        const url = `${environment.apiUrl}/api/ChatAuth/TeamChat_GetTokenForUserRegistration`;
        return this.http.post<any>(url, postModel)
          .pipe(
            shareReplay(),
          );
      }
    
      Logout(username:string): Observable<any> {
        debugger;
        return this.http.get<any>(`${environment.apiUrl}/api/Logout/Logout/${username}`)
          .pipe(
            tap(resp => {
              this._storageService.clear();
            }),
            shareReplay(),
          );
      }
    
      jobDevice_Add(requestModel: Firebase_SetDeviceJob_RequestModel): Observable<any> {
        const apiUrl = `${environment.apiUrl}/api/Firebase/JobDevice_Add`;
        return this.http.post(apiUrl, requestModel)
          .pipe(
            shareReplay(),
          );
      }

      async isAuthenticated(): Promise<boolean>{
        const userData:ITeamChat_User_RoleData = await this._storageService.getUser_AuthSettings();
        if (!userData || !userData.token){
          return false;
        }else {
          return !this.tokenExpired(userData.token);
        }
      }

      private tokenExpired(token: string) {
        const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
        return (Math.floor((new Date).getTime() / 1000)) >= expiry;
      }      
    }