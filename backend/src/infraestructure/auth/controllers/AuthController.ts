import { Controller, Post, Body, HttpCode, HttpStatus, Req, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

import { LoginDto } from '../../../application/auth/dto/login.dto';
import { LoginUseCase } from '../../../application/auth/use-cases/login.usecase';
import { ChangePasswordDto } from '../../../application/auth/dto/change-password.dto';
import { ChangePasswordUseCase } from '../../../application/auth/use-cases/change-password.usecase';
import { JwtAuthGuard } from '../jwt-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly changePasswordUseCase: ChangePasswordUseCase,
  ) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Iniciar sesión de usuario',
    description: 'Autentica al usuario con email y password y devuelve un JWT',
  })
  @ApiBody({
    type: LoginDto,
    examples: {
      ejemplo1: {
        summary: 'Login estándar',
        value: {
          email: 'admin@test.com',
          password: '123456',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Login correcto',
    schema: {
      example: {
        access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Usuario o contraseña incorrectos',
    schema: {
      example: {
        statusCode: 401,
        message: 'Usuario o contraseña incorrectos',
        error: 'Unauthorized',
      },
    },
  })
  async login(@Body() dto: LoginDto) {
    return this.loginUseCase.execute(dto);
  }

  @Post('change-password')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Cambiar la contraseña del usuario autenticado' })
  @ApiBody({ type: ChangePasswordDto })
  async changePassword(@Req() request: { user: { id: string } }, @Body() dto: ChangePasswordDto) {
    await this.changePasswordUseCase.execute(request.user.id, dto);
  }
}
