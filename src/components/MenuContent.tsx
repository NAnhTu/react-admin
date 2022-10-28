import { DashboardOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

type MenuItem = Required<MenuProps>['items'][number];

// submenu keys of first level
const rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];

type MenuContentProps = {
  width: number;
};

const MenuContent = (props: MenuContentProps) => {
  const { width } = props;
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
      'dashboard_group',
      null,
      [getItem(t('sidebar.dashboard'), 'dashboards', <DashboardOutlined />)],
      'group',
    ),
    getItem(
      t('sidebar.apps'),
      'app_group',
      null,
      [
        getItem(t('sidebar.apps.chat'), 'chat', <SettingOutlined />),
        getItem(t('sidebar.apps.project'), 'project', <SettingOutlined />, [
          getItem(t('sidebar.apps.project.list'), 'project/list'),
          getItem(t('sidebar.apps.project.scrumboard'), 'project/scrumboard'),
        ]),
      ],
      'group',
    ),
  ];

  return (
    <Menu
      mode='inline'
      openKeys={openKeys}
      onOpenChange={onOpenChange}
      style={{ width: width }}
      items={items}
      onSelect={(item) => navigate(item.key)}
    />
  );
};

export default MenuContent;
