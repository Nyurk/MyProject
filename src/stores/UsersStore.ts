import { action, makeObservable, observable } from 'mobx';

import { IUser } from '../constants/users';
import DBService from '../database';
import Translations from '../constants/translations';

class UsersStore {
  public users: IUser[] = [];

  public loadingUsers: boolean = false;

  constructor() {
    makeObservable(this, {
      users: observable,
      loadingUsers: observable,

      setUsers: action.bound,
      addUser: action.bound,
      editUser: action.bound,
      setLoadingUsers: action.bound,
    });

    this.getUsers().catch();
  }

  public static async createUser(user: IUser): Promise<Maybe<string>> {
    const error = await DBService.createUser(user);

    return error || null;
  }

  public async getUsers() {
    this.setLoadingUsers(true);

    const users = await DBService.getUsers();

    this.setLoadingUsers(false);
    this.setUsers(users);
  }

  public async deleteUser(deleteUserId: string) {
    await DBService.deleteUser(deleteUserId);

    const newUsers = this.users.filter((user) => user.id !== deleteUserId);

    this.setUsers(newUsers);
  }

  public async updateUser(
    updateUserId: string,
    update: Partial<Omit<IUser, 'id'>>,
  ): Promise<Maybe<string>> {
    const error = await DBService.updateUser(updateUserId, update);

    if (error) {
      return Translations.ru.updateUserError;
    }
    this.editUser(updateUserId, update);
    return null;
  }

  public static async isEmailExist(email: string): Promise<boolean> {
    const user = await DBService.getUserByEmail(email);
    return !!user;
  }

  // ACTIONS ---------------------------------------------------------------------------------------

  public setUsers(allUsers: IUser[]) {
    this.users = allUsers;
  }

  public addUser(user: IUser) {
    this.users.push(user);
  }

  public editUser(updateUserId: string, update: Partial<Omit<IUser, 'id'>>) {
    const indexUpdateUser = this.users.findIndex((user) => updateUserId === user.id);

    if (indexUpdateUser === -1) return;

    this.users[indexUpdateUser] = {
      ...this.users[indexUpdateUser],
      ...update,
    };
  }

  public setLoadingUsers(loadingUsers: boolean) {
    this.loadingUsers = loadingUsers;
  }
}

export default UsersStore;
