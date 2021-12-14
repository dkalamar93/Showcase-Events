import { createContext } from 'react';
import { useState } from 'react';
import styled from 'styled-components';

import homeImage from '../assets/stormtroopers.jpg';
import customCursor from '../assets/customCursor.svg';
import EventioLogoLight from '../assets/logoLight.svg';
import { SCREEN } from '../constants';
import { COLOR } from '../constants/colors';

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: row;
`;

const Content = styled.main`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
  min-height: 100%;
  min-width: 100%;
  background-color: ${COLOR.WHITE};
`;

const Logo = styled.img`
  filter: brightness(0%);
  position: absolute;
  left: 2rem;
  top: 2rem;
  z-index: 1;

  @media (min-width: ${SCREEN.LAPTOP}) {
    filter: none;
  }
`;

const LayoutImage = styled.div`
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;

  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(
      rgba(14, 46, 88, 0.75),
      rgba(14, 46, 88, 0.75)
    ),
    url(${homeImage});
  filter: grayscale(100%);
  background-size: cover;
  align-self: center;
  object-fit: cover;
  mix-blend-mode: normal;
`;

const SignUp = styled.span`
  position: absolute;
  z-index: 1;
  font-size: 14px;
  color: grey;
  top: 2rem;
  right: 2rem;
`;

const SignUpButton = styled.span`
  font-size: 14px;
  cursor: url(${customCursor}), auto;
`;

const Quote = styled.span`
  width: 310px;
  height: 96px;
  font-family: PlayfairDisplay;
  font-size: 36px;
  line-height: 42px;
  text-align: center;
  color: ${COLOR.WHITE};
`;

const Line = styled.div`
  width: 12px;
  height: 2px;
  background-color: ${COLOR.AQUA_GREEN};

  margin: 15px;
`;

const Author = styled.span`
  font-family: Hind;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 24px;
  margin-bottom: 100px;
  color: ${COLOR.FRILLED_SHARK};
`;

const SideImageContainer = styled.div`
  display: none;
  @media (min-width: ${SCREEN.LAPTOP}) {
    display: block;
    position: relative;
    height: 100%;
    width: 40%;
  }
`;

const QuoteContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
`;

export const SignInContext = createContext<boolean>(true);

export const LayoutLogin: React.FC<{
  className?: string;
}> = ({ children, className }) => {
  const [signIn, setSignIn] = useState(true);

  return (
    <Container>
      <SignInContext.Provider value={signIn}>
        <Content className={className}>
          <Logo src={EventioLogoLight} alt="Eventio logo" />
          <SignUp>
            {signIn ? "Don't have account?" : 'Already have an account?'}
            <SignUpButton onClick={() => setSignIn(!signIn)}>
              {signIn ? ' SIGN UP' : ' SIGN IN'}
            </SignUpButton>
          </SignUp>
          <SideImageContainer>
            <LayoutImage />
            <QuoteContainer>
              <Quote>“Great, kid. Don’t get cocky.”</Quote>
              <Line />
              <Author>Han Solo</Author>
            </QuoteContainer>
          </SideImageContainer>
          {children}
        </Content>
      </SignInContext.Provider>
    </Container>
  );
};
