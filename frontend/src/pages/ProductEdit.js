import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { listProductDetails } from '../actions/productAction'
import { Form, Button } from 'react-bootstrap'

const ProductEdit = ({match, history}) => {
    const productId = match.params.id


    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState('')
    const [uploading, setUploading] = useState(false)

    const dispatch = useDispatch()

    const productDetails = useSelector((state) => state.productDetails)
    const { loading, error, product } = productDetails

    // const userUpdate = useSelector((state) => state.userUpdate)
    // const { loading:loadingUpdate, error:errorUpdate, success: successUpdate } = userUpdate

    useEffect(() => {
        if (!product.name || product._id !== productId) {
            dispatch(listProductDetails(productId))
          } else {
            setName(product.name)
            setPrice(product.price)
            setImage(product.image)
            setBrand(product.brand)
            setCategory(product.category)
            setCountInStock(product.countInStock)
            setDescription(product.description)
          }
    }, [dispatch, history, productId, product])

    const submitHandler = (e) => {
      e.preventDefault()
    //   dispatch(updateUser({ _id: userId, name, email, isAdmin }))
    }

    return (
        <div>
            <Link to={`/admin/productlist`}>Back</Link>
            <div className="form">
                <form onSubmit={submitHandler} >
                <ul className="form-container">
                    <li>
                    <h2>Edit Product</h2>
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
                    <label htmlFor="price">
                        Price
                    </label>
                    <input type="number" name="price" id="price" value={price} onChange={(e) => setPrice(e.target.value)}>
                    </input>
                    </li>
                    <li>
                    <label htmlFor="image">
                        Image
                    </label>
                    <input type="text" name="image" id="image" value={image} onChange={(e) => setImage(e.target.value)}>
                    </input>
                    </li>
                    <li>
                    <label htmlFor="brand">
                        Brand
                    </label>
                    <input type="text" name="brand" id="brand" value={brand} onChange={(e) => setBrand(e.target.value)}>
                    </input>
                    </li>
                    <li>
                    <label htmlFor="brand">
                        Stock
                    </label>
                    <input type="number" name="countInStock" id="countInStock" value={countInStock} onChange={(e) => setBrand(e.target.value)}>
                    </input>
                    </li>
                    <li>
                    <label htmlFor="brand">
                        Category
                    </label>
                    <input type="text" name="category" id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
                    </input>
                    </li>
                    <li>
                    <label htmlFor="brand">
                        Category
                    </label>
                    <input type="text" name="category" id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
                    </input>
                    </li>
                    <li>
                    <label htmlFor="brand">
                        Description
                    </label>
                    <input type="text" name="description" id="description" value={description} onChange={(e) => setDescription(e.target.value)}>
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

export default ProductEdit
