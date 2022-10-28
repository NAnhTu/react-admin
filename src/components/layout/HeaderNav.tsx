import { Image, Layout, Menu } from 'antd';
import { SIDEBAR_COLLAPSED_WIDTH, SIDEBAR_WIDTH } from '../../constants/ThemeConstant.js';
import Icon, { MenuFoldOutlined, MenuUnfoldOutlined, SearchOutlined } from '@ant-design/icons';
import { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setCollapsed, setDarkMode } from '../../store/reducers/layoutReducer';
import SearchInput from '../SearchInput';
import NavNotification from './NavNotification';
import NavLanguage from './NavLanguage';
import MixiGaming from '../../assets/mixigaming.png';
import RefundGaming from '../../assets/refund_gaming.png';
const { Header } = Layout;

const HeaderNav = () => {
  const dispatch = useAppDispatch();
  const {
    sidebar: { collapsed },
    isMobile,
    darkMode,
  } = useAppSelector((state) => state.layout);
  const getSidebarWidth = () => {
    return `${collapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_WIDTH}px`;
  };

  const menuLeft = [
    {
      label:
        collapsed || isMobile ? (
          <MenuUnfoldOutlined
            className='nav-icon'
            onClick={() => dispatch(setCollapsed(!collapsed))}
          />
        ) : (
          <MenuFoldOutlined
            className='nav-icon'
            onClick={() => dispatch(setCollapsed(!collapsed))}
          />
        ),
      key: '0',
    },
    {
      label: isMobile ? <SearchOutlined className='nav-icon' /> : <SearchInput />,
      key: '1',
    },
  ];

  const DarkIconSvg = () => (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' width='20' height='20'>
      <path d='M421.562 379.918C420.898 379.918 420.213 379.98 419.514 380.113C408.275 382.256 397.139 383.283 386.189 383.283C291.381 383.283 211.236 306.139 211.236 207.793C211.236 144.602 245.029 86.496 299.969 55.188C308.436 50.375 306.307 37.523 296.689 35.746C285.488 33.668 267.158 32 255.793 32C132.26 32 32 132.188 32 256C32 379.648 132.096 480 255.793 480C324.828 480 387.852 448.555 429.621 397.066C435.344 389.994 429.99 379.918 421.562 379.918ZM255.793 432C158.861 432 80 353.047 80 256C80 179.684 128.773 114.555 196.746 90.213C175.229 125.006 163.236 165.611 163.236 207.793C163.236 307.234 228.363 391.717 318.107 420.629C298.471 428.072 277.414 432 255.793 432Z' />
    </svg>
  );

  const LightIconSvg = () => (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' width='20' height='20'>
      <path d='M256 144C194.145 144 144 194.143 144 256C144 317.855 194.145 368 256 368S368 317.855 368 256C368 194.143 317.855 144 256 144ZM256 320C220.711 320 192 291.289 192 256C192 220.709 220.711 192 256 192S320 220.709 320 256C320 291.289 291.289 320 256 320ZM256 112C269.25 112 280 101.25 280 88V24C280 10.75 269.25 0 256 0S232 10.75 232 24V88C232 101.25 242.75 112 256 112ZM256 400C242.75 400 232 410.75 232 424V488C232 501.25 242.75 512 256 512S280 501.25 280 488V424C280 410.75 269.25 400 256 400ZM488 232H424C410.75 232 400 242.75 400 256S410.75 280 424 280H488C501.25 280 512 269.25 512 256S501.25 232 488 232ZM112 256C112 242.75 101.25 232 88 232H24C10.75 232 0 242.75 0 256S10.75 280 24 280H88C101.25 280 112 269.25 112 256ZM391.766 357.812C382.422 348.437 367.203 348.437 357.828 357.812S348.453 382.375 357.828 391.75L403.078 437.031C407.75 441.719 413.906 444.063 420.047 444.063S432.328 441.719 437.016 437.031C446.391 427.656 446.391 412.469 437.016 403.094L391.766 357.812ZM120.234 154.188C124.906 158.875 131.062 161.219 137.203 161.219S149.484 158.875 154.172 154.188C163.547 144.812 163.547 129.625 154.172 120.25L108.922 74.969C99.578 65.594 84.359 65.594 74.984 74.969S65.609 99.531 74.984 108.906L120.234 154.188ZM374.797 161.219C380.937 161.219 387.094 158.875 391.766 154.187L437.016 108.906C446.391 99.531 446.391 84.344 437.016 74.969S412.422 65.594 403.078 74.969L357.828 120.25C348.453 129.625 348.453 144.812 357.828 154.187C362.516 158.875 368.656 161.219 374.797 161.219ZM120.234 357.812L74.984 403.094C65.609 412.469 65.609 427.656 74.984 437.031C79.672 441.719 85.812 444.063 91.953 444.063S104.25 441.719 108.922 437.031L154.172 391.75C163.547 382.375 163.547 367.188 154.172 357.812S129.578 348.438 120.234 357.812Z' />
    </svg>
  );

  const DarkIcon = (props: Partial<CustomIconComponentProps>) => (
    <Icon component={DarkIconSvg} {...props} />
  );

  const LightIcon = (props: Partial<CustomIconComponentProps>) => (
    <Icon component={LightIconSvg} {...props} />
  );
  return (
    <Header className={`app-header`} style={{ backgroundColor: '#FFFFFF' }}>
      <div className={`app-header-wrapper`}>
        <div className='d-flex justify-content-center' style={{ width: getSidebarWidth() }}>
          <Image src={collapsed ? RefundGaming : MixiGaming} preview={false} height={50} />
        </div>
        <div className='nav' style={{ width: `calc(100% - ${getSidebarWidth()})` }}>
          <div className='nav-left'>
            <Menu mode='horizontal' items={menuLeft} />
          </div>
          <div className='nav-right'>
            <Menu
              mode='horizontal'
              items={[
                {
                  label: (
                    <Icon
                      component={darkMode ? DarkIcon : LightIcon}
                      size={20}
                      onClick={() => dispatch(setDarkMode(!darkMode))}
                    />
                  ),
                  key: 'item-1',
                },
              ]}
            ></Menu>
            <NavNotification />
            <NavLanguage />
          </div>
        </div>
      </div>
    </Header>
  );
};

export default HeaderNav;
