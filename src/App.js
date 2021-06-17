import "bootstrap/dist/css/bootstrap.min.css";
import "./scss/Main.scss";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Post from "./components/Post";

function App() {
  return (
    <div className="App">
      <Post />
    </div>
  );
}

export default App;
