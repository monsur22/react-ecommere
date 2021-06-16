import React, { Component }  from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Nav from './Nav';
class Home extends Component {
  render() {
    return(
        <div>
            <Nav />
            <h1>Home</h1>
        </div>



    );
  }
}
export default Home;
