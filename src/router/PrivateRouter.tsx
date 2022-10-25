import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';

const PrivateRouter = (): JSX.Element => {
  const { isSignedIn } = useAppSelector((state) => state.user);
  return isSignedIn ? <Outlet /> : <Navigate to='/sign-in' />;
};

export default PrivateRouter;
