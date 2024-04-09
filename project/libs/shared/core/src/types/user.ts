export interface UserBase {
  id?: string;
  email: string;
  firstName: string;
  lastName: string;
  avatarImageUrl?: string;
}

export interface User extends UserBase {}
