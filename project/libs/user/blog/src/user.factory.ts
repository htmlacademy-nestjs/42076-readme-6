import { Injectable } from '@nestjs/common';
import { UserAuth, EntityFactory } from '@project/core';
import { UserEntity } from './user.entity';

@Injectable()
export class UserFactory implements EntityFactory<UserEntity> {
  public create(entityPlainData: UserAuth): UserEntity {
    return new UserEntity(entityPlainData);
  }
}
