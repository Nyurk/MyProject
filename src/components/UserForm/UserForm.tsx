import React from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { v4 } from 'uuid';
import { observer } from 'mobx-react-lite';

import Input from '../Input';
import Select from '../Select';
import { IUser, UserRole, userRoleOptions } from '../../constants/users';
import Button from '../Button';
import FieldValidation from '../../constants/validations';
import { usersStore } from '../../stores';

interface IUserFormData {
  firstName: string;
  lastName: string;
  role: IInputOption;
  email: string;
  password: string;
  avatar: string;
}

const UserForm: React.FC = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<IUserFormData>({
    defaultValues: {
      role: userRoleOptions[2],
    },
  });

  const { message } = usersStore;

  const onSubmit: SubmitHandler<IUserFormData> = React.useCallback(
    async (data) => {
      const newUser: IUser = {
        id: v4(),
        role: data.role.value as UserRole,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        avatar: data.avatar || undefined,
        password: data.password,
      };

      await usersStore.createUser(newUser);

      reset();
    },
    [reset],
  );

  return (
    <>
      <h2>Create user</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="firstName"
          control={control}
          rules={FieldValidation.name}
          render={({ field }) => (
            <Input label="First name" {...field} error={errors.firstName?.message} />
          )}
        />

        <Controller
          name="lastName"
          control={control}
          rules={FieldValidation.name}
          render={({ field }) => (
            <Input label="Last name" {...field} error={errors.lastName?.message} />
          )}
        />

        <Controller
          name="role"
          control={control}
          rules={FieldValidation.role}
          render={({ field }) => (
            <Select
              label="Role"
              {...field}
              options={userRoleOptions}
              error={errors.role?.message}
            />
          )}
        />

        <Controller
          name="email"
          control={control}
          rules={FieldValidation.email}
          render={({ field }) => <Input label="Email" {...field} error={errors.email?.message} />}
        />

        <Controller
          name="password"
          control={control}
          rules={FieldValidation.password}
          render={({ field }) => (
            <Input label="Password" {...field} error={errors.password?.message} />
          )}
        />

        <Controller
          name="avatar"
          control={control}
          render={({ field }) => (
            <Input label="Your avatar" {...field} error={errors.avatar?.message} />
          )}
        />

        <Button type="submit">Create user</Button>

        {!!message && <span>{message}</span>}
      </form>
    </>
  );
};

export default observer(UserForm);
