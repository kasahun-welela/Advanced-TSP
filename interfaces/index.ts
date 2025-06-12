export interface Course {
  _id: string;
  title: string;
  description: string;
  thumbnail: string;
  price: number;
  creator?: {
    _id: string;
    name: string;
    email: string;
  };
  difficulty_level: string;
  status: string;
  duration_months: number;
  course_type: string;
  delivery_method: string;
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
 
} 

export interface CreateCourse {
  title: string;
  description: string;
  thumbnail: string;
  logo_url: string;
  price: number;
  difficulty_level: string;
  status: string;
  duration_months: number;
  course_type: string;
  delivery_method: string;
} 