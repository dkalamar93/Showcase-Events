import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';

import customCursor from '../assets/customCursor.svg';
import { authenticate } from '../api/user';
import { UserContext } from '../App';
import { SCREEN } from '../constants';
import { COLOR } from '../constants/colors';

const Form = styled.form`
  height: 100%;
  width: 80%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  @media (min-width: ${SCREEN.LAPTOP}) {
    align-items: flex-start;
    width: 480px;
  }
`;

const Input = styled.input<{ error: boolean }>`
  border: none;
  border-bottom: 1px solid
    ${({ error }) => (error ? COLOR.SASQUATCH_SOCKS : COLOR.CRYSTAL_BAY)};
  padding: 5px 10px;
  margin: 10px 0px 10px 0px;
  width: 100%;
  outline: none;
  background-color: transparent;

  ::placeholder {
    color: ${COLOR.CALLISTO};
    opacity: 1;
    font-size: 18px;
  }
`;

const PasswordWrapper = styled.div`
  position: relative;
  display: flex;
  margin-bottom: 14px;
  width: 100%;
`;

const ShowPassword = styled.span`
  color: ${COLOR.CRYSTAL_BAY};
  position: absolute;
  top: 1rem;
  right: 0;
  :hover {
    color: ${COLOR.BLACK};
    cursor: pointer;
  }
`;

const LoginHeader = styled.h1<{ main: boolean }>`
  font-size: ${(props) => (props.main ? '28px' : '18px')};
  color: ${(props) => (props.main ? COLOR.BIG_STONE : COLOR.FRILLED_SHARK)};
  margin: 10px 10px 10px 0px;
  margin-bottom: ${(props) => (props.main ? '' : '2rem')};
`;

const ErrorCreds = styled.span`
  font-size: 18px
  margin: 10px 10px 10px 0px;
  margin-bottom: 2rem;
  color: ${COLOR.SASQUATCH_SOCKS};
`;

const LoginButton = styled.button`
  margin-top: 20px;
  background-color: ${COLOR.MAGICAL_MALACHITE};
  border-radius: 4px;
  width: 240px;
  height: 57px;
  font-size: 16px;
  color: ${COLOR.WHITE};
  text-align: center;
  letter-spacing: 1px;
  /* cursor: pointer; */

  cursor: url(${customCursor}), auto;
`;

export const LoginForm: React.FC<any> = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    // reset,
  } = useForm();
  const [passwordShown, setPasswordShown] = useState(false);
  const [wrongCreds, setWrongCreds] = useState(false);

  const togglePasswordVisiblity = () => {
    setPasswordShown(!passwordShown);
  };

  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const auth = await authenticate(data.email, data.password);

    if (auth?.status === 200) {
      setUser(auth.data);
      navigate('/', { replace: true });
    } else {
      setWrongCreds(true);
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <LoginHeader main>Sign in to Eventio</LoginHeader>
      {!wrongCreds ? (
        <LoginHeader main={false}>Enter your details below</LoginHeader>
      ) : (
        <ErrorCreds>
          Oops! That email and pasword combination is not valid.
        </ErrorCreds>
      )}
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
        error={!!errors.email || wrongCreds}
      />
      {errors.email && <span role="alert">{errors.email.message}</span>}
      <PasswordWrapper>
        <Input
          id="password"
          {...register('password', {
            required: 'required',
          })}
          type={passwordShown ? 'text' : 'password'}
          placeholder="Password"
          error={!!errors.password || wrongCreds}
        />
        <ShowPassword onClick={togglePasswordVisiblity}>
          <FontAwesomeIcon icon={faEye} />
        </ShowPassword>
      </PasswordWrapper>
      {errors.password && <span role="alert">{errors.password.message}</span>}
      <LoginButton type="submit">SIGN IN</LoginButton>
    </Form>
  );
};
