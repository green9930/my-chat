import { signInWithEmailAndPassword } from 'firebase/auth';
import { authService } from '../myFirebase';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function SignIn() {
  const [userEmail, setUserEmail] = useState<string>('');
  const [userPassword, setUserPassword] = useState<string>('');
  const [signInErrorMessage, setSignInErrorMessage] = useState<string>('');

  const navigate = useNavigate();

  const handleSignIn = async () => {
    await signInWithEmailAndPassword(authService, userEmail, userPassword)
      .then(() => {
        navigate('/');
      })
      .catch((err) => {
        console.error(err);
        setSignInErrorMessage(
          '등록되지 않은 아이디이거나 아이디 또는 비밀번호를 잘못 입력했습니다.'
        );
      });
  };

  return (
    <SignInContainer>
      <SignInInputContainer>
        <input
          type="email"
          placeholder="email"
          id="terablu-email"
          onChange={(e) => setUserEmail(e.target.value)}
          value={userEmail}
        />
        <input
          type="password"
          placeholder="password"
          id="terablu-password"
          onChange={(e) => setUserPassword(e.target.value)}
          value={userPassword}
        />
        <StyledSignInBtn
          disabled={userEmail && userPassword ? false : true}
          onClick={handleSignIn}
        >
          SIGN IN
        </StyledSignInBtn>
      </SignInInputContainer>
      <ErrorMessageContainer>
        <span>{signInErrorMessage}</span>
      </ErrorMessageContainer>
    </SignInContainer>
  );
}

const SignInContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const SignInInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  input {
    background: transparent;
    margin-bottom: 15px;
    padding-right: 50px;
    padding-top: 10px;
    padding-bottom: 7px;
  }

  button {
    width: 100%;
    margin-top: 10px;
  }
`;

const ErrorMessageContainer = styled.div`
  margin: 10px 0;
  color: ${(props) => props.theme.colors.red};
`;

const StyledSignInBtn = styled.button`
  border: transparent;
  font-size: 18px;
  color: ${(props) => props.theme.colors.red};
`;

SignInContainer.displayName = 'SignInContainer';
SignInInputContainer.displayName = 'SignInInputContainer';
ErrorMessageContainer.displayName = 'ErrorMessageContainer';
StyledSignInBtn.displayName = 'StyledSignInBtn';

export default SignIn;
