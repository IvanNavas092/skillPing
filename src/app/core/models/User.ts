import { Avatar } from "./avatar";
import { Skill } from "./skill";

export interface User {
  id: number;
  full_name: String,
  username: string;
  email: string;
  password: string;
  skills: Skill[]; // ID
  interests: Skill[]; // ID
  skills_details?: Skill[];  // for read  (with names)
  interests_details?: Skill[]; // for read (with names)
  // Extras
  age: number;
  gender: string;
  description: string;
  location: string;
  avatar_option?: Avatar;
  rating_count : number // cantidad de ratings
  average_rating : number // media de ratings
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

export interface UserUpdate {
  full_name: string;
  username: string;
  email: string;
  age: number;
  location: string;
  gender: string;
  description: string;
  skills: number[]; //ID PK IN BACK
  interests: number[]; //ID PK IN BACK
  avatar_option?: number;
}
