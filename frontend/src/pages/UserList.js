import React, { useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { listUsers } from '../actions/userAction';


const UserList = ({history}) => {
    const dispatch = useDispatch()

    const userList = useSelector((state) => state.userList)
    const {loading, error, users} = userList

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        // dispatch(listUsers())
        if (userInfo && userInfo.isAdmin) {
            dispatch(listUsers())
          } else {
            history.push('/login')
          }
    }, [dispatch, history])

    const deleteHandler = (id) => {
        console.log('delete')
      }
    return (
        <div>
   <div className="profile-orders content-margined">
                {
                    loading ? <div>Loading...</div> :
                    error ? <div>{error} </div> :
                        <table className="table">
                        <thead>
                            <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>EMAIL</th>
                            <th>ADMIN</th>
                            <th>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => <tr key={user._id}>
                            <td>{user._id}</td>
                            <td>{user.name}</td>
                            <td> <a href={`mailto:${user.email}`}>{user.email}</a> </td>

                            <td>
                                {user.isAdmin ? (
                                <p>Admin</p>

                                ) : (
                                // <i className='fas fa-times' style={{ color: 'red' }}></i>

                                <p>Not Admin</p>
                                )}
                            </td>
                            <td>
                                <Link to={`/admin/user/${user._id}/edit`}>Edit</Link>
                                <Link onClick={() => deleteHandler(user._id)}>Delete</Link>
                            </td>
                            </tr>)}
                        </tbody>
                        </table>
                }
                </div>
        </div>
    )
}

export default UserList
