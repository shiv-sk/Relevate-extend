import { UserRole } from 'commons/userRoles.common';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}
