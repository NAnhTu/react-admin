import { Button, Col, Form, Input, Row } from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { signUp } from '../../store/reducers/authReducer';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const backgroundStyle = {
  backgroundImage: 'url(/img/bg-login.png)',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
};

const SignUp = () => {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { loading, error, currentRequestId } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  const onSignUp = () => {
    form
      .validateFields()
      .then(async (values) => {
        dispatch(signUp(values));
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  useEffect(() => {
    if (currentRequestId && !error) {
      navigate('/login');
    }
  }, [error, loading, navigate]);

  const rules = {
    email: [
      {
        required: true,
        message: t('emailEmpty'),
      },
      {
        required: true,
        type: 'email',
        message: t('emailInvalid'),
      },
    ],
    password: [
      {
        required: true,
        message: t('passwordEmpty'),
      },
    ],
    confirm: [
      {
        required: true,
        message: t('confirmPasswordEmpty'),
      },
      ({ getFieldValue }: { getFieldValue: any }) => ({
        validator(rule: any, value: string) {
          if (!value || getFieldValue('password') === value) {
            return Promise.resolve();
          }
          return Promise.reject(t('confirmPasswordNotMatch'));
        },
      }),
    ],
  };

  return (
    <div className='vh-100 bg-white'>
      <Row justify='center' className='align-items-stretch h-100'>
        <Col xs={20} sm={20} md={24} lg={16}>
          <div className='container d-flex flex-column justify-content-center h-100'>
            <Row justify='center'>
              <Col xs={24} sm={24} md={20} lg={12} xl={8}>
                <h1>{t('signUp')}</h1>
                <div className='mt-4'>
                  <Form form={form} layout='vertical' name='register-form' onFinish={onSignUp}>
                    <Form.Item
                      name='email'
                      label={t('email')}
                      rules={[
                        {
                          required: true,
                          message: t('emailEmpty'),
                        },
                        {
                          required: true,
                          type: 'email',
                          message: t('emailInvalid'),
                        },
                      ]}
                      hasFeedback
                    >
                      <Input prefix={<MailOutlined className='text-primary' />} />
                    </Form.Item>
                    <Form.Item
                      name='password'
                      label={t('password')}
                      rules={rules.password}
                      hasFeedback
                    >
                      <Input.Password prefix={<LockOutlined className='text-primary' />} />
                    </Form.Item>
                    <Form.Item
                      name='confirm'
                      label={t('confirmPassword')}
                      rules={rules.confirm}
                      hasFeedback
                    >
                      <Input.Password prefix={<LockOutlined className='text-primary' />} />
                    </Form.Item>
                    <Form.Item>
                      <Button type='primary' htmlType='submit' block loading={false}>
                        {t('signUp')}
                      </Button>
                    </Form.Item>
                  </Form>
                </div>
                <p>
                  {t('alreadyAccount')} <a href='/login'>{t('signIn')}</a>
                </p>
              </Col>
            </Row>
          </div>
        </Col>
        <Col xs={0} sm={0} md={0} lg={8}>
          <div
            className='d-flex flex-column justify-content-between h-100 px-4'
            style={backgroundStyle}
          >
            <div className='text-right'>
              <img src='/img/logo-white.png' alt='logo' />
            </div>
            <Row justify='center'>
              <Col xs={0} sm={0} md={0} lg={20}>
                <img className='img-fluid mb-5' src='/img/img-19.png' alt='' />
                <h1 className='text-white'>Welcome to emilus</h1>
                <p className='text-white'>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ullamcorper nisl
                  erat, vel convallis elit fermentum pellentesque.
                </p>
              </Col>
            </Row>
            <div className='d-flex justify-content-end pb-4'>
              <div>
                <a className='text-white' href='/#' onClick={(e) => e.preventDefault()}>
                  Term & Conditions
                </a>
                <span className='mx-2 text-white'> | </span>
                <a className='text-white' href='/#' onClick={(e) => e.preventDefault()}>
                  Privacy & Policy
                </a>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default SignUp;
