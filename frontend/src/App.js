import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Home from './components/home/Home';
import Nav from './components/home/Nav';
import Footer from './components/home/Footer';
import Single from './components/home/Single';
// import AdminHome from './components/admin/AdminHome';

function App() {
  return (
    <Router>
    <div>
    <Nav />
        <Switch>
          <Route  exact  path="/"><Home /></Route>
          {/* <Route    path="/product"><Single /></Route> */}
          <Route    path="/product/:id"><Single /></Route>
          {/* <Route    path="/Admin"><AdminHome /></Route> */}
          {/* <Route path="/services"><Services /></Route> */}

        </Switch>
    <Footer/>
    </div>
  </Router>
  );
}

export default App;
