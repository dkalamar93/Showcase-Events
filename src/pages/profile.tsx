import styled from 'styled-components';

import { COLOR } from '../constants/colors';

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  min-height: 100%;
  min-width: 100%;
  background-color: ${COLOR.WHITE};
`;

const Profile = () => <Container>This is your profile</Container>;
export default Profile;
