import React, { Component }  from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import AdminNav from './AdminNav';
class AdminHome extends Component {
  render() {
    return(
        <div>
            <AdminNav />
            <h1>Admin Home</h1>
        </div>



    );
  }
}
export default AdminHome;
