import 'bootstrap/dist/css/bootstrap.min.css';
import './scss/Main.scss';
import Profile from './components/Profile';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Header from './components/Header';


function App() {
  return (
    <Router>
      <Header/>
      <Switch>
        <Route path="/profile">
          <Profile/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
