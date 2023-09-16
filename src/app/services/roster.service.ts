import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, shareReplay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RosterService {

  constructor(
    private http: HttpClient
  ) { }

  getTeamRosterByRegistrationId(registrationId: string) {

    const url = `${environment.apiUrl}/api/TeamRoster/GetTeamRosterByRegistrationId/${registrationId}`;

    return this.http.get<any>(url)
      .pipe(
        shareReplay(),
      );
  }
  getTeamRosterByTeamId(teamId: string) {

    const url = `${environment.apiUrl}/api/TeamRoster/GetTeamRosterByTeamId/${teamId}`;

    return this.http.get<any>(url)
      .pipe(
        shareReplay(),
      );
  }

}
