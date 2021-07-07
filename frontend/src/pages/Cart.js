import React , { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart } from '../actions/cartAction';

const Cart = ({match, location, history}) => {
    const productId = match.params.id
    const qty = location.search ? Number(location.search.split('=')[1]) : 1

    const dispatch = useDispatch()

    const cart = useSelector((state) => state.cart )
    const {cartItems} = cart
    console.log(cartItems)

    useEffect(() => {
        if(productId){
            dispatch(addToCart(productId, qty))
        }
    }, [dispatch, productId, qty])
    console.log(qty)


    return (
        <div>
            Cart
        </div>
    )
}

export default Cart
