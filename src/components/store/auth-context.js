import React, { useState } from "react";

export const AuthContext = React.createContext({
    token: '',
    isLoggedIn: false,
    login: (token) => { },
    logout: (token) => { }
})

export const AuthContextProvider = (props) => {

    let initialTok = localStorage.getItem('auth')
    const [token,setToken]=useState(initialTok || null)
    const userIsLoggedIn= !!token

    const loginHandler=(token)=>{
        setToken(token)
        localStorage.setItem('auth',token)
    }

    const logoutHandler=()=>{
        setToken(null)
        localStorage.clear()
    }

    const contextValues={
        token:token,
        isLoggedIn:userIsLoggedIn,
        login:loginHandler,
        logout:logoutHandler
    }

    return(
        <AuthContext.Provider value={contextValues}>
            {props.children}
        </AuthContext.Provider>
    ) 
}


