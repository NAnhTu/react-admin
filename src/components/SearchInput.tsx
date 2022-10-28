import { useRef, useState } from 'react';
import { AutoComplete, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useAppSelector } from '../store/hooks';

const SearchInput = () => {
  const [value, setValue] = useState('');
  const [options, setOptions] = useState([]);
  const inputRef = useRef(null);

  const { isMobile, darkMode } = useAppSelector((state) => state.layout);

  const onSelect = () => {
    setValue('');
    setOptions([]);
    if (close) {
      close();
    }
  };

  const onSearch = (searchText: string) => {
    setValue(searchText);
    setOptions([]);
  };

  const autofocus = () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    inputRef?.current?.focus();
  };

  if (true) {
    autofocus();
  }

  return (
    <AutoComplete
      ref={inputRef}
      className={`nav-search-input ${isMobile ? 'is-mobile' : ''} ${darkMode ? 'light' : ''}`}
      dropdownClassName='nav-search-dropdown'
      options={options}
      onSelect={onSelect}
      onSearch={onSearch}
      value={value}
    >
      <Input placeholder='Search...' prefix={<SearchOutlined className='mr-0' />} />
    </AutoComplete>
  );
};

export default SearchInput;
