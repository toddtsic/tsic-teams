import { Injectable } from '@angular/core';
import { shareReplay, take, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { TeamPushes_Request, TeamPush_AddRequest } from '../models/team-pushes';

@Injectable({
  providedIn: 'root'
})
export class TeamPushesService {

  constructor(
    private http: HttpClient,
  ) {
  }

  addTeamPush(requestModel: TeamPush_AddRequest) {

    const url = `${environment.apiUrl}/api/TeamPushes/AddTeamPush`;

    return this.http.post<any>(url, requestModel)
      .pipe(
        shareReplay(),
      );
  }

  getTeamPushes(requestModel: TeamPushes_Request) {

    const url = `${environment.apiUrl}/api/TeamPushes/GetTeamPushes`;

    return this.http.post<any>(url, requestModel)
      .pipe(
        take(1),
      );
  }
}
