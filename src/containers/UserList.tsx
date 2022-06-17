import { authService, dbService } from '../myFirebase';
import { useState, useEffect } from 'react';
import Initialize from '@containers/Initialize';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function UserList() {
  const [init, setInit] = useState<boolean>(false);
  const [userList, setUserList] = useState<any[]>([]);
  const [userName, setUserName] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');
  const [userTimestamp, setUserTimestamp] = useState<string>('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        authService.onAuthStateChanged((user: any) => {
          const { displayName, email, metadata } = user;
          setUserName(displayName);
          setUserEmail(email);
          setUserTimestamp(metadata.createdAt);
        });

        const q = query(
          collection(dbService, 'users'),
          orderBy('displayName', 'desc')
        );

        onSnapshot(q, (snapshot) => {
          const userArr = snapshot.docs
            .map((doc) => {
              return {
                id: doc.id,
                ...doc.data(),
              };
            })
            .reverse();
          setUserList(userArr);
          setInit(true);
        });
      } catch (err) {
        console.error(err);
      }
    };

    fetchUsers();
  }, []);

  const handleGoToChat = (e: React.MouseEvent<HTMLButtonElement>) => {
    const targetTimestamp = (e.target as HTMLButtonElement).name;
    // 채팅방 ID 생성
    const chatId = Number(userTimestamp) + Number(targetTimestamp);
    // 대화 상대 이름
    const contactUser = (e.currentTarget.parentNode?.firstChild as HTMLElement)
      .innerText;

    navigate('/chatroom', { state: { chatId, contactUser } });
  };

  return (
    <>
      {init ? (
        <UserListContainer>
          <ContactListTitle>
            <span>{userName ? userName : ''}</span>
            's Contact List
          </ContactListTitle>
          <StyledList>
            {userList
              .filter((data) => data.email !== userEmail)
              .map((data) => {
                const { displayName, timestamp } = data;
                return (
                  <li key={`${displayName}`}>
                    <span>{displayName}</span>
                    <button name={timestamp} onClick={handleGoToChat}>
                      대화하기
                    </button>
                  </li>
                );
              })}
          </StyledList>
        </UserListContainer>
      ) : (
        <Initialize />
      )}
    </>
  );
}

const UserListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ContactListTitle = styled.h2`
  margin: 20px 40px 40px 40px;
  span {
    font-size: 24px;
  }
`;

const StyledList = styled.ul`
  width: 80%;

  li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;

    span {
      font-size: 18px;
    }

    button {
      color: ${(props) => props.theme.colors.red};
    }
  }
`;

UserListContainer.displayName = 'UserListContainer';
ContactListTitle.displayName = 'ContactListTitle';
StyledList.displayName = 'StyledList';

export default UserList;
