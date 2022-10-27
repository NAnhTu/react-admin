import { Layout } from 'antd';
import { Scrollbars } from 'react-custom-scrollbars';
const { Sider } = Layout;

const Sidebar = () => {
  return (
    <Sider className='side-nav'>
      <Scrollbars autoHide></Scrollbars>
    </Sider>
  );
};

export default Sidebar;
