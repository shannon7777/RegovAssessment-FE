import { createContext, useState } from "react";
// setting a global auth state so that the user data is available throughout the app
// create AuthContext
const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});

  return (
    // passing the 2 states in value prop so that it will be available in the globally 
    // Wrap AuthContext.Provider around the app in index.js so that all the children components will be able to access to this context
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
