import { Link, useNavigate } from 'react-router-dom';
import SignOutBtn from '@components/SignOutBtn';
import styled from 'styled-components';
import { authService } from '../myFirebase';
import { useEffect, useState } from 'react';
import { ShouldRedirectType } from 'types/type';

function NavBar() {
  const [shouldRedirect, setShouldRedirect] =
    useState<ShouldRedirectType['shouldRedirect']>(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        authService.onAuthStateChanged((user: any) => {
          user ? setShouldRedirect(false) : setShouldRedirect(true);
        });
      } catch (err) {
        console.error(err);
      }
    };

    fetchUsers();
  }, []);

  const handleGoToHome = async () => {
    navigate('/my-chat');
  };

  const handleGoToProfile = async () => {
    shouldRedirect ? navigate('/unauthalert') : navigate('/userprofile');
  };

  return (
    <StyledNav>
      <StyledOl>
        <li>
          <h1 onClick={handleGoToHome}>My Chat</h1>
        </li>
        {!shouldRedirect && (
          <AuthLiContainer>
            <li>
              <button onClick={handleGoToProfile}>My Profile</button>
            </li>
            <SignOutBtn shouldRedirect={shouldRedirect} />
          </AuthLiContainer>
        )}
      </StyledOl>
    </StyledNav>
  );
}

const StyledNav = styled.nav`
  display: flex;
  width: 90%;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;

  button {
    margin-right: 20px;
    color: ${(props) => props.theme.colors.purple};
  }
`;

const StyledOl = styled.ol`
  display: flex;
  flex-grow: 1;
  padding-right: 20px;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;

  li {
    margin-left: 20px;
    font-weight: 600;
    color: ${(props) => props.theme.colors.blue};
    cursor: pointer;
  }
`;

const AuthLiContainer = styled.div`
  display: flex;
`;

StyledNav.displayName = 'StyledNav';
StyledOl.displayName = 'StyledOl';
AuthLiContainer.displayName = 'AuthLiContainer';

export default NavBar;
