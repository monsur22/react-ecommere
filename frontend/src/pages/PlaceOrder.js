import React, { useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { saveShippingAddress } from '../actions/cartAction';
import CheckoutStep from '../pages/CheckoutStep';
import { createOrder } from '../actions/orderAction'

const PlaceOrder = ({history}) => {
    const dispatch = useDispatch()

    const cart = useSelector((state) => state.cart)

    // if (!cart.shippingAddress.address) {
    //   history.push('/shipping')
    // } else if (!cart.paymentMethod) {
    //   history.push('/payment')
    // }
    //   Calculate prices
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2)
    }

    cart.itemsPrice = addDecimals(
      cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    )
    cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100)
    cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)))
    cart.totalPrice = (
      Number(cart.itemsPrice) +
      Number(cart.shippingPrice) +
      Number(cart.taxPrice)
    ).toFixed(2)

    const orderCreate = useSelector((state) => state.orderCreate)
    const { order, success, error } = orderCreate

    useEffect(() => {
        if (success) {
          history.push(`/order/${order._id}`)
        }
        // eslint-disable-next-line
      }, [history, success])


    const placeOrderHandler = () => {
        dispatch(
            createOrder({
              orderItems: cart.cartItems,
              shippingAddress: cart.shippingAddress,
              paymentMethod: cart.paymentMethod,
              itemsPrice: cart.itemsPrice,
              shippingPrice: cart.shippingPrice,
              taxPrice: cart.taxPrice,
              totalPrice: cart.totalPrice,
            })
          )
      }
    return (
        <div>
            <CheckoutStep step1 step2 step3 step4 ></CheckoutStep>
                <div className="placeorder">
                    <div className="placeorder-info">
                        <div>
                        <h3>
                            Shipping
                        </h3>
                        <div>
                        {cart.shippingAddress.address}, {cart.shippingAddress.city}{' '}
                        {cart.shippingAddress.postalCode},{' '}
                        {cart.shippingAddress.country}
                        </div>
                        </div>
                        <div>
                        <h3>Payment</h3>
                        <div>
                            Payment Method: {cart.paymentMethod}
                        </div>
                        </div>
                        <div>
                        <ul className="cart-list-container">
                            <li>
                            <h3>
                                Shopping Cart
                        </h3>
                            <div>
                                Price
                        </div>
                            </li>
                            {
                            cart.cartItems.length === 0 ?
                                <div>
                                Cart is empty
                        </div>
                                :
                                cart.cartItems.map((item, index) =>
                                <li>
                                    <div className="cart-image"key={index}>
                                    <img src={item.image} alt="product" />
                                    </div>
                                    <div className="cart-name">
                                    <div>
                                        <Link to={`/product/${item.product}`}>
                                        {item.name}
                                        </Link>

                                    </div>
                                    <div>
                                        Qty: {item.qty}
                                    </div>
                                    </div>
                                    <div className="cart-price">
                                    ${item.price}
                                    </div>
                                </li>
                                )
                            }
                        </ul>
                        </div>


                    </div>
                    <div className="placeorder-action">
                        <ul>
                        <li>
                            <button className="button primary full-width" disabled={cart.cartItems === 0} onClick={placeOrderHandler} >Place Order</button>
                        </li>
                        <li>
                            <h3>Order Summary</h3>
                        </li>
                        <li>
                            <div>Items</div>
                            <div>${cart.itemsPrice}</div>
                        </li>
                        <li>
                            <div>Shipping</div>
                            <div>${cart.shippingPrice}</div>
                        </li>
                        <li>
                            <div>Tax</div>
                            <div>${cart.taxPrice}</div>
                        </li>
                        <li>
                            <div>Order Total</div>
                            <div>${cart.totalPrice}</div>
                        </li>
                        </ul>



                    </div>

                </div>
    </div>
    )
}

export default PlaceOrder
