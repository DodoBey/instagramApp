import React, { useState, useReducer, useEffect } from "react";

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
  const [image, setImage] = useState();
  const [data, setData] = useState();

  const api = {
    mainUrl: "https://dummyapi.io/data/api",
    app_id: "60cbbeb27632200c16f6e7bc",
  };

  useEffect(() => {
    fetch(`${api.mainUrl}/user`, { header: { "app-id": api.app_id } })
      .then((response) => {
        if (response.status !== 200) {
          console.log(`Houston we have a problem! It's = ${response.status}`);
        }
        response.json().then((data) => {
          setData(data);
        });
      })
      .catch((error) => {
        console.log(`Houston, we still have a problem! It's = ${error}`);
      });
  }, []);

  console.log(data);

  return (
    <AuthContext.Provider
      value={{ imageState: state.value, dispatchImage: dispatchImage }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
