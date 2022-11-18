import React, { useEffect, useState } from 'react';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useDebounce } from '../../../hooks/useDebounce';

function ChatMenu() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isSearching, setIsSearching] = useState<boolean>(false);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(
    () => {
      console.log(debouncedSearchTerm);
      if (debouncedSearchTerm) {
        setIsSearching(true);
        setTimeout(() => {
          setIsSearching(false);
        }, 2000);
        // searchCharacters(debouncedSearchTerm).then((results) => {
        //   setIsSearching(false);
        //   setResults(results);
        // });
      } else {
        setIsSearching(false);
      }
    },
    [debouncedSearchTerm], // Only call effect if debounced search term changes
  );

  const searchOnChange = () => {
    console.log(111);
  };
  return (
    <div className='chat-menu'>
      <div className='chat-menu-toolbar'>
        <Input
          placeholder='Search'
          onChange={(e) => setSearchTerm(e.target.value)}
          prefix={<SearchOutlined className='font-size-lg mr-2' />}
        />
      </div>
      <div className='chat-menu-list'>
        {isSearching ? <div>Searching . . .</div> : <div>Done</div>}
        {/*{list.map((item, i) => (*/}
        {/*  <div*/}
        {/*    key={`chat-item-${item.id}`}*/}
        {/*    onClick={() => openChat(item.id)}*/}
        {/*    className={`chat-menu-list-item ${i === list.length - 1 ? 'last' : ''} ${*/}
        {/*      item.id === id ? 'selected' : ''*/}
        {/*    }`}*/}
        {/*  >*/}
        {/*    <AvatarStatus*/}
        {/*      src={item.avatar}*/}
        {/*      name={item.name}*/}
        {/*      subTitle={item.msg[item.msg.length - 1].text}*/}
        {/*    />*/}
        {/*    <div className='text-right'>*/}
        {/*      <div className='chat-menu-list-item-time'>{item.time}</div>*/}
        {/*      {item.unread === 0 ? (*/}
        {/*        <span></span>*/}
        {/*      ) : (*/}
        {/*        <Badge count={item.unread} style={{ backgroundColor: COLOR_1 }} />*/}
        {/*      )}*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*))}*/}
      </div>
    </div>
  );
}

export default ChatMenu;
