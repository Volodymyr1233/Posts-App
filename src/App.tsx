import React, {useEffect, useState} from 'react';
import {BrowserRouter} from 'react-router-dom';
import Navbar from "./components/UI/Navbar/Navbar";
import AppRouter from "./components/AppRouter";
import {AuthContext} from "./context";


function App() {
    const [isAuth, setIsAuth] = useState<boolean>(false);
    const [isLoading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (localStorage.getItem("auth")) {
            setIsAuth(true);
        }
        setLoading(false);
    }, []);

  return (
      <AuthContext.Provider value={{
          isAuth,
          setIsAuth,
          isLoading,
      }}>
        <BrowserRouter>
            <Navbar/>
            <AppRouter/>
        </BrowserRouter>
      </AuthContext.Provider>
  )

}

export default App;

