import { createContext, useContext, useState } from "react";
const UsersContext = createContext();

export function UsersProvider({ children }) {
    const [signUpUser, setSignUpUser] = useState({ name: "", email: "", password: "" });
    const [loginUser, setLoginUser] = useState({email: "", password: ""});
    const [isLoading, setIsLoading] = useState(false);



  const [isLogin, setIsLogin] = useState(() => {
    const storedIsLoginInfo = localStorage.getItem("isLogin");
    return storedIsLoginInfo ? JSON.parse(storedIsLoginInfo) : false;
  });


  const arrayOfMember = (data) => {
    const dataArray = Array.isArray(data) ? data : [data];

    return dataArray.map((element, index) => {
      return { ...element, id: Date.now() + index, logedIn: true };
    });
  };

  const values = {    
    arrayOfMember,
    setIsLogin,
    signUpUser,
    setSignUpUser,
    loginUser,
    setLoginUser,
    isLoading,
    setIsLoading,
  };

  return (
    <UsersContext.Provider value={values}>{children}</UsersContext.Provider>
  );
}

export function useUsers() {
  const context = useContext(UsersContext);

  if (!context) {
    throw new Error("useUsers must be used within UsersProvider");
  }

  return context;
}
