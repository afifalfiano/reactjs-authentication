import { useContext, useRef} from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../store/auth-context';
import classes from './ProfileForm.module.css';

const ProfileForm = () => {

  const inputPasswordRef = useRef();
  const authContext = useContext(AuthContext);
  const history = useHistory();
  const submitHandler = event => {
    event.preventDefault();

    const passwordValue = inputPasswordRef.current.value;

    fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAlgX9tnrxt3JZpS8tM2oo674wAB8jEdPY', {
      method: 'POST',
      body: JSON.stringify({
        idToken: authContext.token,
        password: passwordValue,
        returnSecureToken : false
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      if(response.ok) {
        return response.json();
      } else {
        throw new Error(response.error.message);
      }
    }).then(data => {
      console.log(data);
      history.replace('/')
    }).catch(error => {
      throw new Error(error);
    })

  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' ref={inputPasswordRef}/>
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
