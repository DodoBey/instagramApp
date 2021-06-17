import React, { useState, useEffect } from "react";

const AuthContext = React.createContext();

export const AuthContextProvider = (props) => {
  const [image, setImage] = useState();
  const [data, setData] = useState();

  const api = {
    mainUrl: "https://dummyapi.io/data/api",
    app_id: '60cbbeb27632200c16f6e7bc'
  }

  useEffect(() => {
    fetch(`${api.mainUrl}/user`, { header: { 'app-id': api.app_id } }).then(response => {
      if (response.status !== 200) {
        console.log(`Houston we have a problem! It's = ${response.status}`)
      }
      response.json().then(data => {
        setData(data)
      });
    })
      .catch((error) => {
        console.log(`Houston, we still have a problem! It's = ${error}`)
      })
  }, [])

  return (
    <AuthContext.Provider value={{ image: image, setImage: setImage }}>
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
