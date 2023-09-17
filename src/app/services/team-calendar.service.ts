import { Injectable } from '@angular/core';
import { shareReplay, take, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TeamCalendarService {

  constructor(
    private http: HttpClient,
  ) {
  }

  getTeamCalendarData(teamId: string) {
      const url = `${environment.apiUrl}/api/TeamCalendar/LoadRosterMemberCalendarData/${teamId}`;

      return this.http.get<any>(url)
        .pipe(
          shareReplay(),
        );
      }

}
