import { DashboardOutlined } from '@ant-design/icons';
import { MenuProps } from 'antd';
import i18next from 'i18next';

export const items: MenuProps['items'] = [
  {
    type: 'group',
    label: i18next.t('sidebar.dashboard') as string,
    children: [
      {
        label: i18next.t('sidebar.dashboard') as string,
        key: 'dashboard',
        icon: <DashboardOutlined />,
      },
    ],
  },
];
