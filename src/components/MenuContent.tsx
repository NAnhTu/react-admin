import { DashboardOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

type MenuItem = Required<MenuProps>['items'][number];

// submenu keys of first level
const rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];

const MenuContent: React.FC = () => {
  const [openKeys, setOpenKeys] = useState(['sub1']);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
      type,
    } as MenuItem;
  }

  const items: MenuItem[] = [
    getItem(
      t('sidebar.dashboard'),
      'sub1',
      null,
      [getItem(t('sidebar.dashboard'), 'dashboards', <DashboardOutlined />)],
      'group',
    ),
    getItem(
      'Navigation Two',
      'sub2',
      null,
      [
        getItem('Option 5', '5', <SettingOutlined />),
        getItem('Option 6', '6', <SettingOutlined />),
        getItem('Submenu', 'sub3', <SettingOutlined />, [
          getItem('Option 7', '7'),
          getItem('Option 8', '8'),
        ]),
      ],
      'group',
    ),
    getItem(
      'Navigation Three',
      'sub4',
      null,
      [
        getItem('Option 9', '9', <SettingOutlined />),
        getItem('Option 10', '10', <SettingOutlined />),
        getItem('Option 11', '11', <SettingOutlined />),
        getItem('Option 12', '12', <SettingOutlined />),
      ],
      'group',
    ),
  ];

  return (
    <Menu
      mode='inline'
      openKeys={openKeys}
      onOpenChange={onOpenChange}
      style={{ width: 250 }}
      items={items}
      onSelect={(item) => navigate(item.key)}
    />
  );
};

export default MenuContent;
