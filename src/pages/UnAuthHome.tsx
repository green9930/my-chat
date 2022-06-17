import NavBar from '@containers/NavBar';
import SignIn from '@containers/SignIn';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function UnAuthHome() {
  const navigate = useNavigate();

  const handleSignUp = async () => {
    navigate('/signup');
  };

  return (
    <>
      <Helmet>
        <title>My Chat | Home</title>
      </Helmet>
      <NavBar />
      <UnAuthHomeContainer>
        <SignIn />
        <StyledSignUpBtn onClick={handleSignUp}>SIGN UP</StyledSignUpBtn>
      </UnAuthHomeContainer>
    </>
  );
}

const UnAuthHomeContainer = styled.div`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
`;

const StyledSignUpBtn = styled.button`
  border: transparent;
  font-size: 18px;
  color: ${(props) => props.theme.colors.red};
`;

UnAuthHomeContainer.displayName = 'UnAuthHomeContainer';
StyledSignUpBtn.displayName = 'StyledSignUpBtn';

export default UnAuthHome;
