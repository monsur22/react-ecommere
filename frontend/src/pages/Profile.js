import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getUserDetails } from '../actions/userAction';



const Profile = ({location, history}) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()

    const userDetails = useSelector((state) => state.userDetails)
    const { loading, error, user } = userDetails

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin


    // useEffect(() => {
    //     if (!userInfo) {
    //         history.push('/login')
    //     }else{
    //         if(!user.name){
    //             dispatch(getUserDetails('profile'))

    //         }else{
    //             setName(user.name)
    //             setEmail(user.email)
    //         }
    //     }
    // }, [history, userInfo, user])
    useEffect(() => {
        if (!userInfo) {
          history.push('/login')
        } else {
          if (!user.name) {
            dispatch(getUserDetails('profile'))
          } else {
            setName(user.name)
            setEmail(user.email)
          }
        }
      }, [dispatch, history, userInfo, user])

    const submitHandler = (e) =>{
        e.preventDefault()
        if(password !== confirmPassword){
            setMessage('Password do not match')
        }else{
            // dispatch(register(name, email, password))
            // dispath update profile
        }

    }
    return (
        <div>
            <div className="profile">
                <div className="profile-info">
                <div className="form">
                    <form onSubmit={submitHandler} >
                    <ul className="form-container">
                        <li>
                        <h2>User Profile</h2>
                        </li>
                        <li>
                        {loading && <div>Loading...</div>}
                        {error && <div>{error}</div>}
                        {/* {success && <div>Profile Saved Successfully.</div>} */}
                        </li>
                        <li>
                        <label htmlFor="name">
                            Name
                    </label>
                        <input value={name} type="name" name="name" id="name" onChange={(e) => setName(e.target.value)}>
                        </input>
                        </li>
                        <li>
                        <label htmlFor="email">
                            Email
                    </label>
                        <input value={email} type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)}>
                        </input>
                        </li>
                        <li>
                        <label htmlFor="password">Password</label>
                        <input value={password} type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)}>
                        </input>
                        </li>
                        <li>
                        <label htmlFor="rePassword">Re-Enter Password</label>
                        <input type="password" id="confirmPassword" name="confirmPassword" onChange={(e) => setConfirmPassword(e.target.value)}>
                        </input>
                        </li>

                        <li>
                        <button type="submit" className="button primary">Update</button>
                        </li>
                        <li>
                        {/* <button type="button" onClick={handleLogout} className="button secondary full-width">Logout</button> */}
                        </li>

                    </ul>
                    </form>
                </div>
                </div>
                <div className="profile-orders content-margined">
                {
                    // loadingOrders ? <div>Loading...</div> :
                    // errorOrders ? <div>{errorOrders} </div> :
                        <table className="table">
                        <thead>
                            <tr>
                            <th>ID</th>
                            <th>DATE</th>
                            <th>TOTAL</th>
                            <th>PAID</th>
                            <th>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* {orders.map(order => <tr key={order._id}>
                            <td>{order._id}</td>
                            <td>{order.createdAt}</td>
                            <td>{order.totalPrice}</td>
                            <td>{order.isPaid}</td>
                            <td>
                                <Link to={"/order/" + order._id}>DETAILS</Link>
                            </td>
                            </tr>)} */}
                        </tbody>
                        </table>
                }
                </div>
            </div>
        </div>
    )
}


export default Profile
