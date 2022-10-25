import './App.css';
import { Route, Routes } from 'react-router-dom';
import PublicRouter from './router/PublicRouter';
import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';
import ForgotPassword from './pages/auth/ForgotPassword';
import PrivateRouter from './router/PrivateRouter';
import { useAppDispatch } from './store/hooks';
import { useEffect } from 'react';
import { checkUser } from './store/reducers/userReducer';
function App(): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkUser());
  }, []);

  return (
    <Routes>
      <Route element={<PublicRouter />}>
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
      </Route>
      <Route element={<PrivateRouter />}>
        <Route path='/' element={<div>Hello</div>} />
      </Route>
    </Routes>
  );
}

export default App;
