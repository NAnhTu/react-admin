import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import HomeScreen from '../pages/HomeScreen';
import Login from '../pages/auth/Login';
import ForgotPassword from '../pages/auth/ForgotPassword';
import ForgotPasswordSubmit from '../pages/auth/ForgotPasswordSubmit';
import Register from '../pages/auth/Register';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<PrivateRoute />}>
        <Route path='/' element={<HomeScreen />} />
        <Route path='/hello' element={<div>Hello</div>} />
      </Route>
      <Route path='forgot-password' element={<ForgotPassword />} />
      <Route path='forgot-password-submit' element={<ForgotPasswordSubmit />} />
      <Route path='login' element={<Login />} />
      <Route path='register' element={<Register />} />
      {/*<Route path='under-construction' element={<UnderConstructions />} />*/}
      {/*<Route path='403' element={<Forbidden />} />*/}
      {/*<Route path='404' element={<NotFound />} />*/}
      {/*<Route path='*' element={<Navigate to={`/404`} replace />} />*/}
    </Routes>
  );
};

export default AppRoutes;
