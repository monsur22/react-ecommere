import React, { useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listProductDetails } from '../actions/productAction';



const Singleproduct = ({match}) => {
    const dispatch = useDispatch()
    const productDetails = useSelector((state) => state.productDetails)
    const { loading, error, product } = productDetails

    useEffect(() => {
        dispatch(listProductDetails(match.params.id))
      }, [dispatch, match])


    return (
        <div>
                {loading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <h3>{error}</h3>
      ) : (
            <div className="row top">
                <div className="col-2">
                <img className="large" src={product.image} alt={product.name}></img>
                </div>
                <div className="col-1">
                <ul>
                    <li>
                    <h1>{product.name}</h1>
                    </li>
                    <li>
                    </li>
                    <li>Pirce : ${product.price}</li>
                    <li>
                    Description:
                    <p>{product.description}</p>
                    </li>
                </ul>
                </div>
                <div className="col-1">
                <div className="card card-body">
                    <ul>
                    <li>
                        <div className="row">
                        <div>Price</div>
                        <div className="price">${product.price}</div>
                        </div>
                    </li>
                    <li>
                        <div className="row">
                        <div>Status</div>
                        <div>
                            {product.countInStock > 0 ? (
                            <span className="success">In Stock</span>
                            ) : (
                            <span className="error">Unavailable</span>
                            )}
                        </div>
                        </div>
                    </li>
                    <li>
                        <button className="primary block">Add to Cart</button>
                    </li>
                    </ul>
                </div>
                </div>
            </div>
        )}

        </div>
    )
}

export default Singleproduct
