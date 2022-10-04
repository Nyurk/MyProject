export enum UserRole {
  Admin = 'Admin',
  User = 'User',
}

export const userRoleOptions: IInputOption[] = Object.keys(UserRole).map((key) => {
  const value = UserRole[key];

  return {
    label: key,
    value,
  };
});

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: UserRole;
  avatar?: string;
}
