import { Module } from '@nestjs/common';
import { UserFactory } from './user.factory';
import { UserRepository } from './user.repository';

@Module({
  providers: [UserRepository, UserFactory],
  exports: [UserRepository],
})
export class UserModule {}
