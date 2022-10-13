import { Box, Button, Grid, Link, Paper, TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import BoxedLayout from '../../components/BoxedLayout';
import { useAppSelector } from '../../store/hooks';
import { RootState } from '../../store';

const Login = () => {
  const { loggedIn } = useAppSelector<any>((state: RootState) => state.users);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleLogin = (email: string, password: string) => {};

  const formik = useFormik({
    initialValues: {
      email: 'demo@example.com',
      password: "guWEK<'r/-47-XG3",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email(t('common.validations.email'))
        .required(t('common.validations.required')),
      password: Yup.string()
        .min(8, t('common.validations.min', { size: 8 }))
        .required(t('common.validations.required')),
    }),
    onSubmit: (values) => handleLogin(values.email, values.password),
  });

  return (
    <Grid container component='main' sx={{ height: '100vh' }}>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: 'url(./img/startup.svg)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: 'background.default',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} square>
        <BoxedLayout>
          <Typography component='h1' variant='h5'>
            {t('auth.login.title')}
          </Typography>
          <Box component='form' marginTop={3} noValidate onSubmit={formik.handleSubmit}>
            <TextField
              margin='normal'
              variant='filled'
              required
              fullWidth
              id='email'
              label={t('auth.login.form.email.label')}
              name='email'
              autoComplete='email'
              disabled={loggedIn}
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              margin='normal'
              variant='filled'
              required
              fullWidth
              name='password'
              label={t('auth.login.form.password.label')}
              type='password'
              id='password'
              autoComplete='current-password'
              disabled={loggedIn}
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <Box sx={{ textAlign: 'right' }}>
              <Link component={RouterLink} to={`/forgot-password`} variant='body2'>
                {t('auth.login.forgotPasswordLink')}
              </Link>
            </Box>
            <LoadingButton
              type='submit'
              fullWidth
              loading={loggedIn}
              variant='contained'
              sx={{ mt: 3 }}
            >
              {t('auth.login.submit')}
            </LoadingButton>
            <Button
              component={RouterLink}
              to={`/register`}
              color='primary'
              fullWidth
              sx={{ mt: 2 }}
            >
              {t('auth.login.newAccountLink')}
            </Button>
          </Box>
        </BoxedLayout>
      </Grid>
    </Grid>
  );
};

export default Login;
