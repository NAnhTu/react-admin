import { Navigate, Route, RouteProps } from 'react-router';
import { useAppSelector } from '../store/hooks';
import { RootState } from '../store';
import { Outlet } from 'react-router-dom';

type PrivateRouteProps = {
  roles?: string[];
} & RouteProps;

const PrivateRoute = ({ ...routeProps }: PrivateRouteProps) => {
  const { loggedIn } = useAppSelector<any>((state: RootState) => state.users);
  if (loggedIn) {
    // if (!hasRole(roles)) {
    //   return <Navigate to={`/403`} />;
    // }
    return <Outlet />;
  } else {
    return <Navigate to='/login' />;
  }
};

export default PrivateRoute;
