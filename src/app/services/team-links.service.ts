import { Injectable } from '@angular/core';
import { catchError, shareReplay, take, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { TeamLinks_Request, TeamLink_AddRequest, TeamLink_ViewModel } from '../models/team-links';


@Injectable({
  providedIn: 'root'
})
export class TeamLinksService {

  constructor(
    private http: HttpClient,
  ) {
  }


  deleteTeamLink(docId: string){
    const url = `${environment.apiUrl}/api/TeamLinks/DeleteTeamLink/${docId}`;

    return this.http.delete<any>(url)
      .pipe(
        shareReplay(),
      );
  }

  addTeamLink(requestModel: TeamLink_AddRequest) {

    const url = `${environment.apiUrl}/api/TeamLinks/AddTeamLink`;

    return this.http.post<any>(url, requestModel)
      .pipe(
        shareReplay(),
      );
  }

  getTeamLinks(requestModel: TeamLinks_Request) {

    const url = `${environment.apiUrl}/api/TeamLinks/GetTeamLinks`;

    return this.http.post<any>(url, requestModel)
      .pipe(
        take(1),
      );
  }
}
