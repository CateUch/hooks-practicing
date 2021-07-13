import React, { useState, useReducer, useEffect } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const reducer = (state, action) => {

  if (action.type === 'NEW_EMAIL') {
    return {
      value: action.value,
      emailValid: action.value.includes('@')
    }
  };
  if (action.type === 'NEW_PASSWORD') {
    return {
      password: action.password,
      passValid: action.password.trim().length > 6
    }
  };
  if (action.type === 'EMAIL_BLUR') {
    return {
      value: state.value,
      emailValid: state.value.includes('@'),
      // isValid: state.value.includes('@') && state.password.trim().length > 6
    }
  };
  if (action.type === 'PASSWORD_BLUR') {
    return {
      password: state.password,
      passValid: state.password.trim().length > 6,
      // isValid: state.value.includes('@') && state.password.trim().length > 6
    }
  };

  return {
    value: '',
    password:'',
    // isValid: false,
    emailValid: false,
    passValid: false
  }
}

const Login = (props) => {

  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();

  const [formIsValid, setFormIsValid] = useState(false);

  const [state, dispatch] = useReducer(reducer, {
    value: '',
    password: '',
    // isValid: false,
    emailValid: null,
    passValid: null
  });

  useEffect(() => {
    console.log('EFFECT RUNNING');

    return () => {
      console.log('EFFECT CLEANUP');
    };
  }, []);

  const emailIsValid = state.emailValid;
  const passwordIsValid = state.passValid

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log('checking form validity');
      setFormIsValid( emailIsValid && passwordIsValid );
    }, 500);


    return () => {
      console.log('cleanup')
      clearTimeout(timer);
    };
  }, [emailIsValid, passwordIsValid])

  const emailChangeHandler = (event) => {
    dispatch({ type: 'NEW_EMAIL', value: event.target.value });
    // setFormIsValid(
    //   event.target.value.includes('@') );
  };

  const passwordChangeHandler = (event) => {
    dispatch({ type: 'NEW_PASSWORD', password: event.target.value });
    // setFormIsValid(event.target.value.trim().length > 6);
  };

  const validateEmailHandler = () => {
    dispatch({ type: 'EMAIL_BLUR' })
  };

  const validatePasswordHandler = () => {
    dispatch({ type: 'PASSWORD_BLUR' })
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(state.value, state.password);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${state.emailValid === false ? classes.invalid : ''
            }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={state.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${state.passValid === false ? classes.invalid : ''
            }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={state.password}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
