export class SignInResponse {
    accessToken: string
    tokenType: string
    firstName?: string
    lastName?: string
    email?: string
    nbFollowers?: number;
    nbSubscriptions?: number;
    imgUrl?: string
    id?: number
    userRole?: string
}
