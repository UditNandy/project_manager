/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/jsx-no-useless-fragment */
import * as React from 'react';

import { supabase } from '../../../supabaseClient';
import './user-authentication.scss';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Snackbar, Button, useScrollTrigger } from '@mui/material';

export const Userauth = () => {
  const loginFormConfig = [
    {
      name: 'username',
      type: 'text',
      placeholder: 'username',
      validation: {
        required: true,
        minLength: 3,
      },
    },
    {
      name: 'password',
      type: 'password',
      placeholder: 'password',
      validation: {
        required: true,
        min: 6,
        max: 14,
      },
    },
  ];
  const signUpConfig = [
    {
      name: 'name',
      type: 'text',
      placeholder: 'Name',
      validation: {
        required: true,
        minLength: 3,
      },
    },
    {
      name: 'username',
      type: 'text',
      placeholder: 'username',
      validation: {
        required: true,
        minLength: 3,
      },
    },
    {
      name: 'password',
      type: 'password',
      placeholder: 'password',
      validation: {
        required: true,
        min: 6,
        max: 14,
      },
    },
    {
      name: 'confirmPassword',
      type: 'password',
      placeholder: 'Confirm Password',
      validation: {
        required: true,
        min: 6,
        max: 14,
      },
    },
  ];
  const [currentFormConfig, changeFormConfig] = React.useState(loginFormConfig);
  const [formType, setFormType] = React.useState('login');
  const [openSnackbar, changeOpenSnackbar] = React.useState(false);
  const [snackbarMessage, changeSnackbarMessage] = React.useState('');

  React.useEffect(() => {
    if (formType === 'login') {
      changeFormConfig(loginFormConfig);
    } else {
      changeFormConfig(signUpConfig);
    }
  }, [formType]);

  const validate: any = (values: any) => {
    const errors: any = {};

    currentFormConfig.forEach((field: any) => {
      const { name, validation } = field;
      const value = values[name];

      if (validation) {
        // Required field validation
        if (validation?.required && !value) {
          errors[name] = `${field.label} is required`;
        }

        // Min length validation
        if (
          validation?.minLength &&
          value &&
          value?.length < validation?.minLength
        ) {
          errors[
            name
          ] = `${field.label} must be at least ${validation.minLength} characters`;
        }

        // Max length validation
        if (
          validation?.maxLength &&
          value &&
          value?.length > validation.maxLength
        ) {
          errors[
            name
          ] = `${field.label} must be no more than ${validation.maxLength} characters`;
        }

        // Pattern (e.g., email format) validation
        if (validation.pattern && value && !validation.pattern.test(value)) {
          errors[name] = `${field.label} is invalid`;
        }

        // Minimum and maximum value validation (for numbers)
        if (validation.min !== undefined && value < validation.min) {
          errors[name] = `${field.label} must be at least ${validation.min}`;
        }
        if (validation.max !== undefined && value > validation.max) {
          errors[
            name
          ] = `${field.label} must be no more than ${validation.max}`;
        }
      }
    });

    return errors;
  };

  const initialValues = currentFormConfig.reduce((values: any, field: any) => {
    values[field.name] = '';
    return values;
  }, {});

  const handleSignUp = async (values: any) => {
    const email: string = values.username;
    const password: string = values.password;
    const displayName: string = values.name;
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) {
      changeSnackbarMessage('Something went wrong');
    } else if (data?.user?.id) {
      updateProfile(data?.user?.id, displayName);
    }
  };

  async function updateProfile(userId: any, fullName: any) {
    const { error } = await supabase
      .from('profiles')
      .upsert({ id: userId, full_name: fullName });

    if (error) {
      changeSnackbarMessage('Something went wrong');
    } else {
      changeSnackbarMessage(
        'Verification Required. Please check your email for confirmation'
      );
    }
  }

  const handleLogin = async (values: any) => {
    const email: string = values.username;
    const password: string = values.password;
    await supabase.auth.signInWithPassword({ email, password });
  };

  const handleClose = (event: any, reason: any) => {
    if (reason === 'clickaway') {
      return;
    }
    changeOpenSnackbar(false);
  };

  return (
    <>
      <div className="header"> Project Manager</div>
      <div className="auth">
        <div className="auth-container">
          <Formik
            initialValues={initialValues}
            validate={validate}
            onSubmit={(values: any) => {
              if (formType === 'signup') handleSignUp(values);
              if (formType === 'login') handleLogin(values);
            }}
          >
            {() => (
              <Form className="auth-container-body">
                {currentFormConfig.map((field: any, index: any) => (
                  <div className="auth-container-body-field" key={index}>
                    <Field
                      type={field.type}
                      id={field.name}
                      name={field.name}
                      placeholder={field.placeholder}
                    />
                    <ErrorMessage name={field.name} component="div" />
                  </div>
                ))}
                <button type="submit">
                  {formType === 'login' ? 'Login' : 'Signup'}
                </button>
              </Form>
            )}
          </Formik>
          {formType === 'login' ? (
            <div className="auth-container-footer">
              Dont have an account ?{' '}
              <span
                onClick={() => {
                  setFormType('signup');
                }}
              >
                Signup
              </span>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleClose}
        message={snackbarMessage}
      />
    </>
  );
};
