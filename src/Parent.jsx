import { useState } from "react";
import { Login } from "./Login";
import { Signup } from "./Signup";
import { Dashboard } from "./Dashboard";

export const Parent = () => {
  const [screen, setScreen] = useState("login");
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  if(isAuthenticated) {
    return <Dashboard onLogout={handleLogout}/>;
  }
  if (screen === "login") {
    return (
          <Login 
            onSwitch={(event) => { event.preventDefault(); setScreen("signup");}} 
            onLoginSuccess = {() => setIsAuthenticated(true)}
          />
        );
  } else {
    return (
          <Signup 
            onSwitch={() =>{setScreen("login")}}
          />
        );
  }
};