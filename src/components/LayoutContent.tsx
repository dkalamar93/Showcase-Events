import { useContext, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import { UserContext } from '../App';
import EventioLogoDark from '../assets/logoDark.svg';
import DownArrowLight from '../assets/downArrowLight.svg';
import { useUserAuth } from '../hooks/useAuthorization';
import { SCREEN } from '../constants';
import { COLOR } from '../constants/colors';

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 1rem 2rem;
  background-color: ${COLOR.BLEACHED_SILK};
  a {
    font-size: 1.5rem;
    font-weight: 700;
  }
`;

const Content = styled.main`
  display: flex;
  flex: 1 0 auto;
  padding: 0rem;
  background-color: ${COLOR.BLEACHED_SILK};
  flex-direction: column;

  @media (min-width: ${SCREEN.LAPTOP}) {
    min-height: 95%;
  }
`;

const Account = styled.span`
  position: relative;
  display: flex;
  align-items: center;
  align-self: flex-end;
`;

const Dot = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  width: 40px;
  background-color: ${COLOR.BIG_FISH_TO_FRY};
  border-radius: 50%;
  margin-right: 10px;
  align-self: flex-end;
`;

const DropdownArrow = styled.img`
  margin-left: 10px;
`;

const Dropdown = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  position: absolute;
  width: 162px;
  height: 88px;
  background: ${COLOR.WHITE};
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.198087);
  border-radius: 14px;
  top: 50px;
  right: 0px;

  padding: 15px;
  font-size: 14px;
  line-height: 24px;
  color: ${COLOR.SERYI_GREY};
  cursor: pointer;
`;

const FullName = styled.span`
  display: none;

  @media (min-width: ${SCREEN.LAPTOP}) {
    display: inline;
  }
`;

export const LayoutContent: React.FC<{
  className?: string;
}> = ({ children, className }) => {
  const [dropdown, setDropdown] = useState(false);
  const { handleLogout } = useUserAuth();
  const navigate = useNavigate();

  const { user } = useContext(UserContext);

  const toggleDropdown = () => {
    setDropdown(!dropdown);
  };

  const goToProfile = () => {
    navigate('/profile', { replace: true });
  };

  return (
    <Container>
      <Header>
        <img src={EventioLogoDark} alt="Eventio logo" />
        <Account onClick={() => toggleDropdown()}>
          <Dot>
            {user.firstName[0]}
            {user.lastName[0]}
          </Dot>
          <FullName>
            {user.firstName} {user.lastName}
          </FullName>
          <DropdownArrow src={DownArrowLight} alt="Dropdown arrow" />
          {dropdown && (
            <Dropdown>
              <span onClick={goToProfile}>Profile</span>
              <span onClick={handleLogout}>Logout</span>
            </Dropdown>
          )}
        </Account>
      </Header>
      <Content className={className}>{children}</Content>
    </Container>
  );
};
