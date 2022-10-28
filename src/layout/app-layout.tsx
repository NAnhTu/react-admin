import { Layout } from 'antd';
import HeaderNav from '../components/layout/HeaderNav';
import Sidebar from '../components/layout/Sidebar';
import Views from '../pages/views';
import { useAppSelector } from '../store/hooks';
import { SIDEBAR_COLLAPSED_WIDTH, SIDEBAR_WIDTH } from '../constants/ThemeConstant.js';

const { Content } = Layout;

const AppLayout = () => {
  const {
    sidebar: { collapsed },
  } = useAppSelector((state) => state.layout);

  const getSidebarWidth = () => {
    return `${collapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_WIDTH}px`;
  };
  return (
    <Layout>
      <HeaderNav />
      <Layout className='app-container'>
        <Sidebar />
        <Layout className='app-layout'>
          <div className='app-content'>
            <Content style={{ paddingLeft: getSidebarWidth() }}>
              <Views />
            </Content>
          </div>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
