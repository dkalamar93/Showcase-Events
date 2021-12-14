import styled from 'styled-components';
import { useContext } from 'react';

import { LoginForm } from '../components/LoginForm';
import { SignUpForm } from '../components/SignUpForm';
import { SCREEN } from '../constants';
import { COLOR } from '../constants/colors';
import { SignInContext } from '../components/LayoutLogin';

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  width: 100%;
  background-color: ${COLOR.WHITE};

  @media (min-width: ${SCREEN.LAPTOP}) {
    width: 60%;
  }
`;

const FormContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: 40px 40px 40px 40px;
`;

const Login = () => {
  const signIn = useContext(SignInContext);

  return (
    <Container>
      <FormContainer>{signIn ? <LoginForm /> : <SignUpForm />}</FormContainer>
    </Container>
  );
};

export default Login;
