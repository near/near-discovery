import React, { useEffect, useState, createContext } from "react";
import { useHistory } from "react-router-dom";

export const AuthContext = createContext();

export const AuthContextProvider = (props) => {
  const history = useHistory();
  const [showDialog, setShowDialog] = useState(false);

  const [uesr, setUser] = useState();

  const saveAuth = async (value) => {
    setUser(value);
    await localStorage.setItem("githubToken", JSON.stringify(value));
    setShowDialog(false);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    let data = await localStorage.getItem("githubToken");
    setUser(JSON.parse(data));

    if (!data) {
      setShowDialog(true);
    } else {
      setShowDialog(false);
    }
  };
  const logout = async () => {
    await localStorage.removeItem("githubToken");
    setUser(null);
    // history.push("/");
    window.location.replace("#/");
    // setShowDialog(true);
  };

  return (
    <AuthContext.Provider
      value={{
        uesr,
        saveAuth,
        checkAuth,
        logout,
        //
        showDialog,
        setShowDialog,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
