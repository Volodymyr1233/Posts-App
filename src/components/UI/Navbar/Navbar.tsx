import React, {useContext} from "react";
import MyButton from "../button/MyButton";
import {AuthContext} from "../../../context";

const Navbar = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext);

    const exit = () => {
        setIsAuth!(false);
        localStorage.removeItem("auth");
    }
    return (
        <div className="navbar">
            {isAuth
            && <MyButton onClick={exit}>
                    Log out
                </MyButton>}
        </div>
    )
}

export default Navbar;