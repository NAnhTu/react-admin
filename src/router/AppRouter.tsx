import React from 'react';
import { Route } from 'react-router-dom';
import PrivateRouter from './PrivateRouter';
import { useAppSelector } from '../store/hooks';

const AppRouter = () => {
  const { isLoggedIn } = useAppSelector((state) => state.auth);
  return (
    <div>
      <Route element={<PrivateRouter isLoggedIn={isLoggedIn} />}></Route>
    </div>
  );
};

export default AppRouter;
