import React, {useContext} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {privateRoutes, publicRoutes} from "../router/routes";
import {AuthContext} from "../context";
import Loader from "./UI/loader/Loader";

const AppRouter = () => {
    const {isAuth, setIsAuth, isLoading} = useContext(AuthContext);
    if (isLoading) {
        return <Loader/>
    }

    return (
        isAuth
        ?   <Routes>
                {privateRoutes.map(route => (
                    <Route path={route.path} element={<route.component/>} key={route.path}/>
                ))}

                <Route path="*" element={<Navigate to="/posts" replace/>}></Route>
            </Routes>
        :   <Routes>
                {publicRoutes.map(route => (
                    <Route path={route.path} element={<route.component/>} key={route.path}/>
                ))}
                <Route path="*" element={<Navigate to="/login" replace/>}></Route>
            </Routes>
    )
}

export default AppRouter;