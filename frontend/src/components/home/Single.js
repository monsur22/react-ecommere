import React, { Component,useState ,useEffect }from 'react'
import axios from "axios";
import {products} from "../../products"
import {

	useParams
  } from "react-router-dom";
const Single = ( { props} ) => {
	// let { id } = useParams();
	// const product = products.find((p) => p._id === match.params.id)
	const product = products.find((x) => x._id === props.match.params.id);
	// const [product, setProduct] = useState([])
	// useEffect(() =>{

	// 	const fetchProduct = async() =>{
	// 		const {data} = await axios.get(`/api/products/${id}`)
	// 		setProduct(data)
	// 	}
	// 	fetchProduct()
	// },[])

    return (
        <div>

			{product.name}
			{/* hello */}

        </div>
    )
}

export default Single
