import { timestamp } from "rxjs/internal/operators/timestamp";

export interface ITeamChat_TeamMessages_Request_ViewModel {
  teamId: string;
}

export interface TeamChatMessage {
  messageId: string;
  message: string;
  teamId: string;
  creatorUserId: string;
  creator: string;
  createdBy: string;
  created: Date;
  myMessage: boolean;
}

export interface TeamChatMessage_Add_Model {
  message: string;
  teamId: string;
  userId: string;
  requestTimestampString: string
}

export interface TeamChatMessage_Delete_Model {
  messageId: string;
  teamId: string;
  userId: string;
}

export interface PagingParamsTeamChat {
  pageNumber: number;
  rowsPerPage: number;
}

export interface TeamChatMessages_Request {
  userId: string;
  teamId: string;
  pagingParams: PagingParamsTeamChat;
}

export const DEFAULT_PAGINGPARAMS_TEAMCHAT: PagingParamsTeamChat = {
  pageNumber: 1,
  rowsPerPage: 8
}

