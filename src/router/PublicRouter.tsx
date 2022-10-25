import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';

const PublicRouter = (): JSX.Element => {
  const { isSignedIn } = useAppSelector((state) => state.user);
  return !isSignedIn ? <Outlet /> : <Navigate to='/' />;
};

export default PublicRouter;
