import { lazy, Suspense } from 'react';
import Loading from '../../components/Loading';
import { Route, Routes } from 'react-router-dom';
import Chat from './chat';
const Dashboard = lazy(() => import('./dashboard'));

const Index = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path='/'>
          <Route path='dashboards' element={<Dashboard />} />
          <Route path='chat/*' element={<Chat />} />
          <Route path='project'>
            <Route path='list' element={<div>List</div>} />
            <Route path='scrumboard' element={<div>Scrum Board</div>} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
};

export default Index;
