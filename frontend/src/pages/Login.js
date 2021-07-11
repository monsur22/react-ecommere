import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { login } from '../actions/userAction';

const Login = ({location, history}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const dispatch = useDispatch()
    const userLogin = useSelector((state) => state.userLogin)
    const { loading, error, userInfo } = userLogin

    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {
        if (userInfo){
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    const submitHandler = (e) =>{
        e.preventDefault()
        dispatch(login(email, password))

    }


    return (
        <div>

            <div className="form">
                <form onSubmit={submitHandler} >
                <ul className="form-container">
                    <li>
                    <h2>Sign-In</h2>
                    </li>
                    <li>
                    {loading && <div>Loading...</div>}
                    {error && <div>{error}</div>}
                    </li>
                    <li>
                    <label htmlFor="email">
                        Email
                    </label>
                    <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)}>
                    </input>
                    </li>
                    <li>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)}>
                    </input>
                    </li>
                    <li>
                    <button type="submit" className="button primary">Signin</button>
                    </li>
                    <li>
                    New to amazona?
                    </li>
                    <li>
                    <Link to={redirect === "/" ? "register" : "register?redirect=" + redirect} className="button secondary text-center" >Create your amazona account</Link>
                    </li>
                </ul>
                </form>
            </div>
        </div>
    )
}

export default Login
