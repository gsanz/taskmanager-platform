import { Injectable, Inject } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { AUTH_REPOSITORY } from '../../../domain/auth/repositories/auth.repository';
import type { AuthRepository } from '../../../domain/auth/repositories/auth.repository';
import { ChangePasswordDto } from '../dto/change-password.dto';

@Injectable()
export class ChangePasswordUseCase {
  constructor(
    @Inject(AUTH_REPOSITORY)
    private readonly authRepo: AuthRepository,
  ) {}

  async execute(userId: string, dto: ChangePasswordDto): Promise<void> {
    const hashedPassword = await bcrypt.hash(dto.newPassword, 10);
    await this.authRepo.changePassword(userId, hashedPassword);
  }
}
