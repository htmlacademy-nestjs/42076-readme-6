import { UserBase } from "./user";

export interface UserAuth extends UserBase {
  passwordHash: string;
}
