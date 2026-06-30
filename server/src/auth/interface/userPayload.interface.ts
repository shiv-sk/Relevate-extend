import { UserRole } from '../../../commons/userRoles.common';

export interface UserPayload {
  sub: string;
  email: string;
  role: UserRole[];
}
