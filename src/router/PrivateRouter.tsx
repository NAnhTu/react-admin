import { Navigate, Outlet } from 'react-router-dom';

const PrivateRouter = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  return isLoggedIn ? <Outlet /> : <Navigate to='/' />;
};

export default PrivateRouter;
