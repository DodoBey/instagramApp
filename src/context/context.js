import React, { useState, useReducer, useEffect } from "react";
import axios from "axios";

const initialState = {
  value: "",
  postData: [],
  id: null,
  comments: [],
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
    case "ADD":
      return { ...state, postData: [action.payload, ...state.postData] };
    case "GET_COMMENT":
      console.log(action.payload)
      return {...state, id: action.payload };
    case "COMMENT_FETCH_SUCCESS":
      return { ...state, comments: action.payload };
    default:
      return state;
  }
};

const AuthContext = React.createContext();

export const AuthContextProvider = (props) => {
  const [state, dispatchImage] = useReducer(imageReducer, initialState);

  const api = {
    postUrl: "https://dummyapi.io/data/api/post?limit=100",
    commentUrl: "https://dummyapi.io/data/api/post/",
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
          dispatchImage({ type: "FETCH_SUCCESS", payload: data.data });
        });
      })
      .catch((error) => {
        console.log(`Houston, we still have a problem! It's = ${error}`);
      });
  }, []);

  // Fetch function for comments
  useEffect(() => {
    fetch(`${api.commentUrl}${state.id}/comment?limit=100`, { headers: { "app-id": api.app_id } })
      .then((response) => {
        if (response.status !== 200) {
          console.log(`Houston we have a problem! It's = ${response.status}`);
        }
        response.json().then((commentData) => {
          dispatchImage({ type: "COMMENT_FETCH_SUCCESS", payload: commentData.data });
        });
      })
      .catch((error) => {
        console.log(`Houston, we still have a problem! It's = ${error}`);
      });
  }, [state.id]);
  
  console.log(state.id)
  console.log(state.comments)

  return (
    <AuthContext.Provider
      value={{
        imageState: state.value,
        dispatchImage: dispatchImage,
        apiData: state.postData,
        comments: state.comments,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
