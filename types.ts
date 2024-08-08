import { Json } from "./types_db";

export interface Song {
  id: string;
  user_id: string;
  author: string;
  title: string;
  song_path: string;
  image_path: string;
  peak_data: number[][];
}

export interface Customer {
  id: string;
  stripe_customer_id?: string;
}

export interface UserDetails {
  id: string;
  first_name: string;
  last_name: string;
  full_name?: string;
  avatar_url?: string;
}
