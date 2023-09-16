// import { ITeamChat_AvailableRoles_ViewModel } from "./roles";

export interface  ITeamChat_ValidateUser_ViewModel
{
    username: string;
    password: string;
    // clubKey: string;
}

export interface ITeamChat_GetTokenForUserRegistration_Request_ViewModel
{
    registrationId: string;
    pushToken: string;
}

export interface ITeamChat_GetTokenForUserRegistration_Response_ViewModel
{
    token: string;
    headshotUrl: string;
}

export interface Firebase_SetDeviceJob_RequestModel{
    deviceToken: string;
    jobId: string;
    deviceType: string;
}

export interface SwapPhone_DeviceTokens_RequestModel {
    oldDeviceToken: string;
    newDeviceToken: string;
}

export interface TeamChat_GetTokenForUserIdAndTeamId_Request_ViewModel{
    userId: string;
    teamId: string;
}
