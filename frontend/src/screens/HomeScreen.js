import React, { useState ,useEffect} from 'react'

import Product from '../pages/Product';

// import products from '../products.js';
import axios from 'axios';
  const HomeScreen = () => {
            const [products, setProduct] = useState([])
            useEffect(() =>{

              const fetchProduct = async() =>{
                const {data} = await axios.get('/api/products')
                setProduct(data)
              }
              fetchProduct()
	},[])
  return (
    <div>
      <div className="row center">
      {products.map(product => (
				<Product product={product}/>
				))}

      </div>
    </div>
  );
}
export default HomeScreen
