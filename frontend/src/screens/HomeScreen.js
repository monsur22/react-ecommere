import React, {  useEffect} from 'react'

import Product from '../pages/Product';
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productAction';

  const HomeScreen = () => {
    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const { loading, error, products } = productList

    useEffect(() => {
      dispatch(listProducts())
    }, [dispatch])


  return (
    <div>
      {loading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <h3>{error}</h3>
      ) : (
        <div className="row center">
          {products.map((product) => (
            <Product product={product}/>
            ))}

        </div>
      )}

    </div>
  );
}
export default HomeScreen
