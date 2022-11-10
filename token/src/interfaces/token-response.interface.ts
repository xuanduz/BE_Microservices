export interface ITokenResponse {
  status: number;
  token: string | null;
  message: string;
  refresh_token: string | null;
}
