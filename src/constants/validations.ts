import Translations from './translations';

export const SUPPORTED_AVATAR_FORMATS = ['image/png', 'image/jpeg', 'image/jpg'];
const MAX_AVATAR_FILE_SIZE = 1024 * 1024;

const Validations = {
  name: {
    required: Translations.ru.requiredField,
    maxLength: { value: 30, message: Translations.ru.nameIsToLong },
  },
  role: {
    required: 'Please select user role',
  },
  email: {
    required: Translations.ru.requiredField,
    pattern: {
      value: /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/,
      message: 'Enter valid email',
    },
  },
  password: {
    required: Translations.ru.requiredField,
    pattern: {
      value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/,
      message: 'The password must contain lowercase and uppercase latin letters, numbers',
    },
  },
  avatar: {
    validate: (files: File[]): true | string => {
      if (!files) return true;

      const errors: string[] = [];

      files.forEach((file) => {
        if (!SUPPORTED_AVATAR_FORMATS.includes(file.type)) {
          const error = Translations.ru.badImageType(file.name, file.type);

          errors.push(error);
        }

        if (file.size > MAX_AVATAR_FILE_SIZE) {
          const error = Translations.ru.badImageSize(file.name, file.type, MAX_AVATAR_FILE_SIZE);

          errors.push(error);
        }
      });

      if (!errors.length) return true;

      return errors.join(',');
    },
  },
  uniqEmail: (request: (value: string) => Promise<boolean>) => {
    return async (email: string): Promise<true | string> => {
      const isExist = await request(email);

      if (isExist) {
        return Translations.ru.emailNotUniq;
      }

      return true;
    };
  },
};

export default Validations;
