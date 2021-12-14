import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import { COLOR } from '../constants/colors';
import { SCREEN } from '../constants';

const Container = styled.div`
  width: 100%;
  height: 100%;
  margin: 15px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (min-width: ${SCREEN.LAPTOP}) {
    width: 60%;
    margin: 0px;
  }
`;

const ContentContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: 40px 40px 40px 40px;
`;

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  @media (min-width: ${SCREEN.LAPTOP}) {
    width: 522px;
  }
`;

const NotFoundTitle = styled.span`
  margin-bottom: 20px;
  font-size: 28px;
  line-height: 48px;
  color: ${COLOR.BIG_STONE};
`;

const NotFoundDescription = styled.span`
  margin-bottom: 40px;
  font-size: 18px;
  line-height: 24px;
  color: ${COLOR.FRILLED_SHARK};
`;

const RefreshButton = styled.button`
  width: 240px;
  height: 57px;
  background: #323c46;
  border-radius: 4px;
  font-size: 16px;
  line-height: 19px;
  text-align: center;
  letter-spacing: 1px;
  color: ${COLOR.WHITE};
`;

const NotFound = () => {
  const navigate = useNavigate();

  const sendToDashboard = () => {
    navigate('/');
  };

  return (
    <Container>
      <ContentContainer>
        <NotFoundContainer>
          <NotFoundTitle>404 Error - page not found</NotFoundTitle>
          <NotFoundDescription>
            Seems like Darth Vader just hits our website and drops it down.
            Please press the refresh button and everything should be fine again.
          </NotFoundDescription>
          <RefreshButton onClick={() => sendToDashboard()}>
            REFRESH
          </RefreshButton>
        </NotFoundContainer>
      </ContentContainer>
    </Container>
  );
};

export default NotFound;
