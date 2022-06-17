import { useEffect, useState } from 'react';
import Initialize from '@containers/Initialize';
import styled from 'styled-components';
import NavBar from '@containers/NavBar';
import { Helmet } from 'react-helmet-async';

function UserProfile({ currentUser }: any) {
  const [init, setInit] = useState<boolean>(false);
  const [userDisplayName, setUserDisplayName] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');

  useEffect(() => {
    const fetchUser = async () => {
      setUserDisplayName(currentUser.displayName);
      setUserEmail(currentUser.email);
      setInit(true);
    };

    fetchUser();
  }, []);

  return (
    <>
      <Helmet>
        <title>My Chat | {userDisplayName}'s Profile</title>
      </Helmet>
      <NavBar />
      {init ? (
        <ProfileContainer>
          <h2>{userDisplayName}'s Profile</h2>
          <ProfileInfoConatainer>
            <div>
              <span>ID(e-mail)</span>
              <span>{userEmail}</span>
            </div>
            <div>
              <span>name</span>
              <span>{userDisplayName}</span>
            </div>
          </ProfileInfoConatainer>
        </ProfileContainer>
      ) : (
        <Initialize />
      )}
    </>
  );
}

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h2 {
    margin-bottom: 40px;
  }
`;

const ProfileInfoConatainer = styled.div`
  div {
    display: grid;
    grid-template-columns: 1fr 2fr;
    margin-bottom: 20px;
  }
`;

ProfileContainer.displayName = 'ProfileContainer';
ProfileInfoConatainer.displayName = 'ProfileInfoConatainer';

export default UserProfile;
