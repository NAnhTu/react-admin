import { useEffect } from 'react';
import './App.css';
import { useAppSelector } from './store/hooks';
import { RootState } from './store';
import { Layout } from 'antd';
import Sidebar from './components/Sidebar';
import AuthRouter from './router/AuthRouter';
function App() {
  const { isLoggedIn } = useAppSelector((state: RootState) => state.auth);
  useEffect(() => {
    console.log('isLoggedIn : ', isLoggedIn);
  }, [isLoggedIn]);
  if (isLoggedIn) {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sidebar />
        <Layout></Layout>
      </Layout>
    );
  } else {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <AuthRouter />
      </Layout>
    );
  }
}

export default App;
