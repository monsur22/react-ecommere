import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { savePaymentMethod } from '../actions/cartAction';
import CheckoutStep from '../pages/CheckoutStep';

const Payment = ({history}) => {
    const cart = useSelector((state) => state.cart)
    const {shippingAddress} = cart

        if (!shippingAddress){
            history.push('/shipping')
        }

    const [paymentMethod, setPaymentMethod] = useState('PayPal')


    const dispatch = useDispatch()

    const submitHandler = (e) => {
      e.preventDefault()
      dispatch(savePaymentMethod({ paymentMethod }))
      history.push('/placeorder')
    }

    return (
        <div>
             <CheckoutStep step1 step2 step3></CheckoutStep>
      <div className="form">
        <form onSubmit={submitHandler}>
          <ul className="form-container">
            <li>
              <h2>Payment</h2>
            </li>

            <li>
              <div>
                <input
                  type="radio"
                  name="paymentMethod"
                  id="paymentMethod"
                  value="paypal"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                ></input>
                <label for="paymentMethod">Paypal</label>
              </div>
            </li>

            <li>
              <button type="submit" className="button primary">
                Continue
              </button>
            </li>
          </ul>
        </form>
      </div>
        </div>
    )
}

export default Payment
