import { Injectable } from '@angular/core';
import { catchError, shareReplay, tap } from 'rxjs/operators';
import { TeamChatMessage, TeamChatMessages_Request, TeamChatMessage_Add_Model, TeamChatMessage_Delete_Model } from '../models/chat';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { HubConnection, LogLevel } from '@microsoft/signalr';
import { from, Observable } from 'rxjs';
import * as signalR from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  // public teamChatMessages: TeamChatMessage[];
  private hubChatConnection: HubConnection;

  public teamChatData: TeamChatMessage[];

  constructor(
    private http: HttpClient,
  ) {
  }

  buildConnection = () => {
    const url = `${environment.apiUrl}/ChatHub`;
    this.hubChatConnection = new signalR.HubConnectionBuilder()
      .withUrl(url)
      .configureLogging(LogLevel.Debug)
      .build();

  }

  async startConnection(userId:string, teamId:string, content:any) {
    this.hubChatConnection
      .start()
      .then(() => {
        console.log('Connection started');
        this.hubChatConnection.invoke("JoinGroup", teamId)
      })
      .catch(err => console.log('Error while starting connection: ' + err))
  }

  addTeamChatMessagesListeners = (teamId:string) => {

    this.hubChatConnection.on(`newmessage_${teamId}`, (data) => {
      this.teamChatData.push(data);
      console.log('adding message:', data);
    });

    this.hubChatConnection.on(`deletemessage_${teamId}`, (messageId) => {
      this.teamChatData = this.teamChatData
        .filter(msg => msg.messageId != messageId);
    });
  }

  ScrollToBottom(content:any) {
    if (content) {
      setTimeout(() => {
        content.scrollToBottom();
      }, 500);
    }
  }

  //#region chat functionality

  addChatMessage(postModel: TeamChatMessage_Add_Model): Observable<any> {
    return from(
      this.hubChatConnection.invoke("AddTeamChatMessage", postModel)
        .then((result) => {
        })
    )
  }

  deleteChatMessage(postModel: TeamChatMessage_Delete_Model): Observable<any> {
    const url = `${environment.apiUrl}/api/Chat/DeleteTeamChatMessage`;
    return from(this.hubChatConnection.invoke("DeleteTeamChatMessage", postModel)
      .then((result) => {
      })
    )
  }

  getTeamChatMessages(requestModel: TeamChatMessages_Request) {

    const url = `${environment.apiUrl}/api/Chat/GetTeamMessages`;

    return this.http.post<any>(url, requestModel)
      .pipe(
        shareReplay(),
      );
  }

  breakdownTeamChatConnection() {
    this.hubChatConnection.stop();
  }

  //#endregion chat functionality
}
