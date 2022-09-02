export enum UserRole {
  Admin = 'Admin',
  Manager = 'Manager',
  Developer = 'Developer',
  Tester = 'Tester',
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
  role: UserRole;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  avatar?: string;
}
