import { useState } from 'react';
import { Button, Col, Form, message, Row, Card, Input } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

const backgroundStyle = {
  backgroundImage: 'url(/img/others/bg-login.png)',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
};

const ForgotPassword = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onSend = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      message.success('New password has send to your email!');
    }, 1500);
  };

  return (
    <div className='vh-100' style={backgroundStyle}>
      <div className='container d-flex flex-column justify-content-center h-100'>
        <Row justify='center'>
          <Col xs={20} sm={20} md={20} lg={9}>
            <Card>
              <div className='my-2'>
                <div className='text-center'>
                  <img className='img-fluid' src='/img/logo.png' alt='' />
                  <h3 className='mt-3 font-weight-bold'>{t('forgotPassword')}</h3>
                  <p className='mb-4'>{t('enterEmail')}</p>
                </div>
                <Row justify='center'>
                  <Col xs={24} sm={24} md={20} lg={20}>
                    <Form form={form} layout='vertical' name='forget-password' onFinish={onSend}>
                      <Form.Item
                        name='email'
                        rules={[
                          {
                            required: true,
                            message: t('emailEmpty'),
                          },
                          {
                            type: 'email',
                            message: t('emailInvalid'),
                          },
                        ]}
                      >
                        <Input
                          placeholder={t('emailAddress')}
                          prefix={<MailOutlined className='text-primary' />}
                        />
                      </Form.Item>
                      <Form.Item>
                        <Button loading={loading} type='primary' htmlType='submit' block>
                          {loading ? t('sending') : t('send')}
                        </Button>
                      </Form.Item>
                    </Form>
                  </Col>
                </Row>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ForgotPassword;
