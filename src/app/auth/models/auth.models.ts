export interface ILogin {
  userName: string;
  password: string;
}
export interface ILoginResponse {
  access_Token: string;
  userId: number;
  message: string;
}
export interface ICurrentUser {
  userId: number;
  name: string;
  role: string; // change this to number would be easy for use.
}
export interface ITokenClaims {
  exp: number;
  iat: number;
  nbf: number;
  nameid: string;
  Role: string;
  unique_name: string;
}
