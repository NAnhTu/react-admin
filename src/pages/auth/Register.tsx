import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import BoxedLayout from '../../components/BoxedLayout';

const genders = [
  { label: 'auth.register.form.gender.options.f', value: 'F' },
  { label: 'auth.register.form.gender.options.m', value: 'M' },
  { label: 'auth.register.form.gender.options.n', value: 'NC' },
];

const Register = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      email: '',
      firstName: '',
      gender: 'F',
      lastName: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required(t('common.validations.required')),
      firstName: Yup.string()
        .max(20, t('common.validations.max', { size: 20 }))
        .required(t('common.validations.required')),
      lastName: Yup.string()
        .max(30, t('common.validations.max', { size: 30 }))
        .required(t('common.validations.required')),
    }),
    onSubmit: (values) => handleRegister(values),
  });

  const handleRegister = async (values: any) => {
    console.log(values);
  };

  return (
    <BoxedLayout>
      <Typography component='h1' variant='h5'>
        {t('auth.register.title')}
      </Typography>
      <Box component='form' marginTop={3} noValidate onSubmit={formik.handleSubmit}>
        <TextField
          margin='normal'
          required
          fullWidth
          id='lastName'
          label={t('auth.register.form.lastName.label')}
          name='lastName'
          autoComplete='family-name'
          value={formik.values.lastName}
          onChange={formik.handleChange}
          error={formik.touched.lastName && Boolean(formik.errors.lastName)}
          helperText={formik.touched.lastName && formik.errors.lastName}
        />
        <TextField
          margin='normal'
          required
          fullWidth
          id='firstName'
          label={t('auth.register.form.firstName.label')}
          name='firstName'
          autoComplete='given-name'
          value={formik.values.firstName}
          onChange={formik.handleChange}
          error={formik.touched.firstName && Boolean(formik.errors.firstName)}
          helperText={formik.touched.firstName && formik.errors.firstName}
        />
        <FormControl component='fieldset' margin='normal'>
          <FormLabel component='legend'>{t('auth.register.form.gender.label')}</FormLabel>
          <RadioGroup
            row
            aria-label='gender'
            name='gender'
            value={formik.values.gender}
            onChange={formik.handleChange}
          >
            {genders.map((gender) => (
              <FormControlLabel
                control={<Radio />}
                key={gender.value}
                label={t(gender.label)}
                value={gender.value}
              />
            ))}
          </RadioGroup>
        </FormControl>
        <TextField
          margin='normal'
          required
          fullWidth
          id='email'
          label={t('auth.register.form.email.label')}
          name='email'
          autoComplete='email'
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <LoadingButton type='submit' fullWidth variant='contained' color='primary' sx={{ mt: 2 }}>
          {t('auth.register.submit')}
        </LoadingButton>
        <Button component={Link} to={`/login`} color='primary' fullWidth sx={{ mt: 2 }}>
          {t('auth.register.back')}
        </Button>
      </Box>
    </BoxedLayout>
  );
};

export default Register;
