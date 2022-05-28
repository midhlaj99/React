import { useContext } from 'react'
import { Link,useNavigate } from 'react-router-dom';
import classes from './Header.module.css';
import { AuthContext } from "../store/auth-context"

function Header() {

  const auth = useContext(AuthContext)
  const navigate=useNavigate()

  const isLoggedIn = auth.isLoggedIn

  const logOut=()=>{
    auth.logout()
    navigate('/')
  }

  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {!isLoggedIn &&
            <li>
              <Link to='/auth'>Login</Link>
            </li>
          }

          {
            isLoggedIn &&
            <>
              <li>
                <Link to='/profile'>Profile</Link>
              </li>
              <li>
                <button onClick={logOut}>Logout</button>
              </li>
            </>
          }

        </ul>
      </nav>
    </header>
  )
}

export default Header