import {
  useState,
  useEffect,
  useRef,
  JSXElementConstructor,
  ReactElement,
} from 'react';
import {
  collection,
  query,
  onSnapshot,
  orderBy,
  addDoc,
} from 'firebase/firestore';
import { authService, dbService } from '../myFirebase';
import Initialize from '@containers/Initialize';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPaperPlane,
  faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import { Helmet } from 'react-helmet-async';

function ChatRoom() {
  const [chatroomId, setChatroomId] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [contactUser, setContactUser] = useState<string>('');
  const [newMessage, setNewMessage] = useState<string>('');
  const [messages, setMessages] = useState<any>([]);
  const [userUid, setUserUid] = useState<string>('');
  const [init, setInit] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();
  const { state }: any = useLocation();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        authService.onAuthStateChanged((user: any) => {
          setUserName(user.displayName);
          setUserUid(user.uid);
        });
        setChatroomId(state.chatId);
        setContactUser(state.contactUser);

        const q = query(
          collection(dbService, `chats-${state.chatId}`),
          orderBy('timestamp', 'desc')
        );

        onSnapshot(q, (snapshot) => {
          const messageArr: any = snapshot.docs
            .map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
            .reverse();
          setMessages(messageArr);
        });

        scrollToBottom();
      } catch (err) {
        console.error(err);
      }
    };

    setTimeout(() => {
      fetchUsers();
      setInit(true);
    }, 200);
  }, []);

  const handleExit = () => {
    navigate('/');
  };

  const onSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const timestamp = Date.now();
    const writeMessage = {
      username: userName,
      message: newMessage,
      timestamp: Date.now(),
      uid: userUid,
    };

    try {
      await addDoc(collection(dbService, `chats-${chatroomId}`), writeMessage);
      setTimeout(() => {
        setMessages([
          ...messages,
          { username: userName, message: newMessage, timestamp: timestamp },
        ]);
      }, 1000);
    } catch (err) {
      console.error(err);
    }

    setNewMessage('');
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const message = e.target.value;
    setNewMessage(message);
  };

  const scrollToBottom = () => {
    if (inputRef.current) {
      inputRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <>
      {init ? (
        <ChatRoomContainer>
          <Helmet>
            <title>My Chat | {contactUser}</title>
          </Helmet>
          <ChatHeadContainer>
            <h2>{contactUser}</h2>
            <button onClick={handleExit}>
              <span>Home</span>
              <FontAwesomeIcon icon={faRightFromBracket} />
            </button>
          </ChatHeadContainer>
          <ChatContainer>
            <StyledUl>
              <GreetingLi>
                <p>{'만나서 반가워요 :)'}</p>
              </GreetingLi>
              {messages.map(
                (data: {
                  timestamp: string | number;
                  username:
                    | string
                    | ReactElement<any, string | JSXElementConstructor<any>>;
                  message:
                    | string
                    | ReactElement<any, string | JSXElementConstructor<any>>;
                }) => {
                  const time = new Date(data.timestamp);
                  const month = time.getMonth() + 1;
                  const date = time.getDate();
                  const hour = time.getHours();
                  const minute = time.getMinutes();
                  const messageTimestamp = `${month}/${date} ${hour}시 ${minute}분`;
                  return (
                    <MessageLi
                      className={
                        data.username === userName ? 'my-chat' : 'contact-chat'
                      }
                      key={`${data.timestamp}-${data.username}`}
                    >
                      <span
                        className={
                          data.username === userName
                            ? 'my-name'
                            : 'contact-name'
                        }
                      >
                        {data.username}
                      </span>
                      <StyledMessage
                        className={
                          data.username === userName
                            ? 'my-message'
                            : 'contact-message'
                        }
                      >
                        {data.message}
                      </StyledMessage>
                      <StyledTimestamp>{messageTimestamp}</StyledTimestamp>
                    </MessageLi>
                  );
                }
              )}
            </StyledUl>
          </ChatContainer>
          <StyledMessageForm onSubmit={onSubmit}>
            <input
              ref={inputRef}
              type="text"
              onChange={handleOnChange}
              value={newMessage}
              placeholder="메세지를 입력하세요:)"
            />
            <button type="submit" disabled={!newMessage}>
              <FontAwesomeIcon icon={faPaperPlane} />
            </button>
          </StyledMessageForm>
        </ChatRoomContainer>
      ) : (
        <Initialize />
      )}
    </>
  );
}

const ChatRoomContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
  width: 100%;
`;

const ChatHeadContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: left;
  position: fixed;
  top: 0;
  padding: 0 20px;
  margin: 0 auto;
  width: 100%;

  background: ${(props) => props.theme.colors.backgroundWhite};

  h2 {
    color: ${(props) => props.theme.colors.purple};
  }

  button {
    margin-left: 30px;
    span {
      margin-right: 5px;
    }
  }
`;

const ChatContainer = styled.div`
  margin: 70px 30px;
  min-height: 80vh;
`;

const StyledUl = styled.ul`
  display: flex;
  flex-direction: column;

  .my-chat {
    text-align: right;
    margin-left: auto;
  }

  .contact-chat {
    text-align: left;
    margin-right: auto;
  }
`;

const GreetingLi = styled.li`
  text-align: center;
  align-items: center;

  p {
    width: 100%;
    margin: 20px 0;
    font-weight: 600;
    color: ${(props) => props.theme.colors.purple};
  }
`;

const MessageLi = styled.li`
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  max-width: 50%;

  .my-message {
    background: ${(props) => props.theme.colors.messageOrange};
    color: ${(props) => props.theme.colors.white};
  }

  .contact-message {
    background: ${(props) => props.theme.colors.messageGray};
    color: ${(props) => props.theme.colors.black};
  }

  .my-name {
    display: none;
  }

  .contact-name {
    margin-right: auto;
    font-weight: 600;
  }
`;

const StyledMessage = styled.span`
  border-radius: 5px;
  margin: 3px 0;
  padding: 10px;
`;

const StyledTimestamp = styled.span`
  font-size: 12px;
  font-weight: 300;
  color: ${(props) => props.theme.colors.gray};
`;

const StyledMessageForm = styled.form`
  margin: 20px 30px 30px 30px;
  display: flex;
  position: absolute;
  bottom: 0;
  left: 5%;
  width: 80%;

  input {
    flex-grow: 1;
  }

  button {
    margin-left: 10px;
    padding: 5px 10px;
    background: transparent;
  }
`;

ChatRoomContainer.displayName = 'ChatRoomContainer';
ChatHeadContainer.displayName = 'ChatHeadContainer';
ChatContainer.displayName = 'ChatContainer';
StyledUl.displayName = 'StyledUl';
GreetingLi.displayName = 'GreetingLi';
MessageLi.displayName = 'MessageLi';
StyledMessage.displayName = 'StyledMessage';
StyledTimestamp.displayName = 'StyledTimestamp';
StyledMessageForm.displayName = 'StyledMessageForm';

export default ChatRoom;
