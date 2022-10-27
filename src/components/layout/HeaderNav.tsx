import { Layout } from 'antd';
const { Header } = Layout;

const HeaderNav = () => {
  return (
    <Header className={`app-header`} style={{ backgroundColor: '#FFFFFF' }}>
      <div className={`app-header-wrapper`}></div>
    </Header>
  );
};

export default HeaderNav;
