import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserEntity, UserRepository } from '@project/user-blog';
import { UserCreateDto } from './dto/user-create.dto';
import { UserSignInDto } from './dto/user-sign-in.dto';
import { AuthError } from "./utils/error";

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  public async register(dto: UserCreateDto): Promise<UserEntity> {
    const {
      email,
      firstName,
      lastName,
      password,
      avatarImageUrl
    } = dto;

    const existUser = await this.userRepository.findByEmail(email);

    if (existUser.email) {
      throw new ConflictException(AuthError.EXISTS);
    }

    const user = {
      email,
      firstName,
      lastName,
      avatarImageUrl: avatarImageUrl ?? '',
      passwordHash: '',
    };

    const userEntity = await new UserEntity(user).setPassword(password);

    this.userRepository.save(userEntity);

    return userEntity;
  }

  public async verifyUser(dto: UserSignInDto) {
    const { email, password } = dto;

    const existUser = await this.userRepository.findByEmail(email);

    if (!existUser.email) {
      throw new NotFoundException(AuthError.NOT_FOUND);
    }

    if (!(await existUser.comparePassword(password))) {
      throw new UnauthorizedException(AuthError.PASSWORD_WRONG);
    }

    return existUser;
  }

  public async getUser(id: string) {
    return this.userRepository.findById(id);
  }
}
