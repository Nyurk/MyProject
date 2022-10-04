import Dexie from 'dexie';
import { IUser, UserRole } from './constants/users';
import { IProject } from './constants/projects';
import Translations from './constants/translations';

enum DBTables {
  Users = 'Users',
  Projects = 'Projects',
  ProjectsToUser = 'ProjectToUser',
}

const DB_NAME = 'my-app-database';

const START_VERSION = 1;

const scheme1 = {
  [DBTables.Users]: 'id, email, role',
  [DBTables.Projects]: 'id',
  [DBTables.ProjectsToUser]: 'id',
};

class Database {
  db: Dexie;

  constructor() {
    this.db = new Dexie(DB_NAME);

    this.db.version(START_VERSION).stores(scheme1);
  }

  public async createUser(user: IUser): Promise<Maybe<string>> {
    try {
      await this.db.table<IUser>(DBTables.Users).add(user);

      return null;
    } catch (error: any) {
      if (error && error.message && typeof error.message === 'string') {
        return error.message;
      }

      return Translations.ru.unknownError;
    }
  }

  public async getUsers(): Promise<IUser[]> {
    return this.db.table<IUser>(DBTables.Users).toArray();
  }

  public async getUserById(id: string): Promise<Maybe<IUser>> {
    const user = await this.db.table<IUser>(DBTables.Users).get(id);

    return user || null;
  }

  public async isAdminExist(): Promise<boolean> {
    const admins = await this.db
      .table<IUser>(DBTables.Users)
      .where({ role: UserRole.Admin })
      .toArray();

    return !!admins.length;
  }

  public async getUserByEmail(email: string): Promise<Maybe<IUser>> {
    const user = await this.db.table<IUser>(DBTables.Users).get({ email });

    return user || null;
  }

  public async updateUser(id: string, update: Partial<Omit<IUser, 'id'>>): Promise<boolean> {
    const answer = await this.db.table<IUser>(DBTables.Users).update(id, update);

    return !!answer;
  }

  public async deleteUser(id: string) {
    return this.db.table<IUser>(DBTables.Users).delete(id);
  }

  public async createProject(project: IProject): Promise<string> {
    try {
      await this.db.table<IProject>(DBTables.Projects).add(project);

      return '';
    } catch (error: any) {
      if (error && error.message && typeof error.message === 'string') {
        return error.message;
      }

      return Translations.ru.unknownError;
    }
  }

  public async readProject(id: string): Promise<Maybe<IProject>> {
    const project = await this.db.table<IProject>(DBTables.Projects).get(id);

    return project || null;
  }

  public async updateProject(id: string, update: Partial<Omit<IProject, 'id'>>): Promise<boolean> {
    const answer = await this.db.table<IProject>(DBTables.Projects).update(id, update);

    return !!answer;
  }

  public async deleteProject(id: string) {
    return this.db.table<IProject>(DBTables.Projects).delete(id);
  }

  public async createProjectToUser(userId: string, projectId: string): Promise<string> {
    try {
      await this.db.table(DBTables.ProjectsToUser).add(userId, projectId);

      return '';
    } catch (error: any) {
      if (error && error.message && typeof error.message === 'string') {
        return error.message;
      }

      return Translations.ru.unknownError;
    }
  }
}

const DBService = new Database();

// TODO: remove this
// @ts-ignore
window.DBService = DBService;

export default DBService;
