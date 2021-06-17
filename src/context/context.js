import React, { useState } from "react";

const AuthContext = React.createContext();

export const AuthContextProvider = (props) => {
  const [image, setImage] = useState();

  return (
    <AuthContext.Provider value={{ image: image, setImage: setImage }}>
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
