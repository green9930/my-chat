import { useEffect } from 'react';
import AppRouter from '@router/AppRouter';
import { authService, dbService } from './myFirebase';
import { doc, setDoc } from 'firebase/firestore';

function App() {
  useEffect(() => {
    const fetchUser = async () => {
      authService.onAuthStateChanged(async (user: any) => {
        const { displayName, email, uid, metadata } = user;
        const userData = {
          displayName: displayName,
          email: email,
          uid: uid,
          timestamp: metadata.createdAt,
        };
        await setDoc(doc(dbService, 'users', user.uid), userData);
      });
    };
    setTimeout(() => {
      fetchUser();
    }, 200);
  }, []);

  return <AppRouter />;
}

export default App;
