
export interface ITeamChat_User_RoleData {
    groupName: string,
    registrationId: string;
    agegroupName: string;
    jobName: string;
    teamName: string;
    teamId: string;
    clubName: string;
    roleName: string;
    registrantName: string;
    userId: string;
    jobLogoUrl: string;
    token: string;
    headshotUrl: string;
    email: string;
    cellphone: string;
}

export interface IUser_LastLogin{
    username: string;
    password: string;
}

export interface ITeamChat_User_RoleData_Grouped
{
    groupName: string;
    listRoles: ITeamChat_User_RoleData[];
}

export interface IUser_LastLogin{
    username: string;
    password: string;
}

export const DEFAULT_USER_AUTHSETTINGS: ITeamChat_User_RoleData = {
    groupName: '',
    registrationId: '',
    agegroupName: '',
    jobName: '',
    teamName: '',
    teamId: '',
    clubName: '',
    roleName: '',
    registrantName: '',
    userId: '',
    jobLogoUrl: '',
    token: '',
    headshotUrl:'/assets/images/anonymousperson.png',
    email: '',
    cellphone: ''
};
