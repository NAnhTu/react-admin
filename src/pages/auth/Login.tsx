import { Button, Checkbox, Col, Form, Input, Row, Card } from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store/hooks';
import { fetchUsers } from '../../store/reducers/authReducer';
const backgroundStyle = {
  backgroundImage: 'url(/img/bg-login.png)',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
};

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const showForgetPassword = true;
  const dispatch = useAppDispatch();
  return (
    <div className='vh-100 bg-white'>
      <Row justify='center' className='align-items-stretch h-100'>
        <Col xs={20} sm={20} md={24} lg={16}>
          <div className='container d-flex flex-column justify-content-center h-100'>
            <Row justify='center'>
              <Col xs={24} sm={24} md={20} lg={12} xl={8}>
                <h1>{t('signIn')}</h1>
                <div className='mt-4'>
                  <Form layout='vertical' name='login-form' onFinish={() => dispatch(fetchUsers())}>
                    <Form.Item
                      name='email'
                      label={t('email')}
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
                      <Input prefix={<MailOutlined className='text-primary' />} />
                    </Form.Item>
                    <Form.Item
                      name='password'
                      label={
                        <div
                          className={`${
                            showForgetPassword
                              ? 'd-flex justify-content-between w-100 align-items-center'
                              : ''
                          }`}
                        >
                          <span>{t('password')}</span>
                          {showForgetPassword && (
                            <span
                              onClick={() => navigate('/forgot-password')}
                              className='cursor-pointer font-size-sm font-weight-normal text-muted'
                              role='presentation'
                            >
                              {t('forgetPassword')}
                            </span>
                          )}
                        </div>
                      }
                      rules={[
                        {
                          required: true,
                          message: t('passwordEmpty'),
                        },
                      ]}
                    >
                      <Input.Password prefix={<LockOutlined className='text-primary' />} />
                    </Form.Item>
                    <Form.Item>
                      <Button type='primary' htmlType='submit' block loading={false}>
                        {t('signIn')}
                      </Button>
                    </Form.Item>
                    {/*{otherSignIn ? renderOtherSignIn : null}*/}
                    {/*{extra}*/}
                  </Form>
                </div>
                <p>
                  Don&apos;t have an account yet? <a href='/register'>Sign Up</a>
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
                <img className='img-fluid mb-5' src='/img/others/img-18.png' alt='' />
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

export default Login;
