export interface IUser {
  user_id: number
  email: string
  password: string
  username: string
  role: string
  name: string
  registration_date?: Date
  status?: number
  notification_id?: number
}
