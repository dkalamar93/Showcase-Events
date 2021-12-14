import styled from 'styled-components';
import { useForm } from 'react-hook-form';

import customCursor from '../assets/customCursor.svg';
import { COLOR } from '../constants/colors';
import { SCREEN } from '../constants';

const Form = styled.form`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  @media (min-width: ${SCREEN.LAPTOP}) {
    width: 480px;
  }
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid #dae1e7;
  padding: 5px 10px;
  margin: 10px 0px 10px 0px;
  width: 100%;
  outline: none;
  background-color: transparent;
  align-self: flex-start;

  ::placeholder {
    color: ${COLOR.CALLISTO};
    opacity: 1;
    font-size: 18px;
  }
`;

const LoginHeader = styled.h1<{ main: boolean }>`
  font-size: ${(props) => (props.main ? '28px' : '18px')};
  color: ${(props) => (props.main ? '#323C46' : '#949EA8')};
  margin: 10px 10px 10px 0px;
  margin-bottom: ${(props) => (props.main ? '' : '2rem')};
  align-self: flex-start;
`;

const LoginButton = styled.button`
  align-self: flex-start;
  margin-top: 20px;
  background-color: ${COLOR.MAGICAL_MALACHITE};
  border-radius: 4px;
  width: 240px;
  height: 57px;
  font-size: 16px;
  color: ${COLOR.WHITE};
  text-align: center;
  letter-spacing: 1px;
  cursor: url(${customCursor}), auto;
`;

export const SignUpForm: React.FC<any> = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => data;

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <LoginHeader main>Get started absolutely free.</LoginHeader>
      <LoginHeader main={false}>Enter your details below</LoginHeader>
      <Input
        id="firstName"
        {...register('firstName', {
          required: 'required',
          pattern: {
            value: /\S/,
            message: 'Entered value does not match firstName format',
          },
        })}
        type="email"
        placeholder="First name"
      />
      {errors.email && <span role="alert">{errors.email.message}</span>}
      <Input
        id="lastName"
        {...register('lastName', {
          required: 'required',
          pattern: {
            value: /\S/,
            message: 'Entered value does not match lastName format',
          },
        })}
        type="email"
        placeholder="Last name"
      />
      {errors.email && <span role="alert">{errors.email.message}</span>}
      <Input
        id="email"
        {...register('email', {
          required: 'required',
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: 'Entered value does not match email format',
          },
        })}
        type="email"
        placeholder="Email"
      />
      {errors.email && <span role="alert">{errors.email.message}</span>}
      <Input
        id="password"
        {...register('password', {
          required: 'required',
          minLength: {
            value: 5,
            message: 'min length is 5',
          },
        })}
        type="password"
        placeholder="Password"
      />
      {errors.password && <span role="alert">{errors.password.message}</span>}
      <Input
        id="passwordRepeat"
        {...register('passwordRepeat', {
          required: 'required',
          minLength: {
            value: 5,
            message: 'min length is 5',
          },
        })}
        type="password"
        placeholder="Repeat Password"
      />
      {errors.password && <span role="alert">{errors.password.message}</span>}

      <LoginButton type="submit">SIGN UP</LoginButton>
    </Form>
  );
};
