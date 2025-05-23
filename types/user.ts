export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  initials: string;
  user_id_number: string;
  last_login: string;
  roles: string[];
}

export interface UserProfile {
  user: User;
} 