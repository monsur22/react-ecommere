import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { listProductDetails, updateProduct } from '../actions/productAction'
import { Form, Button } from 'react-bootstrap'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstant'

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

    const productUpdate = useSelector((state) => state.productUpdate)
    const { loading:loadingUpdate, error:errorUpdate, success: successUpdate } = productUpdate

    useEffect(() => {
        if(successUpdate){
            dispatch({type: PRODUCT_UPDATE_RESET})
            history.push('/admin/productlist')
        }else{
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
        }

    }, [dispatch, history, productId, product, successUpdate ])

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        setUploading(true)

        try {
          const config = {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }

          const { data } = await axios.post('/api/upload', formData, config)

          setImage(data)
          setUploading(false)
        } catch (error) {
          console.error(error)
          setUploading(false)
        }
      }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateProduct({ _id: productId, name, price, image, brand, category, countInStock, description }))
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
                    {loadingUpdate && <div>Loading...</div>}
                    {errorUpdate && <div>{error}</div>}

                    {loading && <div>Loading...</div>}
                    {error && <div>{error}</div>}
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
                    <input type="text" name="image" id="image" value={image} onChange={(e) => setImage(e.target.value)}></input>
                    <input type="file" name="image" id="image-file"  custom onChange={uploadFileHandler}></input>
                    {uploading && <div>Loading...</div>}
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
                    <input type="number" name="countInStock" id="countInStock" value={countInStock} onChange={(e) => setCountInStock(e.target.value)}>
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
