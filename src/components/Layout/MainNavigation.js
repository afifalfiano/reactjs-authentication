import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import AuthContext from '../../store/auth-context';

import classes from './MainNavigation.module.css';

const MainNavigation = () => {
  const authContext = useContext(AuthContext);
  const history = useHistory();
  const isLoggedIn = authContext.isLoggedIn;

  const logoutHandler = () => {
    authContext.logout();
    history.replace('/auth');
  }

  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {!isLoggedIn && (
            <li>
            <Link to='/auth'>Login</Link>
          </li>
          )}
          {isLoggedIn && (
            <>
              <li>
              <Link to='/profile'>Profile</Link>
            </li>
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
