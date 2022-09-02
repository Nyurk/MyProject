import Translations from './translations';

const FieldValidation = {
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
};

export default FieldValidation;
