import React, { MouseEventHandler, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Avatar, Button, Divider, Form, Input } from 'antd';
import { FileOutlined, PaperClipOutlined, SendOutlined, SmileOutlined } from '@ant-design/icons';
import { Scrollbars } from 'react-custom-scrollbars';
import Flex from '../../../components/layout/Flex';

function Conversation() {
  const { id } = useParams();
  const [name, setName] = useState('Tu.na');
  const [messages, setMessage] = useState([
    {
      msgType: 'date',
      from: 'opposite',
      avatar:
        'https://static.vecteezy.com/system/resources/previews/000/439/863/large_2x/vector-users-icon.jpg',
      text: 'Hello',
      time: new Date().toDateString(),
    },
  ]);

  const getMsgType = (obj) => {
    switch (obj.msgType) {
      case 'text':
        return <span>{obj.text}</span>;
      case 'image':
        return <img src={obj.text} alt={obj.text} />;
      case 'file':
        return (
          <Flex alignItems='center' className='msg-file'>
            <FileOutlined className='font-size-md' />
            <span className='ml-2 font-weight-semibold text-link pointer'>
              <u>{obj.text}</u>
            </span>
          </Flex>
        );
      default:
        return null;
    }
  };
  return (
    <div className='chat-content'>
      <div className='chat-content-header'>
        <h4 className='mb-0'>{name}</h4>
        <div>{/*<EllipsisDropdown menu={menu} />*/}</div>
      </div>
      <div className='chat-content-body'>
        <Scrollbars autoHide>
          {messages.map((elm, i) => (
            <div
              key={`msg-${id}-${i}`}
              className={`msg ${elm.msgType === 'date' ? 'datetime' : ''} ${
                elm.from === 'opposite' ? 'msg-recipient' : elm.from === 'me' ? 'msg-sent' : ''
              }`}
            >
              {elm.avatar ? (
                <div className='mr-2'>
                  <Avatar src={elm.avatar} />
                </div>
              ) : null}
              {elm.text ? (
                <div className={`bubble ${!elm.avatar ? 'ml-5' : ''}`}>
                  <div className='bubble-wrapper'>{getMsgType(elm)}</div>
                </div>
              ) : null}
              {elm.msgType === 'date' ? <Divider>{elm.time}</Divider> : null}
            </div>
          ))}
        </Scrollbars>
      </div>
      <div className='chat-content-footer'>
        <Form
          name='msgInput'
          onFinish={() => {
            console.log(111);
          }}
          className='w-100'
        >
          <Form.Item name='newMsg' className='mb-0'>
            <Input
              autoComplete='off'
              placeholder='Type a message...'
              suffix={
                <div className='d-flex align-items-center'>
                  <a
                    href='/#'
                    className='text-dark font-size-lg mr-3'
                    onClick={() => {
                      console.log('icon');
                    }}
                  >
                    <SmileOutlined />
                  </a>
                  <a
                    href='/#'
                    className='text-dark font-size-lg mr-3'
                    onClick={(event) => {
                      event.preventDefault();
                      console.log('attachment');
                    }}
                  >
                    <PaperClipOutlined />
                  </a>
                  <Button
                    shape='circle'
                    type='primary'
                    size='small'
                    onClick={(event) => {
                      event.preventDefault();
                      console.log('submit');
                    }}
                    htmlType='submit'
                  >
                    <SendOutlined />
                  </Button>
                </div>
              }
            />
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Conversation;
