import React, { useState, useEffect } from "react";
import axios from 'axios';

const AuthContext = React.createContext();

export const AuthContextProvider = (props) => {
  const [image, setImage] = useState();
  const [data, setData] = useState();
  const [comment, setComment] = useState();

  const api = {
    postUrl: "https://dummyapi.io/data/api/post?limit=100",
    commentUrl: "https://dummyapi.io/data/post/",
    app_id: '60cbbeb27632200c16f6e7bc'
  }


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
    axios.get(`${api.postUrl}`, { headers: { 'app-id': api.app_id } })
    .then(({data}) => setData(data))
    .catch(console.error)
  }, []);

  // Fetch function for comments
  useEffect(() => {
    axios.get(`${api.commentUrl}{clickedimageid}/comment?limit=100`, { headers: { 'app-id': api.app_id } }) // Need to get id from clicked image
    .then(({commentData}) => setComment(commentData))
    .catch(console.error)
  }, [])
  console.log(data, comment)

  return (
    <AuthContext.Provider value={{ image: image, setImage: setImage }}>
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthContext;


// Need to send data as a provider