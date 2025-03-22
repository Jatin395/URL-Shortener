import React from "react";
import { createContext, useContext, useState } from "react";

const Context = createContext();

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(false);
    const [user, setUser] = useState({});

    return (
        <Context.Provider value={{ auth, setAuth, user, setUser }}>
            {children}
        </Context.Provider>
    );
};

export const useAuth = () => {
    return useContext(Context);
};

export default AuthProvider;
