import { StorableEntity, UserAuth } from '@project/core';
import { Entity } from '@project/core';
import { genSalt, hash, compare } from 'bcrypt';
import { SALT_ROUNDS } from "./user.config";

export class UserEntity extends Entity implements StorableEntity<UserAuth> {
  public email: string;
  public firstName: string;
  public lastName: string;
  public avatarImageUrl?: string;
  public passwordHash: string;

  constructor(user?: UserAuth) {
    super();
    this.populate(user);
  }

  public populate(user?: UserAuth): void {
    if (!user) {
      return;
    }

    this.id = user.id ?? '';
    this.email = user.email;
    this.avatarImageUrl = user.avatarImageUrl ?? '';
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.passwordHash = user.passwordHash;
  }

  public toPOJO(): UserAuth {
    return {
      id: this.id,
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      avatarImageUrl: this.avatarImageUrl,
      passwordHash: this.passwordHash,
    };
  }

  public async setPassword(password: string): Promise<UserEntity> {
    const salt = await genSalt(SALT_ROUNDS);
    this.passwordHash = await hash(password, salt);
    return this;
  }

  public async comparePassword(password: string): Promise<boolean> {
    return compare(password, this.passwordHash);
  }
}
