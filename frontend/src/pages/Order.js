import React, { useState, useEffect} from 'react'
import axios from 'axios'
import { PayPalButton } from "react-paypal-button-v2";
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { saveShippingAddress } from '../actions/cartAction';
import { getOrderDetails, payOrder, deliverOrder } from '../actions/orderAction'
import {ORDER_PAY_RESET, ORDER_DELIVER_RESET} from '../constants/orderConstant'
const Order = ({match, history}) => {

    const orderId = match.params.id
  const [sdkReady, setSdkReady] = useState(false)

    const dispatch = useDispatch()


    const orderDetails = useSelector((state) => state.orderDetails)
    const { order, loading, error } = orderDetails

    const orderPay = useSelector((state) => state.orderPay)
    const { loading:loadingDeliver, success:successDeliver } = orderPay

    const orderDeliver = useSelector((state) => state.orderDeliver)
    const { loading:loadingPay, success:successPay } = orderDeliver

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    if(!loading) {
        const addDecimals = (num) => {
            return (Math.round(num * 100) / 100).toFixed(2)
          }

          order.itemsPrice = addDecimals(
            order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
          )
    }



    useEffect(() => {

      if (!userInfo) {
        history.push('/login')
      }

      const addPayPalScript = async () => {
        const { data: clientId } = await axios.get('/api/config/paypal')
        // console.log(clientId)
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
        script.async = true
        script.onload = () => {
          setSdkReady(true)
        }
        document.body.appendChild(script)
      }
      if(!order || successPay || successDeliver){

        dispatch({ type: ORDER_PAY_RESET });
        dispatch({ type: ORDER_DELIVER_RESET });
        dispatch(getOrderDetails(orderId));

      }else if(!order.isPaid){
        if(!window.paypal){
          addPayPalScript()
        }else {
          setSdkReady(true)
        }

      }

      }, [dispatch, orderId, successPay, order, successDeliver])

      const successPaymentHandler = (paymentResult) => {
        console.log(paymentResult)
        dispatch(payOrder(orderId, paymentResult))
      }

      const deliverHandler = () => {
        dispatch(deliverOrder(order))
      }
    return loading ? <div>Loading ...</div> : error ? <div>{error}</div> :
        <div>
            <div className="placeorder">
        <div className="placeorder-info">
          <div>
            <h3>
              Shipping
            </h3>

            <div>
            <p>
                <strong>Name: </strong> {order.user.name}
              </p>
              <p>
                <strong>Email: </strong>{' '}
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Address: </strong>{' '}
                {order.shippingAddress.address}, {order.shippingAddress.city},
          {order.shippingAddress.postalCode}, {order.shippingAddress.country},
              </p>
            </div>

            <div>
              {order.isDelivered ? "Delivered at " + order.deliveredAt : "Not Delivered."}
            </div>
          </div>
          <div>
            <h3>Payment</h3>
            <div>
              Payment Method: {order.paymentMethod}
            </div>
            <div>
              {order.isPaid ? "Paid at " + order.paidAt : "Not Paid."}
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
                order.orderItems.length === 0 ?
                  <div>
                    Order is empty
          </div>
                  :
                  order.orderItems.map(item =>
                    <li key={item._id}>
                      <div className="cart-image">
                        <img src={item.image} alt="product" />
                      </div>
                      <div className="cart-name">
                        <div>
                          <Link to={"/product/" + item.product}>
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
            <li className="placeorder-actions-payment">
              {loadingPay && <div>Finishing Payment...</div>}
              {!order.isPaid &&
                <PayPalButton
                  amount={order.totalPrice}
                  onSuccess={successPaymentHandler} />
              }
            </li>
            <li>
              <h3>Order Summary</h3>
            </li>
            <li>
              <div>Items</div>
              <div>${order.itemsPrice}</div>
            </li>
            <li>
              <div>Shipping</div>
              <div>${order.shippingPrice}</div>
            </li>
            <li>
              <div>Tax</div>
              <div>${order.taxPrice}</div>
            </li>
            <li>
              <div>Order Total</div>
              <div>${order.totalPrice}</div>
            </li>
            {loadingDeliver && <div>Loading</div>}
              {userInfo &&
                userInfo.isAdmin &&
                order.isPaid &&
                !order.isDelivered && (
                  <li>
                    <p onClick={deliverHandler}>Mark As Delivered</p>
                  </li>
                )}

          </ul>


        </div>

      </div>
        </div>

}

export default Order
