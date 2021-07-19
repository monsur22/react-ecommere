import React, { useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { listProducts, deleteProduct, createProduct } from '../actions/productAction';
import { PRODUCT_CREATE_RESET } from '../constants/productConstant'


const ProductList = ({history, match}) => {
    const dispatch = useDispatch()

    const productList = useSelector((state) => state.productList)
    const { loading, error, products } = productList

    const productDelete = useSelector((state) => state.productDelete)
    const {loading: loadingDelete,error: errorDelete,success: successDelete} = productDelete

    const productCreate = useSelector((state) => state.productCreate)
    const {loading: loadingCreate,error: errorCreate,success: successCreate,product: createdProduct} = productCreate

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
      dispatch({ type: PRODUCT_CREATE_RESET })

      if (!userInfo || !userInfo.isAdmin) {
        history.push('/login')
      }

      if (successCreate) {
        history.push(`/admin/product/${createdProduct._id}/edit`)
      } else {
        dispatch(listProducts())
      }
    }, [
      dispatch,history,userInfo,successDelete,successCreate,createdProduct
    ])

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure')) {
          dispatch(deleteProduct(id))
        }
      }

      const createProductHandler = () => {
        dispatch(createProduct())
      }
    return (
        <div>
   <div className="profile-orders content-margined">
                <Link onClick={createProductHandler}>Create Product</Link>
                {loadingCreate && <div>Loading...</div>}
                {errorCreate && <div>{errorCreate} </div>}

                {loadingDelete && <div>Loading...</div>}
                {errorDelete && <div>{errorDelete} </div>}

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
