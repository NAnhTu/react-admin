import { Layout } from 'antd';
import HeaderNav from '../components/layout/HeaderNav';
import Sidebar from '../components/layout/Sidebar';
import Views from '../pages/views';

const { Content } = Layout;

const AppLayout = () => {
  return (
    <Layout>
      <HeaderNav />
      <Layout className='app-container'>
        <Sidebar />
        <Layout className='app-layout'>
          <div className='app-content'>
            <Content style={{ paddingLeft: '250px' }}>
              <Views />
            </Content>
          </div>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
