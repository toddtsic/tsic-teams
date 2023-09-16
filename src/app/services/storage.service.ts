import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { KEY_DEVICE_PUSHNOTIFICATION_TOKEN, KEY_LISTUSERROLES, KEY_PUSHNOTIFICATION_REGISTERED_STATUS, KEY_USER_AUTHSETTINGS, KEY_USER_LASTLOGIN } from '../models/storage-keys-models';
import { ITeamChat_User_RoleData, ITeamChat_User_RoleData_Grouped, IUser_LastLogin } from '../models/roles-models';
import { SwapPhone_DeviceTokens_RequestModel } from '../models/authentication-models';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage: Storage | null = null;

  constructor(
    private storage: Storage,
    private http: HttpClient,
  ) {
     this.init();
  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage = storage;
  }

  //#region core api calls
  public set(key: string, value: any) {
    this._storage?.set(key, value);
  }

  public async get(key: string) {
    return await this._storage?.get(key)
  }

  public async remove(key: string) {
    return await this._storage?.remove(key);
  }

  public async clear() {
    debugger;
    return await this._storage?.clear();
  }

  public async keys() {
    return await this._storage?.keys();
  }

  public async length() {
    return this.storage.length();
  }
  //#endregion core api calls

  //#region app calls to storage
  public async getUser_AuthSettings() {
    return await this.get(KEY_USER_AUTHSETTINGS);
  }

  public async setUser_AuthSettings(authSettings: ITeamChat_User_RoleData) {
    return await this._storage?.set(KEY_USER_AUTHSETTINGS, authSettings);
  }

  public async getUser_AvailableRoles() {
    return await this._storage?.get(KEY_LISTUSERROLES);
  }

  public async setUser_AvailableRoles(listRoles: ITeamChat_User_RoleData_Grouped[]) {
    return await this._storage?.set(KEY_LISTUSERROLES, listRoles);
  }

  public async setUser_LastLogin(authSettings: IUser_LastLogin) {
    return await this._storage?.set(KEY_USER_LASTLOGIN, authSettings);
  }

  public async getUser_LastLogin() {
    return await this._storage?.get(KEY_USER_LASTLOGIN);
  }

  getPushNotificationRegisteredStatus() {
    return this._storage?.get(KEY_PUSHNOTIFICATION_REGISTERED_STATUS);
  }

  setPushNotificationRegisteredStatus(status:string) {
    return this._storage?.set(KEY_PUSHNOTIFICATION_REGISTERED_STATUS, status);
  }

  getDevice_PushNotification_Token() {
    return this._storage?.get(KEY_DEVICE_PUSHNOTIFICATION_TOKEN);
  }

  setDevice_PushNotification_Token(token: string) {
    return this._storage?.set(KEY_DEVICE_PUSHNOTIFICATION_TOKEN, token);
  }

  //#endregion app calls to storage

  swapPhone_DeviceTokens(requestModel: SwapPhone_DeviceTokens_RequestModel): Observable<any> {
    const apiUrl = `{environment.apiUrl}/api/Firebase/SwapPhone_DeviceTokens`;
    return this.http.post(apiUrl, requestModel)
      .pipe(
        shareReplay(),
      );
  }

}
