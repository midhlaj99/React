import React,{useRef,useContext} from 'react'
import classes from './Profile.module.css';
import { AuthContext } from "../store/auth-context"
import { useNavigate } from "react-router-dom";

function Profile() {

  const auth = useContext(AuthContext)
	const navigate=useNavigate()
  const newPassword=useRef(null)

  const Submithandler=(e)=>{
    e.preventDefault()
    let value=newPassword.current.value

    fetch(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=${process.env.REACT_APP_API_KEY}`,{
      method:'POST',
      body:JSON.stringify({
        idToken:auth.token,
        password:value,
        returnSecureToken:false
      }),
      headers:{
        'Content-Type': 'application/json'
      }
    }).then((res)=>{
      if(res.ok){
        return res.json()
      }else{
        return res.json().then(data => {
					let err = data?.error ? data.error.message : 'Password updation Failed'
					throw new Error(err)
				})
      }
    }).then(()=>{
      alert('success')
      navigate("/")

    }).catch(err=>alert(err))
  }

  return (
    <form className={classes.form} onSubmit={Submithandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' minLength={"6"} ref={newPassword} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default Profile