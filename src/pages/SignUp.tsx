import React, { useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { authService, dbService } from '../myFirebase';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEye,
  faEyeSlash,
  faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import NavBar from '@containers/NavBar';
import GoToHomeBtn from '@components/GoToHomeBtn';
import { Helmet } from 'react-helmet-async';

function SignUp() {
  /* 입력값 ---------------------------------------------------------------------- */
  const [userEmail, setUserEmail] = useState<string>('');
  const [userPassword, setUserPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [userDisplayName, setUserDisplayName] = useState<string>('');
  /* 유효성 boolean -------------------------------------------------------------- */
  const [isEmailAvailable, setIsEmailAvailable] = useState<boolean>(false);
  const [isPasswordAvailable, setIsPasswordAvailable] =
    useState<boolean>(false);
  const [isPasswordConfirmed, setIsPasswordConfirmed] =
    useState<boolean>(false);
  const [isDisplayNameAvailable, setIsDisplayNameAvailable] =
    useState<boolean>(false);
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  /* 유효성 검사 메시지 --------------------------------------------------------------- */
  const [emailMessage, setEmailMessage] = useState<string>(
    '아이디는 이메일 형식으로 입력해야 합니다🥺'
  );
  const [passwordMessage, setPasswordMessage] = useState<string>(
    '비밀번호는 8~12자, 영문/숫자/특수문자가 모두 1개 이상 포함되어야 합니다🥺'
  );
  const [displayNameMessage, setDisplayNameMessage] = useState<string>(
    '닉네임을 입력해주세요🥺(두글자 이상)'
  );
  const [confirmPasswordMessage, setConfirmPasswordMessage] =
    useState<string>('');
  const [signUpMessage, setSignUpMessage] = useState<string>('');
  /* 비밀번호 노출 ------------------------------------------------------------------ */
  const [passwordType, setPasswordType] = useState<string>('password');

  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      createUserWithEmailAndPassword(authService, userEmail, userPassword)
        .then((userCredential) => {
          // DISPLAYNAME UPDATE
          const user = userCredential.user;
          updateProfile(user, {
            displayName: userDisplayName,
          });
          isEmailAvailable &&
            isPasswordAvailable &&
            isPasswordConfirmed &&
            isDisplayNameAvailable &&
            setSignUpMessage('회원가입 성공!🥰');
          setIsSignUp(true);
        })
        .catch((err: any) => {
          console.error('회원가입 중 에러 발생 : ', err.code, err.message);
          setSignUpMessage('입력 폼을 다시 확인해주세요.');
          switch (err.code) {
            case 'auth/email-already-in-use':
              return setEmailMessage('이미 사용중인 이메일입니다.');
            case 'auth/invalid-email':
              return setEmailMessage('유효하지 않은 이메일입니다.');
          }
        });
    } catch (err) {
      console.error(err);
    }
  };

  /* 이메일 유효성 검사 --------------------------------------------------------------- */
  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const emailRegExp =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/i;
    const givenEmail = e.target.value;

    if (emailRegExp.test(givenEmail)) {
      setEmailMessage('올바른 형식입니다😊');
      setUserEmail(givenEmail);
      setIsEmailAvailable(true);
    } else {
      setEmailMessage('아이디는 이메일 형식으로 입력해야 합니다🥺');
      setIsEmailAvailable(false);
    }
  };

  /* 비밀번호 유효성 검사 -------------------------------------------------------------- */
  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const passwordRegExp =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,12}$/;
    const givenPassword = e.target.value;

    if (passwordRegExp.test(givenPassword)) {
      setPasswordMessage('안전한 비밀번호 입니다😊');
      setUserPassword(givenPassword);
      setIsPasswordAvailable(true);
    } else {
      setPasswordMessage(
        '비밀번호는 8~12자, 영문/숫자/특수문자가 모두 1개 이상 포함되어야 합니다🥺'
      );
      setIsPasswordAvailable(false);
    }
  };

  /* 비밀번호 확인 유효성 검사 ----------------------------------------------------------- */
  const handleConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const givenConfirmPassword = e.target.value;

    if (userPassword === givenConfirmPassword) {
      setConfirmPasswordMessage('비밀번호가 일치합니다😊');
      setConfirmPassword(givenConfirmPassword);
      setIsPasswordConfirmed(true);
    } else {
      setConfirmPasswordMessage('비밀번호가 일치하지 않습니다🥺');
      setIsPasswordConfirmed(false);
    }
  };

  /* 닉네임 유효성 검사 --------------------------------------------------------------- */
  const handleChangeDisplayName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const givenDisplayName = e.target.value;

    if (givenDisplayName.length < e.target.minLength) {
      setDisplayNameMessage('닉네임을 입력해주세요🥺(두글자 이상)');
    } else if (givenDisplayName.length === e.target.maxLength) {
      setDisplayNameMessage('닉네임은 최대 6글자까지 가능해요');
    } else {
      setUserDisplayName(givenDisplayName);
      setDisplayNameMessage('닉네임이 설정되었습니다😊');
      setIsDisplayNameAvailable(true);
    }
  };

  /* 홈으로 이동 ------------------------------------------------------------------- */
  const handleGoToHome = async () => {
    await signOut(authService);
    navigate('/my-chat');
  };

  /* 비밀번호 보기 ------------------------------------------------------------------ */
  const IsPasswordVisible = () => {
    passwordType === 'password'
      ? setPasswordType('text')
      : setPasswordType('password');
  };

  return (
    <>
      <Helmet>
        <title>My Chat | Sign Up</title>
      </Helmet>
      <NavBar />
      <SignUpContainer>
        <h2>MY CHAT | SIGN UP</h2>
        {isSignUp ? (
          <GreetingContainer>
            <h3>Hello, {userDisplayName}🥰</h3>
            <div>
              <StyledBtn onClick={handleGoToHome}>
                Go To Home <FontAwesomeIcon icon={faRightFromBracket} />
              </StyledBtn>
            </div>
          </GreetingContainer>
        ) : (
          <StyledFormContainer>
            <StyledForm onSubmit={onSubmit}>
              <InputContainer>
                <InputWrapper>
                  <input
                    type="email"
                    placeholder="ID(e-mail)"
                    id="signup-email"
                    required
                    onChange={handleChangeEmail}
                  />
                  <div>
                    <span>{emailMessage}</span>
                  </div>
                </InputWrapper>
                <InputWrapper>
                  <input
                    type={passwordType}
                    placeholder="Password"
                    id="signup-password"
                    required
                    onChange={handleChangePassword}
                  />
                  <button onClick={IsPasswordVisible}>
                    {passwordType === 'password' ? (
                      <FontAwesomeIcon icon={faEye} />
                    ) : (
                      <FontAwesomeIcon icon={faEyeSlash} />
                    )}
                  </button>
                  <div>
                    <span>{passwordMessage}</span>
                  </div>
                </InputWrapper>
                <InputWrapper>
                  <input
                    type="password"
                    placeholder="Confirm your password"
                    id="signup-password-confirm"
                    required
                    onChange={handleConfirmPassword}
                  />
                  <div>
                    <span>{confirmPasswordMessage}</span>
                  </div>
                </InputWrapper>
                <InputWrapper>
                  <input
                    type="text"
                    placeholder="User name"
                    id="signup-username"
                    required
                    onChange={handleChangeDisplayName}
                    minLength={2}
                    maxLength={6}
                  />
                  <div>
                    <span>{displayNameMessage}</span>
                  </div>
                </InputWrapper>
              </InputContainer>
              <button type="submit">회원가입</button>
            </StyledForm>
            <StyledBtn onClick={handleGoToHome}>
              Go To Home <FontAwesomeIcon icon={faRightFromBracket} />
            </StyledBtn>
            <span className="sign-up-warning">{signUpMessage}</span>
          </StyledFormContainer>
        )}
      </SignUpContainer>
    </>
  );
}

const SignUpContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  align-items: center;
  justify-content: center;
`;

const GreetingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  div {
    display: flex;
    flex-direction: column;
    margin-top: 40px;

    span {
      margin-bottom: 40px;
    }

    a {
      margin-left: auto;
      margin-right: auto;

      :hover,
      :focus {
        color: ${(props) => props.theme.colors.purple};
        outline: none;
      }
    }
  }
`;

const StyledFormContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;

  .sign-up-warning {
    margin: 10px auto;
    font-weight: 600;
    color: ${(props) => props.theme.colors.purple};
  }
`;

const StyledForm = styled.form`
  display: flex;
  width: 100%;
  flex-direction: column;

  button {
    margin: 20px auto;
  }
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const InputWrapper = styled.div`
  margin-bottom: 20px;

  div {
    height: 15px;

    span {
      font-size: 12px;
      color: ${(props) => props.theme.colors.purple};
    }
  }

  input {
    padding-right: 20px;
  }

  button {
    margin: 0;
  }
`;

const StyledBtn = styled.button`
  width: 100%;
  margin-left: auto;
  margin-right: auto;
`;

SignUpContainer.displayName = 'SignUpContainer';
GreetingContainer.displayName = 'GreetingContainer';
StyledFormContainer.displayName = 'StyledFormContainer';
StyledForm.displayName = 'StyledForm';
InputContainer.displayName = 'InputContainer';
InputWrapper.displayName = 'InputWrapper';
StyledBtn.displayName = 'StyledBtn';

export default SignUp;
