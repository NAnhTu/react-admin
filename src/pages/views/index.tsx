import { lazy, Suspense } from 'react';
import Loading from '../../components/Loading';
import { Route, Routes } from 'react-router-dom';
const Dashboard = lazy(() => import('./dashboard'));

const Index = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/dashboards' element={<Dashboard />} />
      </Routes>
    </Suspense>
  );
};

export default Index;
