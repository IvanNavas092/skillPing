export interface Rating {
  id: number;
  rating_user: number;
  rated_user: number;
  value: number;
  comment: string;
  created_at: Date;
  avatar: number;
}

export interface RatingPayload {
  rating_user: number;
  rated_user: number;
  value: number;
  comment: string;
}
