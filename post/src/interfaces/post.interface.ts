export interface IPost {
  post_id: number
  content: string
  title: string
  last_update?: Date

  share_amount?: number
  like_amount?: number
  post_view?: number
  images?: number
  category_id?: number
}