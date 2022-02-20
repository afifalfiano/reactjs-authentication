import { useRef, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../store/auth-context';

import classes from './AuthForm.module.css';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();

  const authContext =  useContext(AuthContext)

  const inputEmailRef = useRef();
  const inputPasswordRef = useRef();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const emailValue = inputEmailRef.current.value;
    const passwordValue = inputPasswordRef.current.value;

    setIsLoading(true);
    let url;
    if (isLogin) {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAlgX9tnrxt3JZpS8tM2oo674wAB8jEdPY';
    } else {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAlgX9tnrxt3JZpS8tM2oo674wAB8jEdPY';
    };
      const body = {
        email: emailValue,
        password: passwordValue,
        returnSecureToken: true
      };
      fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(response => {
        setIsLoading(false);
        if(response.ok) {
          return response.json();
        } else {
          return response.json().then(data => {
            console.log(data, 'error');
            let errorMessage = 'Authentication failed!';
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            alert(errorMessage);
            throw new Error(errorMessage);
          })
        }
      }).then(data => {
        console.log(data)
        authContext.login(data.idToken);
        history.replace('/')
      }).catch(err => {
        alert(err.message);
      })

  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={inputEmailRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' required ref={inputPasswordRef} />
        </div>
        <div className={classes.actions}>
          {!isLoading && <button>{isLogin ? 'Login' : 'Create Account'}</button>}
          {isLoading && <p>Sending request</p>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
