import UsersStore from './UsersStore';
import SessionStore from './SessionStore';
import NotificationStore from './NotificationStore';
import AppStore from './AppStore';

export const appStore = new AppStore();

export const usersStore = new UsersStore();

export const sessionStore = new SessionStore();

export const notificationStore = new NotificationStore();
