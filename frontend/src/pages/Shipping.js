import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { saveShippingAddress } from '../actions/cartAction';
import CheckoutStep from '../pages/CheckoutStep';

const Shipping = ({history}) => {

    const cart = useSelector((state) => state.cart)
    const {shippingAddress} = cart

    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)
    // const [address, setAddress] = useState('');
    // const [city, setCity] = useState('');
    // const [postalCode, setPostalCode] = useState('');
    // const [country, setCountry] = useState('');

    const dispatch = useDispatch()

    const submitHandler = (e) => {
      e.preventDefault()
      dispatch(saveShippingAddress({ address, city, postalCode, country }))
      history.push('/payment')
    }

    return (
        <div>
           <CheckoutStep step1 step2 ></CheckoutStep>
            <div className="form">
      <form onSubmit={submitHandler} >
        <ul className="form-container">
          <li>
            <h2>Shipping</h2>
          </li>

          <li>
            <label htmlFor="address">
              Address
          </label>
            <input type="text" name="address" id="address" onChange={(e) => setAddress(e.target.value)}>
            </input>
          </li>
          <li>
            <label htmlFor="city">
              City
          </label>
            <input type="text" name="city" id="city" onChange={(e) => setCity(e.target.value)}>
            </input>
          </li>
          <li>
            <label htmlFor="postalCode">
              Postal Code
          </label>
            <input type="text" name="postalCode" id="postalCode" onChange={(e) => setPostalCode(e.target.value)}>
            </input>
          </li>
          <li>
            <label htmlFor="country">
              Country
          </label>
            <input type="text" name="country" id="country" onChange={(e) => setCountry(e.target.value)}>
            </input>
          </li>


          <li>
            <button type="submit" className="button primary">Continue</button>
          </li>

        </ul>
      </form>
    </div>
        </div>
    )
}

export default Shipping
