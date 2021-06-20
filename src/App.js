import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Home from './components/home/Home';
import AdminHome from './components/admin/AdminHome';

function App() {
  return (
    <Router>
    <div>
        <Switch>
          <Route  exact  path="/"><Home /></Route>
          <Route    path="/Admin"><AdminHome /></Route>
          {/* <Route path="/services"><Services /></Route> */}

        </Switch>
    </div>
  </Router>
  );
}

export default App;
