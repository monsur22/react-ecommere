import React, { useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listProductDetails } from '../actions/productAction';



const Singleproduct = ({history,match}) => {

    const [qty , setQty] = useState(1)

    const dispatch = useDispatch()
    const productDetails = useSelector((state) => state.productDetails)
    const { loading, error, product } = productDetails

    useEffect(() => {
        dispatch(listProductDetails(match.params.id))
      }, [dispatch, match])

    const addToCartHandler = () =>{
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }


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
                    {product.countInStock > 0 && (
                        <div className="row">
                          <div>Qty</div>
                            <div>
                                <select value={qty} onChange={(e) => { setQty(e.target.value) }}>
                                    {[...Array(product.countInStock).keys()].map(x =>
                                    <option key={x + 1} value={x + 1}>{x + 1}</option>
                                    )}
                                </select>
                            </div>
                        </div>


                    )}

                    </li>
                    <li>
                        <button className="primary block" onClick={addToCartHandler}disabled={product.countInStock === 0}>
                            Add to Cart
                        </button>
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
