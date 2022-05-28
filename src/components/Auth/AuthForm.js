import { useState, useRef, useContext } from 'react';
import classes from './AuthForm.module.css';
import { AuthContext } from "../store/auth-context"
import { useNavigate } from "react-router-dom";

const AuthForm = () => {
	const emailInputRef = useRef()
	const passwordInputRef = useRef()

	const auth = useContext(AuthContext)
	const navigate=useNavigate()

	const [isLogin, setIsLogin] = useState(true);
	const [isLoading, setIsLoading] = useState(false);

	const switchAuthModeHandler = () => {
		setIsLogin((prevState) => !prevState);
	};

	const Submithandler = (e) => {
		e.preventDefault()

		let emailEntered = emailInputRef.current.value;
		let passwordlEntered = passwordInputRef.current.value;

		setIsLoading(true)
		let url
		if (isLogin) {
			url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_API_KEY}`
		} else {
			url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_API_KEY}`
		}

		fetch(url, {
			method: 'POST',
			body: JSON.stringify({
				email: emailEntered,
				password: passwordlEntered,
				returnSecureToken: true
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		}
		).then((res) => {
			setIsLoading(false)
			if (res.ok) {
				return res.json()
			}
			else {
				return res.json().then(data => {
					let err = data?.error ? data.error.message : 'Authentication Failed'
					throw new Error(err)
				})
			}
		}).then((data) => {
			auth.login(data.idToken)
			navigate("/profile", { replace: true })
		}).catch((err) => alert(err))
	}

	return (
		<section className={classes.auth}>
			<h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
			<form onSubmit={Submithandler}>
				<div className={classes.control}>
					<label htmlFor='email'>Your Email</label>
					<input type='email' id='email' required ref={emailInputRef} />
				</div>
				<div className={classes.control}>
					<label htmlFor='password'>Your Password</label>
					<input type='password' id='password' required ref={passwordInputRef} />
				</div>
				<div className={classes.actions}>
					{!isLoading && <button>{isLogin ? 'Login' : 'Create Account'}</button>}
					{isLoading && <span>;oading...</span>}
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