import { Dropdown, Menu } from 'antd';
import { CheckOutlined, GlobalOutlined } from '@ant-design/icons';

type LanguageType = {
  langName: string;
  langId: string;
  icon: string;
  lang: string;
};

const languages: Array<LanguageType> = [
  {
    langName: 'English',
    langId: 'en',
    icon: 'us',
    lang: 'En',
  },
  {
    langName: 'Vietnamese',
    langId: 'vi',
    icon: 'vn',
    lang: 'Vi',
  },
];

const NavLanguage = () => {
  const itemLanguage = languages.map((language: LanguageType) => {
    return {
      label: (
        <span className='d-flex justify-content-between align-items-center'>
          <div>
            <img
              style={{ maxWidth: '20px' }}
              src={`/img/flags/${language.icon}.png`}
              alt={language.langName}
            />
            <span className='font-weight-normal ml-2'>{language.langName}</span>
          </div>
          {'vi' === language.langId ? <CheckOutlined className='text-success' /> : null}
        </span>
      ),
      key: language.langId,
    };
  });
  const itemMenu = [
    {
      label: <GlobalOutlined className='nav-icon mx-auto' />,
      key: 'item-1',
    },
  ];
  return (
    <Dropdown overlay={<Menu items={itemLanguage} />} trigger={['click']}>
      <Menu mode='horizontal' items={itemMenu}></Menu>
    </Dropdown>
  );
};

export default NavLanguage;
