import { Skill } from "./skill";

export interface User {
  id: number;
  full_name: String,
  username: string;
  email: string;
  password: string;
  description: string;
  avatar_option: string;
  skills: Skill[];
  interests: Skill[];
  rating_count : number // cantidad de ratings
  average_rating : number // media de ratings
  skills_details?: Skill[];  // Para lectura (con nombres)
  interests_details?: Skill[]; // Para lectura (con nombres)
}

export interface UserResponse {
  access_token: string;
  refresh_token: string;
  user: {
    id: number;
    username: string;
    email: string;
    full_name: string;
    description?: string;
    avatar?: string;
    skills: any[];
    interests: any[];
    rating_count : number 
    average_rating : number 
  }
}
