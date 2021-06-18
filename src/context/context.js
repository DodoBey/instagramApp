import React, { useState, useReducer } from "react";

const initialState = {
  value: "",
};
const imageReducer = (state, action) => {
  console.log(state.value);
  switch (action.type) {
    case "UPDATE":
      return { ...state, value: [action.payload, ...state.value] };
    case "DELETE":
      return { initialState };
    default:
      return state;
  }
};

const AuthContext = React.createContext();

export const AuthContextProvider = (props) => {
  //const [image, setImage] = useState();

  const [state, dispatchImage] = useReducer(imageReducer, initialState);

  return (
    <AuthContext.Provider
      value={{ imageState: state.value, dispatchImage: dispatchImage }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
