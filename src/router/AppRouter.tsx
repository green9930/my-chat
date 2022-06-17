import AuthHome from '@pages/AuthHome';
import ChatRoom from '@pages/ChatRoom';
import SignUp from '@pages/SignUp';
import UserProfile from '@pages/UserProfile';
import { Route, Routes } from 'react-router-dom';
import ErrorPage from '@pages/ErrorPage';
import UnAuthAlert from '@pages/UnAuthAlert';
import { useEffect, useState } from 'react';
import { authService } from '../myFirebase';
import Initialize from '@containers/Initialize';
import UnAuthHome from '@pages/UnAuthHome';

function AppRouter() {
  const [init, setInit] = useState<boolean>(false);
  const [isSignIn, setIsSignIn] = useState<boolean>(false);
  const [CurrentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      authService.onAuthStateChanged((user: any) => {
        user ? setIsSignIn(true) : setIsSignIn(false);
        setCurrentUser(user);
      });
    };
    fetchUser();
    setTimeout(() => {
      setInit(true);
    }, 500);
  }, []);

  const loadingHome = () => {
    if (!init) {
      return <Initialize />;
    } else {
      return isSignIn ? <AuthHome /> : <UnAuthHome />;
    }
  };

  const loadingProfile = () => {
    if (!init) {
      return <Initialize />;
    } else {
      return isSignIn ? (
        <UserProfile currentUser={CurrentUser} />
      ) : (
        <UnAuthAlert />
      );
    }
  };

  return (
    <Routes>
      <Route path="/signup" element={<SignUp />} />
      <Route path={'/'} element={loadingHome()} />
      <Route path={'/my-chat'} element={loadingHome()} />
      <Route path={'/userprofile'} element={loadingProfile()} />
      <Route path="/unauthalert" element={<UnAuthAlert />} />
      <Route
        path="/chatroom"
        element={isSignIn ? <ChatRoom /> : <UnAuthAlert />}
      />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default AppRouter;
