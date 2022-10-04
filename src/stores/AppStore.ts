import { action, makeObservable, observable } from 'mobx';
import DBService from '../database';

class AppStore {
  public initialized: boolean = false;

  public adminExist: Maybe<boolean> = null;

  constructor() {
    makeObservable(this, {
      initialized: observable,
      adminExist: observable,

      setInitialized: action.bound,
      setAdminExist: action.bound,
    });
  }

  public async initialize() {
    const adminExist = await DBService.isAdminExist();
    console.log(adminExist);

    this.setAdminExist(adminExist);
    this.setInitialized(true);
  }

  // setters ---------------------------------------------------------------------------------------

  public setInitialized(initialized: boolean) {
    this.initialized = initialized;
  }

  public setAdminExist(adminExist: boolean) {
    this.adminExist = adminExist;
  }
}

export default AppStore;
