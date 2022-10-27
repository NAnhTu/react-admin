import React from 'react';
import { Layout } from 'antd';
import HeaderNav from '../components/layout/HeaderNav';
import Sidebar from '../components/layout/Sidebar';

const { Content } = Layout;

const AppLayout = () => {
  return (
    <Layout>
      <HeaderNav />
      <Layout className='app-container'>
        <Sidebar />
        <Layout className='app-layout'>
          <div className='app-content'>
            <Content></Content>
          </div>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
