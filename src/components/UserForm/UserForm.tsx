import React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { v4 } from 'uuid';
import { Link, Navigate } from 'react-router-dom';

import Input from '../Input';
import { IUser, UserRole, userRoleOptions } from '../../constants/users';
import Button from '../Button';
import InputFile from '../InputFile';
import Validations from '../../constants/validations';
import getBase64FromBlob from '../../helpers/getBase64FromBlob';
import Header from '../Header';
import styles from './UserForm.module.scss';
import UsersStore from '../../stores/UsersStore';
import ROUTES from '../../constants/routes';
import { notificationStore } from '../../stores';
import { NotificationType } from '../../stores/NotificationStore';
import translations from '../../constants/translations';
import Select from '../Select/Select';

interface IUserFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: Maybe<IInputOption>;
  avatar: File[];
}

const UserForm: React.FC = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<IUserFormData>({
    defaultValues: {
      avatar: [],
    },
  });

  const [submitError, setSubmitError] = React.useState<Maybe<string>>(null);
  const [userCreated, setUserCreated] = React.useState<boolean>(false);

  const onSubmit: SubmitHandler<IUserFormData> = React.useCallback(
    async (data) => {
      const role = data.role || UserRole.User;

      const newUser: IUser = {
        id: v4(),
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        role: role as UserRole,
        password: data.password,
      };

      if (data.avatar[0]) {
        newUser.avatar = await getBase64FromBlob(data.avatar[0]);
      }

      const error = await UsersStore.createUser(newUser);

      if (error) {
        setSubmitError(error);
      } else {
        notificationStore.addMessage(
          v4(),
          NotificationType.Success,
          translations.ru.createUserSuccess(newUser.firstName, newUser.lastName),
        );
        setUserCreated(true);
      }

      reset();
    },
    [reset],
  );

  if (userCreated) {
    return <Navigate to={ROUTES.public} />;
  }

  return (
    <>
      <Header />

      <div className={styles.container}>
        <h2>Create user</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="firstName"
            control={control}
            rules={Validations.name}
            render={({ field }) => (
              <Input label="First name" {...field} error={errors.firstName?.message} />
            )}
          />

          <Controller
            name="lastName"
            control={control}
            rules={Validations.name}
            render={({ field }) => (
              <Input label="Last name" {...field} error={errors.lastName?.message} />
            )}
          />

          <Controller
            name="role"
            control={control}
            rules={Validations.role}
            render={({ field }) => (
              <Select label="Your Role" {...field} options={userRoleOptions} />
            )}
          />

          <Controller
            name="email"
            control={control}
            rules={{
              ...Validations.email,
              validate: Validations.uniqEmail(UsersStore.isEmailExist),
            }}
            render={({ field }) => <Input label="Email" {...field} error={errors.email?.message} />}
          />

          <Controller
            name="password"
            control={control}
            rules={Validations.password}
            render={({ field }) => (
              <Input label="Password" type="password" {...field} error={errors.password?.message} />
            )}
          />

          <Controller
            name="avatar"
            control={control}
            rules={Validations.avatar}
            render={({ field }) => (
              <InputFile label="Your avatar" {...field} error={errors.avatar?.message} />
            )}
          />

          <div className={styles.panel}>
            <Button type="submit">Create user</Button>
            <Link to={ROUTES.public}>Back to Login Form</Link>

            {!!submitError && <span className={styles.messageSuccess}>{submitError}</span>}
          </div>
        </form>
      </div>
    </>
  );
};

export default React.memo(UserForm);
