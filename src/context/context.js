import React, { useState, useReducer, useEffect } from "react";
import axios from "axios";

const initialState = {
  value: "",
  postData: [],
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
    case "FETCH_SUCCESS":
      return { ...state, postData: action.payload };
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
    fetch(`${api.postUrl}`, { headers: { "app-id": api.app_id } })
      .then((response) => {
        if (response.status !== 200) {
          console.log(`Houston we have a problem! It's = ${response.status}`);
        }
        response.json().then((data) => {
          //initialState.postData.push(data.data);
          dispatchImage({ type: "FETCH_SUCCESS", payload: data.data });
        });
      })
      .catch((error) => {
        console.log(`Houston, we still have a problem! It's = ${error}`);
      });
    // axios
    //   .get(`${api.postUrl}`, { headers: { "app-id": api.app_id } })
    //   .then(({ data }) => initialState.postData.push(data))
    //   .catch(console.error);
  }, []);

  // Fetch function for comments, fix this later, need image id onClicked
  // useEffect(() => {
  //   axios.get(`${api.commentUrl}{clickedimageid}/comment?limit=100`, { headers: { 'app-id': api.app_id } }) // Need to get id from clicked image
  //   .then(({commentData}) => setComment(commentData))
  //   .catch(console.error)
  // }, [])
  
  return (
    <AuthContext.Provider
      value={{
        imageState: state.value,
        dispatchImage: dispatchImage,
        apiData: state.postData,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
