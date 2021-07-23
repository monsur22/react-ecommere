import React, { useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listProductDetails, createProductReview } from '../actions/productAction';
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstant'
import Rating from '../layout/Rating';
import { Link } from 'react-router-dom'

const Singleproduct = ({history,match}) => {

    const [qty , setQty] = useState(1)
    const [rating , setRating] = useState(0)
    const [comment , setComment] = useState('')

    const dispatch = useDispatch()

    const productDetails = useSelector((state) => state.productDetails)
    const { loading, error, product } = productDetails

    const productReviewCreate = useSelector((state) => state.productReviewCreate)
    const { success: successProductReview, loading: loadingProductReview, error: errorProductReview} = productReviewCreate

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        dispatch(listProductDetails(match.params.id))
      }, [dispatch, match])

    const addToCartHandler = () =>{
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(
          createProductReview(match.params.id, {
            rating,
            comment,
          })
        )
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

                    <li>
                    <h2>Reviews</h2>
                    {product.reviews.length === 0 && <div>No Reviews</div>}
                    {product.reviews.map((review) => (
                        <div key={review._id}>
                            <strong>{review.name}</strong>
                            <Rating value={review.rating} />
                            <p>{review.createdAt.substring(0, 10)}</p>
                            <p>{review.comment}</p>
                        </div>
                        ))}

        <div>
                  <h2>Write a Customer Review</h2>
                  {successProductReview && (
                    <p >
                      Review submitted successfully
                    </p>
                  )}
                  {loadingProductReview && <div>Loading...</div>}
                  {errorProductReview && (
                    <div>{errorProductReview}</div>
                  )}
                  {userInfo ? (
                    <form onSubmit={submitHandler}>
                      <div controlId='rating'>
                        <h3>Rating</h3>

                        <select value={rating} onChange={(e) => setRating(e.target.value) }>
                          <option value=''>Select...</option>
                          <option value='1'>1 - Poor</option>
                          <option value='2'>2 - Fair</option>
                          <option value='3'>3 - Good</option>
                          <option value='4'>4 - Very Good</option>
                          <option value='5'>5 - Excellent</option>
                        </select>
                      </div>
                      <div controlId='comment'>
                        <h4>Comment</h4>
                        <input
                          type="textarea"

                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></input>
                      </div>
                        <button className="primary block" disabled={loadingProductReview}>
                        Submit
                        </button>

                    </form>
                  ) : (
                    <div>
                      Please <Link to='/login'>sign in</Link> to write a review{' '}
                    </div>
                  )}
                </div>

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
