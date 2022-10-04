import React from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { observer } from 'mobx-react-lite';
import { Navigate } from 'react-router-dom';

import Input from '../Input';
import Button from '../Button';
import { sessionStore } from '../../stores';
import Validations from '../../constants/validations';
import Header from '../Header';
import ROUTES from '../../constants/routes';
import styles from './LoginForm.module.scss';
import InputError from '../InputError';

interface ILoginFormData {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginFormData>();

  const [errorSubmit, setErrorSubmit] = React.useState<Maybe<string>>(null);
  const [isNavigate, setIsNavigate] = React.useState<boolean>(false);

  const onSubmit: SubmitHandler<ILoginFormData> = React.useCallback(async (data) => {
    const error = await sessionStore.login(data.email, data.password);

    if (error) {
      setErrorSubmit(error);
    }
  }, []);

  if (isNavigate) {
    return <Navigate to={`/${ROUTES.public}/${ROUTES.register}`} />;
  }

  const handlerRegisterUser = () => {
    setIsNavigate(true);
  };

  return (
    <>
      <Header />
      <div className={styles.container}>
        <h2>Login Form</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="email"
            control={control}
            rules={Validations.email}
            render={({ field }) => (
              <Input label="Your email" {...field} error={errors.email?.message} />
            )}
          />

          <Controller
            name="password"
            control={control}
            rules={Validations.password}
            render={({ field }) => (
              <Input
                label="Your password"
                type="password"
                {...field}
                error={errors.password?.message}
              />
            )}
          />

          <div className={styles.panel}>
            <Button type="submit">Login</Button>
            <button className={styles.btnRegister} type="button" onClick={handlerRegisterUser}>
              Register user
            </button>
          </div>

          {!!errorSubmit && <InputError>{errorSubmit}</InputError>}
        </form>
      </div>
    </>
  );
};

export default observer(LoginForm);
