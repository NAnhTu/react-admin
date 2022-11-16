import { Button, Col, Form, Input, Row } from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { clearState, signIn } from '../../store/reducers/authReducer';
import { useEffect } from 'react';
import { setSignedIn } from '../../store/reducers/userReducer';
const backgroundStyle = {
  backgroundImage: 'url(/img/bg-login.png)',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
};

const SignIn = () => {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const showForgetPassword = true;
  const dispatch = useAppDispatch();
  const { isSuccess, isError, errorMessage } = useAppSelector((state) => state.auth);

  const onSignIn = () => {
    form
      .validateFields()
      .then(async (values) => {
        dispatch(signIn(values));
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  useEffect(() => {
    return () => {
      dispatch(clearState());
    };
  }, []);

  useEffect(() => {
    if (isSuccess) {
      dispatch(setSignedIn(true));
      dispatch(clearState());
      navigate('/');
    }
    if (isError) {
      dispatch(clearState());
    }
  }, [isSuccess, isError]);

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
  };

  return (
    <div className='vh-100 bg-white'>
      <Row justify='center' className='align-items-stretch h-100'>
        <Col xs={20} sm={20} md={24} lg={16}>
          <div className='container d-flex flex-column justify-content-center h-100'>
            <Row justify='center'>
              <Col xs={24} sm={24} md={20} lg={12} xl={8}>
                <h1>{t('signIn')}</h1>
                {errorMessage && <p className='text-error'>{t(errorMessage)}</p>}
                <div className='mt-4'>
                  <Form form={form} layout='vertical' name='signin-form' onFinish={onSignIn}>
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
                      rules={rules.password}
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
                  Don&apos;t have an account yet? <a href='/sign-up'>Sign Up</a>
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

export default SignIn;
