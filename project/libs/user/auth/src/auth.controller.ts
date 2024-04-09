import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserCreateDto } from './dto/user-create.dto';
import { UserSignInDto } from './dto/user-sign-in.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  public async create(@Body() dto: UserCreateDto) {
    return await this.authService.register(dto);
  }

  @Post('sign-in')
  public async login(@Body() dto: UserSignInDto) {
    return await this.authService.verifyUser(dto);
  }

  @Get(':id')
  public async get(@Param('id') id: string) {
    return await this.authService.getUser(id);
  }
}
