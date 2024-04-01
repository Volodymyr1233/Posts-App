import React, {useContext, useState} from 'react';
import MyInput from "../components/UI/input/MyInput";
import MyButton from "../components/UI/button/MyButton";
import {AuthContext} from "../context";

const Login = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext);
    const login = (event: React.FormEvent) => {
        event.preventDefault();
        setIsAuth!(true);
        localStorage.setItem("auth", "true");

    }
    return (
        <div>
            <h1 style={{marginTop: "20%", marginLeft: "10%"}}>Please, log in on this page</h1>
            <form onSubmit={login} style={{marginTop: "8%"}}>
                <MyInput type="text" placeholder="Login"/>
                <MyInput type="password" placeholder="Password"/>
                <MyButton style={{marginLeft: "40%", marginTop: "3%"}}>
                    Log in
                </MyButton>
            </form>
        </div>
    )
}

export default Login;