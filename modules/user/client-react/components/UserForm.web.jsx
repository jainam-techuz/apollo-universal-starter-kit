import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import { isEmpty } from 'lodash';

import { isFormError, FieldAdapter as Field } from '@gqlapp/forms-client-react';
import { translate } from '@gqlapp/i18n-client-react';
import { email, minLength, required, match, validate } from '@gqlapp/validation-common-react';
import {
  Form,
  RenderField,
  RenderSelect,
  RenderCheckBox,
  Option,
  Button,
  Alert,
  CardImg
} from '@gqlapp/look-client-react';
import assets from '@gqlapp/favicon-common';
import Dropzone from 'react-dropzone';
import settings from '@gqlapp/config';

const userFormSchema = {
  username: [required, minLength(3)],
  email: [required, email]
};

const createUserFormSchema = {
  ...userFormSchema,
  password: [required, minLength(settings.auth.password.minLength)],
  passwordConfirmation: [required, match('password'), minLength(settings.auth.password.minLength)]
};

const updateUserFormSchema = {
  ...userFormSchema,
  password: minLength(settings.auth.password.minLength),
  passwordConfirmation: [match('password'), minLength(settings.auth.password.minLength)]
};

const defaultUserImage = assets['default_user.png'];

const UserForm = ({ values, handleSubmit, errors, setFieldValue, t, shouldDisplayRole, shouldDisplayActive }) => {
  const { username, email, role, isActive, profile, image, auth, password, passwordConfirmation } = values;

  const [previewImg, setPreviewImg] = useState(defaultUserImage);

  return (
    <Form name="user" onSubmit={handleSubmit}>
      <Field
        name="username"
        component={RenderField}
        type="text"
        label={t('userEdit.form.field.name')}
        value={username}
      />
      <Field name="email" component={RenderField} type="email" label={t('userEdit.form.field.email')} value={email} />
      {shouldDisplayRole && (
        <Field
          name="role"
          component={RenderSelect}
          type="select"
          label={t('userEdit.form.field.role.label')}
          value={role}
        >
          <Option value="user">{t('userEdit.form.field.role.user')}</Option>
          <Option value="admin">{t('userEdit.form.field.role.admin')}</Option>
        </Field>
      )}
      {shouldDisplayActive && (
        <Field
          name="isActive"
          component={RenderCheckBox}
          type="checkbox"
          label={t('userEdit.form.field.active')}
          checked={isActive}
        />
      )}
      <Field
        name="firstName"
        component={RenderField}
        type="text"
        label={t('userEdit.form.field.firstName')}
        value={profile.firstName}
        onChange={value => setFieldValue('profile', { ...profile, firstName: value })}
      />
      <Field
        name="lastName"
        component={RenderField}
        type="text"
        label={t('userEdit.form.field.lastName')}
        value={profile.lastName}
        onChange={value => setFieldValue('profile', { ...profile, lastName: value })}
      />
      {settings.auth.certificate.enabled && (
        <Field
          name="serial"
          component={RenderField}
          type="text"
          label={t('userEdit.form.field.serial')}
          value={auth && auth.certificate && auth.certificate.serial}
          onChange={value => setFieldValue('auth', { ...auth, certificate: { ...auth.certificate, serial: value } })}
        />
      )}
      <Dropzone
        accept="image/*"
        style={{ width: '300px' }}
        onDrop={files => {
          setFieldValue('image', files[0]);
          setPreviewImg(files[0].preview);
        }}
      >
        <CardImg
          style={{ width: '70%' }}
          src={!profile.profileImg || typeof image === 'object' ? previewImg : `../${profile.profileImg}`}
        />
      </Dropzone>
      <Field
        name="password"
        component={RenderField}
        type="password"
        label={t('userEdit.form.field.pass')}
        value={password}
      />
      <Field
        name="passwordConfirmation"
        component={RenderField}
        type="password"
        label={t('userEdit.form.field.passConf')}
        value={passwordConfirmation}
      />
      {errors && errors.errorMsg && <Alert color="error">{errors.errorMsg}</Alert>}
      <Button color="primary" type="submit">
        {t('userEdit.form.btnSubmit')}
      </Button>
    </Form>
  );
};

UserForm.propTypes = {
  handleSubmit: PropTypes.func,
  handleChange: PropTypes.func,
  setFieldValue: PropTypes.func,
  onSubmit: PropTypes.func,
  setTouched: PropTypes.func,
  isValid: PropTypes.bool,
  shouldDisplayRole: PropTypes.bool,
  shouldDisplayActive: PropTypes.bool,
  values: PropTypes.object,
  errors: PropTypes.object,
  initialValues: PropTypes.object.isRequired,
  touched: PropTypes.object,
  t: PropTypes.func
};

const UserFormWithFormik = withFormik({
  mapPropsToValues: values => {
    const { username, email, role, isActive, profile } = values.initialValues;
    return {
      username: username,
      email: email,
      role: role || 'user',
      isActive: isActive,
      password: '',
      passwordConfirmation: '',
      profile: {
        firstName: profile && profile.firstName,
        lastName: profile && profile.lastName,
        profileImg: profile && profile.profileImg
      },
      auth: {
        ...values.initialValues.auth
      },
      image: undefined
    };
  },
  async handleSubmit(
    values,
    {
      setErrors,
      props: { onSubmit }
    }
  ) {
    await onSubmit(values).catch(e => {
      if (isFormError(e)) {
        setErrors(e.errors);
      } else {
        throw e;
      }
    });
  },
  displayName: 'SignUpForm ', // helps with React DevTools
  validate: (values, props) =>
    validate(values, isEmpty(props.initialValues) ? createUserFormSchema : updateUserFormSchema)
});

export default translate('user')(UserFormWithFormik(UserForm));
