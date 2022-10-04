const Translations = {
  ru: {
    unknownError: 'Неизвестная ошибка',
    requiredField: 'Это поле обязательное',
    nameIsToLong: 'Имя слишком длинное',

    updateUserError: 'Не удалось обновить пользователяю. Произошла ошибка!',
    loginError: 'Неправильно введен логин или пароль',
    browseFile: 'Загрузить файл',
    emailNotUniq: 'Пользователь с таким email уже существует',
    badImageType: (name: string, type: string) => {
      return `Файл ${name} имеет не верный формат (${type})`;
    },
    badImageSize: (name: string, size: string, maxSize) => {
      return `Файл ${name} имеет большой размер (${size}). Максимальный размер ${maxSize} `;
    },
    createUserSuccess: (firstName: string, lastName: string) => {
      return `Пользователь ${firstName} ${lastName} успешно создан`;
    },
  },
};

export default Translations;
