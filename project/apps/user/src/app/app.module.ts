import { Module } from '@nestjs/common';

import { UserModule } from '@project/user-blog';
import { AuthModule } from '@project/user-auth';

@Module({
  imports: [UserModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
