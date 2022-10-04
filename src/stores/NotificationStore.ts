import { action, makeObservable, observable } from 'mobx';

export enum NotificationType {
  Danger = 'Danger',
  Success = 'Success',
  Warning = 'Warning',
  Info = 'Info',
}

interface INotificationMessage {
  id: string;
  text: string;
  type: NotificationType;
}

class NotificationStore {
  public messages: INotificationMessage[] = [];

  public timersMap: Record<string, NodeJS.Timer> = {};

  constructor() {
    makeObservable(this, {
      messages: observable,

      addMessage: action.bound,
      removeMessage: action.bound,
    });
  }

  public addMessage(id: string, type: NotificationType, text: string) {
    this.messages.push({
      id,
      type,
      text,
    });

    this.timersMap[id] = setTimeout(() => {
      this.removeMessage(id);
    }, 5000);
  }

  public removeMessage(id: string) {
    this.messages = this.messages.filter((message) => {
      return message.id !== id;
    });

    if (this.timersMap[id]) {
      clearTimeout(this.timersMap[id]);

      delete this.timersMap[id];
    }
  }

  // ACTIONS ---------------------------------------------------------------------------------------
}

export default NotificationStore;
