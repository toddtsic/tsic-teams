
export interface TeamLinks_Request {
    roleName: string;
    teamId: string;
    pagingParams: PagingParamsTeamLinks;
}

export interface TeamLink_ViewModel {
    docId: string;
    teamId: string;
    jobId: string;
    label: string;
    createDate: Date;
    userId: string;
    user: string;
    docUrl: string;
}

export interface PagingParamsTeamLinks {
    pageNumber: number;
    rowsPerPage: number;
}

export interface TeamLink_AddRequest{
    userId: string;
    roleName: string;
    teamId: string;
    bAddAllTeams: boolean;
    label: string;
    docUrl: string;
    requestTimestampString: string;
}

export const DEFAULT_PAGINGPARAMS_TEAMLINKS: PagingParamsTeamLinks = {
    pageNumber: 1,
    rowsPerPage: 8
  }
  

