import { Layout } from 'antd';
import { Scrollbars } from 'react-custom-scrollbars';
import MenuContent from '../MenuContent';
import { SIDEBAR_COLLAPSED_WIDTH, SIDEBAR_WIDTH } from '../../constants/ThemeConstant.js';
import { useAppSelector } from '../../store/hooks';
const { Sider } = Layout;

const Sidebar = () => {
  const {
    sidebar: { collapsed },
  } = useAppSelector((state) => state.layout);
  return (
    <Sider
      className='side-nav'
      width={collapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_WIDTH}
      collapsed={collapsed}
    >
      <Scrollbars autoHide>
        <MenuContent width={collapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_WIDTH} />
      </Scrollbars>
    </Sider>
  );
};

export default Sidebar;
