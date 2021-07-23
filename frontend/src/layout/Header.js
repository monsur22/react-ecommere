import React from 'react'
import { Route } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { logout } from '../actions/userAction'
import Search from './Search'

const Header = () => {

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const logutHandler= () => {
        dispatch(logout())
    }

    return (
     <div>
        <header className="row">
            <div>
            <a className="brand" href="/">
                React Ecommerce
            </a>
            </div>
            <div>
            <Route render={({ history }) => <Search history={history} />} />

            </div>
            <div>
            <a href="/cart">Cart</a>
            {
                userInfo ? (
                    <a href="/profile">{userInfo.name}</a>


            ):  <a href="/login">Sign In</a>
            }
              {
                userInfo ? (
                    <a onClick={logutHandler}>Logout</a>


            ):  <a href=""></a>
            }
              {userInfo && userInfo.isAdmin && (
                  <a href="/admin/userlist">Users</a>
              )}
              {userInfo && userInfo.isAdmin && (
                  <a href="/admin/productlist">Products</a>
              )}
                {userInfo && userInfo.isAdmin && (
                  <a href="/admin/orderlist">Orders</a>
              )}
            </div>
        </header>
        </div>
    )
}

export default Header
