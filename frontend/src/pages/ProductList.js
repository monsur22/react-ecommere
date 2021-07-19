import React, { useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { listProducts } from '../actions/productAction';


const ProductList = ({history, match}) => {
    const dispatch = useDispatch()

    const productList = useSelector((state) => state.productList)
    const {loading, error, products} = productList

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin




    useEffect(() => {
        // dispatch(listUsers())
        if (userInfo && userInfo.isAdmin) {
            dispatch(listProducts())
          } else {
            history.push('/login')
          }
    }, [dispatch, history, userInfo]);

    const deleteHandler = (id) => {
        console.log('delete')
        if (window.confirm('Are you sure')) {
            // dispatch(deleteUser(id))

          }

      }
      const createProductHandler = (product) => {
        // dispatch(createProduct())
      }
    return (
        <div>
   <div className="profile-orders content-margined">
                <Link onClick={createProductHandler}>Create Product</Link>
                {
                    loading ? <div>Loading...</div> :
                    error ? <div>{error} </div> :
                        <table className="table">
                        <thead>
                            <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>PRICE</th>
                            <th>CATEGORY</th>
                            <th>BRAND</th>
                            <th>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(product => <tr key={product._id}>
                            <td>{product._id}</td>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product.category}</td>
                            <td>{product.brand}</td>


                            <td>
                                <Link to={`/admin/product/${product._id}/edit`}>Edit</Link>
                                <Link onClick={() => deleteHandler(product._id)}>Delete</Link>
                            </td>
                            </tr>)}
                        </tbody>
                        </table>
                }
                </div>
        </div>
    )
}

export default ProductList
