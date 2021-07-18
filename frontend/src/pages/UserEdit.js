import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getUserDetails } from '../actions/userAction';

const UserEdit = ({match, history}) => {
    const userId = match.params.id

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)

    const dispatch = useDispatch()

    const userDetails = useSelector((state) => state.userDetails)
    const { loading, error, user } = userDetails

    useEffect(() => {
      if (!user.name || user._id !== userId) {
        dispatch(getUserDetails(userId))
      } else {
        setName(user.name)
        setEmail(user.email)
        setIsAdmin(user.isAdmin)
      }
    }, [dispatch, userId, user])

    const submitHandler = (e) => {
      e.preventDefault()
    }

    return (
        <div>
            <Link to={`/admin/userList`}>Back</Link>
            <div className="form">
                <form onSubmit={submitHandler} >
                <ul className="form-container">
                    <li>
                    <h2>Edit User</h2>
                    </li>
                    <li>
                    {loading && <div>Loading...</div>}
                    {error && <div>{error}</div>}
                    {/* {message && <div>{message}</div>} */}
                    </li>
                    <li>
                    <label htmlFor="name">
                        Name
                    </label>
                    <input type="name" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)}>
                    </input>
                    </li>
                    <li>
                    <label htmlFor="email">
                        Email
                    </label>
                    <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}>
                    </input>
                    </li>
                    <li>
                    <label htmlFor="isadmin">Is Admin</label>
                    <input type="checkbox" id="isadmin" name="isadmin" value="{isAdmin}" onChange={(e) => setIsAdmin(e.target.checked)}>
                    </input>
                    </li>

                    <li>
                    <button type="submit" className="button primary">Update</button>
                    </li>


                </ul>
                </form>
            </div>
        </div>
    )
}

export default UserEdit
