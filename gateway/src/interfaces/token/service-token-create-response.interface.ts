export interface IServiveTokenCreateResponse {
  status: number;
  token: string | null;
  refresh_token: string | null;
  message: string;
  errors: { [key: string]: any };
}
