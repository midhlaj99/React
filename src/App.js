import { useContext } from 'react';
import { Routes, Route,Navigate  } from 'react-router-dom';
import { AuthContext } from "./components/store/auth-context"
import Auth from './components/Auth/AuthForm';
import Header from './components/Header/Header';
import Profile from "./components/Profile/Profile"
import Home from "./components/Home/Home"

function App() {

  const auth = useContext(AuthContext)
  const isLoggedIn = auth.isLoggedIn
  
  return (
    <>
    <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        {
          !isLoggedIn && <Route path="auth" element={<Auth/>} />

        }
        <Route path="profile" element={ isLoggedIn ? <Profile /> : <Navigate to="/auth" replace={true} />} />
        <Route path="*" element={<Navigate to="/" replace={true} />} />
      </Routes>
    </>
  );
}

export default App;