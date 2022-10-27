import { Layout } from 'antd';
import { Scrollbars } from 'react-custom-scrollbars';
import MenuContent from '../MenuContent';
const { Sider } = Layout;

const Sidebar = () => {
  return (
    <Sider className='side-nav' width={250}>
      <Scrollbars autoHide>
        <MenuContent />
      </Scrollbars>
    </Sider>
  );
};

export default Sidebar;
