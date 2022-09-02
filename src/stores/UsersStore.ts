import { action, makeObservable, observable } from 'mobx';

import { IUser } from '../constants/users';
import DBService from '../database';
import Translations from '../constants/translations';
import { IProject } from '../constants/projects';

class UsersStore {
  public message: Maybe<string> = null;

  public users: IUser[] = [];

  public loadingUsers: boolean = false;

  constructor() {
    makeObservable(this, {
      message: observable,
      users: observable,
      loadingUsers: observable,

      setMessage: action.bound,
      setUsers: action.bound,
      addUser: action.bound,
      editUser: action.bound,
      setLoadingUsers: action.bound,
    });

    this.getUsers().catch();
  }

  public async createUser(user: IUser) {
    const error = await DBService.createUser(user);

    this.setMessage(error || Translations.ru.createUserSuccess);

    if (!error) {
      this.addUser(user);
    }
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

  public async updateUser(updateUserId: string, update: Partial<Omit<IUser, 'id'>>) {
    const error = await DBService.updateUser(updateUserId, update);

    if (error) {
      this.setMessage(Translations.ru.updateUserError);
    } else {
      this.editUser(updateUserId, update);
    }
  }

  // ACTIONS ---------------------------------------------------------------------------------------

  public setMessage(message: string) {
    this.message = message;
  }

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
