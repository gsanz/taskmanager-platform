import { AuthUser } from '../entities/auth-user.entity';
export const AUTH_REPOSITORY = 'AuthRepository';
export interface AuthRepository {
  findByAuthEmail(email: string): Promise<AuthUser | null>;
  changePassword(id: string, password: string): Promise<void>;
}
