import { action, makeObservable, observable } from 'mobx';
import { IUser } from '../constants/users';
import DBService from '../database';
import Translations from '../constants/translations';

class SessionStore {
  public sessionUser: Maybe<IUser> = null;

  public message: Maybe<string> = null;

  constructor() {
    makeObservable(this, {
      sessionUser: observable,
      message: observable,

      setMessage: action.bound,
      setSessionUser: action.bound,
    });
  }

  public async login(email: string, password: string): Promise<Maybe<string>> {
    const user: Maybe<IUser> = await DBService.getUserByEmail(email.toLowerCase());

    if (!user || user.password !== password) {
      return Translations.ru.loginError;
    }
    this.setSessionUser(user);
    return null;
  }

  public logout() {
    this.setSessionUser(null);
  }

  // setters ---------------------------------------------------------------------------------------

  public setMessage(message: Maybe<string>) {
    this.message = message;
  }

  public setSessionUser(user: Maybe<IUser>) {
    this.sessionUser = user;
  }
}

export default SessionStore;
