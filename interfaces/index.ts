export interface Course {
  _id: string;
  title: string;
  description: string;
  thumbnail: string;
  price: number;
  status: string;
  duration_months: number;
  course_type: string;
  delivery_method: string;
  difficulty_level: string;
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