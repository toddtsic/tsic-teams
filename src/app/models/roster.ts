export interface ITeamRosterPlayer_Mobile_ViewModel {
    firstName: string;
    lastName: string;
    roleName: string;
    cellphone: string;
    email: string;
    headshotUrl: string;
    mom: string;
    momEmail: string;
    momCellphone: string;
    dad: string;
    dadEmail: string;
    dadCellphone: string;
    uniformNumber: number;
    city: string;
    school: string;
    userName: string;
    userId: string;
}

export interface ITeamRosterStaff_Mobile_ViewModel {
    firstName: string;
    lastName: string;
    roleName: string;
    cellphone: string;
    email: string;
    headshotUrl: string;
    userName: string;
    userId: string;
}

export interface ITeamRosterMobile_ViewModel{
    staff: ITeamRosterStaff_Mobile_ViewModel[];
    players: ITeamRosterPlayer_Mobile_ViewModel[];
}

