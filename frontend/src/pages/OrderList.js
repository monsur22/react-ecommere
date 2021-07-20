import React, { useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { listOrder } from '../actions/orderAction';


const OrderList = ({history}) => {
    const dispatch = useDispatch()

    const orderList = useSelector((state) => state.orderList)
    const {loading, error, orders} = orderList

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const userDelete = useSelector((state) => state.userDelete)
    const { success:successDelete } = userDelete

    useEffect(() => {
        // dispatch(listUsers())
        if (userInfo && userInfo.isAdmin) {
            dispatch(listOrder())
          } else {
            history.push('/login')
          }
    }, [dispatch, history, successDelete, userInfo]);


    return (
        <div>
   <div className="profile-orders content-margined">
       <h1>Orders</h1>
                {
                    loading ? <div>Loading...</div> :
                    error ? <div>{error} </div> :
                        <table className="table">
                        <thead>
                            <tr>
                            <th>ID</th>
                            <th>USER</th>
                            <th>DATE</th>
                            <th>TOTAL</th>
                            <th>PAID</th>
                            <th>DELIVERED</th>
                            {/* <th>ACTIONS</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => <tr key={order._id}>
                            <td>{order._id}</td>
                            <td>{order.user && order.user.name}</td>
                            <td> {order.createdAt.substring(0,10)} </td>
                            <td> ${order.totalPrice} </td>

                            <td>
                                {order.isPaid ? (
                                <p>{order.paidAt.substring(0,10)} </p>

                                ) : (

                                <p>Not Paid</p>
                                )}
                            </td>
                            <td>
                                {order.isDelivered ? (
                                <p>{order.deliveredAt.substring(0,10)} </p>

                                ) : (

                                <p>Not Paid</p>
                                )}
                            </td>
                            <td>
                                <Link to={`/order/${order._id}`}>Details</Link>
                            </td>
                            </tr>)}
                        </tbody>
                        </table>
                }
                </div>
        </div>
    )
}

export default OrderList
