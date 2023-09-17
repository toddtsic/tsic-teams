export interface TeamPushes_Request {
    roleName: string;
    teamId: string;
    pagingParams: PagingParamsTeamPushes;
}

export interface PagingParamsTeamPushes {
    pageNumber: number;
    rowsPerPage: number;
}

export interface TeamPush_AddRequest {
    userId: string;
    roleName: string;
    teamId: string;
    bAddAllTeams: boolean;
    pushText: string;
    requestTimestampString: string;
}

export interface TeamPush_ViewModel{
    id: string;
    jobId: string;
    teamId: string;
    userId: string;
    user: string;
    pushText: string;
    deviceCount: number;
    bAddAllTeams: boolean;
    createDate: Date;
}

export const DEFAULT_PAGINGPARAMS_TEAMPUSHES: PagingParamsTeamPushes = {
    pageNumber: 1,
    rowsPerPage: 8
}


