import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  ConflictException,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { User } from '../entities/user.entity';

@Injectable()
export class UserExistencePipe implements PipeTransform {
  constructor(private readonly userService: UserService) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async transform(value: Partial<User>, metadata: ArgumentMetadata) {
    const user = await this.userService.findOne({
      where: { email: value.email },
    });
    if (user) {
      throw new ConflictException(
        `The email «${value.email}» is already registered.`,
      );
    }
    return value;
  }
}
