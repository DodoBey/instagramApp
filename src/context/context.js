import React, { useState, useReducer, useEffect } from "react";
import axios from "axios";

const initialState = {
  value: "",
  data: [],
};
const imageReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE":
      return { ...state, value: [action.payload, ...state.value] };
    case "DELETE":
      return {
        ...state,
        value: initialState.value,
      };
    default:
      return state;
  }
};

const AuthContext = React.createContext();

export const AuthContextProvider = (props) => {
  const [state, dispatchImage] = useReducer(imageReducer, initialState);
  const [data, setData] = useState();
  const [comment, setComment] = useState();

  const api = {
    postUrl: "https://dummyapi.io/data/api/post?limit=100",
    commentUrl: "https://dummyapi.io/data/post/",
    app_id: "60cbbeb27632200c16f6e7bc",
  };

  // Fetch function for posts
  useEffect(() => {
    // fetch(`${api.mainUrl}${api.app_id}/user`).then(response => {
    //   if (response.status !== 200) {
    //     console.log(`Houston we have a problem! It's = ${response.status}`)
    //   }
    //   response.json().then(data => {
    //     setData(data)
    //   });
    // })
    //   .catch((error) => {
    //     console.log(`Houston, we still have a problem! It's = ${error}`)
    //   })
    axios
      .get(`${api.postUrl}`, { headers: { "app-id": api.app_id } })
      .then(({ data }) => initialState.data.push(data))
      .catch(console.error);
  }, []);

  // Fetch function for comments, fix this later, need image id onClicked
  useEffect(() => {
    axios
      .get(`${api.commentUrl}{clickedimageid}/comment?limit=100`, {
        headers: { "app-id": api.app_id },
      }) // Need to get id from clicked image
      .then(({ commentData }) => setComment(commentData))
      .catch(console.error);
  }, []);
  console.log(initialState.data);

  return (
    <AuthContext.Provider
      value={{
        imageState: state.value,
        dispatchImage: dispatchImage,
        apiData: state.data,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
