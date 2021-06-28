import React from 'react'

const Header = () => {
    return (
        <div>
        <header className="row">
            <div>
            <a className="brand" href="/">
                React Ecommerce
            </a>
            </div>
            <div>
            <a href="/cart">Cart</a>
            <a href="/signin">Sign In</a>
            </div>
        </header>
        </div>
    )
}

export default Header
