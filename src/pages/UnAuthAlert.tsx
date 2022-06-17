import GoToHomeBtn from '@components/GoToHomeBtn';
import NavBar from '@containers/NavBar';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';

function UnAuthAlert() {
  return (
    <UnAuthAlertContainer>
      <Helmet>
        <title>My Chat | Alert</title>
      </Helmet>
      <NavBar />
      <h2>Oops! You need to Sign In First!!</h2>
      <GoToHomeBtn />
    </UnAuthAlertContainer>
  );
}

const UnAuthAlertContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content;
`;

UnAuthAlertContainer.displayName = 'UnAuthAlertContainer';

export default UnAuthAlert;
