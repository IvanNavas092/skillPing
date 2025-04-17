import { Skill } from "./skill";

export interface User {
   id: number;
   full_name: String,
   username: string;
   email: string;
   password: string;
   description: string;
   avatar: string;
   skills: Skill[];
   interests: Skill[];
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
   }
}
