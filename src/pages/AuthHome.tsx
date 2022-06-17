import NavBar from '@containers/NavBar';
import UserList from '@containers/UserList';
import { Helmet } from 'react-helmet-async';

function AuthHome() {
  return (
    <>
      <Helmet>
        <title>My Chat | Home</title>
      </Helmet>
      <NavBar />
      <UserList />
    </>
  );
}

export default AuthHome;
