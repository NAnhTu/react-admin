import { Spin } from 'antd';

const Loading = (): JSX.Element => {
  return (
    <div className='center'>
      <Spin size='large' />
    </div>
  );
};

export default Loading;
